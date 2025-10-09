'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/track-visit', { method: 'POST' });
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setWaitlistCount(data.emailCount))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('✓ You\'re on the list!');
        setEmail('');
        if (waitlistCount !== null) setWaitlistCount(waitlistCount + 1);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        
        {/* Logo - Centered at top */}
        <div className="flex justify-center mb-8">
          <img 
            src="/Quro Logo Transparent.png" 
            alt="Quro" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* Hero Section - Simple and Direct */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real-time wait times for barbershops
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Know before you go. Never wait in line again.
          </p>
        </div>

        {/* Email Form - Clean and Focused */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-white text-black rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50 text-lg"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <p className={`mt-4 text-center text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}

          {/* Waitlist Counter */}
          {waitlistCount !== null && waitlistCount > 0 && (
            <p className="mt-4 text-center text-gray-500 text-sm">
              {waitlistCount} {waitlistCount === 1 ? 'person has' : 'people have'} joined
            </p>
          )}
        </div>

        {/* Animated GIF - Subtle */}
        <div className="flex justify-center mb-12">
          <img 
            src="/Quro GIF.gif" 
            alt="Quro"
            className="w-48 h-48 md:w-56 md:h-56 object-contain opacity-90"
          />
        </div>

        {/* Contact - Minimal Footer */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Questions?{' '}
            <a 
              href="mailto:business.quro@gmail.com"
              className="text-gray-400 hover:text-white transition underline"
            >
              business.quro@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}