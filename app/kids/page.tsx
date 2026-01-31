'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Trophy, 
  Gift, 
  Star, 
  Clock, 
  Sparkles,
  ChevronRight,
  X,
  Check,
  Zap,
  Target,
  Palette,
  Bike,
  Brain,
  Dog,
  Tv,
  Smartphone,
  Film,
  Moon,
  IceCream,
  Play,
  Award
} from 'lucide-react';

// Mock data - replace with real data from API
const ACTIVITIES = [
  { id: '1', name: 'Reading', icon: BookOpen, tokens: 20, color: 'bg-sky-500' },
  { id: '2', name: 'Playing Outside', icon: Bike, tokens: 15, color: 'bg-emerald-500' },
  { id: '3', name: 'Art & Drawing', icon: Palette, tokens: 15, color: 'bg-pink-500' },
  { id: '4', name: 'Helping Out', icon: Target, tokens: 10, color: 'bg-amber-500' },
  { id: '5', name: 'Learning', icon: Brain, tokens: 25, color: 'bg-violet-500' },
  { id: '6', name: 'Pet Care', icon: Dog, tokens: 10, color: 'bg-orange-500' },
];

const REWARDS = [
  { id: '1', name: '15 min Screen Time', icon: Tv, cost: 10, color: 'bg-sky-500' },
  { id: '2', name: '30 min Screen Time', icon: Smartphone, cost: 20, color: 'bg-emerald-500' },
  { id: '3', name: 'Pick Family Movie', icon: Film, cost: 50, color: 'bg-violet-500' },
  { id: '4', name: 'Stay Up Late', icon: Moon, cost: 40, color: 'bg-indigo-500' },
  { id: '5', name: 'Special Treat', icon: IceCream, cost: 30, color: 'bg-pink-500' },
];

const RECENT_ACTIVITIES = [
  { id: '1', name: 'Reading', icon: BookOpen, minutes: 30, tokens: 20, color: 'bg-sky-100 text-sky-700' },
  { id: '2', name: 'Playing Outside', icon: Bike, minutes: 45, tokens: 15, color: 'bg-emerald-100 text-emerald-700' },
  { id: '3', name: 'Art & Drawing', icon: Palette, minutes: 20, tokens: 15, color: 'bg-pink-100 text-pink-700' },
];

export default function KidsPage() {
  const [tokenBalance, setTokenBalance] = useState(45);
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [activitiesLogged, setActivitiesLogged] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  useEffect(() => {
    console.log('Demo page viewed');
  }, []);

  const handleLogActivity = () => {
    const activity = ACTIVITIES.find(a => a.id === selectedActivity);
    if (activity && timeSpent) {
      const tokensEarned = activity.tokens;
      setEarnedTokens(tokensEarned);
      setTokenBalance(prev => prev + tokensEarned);
      setShowSuccess(true);
      setShowLogActivity(false);
      setSelectedActivity('');
      setTimeSpent('');
      setNote('');
      
      const newCount = activitiesLogged + 1;
      setActivitiesLogged(newCount);
      
      if (newCount >= 2) {
        setTimeout(() => {
          setShowSignupPrompt(true);
        }, 2500);
      }
      
      setTimeout(() => setShowSuccess(false), 2500);
    }
  };

  const handleRedeemReward = (reward: typeof REWARDS[0]) => {
    if (tokenBalance >= reward.cost) {
      setTokenBalance(prev => prev - reward.cost);
      alert(`You got: ${reward.name}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-center py-2.5 px-4">
        <p className="text-sm font-medium text-white">
          Demo Mode - Try it out!
          <Link href="/landing#waitlist" className="underline ml-2 font-semibold hover:text-violet-200 transition-colors">
            Sign up for real version
          </Link>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Adventures</h1>
                <p className="text-xs text-gray-500">Keep earning tokens!</p>
              </div>
            </div>
            
            {/* Token Balance */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2.5 rounded-full shadow-lg shadow-amber-200/50">
              <Star className="w-5 h-5 fill-white" />
              <span className="text-lg font-bold">{tokenBalance}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-bold">+{earnedTokens} Tokens Earned!</span>
          </div>
        </div>
      )}

      {/* Signup Prompt Modal */}
      {showSignupPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              You're doing great!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Ready to track your real activities and earn rewards with your family?
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/landing#waitlist"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl font-semibold text-center hover:opacity-90 transition-opacity"
              >
                Join Waitlist
              </Link>
              <button
                onClick={() => setShowSignupPrompt(false)}
                className="text-gray-500 py-2 hover:text-gray-700 transition-colors font-medium"
              >
                Keep exploring
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Action Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => {
              setShowLogActivity(true);
              setShowRewards(false);
            }}
            className={`relative overflow-hidden p-6 rounded-3xl text-left transition-all duration-200 ${
              showLogActivity 
                ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-200/50 scale-[0.98]' 
                : 'bg-white hover:bg-sky-50 border-2 border-sky-200 hover:border-sky-400 hover:shadow-lg'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
              showLogActivity ? 'bg-white/20' : 'bg-sky-100'
            }`}>
              <Play className={`w-7 h-7 ${showLogActivity ? 'text-white' : 'text-sky-600'}`} />
            </div>
            <h2 className={`text-xl font-bold mb-1 ${showLogActivity ? 'text-white' : 'text-gray-900'}`}>
              Log Activity
            </h2>
            <p className={`text-sm ${showLogActivity ? 'text-sky-100' : 'text-gray-500'}`}>
              Earn tokens!
            </p>
            <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 ${
              showLogActivity ? 'text-white/60' : 'text-gray-300'
            }`} />
          </button>

          <button
            onClick={() => {
              setShowRewards(true);
              setShowLogActivity(false);
            }}
            className={`relative overflow-hidden p-6 rounded-3xl text-left transition-all duration-200 ${
              showRewards 
                ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl shadow-pink-200/50 scale-[0.98]' 
                : 'bg-white hover:bg-pink-50 border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
              showRewards ? 'bg-white/20' : 'bg-pink-100'
            }`}>
              <Gift className={`w-7 h-7 ${showRewards ? 'text-white' : 'text-pink-600'}`} />
            </div>
            <h2 className={`text-xl font-bold mb-1 ${showRewards ? 'text-white' : 'text-gray-900'}`}>
              Rewards
            </h2>
            <p className={`text-sm ${showRewards ? 'text-pink-100' : 'text-gray-500'}`}>
              Spend tokens!
            </p>
            <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 ${
              showRewards ? 'text-white/60' : 'text-gray-300'
            }`} />
          </button>
        </div>

        {/* Log Activity Section */}
        {showLogActivity && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">What did you do?</h2>
              <button 
                onClick={() => setShowLogActivity(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Activity Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {ACTIVITIES.map((activity) => {
                const Icon = activity.icon;
                const isSelected = selectedActivity === activity.id;
                return (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity.id)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50 scale-95'
                        : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-sm text-gray-900 text-center">{activity.name}</p>
                    <p className="text-xs text-violet-600 font-bold text-center mt-1">+{activity.tokens}</p>
                  </button>
                );
              })}
            </div>

            {/* Time Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many minutes?
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  placeholder="30"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 text-lg font-semibold focus:border-violet-500 focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Note Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add a note (optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="It was so fun!"
                maxLength={100}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-base focus:border-violet-500 focus:ring-0 focus:outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogActivity}
              disabled={!selectedActivity || !timeSpent}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-emerald-200/50 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Get My Tokens!
            </button>
          </div>
        )}

        {/* Rewards Section */}
        {showRewards && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Pick Your Reward!</h2>
              <button 
                onClick={() => setShowRewards(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              {REWARDS.map((reward) => {
                const Icon = reward.icon;
                const canAfford = tokenBalance >= reward.cost;
                return (
                  <div
                    key={reward.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      canAfford
                        ? 'border-pink-200 bg-pink-50/50 hover:border-pink-300'
                        : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${reward.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{reward.name}</p>
                        <div className="flex items-center gap-1 text-amber-600">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span className="text-sm font-semibold">{reward.cost} tokens</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={!canAfford}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        canAfford
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90 shadow-lg shadow-pink-200/50'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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

        {/* Recent Adventures */}
        {!showLogActivity && !showRewards && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-5 h-5 text-violet-600" />
              <h2 className="text-xl font-bold text-gray-900">Recent Adventures</h2>
            </div>
            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className={`flex items-center justify-between p-4 rounded-2xl ${activity.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{activity.name}</p>
                        <p className="text-xs opacity-70">{activity.minutes} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                      <span>+{activity.tokens}</span>
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Daily Progress */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-violet-100 to-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-violet-900">Today's Progress</span>
                <span className="text-sm font-bold text-violet-600">3/5 activities</span>
              </div>
              <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
              <p className="text-xs text-violet-700 mt-2">2 more to unlock bonus tokens!</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
