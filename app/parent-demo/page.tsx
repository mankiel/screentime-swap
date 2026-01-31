'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Settings,
  Gift,
  CheckCircle,
  TrendingUp,
  Coins,
  Clock,
  BookOpen,
  TreePine,
  Palette,
  Sparkles,
  Dog,
  Gamepad2,
  Smartphone,
  Film,
  Moon,
  IceCream,
  Plus,
  ChevronRight,
  Check,
  X,
  Home,
} from 'lucide-react';

// Mock data
const CHILD_DATA = {
  name: 'Emma',
  avatar: 'E',
  tokenBalance: 45,
  weeklyActivities: 12,
  lifetimeTokens: 230,
};

const ACTIVITY_LOG = [
  { id: '1', activity: 'Reading a book', icon: BookOpen, minutes: 30, tokens: 20, date: 'Today, 2:30 PM' },
  { id: '2', activity: 'Playing outside', icon: TreePine, minutes: 45, tokens: 15, date: 'Today, 10:00 AM' },
  { id: '3', activity: 'Drawing', icon: Palette, minutes: 20, tokens: 15, date: 'Yesterday, 4:00 PM' },
  { id: '4', activity: 'Helping with chores', icon: Home, minutes: 15, tokens: 10, date: 'Yesterday, 11:00 AM' },
];

const ACTIVITY_TEMPLATES = [
  { id: '1', name: 'Reading a book', icon: BookOpen, tokens: 20, isActive: true, isCustom: false },
  { id: '2', name: 'Playing outside', icon: TreePine, tokens: 15, isActive: true, isCustom: false },
  { id: '3', name: 'Drawing or art', icon: Palette, tokens: 15, isActive: true, isCustom: false },
  { id: '4', name: 'Helping with chores', icon: Home, tokens: 10, isActive: true, isCustom: false },
  { id: '5', name: 'Learning something new', icon: Sparkles, tokens: 25, isActive: true, isCustom: false },
  { id: '6', name: 'Playing with pets', icon: Dog, tokens: 10, isActive: false, isCustom: false },
];

const PENDING_REDEMPTIONS = [
  { id: '1', reward: '30 min bonus screen time', icon: Smartphone, cost: 20, requestedAt: '10 minutes ago' },
  { id: '2', reward: 'Stay up 30 min late', icon: Moon, cost: 40, requestedAt: '1 hour ago' },
];

const REWARD_TEMPLATES = [
  { id: '1', name: '15 min bonus screen time', icon: Gamepad2, cost: 10, isActive: true },
  { id: '2', name: '30 min bonus screen time', icon: Smartphone, cost: 20, isActive: true },
  { id: '3', name: 'Choose family movie', icon: Film, cost: 50, isActive: true },
  { id: '4', name: 'Stay up 30 min late', icon: Moon, cost: 40, isActive: true },
  { id: '5', name: 'Special treat', icon: IceCream, cost: 30, isActive: true },
];

type TabKey = 'overview' | 'activities' | 'rewards' | 'approvals';

const TABS: { key: TabKey; label: string; shortLabel: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { key: 'overview', label: 'Overview', shortLabel: 'Overview', icon: LayoutDashboard },
  { key: 'activities', label: 'Activity Settings', shortLabel: 'Activities', icon: Settings },
  { key: 'rewards', label: 'Reward Settings', shortLabel: 'Rewards', icon: Gift },
  { key: 'approvals', label: 'Pending Approvals', shortLabel: 'Approvals', icon: CheckCircle, badge: PENDING_REDEMPTIONS.length },
];

export default function ParentDashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddReward, setShowAddReward] = useState(false);

  const handleApproveRedemption = (id: string, approved: boolean) => {
    alert(approved ? 'Reward approved!' : 'Reward denied');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 px-4">
        <p className="text-sm font-medium">
          Parent Demo - See what you'll manage
          <Link href="/landing#waitlist" className="underline ml-2 hover:opacity-80 transition-opacity">
            Sign up to track your real family
          </Link>
        </p>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/landing" className="flex items-center gap-2">
                <img src="/logo.png" alt="ScreenTime Swap" className="w-10 h-10 md:w-12 md:h-12" />
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">Parent Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Managing {CHILD_DATA.name}'s activities & rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="bg-secondary border border-border px-4 py-2.5 rounded-lg flex items-center gap-3 flex-1 sm:flex-none">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {CHILD_DATA.avatar}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Balance</p>
                  <p className="text-lg font-semibold text-foreground">{CHILD_DATA.tokenBalance} tokens</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-border bg-card overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1 min-w-max md:min-w-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 py-3 px-3 md:px-4 border-b-2 font-medium transition-colors relative whitespace-nowrap text-sm ${
                    activeTab === tab.key
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                  {tab.badge ? (
                    <span className="bg-destructive text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-6xl">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">This Week</h3>
                </div>
                <p className="text-3xl font-semibold text-foreground">{CHILD_DATA.weeklyActivities}</p>
                <p className="text-sm text-muted-foreground mt-1">Activities completed</p>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 20% from last week
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Coins className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">Tokens Earned</h3>
                </div>
                <p className="text-3xl font-semibold text-foreground">{CHILD_DATA.lifetimeTokens}</p>
                <p className="text-sm text-muted-foreground mt-1">Total lifetime</p>
                <p className="text-sm text-muted-foreground mt-2">65 this week</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-medium text-muted-foreground">Active Time</h3>
                </div>
                <p className="text-3xl font-semibold text-foreground">205 min</p>
                <p className="text-sm text-muted-foreground mt-1">This week's activities</p>
              </div>
            </div>

            {/* Activity Breakdown */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Activity Breakdown</h2>
              <div className="space-y-4">
                {[
                  { name: 'Reading', percent: 40, color: 'bg-chart-1' },
                  { name: 'Outdoor Play', percent: 30, color: 'bg-chart-2' },
                  { name: 'Creative Arts', percent: 20, color: 'bg-chart-3' },
                  { name: 'Helping Family', percent: 10, color: 'bg-chart-4' },
                ].map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{category.name}</span>
                      <span className="text-sm text-muted-foreground">{category.percent}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full transition-all`}
                        style={{ width: `${category.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Recent Activities</h2>
              <div className="space-y-3">
                {ACTIVITY_LOG.map((log) => {
                  const Icon = log.icon;
                  return (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{log.activity}</p>
                          <p className="text-sm text-muted-foreground">{log.minutes} minutes &middot; {log.date}</p>
                        </div>
                      </div>
                      <span className="text-green-600 font-medium text-sm">+{log.tokens} tokens</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Activity Settings Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Manage Activities</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Configure activities your child can do to earn tokens</p>
              </div>
              <button
                onClick={() => setShowAddActivity(!showAddActivity)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Custom Activity
              </button>
            </div>

            {showAddActivity && (
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">Create Custom Activity</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Activity name</label>
                    <input
                      type="text"
                      placeholder="e.g., Practice piano"
                      className="w-full px-3 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Token value per 30 min</label>
                    <input
                      type="number"
                      placeholder="e.g., 15"
                      className="w-full px-3 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm">
                      Create Activity
                    </button>
                    <button 
                      onClick={() => setShowAddActivity(false)}
                      className="px-4 py-2.5 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">Activity Templates</h3>
              <div className="space-y-2">
                {ACTIVITY_TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div key={template.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="w-4 h-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{template.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {template.tokens} tokens per 30 min
                            {template.isCustom && ' &middot; Custom'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-9 h-5 rounded-full transition-colors ${template.isActive ? 'bg-green-600' : 'bg-muted'} relative`}>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${template.isActive ? 'left-4' : 'left-0.5'}`} />
                          </div>
                        </label>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Reward Settings Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Manage Rewards</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Set up rewards your child can redeem with tokens</p>
              </div>
              <button
                onClick={() => setShowAddReward(!showAddReward)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Custom Reward
              </button>
            </div>

            {showAddReward && (
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">Create Custom Reward</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Reward name</label>
                    <input
                      type="text"
                      placeholder="e.g., Pick dessert"
                      className="w-full px-3 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Token cost</label>
                    <input
                      type="number"
                      placeholder="e.g., 25"
                      className="w-full px-3 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm">
                      Create Reward
                    </button>
                    <button 
                      onClick={() => setShowAddReward(false)}
                      className="px-4 py-2.5 rounded-lg font-medium border border-border text-foreground hover:bg-secondary transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="text-base font-semibold text-foreground mb-4">Available Rewards</h3>
              <div className="space-y-2">
                {REWARD_TEMPLATES.map((reward) => {
                  const Icon = reward.icon;
                  return (
                    <div key={reward.id} className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="w-4 h-4 text-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{reward.name}</p>
                          <p className="text-xs text-muted-foreground">{reward.cost} tokens</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-9 h-5 rounded-full transition-colors ${reward.isActive ? 'bg-green-600' : 'bg-muted'} relative`}>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${reward.isActive ? 'left-4' : 'left-0.5'}`} />
                          </div>
                        </label>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Pending Requests</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Review and approve your child's reward redemptions</p>
            </div>
            
            {PENDING_REDEMPTIONS.length > 0 ? (
              <div className="space-y-3">
                {PENDING_REDEMPTIONS.map((redemption) => {
                  const Icon = redemption.icon;
                  return (
                    <div key={redemption.id} className="bg-card border border-border rounded-xl p-4 md:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground">{redemption.reward}</p>
                            <p className="text-sm text-muted-foreground">Cost: {redemption.cost} tokens</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Requested {redemption.requestedAt}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-shrink-0">
                          <button
                            onClick={() => handleApproveRedemption(redemption.id, true)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproveRedemption(redemption.id, false)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-border text-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors text-sm"
                          >
                            <X className="w-4 h-4" />
                            Deny
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-foreground">No pending requests</p>
                <p className="text-muted-foreground mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
