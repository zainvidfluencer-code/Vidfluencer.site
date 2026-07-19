import { createRoot } from 'react-dom/client';
import { setBaseUrl } from '@workspace/api-client-react';

import App from './App';

import './index.css';

// Point the generated API client at the deployed API server when running
// on GitHub Pages / a custom domain. VITE_API_URL is set at build time
// via the GitHub Actions secret. Falls back to '' (same-origin) in dev.
const apiUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');
if (apiUrl) {
  setBaseUrl(apiUrl);
}

createRoot(document.getElementById('root')!).render(<App />);
