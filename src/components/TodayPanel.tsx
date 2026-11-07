import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tracks } from '../content';
import { useAppState, type ExamProgress } from '../lib/store';
import { cardQueue, DAY } from '../lib/srs';
import { readiness } from '../lib/quiz';
import type { Exam, ExamSummary, Track } from '../lib/types';
import { Bar, pct } from './ui';

interface Row { track: Track; summary: ExamSummary; exam: Exam; p: ExamProgress }

/** Today's study queue across every exam the learner has started. Renders nothing until one is started. */
export default function TodayPanel({ title = 'Today' }: { title?: string }) {
  const state = useAppState();
  const started = tracks.flatMap(track => track.exams
    .filter(summary => state.ex[`${track.id}/${summary.id}`])
    .map(summary => ({ track, summary })));
  const startedKey = started.map(s => `${s.track.id}/${s.summary.id}`).join(',');
  const [exams, setExams] = useState<Record<string, Exam>>({});

  // Load only the bundles for exams in progress; each is cached by the bundler after the first import.
  useEffect(() => {
    let live = true;
    Promise.all(started.map(s => s.summary.load().then(e => [`${s.track.id}/${s.summary.id}`, e] as const)))
      .then(pairs => { if (live) setExams(Object.fromEntries(pairs)); });
    return () => { live = false; };
  }, [startedKey]);

  if (!started.length) return null;
  const rows: Row[] = started
    .map(s => ({ ...s, exam: exams[`${s.track.id}/${s.summary.id}`], p: state.ex[`${s.track.id}/${s.summary.id}`] }))
    .filter((r): r is Row => !!r.exam);

  return (
    <section className="card today">
      <h2 className="flush">{title}</h2>
      {rows.length < started.length && <p className="muted small">Loading your exams…</p>}
      <ul className="today-list">
        {rows.map(({ track, summary, exam, p }) => {
          const base = `/${track.id}/${summary.id}`;
          const cards = cardQueue(exam.flashcards, p, 'all');
          const next = exam.lessons.find(l => !p.lessons[l.id]);
          const r = readiness(exam, p);
          const days = p.examDate ? Math.ceil((new Date(p.examDate).getTime() - Date.now()) / DAY) : undefined;
          return (
            <li key={base}>
              <div className="spread">
                <Link to={base}><strong>{summary.code}</strong> <span className="muted">{summary.name}</span></Link>
                <span className="muted small">{days !== undefined && days >= 0 ? `${days} day${days === 1 ? '' : 's'} to exam · ` : ''}{pct(r)}% ready</span>
              </div>
              <Bar value={r} />
              <div className="row small">
                {p.activeMock && <Link className="btn primary" to={`${base}/mock`}>Resume {summary.kind === 'course' ? 'test' : 'mock'}</Link>}
                {cards.due.length > 0 && <Link className="btn" to={`${base}/cards`}>{cards.due.length} card{cards.due.length === 1 ? '' : 's'} due</Link>}
                {next && <Link className="btn" to={`${base}/learn/${next.id}`}>Next lesson: {next.title}</Link>}
                {!next && !cards.due.length && !p.activeMock && <Link className="btn" to={`${base}/practice`}>Practise weak spots</Link>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
