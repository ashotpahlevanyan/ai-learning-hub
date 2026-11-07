import type { ReactNode } from 'react';
import { barTone } from '../lib/quiz';

export function Bar({ value, tone }: { value: number; tone?: 'good' | 'warn' | 'bad' | 'accent' }) {
  const t = tone ?? barTone(value);
  return (
    <div className={`bar ${t}`} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

export function Tag({ children, tone }: { children: ReactNode; tone?: 'good' | 'bad' | 'warn' }) {
  return <span className={`tag ${tone ?? ''}`}>{children}</span>;
}

export function StatCard({ label, value, note, children }: { label: string; value: ReactNode; note?: ReactNode; children?: ReactNode }) {
  return (
    <div className="card">
      <div className="muted small">{label}</div>
      <div className="stat">{value}</div>
      {note && <div className="muted small">{note}</div>}
      {children}
    </div>
  );
}

export const pct = (x: number) => Math.round(x * 100);
