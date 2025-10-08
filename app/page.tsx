'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    // Track page visit
    fetch('/api/track-visit', { method: 'POST' });
    
    // Get waitlist count
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setWaitlistCount(data.emailCount))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 You\'re on the list! We\'ll be in touch soon.');
        setEmail('');
        if (waitlistCount !== null) {
          setWaitlistCount(waitlistCount + 1);
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src="/Quro Logo.png"
              alt="Quro Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Know before you go
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Real-time wait times for barbershops. 
            <br />
            Never wait in line again.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                disabled={status === 'loading'}
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                status === 'success'
                  ? 'bg-green-900/30 border border-green-700 text-green-300'
                  : 'bg-red-900/30 border border-red-700 text-red-300'
              }`}
            >
              {message}
            </div>
          )}

          {/* Waitlist Count */}
          {waitlistCount !== null && (
            <div className="mt-6 text-center text-gray-400">
              <p className="text-sm">
                <span className="font-semibold text-white">{waitlistCount}</span> people already signed up
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-400">See live wait times at your favorite barbershops</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Find Nearby</h3>
            <p className="text-gray-400">Discover barbershops near you with the shortest waits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-400">Plan your visit when it's convenient for you</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2025 Quro. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

