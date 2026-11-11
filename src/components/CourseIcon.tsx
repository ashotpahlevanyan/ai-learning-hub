import { BRAND_ICONS } from './brandIcons';

// Topic glyphs for courses that are about an idea rather than a product. Stroke-drawn on a 24-unit grid.
const GLYPHS: Record<string, { title: string; hex: string; d: string[] }> = {
  // Summation sign: mathematics.
  math: { title: 'Mathematics', hex: '#7c4dbd', d: ['M17 5H7l6 7-6 7h10'] },
  // A small binary tree: algorithms and data structures.
  tree: { title: 'Algorithms', hex: '#2f8f6a', d: ['M12 6.5V9M12 9l-5 6M12 9l5 6', 'M12 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z', 'M7 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'] },
  // Three connected boxes: system design.
  nodes: { title: 'System design', hex: '#2b6cb0', d: ['M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6z', 'M12 8v4M6 16v-4h12v4'] },
  // A speech bubble with a spark: LLM applications.
  spark: { title: 'LLM applications', hex: '#c2410c', d: ['M4 5h16v11h-7l-4 4v-4H4z', 'M12 7.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z'] },
  // Layered stack: the Engineering track.
  stack: { title: 'Engineering', hex: '#2b6cb0', d: ['M12 3 3 8l9 5 9-5z', 'M3 12.5l9 5 9-5', 'M3 17l9 5 9-5'] },
};

// Vendors without a freely licensed mark get a plain lettermark in their well-known color.
const LETTERS: Record<string, { title: string; hex: string; text: string }> = {
  openai: { title: 'OpenAI', hex: '#10a37f', text: 'OAI' },
  aws: { title: 'AWS', hex: '#e07b00', text: 'aws' },
  azure: { title: 'Microsoft Azure', hex: '#0078d4', text: 'Az' },
};

const TRACK_ICON: Record<string, string> = {
  claude: 'claude', gemini: 'gemini', openai: 'openai', aws: 'aws', azure: 'azure',
  nvidia: 'nvidia', databricks: 'databricks', foundations: 'math', engineering: 'stack',
};

const EXAM_ICON: Record<string, string> = {
  pmle: 'googlecloud',
  'math-ai': 'math', 'python-ai': 'python', 'python-deep': 'python', dsa: 'tree',
  'system-design': 'nodes', postgres: 'postgres', typescript: 'typescript', 'llm-engineering': 'spark', 'react-next': 'react', devops: 'docker',
};

export function iconKey(trackId: string, examId?: string) {
  return (examId && EXAM_ICON[examId]) || TRACK_ICON[trackId] || 'stack';
}

/** A course or track icon on a tinted tile. Decorative: the name is always shown next to it. */
export default function CourseIcon({ track, exam, size = 40 }: { track: string; exam?: string; size?: number }) {
  const key = iconKey(track, exam);
  const brand = BRAND_ICONS[key], glyph = GLYPHS[key], letters = LETTERS[key];
  const hex = brand?.hex ?? glyph?.hex ?? letters?.hex ?? '#566672';
  return (
    <span className="course-icon" style={{ '--brand': hex, width: size, height: size } as React.CSSProperties} aria-hidden="true">
      {brand ? (
        <svg viewBox="0 0 24 24" width={size * .55} height={size * .55}><path d={brand.path} fill="currentColor" /></svg>
      ) : glyph ? (
        <svg viewBox="0 0 24 24" width={size * .6} height={size * .6} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          {glyph.d.map((d, i) => <path key={i} d={d} />)}
        </svg>
      ) : (
        <span className="course-icon-letters" style={{ fontSize: size * (letters!.text.length > 2 ? .3 : .38) }}>{letters!.text}</span>
      )}
    </span>
  );
}
