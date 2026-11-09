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
function fakeRest(rows: ExamRows, onRequest?: (u: URL) => void): typeof fetch {
  const tables: Record<string, Row[]> = { exams: [rows.exam], ...Object.fromEntries(Object.entries(rows).filter(([k]) => k !== 'exam')) };
  return (async (input: string | URL) => {
    const u = new URL(String(input));
    onRequest?.(u);
    let list = tables[u.pathname.split('/').pop()!] ?? [];
    for (const [k, v] of u.searchParams) if (v.startsWith('eq.')) list = list.filter(r => String(r[k]) === v.slice(3));
    const off = Number(u.searchParams.get('offset') ?? 0), lim = Number(u.searchParams.get('limit') ?? 1e9);
    return new Response(JSON.stringify(list.slice(off, off + lim)), { status: 200 });
  }) as typeof fetch;
}

describe('fetchExam', () => {
  const [, trackId, i, s] = all[0];
  it('reads every table and pages past the row cap', async () => {
    const e = await s.load(), rows = examToRows(trackId, i, s, e);
    const seen: string[] = [];
    const pageSize = 50;
    const got = await fetchExam({ url: 'https://db.test', key: 'anon', pageSize, fetch: fakeRest(rows, u => seen.push(u.pathname)) }, `${trackId}/${s.id}`);
    expect(canon(got)).toEqual(expected(e, s));
    expect(rows.question_options.length).toBeGreaterThan(pageSize * 2);
    expect(seen.filter(p => p === '/rest/v1/question_options').length).toBe(Math.floor(rows.question_options.length / pageSize) + 1);
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
