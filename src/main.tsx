import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Fonts are self-hosted (SIL Open Font License); no request goes to a third-party font service.
// Each @font-face only downloads when text uses it, so the serif and hyperlegible faces cost nothing until chosen.
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/400-italic.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-serif/400.css';
import '@fontsource/ibm-plex-serif/400-italic.css';
import '@fontsource/ibm-plex-serif/600.css';
import '@fontsource/atkinson-hyperlegible-next/400.css';
import '@fontsource/atkinson-hyperlegible-next/400-italic.css';
import '@fontsource/atkinson-hyperlegible-next/600.css';
import './styles.css';
import { startSync } from './lib/sync';
import { enableDatabaseContent } from './content/live';

// Read exams from the content database when the build enables it (falls back to the bundled copy).
enableDatabaseContent();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Cloud sync is optional and loads only for signed-in users.
void startSync();

// Offline support in production builds only; the dev server must never be cached.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {}); });
}
