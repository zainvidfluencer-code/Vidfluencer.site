import { useState, useEffect } from 'react';
import logoSrc from '@/assets/logo.png';

interface Signup {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Login Form ────────────────────────────────────────────────────────────────
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
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
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
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <img src={logoSrc} alt="Vidfluencer.io" className="h-12 w-auto brightness-0 invert" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-white text-xl font-semibold mb-1">Admin Login</h1>
          <p className="text-white/50 text-sm mb-6">Vidfluencer.io waitlist dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
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

  useEffect(() => {
    fetch('/api/admin/signups', { credentials: 'include' })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json() as Promise<Signup[]>;
      })
      .then(data => setSignups(data))
      .catch(() => setError('Failed to load signups.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Vidfluencer.io" className="h-8 w-auto brightness-0 invert" />
          <span className="text-white/40 text-sm">/ Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-white/50 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold">Waitlist Signups</h2>
          {!loading && !error && (
            <span className="text-white/40 text-sm">{signups.length} {signups.length === 1 ? 'signup' : 'signups'}</span>
          )}
        </div>

        {loading && (
          <div className="text-white/40 text-sm py-12 text-center">Loading…</div>
        )}
        {error && (
          <div className="text-red-400 text-sm py-12 text-center">{error}</div>
        )}
        {!loading && !error && signups.length === 0 && (
          <div className="text-white/40 text-sm py-12 text-center">No signups yet.</div>
        )}
        {!loading && !error && signups.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-5 py-3 text-white/50 font-medium w-12">#</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Full Name</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Email</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((s, i) => (
                  <tr key={s.id} className={i % 2 === 0 ? '' : 'bg-white/[0.02]'}>
                    <td className="px-5 py-3.5 text-white/30">{s.id}</td>
                    <td className="px-5 py-3.5 font-medium">{s.fullName}</td>
                    <td className="px-5 py-3.5 text-blue-400">{s.email}</td>
                    <td className="px-5 py-3.5 text-white/50">{formatDate(s.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Admin Page (auth gate) ────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking

  // Check existing session on mount
  useEffect(() => {
    fetch('/api/admin/signups', { credentials: 'include' })
      .then(res => setAuthed(res.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white/30 text-sm">Checking session…</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginPage onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}
