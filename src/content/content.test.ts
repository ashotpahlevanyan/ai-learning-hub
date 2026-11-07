import { describe, expect, it } from 'vitest';
import { tracks } from './index';
import type { Exam, Source } from '../lib/types';
import officialDomains from './official-domains.json';

/** True when url is https on one of the track's official documentation hosts (or a path prefix such as github.com/anthropics). */
export function isOfficial(track: string, url: string) {
  let u: URL;
  try { u = new URL(url); } catch { return false; }
  if (u.protocol !== 'https:') return false;
  const at = (u.hostname + u.pathname).replace(/^www\./, '');
  return ((officialDomains as Record<string, string[]>)[track] ?? []).some(d => at === d || at.startsWith(d + '/') || u.hostname.endsWith('.' + d.split('/')[0]) && !d.includes('/'));
}

// Every exam bundle must be well-formed: run on each content change (npm test).
describe.each(tracks.flatMap(t => t.exams.map(e => [`${t.id}/${e.id}`, t.id, e] as const)))('%s', (_, track, summary) => {
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

    // Every lesson and question links to official docs so learners can read more and claims can be checked.
    const sources = (kind: string, id: string, list?: Source[]) => {
      if (!list?.length) problems.push(`${kind} ${id} has no sources`);
      list?.forEach(s => { if (!s.title || !isOfficial(track, s.url)) problems.push(`${kind} ${id} cites a non-official or non-https source: ${s.url}`); });
    };
    exam.lessons.forEach(l => sources('lesson', l.id, l.sources));
    exam.questions.forEach(q => sources('question', q.id, q.sources));

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
