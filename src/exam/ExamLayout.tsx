import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useOutletContext, useParams } from 'react-router-dom';
import { getExamSummary, getTrack } from '../content';
import type { Exam, ExamSummary, Track } from '../lib/types';
import NotFound from '../pages/NotFound';
import { useMeta } from '../lib/useMeta';

export interface ExamCtx {
  track: Track;
  summary: ExamSummary;
  exam: Exam;
  /** progress key, "<track>/<exam>" */
  key: string;
  base: string;
  domainName: (id: string) => string;
}

const cache = new Map<string, Exam>();

const TABS: [string, string][] = [
  ['', 'Dashboard'], ['guide', 'Exam guide'], ['learn', 'Learn'], ['cards', 'Flashcards'], ['practice', 'Practice'],
  ['mock', 'Mock exam'], ['mistakes', 'Mistakes'], ['traps', 'Traps'], ['plan', 'Study plan'],
];

export default function ExamLayout() {
  const { trackId, examId } = useParams();
  const track = getTrack(trackId);
  const summary = getExamSummary(trackId, examId);
  const key = `${trackId}/${examId}`;
  const [exam, setExam] = useState<Exam | undefined>(cache.get(key));
  const [failed, setFailed] = useState(false);
  const { pathname } = useLocation();
  useMeta(summary ? `${summary.code} ${summary.name}` : undefined, summary ? `${summary.kind === 'course' ? 'Course' : 'Exam prep'} for ${summary.name} (${summary.level}): lessons, flashcards, practice questions and timed mock exams.` : undefined, !/\/learn\/[^/]+$/.test(pathname));

  useEffect(() => {
    setFailed(false);
    if (!summary || cache.has(key)) { setExam(cache.get(key)); return; }
    setExam(undefined);
    // Moving between exams keeps this component: a slow load for the previous exam must not land on the new one.
    let live = true;
    summary.load().then(e => { cache.set(key, e); if (live) setExam(e); }).catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [key, summary]);

  // On narrow screens the tabs scroll sideways: keep the current one in view.
  const tabs = useRef<HTMLElement>(null);
  useEffect(() => {
    const a = tabs.current?.querySelector<HTMLElement>('a.active');
    if (a && tabs.current) tabs.current.scrollTo({ left: a.offsetLeft - tabs.current.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
  }, [pathname, exam]);

  if (!track || !summary) return <NotFound />;
  const base = `/${track.id}/${summary.id}`;

  return (
    <>
      <div className="subbar">
        <div className="subbar-inner">
          <div className="crumbs small"><Link to={`/${track.id}`}>{track.name}</Link> / <strong>{summary.code}</strong> <span className="muted">{summary.level}</span></div>
          <nav className="tabs" aria-label="Exam sections" ref={tabs}>
            {TABS.map(([path, label]) => (
              <NavLink key={path} to={path ? `${base}/${path}` : base} end={!path}>{path === 'mock' && summary.kind === 'course' ? 'Practice test' : label}</NavLink>
            ))}
          </nav>
        </div>
      </div>
      <main className="page">
        {failed ? <p className="empty">This exam's content could not be loaded. Check your connection and reload the page.</p>
          : !exam ? <p className="empty muted">Loading {summary.code}…</p>
          : <Outlet context={{ track, summary, exam, key, base, domainName: (id: string) => exam.domains.find(d => d.id === id)?.name ?? id } satisfies ExamCtx} />}
      </main>
    </>
  );
}

export const useExam = () => useOutletContext<ExamCtx>();
