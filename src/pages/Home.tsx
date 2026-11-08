import { Link } from 'react-router-dom';
import { tracks } from '../content';
import { useMeta } from '../lib/useMeta';
import TodayPanel from '../components/TodayPanel';

const METHOD = [
  { title: 'Learn', text: 'Short lessons per exam domain, each with key points, exam traps and a hands-on lab.' },
  { title: 'Recall', text: 'Spaced-repetition flashcards schedule each review just before you would forget it.' },
  { title: 'Apply', text: 'Scenario questions with a rationale for every option, weak areas served first.' },
  { title: 'Test', text: 'Full timed mock exams weighted like the real blueprint, with question-by-question review.' },
];

export default function Home() {
  useMeta();
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Free, structured AI certification prep</p>
        <h1 className="display">Learn the AI platforms you build on, then prove it.</h1>
        <p className="lede">
          AI Learning Hub turns official documentation and exam blueprints into study paths you can finish: lessons,
          flashcards, practice questions and timed mocks for Anthropic Claude, Google, OpenAI, AWS, Microsoft Azure, NVIDIA and Databricks, plus deep foundations in the math and Python behind AI.
        </p>
        <div className="row">
          <Link className="btn primary" to="/claude">Start the Claude track</Link>
          <a className="btn" href="#tracks">Browse all tracks</a>
          <Link className="btn" to="/library">Reading library</Link>
        </div>
      </section>

      <TodayPanel title="Continue where you left off" />

      <section id="tracks">
        <h2>Tracks</h2>
        <div className="grid tracks">
          {tracks.map(t => (
            <Link key={t.id} to={`/${t.id}`} className="card track-card">
              <div className="muted small">{t.provider}</div>
              <h3>{t.name}</h3>
              <p>{t.tagline}</p>
              <div className="chips">
                {t.exams.map(e => <span key={e.id} className="tag">{e.code}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>How every track works</h2>
        <ol className="method">
          {METHOD.map(m => (
            <li key={m.title}><strong>{m.title}</strong><span>{m.text}</span></li>
          ))}
        </ol>
      </section>
    </main>
  );
}
