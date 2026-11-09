import { describe, expect, it } from 'vitest';
import { mergeStates, sameProgress } from './merge';
import { emptyProgress, type AppState, type ExamProgress } from './store';

const state = (ex: Record<string, Partial<ExamProgress>>, days: string[] = [], updatedAt = 1): AppState => ({
  v: 1, days, updatedAt, ex: Object.fromEntries(Object.entries(ex).map(([k, v]) => [k, { ...emptyProgress(), ...v }])),
});

describe('mergeStates', () => {
  it('keeps exams that exist on only one device', () => {
    const m = mergeStates(state({ 'aws/aif-c01': { lessons: { l1: 5 } } }), state({ 'nvidia/nca-genl': { lessons: { l2: 6 } } }));
    expect(Object.keys(m.ex).sort()).toEqual(['aws/aif-c01', 'nvidia/nca-genl']);
  });

  it('keeps the most recent answer for each question and unions the rest', () => {
    const a = state({ x: { q: { q1: { n: 3, c: 1, lastOk: false, last: 100 }, q2: { n: 1, c: 1, lastOk: true, last: 50 } } } });
    const b = state({ x: { q: { q1: { n: 2, c: 2, lastOk: true, last: 200 }, q3: { n: 1, c: 0, lastOk: false, last: 70 } } } });
    const q = mergeStates(a, b).ex.x.q;
    expect(q.q1.last).toBe(200);
    expect(q.q1.lastOk).toBe(true);
    expect(Object.keys(q).sort()).toEqual(['q1', 'q2', 'q3']);
  });

  it('keeps the most recently reviewed flashcard state', () => {
    const a = state({ x: { cards: { c1: { ef: 2.5, int: 1, rep: 1, due: 10, at: 300 } } } });
    const b = state({ x: { cards: { c1: { ef: 2.6, int: 6, rep: 2, due: 20, at: 400 } } } });
    expect(mergeStates(a, b).ex.x.cards.c1.rep).toBe(2);
    expect(mergeStates(b, a).ex.x.cards.c1.rep).toBe(2);
  });

  it('unions lessons (earliest completion), study days and mocks without duplicates', () => {
    const mock = { date: 1000, pct: 0.8, score: 800, n: 20, ok: 16, secs: 600, dom: {} };
    const a = state({ x: { lessons: { l1: 9, l2: 3 }, mocks: [mock] } }, ['2026-11-01', '2026-11-03']);
    const b = state({ x: { lessons: { l1: 4, l3: 7 }, mocks: [mock, { ...mock, date: 2000, score: 700 }] } }, ['2026-11-02', '2026-11-03']);
    const m = mergeStates(a, b);
    expect(m.ex.x.lessons).toEqual({ l1: 4, l2: 3, l3: 7 });
    expect(m.ex.x.mocks.map(x => x.date)).toEqual([1000, 2000]);
    expect(m.days).toEqual(['2026-11-01', '2026-11-02', '2026-11-03']);
  });

  it('drops an in-progress mock that was already submitted on the other device', () => {
    const active = { qids: ['a'], orders: [[0, 1, 2, 3]], answers: {}, flags: {}, start: 500, duration: 60, i: 0 };
    const a = state({ x: { activeMock: active } });
    const b = state({ x: { mocks: [{ date: 900, pct: 1, score: 1000, n: 1, ok: 1, secs: 30, dom: {} }] } });
    expect(mergeStates(a, b).ex.x.activeMock).toBeUndefined();
    expect(mergeStates(a, state({ x: {} })).ex.x.activeMock?.start).toBe(500);
  });

  it('takes the exam date from the more recently updated device and keeps the local theme', () => {
    const a = { ...state({ x: { examDate: '2026-12-01' } }, [], 10), theme: 'dark' as const };
    const b = state({ x: { examDate: '2027-01-15' } }, [], 20);
    const m = mergeStates(a, b);
    expect(m.ex.x.examDate).toBe('2027-01-15');
    expect(m.theme).toBe('dark');
    expect(m.updatedAt).toBe(20);
  });

  it('merges roadmap ticks by latest change, so an untick on one device wins over an older tick', () => {
    const a = { ...state({}, [], 10), roadmap: { tasks: { 'w1-0': { ok: true, at: 100 }, 'w1-1': { ok: false, at: 300 } }, cloud: 'azure' as const } };
    const b = { ...state({}, [], 20), roadmap: { tasks: { 'w1-1': { ok: true, at: 200 }, 'w2-0': { ok: true, at: 50 } }, start: '2026-12-01' } };
    const r = mergeStates(a, b).roadmap!;
    expect(r.tasks).toEqual({ 'w1-0': { ok: true, at: 100 }, 'w1-1': { ok: false, at: 300 }, 'w2-0': { ok: true, at: 50 } });
    expect(r.cloud).toBe('azure');
    expect(r.start).toBe('2026-12-01');
    expect(mergeStates(state({}), state({})).roadmap).toBeUndefined();
    expect(sameProgress(a, { ...a, roadmap: { tasks: {} } })).toBe(false);
  });

  it('is idempotent and order-insensitive for progress', () => {
    const a = state({ x: { lessons: { l1: 1 }, q: { q1: { n: 1, c: 1, lastOk: true, last: 5 } } } }, ['2026-11-01']);
    const b = state({ x: { lessons: { l2: 2 } }, y: { lessons: { l9: 3 } } }, ['2026-11-02']);
    const ab = mergeStates(a, b);
    expect(sameProgress(ab, mergeStates(b, a))).toBe(true);
    expect(sameProgress(mergeStates(ab, b), ab)).toBe(true);
    expect(sameProgress(a, b)).toBe(false);
  });
});
