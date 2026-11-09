import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { getState, progressIn, touchDay, today, update, useProgress } from '../lib/store';
import { cardQueue, nextCardState, type Grade } from '../lib/srs';
import { shuffle } from '../lib/quiz';
import type { Flashcard } from '../lib/types';
import Md from '../components/Md';
import { Tag } from '../components/ui';

const GRADES: [Grade, string][] = [[0, 'Again'], [3, 'Hard'], [4, 'Good'], [5, 'Easy']];

export default function CardsPage() {
  const { exam, key, base, domainName } = useExam();
  const p = useProgress(key);
  const [filter, setFilter] = useState('all');
  const [cram, setCram] = useState(false);
  const [round, setRound] = useState(0);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [requeued, setRequeued] = useState<Flashcard[]>([]);

  // Build the queue once per filter/mode/round; grading must not reshuffle it.
  const queue = useMemo(() => {
    const prog = getState().ex[key] ?? p;
    if (cram) return shuffle(exam.flashcards.filter(c => filter === 'all' || c.domain === filter));
    const q = cardQueue(exam.flashcards, prog, filter);
    return shuffle(q.due).concat(q.fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, key, filter, cram, round]);
  const all = queue.concat(requeued);
  const card = all[i];

  const reset = () => { setI(0); setFlipped(false); setRequeued([]); setRound(r => r + 1); };

  const grade = (g: Grade) => {
    if (!card) return;
    if (!cram) {
      update(s => {
        const ep = progressIn(s, key);
        if (!ep.cards[card.id]) ep.newCards[card.id] = today();
        ep.cards[card.id] = nextCardState(ep.cards[card.id], g);
        touchDay(s);
      });
      if (g === 0) setRequeued(r => [...r, card]);
    }
    setI(n => n + 1);
    setFlipped(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card || (e.target as HTMLElement).closest('input, select, textarea')) return;
      if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f); }
      else if (flipped && '1234'.includes(e.key)) grade(GRADES[Number(e.key) - 1][0]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const stats = cardQueue(exam.flashcards, p, filter);
  return (
    <>
      <h1>Flashcards</h1>
      <div className="row controls">
        <select id="card-filter" aria-label="Domain" value={filter} onChange={e => { setFilter(e.target.value); reset(); }}>
          <option value="all">All domains</option>
          {exam.domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <label className="small"><input id="card-cram" type="checkbox" checked={cram} onChange={e => { setCram(e.target.checked); reset(); }} /> Cram mode (every card, ignores the schedule)</label>
      </div>

      {!card ? (
        <div className="card empty">
          <p>Nothing due right now. {stats.learned}/{stats.total} cards learned.</p>
          <p>Come back tomorrow, switch on cram mode, or practise questions.</p>
          <Link className="btn primary" to={`${base}/practice`}>Practice questions</Link>
        </div>
      ) : (
        <>
          <div className="spread small muted">
            <span>{i + 1} / {all.length} · {domainName(card.domain)}</span>
            {!p.cards[card.id] && <Tag tone="warn">new</Tag>}
          </div>
          <button className="card flash" onClick={() => setFlipped(f => !f)} aria-expanded={flipped}>
            {flipped ? (
              <div className="back"><div className="muted small"><Md inline>{card.front}</Md></div><Md>{card.back}</Md></div>
            ) : (
              <div><Md inline>{card.front}</Md><div className="muted small hint">Tap or press <kbd>space</kbd> to reveal</div></div>
            )}
          </button>
          {flipped && (
            <div className="grade">
              {GRADES.map(([g, label], n) => (
                <button key={g} className={`btn ${g === 4 ? 'primary' : ''}`} onClick={() => grade(g)}>{n + 1} · {label}</button>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
