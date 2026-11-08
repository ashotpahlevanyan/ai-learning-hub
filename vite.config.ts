import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { studyTime, type StudyTime } from './src/lib/studyTime';

// Content-Security-Policy for production only (the dev server needs inline scripts for hot reload).
// GitHub Pages can't set headers, so it ships as a <meta> tag.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'none'",
  "object-src 'none'",
].join('; ');

const csp = (): Plugin => ({
  name: 'csp-meta',
  apply: 'build',
  transformIndexHtml: html => html.replace('<head>', `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
});

// Track pages show study time without loading every exam bundle, so it is summed here at build time.
const studyTimes = (): Plugin => {
  const id = 'virtual:study-time', resolved = '\0' + id;
  return {
    name: 'study-time',
    resolveId: s => (s === id ? resolved : undefined),
    // Recompute when an exam bundle is added or removed while the dev server runs (edits are covered by addWatchFile).
    configureServer(server) {
      const refresh = (f: string) => {
        if (!/tracks[\\/][^\\/]+[\\/]exams[\\/][^\\/]+\.json$/.test(f)) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.reloadModule(mod);
      };
      server.watcher.on('add', refresh).on('unlink', refresh);
    },
    load(s) {
      if (s !== resolved) return;
      const dir = 'src/content/tracks', out: Record<string, StudyTime> = {};
      for (const t of readdirSync(dir)) {
        const exams = join(dir, t, 'exams');
        if (!existsSync(exams)) continue;
        for (const f of readdirSync(exams).filter(f => f.endsWith('.json'))) {
          this.addWatchFile(resolve(exams, f));
          const exam = JSON.parse(readFileSync(join(exams, f), 'utf8'));
          if (exam.id && exam.lessons) out[`${t}/${exam.id}`] = studyTime(exam);
        }
      }
      return `export default ${JSON.stringify(out)};`;
    },
  };
};

// BASE_PATH is "/" on a custom domain and "/<repo>/" on <user>.github.io/<repo>/ (set by the deploy workflow).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), csp(), studyTimes()],
  test: { environment: 'node' },
});
