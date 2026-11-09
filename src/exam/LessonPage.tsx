import { Link, useParams } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { progressIn, touchDay, update, useProgress } from '../lib/store';
import Md from '../components/Md';
import Sources from '../components/Sources';
import { useMeta } from '../lib/useMeta';
import ActionBar, { useScrollProgress } from '../components/ActionBar';

export default function LessonPage() {
  const { exam, key, base, domainName } = useExam();
  const { lessonId } = useParams();
  const p = useProgress(key);
  const read = useScrollProgress();
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
      <div className="muted small">Lesson {i + 1} of {exam.lessons.length} · {domainName(l.domain)} · {l.minutes ?? 15} min{done && <> · <span className="tag good">Completed</span></>}</div>
      <h1>{l.title}</h1>
      {l.summary && <p className="lede"><Md inline>{l.summary}</Md></p>}

      {l.sections.length > 2 && (
        <nav className="jump" aria-label="In this lesson">
          {l.sections.map(s => <a key={s.id} href={`#${s.id}`}>{s.heading}</a>)}
          {l.keyPoints?.length ? <a href="#lesson-key-points">Key points</a> : null}
          {l.gotchas?.length ? <a href="#lesson-traps">Exam traps</a> : null}
          {l.lab ? <a href="#lesson-lab">Lab</a> : null}
        </nav>
      )}

      <div className="card prose">
        {l.sections.map(s => <section key={s.id}><h3 id={s.id}>{s.heading}</h3><Md>{s.body}</Md></section>)}
      </div>

      {l.keyPoints?.length ? (
        <div className="card"><h3 className="flush" id="lesson-key-points">Key points</h3><ul>{l.keyPoints.map(k => <li key={k}><Md inline>{k}</Md></li>)}</ul></div>
      ) : null}

      {l.gotchas?.length ? (
        <div className="card">
          <h3 className="flush" id="lesson-traps">Exam traps</h3>
          {l.gotchas.map(g => (
            <div className="callout trap" key={g.trap}><strong>Trap:</strong> <Md inline>{g.trap}</Md><br /><strong>Instead:</strong> <Md inline>{g.correct}</Md></div>
          ))}
        </div>
      ) : null}

      {l.lab && <div className="card"><h3 className="flush" id="lesson-lab">Hands-on lab</h3><div className="callout lab"><Md>{l.lab}</Md></div></div>}

      {l.sources?.length ? <div className="card"><Sources list={l.sources} heading="Read more in the official docs" /></div> : null}

      <div className="spread">
        <button className={`btn ${done ? '' : 'primary'}`} onClick={toggle}>{done ? '✓ Completed (undo)' : 'Mark complete'}</button>
        <Link className="btn" to={`${base}/practice?domain=${l.domain}`}>Quiz me on this domain</Link>
      </div>
      <nav className="pager" aria-label="Other lessons">
        {prev ? <Link className="pager-link" to={`${base}/learn/${prev.id}`}><span className="muted small">← Previous lesson</span>{prev.title}</Link> : <span />}
        {next ? <Link className="pager-link next" to={`${base}/learn/${next.id}`}><span className="muted small">Next lesson →</span>{next.title}</Link> : <Link className="pager-link next" to={`${base}/practice`}><span className="muted small">All lessons read? →</span>Practise questions</Link>}
      </nav>

      <ActionBar progress={read}>
        {prev ? <Link className="ab-btn" to={`${base}/learn/${prev.id}`} aria-label={`Previous lesson: ${prev.title}`}>←</Link> : <span className="ab-btn spacer" aria-hidden="true" />}
        <button className={`ab-btn wide ${done ? 'done' : 'primary'}`} onClick={toggle} aria-pressed={done}>{done ? '✓ Completed' : 'Mark complete'}</button>
        {next ? <Link className="ab-btn" to={`${base}/learn/${next.id}`} aria-label={`Next lesson: ${next.title}`}>→</Link> : <Link className="ab-btn" to={`${base}/practice`} aria-label="Practise questions">→</Link>}
      </ActionBar>
    </article>
  );
}
