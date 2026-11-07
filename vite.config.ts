import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

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

// BASE_PATH is "/" on a custom domain and "/<repo>/" on <user>.github.io/<repo>/ (set by the deploy workflow).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), csp()],
  test: { environment: 'node' },
});
