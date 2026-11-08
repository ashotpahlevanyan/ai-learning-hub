import type { LibraryItem } from '../content/library';

const free = (i: LibraryItem) => i.kind !== 'Book';

/** One reading-list entry per item: title link, author, kind, why it's worth reading and what to read first. */
export default function LibraryList({ items }: { items: LibraryItem[] }) {
  return (
    <ul className="resources library">
      {items.map(i => (
        <li key={i.url}>
          <div className="spread">
            <a href={i.url} target="_blank" rel="noopener noreferrer"><strong>{i.title}</strong></a>
            <span className="chips">
              {i.start && <span className="tag good">Start here</span>}
              <span className="tag">{i.kind}</span>
              {free(i) && i.kind !== 'Free book' && <span className="tag">Free</span>}
            </span>
          </div>
          <span className="muted small">{i.by}</span>
          <span className="small">{i.why}</span>
          {i.read && <span className="small"><strong>Read first:</strong> {i.read}</span>}
        </li>
      ))}
    </ul>
  );
}

export { free };
