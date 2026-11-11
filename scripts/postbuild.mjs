// Runs after `vite build`: SPA fallback for GitHub Pages, robots.txt, sitemap.xml and the offline service worker.
// SITE_URL (e.g. https://learn.example.com or https://user.github.io/repo) enables absolute URLs in the sitemap.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';

const dist = process.env.OUT_DIR || 'dist';
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
  const paths = ['/', '/about', '/library', '/roadmap'];
  // Title and description per URL, matching what each page sets with useMeta, for the prerendered copies below.
  const meta = {
    '/about': ['About and privacy', 'What AI Learning Hub is, how its content is made, and how your data is handled.'],
    '/library': ['Library', 'The best books, free online books, courses, papers and guides for AI certifications, LLMs, math and Python.'],
    '/roadmap': ['Six-month roadmap', 'A week-by-week, six-month plan to become a production AI engineer: one project, four certifications and the skills that keep you valuable.'],
  };
  const str = (src, key) => src.match(new RegExp(`${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'");
  for (const t of published) {
    paths.push(`/${t}`, `/${t}/guide`);
    const trackSrc = existsSync(join(tracksDir, t, 'track.ts')) ? readFileSync(join(tracksDir, t, 'track.ts'), 'utf8') : '';
    const trackName = str(trackSrc, 'name') || t;
    const allCourses = !/kind: 'exam'/.test(trackSrc);
    meta[`/${t}`] = [`${trackName} ${allCourses ? 'courses' : 'certification prep'}`, str(trackSrc, 'description') || str(trackSrc, 'tagline')];
    meta[`/${t}/guide`] = [`${trackName} study runbook`, `The complete written study runbook for the ${trackName} track.`];
    const examsDir = join(tracksDir, t, 'exams');
    if (!existsSync(examsDir)) continue;
    for (const f of readdirSync(examsDir).filter(f => f.endsWith('.json'))) {
      const exam = JSON.parse(readFileSync(join(examsDir, f), 'utf8'));
      if (!exam.id) continue;
      const base = `/${t}/${exam.id}`;
      paths.push(base, `${base}/guide`, `${base}/learn`, ...(exam.lessons || []).map(l => `${base}/learn/${l.id}`));
      const examMeta = [`${exam.code} ${exam.name}`, `${exam.kind === 'course' ? 'Course' : 'Exam prep'} for ${exam.name} (${exam.level}): lessons, flashcards, practice questions and timed mock exams.`];
      meta[base] = meta[`${base}/guide`] = meta[`${base}/learn`] = examMeta;
      for (const l of exam.lessons || []) meta[`${base}/learn/${l.id}`] = [l.title, l.summary || examMeta[1]];
    }
  }
  const urls = paths.map(p => `  <url><loc>${site}${p === '/' ? '/' : p}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots.push(`Sitemap: ${site}/sitemap.xml`);

  // GitHub Pages has no SPA rewrites: without a file per route, every deep link is served by 404.html with
  // HTTP status 404, which search engines and link previews treat as missing. Write <route>.html (served at
  // the extensionless URL) for every sitemap route, each with its own title, description and canonical URL.
  const shellHtml = readFileSync(join(dist, 'index.html'), 'utf8');
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const plain = v => String(v).replace(/\$\$?[^$]*\$\$?/g, '').replace(/[`*_]/g, '').replace(/\s+/g, ' ').trim();
  const page = (p, title, desc) => {
    const full = title ? `${plain(title)} · AI Learning Hub` : 'AI Learning Hub';
    let html = shellHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(full)}</title>`)
      .replace('</head>', `  <link rel="canonical" href="${site}${p}" />\n  </head>`);
    if (desc) html = html
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(plain(desc))}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(plain(desc))}"`);
    return html
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(full)}"`)
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${site}${p}"`);
  };
  writeFileSync(join(dist, 'index.html'), page('/', '', ''));
  let pre = 0;
  for (const p of paths) {
    if (p === '/') continue;
    const [title, desc] = meta[p] || [];
    const file = join(dist, `${p.slice(1)}.html`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(p, title, desc));
    pre++;
  }
  console.log(`prerender: ${pre} route files with their own title, description and canonical URL`);
  console.log(`sitemap.xml: ${paths.length} URLs for ${published.join(', ')}`);
}
writeFileSync(join(dist, 'robots.txt'), robots.join('\n') + '\n');

// Service worker: precache the app shell; exam bundles and runbooks are cached the first time they load.
const examIds = readdirSync(tracksDir).flatMap(t => {
  const dir = join(tracksDir, t, 'exams');
  return existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')) : [];
});
// Math rendering (the KaTeX chunk, its stylesheet and fonts) is also on demand: only math pages need it.
// So are the text fonts: the browser fetches only the faces and character subsets a page uses.
const onDemand = new RegExp(`^((${[...examIds, 'runbook', 'math'].map(x => x.replace(/[-]/g, '\\-')).join('|')})-[\\w-]{8}\\.(js|css)|KaTeX_.*|.*\\.woff2?)$`);
const shell = [
  'index.html', 'reading-init.js', 'manifest.webmanifest', 'favicon.svg', 'icon-192.png', 'apple-touch-icon.png',
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
  // Hashed build assets never change: serve from cache, else fetch and keep a copy.
  if (new URL(req.url).pathname.startsWith(new URL(url('assets/')).pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }
  // Everything else (manifest, icons, reading-init.js, sitemap) can change without a new name: network first.
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req)));
});
`);
console.log(`sw.js: ${shell.length} shell files precached, ${readdirSync(join(dist, 'assets')).filter(f => onDemand.test(f)).length} cached on demand`);
