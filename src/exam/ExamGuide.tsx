import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import Md from '../components/Md';
import { Bar, Tag } from '../components/ui';

export default function ExamGuide() {
  const { exam, base } = useExam();
  const maxW = Math.max(...exam.domains.map(d => d.weight));
  return (
    <>
      <h1>{exam.code} {exam.kind === 'course' ? 'course guide' : 'exam guide'}</h1>
      <div className="card">
        <dl className="kv">
          <dt>Format</dt><dd>{exam.format}</dd>
          <dt>Items and time</dt><dd>{exam.items} items in {exam.minutes} minutes (about {(exam.minutes / exam.items).toFixed(1)} min per item)</dd>
          <dt>{exam.kind === 'course' ? 'Target' : 'Passing score'}</dt><dd>{exam.passing} on a 100–1000 scale</dd>
          <dt>{exam.kind === 'course' ? 'Cost' : 'Fee'}</dt><dd>{exam.price}</dd>
          <dt>Who it's for</dt><dd>{exam.audience}</dd>
        </dl>
      </div>

      <h2>Domains and weights</h2>
      {[...exam.domains].sort((a, b) => b.weight - a.weight).map(d => (
        <section className="card" key={d.id}>
          <div className="spread"><h3 className="flush">{d.name}</h3><Tag>{d.weight}% · ~{Math.round((exam.items * d.weight) / 100)} items</Tag></div>
          <Bar value={d.weight / maxW} tone="accent" />
          {d.summary && <Md>{d.summary}</Md>}
          {d.subskills && <ul>{d.subskills.map(s => <li key={s}>{s}</li>)}</ul>}
          <div className="row">
            <Link className="btn small" to={`${base}/learn#${d.id}`}>Lessons</Link>
            <Link className="btn small" to={`${base}/practice?domain=${d.id}`}>Drill this domain</Link>
          </div>
        </section>
      ))}

      {exam.scenarios?.length ? (
        <>
          <h2>Scenarios to prepare</h2>
          <div className="grid">
            {exam.scenarios.map(s => <div className="card" key={s.title}><strong>{s.title}</strong><div className="small"><Md>{s.description}</Md></div></div>)}
          </div>
        </>
      ) : null}
    </>
  );
}
