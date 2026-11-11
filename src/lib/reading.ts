import type { ReadingPrefs, Theme } from './store';

/** Page background per theme, for the browser's theme-color (address bar on phones). Matches --bg in styles.css. */
export const THEME_BG: Record<Theme, string> = { light: '#f3f6f7', paper: '#f2ead9', dark: '#0e1418', black: '#000000' };

export const THEMES: { id: Theme | 'system'; label: string; note: string }[] = [
  { id: 'system', label: 'Match device', note: 'Light or dark, following your system setting' },
  { id: 'light', label: 'Light', note: 'Cool white, the default' },
  { id: 'paper', label: 'Paper', note: 'Warm and low-glare for long reading' },
  { id: 'dark', label: 'Dark', note: 'Dim blue-grey for low light' },
  { id: 'black', label: 'Night', note: 'True black with softened text for dark rooms' },
];

export const OPTIONS = {
  size: [['s', 'Small'], ['m', 'Medium'], ['l', 'Large'], ['xl', 'Extra large']],
  font: [['sans', 'Sans'], ['serif', 'Serif'], ['legible', 'Hyperlegible']],
  leading: [['normal', 'Normal'], ['relaxed', 'Relaxed']],
  width: [['narrow', 'Narrow'], ['medium', 'Medium'], ['wide', 'Wide']],
} as const satisfies Record<keyof ReadingPrefs, readonly (readonly [string, string])[]>;

export const DEFAULTS: Required<ReadingPrefs> = { size: 'm', font: 'sans', leading: 'normal', width: 'medium' };

const ATTR: Record<keyof ReadingPrefs, string> = { size: 'data-text', font: 'data-font', leading: 'data-leading', width: 'data-width' };

/** Mirror the settings onto <html> (the same attributes public/reading-init.js sets before first paint). */
export function applyReading(theme: Theme | undefined, prefs: ReadingPrefs | undefined) {
  const d = document.documentElement;
  if (theme) d.setAttribute('data-theme', theme); else d.removeAttribute('data-theme');
  for (const k of Object.keys(ATTR) as (keyof ReadingPrefs)[]) {
    const v = prefs?.[k];
    if (v && v !== DEFAULTS[k]) d.setAttribute(ATTR[k], v); else d.removeAttribute(ATTR[k]);
  }
  // With an explicit theme, both theme-color tags (light and dark media) show that theme's background.
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(m => {
    const media = m.media.includes('dark') ? 'dark' : 'light';
    m.content = THEME_BG[theme ?? media];
  });
}
