// Runs after `vite build`: SPA fallback for GitHub Pages, robots.txt, sitemap.xml and the offline service worker.
// SITE_URL (e.g. https://learn.example.com or https://user.github.io/repo) enables absolute URLs in the sitemap.
import { copyFileSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const dist = 'dist';
const tracksDir = 'src/content/tracks';
const site = (process.env.SITE_URL || '').replace(/\/$/, '');

// Social previews need absolute URLs: rewrite og:image and add og:url when the site URL is known.
if (site) {
  const indexPath = join(dist, 'index.html');
  const html = readFileSync(indexPath, 'utf8')
    .replace(/(<meta property="og:image" content=")[^"]*og-image\.png"/, `$1${site}/og-image.png"`)
    .replace('<meta property="og:type"', `<meta property="og:url" content="${site}/" />\n    <meta property="og:type"`);
  writeFileSync(indexPath, html);
}
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
const robots = ['User-agent: *', 'Allow: /'];

if (site) {
  // Published tracks are the ones listed in the registry array in src/content/index.ts.
  const registry = readFileSync('src/content/index.ts', 'utf8').match(/export const tracks: Track\[\] = \[([^\]]*)\]/);
  const published = registry ? registry[1].split(',').map(s => s.trim()).filter(Boolean) : [];
  const paths = ['/', '/about'];
  for (const t of published) {
    paths.push(`/${t}`, `/${t}/guide`);
    const examsDir = join(tracksDir, t, 'exams');
    if (!existsSync(examsDir)) continue;
    for (const f of readdirSync(examsDir).filter(f => f.endsWith('.json'))) {
      const exam = JSON.parse(readFileSync(join(examsDir, f), 'utf8'));
      if (!exam.id) continue;
      const base = `/${t}/${exam.id}`;
      paths.push(base, `${base}/guide`, `${base}/learn`, ...(exam.lessons || []).map(l => `${base}/learn/${l.id}`));
    }
  }
  const urls = paths.map(p => `  <url><loc>${site}${p === '/' ? '/' : p}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots.push(`Sitemap: ${site}/sitemap.xml`);
  console.log(`sitemap.xml: ${paths.length} URLs for ${published.join(', ')}`);
}
writeFileSync(join(dist, 'robots.txt'), robots.join('\n') + '\n');

// Service worker: precache the app shell; exam bundles and runbooks are cached the first time they load.
const examIds = readdirSync(tracksDir).flatMap(t => {
  const dir = join(tracksDir, t, 'exams');
  return existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')) : [];
});
const onDemand = new RegExp(`^(${[...examIds, 'runbook'].map(x => x.replace(/[-]/g, '\\-')).join('|')})-[\\w-]{8}\\.js$`);
const shell = [
  'index.html', 'manifest.webmanifest', 'favicon.svg', 'icon-192.png', 'apple-touch-icon.png',
  ...readdirSync(join(dist, 'assets')).filter(f => !onDemand.test(f)).map(f => `assets/${f}`),
];
const version = createHash('sha256').update(shell.join('|') + readdirSync(join(dist, 'assets')).join('|')).digest('hex').slice(0, 12);
writeFileSync(join(dist, 'sw.js'), `const CACHE = 'alh-${version}';
const SHELL = ${JSON.stringify(shell)};
const url = p => new URL(p, self.registration.scope).href;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(url))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('alh-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Pages: network first so deploys show up; fall back to the cached app shell offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match(url('index.html'))));
    return;
  }
  // Hashed assets never change: serve from cache, else fetch and keep a copy.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
`);
console.log(`sw.js: ${shell.length} shell files precached, ${readdirSync(join(dist, 'assets')).filter(f => onDemand.test(f)).length} cached on demand`);
