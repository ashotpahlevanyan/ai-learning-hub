import { Link } from 'react-router-dom';
import { getExamSummary } from '../content';
import { library } from '../content/library';
import { habits, KINDS, project, roadmap, roadmapTasks, type Cloud, type FlatTask, type RoadmapWeek } from '../content/roadmap';
import { today, update, useAppState } from '../lib/store';
import { useMeta } from '../lib/useMeta';

const WEEK_MS = 7 * 24 * 3600 * 1000;
const WEEKS = roadmap.reduce((n, m) => n + m.weeks.length, 0);
const urlOf = (title: string) => library.find(i => i.title === title)?.url;
const fmtH = (h: number) => `${Math.round(h * 10) / 10} h`;
const fmtDay = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

/** Exam codes a month's tasks point to, e.g. ["AIF-C01"]. */
const examsIn = (tasks: FlatTask[]) => [...new Set(tasks.filter(t => t.kind === 'exam' && t.to).map(t => {
  const [, track, exam] = t.to!.path.split('/');
  return getExamSummary(track, exam)?.code ?? exam;
}))];

export default function RoadmapPage() {
  useMeta('Six-month roadmap', 'A week-by-week, six-month plan to become a production AI engineer: one project, four certifications and the skills that keep you valuable.');
  const { roadmap: rm } = useAppState();
  const cloud: Cloud = rm?.cloud ?? 'aws';
  const all = roadmapTasks(cloud);
  const done = (id: string) => !!rm?.tasks[id]?.ok;
  const change = (patch: (r: NonNullable<typeof rm>) => void) => update(s => { s.roadmap ??= { tasks: {} }; patch(s.roadmap); });
  const toggle = (id: string, ok: boolean) => change(r => { r.tasks[id] = { ok, at: Date.now() }; });

  const start = rm?.start ? new Date(rm.start + 'T00:00') : undefined;
  const weekStart = (w: number) => start && new Date(start.getTime() + (w - 1) * WEEK_MS);
  const firstOpen = all.find(t => !done(t.id))?.week ?? WEEKS;
  const current = start ? Math.min(WEEKS, Math.max(1, Math.floor((Date.now() - start.getTime()) / WEEK_MS) + 1)) : firstOpen;
  const notStarted = !!start && Date.now() < start.getTime();

  const doneTasks = all.filter(t => done(t.id));
  const totalHours = all.reduce((h, t) => h + t.hours, 0);
  const doneHours = doneTasks.reduce((h, t) => h + t.hours, 0);
  const skillShare = Math.round(100 * all.filter(t => t.kind === 'skill' || t.kind === 'build').reduce((h, t) => h + t.hours, 0) / totalHours);

  let weekNo = 0;
  const months = roadmap.map((m, i) => ({ ...m, n: i + 1, weeks: m.weeks.map(w => ({ ...w, n: ++weekNo })), tasks: all.filter(t => t.month === i + 1) }));
  const cur = months.flatMap(m => m.weeks.map(w => ({ m, w }))).find(x => x.w.n === current)!;

  const weekTasks = (n: number) => all.filter(t => t.week === n);
  const weekLabel = (n: number) => {
    const d = weekStart(n);
    return d ? `${fmtDay(d)} – ${fmtDay(new Date(d.getTime() + 6 * 24 * 3600 * 1000))}` : '';
  };

  // Plain render helpers rather than nested components, so ticking a box doesn't remount the list or close open weeks.
  const taskList = (n: number, where: string) => (
    <ul className="tasks">
      {weekTasks(n).map(t => (
        <li key={t.id} className={done(t.id) ? 'done' : ''}>
          <input type="checkbox" id={`${where}-${t.id}`} checked={done(t.id)} onChange={e => toggle(t.id, e.target.checked)} />
          <div>
            <label htmlFor={`${where}-${t.id}`}>
              <span className={`tag kind-${t.kind}`} title={KINDS[t.kind].hint}>{KINDS[t.kind].label}</span>{' '}
              {t.text} <span className="muted small nowrap">· {fmtH(t.hours)}</span>
            </label>
            {(t.to || t.lib) && (
              <div className="task-links small">
                {t.to && <Link to={t.to.path}>{t.to.label} →</Link>}
                {t.lib?.map(title => <a key={title} href={urlOf(title)} target="_blank" rel="noopener noreferrer">{title} ↗</a>)}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  const week = (w: RoadmapWeek & { n: number }, open: boolean) => {
    const ts = weekTasks(w.n), k = ts.filter(t => done(t.id)).length;
    return (
      <details key={w.n} className="card week" open={open} id={`week-${w.n}`}>
        <summary>
          <span className="spread">
            <strong>Week {w.n}: {w.title}</strong>
            <span className="muted small">{weekLabel(w.n) && `${weekLabel(w.n)} · `}{k}/{ts.length} done · {fmtH(ts.reduce((h, t) => h + t.hours, 0))}</span>
          </span>
        </summary>
        <p className="small"><strong>Goal:</strong> {w.goal}</p>
        {taskList(w.n, 'plan')}
        <p className="small done-when"><strong>Done when:</strong> {w.doneWhen}</p>
      </details>
    );
  };

  return (
    <main className="page roadmap">
      <section className="hero compact">
        <p className="eyebrow">Six-month roadmap</p>
        <h1 className="display">From LLM basics to production AI engineer</h1>
        <p className="lede">24 weeks at about {fmtH(totalHours / WEEKS)} a week. You build one project from start to finish, sit four certifications along the way and practise the skills that outlast any tool. Tick tasks as you go; progress is saved with the rest of your study.</p>
      </section>

      <div className="card controls">
        <div className="row">
          <label className="small">Start date{' '}
            <input type="date" value={rm?.start ?? ''} onChange={e => change(r => { if (e.target.value) r.start = e.target.value; else delete r.start; })} />
          </label>
          {!rm?.start && <button className="btn small" onClick={() => change(r => { r.start = today(); })}>Start this week</button>}
          <span className="small">Cloud route:</span>
          <div className="row segmented" role="group" aria-label="Cloud route">
            {(['aws', 'azure'] as const).map(c => (
              <button key={c} className={`btn small ${cloud === c ? 'primary' : ''}`} aria-pressed={cloud === c} onClick={() => change(r => { r.cloud = c; })}>{c === 'aws' ? 'AWS' : 'Azure'}</button>
            ))}
          </div>
        </div>
        <p className="muted small">Pick the cloud your employer or clients use. It changes the months 3 and 4 exams (AWS: AIF-C01 then AIP-C01; Azure: AI-901 then AI-103) and the cloud docs.</p>
        <div className="spread small"><span><strong>{doneTasks.length}</strong> of {all.length} tasks · {fmtH(doneHours)} of {fmtH(totalHours)}</span><span className="muted">{Math.round(100 * doneTasks.length / all.length)}%</span></div>
        <div className="bar good" aria-hidden="true"><span style={{ width: `${100 * doneTasks.length / all.length}%` }} /></div>
      </div>

      <section className="card hero-card this-week" aria-labelledby="this-week">
        <p className="eyebrow">{notStarted ? `Starts ${fmtDay(start!)}` : start ? 'This week' : 'Up next'} · Month {cur.m.n}: {cur.m.title}</p>
        <h2 id="this-week" className="flush">Week {cur.w.n}: {cur.w.title}</h2>
        {weekLabel(cur.w.n) && <p className="muted small">{weekLabel(cur.w.n)}</p>}
        <p><strong>Goal:</strong> {cur.w.goal}</p>
        {taskList(cur.w.n, 'now')}
        <p className="small done-when"><strong>Done when:</strong> {cur.w.doneWhen}</p>
      </section>

      <h2>How the plan works</h2>
      <div className="grid">
        <div className="card">
          <h3 className="flush">Skills first, tools second</h3>
          <p className="small">About {skillShare}% of the time goes to building and skill practice, the rest to docs and exams. Every task has a type:</p>
          <ul className="legend small">
            {Object.entries(KINDS).map(([k, v]) => <li key={k}><span className={`tag kind-${k}`}>{v.label}</span> {v.hint}</li>)}
          </ul>
        </div>
        <div className="card">
          <h3 className="flush">One project: {project.name}</h3>
          <p className="small">{project.summary}</p>
          <p className="small muted">{project.why}</p>
        </div>
        <div className="card">
          <h3 className="flush">Each week</h3>
          <p className="small">A goal, three or four tasks with time estimates and a <em>done when</em> check. Finish the check before moving on; if a week slips, move the whole plan, not just the exam.</p>
          <ul className="legend small">
            {habits.map(h => <li key={h.title}><strong>{h.title}.</strong> {h.text}</li>)}
          </ul>
        </div>
      </div>

      <h2>The six months at a glance</h2>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Month</th><th>Focus</th><th>Exam</th><th>By the end</th><th>Done</th></tr></thead>
            <tbody>
              {months.map(m => {
                const k = m.tasks.filter(t => done(t.id)).length;
                return (
                  <tr key={m.n}>
                    <td className="nowrap"><a href={`#month-${m.n}`}>Month {m.n}</a>{start && <div className="muted small">{fmtDay(weekStart(m.weeks[0].n)!)}</div>}</td>
                    <td><strong>{m.title}</strong><div className="muted small">{m.skills.join(' · ')}</div></td>
                    <td className="nowrap">{examsIn(m.tasks).join(', ') || <span className="muted">Optional</span>}</td>
                    <td className="small">{m.milestone}</td>
                    <td className="bar-cell"><div className="bar good"><span style={{ width: `${100 * k / m.tasks.length}%` }} /></div><span className="muted small">{k}/{m.tasks.length}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {months.map(m => (
        <section key={m.n} id={`month-${m.n}`} className="month">
          <h2>Month {m.n}: {m.title}</h2>
          <div className="card">
            <p><strong>Outcome:</strong> {m.outcome}</p>
            <div className="month-facts small">
              <div><span className="muted">Skills</span><div className="chips">{m.skills.map(s => <span key={s} className="tag kind-skill">{s}</span>)}</div></div>
              <div><span className="muted">Technology</span><div className="chips">{m.tech.map(s => <span key={s} className="tag">{s}</span>)}</div></div>
              {examsIn(m.tasks).length > 0 && <div><span className="muted">Exam</span><div className="chips">{examsIn(m.tasks).map(s => <span key={s} className="tag kind-exam">{s}</span>)}</div></div>}
            </div>
            <p className="small"><strong>Project milestone:</strong> {m.milestone}</p>
          </div>
          {m.weeks.map(w => week(w, w.n === current))}
        </section>
      ))}

      <p className="muted small">Every linked course and document is also in the <Link to="/library">Library</Link>. Exam details change: check each provider’s page before booking.</p>
    </main>
  );
}
