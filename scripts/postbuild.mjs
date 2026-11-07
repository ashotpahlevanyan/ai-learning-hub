// Runs after `vite build`: SPA fallback for GitHub Pages, robots.txt and sitemap.xml.
// SITE_URL (e.g. https://learn.example.com or https://user.github.io/repo) enables absolute URLs in the sitemap.
import { copyFileSync, readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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
