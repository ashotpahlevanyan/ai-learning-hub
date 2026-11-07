import type { Exam, Question } from './types';
import type { ActiveMock, ExamProgress } from './store';

export function shuffle<T>(a: T[], rand = Math.random): T[] {
  const out = a.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const sameSet = (a: number[], b: number[]) => a.length === b.length && a.every(x => b.includes(x));
export const letter = (i: number) => 'ABCDEFGH'[i];
/** Linear approximation of the 100–1000 scaled score; the real scaling is not published. */
export const scaled = (pct: number) => Math.round(100 + 900 * pct);
export const pctToPass = (passing: number) => (passing - 100) / 900;

export interface DomainStat { total: number; seen: number; ok: number; acc: number; mastery: number }

/** mastery = accuracy on questions seen × coverage (seen at least ~12 questions in the domain). */
export function domainStats(exam: Exam, p: ExamProgress): Record<string, DomainStat> {
  const out: Record<string, DomainStat> = {};
  exam.domains.forEach(d => (out[d.id] = { total: 0, seen: 0, ok: 0, acc: 0, mastery: 0 }));
  for (const q of exam.questions) {
    const o = out[q.domain];
    if (!o) continue;
    o.total++;
    const st = p.q[q.id];
    if (st?.n) { o.seen++; if (st.lastOk) o.ok++; }
  }
  for (const o of Object.values(out)) {
    o.acc = o.seen ? o.ok / o.seen : 0;
    o.mastery = o.acc * (o.total ? Math.min(1, o.seen / Math.min(o.total, 12)) : 0);
  }
  return out;
}

export function readiness(exam: Exam, p: ExamProgress) {
  const ds = domainStats(exam, p);
  const w = exam.domains.reduce((s, d) => s + d.weight, 0) || 1;
  return exam.domains.reduce((s, d) => s + d.weight * ds[d.id].mastery, 0) / w;
}

export type PracticeMode = 'smart' | 'unseen' | 'mistakes' | 'random';
export interface PracticeItem { id: string; order: number[]; picked: number[]; done: boolean; ok?: boolean }

export function buildPractice(exam: Exam, p: ExamProgress, domains: string[], mode: PracticeMode, count: number): PracticeItem[] {
  const ds = domainStats(exam, p);
  let pool = exam.questions.filter(q => domains.includes(q.domain));
  if (mode === 'unseen') pool = pool.filter(q => !p.q[q.id]);
  if (mode === 'mistakes') pool = pool.filter(q => p.q[q.id] && !p.q[q.id].lastOk);
  if (mode === 'smart') {
    pool = pool
      .map(q => {
        const st = p.q[q.id];
        let score = Math.random() * 1.5 + (1 - ds[q.domain].mastery) * 2;
        if (!st) score += 2;
        else if (!st.lastOk) score += 3;
        else score -= Math.min(3, st.c) * 0.7;
        return { q, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(x => x.q);
  } else pool = shuffle(pool);
  return pool.slice(0, count).map(q => ({ id: q.id, order: shuffle(q.options.map((_, i) => i)), picked: [], done: false }));
}

/** Allocate questions per domain by weight (largest remainder), then sample. */
export function allocate(exam: Exam, n: number): Record<string, number> {
  const byDom: Record<string, number> = {};
  exam.questions.forEach(q => (byDom[q.domain] = (byDom[q.domain] || 0) + 1));
  const rows = exam.domains.map(d => {
    const exact = (n * d.weight) / 100;
    return { id: d.id, exact, n: Math.min(Math.floor(exact), byDom[d.id] || 0) };
  });
  let left = n - rows.reduce((s, r) => s + r.n, 0);
  for (const r of [...rows].sort((a, b) => (b.exact % 1) - (a.exact % 1))) {
    if (left > 0 && r.n < (byDom[r.id] || 0)) { r.n++; left--; }
  }
  return Object.fromEntries(rows.map(r => [r.id, r.n]));
}

export function buildMock(exam: Exam, size = exam.items, minutes = exam.minutes): ActiveMock {
  const n = Math.min(size, exam.questions.length);
  const alloc = allocate(exam, n);
  let picked: Question[] = [];
  for (const d of exam.domains) picked = picked.concat(shuffle(exam.questions.filter(q => q.domain === d.id)).slice(0, alloc[d.id]));
  if (picked.length < n) picked = picked.concat(shuffle(exam.questions.filter(q => !picked.includes(q))).slice(0, n - picked.length));
  picked = shuffle(picked);
  return {
    qids: picked.map(q => q.id),
    orders: picked.map(q => shuffle(q.options.map((_, i) => i))),
    answers: {}, flags: {}, start: Date.now(), duration: minutes * 60, i: 0,
  };
}

export function fmtTime(sec: number) {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

export const barTone = (v: number) => (v >= 0.8 ? 'good' : v >= 0.6 ? 'warn' : 'bad');
