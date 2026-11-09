import { describe, expect, it } from 'vitest';
import { tracks } from '../content';
import { assembleExam, fetchExam, type ExamRows, type Row } from './dbContent';
import { canonical, examToRows, expectedFromDb } from './contentRows';

const canon = canonical, expected = expectedFromDb;

const all = tracks.flatMap(t => t.exams.map((s, i) => [`${t.id}/${s.id}`, t.id, i, s] as const));

describe.each(all)('database round trip %s', (_, trackId, i, s) => {
  it('rebuilds the bundle exactly from its rows', async () => {
    const e = await s.load();
    expect(canon(assembleExam(examToRows(trackId, i, s, e)))).toEqual(expected(e, s));
  });
});

// A fake PostgREST that answers from in-memory rows, honouring eq filters, order, limit and offset.
interface FakeOpts {
  onRequest?: (u: URL) => void;
  /** Rows the server returns per request at most, like Supabase's max-rows setting. */
  maxRows?: number;
  /** Rows of this table the server silently drops, while still counting them. */
  dropFrom?: string;
  /** Rewrites a table's rows per request number, e.g. to simulate a reload mid-read. */
  mutate?: (table: string, rows: Row[], request: number) => Row[];
}

// A fake PostgREST that answers from in-memory rows: eq filters, limit, offset, and Content-Range with Prefer: count=exact.
function fakeRest(rows: ExamRows, o: FakeOpts = {}): typeof fetch {
  const tables: Record<string, Row[]> = { exams: [rows.exam], ...Object.fromEntries(Object.entries(rows).filter(([k]) => k !== 'exam')) };
  let n = 0;
  return (async (input: string | URL, init?: RequestInit) => {
    const u = new URL(String(input)), table = u.pathname.split('/').pop()!;
    o.onRequest?.(u);
    let list = tables[table] ?? [];
    if (o.mutate) list = o.mutate(table, list, n++);
    for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) list = list.filter(r => String(r[k]) === v.slice(3));
    const total = list.length;
    if (o.dropFrom === table) list = list.slice(0, -1);
    const off = Number(u.searchParams.get('offset') ?? 0), lim = Math.min(Number(u.searchParams.get('limit') ?? 1e9), o.maxRows ?? 1e9);
    const page = list.slice(off, off + lim);
    const headers: Record<string, string> = {};
    if ((init?.headers as Record<string, string> | undefined)?.Prefer === 'count=exact') headers['Content-Range'] = `${off}-${off + page.length - 1}/${total}`;
    return new Response(JSON.stringify(page), { status: 200, headers });
  }) as typeof fetch;
}

describe('fetchExam', () => {
  const [, trackId, i, s] = all[0];
  it('reads every table and pages past the row cap', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    const seen: string[] = [];
    const pageSize = 50;
    const got = await fetchExam({ url: 'https://db.test', key: 'anon', pageSize, fetch: fakeRest(rows, { onRequest: u => seen.push(u.pathname) }) }, `${trackId}/${s.id}`);
    expect(canon(got)).toEqual(expected(e, s));
    expect(rows.question_options.length).toBeGreaterThan(pageSize * 2);
    expect(seen.filter(p => p === '/rest/v1/question_options').length).toBe(Math.floor(rows.question_options.length / pageSize) + 1);
  });

  it('reads everything when the server caps pages below the requested size', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    const got = await fetchExam({ url: 'https://db.test', key: 'anon', fetch: fakeRest(rows, { maxRows: 37 }) }, `${trackId}/${s.id}`);
    expect(canon(got)).toEqual(expected(e, s));
  });

  it('rejects a table that returns fewer rows than it counts', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    await expect(fetchExam({ url: 'https://db.test', key: 'anon', fetch: fakeRest(rows, { dropFrom: 'sources' }) }, `${trackId}/${s.id}`)).rejects.toThrow(/sources: got/);
  });

  it('rejects rows read across a reload', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    rows.exam.version = 'v1';
    // Requests 0-7 read the tables; the version check after them sees the new version.
    const mutate = (t: string, list: Row[], req: number) => (t === 'exams' && req > 7 ? list.map(r => ({ ...r, version: 'v2' })) : list);
    await expect(fetchExam({ url: 'https://db.test', key: 'anon', fetch: fakeRest(rows, { mutate }) }, `${trackId}/${s.id}`)).rejects.toThrow(/changed while/);
  });

  it('rejects an exam whose rows were only partly loaded', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    await expect(fetchExam({ url: 'https://db.test', key: 'anon', fetch: fakeRest({ ...rows, question_options: [] }) }, `${trackId}/${s.id}`)).rejects.toThrow(/incomplete/);
  });

  it('rejects an exam that is not in the database', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    await expect(fetchExam({ url: 'https://db.test', key: 'anon', fetch: fakeRest(rows) }, 'nope/none')).rejects.toThrow(/not in the database/);
  });

  it('reports HTTP errors', async () => {
    const fail = (async () => new Response('{}', { status: 503 })) as unknown as typeof fetch;
    await expect(fetchExam({ url: 'https://db.test', key: 'anon', fetch: fail }, `${trackId}/${s.id}`)).rejects.toThrow(/HTTP 503/);
  });
});
