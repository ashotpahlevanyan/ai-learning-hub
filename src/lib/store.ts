import { useSyncExternalStore } from 'react';

export interface QuestionStat { n: number; c: number; lastOk: boolean; last: number }
export interface CardState { ef: number; int: number; rep: number; due: number; at?: number }
export interface MockRecord {
  date: number; pct: number; score: number; n: number; ok: number; secs: number; timedOut?: boolean;
  dom: Record<string, [number, number]>;
  qids?: string[]; orders?: number[][]; answers?: Record<number, number[]>;
}
export interface ActiveMock {
  qids: string[]; orders: number[][]; answers: Record<number, number[]>; flags: Record<number, boolean>;
  start: number; duration: number; i: number;
}
export interface ExamProgress {
  q: Record<string, QuestionStat>;
  cards: Record<string, CardState>;
  lessons: Record<string, number>;
  newCards: Record<string, string>;
  mocks: MockRecord[];
  activeMock?: ActiveMock;
  examDate?: string;
  hours?: number;
}
/** The six-month roadmap: ticked tasks (latest change wins when devices merge), chosen cloud and start date. */
export interface RoadmapState {
  tasks: Record<string, { ok: boolean; at: number }>;
  cloud?: 'aws' | 'azure';
  start?: string;
}
export interface AppState {
  v: 1;
  theme?: 'light' | 'dark';
  /** keyed by "<trackId>/<examId>" so tracks never collide */
  ex: Record<string, ExamProgress>;
  days: string[];
  roadmap?: RoadmapState;
  updatedAt: number;
}

const KEY = 'aiLearningHub.v1';
const MAX_DETAILED_MOCKS = 15;

function read(): AppState {
  const empty: AppState = { v: 1, ex: {}, days: [], updatedAt: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

let state: AppState = typeof localStorage === 'undefined' ? { v: 1, ex: {}, days: [], updatedAt: 0 } : read();
const listeners = new Set<() => void>();

function write() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked: keep in memory */ }
  listeners.forEach(l => l());
}

export const getState = () => state;

/** Apply a change. The recipe mutates a structural copy, so React sees a new reference. */
export function update(recipe: (draft: AppState) => void) {
  const draft = structuredClone(state);
  recipe(draft);
  draft.updatedAt = Date.now();
  state = draft;
  write();
}

export function replaceState(next: AppState) {
  state = { ...next, updatedAt: Date.now() };
  write();
}

export const emptyProgress = (): ExamProgress => ({ q: {}, cards: {}, lessons: {}, newCards: {}, mocks: [] });

/** Get (creating if needed) one exam's progress inside a draft. */
export function progressIn(draft: AppState, key: string): ExamProgress {
  if (!draft.ex[key]) draft.ex[key] = emptyProgress();
  return draft.ex[key];
}

/** Call `cb` after every change; returns an unsubscribe function. */
export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, getState);
}

export function useProgress(key: string): ExamProgress {
  const s = useAppState();
  return s.ex[key] || EMPTY;
}
const EMPTY = emptyProgress();

export function today(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function touchDay(draft: AppState) {
  const d = today();
  if (draft.days[draft.days.length - 1] !== d) draft.days = [...draft.days, d].slice(-400);
}

export function streak(days: string[]) {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  if (!set.has(today(d))) d.setDate(d.getDate() - 1);
  while (set.has(today(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function recordAnswer(draft: AppState, key: string, qid: string, ok: boolean) {
  const p = progressIn(draft, key);
  const st = p.q[qid] || { n: 0, c: 0, lastOk: false, last: 0 };
  p.q[qid] = { n: st.n + 1, c: st.c + (ok ? 1 : 0), lastOk: ok, last: Date.now() };
  touchDay(draft);
}

/** Keep question-level detail only for recent mocks so storage stays small. */
export function pruneMocks(mocks: MockRecord[]): MockRecord[] {
  return mocks.map((m, i) => (i < mocks.length - MAX_DETAILED_MOCKS ? { ...m, qids: undefined, orders: undefined, answers: undefined } : m));
}
