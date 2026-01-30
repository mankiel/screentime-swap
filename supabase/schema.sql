-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
-- Parent accounts are managed by Supabase Auth
-- We'll add a profile table for additional parent data

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_expires TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Child Profiles Table
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) <= 50),
  age INTEGER NOT NULL CHECK (age >= 4 AND age <= 17),
  avatar TEXT NOT NULL DEFAULT 'default',
  pin_code TEXT NOT NULL CHECK (char_length(pin_code) = 4),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activity Templates Table
CREATE TABLE IF NOT EXISTS activity_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  category TEXT NOT NULL CHECK (category IN ('reading', 'outdoor', 'creative', 'helping', 'learning', 'custom')),
  token_value_per_unit INTEGER NOT NULL CHECK (token_value_per_unit > 0),
  unit_type TEXT NOT NULL CHECK (unit_type IN ('time_based', 'task_based')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_custom BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activity Log Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  activity_template_id UUID NOT NULL REFERENCES activity_templates(id) ON DELETE CASCADE,
  time_spent_minutes INTEGER CHECK (time_spent_minutes > 0),
  tokens_earned INTEGER NOT NULL CHECK (tokens_earned >= 0),
  note TEXT CHECK (char_length(note) <= 100),
  photo_url TEXT,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_edited_by_parent BOOLEAN NOT NULL DEFAULT FALSE,
  parent_edit_note TEXT
);

-- Token Balance Table
CREATE TABLE IF NOT EXISTS token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL UNIQUE REFERENCES child_profiles(id) ON DELETE CASCADE,
  current_balance INTEGER NOT NULL DEFAULT 0 CHECK (current_balance >= 0),
  lifetime_earned INTEGER NOT NULL DEFAULT 0 CHECK (lifetime_earned >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rewards Table
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  token_cost INTEGER NOT NULL CHECK (token_cost > 0),
  reward_type TEXT NOT NULL CHECK (reward_type IN ('screen_time', 'custom_privilege')),
  screen_time_minutes INTEGER CHECK (screen_time_minutes > 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Redemption History Table
CREATE TABLE IF NOT EXISTS redemption_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  tokens_spent INTEGER NOT NULL CHECK (tokens_spent > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'used')),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id),
  parent_note TEXT,
  used_at TIMESTAMPTZ
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('try_new_activities', 'time_based', 'task_count', 'custom')),
  goal_value INTEGER NOT NULL CHECK (goal_value > 0),
  bonus_tokens INTEGER NOT NULL CHECK (bonus_tokens > 0),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
  completed_at TIMESTAMPTZ
);

-- Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_child_profiles_parent_id ON child_profiles(parent_id);
CREATE INDEX IF NOT EXISTS idx_activity_templates_child_id ON activity_templates(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_child_id ON activity_logs(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_logged_at ON activity_logs(logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_rewards_child_id ON rewards(child_id);
CREATE INDEX IF NOT EXISTS idx_redemption_history_child_id ON redemption_history(child_id);
CREATE INDEX IF NOT EXISTS idx_redemption_history_status ON redemption_history(status);
CREATE INDEX IF NOT EXISTS idx_challenges_child_id ON challenges(child_id);
CREATE INDEX IF NOT EXISTS idx_badges_child_id ON badges(child_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemption_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Child profiles policies
CREATE POLICY "Parents can view their children" ON child_profiles FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents can create children" ON child_profiles FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents can update their children" ON child_profiles FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents can delete their children" ON child_profiles FOR DELETE USING (auth.uid() = parent_id);

-- Activity templates policies
CREATE POLICY "View activity templates" ON activity_templates FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = activity_templates.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Manage activity templates" ON activity_templates FOR ALL 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = activity_templates.child_id AND child_profiles.parent_id = auth.uid()));

-- Activity logs policies
CREATE POLICY "View activity logs" ON activity_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = activity_logs.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Create activity logs" ON activity_logs FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = activity_logs.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Update activity logs" ON activity_logs FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = activity_logs.child_id AND child_profiles.parent_id = auth.uid()));

-- Token balances policies
CREATE POLICY "View token balances" ON token_balances FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = token_balances.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Manage token balances" ON token_balances FOR ALL 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = token_balances.child_id AND child_profiles.parent_id = auth.uid()));

-- Rewards policies
CREATE POLICY "View rewards" ON rewards FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = rewards.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Manage rewards" ON rewards FOR ALL 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = rewards.child_id AND child_profiles.parent_id = auth.uid()));

-- Redemption history policies
CREATE POLICY "View redemption history" ON redemption_history FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = redemption_history.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Create redemptions" ON redemption_history FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = redemption_history.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Update redemptions" ON redemption_history FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = redemption_history.child_id AND child_profiles.parent_id = auth.uid()));

-- Challenges policies
CREATE POLICY "View challenges" ON challenges FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = challenges.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Manage challenges" ON challenges FOR ALL 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = challenges.child_id AND child_profiles.parent_id = auth.uid()));

-- Badges policies
CREATE POLICY "View badges" ON badges FOR SELECT 
  USING (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = badges.child_id AND child_profiles.parent_id = auth.uid()));
CREATE POLICY "Create badges" ON badges FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM child_profiles WHERE child_profiles.id = badges.child_id AND child_profiles.parent_id = auth.uid()));

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_child_profiles_updated_at BEFORE UPDATE ON child_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_token_balances_updated_at BEFORE UPDATE ON token_balances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create default token balance for new child
CREATE OR REPLACE FUNCTION create_default_token_balance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO token_balances (child_id, current_balance, lifetime_earned)
  VALUES (NEW.id, 0, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_child_profile_created
  AFTER INSERT ON child_profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_default_token_balance();

-- Function to create default profile for new user
CREATE OR REPLACE FUNCTION create_default_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, subscription_tier)
  VALUES (NEW.id, 'free');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_profile();
