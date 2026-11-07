import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { getState, recordAnswer, update, useProgress } from '../lib/store';
import { buildPractice, sameSet, type PracticeItem, type PracticeMode } from '../lib/quiz';
import QuestionView from '../components/QuestionView';
import Md from '../components/Md';
import { Bar, pct } from '../components/ui';

interface Session { items: PracticeItem[]; i: number; finished: boolean }

export default function PracticePage() {
  const { exam, key, base, domainName } = useExam();
  const p = useProgress(key);
  const [params, setParams] = useSearchParams();
  const preset = params.get('domain');
  const [domains, setDomains] = useState<string[]>(exam.domains.map(d => d.id));
  const [mode, setMode] = useState<PracticeMode>('smart');
  const [count, setCount] = useState(20);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');

  const start = (doms: string[], m: PracticeMode, n: number) => {
    if (!doms.length) return setError('Pick at least one domain.');
    const items = buildPractice(exam, getState().ex[key] ?? p, doms, m, n);
    if (!items.length) return setError('No questions match these settings. Try another mode or more domains.');
    setError('');
    setSession({ items, i: 0, finished: false });
  };

  // ?domain=d1 or ?mode=mistakes jumps straight into a session.
  useEffect(() => {
    const m = params.get('mode') as PracticeMode | null;
    if (preset && exam.domains.some(d => d.id === preset)) start([preset], 'smart', 15);
    else if (m === 'mistakes') start(exam.domains.map(d => d.id), 'mistakes', 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, params.get('mode')]);

  const mistakes = exam.questions.filter(q => p.q[q.id] && !p.q[q.id].lastOk).length;

  if (!session) {
    return (
      <>
        <h1>Practice</h1>
        <p className="muted">Instant feedback with a reason for every option. Options are shuffled each time, so you learn the idea, not the letter.</p>
        <div className="card">
          <h3 className="flush">Domains</h3>
          <div className="chips">
            {exam.domains.map(d => (
              <button key={d.id} className={`btn chip ${domains.includes(d.id) ? 'on' : ''}`} aria-pressed={domains.includes(d.id)}
                onClick={() => setDomains(ds => ds.includes(d.id) ? ds.filter(x => x !== d.id) : [...ds, d.id])}>
                {d.name} · {d.weight}%
              </button>
            ))}
          </div>
          <h3>Mode</h3>
          <div className="chips">
            {([['smart', 'Smart (weak and unseen first)'], ['unseen', 'Unseen only'], ['mistakes', `Mistakes only (${mistakes})`], ['random', 'Random']] as [PracticeMode, string][]).map(([m, l]) => (
              <button key={m} className={`btn chip ${mode === m ? 'on' : ''}`} aria-pressed={mode === m} onClick={() => setMode(m)}>{l}</button>
            ))}
          </div>
          <h3>Questions</h3>
          <div className="chips">
            {[10, 20, 40, 80].map(n => <button key={n} className={`btn chip ${count === n ? 'on' : ''}`} aria-pressed={count === n} onClick={() => setCount(n)}>{n}</button>)}
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          <div className="actions"><button className="btn primary" onClick={() => start(domains, mode, count)}>Start practice</button></div>
        </div>
        <p className="muted small">Keyboard: <kbd>1</kbd>–<kbd>4</kbd> choose · <kbd>Enter</kbd> check or next.</p>
      </>
    );
  }

  const done = session.items.filter(x => x.done);
  if (session.finished) {
    const ok = done.filter(x => x.ok).length;
    const byDom: Record<string, [number, number]> = {};
    done.forEach(x => { const q = exam.questions.find(qq => qq.id === x.id)!; const r = (byDom[q.domain] ??= [0, 0]); r[1]++; if (x.ok) r[0]++; });
    const missed = done.filter(x => !x.ok).map(x => exam.questions.find(q => q.id === x.id)!);
    return (
      <>
        <h1>Session complete</h1>
        <div className="card">
          <div className="stat">{ok}/{done.length}</div>
          <div className="muted">{done.length ? `${pct(ok / done.length)}% correct` : 'No questions answered'}</div>
          <div className="table-wrap"><table><tbody>{Object.entries(byDom).map(([d, [a, b]]) => <tr key={d}><td>{domainName(d)}</td><td className="num">{a}/{b}</td></tr>)}</tbody></table></div>
        </div>
        {missed.length > 0 && (
          <div className="card">
            <h3 className="flush">Review what you missed</h3>
            {missed.map(q => (
              <div key={q.id} className="missed">
                <Md>{q.stem}</Md>
                <div className="feedback good small"><strong>Answer:</strong> {q.answer.map(a => <div key={a}><Md inline>{q.options[a]}</Md></div>)}<Md>{q.explanation}</Md></div>
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <button className="btn primary" onClick={() => { setSession(null); setParams({}); }}>New session</button>
          <Link className="btn" to={base}>Dashboard</Link>
        </div>
      </>
    );
  }

  return <PracticeQuestion session={session} setSession={setSession} />;
}

function PracticeQuestion({ session: s, setSession: set }: { session: Session; setSession: (x: Session) => void }) {
  const { exam, key, domainName } = useExam();
  const item = s.items[s.i];
  const q = exam.questions.find(x => x.id === item.id)!;
  const multi = q.answer.length > 1;
  const right = item.done && sameSet(item.picked, q.answer);

  const patch = (it: Partial<PracticeItem>, extra: Partial<Session> = {}) => {
    const items = s.items.slice(); items[s.i] = { ...item, ...it };
    set({ ...s, ...extra, items });
  };
  const check = (picked = item.picked) => {
    const ok = sameSet(picked, q.answer);
    update(st => recordAnswer(st, key, q.id, ok));
    patch({ picked, done: true, ok });
  };
  const pick = (oi: number) => {
    if (item.done) return;
    if (multi) patch({ picked: item.picked.includes(oi) ? item.picked.filter(x => x !== oi) : [...item.picked, oi] });
    else check([oi]);
  };
  const next = () => set({ ...s, i: s.i + 1, finished: s.i + 1 >= s.items.length });
  const quit = () => set({ ...s, items: s.items.slice(0, s.i + (item.done ? 1 : 0)), finished: true });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= item.order.length && !item.done) pick(item.order[n - 1]);
      else if (e.key === 'Enter') { e.preventDefault(); if (item.done) next(); else if (multi && item.picked.length === q.answer.length) check(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <>
      <div className="spread small muted">
        <span>Question {s.i + 1} of {s.items.length} · {domainName(q.domain)}</span>
        <span>{s.items.filter(x => x.done && x.ok).length} correct · <button className="linklike" onClick={quit}>End session</button></span>
      </div>
      <Bar value={s.i / s.items.length} tone="accent" />
      <div className="card q-card">
        <QuestionView q={q} order={item.order} picked={item.picked} reveal={item.done} onPick={pick} />
        {item.done && <div className={`feedback ${right ? 'good' : 'bad'}`} role="status"><strong>{right ? 'Correct.' : 'Not quite.'}</strong> <Md>{q.explanation}</Md></div>}
        <div className="spread">
          <span className="muted small">Difficulty {'●'.repeat(q.difficulty ?? 2)}{'○'.repeat(3 - (q.difficulty ?? 2))}</span>
          {item.done ? <button className="btn primary" onClick={next}>{s.i + 1 < s.items.length ? 'Next →' : 'See results'}</button>
            : multi ? <button className="btn primary" disabled={item.picked.length !== q.answer.length} onClick={() => check()}>Check answer</button> : null}
        </div>
      </div>
    </>
  );
}
