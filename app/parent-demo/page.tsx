'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - replace with real data from API
const CHILD_DATA = {
  name: 'Emma',
  avatar: '🦄',
  tokenBalance: 45,
  weeklyActivities: 12,
  lifetimeTokens: 230,
};

const ACTIVITY_LOG = [
  { id: '1', activity: 'Reading a book', emoji: '📚', minutes: 30, tokens: 20, date: 'Today, 2:30 PM' },
  { id: '2', activity: 'Playing outside', emoji: '⚽', minutes: 45, tokens: 15, date: 'Today, 10:00 AM' },
  { id: '3', activity: 'Drawing', emoji: '🎨', minutes: 20, tokens: 15, date: 'Yesterday, 4:00 PM' },
  { id: '4', activity: 'Helping with chores', emoji: '🧹', minutes: 15, tokens: 10, date: 'Yesterday, 11:00 AM' },
];

const ACTIVITY_TEMPLATES = [
  { id: '1', name: 'Reading a book', emoji: '📚', tokens: 20, isActive: true, isCustom: false },
  { id: '2', name: 'Playing outside', emoji: '⚽', tokens: 15, isActive: true, isCustom: false },
  { id: '3', name: 'Drawing or art', emoji: '🎨', tokens: 15, isActive: true, isCustom: false },
  { id: '4', name: 'Helping with chores', emoji: '🧹', tokens: 10, isActive: true, isCustom: false },
  { id: '5', name: 'Learning something new', emoji: '🧠', tokens: 25, isActive: true, isCustom: false },
  { id: '6', name: 'Playing with pets', emoji: '🐶', tokens: 10, isActive: false, isCustom: false },
];

const PENDING_REDEMPTIONS = [
  { id: '1', reward: '30 min bonus screen time', emoji: '📱', cost: 20, requestedAt: '10 minutes ago' },
  { id: '2', reward: 'Stay up 30 min late', emoji: '🌙', cost: 40, requestedAt: '1 hour ago' },
];

const REWARD_TEMPLATES = [
  { id: '1', name: '15 min bonus screen time', emoji: '🎮', cost: 10, isActive: true },
  { id: '2', name: '30 min bonus screen time', emoji: '📱', cost: 20, isActive: true },
  { id: '3', name: 'Choose family movie', emoji: '🎬', cost: 50, isActive: true },
  { id: '4', name: 'Stay up 30 min late', emoji: '🌙', cost: 40, isActive: true },
  { id: '5', name: 'Special treat', emoji: '🍦', cost: 30, isActive: true },
];

export default function ParentDashboardDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'rewards' | 'approvals'>('overview');
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddReward, setShowAddReward] = useState(false);

  const handleApproveRedemption = (id: string, approved: boolean) => {
    alert(approved ? '✅ Reward approved!' : '❌ Reward denied');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Demo Banner */}
      <div className="bg-blue-600 text-white text-center py-2 px-4">
        <p className="text-sm font-semibold">
          👨‍👩‍👧 PARENT DEMO - See what you'll manage
          <Link href="/landing#waitlist" className="underline ml-2 hover:text-blue-100">
            Sign up to track your real family
          </Link>
        </p>
      </div>

      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <img src="/logo.png" alt="ScreenTime Swap" className="w-12 h-12 md:w-16 md:h-16" />
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900">Parent Dashboard</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">Managing {CHILD_DATA.name}'s activities & rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-center bg-gradient-to-br from-purple-100 to-pink-100 px-4 md:px-6 py-2 md:py-3 rounded-xl flex-1 sm:flex-none">
                <p className="text-xs md:text-sm text-gray-600">Current Balance</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">{CHILD_DATA.tokenBalance} 🪙</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-4 md:gap-8 min-w-max md:min-w-0">
            {[
              { key: 'overview', label: 'Overview', icon: '📊', shortLabel: 'Overview' },
              { key: 'activities', label: 'Activity Settings', icon: '⚙️', shortLabel: 'Activities' },
              { key: 'rewards', label: 'Reward Settings', icon: '🎁', shortLabel: 'Rewards' },
              { key: 'approvals', label: 'Pending Approvals', icon: '✓', shortLabel: 'Approvals', badge: PENDING_REDEMPTIONS.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-3 md:py-4 px-2 md:px-3 border-b-2 font-semibold transition relative whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden md:inline">{tab.icon} {tab.label}</span>
                <span className="md:hidden">{tab.icon} {tab.shortLabel}</span>
                {tab.badge ? (
                  <span className="absolute -top-1 -right-1 md:-right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-6xl">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📈</span>
                  <h3 className="font-semibold text-gray-600">This Week</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600">{CHILD_DATA.weeklyActivities} Activities</p>
                <p className="text-sm text-green-600 mt-1">↑ 20% from last week</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🪙</span>
                  <h3 className="font-semibold text-gray-600">Tokens Earned</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{CHILD_DATA.lifetimeTokens} Total</p>
                <p className="text-sm text-gray-600 mt-1">65 this week</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">⏱️</span>
                  <h3 className="font-semibold text-gray-600">Active Time</h3>
                </div>
                <p className="text-3xl font-bold text-pink-600">205 min</p>
                <p className="text-sm text-gray-600 mt-1">This week's activities</p>
              </div>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Activity Breakdown</h2>
              <div className="space-y-3">
                {[
                  { name: 'Reading', percent: 40, color: 'bg-blue-500' },
                  { name: 'Outdoor Play', percent: 30, color: 'bg-green-500' },
                  { name: 'Creative Arts', percent: 20, color: 'bg-purple-500' },
                  { name: 'Helping Family', percent: 10, color: 'bg-orange-500' },
                ].map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{category.name}</span>
                      <span className="text-gray-600">{category.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${category.color} h-3 rounded-full transition-all`}
                        style={{ width: `${category.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
              <div className="space-y-3">
                {ACTIVITY_LOG.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{log.emoji}</span>
                      <div>
                        <p className="font-semibold">{log.activity}</p>
                        <p className="text-sm text-gray-600">{log.minutes} minutes • {log.date}</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-bold">+{log.tokens} 🪙</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Settings Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Activities</h2>
              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                + Add Custom Activity
              </button>
            </div>

            {showAddActivity && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold mb-4">Create Custom Activity</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Activity name (e.g., Practice piano)"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Token value per 30 min"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Create Activity
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-4">Activity Templates</h3>
              <div className="space-y-3">
                {ACTIVITY_TEMPLATES.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{template.emoji}</span>
                      <div>
                        <p className="font-semibold">{template.name}</p>
                        <p className="text-sm text-gray-600">
                          {template.tokens} tokens per 30 min
                          {template.isCustom && ' • Custom'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={template.isActive}
                          className="w-5 h-5"
                          readOnly
                        />
                        <span className="text-sm">Active</span>
                      </label>
                      <button className="text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reward Settings Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Rewards</h2>
              <button
                onClick={() => setShowAddReward(!showAddReward)}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
              >
                + Add Custom Reward
              </button>
            </div>

            {showAddReward && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold mb-4">Create Custom Reward</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Reward name (e.g., Pick dessert)"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Token cost"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Create Reward
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
              <div className="space-y-3">
                {REWARD_TEMPLATES.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{reward.emoji}</span>
                      <div>
                        <p className="font-semibold">{reward.name}</p>
                        <p className="text-sm text-gray-600">{reward.cost} tokens</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={reward.isActive}
                          className="w-5 h-5"
                          readOnly
                        />
                        <span className="text-sm">Active</span>
                      </label>
                      <button className="text-pink-600 hover:text-pink-800 px-3 py-1 rounded">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Pending Reward Requests</h2>
            
            {PENDING_REDEMPTIONS.length > 0 ? (
              <div className="space-y-4">
                {PENDING_REDEMPTIONS.map((redemption) => (
                  <div key={redemption.id} className="bg-white rounded-xl shadow p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-4xl sm:text-5xl flex-shrink-0">{redemption.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-lg sm:text-xl font-bold truncate">{redemption.reward}</p>
                          <p className="text-sm sm:text-base text-gray-600">Cost: {redemption.cost} tokens</p>
                          <p className="text-xs sm:text-sm text-gray-500">Requested {redemption.requestedAt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleApproveRedemption(redemption.id, true)}
                        className="w-full sm:flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleApproveRedemption(redemption.id, false)}
                        className="w-full sm:flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                      >
                        ✗ Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <p className="text-6xl mb-4">✅</p>
                <p className="text-xl text-gray-600">No pending requests</p>
                <p className="text-gray-500 mt-2">You're all caught up!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
