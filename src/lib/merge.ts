import type { AppState, ExamProgress, MockRecord, RoadmapState } from './store';
import { pruneMocks } from './store';

/**
 * Combine progress from two devices without losing work from either.
 * Per item, the most recently touched copy wins; lists (lessons, days, mocks) are unioned.
 * Device-only settings (theme, reading preferences) come from `local`.
 */
export function mergeStates(local: AppState, remote: AppState): AppState {
  const ex: Record<string, ExamProgress> = {};
  for (const key of new Set([...Object.keys(local.ex), ...Object.keys(remote.ex)])) {
    const a = local.ex[key], b = remote.ex[key];
    ex[key] = a && b ? mergeExam(a, b, local.updatedAt >= remote.updatedAt) : structuredClone(a ?? b);
  }
  return {
    v: 1,
    theme: local.theme,
    ...(local.reading ? { reading: local.reading } : {}),
    ex,
    days: [...new Set([...local.days, ...remote.days])].sort().slice(-400),
    ...(local.roadmap || remote.roadmap ? { roadmap: mergeRoadmap(local.roadmap, remote.roadmap, local.updatedAt >= remote.updatedAt) } : {}),
    updatedAt: Math.max(local.updatedAt, remote.updatedAt),
  };
}

function mergeExam(a: ExamProgress, b: ExamProgress, aIsNewer: boolean): ExamProgress {
  const newer = aIsNewer ? a : b;
  const pick = <T,>(x: Record<string, T>, y: Record<string, T>, better: (p: T, q: T) => boolean) => {
    const out: Record<string, T> = { ...x };
    for (const [k, v] of Object.entries(y)) if (!(k in out) || better(v, out[k])) out[k] = v;
    return out;
  };
  const mocks = new Map<number, MockRecord>();
  [...a.mocks, ...b.mocks].forEach(m => { const seen = mocks.get(m.date); if (!seen || (m.qids && !seen.qids)) mocks.set(m.date, m); });
  const active = [a.activeMock, b.activeMock].filter(Boolean).sort((x, y) => y!.start - x!.start)[0];
  const out: ExamProgress = {
    q: pick(a.q, b.q, (p, q) => p.last > q.last),
    cards: pick(a.cards, b.cards, (p, q) => (p.at ?? 0) > (q.at ?? 0)),
    // Keep the earliest completion time for a lesson read on both devices.
    lessons: pick(a.lessons, b.lessons, (p, q) => p < q),
    newCards: pick(a.newCards, b.newCards, (p, q) => p < q),
    mocks: pruneMocks([...mocks.values()].sort((x, y) => x.date - y.date)),
  };
  // A mock already submitted on either device is finished, so drop a stale in-progress copy of it.
  if (active && !out.mocks.some(m => m.date >= active.start)) out.activeMock = structuredClone(active);
  if (newer.examDate ?? (aIsNewer ? b : a).examDate) out.examDate = newer.examDate ?? (aIsNewer ? b : a).examDate;
  if (newer.hours ?? (aIsNewer ? b : a).hours) out.hours = newer.hours ?? (aIsNewer ? b : a).hours;
  return structuredClone(out);
}

function mergeRoadmap(a: RoadmapState | undefined, b: RoadmapState | undefined, aIsNewer: boolean): RoadmapState {
  const [newer, older] = aIsNewer ? [a, b] : [b, a];
  // Ticks and unticks both carry a time, so an untick on one device isn't undone by an older tick on another.
  // On a tie the newer device wins, because it is applied last.
  const tasks: RoadmapState['tasks'] = {};
  for (const src of [older, newer]) for (const [k, v] of Object.entries(src?.tasks ?? {})) if (!tasks[k] || v.at >= tasks[k].at) tasks[k] = v;
  const out: RoadmapState = { tasks };
  const cloud = newer?.cloud ?? older?.cloud, start = newer?.start ?? older?.start;
  if (cloud) out.cloud = cloud;
  if (start) out.start = start;
  return structuredClone(out);
}

/** True when the two states hold the same progress (ignores timestamps and theme). */
export function sameProgress(a: AppState, b: AppState) {
  return canonical([a.ex, a.days, a.roadmap]) === canonical([b.ex, b.days, b.roadmap]);
}

// JSON with sorted keys, so key order from merging doesn't make equal states look different.
const canonical = (v: unknown): string =>
  v === null || typeof v !== 'object' ? JSON.stringify(v) ?? 'null'
    : Array.isArray(v) ? `[${v.map(canonical).join(',')}]`
      : `{${Object.keys(v).filter(k => (v as Record<string, unknown>)[k] !== undefined).sort().map(k => `${JSON.stringify(k)}:${canonical((v as Record<string, unknown>)[k])}`).join(',')}}`;
