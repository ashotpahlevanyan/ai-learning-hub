import { useEffect } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { update, useAppState } from './lib/store';
import Home from './pages/Home';
import TrackPage from './pages/TrackPage';
import GuidePage from './pages/GuidePage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import ExamLayout from './exam/ExamLayout';
import ExamDashboard from './exam/ExamDashboard';
import ExamGuide from './exam/ExamGuide';
import LearnPage from './exam/LearnPage';
import LessonPage from './exam/LessonPage';
import CardsPage from './exam/CardsPage';
import PracticePage from './exam/PracticePage';
import MockPage from './exam/MockPage';
import ReviewPage from './exam/ReviewPage';
import MistakesPage from './exam/MistakesPage';
import TrapsPage from './exam/TrapsPage';
import PlanPage from './exam/PlanPage';

function ThemeToggle() {
  const { theme } = useAppState();
  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);
  const toggle = () => {
    const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    update(s => { s.theme = dark ? 'light' : 'dark'; });
  };
  return <button className="btn small" onClick={toggle} aria-label="Toggle light or dark theme">◐</button>;
}

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand"><span className="logo" aria-hidden="true">A</span> AI Learning Hub</Link>
        <nav className="topnav">
          <NavLink to="/claude">Claude</NavLink>
          <NavLink to="/progress">My progress</NavLink>
          <ThemeToggle />
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/:trackId" element={<TrackPage />} />
        <Route path="/:trackId/guide" element={<GuidePage />} />
        <Route path="/:trackId/:examId" element={<ExamLayout />}>
          <Route index element={<ExamDashboard />} />
          <Route path="guide" element={<ExamGuide />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:lessonId" element={<LessonPage />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="mock" element={<MockPage />} />
          <Route path="review/:index" element={<ReviewPage />} />
          <Route path="mistakes" element={<MistakesPage />} />
          <Route path="traps" element={<TrapsPage />} />
          <Route path="plan" element={<PlanPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <p>Independent study resource, not affiliated with or endorsed by Anthropic or any AI provider. Practice items are original, not real exam questions. Confirm exam details with the official provider.</p>
        <p>Progress is stored in your browser. Export it from <Link to="/progress">My progress</Link>.</p>
      </footer>
    </>
  );
}
