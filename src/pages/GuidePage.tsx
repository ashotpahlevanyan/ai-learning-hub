import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getTrack } from '../content';
import Md from '../components/Md';
import NotFound from './NotFound';

export default function GuidePage() {
  const { trackId } = useParams();
  const { hash } = useLocation();
  const track = getTrack(trackId);
  const [text, setText] = useState<string | null>(null);

  useEffect(() => { track?.loadGuide().then(setText); }, [track]);
  // After the Markdown renders, honour a #section link.
  useEffect(() => {
    if (text && hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [text, hash]);

  if (!track) return <NotFound />;
  return (
    <main className="page">
      <Link to={`/${track.id}`} className="small">← {track.name} track</Link>
      <article className="prose">{text === null ? <p className="muted">Loading the runbook…</p> : <Md>{text}</Md>}</article>
    </main>
  );
}
