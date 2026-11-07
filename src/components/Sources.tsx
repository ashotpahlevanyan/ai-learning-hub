import type { Source } from '../lib/types';

/** Links to the official documentation behind a lesson or answer. Renders nothing when there are none. */
export default function Sources({ list, heading = 'Read more' }: { list?: Source[]; heading?: string }) {
  if (!list?.length) return null;
  return (
    <div className="sources">
      <div className="sources-h">{heading}</div>
      <ul>
        {list.map(s => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
            <span className="muted"> · {new URL(s.url).hostname.replace(/^www\./, '')} ↗</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
