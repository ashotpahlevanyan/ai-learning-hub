import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import Md from '../components/Md';

export default function TrapsPage() {
  const { exam, base, domainName } = useExam();
  const [filter, setFilter] = useState('all');
  const all = exam.lessons.flatMap(l => (l.gotchas ?? []).map(g => ({ l, g })));
  const shown = all.filter(x => filter === 'all' || x.l.domain === filter);

  return (
    <>
      <h1>Traps and anti-patterns</h1>
      <p className="muted">The wrong answers exams like to offer. Read this list the night before the exam.</p>
      <label className="small">Domain{' '}
        <select id="trap-filter" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All domains ({all.length})</option>
          {exam.domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>
      <div className="stack">
        {shown.map(({ l, g }) => (
          <div className="callout trap" key={l.id + g.trap}>
            <div className="small muted">{domainName(l.domain)} · <Link to={`${base}/learn/${l.id}`}>{l.title}</Link></div>
            <strong>Trap:</strong> <Md inline>{g.trap}</Md><br /><strong>Instead:</strong> <Md inline>{g.correct}</Md>
          </div>
        ))}
      </div>
    </>
  );
}
