import { Link, useParams } from 'react-router-dom';
import { getTrack } from '../content';
import { useAppState } from '../lib/store';
import NotFound from './NotFound';

const PATHS = [
  { who: 'Non-technical (PM, analyst, consultant, ops)', order: ['ccao-f'], why: 'Associate is about using Claude well and safely at work.' },
  { who: 'Developer', order: ['ccdv-f', 'ccar-f', 'ccar-p'], why: 'Build API fluency first, then architecture.' },
  { who: 'Senior engineer or architect', order: ['ccar-f', 'ccar-p', 'ccdv-f', 'ccao-f'], why: 'Architect Foundations is the core technical exam; after both Architect exams, the rest is mostly review.' },
];

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId);
  const state = useAppState();
  if (!track) return <NotFound />;
  const code = (id: string) => track.exams.find(e => e.id === id)?.code ?? id;

  return (
    <main className="page">
      <section className="hero compact">
        <p className="eyebrow">{track.provider} track</p>
        <h1 className="display">{track.name} certifications</h1>
        <p className="lede">{track.description}</p>
        <Link className="btn" to={`/${track.id}/guide`}>Read the full study runbook</Link>
      </section>

      <h2>Exams</h2>
      <div className="grid exams">
        {track.exams.map(e => {
          const p = state.ex[`${track.id}/${e.id}`];
          const started = p && (Object.keys(p.q).length || Object.keys(p.lessons).length);
          return (
            <Link key={e.id} to={`/${track.id}/${e.id}`} className={`card exam-card tier-${e.tier.toLowerCase()}`}>
              <div className="spread"><span className="code">{e.code}</span><span className="tag">{e.tier}</span></div>
              <h3>{e.name}</h3>
              <div className="muted small">{e.level}</div>
              <p className="small">{e.audience}</p>
              <dl className="facts">
                <div><dt>Items</dt><dd>{e.items}</dd></div>
                <div><dt>Time</dt><dd>{e.minutes} min</dd></div>
                <div><dt>Fee</dt><dd>{e.price}</dd></div>
              </dl>
              <span className="link-cta">{started ? 'Continue studying' : 'Start studying'} →</span>
            </Link>
          );
        })}
      </div>

      <h2>Which order?</h2>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>You are</th><th>Order</th><th>Why</th></tr></thead>
            <tbody>
              {PATHS.map(p => (
                <tr key={p.who}><td>{p.who}</td><td className="nowrap">{p.order.map(code).join(' → ')}</td><td>{p.why}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">Who can sit the exams: currently only people at organisations in the Claude Partner Network, who sign in to Anthropic Partner Academy with a work email. Check fees and dates there before booking.</p>
      </div>

      <h2>Free official resources</h2>
      <ul className="resources">
        {track.resources.map(r => (
          <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a><span className="muted small">{r.note}</span></li>
        ))}
      </ul>
    </main>
  );
}
