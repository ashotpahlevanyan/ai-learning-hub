// Checks that the content database serves exactly what the site bundles: every exam and every track guide.
// Run after loading (see README) with `npm run content:verify-db`. Reads SUPABASE_URL and SUPABASE_ANON_KEY
// (or the VITE_ versions, e.g. from .env.local). Exits non-zero on any difference, naming the first few.
import { tracks } from '../src/content';
import { fetchExam, fetchGuide } from '../src/lib/dbContent';
import { canonical, expectedFromDb } from '../src/lib/contentRows';

const url = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) { console.error('Set SUPABASE_URL and SUPABASE_ANON_KEY (or VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).'); process.exit(2); }
const cfg = { url, key, timeout: 30000 };

/** Path to the first place two values differ, or undefined when equal. */
function firstDiff(a: unknown, b: unknown, path = ''): string | undefined {
  if (a === b) return;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return `${path || '(root)'}: ${JSON.stringify(a)?.slice(0, 80)} ≠ ${JSON.stringify(b)?.slice(0, 80)}`;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const d = firstDiff((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], path ? `${path}.${k}` : k);
    if (d) return d;
  }
}

let bad = 0, ok = 0;
for (const t of tracks) {
  try {
    if ((await fetchGuide(cfg, t.id)) !== (await t.loadGuide())) { bad++; console.log(`✗ guide/${t.id}: differs from the bundled runbook`); } else ok++;
  } catch (e) { bad++; console.log(`✗ guide/${t.id}: ${(e as Error).message}`); }
  for (const s of t.exams) {
    const k = `${t.id}/${s.id}`;
    try {
      const d = firstDiff(canonical(await fetchExam(cfg, k)), expectedFromDb(await s.load(), s));
      if (d) { bad++; console.log(`✗ ${k}: ${d}`); } else { ok++; console.log(`✓ ${k}`); }
    } catch (e) { bad++; console.log(`✗ ${k}: ${(e as Error).message}`); }
  }
}
console.log(`\n${ok} match, ${bad} differ or failed.`);
process.exit(bad ? 1 : 0);
