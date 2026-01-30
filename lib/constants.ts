export const AVATARS = [
  'default',
  'bear',
  'cat',
  'dog',
  'fox',
  'lion',
  'owl',
  'panda',
  'rabbit',
  'unicorn',
] as const;

export const ACTIVITY_CATEGORIES = {
  reading: { label: 'Reading', emoji: '📚', color: 'bg-blue-100 text-blue-800' },
  outdoor: { label: 'Outdoor Play', emoji: '🌳', color: 'bg-green-100 text-green-800' },
  creative: { label: 'Creative Time', emoji: '🎨', color: 'bg-purple-100 text-purple-800' },
  helping: { label: 'Helping Family', emoji: '🤝', color: 'bg-yellow-100 text-yellow-800' },
  learning: { label: 'Learning', emoji: '🧠', color: 'bg-pink-100 text-pink-800' },
  custom: { label: 'Other', emoji: '⭐', color: 'bg-gray-100 text-gray-800' },
} as const;

export const DEFAULT_ACTIVITIES = [
  {
    name: 'Reading',
    category: 'reading' as const,
    token_value_per_unit: 5,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Outdoor Play',
    category: 'outdoor' as const,
    token_value_per_unit: 8,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Drawing or Crafts',
    category: 'creative' as const,
    token_value_per_unit: 6,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Helping with Chores',
    category: 'helping' as const,
    token_value_per_unit: 10,
    unit_type: 'task_based' as const,
  },
  {
    name: 'Learning Something New',
    category: 'learning' as const,
    token_value_per_unit: 12,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Playing an Instrument',
    category: 'learning' as const,
    token_value_per_unit: 8,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Building or Creating',
    category: 'creative' as const,
    token_value_per_unit: 7,
    unit_type: 'time_based' as const,
  },
  {
    name: 'Playing Sports',
    category: 'outdoor' as const,
    token_value_per_unit: 10,
    unit_type: 'time_based' as const,
  },
];

export const DEFAULT_REWARDS = [
  {
    name: '15 Min Bonus Screen Time',
    token_cost: 10,
    reward_type: 'screen_time' as const,
    screen_time_minutes: 15,
  },
  {
    name: '30 Min Bonus Screen Time',
    token_cost: 20,
    reward_type: 'screen_time' as const,
    screen_time_minutes: 30,
  },
  {
    name: '60 Min Bonus Screen Time',
    token_cost: 35,
    reward_type: 'screen_time' as const,
    screen_time_minutes: 60,
  },
];

export const CHALLENGE_TEMPLATES = [
  {
    title: 'Try 3 New Activities',
    description: 'Try 3 different activities this week',
    challenge_type: 'try_new_activities' as const,
    goal_value: 3,
    bonus_tokens: 20,
  },
  {
    title: '60 Minutes Outdoors',
    description: 'Spend 60 minutes outdoors this week',
    challenge_type: 'time_based' as const,
    goal_value: 60,
    bonus_tokens: 25,
  },
  {
    title: 'Complete 10 Activities',
    description: 'Log 10 activities this week',
    challenge_type: 'task_count' as const,
    goal_value: 10,
    bonus_tokens: 30,
  },
  {
    title: '120 Minutes Reading',
    description: 'Read for 120 minutes this week',
    challenge_type: 'time_based' as const,
    goal_value: 120,
    bonus_tokens: 35,
  },
];

export const BADGE_TYPES = {
  first_activity: {
    name: 'First Steps',
    description: 'Logged your first activity',
    emoji: '👣',
  },
  ten_activities: {
    name: 'Explorer',
    description: 'Logged 10 activities',
    emoji: '🧭',
  },
  fifty_tokens: {
    name: 'Token Saver',
    description: 'Earned 50 tokens',
    emoji: '💰',
  },
  challenge_complete: {
    name: 'Challenge Champion',
    description: 'Completed your first challenge',
    emoji: '🏆',
  },
  five_categories: {
    name: 'Well-Rounded',
    description: 'Tried 5 different activity types',
    emoji: '🌟',
  },
  hundred_tokens: {
    name: 'Century Club',
    description: 'Earned 100 tokens',
    emoji: '💯',
  },
} as const;

export const TIME_OPTIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
];
