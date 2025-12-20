import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Analysts = lazy(() => import('./pages/Analysts'));
const Associates = lazy(() => import('./pages/Associates'));
const BevsAndDevs = lazy(() => import('./pages/BevsAndDevs'));
const Events = lazy(() => import('./pages/Events'));
const Members = lazy(() => import('./pages/Members'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Join = lazy(() => import('./pages/Join'));

// Minimal loading fallback
function PageLoader() {
  return (
    <div style={{
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysts" element={<Analysts />} />
              <Route path="/associates" element={<Associates />} />
              <Route path="/bevsanddevs" element={<BevsAndDevs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/members" element={<Members />} />
              <Route path="/partnerships" element={<Partnerships />} />
              <Route path="/join" element={<Join />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
