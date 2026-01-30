'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data - replace with real data from API
const ACTIVITIES = [
  { id: '1', name: 'Reading a book', emoji: '📚', tokens: 20 },
  { id: '2', name: 'Playing outside', emoji: '⚽', tokens: 15 },
  { id: '3', name: 'Drawing or art', emoji: '🎨', tokens: 15 },
  { id: '4', name: 'Helping with chores', emoji: '🧹', tokens: 10 },
  { id: '5', name: 'Learning something new', emoji: '🧠', tokens: 25 },
  { id: '6', name: 'Playing with pets', emoji: '🐶', tokens: 10 },
];

const REWARDS = [
  { id: '1', name: '15 min bonus screen time', emoji: '🎮', cost: 10 },
  { id: '2', name: '30 min bonus screen time', emoji: '📱', cost: 20 },
  { id: '3', name: 'Choose family movie', emoji: '🎬', cost: 50 },
  { id: '4', name: 'Stay up 30 min late', emoji: '🌙', cost: 40 },
  { id: '5', name: 'Special treat', emoji: '🍦', cost: 30 },
];

export default function KidsPage() {
  const [tokenBalance, setTokenBalance] = useState(45);
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activitiesLogged, setActivitiesLogged] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  // Track demo page view
  useEffect(() => {
    // Log to console for now - replace with actual analytics
    console.log('Demo page viewed');
    
    // Example: Google Analytics or Mixpanel
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', 'page_view', { page_path: '/kids' });
    // }
  }, []);

  const handleLogActivity = () => {
    const activity = ACTIVITIES.find(a => a.id === selectedActivity);
    if (activity && timeSpent) {
      const tokensEarned = activity.tokens;
      setTokenBalance(prev => prev + tokensEarned);
      setShowSuccess(true);
      setShowLogActivity(false);
      setSelectedActivity('');
      setTimeSpent('');
      setNote('');
      
      const newCount = activitiesLogged + 1;
      setActivitiesLogged(newCount);
      
      // Track activity logged in demo
      console.log('Demo activity logged:', activity.name, newCount);
      
      // Show signup prompt after 2 activities
      if (newCount >= 2) {
        setTimeout(() => {
          setShowSignupPrompt(true);
          console.log('Signup prompt shown');
        }, 2000);
      }
      
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleRedeemReward = (reward: typeof REWARDS[0]) => {
    if (tokenBalance >= reward.cost) {
      setTokenBalance(prev => prev - reward.cost);
      console.log('Demo reward redeemed:', reward.name);
      alert(`🎉 You got: ${reward.name}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300">
      {/* Demo Banner */}
      <div className="bg-yellow-400 text-center py-2 px-4">
        <p className="text-sm font-semibold text-gray-900">
          🎮 DEMO MODE - Try it out! 
          <Link href="/landing#waitlist" className="underline ml-2 hover:text-gray-700">
            Sign up for real version
          </Link>
        </p>
      </div>

      {/* Logo Header */}
      <div className="bg-white/90 backdrop-blur py-3">
        <div className="container mx-auto px-6 flex items-center justify-center gap-3">
          <img src="/logo.png" alt="ScreenTime Swap" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-gray-900">ScreenTime Swap</h1>
        </div>
      </div>

      {/* Signup Prompt Modal */}
      {showSignupPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl animate-fadeIn">
            <h3 className="text-3xl font-bold text-purple-600 mb-4">
              🎉 You're doing great!
            </h3>
            <p className="text-xl mb-6 text-gray-700">
              Ready to track your real activities and earn rewards with your family?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/landing#waitlist"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Join Waitlist for Early Access
              </Link>
              <button
                onClick={() => setShowSignupPrompt(false)}
                className="text-gray-600 py-2 hover:text-gray-800"
              >
                Keep exploring demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/90 backdrop-blur shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-purple-600">
              🌟 My Adventures
            </h1>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
              🪙 {tokenBalance} Tokens
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl text-xl font-bold z-50 animate-bounce">
          🎉 Tokens Earned!
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => {
              setShowLogActivity(true);
              setShowRewards(false);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition transform"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-3xl font-bold mb-2">Log Activity</h2>
            <p className="text-lg">Earn tokens for what you did!</p>
          </button>

          <button
            onClick={() => {
              setShowRewards(true);
              setShowLogActivity(false);
            }}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition transform"
          >
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-3xl font-bold mb-2">Get Rewards</h2>
            <p className="text-lg">Spend your tokens!</p>
          </button>
        </div>

        {/* Log Activity Section */}
        {showLogActivity && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">
              What did you do? 🌟
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {ACTIVITIES.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => setSelectedActivity(activity.id)}
                  className={`p-6 rounded-2xl border-4 transition transform hover:scale-105 ${
                    selectedActivity === activity.id
                      ? 'border-purple-600 bg-purple-100 scale-105'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-5xl mb-2">{activity.emoji}</div>
                  <p className="font-semibold text-sm">{activity.name}</p>
                  <p className="text-purple-600 font-bold">+{activity.tokens} 🪙</p>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  How many minutes? ⏱️
                </label>
                <input
                  type="number"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  placeholder="30"
                  className="w-full px-6 py-4 rounded-xl border-4 border-gray-200 text-2xl font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Want to add a note? (optional) 📝
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="It was so fun!"
                  maxLength={100}
                  className="w-full px-6 py-4 rounded-xl border-4 border-gray-200 text-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleLogActivity}
                disabled={!selectedActivity || !timeSpent}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 rounded-xl text-2xl font-bold shadow-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✨ Get My Tokens! ✨
              </button>
            </div>
          </div>
        )}

        {/* Rewards Section */}
        {showRewards && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Pick Your Reward! 🎁
            </h2>
            
            <div className="space-y-4">
              {REWARDS.map((reward) => {
                const canAfford = tokenBalance >= reward.cost;
                return (
                  <div
                    key={reward.id}
                    className={`flex items-center justify-between p-6 rounded-2xl border-4 ${
                      canAfford
                        ? 'border-pink-400 bg-pink-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{reward.emoji}</div>
                      <div>
                        <p className="text-xl font-bold">{reward.name}</p>
                        <p className="text-lg text-gray-600">{reward.cost} tokens</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!canAfford}
                      className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition ${
                        canAfford
                          ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Get It!' : 'Need More'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Activities */}
        {!showLogActivity && !showRewards && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">
              My Recent Adventures 🚀
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">📚</span>
                  <div>
                    <p className="font-bold">Reading a book</p>
                    <p className="text-sm text-gray-600">30 minutes</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">+20 🪙</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">⚽</span>
                  <div>
                    <p className="font-bold">Playing outside</p>
                    <p className="text-sm text-gray-600">45 minutes</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">+15 🪙</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🎨</span>
                  <div>
                    <p className="font-bold">Drawing</p>
                    <p className="text-sm text-gray-600">20 minutes</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">+15 🪙</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
