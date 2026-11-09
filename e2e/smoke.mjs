#!/usr/bin/env node
// Browser smoke test of the built site (run `npm run build` first, then `npm run test:e2e`).
// Serves dist/ with vite preview, then for every exam in sitemap.xml: renders each view at phone width
// (no horizontal overflow), opens a lesson and checks its official-docs links, answers practice
// questions and checks the "Read more" sources, flips a flashcard, and takes a 20-question mock.
// A second pass runs with the real Content-Security-Policy and fails on any violation or console error.
// Local runs can reuse an installed Chrome: CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome".
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const port = 4317;
const B = `http://localhost:${port}${base.replace(/\/$/, '')}`;
const sitemapFile = new URL('../dist/sitemap.xml', import.meta.url);
if (!existsSync(sitemapFile)) { console.error('dist/sitemap.xml is missing: build with SITE_URL set (any value works locally, e.g. SITE_URL=https://example.org).'); process.exit(1); }
const sitemap = readFileSync(sitemapFile, 'utf8');
const paths = [...sitemap.matchAll(/<loc>[a-z]+:\/\/[^/]+([^<]*)<\/loc>/g)].map(m => '/' + m[1].slice(base.length));
const exams = paths.filter(p => /^\/[\w-]+\/[\w-]+$/.test(p) && !p.endsWith('/guide'));

const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort', '--base', base], { stdio: 'ignore' });
const errors = [];
const fail = msg => { errors.push(msg); console.log('  ✗ ' + msg); };

try {
  for (let i = 0; ; i++) { try { await fetch(`${B}/`); break; } catch { if (i > 50) throw new Error('preview server did not start'); await new Promise(r => setTimeout(r, 200)); } }
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });

  // Pass 1: behaviour. bypassCSP lets Playwright's own helpers run; pass 2 checks the real policy.
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, bypassCSP: true });
  page.on('pageerror', e => fail(`page error at ${page.url()}: ${e.message}`));
  page.on('dialog', d => d.accept()); // submit-exam confirmation
  page.setDefaultTimeout(10000);
  // Lazy routes and exam bundles show a muted 'Loading …' placeholder until ready.
  const loaded = () => page.waitForFunction(() => ![...document.querySelectorAll('.muted')].some(e => /^Loading\b/.test(e.textContent)));
  const has = async (sel, msg) => { if (!await page.$(sel)) fail(msg); };

  for (const ex of exams) try {
    const overflow = [];
    for (const v of ['', '/learn', '/cards', '/practice', '/mock', '/mistakes', '/traps', '/plan']) {
      await page.goto(B + ex + v); await loaded();
      if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) overflow.push(v || '/');
    }
    if (overflow.length) fail(`${ex}: horizontal overflow at 390px on ${overflow.join(', ')}`);

    await page.goto(`${B}${ex}/learn`); await page.click('.lesson-list a >> nth=0'); await page.waitForSelector('article h1');
    const docs = await page.$$eval('.sources a', as => as.map(a => [a.href, a.target]));
    if (!docs.length) fail(`${ex}: first lesson shows no official-docs links`);
    if (docs.some(([href, target]) => !href.startsWith('https://') || target !== '_blank')) fail(`${ex}: lesson source link is not an external https link`);
    await page.click('text=Mark complete');

    await page.goto(`${B}${ex}/practice`); await page.click('text=Start practice');
    for (let i = 0; i < 2; i++) {
      await page.click('.opt >> nth=0');
      if (await page.$('text=Check answer')) {
        const n = await page.$$eval('.opt', o => o.length);
        for (let k = 1; k < n && await page.$('button:has-text("Check answer")[disabled]'); k++) await page.click(`.opt >> nth=${k}`);
        await page.click('text=Check answer');
      }
      await has('.feedback .sources a', `${ex}: practice answer shows no "Read more" source`);
      await page.click('.q-card .btn.primary');
    }

    await page.goto(`${B}${ex}/cards`); await page.click('.flash'); await page.click('text=3 · Good');

    await page.goto(`${B}${ex}/mock`); await page.click('text=Quick 20-question mock');
    await page.reload(); await page.waitForSelector('.timer');
    for (let i = 0; i < 20; i++) { await page.keyboard.press('1'); await page.keyboard.press('n'); }
    await page.click('text=Submit exam'); await page.waitForURL(/review\/0/); await page.waitForSelector('.stat');
    await has('.feedback .sources a', `${ex}: mock review shows no sources`);
    console.log(`  ✓ ${ex}`);
  } catch (e) {
    fail(`${ex}: ${e.message.split('\n')[0]} (at ${page.url()})`);
  }

  for (const p of paths.filter(p => /^\/[\w-]+\/guide$/.test(p))) { // track runbooks
    await page.goto(B + p); await page.waitForSelector('article h1');
    const broken = await page.$$eval('article a[href^="#"]', as => as.map(a => a.getAttribute('href').slice(1)).filter(id => !document.getElementById(decodeURIComponent(id))));
    if (broken.length) fail(`${p}: broken table-of-contents anchors ${broken.join(', ')}`);
  }
  await page.goto(`${B}/search?q=prompt`); await page.waitForSelector('.results li', { timeout: 20000 }).catch(() => fail('search returned nothing'));
  await page.goto(`${B}/`); await page.waitForSelector('.today-list li').catch(() => fail('Today panel missing after studying'));
  for (const p of paths.filter(p => /^\/[\w-]+$/.test(p) && !['/about', '/library', '/roadmap'].includes(p))) { // track pages show study time per exam
    await page.goto(B + p); await page.waitForSelector('.exam-card');
    const n = await page.$$eval('.exam-card', cs => cs.filter(c => !/About [\d.]+ (h|min) of study/.test(c.textContent)).length);
    if (n) fail(`${p}: ${n} exam cards show no study time`);
  }
  await page.goto(`${B}/library`); await page.waitForSelector('.library li a[href^="https://"]').catch(() => fail('library has no entries'));
  await page.goto(`${B}/library?track=azure&free=1`); await page.waitForSelector('.library li').catch(() => fail('library filter shows nothing for azure + free'));
  await page.goto(`${B}/roadmap`); await page.waitForSelector('.this-week .tasks input[type=checkbox]').catch(() => fail('roadmap shows no tasks for this week'));
  if ((await page.$$('details.week')).length !== 24) fail('roadmap does not show 24 weeks');
  await page.click('.this-week .tasks input[type=checkbox]'); await page.reload(); await page.waitForSelector('.this-week .tasks input');
  if (!(await page.$eval('.this-week .tasks input', i => i.checked))) fail('roadmap tick is not saved');
  // Phone navigation: the bottom tab bar opens the menu, which reaches every track.
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await phone.goto(`${B}/`); await phone.tap('.tabbar button');
  await phone.waitForSelector('.sheet a[href$="/databricks"]').catch(() => fail('phone menu does not open or lists no tracks'));
  await phone.tap('.sheet a[href$="/databricks"]'); await phone.waitForSelector('.exam-card');
  if (await phone.$('.sheet')) fail('phone menu stays open after navigating');
  if (await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth)) fail('phone layout scrolls sideways');
  await phone.close();
  await page.goto(`${B}/progress`); await page.waitForSelector('table').catch(() => fail('progress page has no table'));
  await page.goto(`${B}/no/such/page`); await page.waitForSelector('h1');
  if (!(await page.textContent('body')).includes('Page not found')) fail('unknown URL does not show the 404 page');

  // Pass 2: the real CSP. Any violation or console error fails the run.
  const strict = await browser.newPage();
  await strict.addInitScript(() => document.addEventListener('securitypolicyviolation', e => console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`)));
  strict.on('console', m => { if (m.type() === 'error') fail(`console error at ${strict.url()}: ${m.text()}`); });
  strict.on('pageerror', e => fail(`page error at ${strict.url()}: ${e.message}`));
  for (const p of ['/', '/about', '/search?q=agents', ...paths.filter(p => /^\/[\w-]+$/.test(p)), exams[0], `${exams[0]}/learn`, `${exams[0]}/cards`]) {
    await strict.goto(B + p); await strict.waitForLoadState('networkidle');
  }
  console.log(`  ✓ CSP pass (${paths.length} sitemap URLs, ${exams.length} exams)`);
  await browser.close();
} finally {
  server.kill();
}
console.log(errors.length ? `\n${errors.length} problem(s)` : '\nAll smoke checks passed');
process.exit(errors.length ? 1 : 0);
