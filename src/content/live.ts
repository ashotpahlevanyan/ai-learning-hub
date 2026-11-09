// Switches exam and guide loading to the content database when the site is built with
// VITE_CONTENT_SOURCE=db (plus VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).
// Order of preference for each exam: the database, then the last copy fetched from it (kept in the
// Cache API for offline use), then the bundled JSON. The site never breaks because the database is down.
import type { Exam } from '../lib/types';
import { fetchExam, fetchGuide, type DbConfig } from '../lib/dbContent';
import { tracks } from './index';

const env = import.meta.env;
export const contentFromDb = env.VITE_CONTENT_SOURCE === 'db' && !!env.VITE_SUPABASE_URL && !!env.VITE_SUPABASE_ANON_KEY;

const CACHE = 'db-content-v1';
const cacheUrl = (key: string) => `${location.origin}/__db-content/${key}.json`;

async function remember(key: string, value: unknown) {
  try { await (await caches.open(CACHE)).put(cacheUrl(key), new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } })); } catch { /* no Cache API: skip */ }
}
async function recall<T>(key: string): Promise<T | undefined> {
  try { return await (await (await caches.open(CACHE)).match(cacheUrl(key)))?.json(); } catch { return undefined; }
}

async function preferDb<T>(key: string, remote: () => Promise<T>, bundled: () => Promise<T>): Promise<T> {
  try {
    const v = await remote();
    void remember(key, v);
    return v;
  } catch (err) {
    console.warn(`Content database unavailable for ${key}; using a local copy.`, err);
    const cached = await recall<T>(key);
    if (cached) return cached;
    return bundled();
  }
}

/**
 * Call once at startup. Does nothing unless the build enables database content.
 * The timeout is short: a slow database should not keep a page waiting when a local copy is at hand.
 */
export function enableDatabaseContent(cfg: DbConfig = { url: env.VITE_SUPABASE_URL, key: env.VITE_SUPABASE_ANON_KEY, timeout: 6000 }) {
  if (!contentFromDb) return;
  for (const t of tracks) {
    const guide = t.loadGuide;
    t.loadGuide = () => preferDb(`guide/${t.id}`, () => fetchGuide(cfg, t.id), guide);
    for (const s of t.exams) {
      const bundled = s.load, key = `${t.id}/${s.id}`;
      s.load = () => preferDb<Exam>(key, () => fetchExam(cfg, key), bundled);
    }
  }
}
