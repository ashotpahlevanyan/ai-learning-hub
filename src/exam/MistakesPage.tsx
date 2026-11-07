import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { useProgress } from '../lib/store';
import Md from '../components/Md';

export default function MistakesPage() {
  const { exam, key, base, domainName } = useExam();
  const p = useProgress(key);
  const list = exam.questions.filter(q => p.q[q.id] && !p.q[q.id].lastOk);

  return (
    <>
      <h1>Mistakes notebook</h1>
      <p className="muted">Every question you got wrong on your latest attempt. Answer it correctly once and it leaves the list.</p>
      {list.length ? <Link className="btn primary" to={`${base}/practice?mode=mistakes`}>Drill all {list.length}</Link> : <div className="card empty">No open mistakes.</div>}
      <div className="stack">
        {list.map(q => (
          <div className="card" key={q.id}>
            <div className="small muted">{domainName(q.domain)} · missed {p.q[q.id].n - p.q[q.id].c}×</div>
            <Md>{q.stem}</Md>
            <details>
              <summary className="small">Show answer and explanation</summary>
              <div className="feedback good small"><strong>Answer:</strong> {q.answer.map(a => <div key={a}><Md inline>{q.options[a]}</Md></div>)}<Md>{q.explanation}</Md></div>
            </details>
          </div>
        ))}
      </div>
    </>
  );
}
