import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import logoSrc from '@/assets/logo.png';

// In production (GitHub Pages / custom domain), VITE_API_URL is set to the
// Replit API server URL (e.g. https://api.vidfluencer.io).
// In local dev it is empty, so fetch paths stay relative.
const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');
const TOKEN_KEY = 'admin_token';

interface Signup {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json() as { token: string };
        localStorage.setItem(TOKEN_KEY, data.token);
        onSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? 'Invalid credentials');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="border-b border-gray-100 px-6 py-4">
        <Link href="/">
          <img src={logoSrc} alt="Vidfluencer.io" className="h-10 w-auto object-contain cursor-pointer" />
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="absolute -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1.5">Sign in to view your waitlist</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-primary/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-sm hover:shadow mt-2"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN_KEY);
    fetch(`${API_BASE}/api/admin/signups`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json() as Promise<Signup[]>;
      })
      .then(data => setSignups(data))
      .catch(() => setError('Failed to load signups.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    onLogout();
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src={logoSrc} alt="Vidfluencer.io" className="h-10 w-auto object-contain shrink-0 cursor-pointer" />
            </Link>
            <span className="text-gray-300 text-lg font-light">/</span>
            <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-300"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Waitlist Signups</h1>
            <p className="text-gray-500 text-sm mt-1">Everyone who joined the Vidfluencer.io waitlist</p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && !error && (
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-semibold">{signups.length} {signups.length === 1 ? 'signup' : 'signups'}</span>
              </div>
            )}
            <button
              onClick={load}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-300 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-400 text-sm gap-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Loading signups…
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-6 py-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && signups.length === 0 && (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-gray-500 text-sm">No signups yet. Share the waitlist link to get started.</p>
          </div>
        )}

        {!loading && !error && signups.length > 0 && (
          <div className="rounded-2xl border border-gray-100 shadow-sm shadow-gray-100 overflow-hidden">
            <table className="w-full text-sm">
