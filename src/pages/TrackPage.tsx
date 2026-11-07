import { Link, useParams } from 'react-router-dom';
import { getTrack } from '../content';
import { useAppState } from '../lib/store';
import NotFound from './NotFound';
import { useMeta } from '../lib/useMeta';

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId);
  const state = useAppState();
  useMeta(track ? `${track.name} certification prep` : undefined, track?.description);
  if (!track) return <NotFound />;
  const code = (id: string) => track.exams.find(e => e.id === id)?.code ?? id;

  return (
    <main className="page">
      <section className="hero compact">
        <p className="eyebrow">{track.provider} track</p>
        <h1 className="display">{track.name}</h1>
        <p className="lede">{track.description}</p>
        <Link className="btn" to={`/${track.id}/guide`}>Read the full study runbook</Link>
      </section>

      <h2>{track.exams.every(e => e.kind === 'course') ? 'Courses' : 'Exams and courses'}</h2>
      <div className="grid exams">
        {track.exams.map(e => {
          const p = state.ex[`${track.id}/${e.id}`];
          const started = p && (Object.keys(p.q).length || Object.keys(p.lessons).length);
          return (
            <Link key={e.id} to={`/${track.id}/${e.id}`} className={`card exam-card tier-${e.tier.toLowerCase()}`}>
              <div className="spread"><span className="code">{e.code}</span><span className="tag">{e.kind === 'course' ? 'Course' : e.tier}</span></div>
              <h3>{e.name}</h3>
              <div className="muted small">{e.level}</div>
              <p className="small">{e.audience}</p>
              <dl className="facts">
                <div><dt>{e.kind === 'course' ? 'Test items' : 'Items'}</dt><dd>{e.items}</dd></div>
                <div><dt>Time</dt><dd>{e.minutes} min</dd></div>
                <div><dt>{e.kind === 'course' ? 'Cost' : 'Fee'}</dt><dd>{e.price}</dd></div>
              </dl>
              <span className="link-cta">{started ? 'Continue studying' : 'Start studying'} →</span>
            </Link>
          );
        })}
      </div>

      {track.paths?.length ? (
        <>
          <h2>Which order?</h2>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead><tr><th>You are</th><th>Order</th><th>Why</th></tr></thead>
                <tbody>
                  {track.paths.map(p => (
                    <tr key={p.who}><td>{p.who}</td><td className="nowrap">{p.order.map(code).join(' → ')}</td><td>{p.why}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {track.note && <p className="muted small">{track.note}</p>}
          </div>
        </>
      ) : track.note ? <p className="muted small">{track.note}</p> : null}

      <h2>Free official resources</h2>
      <ul className="resources">
        {track.resources.map(r => (
          <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a><span className="muted small">{r.note}</span></li>
        ))}
      </ul>
    </main>
  );
}
