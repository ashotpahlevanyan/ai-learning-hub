import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * A bar fixed to the bottom of the screen on phones, holding the page's main actions within thumb reach.
 * While it is shown it replaces the site's tab bar. On wider screens it renders nothing; pages keep their inline controls.
 * `progress` (0–1) draws a thin line along its top edge, e.g. how far through a lesson you have read.
 */
export default function ActionBar({ children, progress }: { children: ReactNode; progress?: number }) {
  useEffect(() => {
    document.body.classList.add('has-actionbar');
    return () => document.body.classList.remove('has-actionbar');
  }, []);
  return createPortal(
    <div className="actionbar" role="region" aria-label="Page actions">
      {progress !== undefined && <span className="actionbar-progress" style={{ transform: `scaleX(${Math.min(1, Math.max(0, progress))})` }} aria-hidden="true" />}
      {children}
    </div>,
    document.body,
  );
}

/** How far the page has been scrolled, from 0 at the top to 1 at the bottom. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      setP(max > 0 ? scrollY / max : 1);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);
  return p;
}
