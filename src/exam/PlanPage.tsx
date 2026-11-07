import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { progressIn, update, useProgress } from '../lib/store';
import { DAY } from '../lib/srs';

export default function PlanPage() {
  const { exam, key, base, domainName } = useExam();
  const p = useProgress(key);
  const hours = p.hours ?? 1.5;
  const set = (patch: { examDate?: string; hours?: number }) => update(s => Object.assign(progressIn(s, key), patch));

  let body: ReactNode = <div className="card empty">Set your exam date to get a day-by-day plan.</div>;
  if (p.examDate) {
    const days = Math.max(1, Math.ceil((new Date(p.examDate + 'T09:00').getTime() - Date.now()) / DAY));
    const weight = (d: string) => exam.domains.find(x => x.id === d)?.weight ?? 0;
    const lessons = [...exam.lessons].sort((a, b) => weight(b.domain) - weight(a.domain));
    const learnDays = Math.max(1, Math.min(days - 1, Math.round(days * 0.55)));
    const perDay = Math.ceil(lessons.length / learnDays);
    const rows = Array.from({ length: days }, (_, d) => {
      const when = new Date(Date.now() + d * DAY).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      let tasks: ReactNode[];
      if (d < learnDays) {
        const ls = lessons.slice(d * perDay, d * perDay + perDay);
        const doms = [...new Set(ls.map(l => domainName(l.domain)))].join(' + ') || 'mixed topics';
        tasks = [
          ...ls.map(l => <><span className={`tick ${p.lessons[l.id] ? 'on' : ''}`} /> <Link to={`${base}/learn/${l.id}`}>{l.title}</Link></>),
          `Drill ${doms} (20 questions)`, 'Flashcards: clear the due queue',
        ];
      } else if (d === days - 1) {
        tasks = [<>Light review only: <Link to={`${base}/traps`}>Traps list</Link> and due flashcards</>, 'Check your ID and run the Pearson VUE system test', 'Sleep. No new material.'];
      } else if ((d - learnDays) % 2 === 0) {
        tasks = [<>Full timed <Link to={`${base}/mock`}>mock exam</Link></>, 'Review every miss; reread lessons for any domain under 75%'];
      } else {
        tasks = [<><Link to={`${base}/practice`}>Smart practice</Link>, 40 questions</>, <><Link to={`${base}/mistakes`}>Mistakes notebook</Link> down to zero</>, 'Flashcards'];
      }
      return (
        <tr key={d}>
          <td className="nowrap"><strong>Day {d + 1}</strong><div className="muted small">{when}</div></td>
          <td>{tasks.map((t, i) => <Fragment key={i}>{t}<br /></Fragment>)}</td>
        </tr>
      );
    });
    body = (
      <div className="card">
        <p><strong>{days} days</strong> to go at about {hours} h/day, roughly {Math.round(days * hours)} study hours. Phase 1 ({learnDays} days) covers every lesson, heaviest domains first. Phase 2 alternates timed mocks with targeted drills. The last day is light review.</p>
        {days < 7 && <p className="tag bad">Under a week: focus on the two heaviest domains and the Traps list.</p>}
        <div className="table-wrap"><table><tbody>{rows}</tbody></table></div>
      </div>
    );
  }

  return (
    <>
      <h1>Study plan</h1>
      <div className="card row">
        <label>Exam date <input id="plan-date" type="date" value={p.examDate ?? ''} onChange={e => set({ examDate: e.target.value })} /></label>
        <label>Hours per day <input id="plan-hours" type="number" min={0.5} max={10} step={0.5} value={hours} onChange={e => set({ hours: Number(e.target.value) || 1.5 })} /></label>
      </div>
      {body}
    </>
  );
}
