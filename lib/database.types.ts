export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          subscription_tier: 'free' | 'premium'
          subscription_expires: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          subscription_tier?: 'free' | 'premium'
          subscription_expires?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          subscription_tier?: 'free' | 'premium'
          subscription_expires?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      child_profiles: {
        Row: {
          id: string
          parent_id: string
          name: string
          age: number
          avatar: string
          pin_code: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          age: number
          avatar?: string
          pin_code: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          name?: string
          age?: number
          avatar?: string
          pin_code?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      activity_templates: {
        Row: {
          id: string
          child_id: string
          name: string
          category: 'reading' | 'outdoor' | 'creative' | 'helping' | 'learning' | 'custom'
          token_value_per_unit: number
          unit_type: 'time_based' | 'task_based'
          is_active: boolean
          is_custom: boolean
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          name: string
          category: 'reading' | 'outdoor' | 'creative' | 'helping' | 'learning' | 'custom'
          token_value_per_unit: number
          unit_type: 'time_based' | 'task_based'
          is_active?: boolean
          is_custom?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          name?: string
          category?: 'reading' | 'outdoor' | 'creative' | 'helping' | 'learning' | 'custom'
          token_value_per_unit?: number
          unit_type?: 'time_based' | 'task_based'
          is_active?: boolean
          is_custom?: boolean
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          child_id: string
          activity_template_id: string
          time_spent_minutes: number | null
          tokens_earned: number
          note: string | null
          photo_url: string | null
          logged_at: string
          is_edited_by_parent: boolean
          parent_edit_note: string | null
        }
        Insert: {
          id?: string
          child_id: string
          activity_template_id: string
          time_spent_minutes?: number | null
          tokens_earned: number
          note?: string | null
          photo_url?: string | null
          logged_at?: string
          is_edited_by_parent?: boolean
          parent_edit_note?: string | null
        }
        Update: {
          id?: string
          child_id?: string
          activity_template_id?: string
          time_spent_minutes?: number | null
          tokens_earned?: number
          note?: string | null
          photo_url?: string | null
          logged_at?: string
          is_edited_by_parent?: boolean
          parent_edit_note?: string | null
        }
      }
      token_balances: {
        Row: {
          id: string
          child_id: string
          current_balance: number
          lifetime_earned: number
          updated_at: string
        }
        Insert: {
          id?: string
          child_id: string
          current_balance?: number
          lifetime_earned?: number
          updated_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          current_balance?: number
          lifetime_earned?: number
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          child_id: string
          name: string
          token_cost: number
          reward_type: 'screen_time' | 'custom_privilege'
          screen_time_minutes: number | null
          is_active: boolean
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          name: string
          token_cost: number
          reward_type: 'screen_time' | 'custom_privilege'
          screen_time_minutes?: number | null
          is_active?: boolean
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          name?: string
          token_cost?: number
          reward_type?: 'screen_time' | 'custom_privilege'
          screen_time_minutes?: number | null
          is_active?: boolean
          is_default?: boolean
          created_at?: string
        }
      }
      redemption_history: {
        Row: {
          id: string
          child_id: string
          reward_id: string
          tokens_spent: number
          status: 'pending' | 'approved' | 'denied' | 'used'
          requested_at: string
          approved_at: string | null
          approved_by: string | null
          parent_note: string | null
          used_at: string | null
        }
        Insert: {
          id?: string
          child_id: string
          reward_id: string
          tokens_spent: number
          status?: 'pending' | 'approved' | 'denied' | 'used'
          requested_at?: string
          approved_at?: string | null
          approved_by?: string | null
          parent_note?: string | null
          used_at?: string | null
        }
        Update: {
          id?: string
          child_id?: string
          reward_id?: string
          tokens_spent?: number
          status?: 'pending' | 'approved' | 'denied' | 'used'
          requested_at?: string
          approved_at?: string | null
          approved_by?: string | null
          parent_note?: string | null
          used_at?: string | null
        }
      }
      challenges: {
        Row: {
          id: string
          child_id: string
          title: string
          description: string
          challenge_type: 'try_new_activities' | 'time_based' | 'task_count' | 'custom'
          goal_value: number
          bonus_tokens: number
          start_date: string
          end_date: string
          status: 'active' | 'completed' | 'expired'
          completed_at: string | null
        }
        Insert: {
          id?: string
          child_id: string
          title: string
          description: string
          challenge_type: 'try_new_activities' | 'time_based' | 'task_count' | 'custom'
          goal_value: number
          bonus_tokens: number
          start_date: string
          end_date: string
          status?: 'active' | 'completed' | 'expired'
          completed_at?: string | null
        }
        Update: {
          id?: string
          child_id?: string
          title?: string
          description?: string
          challenge_type?: 'try_new_activities' | 'time_based' | 'task_count' | 'custom'
          goal_value?: number
          bonus_tokens?: number
          start_date?: string
          end_date?: string
          status?: 'active' | 'completed' | 'expired'
          completed_at?: string | null
        }
      }
      badges: {
        Row: {
          id: string
          child_id: string
          badge_type: string
          earned_at: string
        }
        Insert: {
          id?: string
          child_id: string
          badge_type: string
          earned_at?: string
        }
        Update: {
          id?: string
          child_id?: string
          badge_type?: string
          earned_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
