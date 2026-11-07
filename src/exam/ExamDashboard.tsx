import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { streak, useAppState, useProgress } from '../lib/store';
import { cardQueue, DAY } from '../lib/srs';
import { barTone, domainStats, fmtTime, readiness } from '../lib/quiz';
import { Bar, StatCard, Tag, pct } from '../components/ui';

export default function ExamDashboard() {
  const { exam, key, base, domainName } = useExam();
  const p = useProgress(key);
  const { days } = useAppState();
  const ds = domainStats(exam, p);
  const r = readiness(exam, p);
  const done = exam.lessons.filter(l => p.lessons[l.id]).length;
  const seen = exam.questions.filter(q => p.q[q.id]).length;
  const stats = Object.values(p.q);
  const att = stats.reduce((s, x) => s + x.n, 0), cor = stats.reduce((s, x) => s + x.c, 0);
  const cards = cardQueue(exam.flashcards, p, 'all');
  const best = p.mocks.reduce((m, x) => Math.max(m, x.score), 0);
  const last = p.mocks[p.mocks.length - 1];

  // Recommend one next step, from most to least urgent.
  const weakest = [...exam.domains].sort((a, b) => ds[a.id].mastery - ds[b.id].mastery || b.weight - a.weight)[0];
  const unread = exam.lessons.filter(l => !p.lessons[l.id]);
  const weight = (d: string) => exam.domains.find(x => x.id === d)?.weight ?? 0;
  let next: { text: string; cta: string; to: string };
  if (p.activeMock) next = { text: 'You have a mock exam in progress.', cta: 'Resume mock', to: `${base}/mock` };
  else if (cards.due.length >= 10) next = { text: `${cards.due.length} flashcards are due. Clear them while the memory is fresh.`, cta: 'Review cards', to: `${base}/cards` };
  else if (unread.length && ds[weakest.id].mastery < 0.7) {
    const l = unread.find(x => x.domain === weakest.id) ?? [...unread].sort((a, b) => weight(b.domain) - weight(a.domain))[0];
    next = { text: `Read “${l.title}” (${domainName(l.domain)}).`, cta: 'Start lesson', to: `${base}/learn/${l.id}` };
  } else if (r >= 0.8 && (!last || Date.now() - last.date > DAY)) next = { text: 'Readiness is high. Take a full timed mock under exam conditions.', cta: 'Start mock', to: `${base}/mock` };
  else if (ds[weakest.id].mastery < 0.85) next = { text: `Weakest domain: ${weakest.name} (${pct(ds[weakest.id].mastery)}%). Drill it.`, cta: 'Drill domain', to: `${base}/practice?domain=${weakest.id}` };
  else next = { text: 'Everything looks strong. Take another mock or review the traps.', cta: 'Mock exam', to: `${base}/mock` };

  return (
    <>
      <section className="card hero-card">
        <div className="spread">
          <div>
            <div className="muted small">{exam.level}</div>
            <h1>{exam.name}</h1>
            <div className="muted small">{exam.items} items · {exam.minutes} min · pass {exam.passing}/1000 · {exam.price}</div>
          </div>
          <div className="readiness">
            <div className="muted small">Readiness</div>
            <div className={`stat tone-${barTone(r)}`}>{pct(r)}%</div>
            <div className="muted small">{streak(days)} day streak</div>
          </div>
        </div>
        <div className="next">
          <div className="muted small">Do this next</div>
          <div className="spread"><strong>{next.text}</strong><Link className="btn primary" to={next.to}>{next.cta}</Link></div>
        </div>
      </section>

      <div className="grid stats">
        <StatCard label="Lessons" value={`${done}/${exam.lessons.length}`}><Bar value={exam.lessons.length ? done / exam.lessons.length : 0} tone="accent" /></StatCard>
        <StatCard label="Questions seen" value={`${seen}/${exam.questions.length}`} note={att ? `${pct(cor / att)}% accuracy over ${att} answers` : 'No answers yet'} />
        <StatCard label="Flashcards today" value={cards.due.length + cards.fresh.length} note={`${cards.learned}/${cards.total} learned`} />
        <StatCard label="Best mock" value={best || '—'} note={last ? `${p.mocks.length} taken · last ${last.score}` : 'None taken yet'} />
      </div>

      <section className="card">
        <div className="spread"><h2 className="flush">Domain mastery</h2><span className="muted small">accuracy × coverage</span></div>
        {exam.domains.map(d => {
          const s = ds[d.id];
          return (
            <div className="domain-row" key={d.id}>
              <div><strong>{d.name}</strong><div className="muted small">{s.seen}/{s.total} seen{s.seen ? ` · ${pct(s.acc)}% correct` : ''}</div></div>
              <div className="w"><Tag>{d.weight}%</Tag></div>
              <div><Bar value={s.mastery} /><div className="muted small">{pct(s.mastery)}%</div></div>
              <Link className="btn small" to={`${base}/practice?domain=${d.id}`}>Drill</Link>
            </div>
          );
        })}
      </section>

      {p.mocks.length > 0 && (
        <section className="card">
          <h2 className="flush">Mock history</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Score</th><th>Correct</th><th>Time</th><th /></tr></thead>
              <tbody>
                {p.mocks.map((m, i) => (
                  <tr key={m.date}>
                    <td>{new Date(m.date).toLocaleDateString()}</td>
                    <td><Tag tone={m.score >= exam.passing ? 'good' : 'bad'}>{m.score}</Tag></td>
                    <td>{pct(m.pct)}%</td>
                    <td className="num">{fmtTime(m.secs)}</td>
                    <td><Link to={`${base}/review/${i}`}>Review</Link></td>
                  </tr>
                )).reverse()}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
