import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { tracks } from '../content';
import { update, useAppState } from '../lib/store';

// Small stroke icons, drawn in currentColor so they follow the theme.
const Icon = ({ d, label }: { d: string; label?: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
    <path d={d} />
  </svg>
);
const ICONS = {
  home: 'M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5',
  tracks: 'M4 5h16M4 12h16M4 19h16',
  roadmap: 'M4 6h3m4 0h9M4 12h9m4 0h3M4 18h5m4 0h7M7 4v4M13 10v4M9 16v4',
  library: 'M5 4h4v16H5zM11 4h4v16h-4zM17.5 5l3 .8-3.8 14.2-3-.8',
  progress: 'M4 20V10m6 10V4m6 16v-7m4 7H3',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4.5 4.5',
  close: 'M6 6l12 12M18 6 6 18',
  theme: 'M12 3a9 9 0 1 0 0 18V3Z M12 3a9 9 0 0 1 0 18',
};

const LINKS = [
  { to: '/roadmap', label: 'Roadmap', icon: ICONS.roadmap, note: 'Six months, week by week' },
  { to: '/library', label: 'Library', icon: ICONS.library, note: 'Books, courses and docs' },
  { to: '/search', label: 'Search', icon: ICONS.search, note: 'Lessons and questions' },
  { to: '/progress', label: 'My progress', icon: ICONS.progress, note: 'Scores, export, sync' },
];

function ThemeToggle() {
  const { theme } = useAppState();
  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);
  const toggle = () => {
    const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    update(s => { s.theme = dark ? 'light' : 'dark'; });
  };
  return <button className="icon-btn" onClick={toggle} aria-label="Toggle light or dark theme" title="Light or dark theme"><Icon d={ICONS.theme} /></button>;
}

const count = (exams: { kind: string }[]) => {
  const word = exams.every(e => e.kind === 'course') ? 'course' : 'exam';
  return `${exams.length} ${word}${exams.length === 1 ? '' : 's'}`;
};

/** Full menu: every track and tool. A side sheet on phones and tablets. */
function MenuSheet({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('a, button')?.focus();
    document.body.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Keep Tab inside the open menu.
      if (e.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>('a, button')];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll'); prev?.focus(); };
  }, [onClose]);

  return (
    <div className="sheet-wrap" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu" ref={panel}>
        <div className="sheet-head">
          <strong>Menu</strong>
          <button className="icon-btn" onClick={onClose} aria-label="Close menu"><Icon d={ICONS.close} /></button>
        </div>
        <p className="sheet-label">Certification tracks</p>
        <ul className="sheet-list">
          {tracks.map(t => (
            <li key={t.id}>
              <NavLink to={`/${t.id}`}>
                <span><strong>{t.navLabel ?? t.name}</strong>{t.provider !== (t.navLabel ?? t.name) && <span className="muted small"> · {t.provider}</span>}</span>
                <span className="muted small nowrap">{count(t.exams)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="sheet-label">Plan and tools</p>
        <ul className="sheet-list">
          {[{ to: '/', label: 'Home', icon: ICONS.home, note: 'Continue where you left off' }, ...LINKS].map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'}>
                <span className="row nowrap"><Icon d={l.icon} /><strong>{l.label}</strong></span>
                <span className="muted small">{l.note}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="small sheet-foot"><Link to="/about">About and privacy</Link></p>
      </div>
    </div>
  );
}

/** Site header (full links on wide screens, a menu button below that) and a bottom tab bar on phones. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { pathname } = useLocation();
  useEffect(close, [pathname, close]);
  const inTrack = tracks.some(t => pathname === `/${t.id}` || pathname.startsWith(`/${t.id}/`));

  const tab = (to: string, label: string, icon: string) => (
    <NavLink to={to} end={to === '/'} className="tab"><Icon d={icon} /><span>{label}</span></NavLink>
  );

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand"><span className="logo" aria-hidden="true">A</span> AI Learning Hub</Link>
        <nav className="topnav wide-only" aria-label="Main">
          {tracks.map(t => <NavLink key={t.id} to={`/${t.id}`}>{t.navLabel ?? t.name}</NavLink>)}
          <span className="divider" aria-hidden="true" />
          {LINKS.map(l => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
        </nav>
        <div className="top-actions">
          <Link to="/search" className="icon-btn narrow-only" aria-label="Search"><Icon d={ICONS.search} /></Link>
          <ThemeToggle />
          <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog"><Icon d={ICONS.tracks} /></button>
        </div>
      </header>

      <nav className="tabbar" aria-label="Quick">
        {tab('/', 'Home', ICONS.home)}
        <button className={`tab ${inTrack ? 'active' : ''}`} onClick={() => setOpen(true)} aria-haspopup="dialog"><Icon d={ICONS.tracks} /><span>Tracks</span></button>
        {tab('/roadmap', 'Roadmap', ICONS.roadmap)}
        {tab('/library', 'Library', ICONS.library)}
        {tab('/progress', 'Progress', ICONS.progress)}
      </nav>

      {open && <MenuSheet onClose={close} />}
    </>
  );
}
