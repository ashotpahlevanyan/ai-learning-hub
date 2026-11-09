#!/usr/bin/env node
// Accessibility check of the built site with axe-core (WCAG 2.2 A and AA rules), in light and dark themes, at
// desktop and phone width. Run after `npm run build` with `npm run test:e2e:a11y`. It fails on any serious or
// critical violation and lists the moderate and minor ones.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';

const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const port = 4319, B = `http://localhost:${port}`;
const PAGES = ['/', '/claude', '/claude/ccar-f', '/claude/ccar-f/learn', '/claude/ccar-f/cards', '/claude/ccar-f/practice',
  '/claude/ccar-f/mock', '/claude/ccar-f/traps', '/claude/ccar-f/plan', '/claude/ccar-f/guide', '/claude/guide',
  '/foundations/math-ai/learn', '/progress', '/library', '/roadmap', '/about', '/search?q=agents', '/no-such-page'];

const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort', '--base', '/'], { stdio: 'ignore' });
const blocking = [], minor = new Map();

try {
  for (let i = 0; ; i++) { try { await fetch(`${B}/`); break; } catch { if (i > 50) throw new Error('preview server did not start'); await new Promise(r => setTimeout(r, 200)); } }
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: true });
  for (const [scheme, width] of [['light', 1280], ['dark', 390]]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: scheme, bypassCSP: true });
    for (const path of [...PAGES, '/claude/ccar-f/learn/first-lesson', '/claude/ccar-f/practice#question', '/claude/ccar-f#mock-history']) {
      if (path.endsWith('#mock-history')) {
        // Saved mocks, so the dashboard shows its score trend chart and history table.
        const mocks = [610, 705, 760].map((score, i) => ({ date: Date.UTC(2026, 9, 1 + i), pct: score / 1000, score, n: 20, ok: 14, secs: 1500, dom: {} }));
        await page.evaluate(m => localStorage.setItem('aiLearningHub.v1', JSON.stringify({ v: 1, ex: { 'claude/ccar-f': { q: {}, cards: {}, lessons: {}, newCards: {}, mocks: m } }, days: [], updatedAt: 1 })), mocks);
        await page.goto(`${B}/claude/ccar-f`); await page.waitForSelector('.trend svg');
      } else if (path.endsWith('first-lesson')) {
        await page.goto(`${B}/claude/ccar-f/learn`); await page.click('.lesson-list a >> nth=0'); await page.waitForSelector('article h1');
      } else if (path.endsWith('#question')) {
        await page.goto(`${B}/claude/ccar-f/practice`); await page.click('text=Start practice'); await page.click('.opt >> nth=0');
      } else {
        await page.goto(B + path); await page.waitForLoadState('networkidle');
      }
      await page.waitForTimeout(150);
      await page.addScriptTag({ content: axe });
      const res = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }));
      for (const v of res.violations) {
        const where = `${scheme} ${width}px ${path}`;
        const nodes = v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ') + (v.nodes[0]?.any[0]?.message ? ` — ${v.nodes[0].any[0].message}` : '');
        if (v.impact === 'serious' || v.impact === 'critical') blocking.push(`${where}: [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length}×: ${nodes})`);
        else minor.set(v.id, `${v.help} (e.g. ${where}: ${nodes})`);
      }
    }
    await page.close();
  }
  await browser.close();
} finally {
  server.kill();
}
for (const b of blocking) console.log('  ✗ ' + b);
for (const [id, m] of minor) console.log(`  · ${id}: ${m}`);
console.log(blocking.length ? `\n${blocking.length} serious or critical accessibility problem(s)` : `\nNo serious or critical accessibility problems (${minor.size} minor rule(s) listed)`);
process.exit(blocking.length ? 1 : 0);
