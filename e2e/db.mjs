#!/usr/bin/env node
// Browser test of database-backed content (`npm run test:e2e:db`). It builds the site into dist-db/ with
// VITE_CONTENT_SOURCE=db pointed at a local stand-in for Supabase's REST API that serves `npm run content:export`
// rows, then checks with the real Content-Security-Policy that:
//   1. exams come from the database (a marked lesson title shows up), with no CSP violation or console error;
//   2. with the database down, the exam seen before still opens (offline copy) and an unseen one falls back to the bundle.
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { chromium } from 'playwright-core';

const OUT = 'dist-db', DB_PORT = 54329, WEB_PORT = 4318;
const DB = `http://localhost:${DB_PORT}`, B = `http://localhost:${WEB_PORT}`;
const MARK = '[from database] ';

execFileSync('npx', ['vite-node', 'scripts/export-content.ts'], { stdio: 'ignore' });
const buildEnv = { ...process.env, OUT_DIR: OUT, BASE_PATH: '/', SITE_URL: 'https://example.org', VITE_CONTENT_SOURCE: 'db', VITE_SUPABASE_URL: DB, VITE_SUPABASE_ANON_KEY: 'test-anon-key' };
execFileSync('npx', ['vite', 'build', '--outDir', OUT, '--logLevel', 'warn'], { stdio: 'inherit', env: buildEnv });
execFileSync('node', ['scripts/postbuild.mjs'], { stdio: 'inherit', env: buildEnv });

const table = name => JSON.parse(readFileSync(`export/json/${name}.json`, 'utf8'));
const tables = Object.fromEntries(['tracks', 'exams', 'domains', 'lessons', 'lesson_sections', 'questions', 'question_options', 'flashcards', 'sources'].map(t => [t, table(t)]));
const exams = tables.exams.map(e => e.key);
const [first, second] = exams;
// Mark the first lesson of the first exam so the page proves where its content came from.
const l0 = tables.lessons.find(l => l.exam_key === first && l.position === 0);
l0.title = MARK + l0.title;

let up = true, hits = 0;
const db = createServer((req, res) => {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'apikey, authorization, accept' };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  if (!up) { res.writeHead(503, cors); return res.end('down'); }
  const u = new URL(req.url, DB), name = u.pathname.replace('/rest/v1/', '');
  if (req.headers.apikey !== 'test-anon-key') { res.writeHead(401, cors); return res.end(); }
  let rows = tables[name];
  if (!rows) { res.writeHead(404, cors); return res.end('[]'); }
  hits++;
  for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) rows = rows.filter(r => String(r[k]) === v.slice(3));
  const order = (u.searchParams.get('order') || '').split(',').filter(Boolean);
  rows = [...rows].sort((a, b) => { for (const c of order) { if (a[c] < b[c]) return -1; if (a[c] > b[c]) return 1; } return 0; });
  const off = Number(u.searchParams.get('offset') || 0), lim = Number(u.searchParams.get('limit') || 1e9);
  res.writeHead(200, { ...cors, 'Content-Type': 'application/json' });
  res.end(JSON.stringify(rows.slice(off, off + lim)));
}).listen(DB_PORT);

const web = spawn('npx', ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort', '--outDir', OUT], { stdio: 'ignore' });
const errors = [];
const fail = msg => { errors.push(msg); console.log('  ✗ ' + msg); };
const ok = msg => console.log('  ✓ ' + msg);

try {
  for (let i = 0; ; i++) { try { await fetch(`${B}/`); break; } catch { if (i > 50) throw new Error('preview server did not start'); await new Promise(r => setTimeout(r, 200)); } }
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.addInitScript(() => document.addEventListener('securitypolicyviolation', e => console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`)));
  let expectWarnings = false;
  page.on('console', m => {
    if (m.type() === 'error' && !(expectWarnings && /503|Failed to load resource/.test(m.text()))) fail(`console error at ${page.url()}: ${m.text()}`);
  });
  page.on('pageerror', e => fail(`page error at ${page.url()}: ${e.message}`));
  if (process.env.DEBUG) page.on('console', m => console.log('    [console]', m.type(), m.text()));
  // waitForFunction needs eval, which the real CSP blocks, so wait on the lesson list instead.
  const loaded = () => page.waitForSelector('.lesson-list a').catch(() => {});
  // The learn page groups lessons by domain, so look for the marked lesson anywhere in the list.
  const firstLesson = () => page.$$eval('.lesson-list a', as => as.map(a => a.textContent).join('\n'));

  await page.goto(`${B}/${first}/learn`); await loaded();
  if ((await firstLesson())?.includes(MARK)) ok(`${first} reads from the database (${hits} requests)`);
  else fail(`${first}: the lesson list shows bundled content, not the database copy`);
  await page.click('.lesson-list a >> nth=0'); await page.waitForSelector('article h1');
  if (!(await page.$$('.sources a')).length) fail(`${first}: database lesson shows no sources`);
  await page.goto(`${B}/${first}/practice`); await page.click('text=Start practice'); await page.waitForSelector('.q-stem');
  await page.waitForTimeout(300); // let the offline copy be written

  up = false; expectWarnings = true;
  await page.goto(`${B}/${first}/learn`); await loaded();
  if ((await firstLesson())?.includes(MARK)) ok(`${first} opens from the offline copy while the database is down`);
  else fail(`${first}: with the database down, the saved database copy was not used`);
  await page.goto(`${B}/${second}/learn`); await loaded();
  if (await page.$('.lesson-list a') && !(await firstLesson())?.includes(MARK)) ok(`${second} falls back to the bundled copy while the database is down`);
  else fail(`${second}: did not load with the database down`);

  await browser.close();
} finally {
  web.kill();
  db.close();
}
console.log(errors.length ? `\n${errors.length} problem(s)` : '\nAll database content checks passed');
process.exit(errors.length ? 1 : 0);
