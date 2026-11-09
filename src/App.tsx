import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import SiteNav from './components/SiteNav';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Everything except the landing page loads on demand, so the first visit stays small.
const TrackPage = lazy(() => import('./pages/TrackPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ExamLayout = lazy(() => import('./exam/ExamLayout'));
const ExamDashboard = lazy(() => import('./exam/ExamDashboard'));
const ExamGuide = lazy(() => import('./exam/ExamGuide'));
const LearnPage = lazy(() => import('./exam/LearnPage'));
const LessonPage = lazy(() => import('./exam/LessonPage'));
const CardsPage = lazy(() => import('./exam/CardsPage'));
const PracticePage = lazy(() => import('./exam/PracticePage'));
const MockPage = lazy(() => import('./exam/MockPage'));
const ReviewPage = lazy(() => import('./exam/ReviewPage'));
const MistakesPage = lazy(() => import('./exam/MistakesPage'));
const TrapsPage = lazy(() => import('./exam/TrapsPage'));
const PlanPage = lazy(() => import('./exam/PlanPage'));

const Loading = () => <main className="page empty muted">Loading…</main>;

export default function App() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteNav />
      <div id="main" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
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
          </Suspense>
        </ErrorBoundary>
      </div>
      <footer className="footer">
        <p>Independent study resource, not affiliated with or endorsed by Anthropic or any AI provider. Practice items are original, not real exam questions. Confirm exam details with the official provider.</p>
        <p><Link to="/about">About and privacy</Link> · Progress is stored in your browser. Export it from <Link to="/progress">My progress</Link>.</p>
      </footer>
    </>
  );
}
