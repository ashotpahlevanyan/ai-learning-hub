import { describe, expect, it } from 'vitest';
import { tracks as published } from './index';
import { gemini } from './tracks/gemini/track';
import { openai } from './tracks/openai/track';
import type { Exam } from '../lib/types';

// Published tracks plus drafted ones, so shelved content stays valid.
const tracks = [...published, gemini, openai];

// Every exam bundle must be well-formed: run on each content change (npm test).
describe.each(tracks.flatMap(t => t.exams.map(e => [`${t.id}/${e.id}`, e] as const)))('%s', (_, summary) => {
  it('is well-formed', async () => {
    const exam: Exam = await summary.load();
    const problems: string[] = [];
    const domains = new Set(exam.domains.map(d => d.id));
    const ids = new Set<string>();
    const check = (kind: string, x: { id: string; domain: string }) => {
      if (ids.has(x.id)) problems.push(`duplicate id ${x.id}`);
      ids.add(x.id);
      if (!domains.has(x.domain)) problems.push(`${kind} ${x.id} has unknown domain ${x.domain}`);
    };

    expect(exam.id).toBe(summary.id);
    expect(exam.code).toBe(summary.code);
    const weights = exam.domains.reduce((s, d) => s + d.weight, 0);
    if (Math.abs(weights - 100) > 1) problems.push(`domain weights sum to ${weights}`);
    if (exam.review) {
      const r = exam.review;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date) || ![r.questionsChecked, r.fixed, r.dropped].every(Number.isInteger)) problems.push('review record is malformed');
    }

    exam.lessons.forEach(l => { check('lesson', l); if (!l.title || !l.sections?.length) problems.push(`lesson ${l.id} is incomplete`); });
    exam.flashcards.forEach(c => { check('card', c); if (!c.front || !c.back) problems.push(`card ${c.id} is incomplete`); });
    exam.questions.forEach(q => {
      check('question', q);
      if (!q.stem || q.options.length < 4) problems.push(`question ${q.id} needs a stem and at least 4 options`);
      if (!q.answer.length || q.answer.some(a => a < 0 || a >= q.options.length)) problems.push(`question ${q.id} has an invalid answer key`);
      if (q.answer.length > 1 && !/select (two|three|2|3)/i.test(q.stem)) problems.push(`question ${q.id} is multi-answer but its stem doesn't say "Select two/three"`);
      if (!q.explanation) problems.push(`question ${q.id} has no explanation`);
      if (q.rationales && q.rationales.length !== q.options.length) problems.push(`question ${q.id} has ${q.rationales.length} rationales for ${q.options.length} options`);
    });
    exam.domains.forEach(d => { if (!exam.questions.some(q => q.domain === d.id)) problems.push(`domain ${d.id} has no questions`); });

    expect(problems).toEqual([]);
  });
});
