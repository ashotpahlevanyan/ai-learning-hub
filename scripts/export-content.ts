// Exports all site content as database rows matching supabase/content.sql:
//   export/json/<table>.json   one array of rows per table (for an API loader or another database)
//   export/sql/NN-<table>.sql  INSERT statements, in dependency order, each file in one transaction
//   export/load.sql            the full reload (clear + all inserts) in a single transaction
// Run with `npm run content:export [-- <out dir>]`. It reads the same modules the site uses, so the
// export always matches what is published. Loading replaces existing rows (see README).
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tracks } from '../src/content';
import { library, topics } from '../src/content/library';
import { roadmap } from '../src/content/roadmap';
import { examToRows } from '../src/lib/contentRows';

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
    const { exam, ...examRows } = examToRows(t.id, ei, s, await s.load(), problems);
    rows.exams.push(exam);
    for (const [table, list] of Object.entries(examRows)) rows[table as keyof typeof examRows].push(...list);
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
const inserts: string[] = [];
TABLES.forEach((t, i) => {
  const rs = rows[t];
  writeFileSync(join(out, 'json', `${t}.json`), JSON.stringify(rs, null, 2) + '\n');
  const cols = Object.keys(rs[0] ?? {});
  const chunks: string[] = [];
  for (let j = 0; j < rs.length; j += BATCH) {
    chunks.push(`insert into public.${t} (${cols.join(', ')}) values\n${rs.slice(j, j + BATCH).map(r => `  (${cols.map(c => lit(c, r[c])).join(', ')})`).join(',\n')};`);
  }
  writeFileSync(join(out, 'sql', `${String(i + 1).padStart(2, '0')}-${t}.sql`), `-- ${rs.length} rows\nbegin;\n${chunks.join('\n')}\ncommit;\n`);  inserts.push(`-- ${t}: ${rs.length} rows`, ...chunks);
});
// Clearing runs in reverse order so foreign keys never block it.
const clear = [...TABLES].reverse().map(t => `delete from public.${t};`).join('\n');
writeFileSync(join(out, 'sql', '00-clear.sql'), `-- Remove existing content before a reload. Progress (public.progress) is not touched.\nbegin;\n${clear}\ncommit;\n`);
// The whole reload in one transaction: readers see the old content or the new, never a half-loaded mix.
writeFileSync(join(out, 'load.sql'), `-- Replace all content atomically. Progress (public.progress) is not touched.\nbegin;\n${clear}\n${inserts.join('\n')}\ncommit;\n`);

console.log(TABLES.map(t => `${t.padEnd(18)} ${rows[t].length}`).join('\n'));
console.log(`\nWrote ${out}/json, ${out}/sql and ${out}/load.sql.`);
