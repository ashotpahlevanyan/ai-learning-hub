#!/usr/bin/env node
// Gives every lesson section a stable id (a slug of its heading, unique within the lesson) so content
// can be stored as rows in a database and linked to. Idempotent: existing ids are kept.
// Run after adding or regenerating an exam bundle: `npm run content:normalize`.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content/tracks/', import.meta.url).pathname;
export const slug = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/`/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '') || 'section';

let changed = 0;
for (const track of readdirSync(root)) {
  const dir = join(root, track, 'exams');
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter(f => f.endsWith('.json'))) {
    const file = join(dir, f), raw = readFileSync(file, 'utf8'), exam = JSON.parse(raw);
    let n = 0;
    for (const lesson of exam.lessons) {
      const used = new Set(lesson.sections.map(s => s.id).filter(Boolean));
      lesson.sections = lesson.sections.map(s => {
        if (s.id) return s;
        let id = slug(s.heading), k = 2;
        while (used.has(id)) id = `${slug(s.heading)}-${k++}`;
        used.add(id); n++;
        return { id, ...s };
      });
    }
    if (n) {
      writeFileSync(file, JSON.stringify(exam, null, 2) + (raw.endsWith('\n') ? '\n' : ''));
      console.log(`${track}/${f}: ${n} section ids added`);
      changed += n;
    }
  }
}
console.log(changed ? `${changed} section ids added.` : 'All sections already have ids.');
