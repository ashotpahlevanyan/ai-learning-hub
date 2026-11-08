#!/usr/bin/env node
// Link checker: every source URL in the exam bundles, every resource link in track.ts, every
// library entry and every link in the runbooks must still resolve. Run with `npm run check:links` (needs network).
// Exit code 1 when any link is dead (404/410, 5xx, DNS or TLS failure, or a "soft 404":
// status 200 but the site served its not-found or index page). Sites that refuse
// automated clients (401/403/429) are reported as "unverified" but don't fail the run.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content/tracks/', import.meta.url).pathname;
const only = process.argv[2]; // optional track id filter
const links = new Map(); // url -> Set of places it appears

const add = (url, where) => {
  url = url.replace(/[).,;:'"\]>]+$/, '');
  if (!/^https?:\/\//.test(url)) return;
  if (!links.has(url)) links.set(url, new Set());
  links.get(url).add(where);
};
const urlsIn = text => text.match(/https?:\/\/[^\s)<>"'`|\]]+/g) ?? [];

for (const track of readdirSync(root)) {
  if (only && track !== only) continue;
  const dir = join(root, track);
  for (const f of ['track.ts', 'runbook.md']) {
    if (existsSync(join(dir, f))) urlsIn(readFileSync(join(dir, f), 'utf8')).forEach(u => add(u, `${track}/${f}`));
  }
  const exams = join(dir, 'exams');
  if (!existsSync(exams)) continue;
  for (const f of readdirSync(exams).filter(f => f.endsWith('.json'))) {
    const exam = JSON.parse(readFileSync(join(exams, f), 'utf8'));
    for (const x of [...exam.lessons, ...exam.questions]) (x.sources ?? []).forEach(s => add(s.url, `${track}/${f}#${x.id}`));
  }
}

// The library page's books, courses and papers.
if (!only || only === 'library') urlsIn(readFileSync(new URL('../src/content/library.ts', import.meta.url), 'utf8')).forEach(u => add(u, 'library.ts'));

const opts = () => ({ redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (link-check; ai-learning-hub)', accept: 'text/html,*/*' } });
const titleOf = html => (html.match(/<title[^>]*>([^<]*)/i)?.[1] ?? '').trim();
async function get(url) {
  const r = await fetch(url, opts());
  return { status: r.status, final: r.url, title: r.headers.get('content-type')?.includes('html') ? titleOf(await r.text()) : '' };
}

// Some doc sites answer a missing page with 200: AWS redirects to the guide's index, Claude docs serve a
// generic page. Probe a made-up sibling once per folder; a link that lands where the probe lands is dead.
const probes = new Map();
const probe = url => {
  const dir = url.replace(/[?#].*$/, '').replace(/[^/]*\/?$/, '');
  const fake = dir + 'zz-no-such-page-404' + (url.endsWith('.html') ? '.html' : '');
  if (!probes.has(dir)) probes.set(dir, get(fake).then(r => ({ ...r, inPlace: r.final === fake })).catch(() => null));
  return probes.get(dir);
};

async function check(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await get(url);
      if (r.status >= 400) return r.status;
      const p = await probe(url);
      if (p && p.status < 400 && ((r.final !== url && p.final === r.final) || (p.inPlace && p.title && p.title === r.title))) return 'soft 404';
      const want = new URL(url), got = new URL(r.final);
      if (got.host === want.host && got.pathname !== want.pathname && want.pathname.startsWith(got.pathname.replace(/\/?$/, '/'))) return 'soft 404 (redirected to index)';
      return r.status;
    } catch (e) {
      if (attempt < 2) continue; // transient DNS/network hiccups
      return `error: ${e.cause?.code ?? e.name}`;
    }
  }
}

const urls = [...links.keys()];
const results = [];
for (let i = 0; i < urls.length; i += 8) {
  const batch = urls.slice(i, i + 8);
  results.push(...await Promise.all(batch.map(async u => ({ u, status: await check(u) }))));
  process.stderr.write(`\rchecked ${results.length}/${urls.length}`);
}
process.stderr.write('\n');

const dead = results.filter(r => typeof r.status === 'string' || r.status === 404 || r.status === 410 || r.status >= 500);
const blocked = results.filter(r => [401, 403, 429].includes(r.status));
const show = r => `  ${r.status}  ${r.u}\n      in ${[...links.get(r.u)].slice(0, 3).join(', ')}${links.get(r.u).size > 3 ? ` +${links.get(r.u).size - 3} more` : ''}`;
if (blocked.length) console.log(`Unverified (site refused the checker):\n${blocked.map(show).join('\n')}`);
if (dead.length) console.log(`Dead links:\n${dead.map(show).join('\n')}`);
console.log(`${urls.length} links: ${urls.length - dead.length - blocked.length} ok, ${blocked.length} unverified, ${dead.length} dead.`);
process.exit(dead.length ? 1 : 0);
