import { useState } from 'react';
import { deleteCloudCopy, providers, sendMagicLink, signInWith, signOut, syncNow, useSyncStatus } from '../lib/sync';

const NAMES: Record<string, string> = { github: 'GitHub', google: 'Google' };

/** Sign in to sync progress across devices. Rendered only when sync is configured. */
export default function SyncPanel() {
  const s = useSyncStatus();
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const run = (f: () => Promise<unknown>, ok?: string) => f().then(() => ok && setNote(ok)).catch(e => setNote((e as Error).message || 'Something went wrong.'));

  if (s.phase === 'signed-out' || s.phase === 'off') {
    return (
      <section className="card">
        <h3 className="flush">Sync across devices</h3>
        <p className="small muted">Sign in to keep your progress on every device. Without an account, progress stays in this browser only.</p>
        <div className="row">
          {providers.filter(p => NAMES[p]).map(p => (
            <button key={p} className="btn" onClick={() => run(() => signInWith(p as 'github' | 'google'))}>Continue with {NAMES[p]}</button>
          ))}
        </div>
        {providers.includes('email') && (
          <form className="row" onSubmit={e => { e.preventDefault(); if (email) run(() => sendMagicLink(email), `Check ${email} for a sign-in link.`); }}>
            <label className="sr-only" htmlFor="sync-email">Email</label>
            <input id="sync-email" type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="btn" type="submit">Email me a sign-in link</button>
          </form>
        )}
        {note && <p className="small" role="status">{note}</p>}
      </section>
    );
  }

  const when = s.lastSync ? new Date(s.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  return (
    <section className="card">
      <h3 className="flush">Sync across devices</h3>
      <p className="small">Signed in as <strong>{s.email}</strong>.{' '}
        <span className="muted" role="status">
          {s.phase === 'syncing' ? 'Syncing…' : s.phase === 'error' ? s.error : when ? `Synced at ${when}.` : ''}
        </span>
      </p>
      <p className="small muted">Progress merges automatically: each question and card keeps its latest result from any device.</p>
      <div className="row">
        <button className="btn" onClick={() => run(syncNow)}>Sync now</button>
        <button className="btn" onClick={() => run(signOut)}>Sign out</button>
        {confirmDelete
          ? <><span className="small">Delete your synced copy from the server? Progress in this browser stays.</span>
            <button className="btn" onClick={() => run(deleteCloudCopy, 'Synced copy deleted and signed out.')}>Delete</button>
            <button className="btn" onClick={() => setConfirmDelete(false)}>Cancel</button></>
          : <button className="btn" onClick={() => setConfirmDelete(true)}>Delete synced copy</button>}
      </div>
      {note && <p className="small" role="status">{note}</p>}
    </section>
  );
}
