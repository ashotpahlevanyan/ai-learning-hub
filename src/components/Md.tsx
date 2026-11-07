import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

/** Renders lesson, question and guide Markdown. External links open in a new tab. */
export default function Md({ children, inline = false }: { children: string; inline?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
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
