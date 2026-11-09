// Turns one exam into database rows matching supabase/content.sql. Shared by the exporter
// (scripts/export-content.ts) and the round-trip test, so export and src/lib/dbContent.ts stay inverses.
import type { Exam, ExamSummary } from './types';
import type { ExamRows, Row } from './dbContent';

export function examToRows(trackId: string, position: number, s: ExamSummary, e: Exam, problems: string[] = []): ExamRows {
  const key = `${trackId}/${s.id}`;
  if (e.id !== s.id) problems.push(`${key}: bundle id is ${e.id}`);
  const r: Omit<ExamRows, 'exam'> = { domains: [], lessons: [], lesson_sections: [], questions: [], question_options: [], flashcards: [], sources: [] };
  const exam: Row = {
    key, track_id: trackId, id: s.id, position, kind: s.kind, code: s.code, name: s.name, level: s.level, tier: s.tier, audience: s.audience,
    price: s.price, items: s.items, minutes: s.minutes, passing: e.passing, format: e.format ?? null, scenarios: e.scenarios ?? [], review: e.review ?? null,
  };
  const domains = new Set(e.domains.map(d => d.id));
  const domainOf = (kind: string, id: string, d: string) => { if (!domains.has(d)) problems.push(`${key} ${kind} ${id}: unknown domain ${d}`); return d; };
  e.domains.forEach((d, i) => r.domains.push({ exam_key: key, id: d.id, position: i, name: d.name, weight: d.weight, summary: d.summary ?? null, subskills: d.subskills ?? [] }));
  e.lessons.forEach((l, i) => {
    r.lessons.push({ exam_key: key, id: l.id, domain_id: domainOf('lesson', l.id, l.domain), position: i, title: l.title, minutes: l.minutes ?? null, summary: l.summary ?? null, key_points: l.keyPoints ?? [], traps: l.gotchas ?? [], lab: l.lab ?? null });
    l.sections.forEach((sec, j) => r.lesson_sections.push({ exam_key: key, lesson_id: l.id, id: sec.id, position: j, heading: sec.heading, body: sec.body }));
    l.sources?.forEach((src, j) => r.sources.push({ exam_key: key, owner_type: 'lesson', owner_id: l.id, position: j, title: src.title, url: src.url }));
  });
  e.questions.forEach((q, i) => {
    r.questions.push({ exam_key: key, id: q.id, domain_id: domainOf('question', q.id, q.domain), position: i, difficulty: q.difficulty ?? null, scenario: q.scenario ?? null, stem: q.stem, explanation: q.explanation });
    q.options.forEach((o, j) => r.question_options.push({ exam_key: key, question_id: q.id, position: j, body: o, rationale: q.rationales?.[j] ?? null, is_correct: q.answer.includes(j) }));
    q.sources?.forEach((src, j) => r.sources.push({ exam_key: key, owner_type: 'question', owner_id: q.id, position: j, title: src.title, url: src.url }));
  });
  e.flashcards.forEach((c, i) => r.flashcards.push({ exam_key: key, id: c.id, domain_id: domainOf('flashcard', c.id, c.domain), position: i, front: c.front, back: c.back }));
  return { exam, ...r };
}

/** Drop absent and empty optional values so a bundle and its database copy compare equal. */
export const canonical = (x: unknown): unknown => {
  if (Array.isArray(x)) return x.map(canonical);
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x).filter(([, v]) => v != null && !(Array.isArray(v) && !v.length)).map(([k, v]) => [k, canonical(v)]));
  return x;
};

/** What the database copy of an exam should equal: the bundle, with listing fields taken from track.ts. */
export const expectedFromDb = (e: Exam, s: ExamSummary) =>
  canonical({ ...e, kind: s.kind, code: s.code, name: s.name, level: s.level, audience: s.audience, price: s.price, items: s.items, minutes: s.minutes });
