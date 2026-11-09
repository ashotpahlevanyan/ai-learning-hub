import { describe, expect, it } from 'vitest';
import { tracks } from './index';
import type { Exam, Source } from '../lib/types';
import officialDomains from './official-domains.json';
import studyTimes from 'virtual:study-time';
import { studyTime } from '../lib/studyTime';

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
    // Study time is summed from lesson reading times, so every lesson needs a plausible one.
    exam.lessons.forEach(l => { if (!l.minutes || l.minutes < 3 || l.minutes > 90) problems.push(`lesson ${l.id} has no plausible reading time (${l.minutes})`); });
    expect(studyTimes[`${track}/${exam.id}`]).toEqual(studyTime(exam));
    expect(exam.code).toBe(summary.code);
    const weights = exam.domains.reduce((s, d) => s + d.weight, 0);
    // Official weights can miss 100 by rounding (NCP-AAI's exam page lists 98%), so allow a little slack.
    if (Math.abs(weights - 100) > 2) problems.push(`domain weights sum to ${weights}`);
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

describe('library', () => {
  it('has well-formed entries', async () => {
    const { library, topics } = await import('./library');
    const trackIds = new Set(tracks.map(t => t.id)), topicIds = new Set(topics.map(t => t.id)), seen = new Set<string>();
    const problems: string[] = [];
    library.forEach(i => {
      if (seen.has(i.url)) problems.push(`duplicate ${i.url}`);
      seen.add(i.url);
      if (!/^https:\/\//.test(i.url)) problems.push(`${i.title}: not https`);
      if (!i.title || !i.by || !i.why) problems.push(`${i.url}: missing title, author or why`);
      if (!topicIds.has(i.topic)) problems.push(`${i.title}: unknown topic ${i.topic}`);
      i.tracks.forEach(t => { if (!trackIds.has(t)) problems.push(`${i.title}: unknown track ${t}`); });
    });
    tracks.forEach(t => { if (!library.some(i => i.tracks.includes(t.id))) problems.push(`track ${t.id} has no library items`); });
    expect(problems).toEqual([]);
  });
});

describe('roadmap', () => {
  it('links only to real pages and library entries, with 5–12 hours a week (exam and review weeks are lighter)', async () => {
    const { roadmap, roadmapTasks } = await import('./roadmap');
    const { library } = await import('./library');
    const titles = new Set(library.map(i => i.title)), routes = ['learn', 'cards', 'practice', 'mock', 'mistakes', 'plan', 'guide'];
    const problems: string[] = [];
    expect(roadmap.length).toBe(6);
    roadmap.forEach((m, i) => { if (m.weeks.length !== 4) problems.push(`month ${i + 1} has ${m.weeks.length} weeks`); });
    for (const cloud of ['aws', 'azure'] as const) {
      const tasks = roadmapTasks(cloud);
      if (new Set(tasks.map(t => t.id)).size !== tasks.length) problems.push(`${cloud}: duplicate task ids`);
      for (let w = 1; w <= 24; w++) {
        const h = tasks.filter(t => t.week === w).reduce((a, t) => a + t.hours, 0);
        if (h < 5 || h > 12) problems.push(`${cloud} week ${w}: ${h} h`);
      }
      tasks.forEach(t => {
        t.lib?.forEach(title => { if (!titles.has(title)) problems.push(`${t.id}: no library entry "${title}"`); });
        if (t.to) {
          const [, track, exam, sub] = t.to.path.split('/');
          const ok = tracks.find(x => x.id === track)?.exams.some(e => e.id === exam);
          if (!ok || (sub && !routes.includes(sub))) problems.push(`${t.id}: bad link ${t.to.path}`);
        }
      });
    }
    expect(problems).toEqual([]);
  });
});
