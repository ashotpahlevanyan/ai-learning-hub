// Exports all site content as database rows matching supabase/content.sql:
//   export/json/<table>.json   one array of rows per table (for an API loader or another database)
//   export/sql/NN-<table>.sql  INSERT statements, in dependency order, each file in one transaction
// Run with `npm run content:export [-- <out dir>]`. It reads the same modules the site uses, so the
// export always matches what is published. Loading replaces existing rows (see README).
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tracks } from '../src/content';
import { library, topics } from '../src/content/library';
import { roadmap } from '../src/content/roadmap';

type Row = Record<string, unknown>;
const out = process.argv[2] || 'export';

// Table order respects foreign keys; jsonb columns are listed so empty arrays get the right type.
const TABLES = ['tracks', 'track_resources', 'track_paths', 'exams', 'domains', 'lessons', 'lesson_sections', 'questions',
  'question_options', 'flashcards', 'sources', 'library_topics', 'library_items', 'roadmap_months', 'roadmap_weeks', 'roadmap_tasks'] as const;
const JSONB = new Set(['scenarios', 'review', 'traps']);
const rows: Record<(typeof TABLES)[number], Row[]> = Object.fromEntries(TABLES.map(t => [t, []])) as never;
const problems: string[] = [];

for (const [ti, t] of tracks.entries()) {
  rows.tracks.push({ id: t.id, position: ti, name: t.name, nav_label: t.navLabel ?? null, provider: t.provider, tagline: t.tagline, description: t.description, note: t.note ?? null, guide_md: await t.loadGuide() });
  t.resources.forEach((r, i) => rows.track_resources.push({ track_id: t.id, position: i, title: r.title, url: r.url, note: r.note }));
  t.paths?.forEach((p, i) => rows.track_paths.push({ track_id: t.id, position: i, who: p.who, exam_ids: p.order, why: p.why }));

  for (const [ei, s] of t.exams.entries()) {
    const e = await s.load(), key = `${t.id}/${s.id}`;
    if (e.id !== s.id) problems.push(`${key}: bundle id is ${e.id}`);
    rows.exams.push({
      key, track_id: t.id, id: s.id, position: ei, kind: s.kind, code: s.code, name: s.name, level: s.level, tier: s.tier, audience: s.audience,
      price: s.price, items: s.items, minutes: s.minutes, passing: e.passing, format: e.format ?? null, scenarios: e.scenarios ?? [], review: e.review ?? null,
    });
    const domains = new Set(e.domains.map(d => d.id));
    const domainOf = (kind: string, id: string, d: string) => { if (!domains.has(d)) problems.push(`${key} ${kind} ${id}: unknown domain ${d}`); return d; };
    e.domains.forEach((d, i) => rows.domains.push({ exam_key: key, id: d.id, position: i, name: d.name, weight: d.weight, summary: d.summary ?? null, subskills: d.subskills ?? [] }));
    e.lessons.forEach((l, i) => {
      rows.lessons.push({ exam_key: key, id: l.id, domain_id: domainOf('lesson', l.id, l.domain), position: i, title: l.title, minutes: l.minutes ?? null, summary: l.summary ?? null, key_points: l.keyPoints ?? [], traps: l.gotchas ?? [], lab: l.lab ?? null });
      l.sections.forEach((sec, j) => rows.lesson_sections.push({ exam_key: key, lesson_id: l.id, id: sec.id, position: j, heading: sec.heading, body: sec.body }));
      l.sources?.forEach((src, j) => rows.sources.push({ exam_key: key, owner_type: 'lesson', owner_id: l.id, position: j, title: src.title, url: src.url }));
    });
    e.questions.forEach((q, i) => {
      rows.questions.push({ exam_key: key, id: q.id, domain_id: domainOf('question', q.id, q.domain), position: i, difficulty: q.difficulty ?? null, scenario: q.scenario ?? null, stem: q.stem, explanation: q.explanation });
      q.options.forEach((o, j) => rows.question_options.push({ exam_key: key, question_id: q.id, position: j, body: o, rationale: q.rationales?.[j] ?? null, is_correct: q.answer.includes(j) }));
      q.sources?.forEach((src, j) => rows.sources.push({ exam_key: key, owner_type: 'question', owner_id: q.id, position: j, title: src.title, url: src.url }));
    });
    e.flashcards.forEach((c, i) => rows.flashcards.push({ exam_key: key, id: c.id, domain_id: domainOf('flashcard', c.id, c.domain), position: i, front: c.front, back: c.back }));
  }
}

topics.forEach((t, i) => rows.library_topics.push({ id: t.id, position: i, name: t.name, blurb: t.blurb }));
library.forEach((l, i) => rows.library_items.push({ url: l.url, position: i, title: l.title, author: l.by, kind: l.kind, topic_id: l.topic, track_ids: l.tracks, why: l.why, read_first: l.read ?? null, start_here: !!l.start }));

let week = 0;
roadmap.forEach((m, mi) => {
  rows.roadmap_months.push({ month: mi + 1, title: m.title, outcome: m.outcome, skills: m.skills, tech: m.tech, milestone: m.milestone });
  m.weeks.forEach(w => {
    week++;
    rows.roadmap_weeks.push({ week, month: mi + 1, title: w.title, goal: w.goal, done_when: w.doneWhen });
    w.tasks.forEach((tk, i) => rows.roadmap_tasks.push({ id: `w${week}-${i}`, week, position: i, kind: tk.kind, text: tk.text, hours: tk.hours, cloud: tk.cloud ?? null, library_titles: tk.lib ?? [], link_path: tk.to?.path ?? null, link_label: tk.to?.label ?? null }));
  });
});

// Primary keys must be unique, or the load fails halfway.
const PK: Record<string, string[]> = {
  tracks: ['id'], track_resources: ['track_id', 'position'], track_paths: ['track_id', 'position'], exams: ['key'], domains: ['exam_key', 'id'],
  lessons: ['exam_key', 'id'], lesson_sections: ['exam_key', 'lesson_id', 'id'], questions: ['exam_key', 'id'], question_options: ['exam_key', 'question_id', 'position'],
  flashcards: ['exam_key', 'id'], sources: ['exam_key', 'owner_type', 'owner_id', 'position'], library_topics: ['id'], library_items: ['url'],
  roadmap_months: ['month'], roadmap_weeks: ['week'], roadmap_tasks: ['id'],
};
for (const t of TABLES) {
  const seen = new Set<string>();
  for (const r of rows[t]) { const k = PK[t].map(c => r[c]).join('|'); if (seen.has(k)) problems.push(`${t}: duplicate key ${k}`); seen.add(k); }
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }

const lit = (col: string, v: unknown): string => {
  if (v === null || v === undefined) return 'null';
  if (JSONB.has(col)) return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  if (Array.isArray(v)) return v.length ? `array[${v.map(x => lit('', x)).join(', ')}]::text[]` : `'{}'::text[]`;
  return `'${String(v).replace(/'/g, "''")}'`;
};

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'json'), { recursive: true });
mkdirSync(join(out, 'sql'), { recursive: true });
const BATCH = 200;
TABLES.forEach((t, i) => {
  const rs = rows[t];
  writeFileSync(join(out, 'json', `${t}.json`), JSON.stringify(rs, null, 2) + '\n');
  const cols = Object.keys(rs[0] ?? {});
  const chunks: string[] = [];
  for (let j = 0; j < rs.length; j += BATCH) {
    chunks.push(`insert into public.${t} (${cols.join(', ')}) values\n${rs.slice(j, j + BATCH).map(r => `  (${cols.map(c => lit(c, r[c])).join(', ')})`).join(',\n')};`);
  }
  writeFileSync(join(out, 'sql', `${String(i + 1).padStart(2, '0')}-${t}.sql`), `-- ${rs.length} rows\nbegin;\n${chunks.join('\n')}\ncommit;\n`);
});
// Clearing runs in reverse order so foreign keys never block it.
writeFileSync(join(out, 'sql', '00-clear.sql'), `-- Remove existing content before a reload. Progress (public.progress) is not touched.\nbegin;\n${[...TABLES].reverse().map(t => `delete from public.${t};`).join('\n')}\ncommit;\n`);

console.log(TABLES.map(t => `${t.padEnd(18)} ${rows[t].length}`).join('\n'));
console.log(`\nWrote ${out}/json and ${out}/sql.`);
