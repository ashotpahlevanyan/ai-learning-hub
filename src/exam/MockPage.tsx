import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from './ExamLayout';
import { getState, progressIn, pruneMocks, recordAnswer, update, useProgress, type ActiveMock } from '../lib/store';
import { buildMock, fmtTime, pctToPass, sameSet, scaled } from '../lib/quiz';
import QuestionView from '../components/QuestionView';
import { pct } from '../components/ui';

export default function MockPage() {
  const { exam, key, base } = useExam();
  const p = useProgress(key);
  const navigate = useNavigate();
  const m = p.activeMock;
  const course = exam.kind === 'course';
  const [now, setNow] = useState(Date.now());

  const setMock = (fn: (m: ActiveMock) => void) => update(s => { const am = progressIn(s, key).activeMock; if (am) fn(am); });

  const submit = (timedOut: boolean) => {
    const am = getState().ex[key]?.activeMock;
    if (!am) return;
    let ok = 0;
    const dom: Record<string, [number, number]> = {};
    update(s => {
      am.qids.forEach((id, i) => {
        const q = exam.questions.find(x => x.id === id);
        if (!q) return;
        const right = sameSet(am.answers[i] ?? [], q.answer);
        if (right) ok++;
        const r = (dom[q.domain] ??= [0, 0]); r[1]++; if (right) r[0]++;
        recordAnswer(s, key, id, right);
      });
      const ep = progressIn(s, key);
      const fraction = ok / am.qids.length;
      ep.mocks = pruneMocks([...ep.mocks, {
        date: Date.now(), pct: fraction, score: scaled(fraction), n: am.qids.length, ok, dom,
        secs: Math.min(am.duration, (Date.now() - am.start) / 1000), qids: am.qids, orders: am.orders, answers: am.answers, timedOut,
      }]);
      delete ep.activeMock;
    });
    navigate(`${base}/review/${(getState().ex[key]?.mocks.length ?? 1) - 1}`);
  };

  const remaining = m ? m.duration - (now - m.start) / 1000 : 0;
  useEffect(() => {
    if (!m) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [m]);
  useEffect(() => { if (m && remaining <= 0) submit(true); });

  const q = m ? exam.questions.find(x => x.id === m.qids[m.i]) : undefined;
  useEffect(() => {
    if (!m || !q) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, select, textarea, dialog')) return;
      const n = Number(e.key);
      if (n >= 1 && n <= m.orders[m.i].length) pick(m.orders[m.i][n - 1]);
      else if (e.key === 'n' || e.key === 'ArrowRight') go(m.i + 1);
      else if (e.key === 'p' || e.key === 'ArrowLeft') go(m.i - 1);
      else if (e.key === 'f') setMock(am => { am.flags[am.i] = !am.flags[am.i]; });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!m) {
    const n = Math.min(exam.items, exam.questions.length);
    const begin = (size: number, minutes: number) => update(s => { progressIn(s, key).activeMock = buildMock(exam, size, minutes); });
    return (
      <>
        <h1>{course ? 'Practice test' : 'Mock exam'}</h1>
        <div className="card">
          <p>{course ? 'A timed test across every domain of this course:' : 'A full simulation:'} <strong>{n} questions</strong> drawn by domain weight, <strong>{exam.minutes} minutes</strong>, and no feedback until you submit. Flag questions to come back to. Your progress survives a page reload.</p>
          <ul>
            {course
              ? <li>This course has no official exam. Scores use the same 100–1000 scale as the certification tracks; aim for <strong>85% or more</strong> to count the course as mastered.</li>
              : <li>Pass mark on the real exam is <strong>{exam.passing}/1000</strong>. This site estimates a scaled score linearly from percent correct ({exam.passing} ≈ {pct(pctToPass(exam.passing))}%). The real scaling isn't published, so aim for <strong>85% or more</strong> before booking.</li>}
            <li>Pace: about {(exam.minutes / n).toFixed(1)} minutes per question. If you're stuck past 3 minutes, flag it and move on.</li>
            <li>On "choose N" items every pick must be right to earn credit.</li>
          </ul>
          {n < exam.items && <p className="muted small">The question bank has {n} questions, fewer than the {exam.items} a full test uses.</p>}
          <div className="row">
            <button className="btn primary" onClick={() => begin(exam.items, exam.minutes)}>Start {exam.minutes}-minute {course ? 'test' : 'mock'}</button>
            <button className="btn" onClick={() => begin(20, 20)}>Quick 20-question mock (20 min)</button>
          </div>
        </div>
      </>
    );
  }
  if (!q) {
    update(s => { delete progressIn(s, key).activeMock; });
    return null;
  }

  function pick(oi: number) {
    setMock(am => {
      const a = am.answers[am.i] ?? [];
      am.answers[am.i] = q!.answer.length > 1 ? (a.includes(oi) ? a.filter(x => x !== oi) : [...a, oi]) : [oi];
    });
  }
  function go(i: number) { setMock(am => { am.i = Math.max(0, Math.min(am.qids.length - 1, i)); }); }
  const confirmSubmit = () => {
    const un = m.qids.length - Object.values(m.answers).filter(a => a.length).length;
    const fl = Object.values(m.flags).filter(Boolean).length;
    if (confirm(`Submit the exam now?${un ? `\n${un} unanswered.` : ''}${fl ? `\n${fl} flagged for review.` : ''}`)) submit(false);
  };
  const answered = Object.values(m.answers).filter(a => a.length).length;

  return (
    <>
      <div className="spread">
        <div><strong>Question {m.i + 1}</strong> <span className="muted">of {m.qids.length}</span></div>
        <div className={`timer ${remaining < 600 ? 'low' : ''}`} aria-label="Time remaining">{fmtTime(remaining)}</div>
      </div>
      <div className="card q-card">
        <QuestionView q={q} order={m.orders[m.i]} picked={m.answers[m.i] ?? []} reveal={false} onPick={pick} />
        <div className="spread">
          <button className="btn small" onClick={() => setMock(am => { am.flags[am.i] = !am.flags[am.i]; })}>{m.flags[m.i] ? '⚑ Flagged' : '⚐ Flag for review'}</button>
          <div className="row">
            <button className="btn" disabled={m.i === 0} onClick={() => go(m.i - 1)}>← Prev</button>
            <button className="btn primary" onClick={() => (m.i + 1 < m.qids.length ? go(m.i + 1) : confirmSubmit())}>{m.i + 1 < m.qids.length ? 'Next →' : 'Review and submit'}</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="spread small"><span>{answered}/{m.qids.length} answered · {Object.values(m.flags).filter(Boolean).length} flagged</span><button className="btn small" onClick={confirmSubmit}>Submit exam</button></div>
        <div className="navgrid">
          {m.qids.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Question ${i + 1}`}
              className={`${(m.answers[i] ?? []).length ? 'ans' : ''} ${m.flags[i] ? 'flag' : ''} ${i === m.i ? 'cur' : ''}`}>{i + 1}</button>
          ))}
        </div>
      </div>
      <p className="muted small">Keyboard: <kbd>1</kbd>–<kbd>4</kbd> choose · <kbd>n</kbd>/<kbd>p</kbd> next/previous · <kbd>f</kbd> flag</p>
    </>
  );
}
