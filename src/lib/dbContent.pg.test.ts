// End-to-end check of the database path against real Postgres (PGlite, in-process):
// supabase/content.sql + the exporter's SQL load cleanly (twice, so reloads work), and every exam and guide
// read back through dbContent equals the bundle. A tiny PostgREST stand-in turns the REST URLs into SQL.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { tracks } from '../content';
import { fetchExam, fetchGuide, type DbConfig } from './dbContent';
import { canonical, expectedFromDb } from './contentRows';

let db: PGlite, out: string, cfg: DbConfig;
const ident = (s: string) => { if (!/^[a-z_]+$/.test(s)) throw new Error(`bad identifier ${s}`); return s; };

/** Answers the subset of PostgREST that dbContent uses: eq filters, order, limit, offset, select. */
const rest = (async (input: string | URL, init?: RequestInit) => {
  const u = new URL(String(input)), table = ident(u.pathname.split('/').pop()!);
  const where: string[] = [], args: string[] = [];
  let order = '', limit = '', offset = '', select = '*';
  for (const [k, v] of u.searchParams) {
    if (k === 'order') order = ` order by ${v.split(',').map(ident).join(', ')}`;
    else if (k === 'limit') limit = ` limit ${Number(v)}`;
    else if (k === 'offset') offset = ` offset ${Number(v)}`;
    else if (k === 'select') select = v === '*' ? '*' : v.split(',').map(ident).join(', ');
    else if (v.startsWith('eq.')) { args.push(v.slice(3)); where.push(`${ident(k)}::text = $${args.length}`); }
  }
  const sql = `select coalesce(json_agg(t), '[]'::json) as rows from (select ${select} from public.${table}${where.length ? ` where ${where.join(' and ')}` : ''}${order}${limit}${offset}) t`;
  const r = await db.query<{ rows: unknown[] }>(sql, args);
  const headers: Record<string, string> = {};
  if ((init?.headers as Record<string, string> | undefined)?.Prefer === 'count=exact') {
    const c = await db.query<{ n: number }>(`select count(*)::int as n from public.${table}${where.length ? ` where ${where.join(' and ')}` : ''}`, args);
    headers['Content-Range'] = `0-${r.rows[0].rows.length - 1}/${c.rows[0].n}`;
  }
  return new Response(JSON.stringify(r.rows[0].rows), { status: 200, headers });
}) as unknown as typeof fetch;

const loadAll = async () => {
  for (const f of readdirSync(join(out, 'sql')).sort()) await db.exec(readFileSync(join(out, 'sql', f), 'utf8'));
};
const loadAtomic = async () => db.exec(readFileSync(join(out, 'load.sql'), 'utf8'));

beforeAll(async () => {
  out = mkdtempSync(join(tmpdir(), 'content-export-'));
  execFileSync('npx', ['vite-node', 'scripts/export-content.ts', out], { stdio: 'pipe' });
  db = new PGlite();
  // Supabase's API roles, which the schema grants read access to.
  await db.exec('create role anon; create role authenticated; create role service_role;');
  await db.exec(readFileSync('supabase/content.sql', 'utf8'));
  await loadAll();
  await db.exec(readFileSync('supabase/content.sql', 'utf8')); // the deploy re-runs the schema script each time
  await loadAtomic(); // a reload must replace, not duplicate or fail
  cfg = { url: 'https://db.test', key: 'anon', pageSize: 300, fetch: rest };
}, 180000);

afterAll(async () => {
  await db?.close();
  if (out && out.startsWith(tmpdir())) rmSync(out, { recursive: true, force: true });
});

describe('content database (Postgres)', () => {
  it('stamps every exam with a content version', async () => {
    const r = await db.query<{ n: number }>('select count(*)::int as n from public.exams where version is null');
    expect(r.rows[0].n).toBe(0);
  });

  it('holds one row per exam', async () => {
    const r = await db.query<{ n: number }>('select count(*)::int as n from public.exams');
    expect(r.rows[0].n).toBe(tracks.reduce((s, t) => s + t.exams.length, 0));
  });

  it('lets anon read content but not write it', async () => {
    await db.exec('set role anon');
    try {
      await expect(db.query('select 1 from public.questions limit 1')).resolves.toBeTruthy();
      await expect(db.query('delete from public.questions')).rejects.toThrow(/permission denied/);
    } finally { await db.exec('reset role'); }
  });

  it.each(tracks.flatMap(t => t.exams.map(s => [`${t.id}/${s.id}`, s] as const)))('serves %s exactly as bundled', async (key, s) => {
    expect(canonical(await fetchExam(cfg, key))).toEqual(expectedFromDb(await s.load(), s));
  });

  it.each(tracks.map(t => [t.id, t] as const))('serves the %s guide', async (id, t) => {
    expect(await fetchGuide(cfg, id)).toBe(await t.loadGuide());
  });
});
