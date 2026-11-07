import { Link, useParams } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { progressIn, touchDay, update, useProgress } from '../lib/store';
import Md from '../components/Md';
import Sources from '../components/Sources';
import { useMeta } from '../lib/useMeta';

export default function LessonPage() {
  const { exam, key, base, domainName } = useExam();
  const { lessonId } = useParams();
  const p = useProgress(key);
  useMeta(exam.lessons.find(x => x.id === lessonId)?.title, exam.lessons.find(x => x.id === lessonId)?.summary);
  const i = exam.lessons.findIndex(l => l.id === lessonId);
  const l = exam.lessons[i];
  if (!l) return <p className="empty">Lesson not found. <Link to={`${base}/learn`}>See all lessons</Link></p>;
  const prev = exam.lessons[i - 1], next = exam.lessons[i + 1];
  const done = !!p.lessons[l.id];

  const toggle = () => update(s => {
    const ep = progressIn(s, key);
    if (ep.lessons[l.id]) delete ep.lessons[l.id];
    else { ep.lessons[l.id] = Date.now(); touchDay(s); }
  });

  return (
    <article className="lesson">
      <Link to={`${base}/learn`} className="small">← All lessons</Link>
      <div className="muted small">{domainName(l.domain)} · {l.minutes ?? 15} min</div>
      <h1>{l.title}</h1>
      {l.summary && <p className="lede"><Md inline>{l.summary}</Md></p>}

      <div className="card prose">
        {l.sections.map(s => <section key={s.heading}><h3>{s.heading}</h3><Md>{s.body}</Md></section>)}
      </div>

      {l.keyPoints?.length ? (
        <div className="card"><h3 className="flush">Key points</h3><ul>{l.keyPoints.map(k => <li key={k}><Md inline>{k}</Md></li>)}</ul></div>
      ) : null}

      {l.gotchas?.length ? (
        <div className="card">
          <h3 className="flush">Exam traps</h3>
          {l.gotchas.map(g => (
            <div className="callout trap" key={g.trap}><strong>Trap:</strong> <Md inline>{g.trap}</Md><br /><strong>Instead:</strong> <Md inline>{g.correct}</Md></div>
          ))}
        </div>
      ) : null}

      {l.lab && <div className="card"><h3 className="flush">Hands-on lab</h3><div className="callout lab"><Md>{l.lab}</Md></div></div>}

      {l.sources?.length ? <div className="card"><Sources list={l.sources} heading="Read more in the official docs" /></div> : null}

      <div className="spread">
        <button className={`btn ${done ? '' : 'primary'}`} onClick={toggle}>{done ? '✓ Completed (undo)' : 'Mark complete'}</button>
        <Link className="btn" to={`${base}/practice?domain=${l.domain}`}>Quiz me on this domain</Link>
      </div>
      <div className="spread pager">
        {prev ? <Link to={`${base}/learn/${prev.id}`}>← {prev.title}</Link> : <span />}
        {next && <Link to={`${base}/learn/${next.id}`}>{next.title} →</Link>}
      </div>
    </article>
  );
}
