import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// BASE_PATH is "/" on a custom domain and "/<repo>/" on <user>.github.io/<repo>/ (set by the deploy workflow).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  test: { environment: 'node' },
});
