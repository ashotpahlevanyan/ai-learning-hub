import { useEffect, useRef, useState } from 'react';
import type { MockRecord } from '../lib/store';

const H = 170, L = 40, R = 14, T = 14, B = 26;

/**
 * Mock scores over attempts, with the pass mark as a reference line. One series, so no legend: the heading
 * names it, and the mock history table below is the table view. Hover or focus a point for its details.
 */
export default function ScoreTrend({ mocks, passing }: { mocks: MockRecord[]; passing: number }) {
  const [hover, setHover] = useState<number | null>(null);
  // Draw at the real pixel width so text and marks keep their size on every screen.
  const box = useRef<HTMLElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(240, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [mocks.length >= 2]);
  if (mocks.length < 2) return null;
  const lo = Math.max(0, Math.floor((Math.min(passing, ...mocks.map(m => m.score)) - 100) / 100) * 100);
  const x = (i: number) => L + (i * (W - L - R)) / (mocks.length - 1);
  const y = (s: number) => T + ((1000 - s) * (H - T - B)) / (1000 - lo);
  const ticks = [lo, Math.round((lo + 1000) / 2 / 50) * 50, 1000];
  const path = mocks.map((m, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(m.score).toFixed(1)}`).join('');
  const h = hover == null ? null : mocks[hover];
  const passed = mocks.filter(m => m.score >= passing).length;

  return (
    <figure className="trend" ref={box}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`Scores of ${mocks.length} attempts, from ${mocks[0].score} to ${mocks[mocks.length - 1].score}; ${passed} at or above the pass mark of ${passing}.`} onMouseLeave={() => setHover(null)}>
        {ticks.map(t => (
          <g key={t}>
            <line className="grid" x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
            <text className="axis" x={L - 6} y={y(t) + 4} textAnchor="end">{t}</text>
          </g>
        ))}
        <line className="pass" x1={L} x2={W - R} y1={y(passing)} y2={y(passing)} />
        <path className="line" d={path} />
        <text className="axis label" x={L + 6} y={y(passing) - 6}>pass {passing}</text>
        {mocks.map((m, i) => (
          <g key={m.date}>
            <circle className="dot" cx={x(i)} cy={y(m.score)} r={hover === i ? 5.5 : 4} />
            {/* The hit target is larger than the mark. */}
            <circle className="hit" cx={x(i)} cy={y(m.score)} r={14} tabIndex={0} role="img" aria-label={`Attempt ${i + 1}: ${m.score}`}
              onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} />
          </g>
        ))}
        <text className="axis" x={L} y={H - 6}>1st</text>
        <text className="axis" x={W - R} y={H - 6} textAnchor="end">latest</text>
      </svg>
      {h && hover != null && (
        // Near the edges the tooltip anchors to one side so it never runs off a phone screen.
        <div className={`trend-tip${x(hover) < W * 0.25 ? ' start' : x(hover) > W * 0.75 ? ' end' : ''}`} style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(h.score) / H) * 100}%` }}>
          <strong>{h.score}</strong> · {Math.round(h.pct * 100)}% correct
          <div className="muted">Attempt {hover + 1}, {new Date(h.date).toLocaleDateString()}</div>
        </div>
      )}
    </figure>
  );
}
