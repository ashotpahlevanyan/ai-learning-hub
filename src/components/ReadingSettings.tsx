import { useEffect, useId, useRef, useState } from 'react';
import { update, useAppState, type ReadingPrefs, type Theme } from '../lib/store';
import { applyReading, DEFAULTS, OPTIONS, THEMES } from '../lib/reading';

const LEGEND: Record<keyof ReadingPrefs, string> = { size: 'Text size', font: 'Typeface', leading: 'Line spacing', width: 'Line length' };

/** "Aa" button in the top bar: theme plus text size, typeface, spacing and line length. Saved on this device only. */
export default function ReadingSettings() {
  const { theme, reading } = useAppState();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null), panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => { applyReading(theme, reading); }, [theme, reading]);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !btn.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  const setTheme = (t: Theme | 'system') => update(s => { if (t === 'system') delete s.theme; else s.theme = t; });
  const setPref = <K extends keyof ReadingPrefs>(k: K, v: ReadingPrefs[K]) => update(s => { s.reading = { ...s.reading, [k]: v }; });
  const changed = !!theme || Object.entries(reading ?? {}).some(([k, v]) => v !== DEFAULTS[k as keyof ReadingPrefs]);

  return (
    <div className="reading-settings">
      <button ref={btn} className="icon-btn aa-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={id}
        aria-label="Reading settings" title="Reading settings: theme, text size and typeface">
        <span aria-hidden="true">Aa</span>
      </button>
      {open && (
        <div ref={panel} id={id} className="reading-panel" role="dialog" aria-label="Reading settings">
          <fieldset className="theme-choices">
            <legend>Theme</legend>
            {THEMES.map(t => (
              <label key={t.id} className={`theme-choice swatch-${t.id}`} title={t.note}>
                <input type="radio" name={`${id}-theme`} checked={(theme ?? 'system') === t.id} onChange={() => setTheme(t.id)} />
                <span className="swatch" aria-hidden="true"><span>Aa</span></span>
                <span className="theme-name">{t.label}</span>
              </label>
            ))}
          </fieldset>
          {(Object.keys(OPTIONS) as (keyof ReadingPrefs)[]).map(k => (
            <fieldset key={k} className="segmented">
              <legend>{LEGEND[k]}</legend>
              <div className="seg-row">
                {OPTIONS[k].map(([v, label]) => (
                  <label key={v} className={k === 'font' ? `font-${v}` : undefined}>
                    <input type="radio" name={`${id}-${k}`} checked={(reading?.[k] ?? DEFAULTS[k]) === v} onChange={() => setPref(k, v as never)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="spread small">
            <span className="muted">Saved on this device</span>
            <button className="btn" disabled={!changed} onClick={() => update(s => { delete s.theme; delete s.reading; })}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
