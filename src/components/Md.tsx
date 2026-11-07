import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

type MathPlugins = typeof import('./math');
let mathLoaded: MathPlugins | undefined;
let mathLoading: Promise<MathPlugins> | undefined;

/** KaTeX plugins when the text has $$…$$ math; loaded once, on first need. Until then the text renders without them. */
function useMath(text: string) {
  const need = text.includes('$$');
  const [math, setMath] = useState(mathLoaded);
  useEffect(() => {
    if (need && !math) (mathLoading ??= import('./math').then(m => (mathLoaded = m))).then(setMath);
  }, [need, math]);
  return need ? math : undefined;
}

/** Renders lesson, question and guide Markdown. External links open in a new tab. */
export default function Md({ children, inline = false }: { children: string; inline?: boolean }) {
  const math = useMath(children);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, ...(math?.remark ?? [])]}
      rehypePlugins={[rehypeSlug, ...(math?.rehype ?? [])]}
      components={{
        a: ({ href, children: c }) =>
          href && /^https?:/.test(href) ? <a href={href} target="_blank" rel="noreferrer">{c}</a> : <a href={href}>{c}</a>,
        table: ({ children: c }) => <div className="table-wrap"><table>{c}</table></div>,
        ...(inline ? { p: ({ children: c }) => <>{c}</> } : {}),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
