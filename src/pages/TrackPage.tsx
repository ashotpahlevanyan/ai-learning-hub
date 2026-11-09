import { Link, useParams } from 'react-router-dom';
import { getTrack } from '../content';
import { useAppState } from '../lib/store';
import NotFound from './NotFound';
import LibraryList from '../components/LibraryList';
import { library } from '../content/library';
import { useMeta } from '../lib/useMeta';
import studyTimes from 'virtual:study-time';
import { fmtHours, QUESTION_MIN } from '../lib/studyTime';
import { fmtDay, isRetired, isRetiring, orderForListing, replacementOf } from '../lib/retire';

export default function TrackPage() {
  const { trackId } = useParams();
  const track = getTrack(trackId);
  const state = useAppState();
  useMeta(track ? `${track.name} certification prep` : undefined, track?.description);
  if (!track) return <NotFound />;
  const code = (id: string) => track.exams.find(e => e.id === id)?.code ?? id;
  const study = (id: string) => studyTimes[`${track.id}/${id}`]?.total ?? 0;

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
        {orderForListing(track.exams).map(e => {
          const p = state.ex[`${track.id}/${e.id}`];
          const started = p && (Object.keys(p.q).length || Object.keys(p.lessons).length);
          const retired = isRetired(e), next = replacementOf(track, e);
          return (
            <Link key={e.id} to={`/${track.id}/${e.id}`} className={`card exam-card tier-${e.tier.toLowerCase()}${retired ? ' retired' : ''}`}>
              <div className="spread"><span className="code">{e.code}</span>{retired
                ? <span className="tag bad">Retired</span>
                : isRetiring(e) ? <span className="tag warn">Last day {fmtDay(e.lastDay!)}</span>
                : <span className="tag">{e.kind === 'course' ? 'Course' : e.tier}</span>}</div>
              <h3>{e.name}</h3>
              <div className="muted small">{e.level}</div>
              {retired && <p className="small"><strong>No longer offered</strong> (last day {fmtDay(e.lastDay!)}).{next ? ` Study ${next.code} instead.` : ''}</p>}
              <p className="small">{e.audience}</p>
              <dl className="facts">
                <div><dt>{e.kind === 'course' ? 'Test items' : 'Items'}</dt><dd>{e.items}</dd></div>
                <div><dt>Time</dt><dd>{e.minutes} min</dd></div>
                <div><dt>{e.kind === 'course' ? 'Cost' : 'Fee'}</dt><dd>{e.price}</dd></div>
              </dl>
              {study(e.id) > 0 && <p className="muted small" title="Lesson reading time plus one pass through the practice questions and flashcards">About {fmtHours(study(e.id))} of study</p>}
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
              <table className="stack">
                <thead><tr><th>You are</th><th>Order</th><th>Study</th><th>Why</th></tr></thead>
                <tbody>
                  {track.paths.map(p => (
                    <tr key={p.who}><td><strong>{p.who}</strong></td><td className="nowrap" data-label="Order">{p.order.map(code).join(' → ')}</td><td className="nowrap" data-label="Study">~{fmtHours(p.order.reduce((s, id) => s + study(id), 0))}</td><td data-label="Why">{p.why}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted small">Study time is the lessons' reading time plus one pass through the practice questions (about {QUESTION_MIN} min each) and flashcards. Hands-on labs and repeat practice add more.</p>
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

      <h2>Go deeper</h2>
      <p className="muted">The best books, courses and papers for this track. <Link to={`/library?track=${track.id}`}>See the full library</Link>.</p>
      <LibraryList items={library.filter(i => i.tracks.includes(track.id)).sort((a, b) => Number(!!b.start) - Number(!!a.start)).slice(0, 8)} />
    </main>
  );
}
