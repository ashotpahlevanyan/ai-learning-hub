import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { tracks } from '../content';
import { useMeta } from '../lib/useMeta';

interface Doc { kind: 'Lesson' | 'Flashcard'; code: string; title: string; text: string; to: string }

const MAX_RESULTS = 50;

/** Strip Markdown syntax so snippets read as plain text. */
const plain = (s: string) => s.replace(/```[\s\S]*?```/g, ' ').replace(/[`*_#>|[\]()]/g, ' ').replace(/\s+/g, ' ').trim();

let docsPromise: Promise<Doc[]> | undefined;
/** Load every exam bundle once and flatten lessons and flashcards into searchable documents. Questions are left out so search can't reveal answers. */
function loadDocs(): Promise<Doc[]> {
  docsPromise ??= Promise.all(tracks.flatMap(t => t.exams.map(async s => {
    const exam = await s.load();
    const base = `/${t.id}/${s.id}`;
    return [
      ...exam.lessons.map(l => ({
        kind: 'Lesson' as const, code: s.code, title: l.title, to: `${base}/learn/${l.id}`,
        text: plain([l.summary, ...l.sections.map(x => `${x.heading} ${x.body}`), ...(l.keyPoints ?? [])].join(' ')),
      })),
      ...exam.flashcards.map(c => ({ kind: 'Flashcard' as const, code: s.code, title: plain(c.front), to: `${base}/cards`, text: plain(c.back) })),
    ];
  }))).then(groups => groups.flat());
  return docsPromise;
}

function snippet(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  const hit = Math.min(...terms.map(t => lower.indexOf(t)).filter(i => i >= 0));
  // Start a little before the first hit, at a word boundary.
  const at = hit > 60 ? text.indexOf(' ', hit - 60) + 1 : 0;
  return (at > 0 ? '…' : '') + text.slice(at, at + 200) + (at + 200 < text.length ? '…' : '');
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [input, setInput] = useState(q);
  const [docs, setDocs] = useState<Doc[] | null>(null);
  useMeta(q ? `Search: ${q}` : 'Search', 'Search every lesson and flashcard across all tracks.');

  useEffect(() => { loadDocs().then(setDocs); }, []);
  useEffect(() => { setInput(q); }, [q]);

  const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  const results = useMemo(() => {
    if (!docs || !terms.length) return [];
    return docs
      .map(d => {
        const title = d.title.toLowerCase(), text = d.text.toLowerCase();
        if (!terms.every(t => title.includes(t) || text.includes(t))) return null;
        // Title hits rank above body hits; lessons above flashcards on ties.
        const score = terms.reduce((s, t) => s + (title.includes(t) ? 10 : 0) + Math.min(5, text.split(t).length - 1), 0) + (d.kind === 'Lesson' ? 1 : 0);
        return { d, score };
      })
      .filter((x): x is { d: Doc; score: number } => !!x)
      .sort((a, b) => b.score - a.score);
  }, [docs, q]);

  return (
    <main className="page">
      <h1>Search</h1>
      <form className="row search-form" role="search" onSubmit={e => { e.preventDefault(); setParams(input.trim() ? { q: input.trim() } : {}); }}>
        <input type="search" aria-label="Search lessons and flashcards" placeholder="e.g. prompt caching, RAG, guardrails" value={input} onChange={e => setInput(e.target.value)} autoFocus />
        <button className="btn primary" type="submit">Search</button>
      </form>
      {!docs ? <p className="muted">Loading the content index…</p>
        : !terms.length ? <p className="muted">Searches lesson text and flashcards in every track. Practice questions are left out so search can't give answers away.</p>
        : (
          <>
            <p className="muted small" role="status">{results.length ? `${results.length} result${results.length === 1 ? '' : 's'}${results.length > MAX_RESULTS ? `, showing the top ${MAX_RESULTS}` : ''}` : 'No results. Try fewer or different words.'}</p>
            <ol className="results">
              {results.slice(0, MAX_RESULTS).map(({ d }) => (
                <li key={d.to + d.title}>
                  <div className="muted small">{d.code} · {d.kind}</div>
                  <Link to={d.to}><strong>{d.title}</strong></Link>
                  <p className="small">{snippet(d.text, terms)}</p>
                </li>
              ))}
            </ol>
          </>
        )}
    </main>
  );
}
