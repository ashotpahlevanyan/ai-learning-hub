import { describe, expect, it } from 'vitest';
import { DAY, nextCardState } from './srs';
import { allocate, buildMock, readiness, sameSet, scaled } from './quiz';
import { emptyProgress, pruneMocks, type MockRecord } from './store';
import type { Exam } from './types';

const now = 1_700_000_000_000;

describe('flashcard scheduling', () => {
  it('shows a failed card again in 10 minutes and resets its streak', () => {
    const c = nextCardState({ ef: 2.5, int: 10, rep: 4, due: 0 }, 0, now);
    expect(c.rep).toBe(0);
    expect(c.due).toBe(now + 10 * 60_000);
  });
  it('grows intervals 1 → 3 → ~ef× days on "good"', () => {
    const a = nextCardState(undefined, 4, now);
    const b = nextCardState(a, 4, now);
    const c = nextCardState(b, 4, now);
    expect([a.int, b.int]).toEqual([1, 3]);
    expect(c.int).toBe(Math.round(3 * b.ef));
    expect(c.due).toBe(now + c.int * DAY);
  });
  it('never lets ease drop below 1.3', () => {
    let c = nextCardState(undefined, 3, now);
    for (let i = 0; i < 20; i++) c = nextCardState(c, 3, now);
    expect(c.ef).toBeGreaterThanOrEqual(1.3);
  });
});

const exam = {
  id: 'x', code: 'X', name: 'X', level: '', items: 10, minutes: 10, passing: 720,
  domains: [{ id: 'a', name: 'A', weight: 60 }, { id: 'b', name: 'B', weight: 40 }],
  lessons: [], flashcards: [],
  questions: Array.from({ length: 30 }, (_, i) => ({
    id: `q${i}`, domain: i < 20 ? 'a' : 'b', stem: 's', options: ['1', '2', '3', '4'], answer: [i % 4], explanation: 'e',
  })),
} satisfies Exam;

describe('mock exams', () => {
  it('allocates questions by domain weight', () => {
    expect(allocate(exam, 10)).toEqual({ a: 6, b: 4 });
  });
  it('builds a mock of the requested size with no repeats and a permutation per question', () => {
    const m = buildMock(exam, 10, 10);
    expect(m.qids).toHaveLength(10);
    expect(new Set(m.qids).size).toBe(10);
    m.orders.forEach(o => expect([...o].sort()).toEqual([0, 1, 2, 3]));
    expect(m.duration).toBe(600);
  });
  it('maps percent correct to the 100–1000 scale', () => {
    expect(scaled(0)).toBe(100);
    expect(scaled(1)).toBe(1000);
  });
  it('treats multi-answer picks as a set', () => {
    expect(sameSet([2, 0], [0, 2])).toBe(true);
    expect(sameSet([0], [0, 2])).toBe(false);
  });
  it('keeps question detail only for the 15 most recent mocks', () => {
    const mocks = Array.from({ length: 18 }, (_, i) => ({ date: i, qids: ['q1'] }) as unknown as MockRecord);
    const kept = pruneMocks(mocks);
    expect(kept.filter(m => m.qids).length).toBe(15);
    expect(kept[0].qids).toBeUndefined();
  });
});

describe('readiness', () => {
  it('is 0 with no answers and 1 when every question is answered correctly', () => {
    const p = emptyProgress();
    expect(readiness(exam, p)).toBe(0);
    exam.questions.forEach(q => (p.q[q.id] = { n: 1, c: 1, lastOk: true, last: now }));
    expect(readiness(exam, p)).toBe(1);
  });
});
