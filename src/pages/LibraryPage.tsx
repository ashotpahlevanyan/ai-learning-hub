import { useSearchParams } from 'react-router-dom';
import { tracks } from '../content';
import { library, topics } from '../content/library';
import LibraryList, { free } from '../components/LibraryList';
import { useMeta } from '../lib/useMeta';

export default function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const track = params.get('track') ?? 'all';
  const freeOnly = params.get('free') === '1';
  useMeta('Library', 'The best books, free online books, courses, papers and guides for AI certifications, LLMs, math and Python.');

  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };
  const shown = library.filter(i => (track === 'all' || i.tracks.includes(track)) && (!freeOnly || free(i)));

  return (
    <main className="page">
      <section className="hero compact">
        <p className="eyebrow">Library</p>
        <h1 className="display">Go deeper than the exam</h1>
        <p className="lede">The books, courses, papers and guides worth your time, chosen for depth and accuracy. Each says why it matters and what to read first. Items marked “Start here” are the best entry points.</p>
      </section>

      <div className="row controls">
        <label className="small">Track{' '}
          <select value={track} onChange={e => set('track', e.target.value === 'all' ? null : e.target.value)}>
            <option value="all">All tracks ({library.length})</option>
            {tracks.map(t => <option key={t.id} value={t.id}>{t.navLabel ?? t.name} ({library.filter(i => i.tracks.includes(t.id)).length})</option>)}
          </select>
        </label>
        <label className="small"><input type="checkbox" checked={freeOnly} onChange={e => set('free', e.target.checked ? '1' : null)} /> Free to read only</label>
      </div>
      <p className="muted small" role="status">{shown.length} item{shown.length === 1 ? '' : 's'}</p>

      {topics.map(t => {
        const items = shown.filter(i => i.topic === t.id).sort((a, b) => Number(!!b.start) - Number(!!a.start));
        if (!items.length) return null;
        return (
          <section key={t.id} id={t.id}>
            <h2>{t.name}</h2>
            <p className="muted">{t.blurb}</p>
            <LibraryList items={items} />
          </section>
        );
      })}
      <p className="muted small">Paid books link to the publisher or author. This site earns nothing from them.</p>
    </main>
  );
}
