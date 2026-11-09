// Reads exam content from the Postgres tables in supabase/content.sql through Supabase's REST API (PostgREST),
// and turns the rows back into the same Exam shape the bundled JSON has. The site uses it when built with
// VITE_CONTENT_SOURCE=db; any failure falls back to the bundled copy (see src/content/index.ts).
// It uses plain fetch so the Supabase client library stays out of the main bundle.
import type { Domain, Exam, Flashcard, Lesson, Question, Source } from './types';

// Values are whatever the REST API returns as JSON, so rows are loosely typed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export interface DbConfig {
  /** Project URL, e.g. https://abc.supabase.co */
  url: string;
  /** Anon (publishable) key; content tables allow public reads. */
  key: string;
  /** Rows per request (default PAGE). */
  pageSize?: number;
  /** Per-request timeout in milliseconds. */
  timeout?: number;
  fetch?: typeof fetch;
}

/** Rows of one exam, by table. */
export interface ExamRows {
  exam: Row;
  domains: Row[];
  lessons: Row[];
  lesson_sections: Row[];
  questions: Row[];
  question_options: Row[];
  flashcards: Row[];
  sources: Row[];
}

// Primary-key order makes paging stable.
const ORDER: Record<string, string> = {
  domains: 'position', lessons: 'position', lesson_sections: 'lesson_id,position', questions: 'position',
  question_options: 'question_id,position', flashcards: 'position', sources: 'owner_type,owner_id,position',
};
/** Supabase caps a response at 1000 rows by default (max-rows), so larger tables are read in pages. */
export const PAGE = 1000;

interface Page { rows: Row[]; /** Total matching rows, when the server reports it (Content-Range: 0-99/1234). */ total?: number }

async function get(cfg: DbConfig, path: string, count = false): Promise<Page> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), cfg.timeout ?? 10000);
  try {
    const headers: Record<string, string> = { apikey: cfg.key, Authorization: `Bearer ${cfg.key}`, Accept: 'application/json' };
    if (count) headers.Prefer = 'count=exact';
    const res = await (cfg.fetch ?? fetch)(`${cfg.url.replace(/\/$/, '')}/rest/v1/${path}`, { headers, signal: ctl.signal });
    if (!res.ok) throw new Error(`${path.split('?')[0]}: HTTP ${res.status}`);
    const total = Number(res.headers.get('content-range')?.split('/')[1]);
    return { rows: await res.json(), total: Number.isFinite(total) ? total : undefined };
  } finally {
    clearTimeout(timer);
  }
}

async function getAll(cfg: DbConfig, table: string, filter: string): Promise<Row[]> {
  const out: Row[] = [];
  const size = cfg.pageSize ?? PAGE;
  let total: number | undefined;
  // Advance by the rows actually received: the server may return fewer than asked for.
  for (let offset = 0; ; offset = out.length) {
    const page = await get(cfg, `${table}?${filter}&select=*&order=${ORDER[table]}&limit=${size}&offset=${offset}`, offset === 0);
    if (offset === 0) total = page.total;
    out.push(...page.rows);
    // With an exact count, page until every row is in; the server may cap pages below `size` (Supabase max-rows).
    if (total !== undefined ? out.length >= total || !page.rows.length : page.rows.length < size) break;
  }
  if (total !== undefined && out.length !== total) throw new Error(`${table}: got ${out.length} of ${total} rows`);
  return out;
}

export async function fetchExamRows(cfg: DbConfig, key: string): Promise<ExamRows> {
  const k = encodeURIComponent(key), f = `exam_key=eq.${k}`;
  const [exams, domains, lessons, lesson_sections, questions, question_options, flashcards, sources] = await Promise.all([
    get(cfg, `exams?key=eq.${k}&select=*`).then(p => p.rows),
    ...(['domains', 'lessons', 'lesson_sections', 'questions', 'question_options', 'flashcards', 'sources'] as const).map(t => getAll(cfg, t, f)),
  ]);
  if (!exams.length) throw new Error(`exam ${key} is not in the database`);
  // The tables are read in separate requests. If a reload committed in between, the exam's version changed:
  // reject the mix of old and new rows (the caller falls back) rather than show or cache it.
  const after = (await get(cfg, `exams?key=eq.${k}&select=version`)).rows[0];
  if ((after?.version ?? null) !== (exams[0].version ?? null)) throw new Error(`exam ${key} changed while it was being read`);
  return { exam: exams[0], domains, lessons, lesson_sections, questions, question_options, flashcards, sources };
}

/** Fetch one exam ("<track>/<exam>") and assemble it. Throws when the database is unreachable or the exam is incomplete. */
export async function fetchExam(cfg: DbConfig, key: string): Promise<Exam> {
  return assembleExam(await fetchExamRows(cfg, key));
}

/** The track's study guide (Markdown), or an error when it is missing. */
export async function fetchGuide(cfg: DbConfig, trackId: string): Promise<string> {
  const { rows } = await get(cfg, `tracks?id=eq.${encodeURIComponent(trackId)}&select=guide_md`);
  const md = rows[0]?.guide_md;
  if (typeof md !== 'string' || !md.trim()) throw new Error(`track ${trackId} has no guide in the database`);
  return md;
}

const byPosition = (a: Row, b: Row) => a.position - b.position;
const group = (rows: Row[], key: (r: Row) => string) => {
  const m = new Map<string, Row[]>();
  for (const r of rows) { const k = key(r); (m.get(k) ?? m.set(k, []).get(k)!).push(r); }
  for (const list of m.values()) list.sort(byPosition);
  return m;
};
/** Copy only set values, so the result matches the bundle, where optional fields are simply absent. */
const opt = <T extends object>(o: T): T => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && !v.length))) as T;
const sourcesOf = (m: Map<string, Row[]>, type: string, id: string): Source[] | undefined => m.get(`${type}|${id}`)?.map(s => ({ title: s.title, url: s.url }));

/** Rebuild an Exam from its table rows (the inverse of scripts/export-content.ts). */
export function assembleExam(r: ExamRows): Exam {
  const e = r.exam, key = e.key as string;
  const sections = group(r.lesson_sections, s => s.lesson_id);
  const options = group(r.question_options, o => o.question_id);
  const sources = group(r.sources, s => `${s.owner_type}|${s.owner_id}`);

  const domains: Domain[] = [...r.domains].sort(byPosition).map(d => opt({ id: d.id, name: d.name, weight: Number(d.weight), summary: d.summary, subskills: d.subskills }));
  const lessons: Lesson[] = [...r.lessons].sort(byPosition).map(l => ({
    id: l.id, domain: l.domain_id, title: l.title, ...opt({ minutes: l.minutes, summary: l.summary }),
    sections: (sections.get(l.id) ?? []).map(s => ({ id: s.id, heading: s.heading, body: s.body })),
    ...opt({ keyPoints: l.key_points, gotchas: l.traps, lab: l.lab, sources: sourcesOf(sources, 'lesson', l.id) }),
  }));
  const questions: Question[] = [...r.questions].sort(byPosition).map(q => {
    const os = options.get(q.id) ?? [];
    const rationales = os.map(o => o.rationale);
    return {
      id: q.id, domain: q.domain_id, ...opt({ difficulty: q.difficulty, scenario: q.scenario }), stem: q.stem,
      options: os.map(o => o.body), answer: os.filter(o => o.is_correct).map(o => o.position), explanation: q.explanation,
      ...opt({ rationales: rationales.some(x => x != null) ? rationales.map(x => x ?? '') : undefined, sources: sourcesOf(sources, 'question', q.id) }),
    };
  });
  const flashcards: Flashcard[] = [...r.flashcards].sort(byPosition).map(c => ({ id: c.id, domain: c.domain_id, front: c.front, back: c.back }));

  // A half-loaded database must not replace good bundled content.
  const problems: string[] = [];
  if (!domains.length || !lessons.length || !questions.length || !flashcards.length) problems.push('missing domains, lessons, questions or flashcards');
  lessons.forEach(l => { if (!l.sections.length) problems.push(`lesson ${l.id} has no sections`); });
  questions.forEach(q => {
    if (q.options.length < 2) problems.push(`question ${q.id} has ${q.options.length} options`);
    if (!q.answer.length) problems.push(`question ${q.id} has no correct option`);
    if (q.options.length && q.options.length !== (options.get(q.id) ?? []).at(-1)!.position + 1) problems.push(`question ${q.id} has a gap in its options`);
  });
  if (problems.length) throw new Error(`exam ${key} in the database is incomplete: ${problems.slice(0, 3).join('; ')}`);

  return {
    id: e.id, kind: e.kind, code: e.code, name: e.name, level: e.level, items: e.items, minutes: e.minutes, passing: e.passing,
    ...opt({ price: e.price, audience: e.audience, format: e.format, scenarios: e.scenarios, review: e.review }),
    domains, lessons, flashcards, questions,
  };
}
