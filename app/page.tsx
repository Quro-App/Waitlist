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
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Main Headline with Glow Effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 tracking-tight text-white" 
            style={{ 
              textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)'
            }}>
          Curious to know more?
        </h1>

        {/* Waitlist Section */}
        <div className="max-w-2xl mx-auto mb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Join the Waitlist
          </h2>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {status === 'loading' ? 'Joining...' : 'Join'}
              </button>
            </div>
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
        </div>

        {/* Contact Section */}
        <div className="mb-32">
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Contact us at
          </p>
          <div className="inline-block px-12 py-5 bg-black border-2 border-gray-700 rounded-full">
            <a 
              href="mailto:business.quro@gmail.com"
              className="text-xl md:text-2xl text-white font-medium hover:text-gray-300 transition-colors"
            >
              business.quro@gmail.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32">
          <p className="text-xs text-gray-600">
            For questions, email us at business.quro@gmail.com
          </p>
        </footer>
      </div>
    </main>
  );
}

