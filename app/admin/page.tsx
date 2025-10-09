'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface EmailEntry {
  id: number;
  email: string;
  created_at: string;
}

interface Stats {
  emails: EmailEntry[];
  emailCount: number;
  visitCount: number;
  signupsByDay: { date: string; count: number }[];
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/stats', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setIsAuthenticated(true);
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to refresh stats');
    }
  }, [isAuthenticated, password]);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshStats, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshStats]);

  const exportEmails = () => {
    if (!stats) return;

    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Email,Signed Up At\n' +
      stats.emails.map(e => `${e.email},${new Date(e.created_at).toLocaleString()}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quro-waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <Image
                src="/Quro Logo.png"
                alt="Quro Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  const conversionRate = stats.visitCount > 0 
    ? ((stats.emailCount / stats.visitCount) * 100).toFixed(2) 
    : '0.00';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/Quro Logo.png"
                alt="Quro Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
              setStats(null);
            }}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Signups</div>
            <div className="text-4xl font-bold">{stats.emailCount}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Visitors</div>
            <div className="text-4xl font-bold">{stats.visitCount}</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Conversion Rate</div>
            <div className="text-4xl font-bold">{conversionRate}%</div>
          </div>
        </div>

        {/* Recent Signups Chart */}
        {stats.signupsByDay.length > 0 && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Signups (Last 30 Days)</h2>
            <div className="space-y-2">
              {stats.signupsByDay.map((day: any) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-32 text-gray-400 text-sm">
                    {new Date(day.date).toLocaleDateString()}
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-8 relative">
                    <div
                      className="bg-white rounded-full h-full flex items-center justify-end pr-3"
                      style={{
                        width: `${Math.min(100, (day.count / Math.max(...stats.signupsByDay.map((d: any) => d.count))) * 100)}%`,
                      }}
                    >
                      <span className="text-black text-sm font-semibold">{day.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email List */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Email List</h2>
            <button
              onClick={exportEmails}
              className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">#</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {stats.emails.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                    <td className="py-3 px-4 font-mono">{entry.email}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {stats.emails.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No signups yet
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

