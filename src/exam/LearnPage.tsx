import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { useProgress } from '../lib/store';
import { Tag } from '../components/ui';
import { fmtHours, studyTime } from '../lib/studyTime';

export default function LearnPage() {
  const { exam, key, base } = useExam();
  const p = useProgress(key);
  const { hash } = useLocation();
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView(); }, [hash]);

  return (
    <>
      <h1>Learn</h1>
      <p className="muted">Lessons grouped by domain, heaviest first. Mark each one complete, then drill that domain. Total reading time: about {fmtHours(studyTime(exam).lessons)}.</p>
      {[...exam.domains].sort((a, b) => b.weight - a.weight).map(d => {
        const ls = exam.lessons.filter(l => l.domain === d.id);
        if (!ls.length) return null;
        return (
          <section className="card" id={d.id} key={d.id}>
            <div className="spread"><h2 className="flush">{d.name}</h2><span><span className="muted small">{fmtHours(ls.reduce((s, l) => s + (l.minutes ?? 15), 0))}</span> <Tag>{d.weight}%</Tag></span></div>
            <ul className="lesson-list">
              {ls.map(l => (
                <li key={l.id}>
                  <Link to={`${base}/learn/${l.id}`}>
                    <span><span className={`tick ${p.lessons[l.id] ? 'on' : ''}`} aria-label={p.lessons[l.id] ? 'completed' : 'not started'} /> {l.title}</span>
                    <span className="muted small nowrap">{l.minutes ?? 15} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
