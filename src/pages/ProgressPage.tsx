import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { tracks } from '../content';
import { replaceState, streak, today, update, useAppState, type AppState } from '../lib/store';

export default function ProgressPage() {
  const state = useAppState();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(state, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ai-learning-hub-progress-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importProgress = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as AppState;
      if (!data || typeof data.ex !== 'object') throw new Error('shape');
      if (!confirm('Replace your current progress with this backup?')) return;
      replaceState({ ...data, v: 1, days: data.days || [] });
      setMessage('Backup imported.');
    } catch {
      setMessage('That file is not a progress backup from this site.');
    }
  };

  const reset = () => {
    if (confirm('Erase all progress for every exam? This cannot be undone.')) {
      update(s => { s.ex = {}; s.days = []; });
      setMessage('All progress erased.');
    }
  };

  const rows = tracks.flatMap(t => t.exams.map(e => ({ t, e, p: state.ex[`${t.id}/${e.id}`] })));

  return (
    <main className="page">
      <h1>My progress</h1>
      <p className="muted">{streak(state.days)} day study streak. Progress is saved in this browser only.</p>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Exam</th><th>Lessons done</th><th>Questions answered</th><th>Best mock</th></tr></thead>
            <tbody>
              {rows.map(({ t, e, p }) => (
                <tr key={e.id}>
                  <td><Link to={`/${t.id}/${e.id}`}>{e.code}</Link></td>
                  <td>{p ? Object.keys(p.lessons).length : 0}</td>
                  <td>{p ? Object.values(p.q).reduce((s, x) => s + x.n, 0) : 0}</td>
                  <td>{p?.mocks.length ? Math.max(...p.mocks.map(m => m.score)) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="flush">Back up or move to another device</h3>
        <p className="small muted">Export a backup file, then import it in the browser on your other device.</p>
        <div className="row">
          <button className="btn" onClick={exportProgress}>Export backup</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>Import backup</button>
          <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={e => e.target.files?.[0] && importProgress(e.target.files[0])} />
        </div>
        {message && <p className="small" role="status">{message}</p>}
      </div>

      <div className="card">
        <h3 className="flush">Reset</h3>
        <button className="btn danger" onClick={reset}>Erase all progress</button>
      </div>
    </main>
  );
}
