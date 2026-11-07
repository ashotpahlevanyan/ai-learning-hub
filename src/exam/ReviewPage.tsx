import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { useProgress } from '../lib/store';
import { fmtTime, sameSet } from '../lib/quiz';
import QuestionView from '../components/QuestionView';
import Md from '../components/Md';
import Sources from '../components/Sources';
import { Bar, Tag, pct } from '../components/ui';

export default function ReviewPage() {
  const { exam, key, base, domainName } = useExam();
  const { index } = useParams();
  const p = useProgress(key);
  const [wrongOnly, setWrongOnly] = useState(false);
  const m = p.mocks[Number(index)];
  if (!m) return <p className="empty">Mock not found. <Link to={base}>Back to the dashboard</Link></p>;
  const pass = m.score >= exam.passing;

  return (
    <>
      <h1>{exam.kind === 'course' ? 'Practice test result' : 'Mock result'}</h1>
      <section className="card hero-card">
        <div className="spread">
          <div>
            <div className={`stat tone-${pass ? 'good' : 'bad'}`}>{m.score} <span className="muted small">/ 1000 (estimate)</span></div>
            <div>{m.ok}/{m.n} correct ({pct(m.pct)}%) · {fmtTime(m.secs)}{m.timedOut ? ' · time ran out' : ''}</div>
          </div>
          <Tag tone={pass ? 'good' : 'bad'}>{exam.kind === 'course' ? (pass ? 'On target' : 'Below target') : pass ? 'Likely pass' : 'Below the pass mark'}</Tag>
        </div>
        <div className="table-wrap">
          <table>
            <tbody>
              {exam.domains.map(d => {
                const x = m.dom[d.id];
                if (!x) return null;
                return <tr key={d.id}><td>{d.name}</td><td className="bar-cell"><Bar value={x[0] / x[1]} /></td><td className="num">{x[0]}/{x[1]}</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="spread">
        <h2>Question review</h2>
        <label className="small"><input id="wrong-only" type="checkbox" checked={wrongOnly} onChange={e => setWrongOnly(e.target.checked)} /> Show only mistakes</label>
      </div>
      {!m.qids && <div className="card muted">Question-by-question detail is kept for your 15 most recent mocks.</div>}
      {(m.qids ?? []).map((id, i) => {
        const q = exam.questions.find(x => x.id === id);
        if (!q) return null;
        const picked = m.answers?.[i] ?? [];
        const right = sameSet(picked, q.answer);
        if (wrongOnly && right) return null;
        return (
          <div className="card" key={id}>
            <div className="spread small muted"><span>Q{i + 1} · {domainName(q.domain)}</span><Tag tone={right ? 'good' : 'bad'}>{right ? 'correct' : picked.length ? 'wrong' : 'unanswered'}</Tag></div>
            <QuestionView q={q} order={m.orders?.[i] ?? q.options.map((_, k) => k)} picked={picked} reveal />
            <div className={`feedback ${right ? 'good' : 'bad'}`}><Md>{q.explanation}</Md><Sources list={q.sources} /></div>
          </div>
        );
      })}
      <div className="row">
        <Link className="btn primary" to={`${base}/practice?mode=mistakes`}>Drill my mistakes</Link>
        <Link className="btn" to={base}>Dashboard</Link>
      </div>
    </>
  );
}
