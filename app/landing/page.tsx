'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Screen Time into 
            <span className="text-indigo-600"> Family Time</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Stop the screen time battles. Let your kids earn bonus privileges through real-world activities they choose.
          </p>
          <div className="flex flex-col gap-3 items-center mb-4">
            <Link 
              href="#waitlist"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition w-full sm:w-auto"
            >
              Join Waitlist
            </Link>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link 
                href="/parent-demo"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition text-center"
              >
                👨‍👩‍👧 Parent Demo
              </Link>
              <Link 
                href="/kids"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition text-center"
              >
                🌟 Kids Demo
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-12">
            ⬆️ Try both demos - no signup required!
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Constant screen time battles
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Kids feel controlled and restricted
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    No motivation for offline activities
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Parental control apps feel punitive
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Solution</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Kids earn tokens for activities they choose
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Trade tokens for bonus screen time
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Builds self-regulation and responsibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Positive reinforcement, not punishment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Do Activities</h3>
              <p className="text-gray-600">Kids choose from parent-approved activities: reading, outdoor play, chores, creative projects, and more.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪙</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Earn Tokens</h3>
              <p className="text-gray-600">Log activities in the app and instantly earn tokens. Build responsibility through self-tracking.</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Swap for Rewards</h3>
              <p className="text-gray-600">Trade tokens for bonus screen time, special privileges, or custom family rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">🎯 Parent Control Dashboard</h3>
              <p className="text-gray-700">Set activities, assign token values, and monitor your child's progress—all from one simple dashboard.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">📱 Kid-Friendly Mobile App</h3>
              <p className="text-gray-700">Beautiful, easy-to-use interface designed for kids ages 8-12. Track activities and redeem rewards instantly.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">🏆 Custom Rewards</h3>
              <p className="text-gray-700">Beyond screen time—create rewards that match your family values like staying up late or picking the family movie.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">📊 Activity Insights</h3>
              <p className="text-gray-700">See what activities your kids love and watch them build healthy offline habits over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Join the Early Access Waitlist</h2>
            <p className="text-xl mb-8">Be among the first families to try ScreenTime Swap. Get exclusive early access and special launch pricing.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
                disabled={status === 'loading'}
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
            
            {status === 'success' && (
              <p className="mt-4 text-green-200 font-semibold">✓ {message}</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-200 font-semibold">✗ {message}</p>
            )}
            
            <p className="text-sm mt-4 text-indigo-100">No spam. Unsubscribe anytime. Expected launch: Spring 2026</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">© 2026 ScreenTime Swap. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
