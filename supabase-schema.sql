-- ================================================
-- TechXNinjas Database Schema
-- Complete SQL setup for all new features
-- ================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 1. NEWSLETTER SUBSCRIBERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  source TEXT,
  preferences JSONB DEFAULT '{"events": true, "articles": true, "courses": true, "weekly_digest": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);

-- ================================================
-- 2. BADGES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')) DEFAULT 'common',
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster type lookups
CREATE INDEX IF NOT EXISTS idx_badges_type ON badges(type);

-- ================================================
-- 3. INSERT DEFAULT BADGES
-- ================================================
INSERT INTO badges (type, name, description, icon, rarity, xp_reward) VALUES
  ('first_login', 'Welcome Aboard', 'Completed your first login', '👋', 'common', 10),
  ('first_event', 'Event Explorer', 'Registered for your first event', '🎪', 'common', 25),
  ('first_course', 'Learning Begins', 'Enrolled in your first course', '🎓', 'common', 50),
  ('first_article', 'Curious Reader', 'Read your first article', '📖', 'common', 10),
  ('complete_5_courses', 'Course Enthusiast', 'Completed 5 courses', '🏆', 'rare', 250),
  ('complete_10_courses', 'Learning Master', 'Completed 10 courses', '🎖️', 'epic', 500),
  ('write_first_article', 'Content Creator', 'Published your first article', '✍️', 'rare', 200),
  ('write_10_articles', 'Prolific Writer', 'Published 10 articles', '📝', 'epic', 1000),
  ('top_contributor', 'Community Champion', 'Top 10 contributor this month', '🌟', 'legendary', 2000),
  ('streak_7_days', 'Week Warrior', 'Maintained a 7-day streak', '🔥', 'rare', 100),
  ('streak_30_days', 'Monthly Master', 'Maintained a 30-day streak', '⚡', 'epic', 500),
  ('streak_100_days', 'Century Champion', 'Maintained a 100-day streak', '💎', 'legendary', 2000),
  ('profile_complete', 'Profile Perfect', 'Completed your profile 100%', '✅', 'common', 50),
  ('share_content', 'Social Butterfly', 'Shared content 10 times', '📤', 'rare', 100),
  ('helpful_reviewer', 'Helpful Hand', 'Wrote 25 helpful reviews', '⭐', 'epic', 300),
  ('event_organizer', 'Event Master', 'Organized an event', '🎯', 'legendary', 1500),
  ('mentor', 'Guiding Light', 'Became a mentor', '🧑‍🏫', 'legendary', 2000),
  ('early_adopter', 'Pioneer', 'Joined in the first month', '🚀', 'legendary', 500)
ON CONFLICT (type) DO NOTHING;

-- ================================================
-- 4. USER BADGES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);

-- ================================================
-- 5. USER GAMIFICATION TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS user_gamification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  level TEXT DEFAULT 'Newbie',
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  courses_completed INTEGER DEFAULT 0,
  articles_read INTEGER DEFAULT 0,
  events_attended INTEGER DEFAULT 0,
  articles_written INTEGER DEFAULT 0,
  helpful_reviews INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_gamification_user_id ON user_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_gamification_total_xp ON user_gamification(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_user_gamification_level ON user_gamification(level);

-- ================================================
-- 6. NOTIFICATIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, read);

-- ================================================
-- 7. BOOKMARKS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_type TEXT CHECK (item_type IN ('article', 'course', 'event')) NOT NULL,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- Indexes for bookmarks
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_item_type ON bookmarks(item_type);
CREATE INDEX IF NOT EXISTS idx_bookmarks_collection_id ON bookmarks(collection_id);

-- ================================================
-- 8. COLLECTIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  bookmarks_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for collections
CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_is_public ON collections(is_public);

-- ================================================
-- 9. USER FOLLOWS TABLE (Social Features)
-- ================================================
CREATE TABLE IF NOT EXISTS user_follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Indexes for follows
CREATE INDEX IF NOT EXISTS idx_user_follows_follower_id ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following_id ON user_follows(following_id);

-- ================================================
-- 10. MESSAGES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (sender_id != receiver_id)
);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- ================================================
-- 11. ACTIVITY FEED TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS activity_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activity feed
CREATE INDEX IF NOT EXISTS idx_activity_feed_user_id ON activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_created_at ON activity_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_feed_type ON activity_feed(activity_type);

-- ================================================
-- 12. ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================

-- Newsletter Subscribers (Public insert for subscriptions)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own subscription" ON newsletter_subscribers
  FOR SELECT USING (true);

-- User Gamification (Users can view their own and others' public data)
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all gamification data" ON user_gamification
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own gamification data" ON user_gamification
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert gamification data" ON user_gamification
  FOR INSERT WITH CHECK (true);

-- User Badges
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all badges" ON user_badges
  FOR SELECT USING (true);

CREATE POLICY "System can insert badges" ON user_badges
  FOR INSERT WITH CHECK (true);

-- Badges (Public read)
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges" ON badges
  FOR SELECT USING (true);

-- Notifications (Private to user)
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks (Private to user)
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Collections (Public or private based on is_public)
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view public collections and their own" ON collections
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own collections" ON collections
  FOR ALL USING (auth.uid() = user_id);

-- User Follows
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view follows" ON user_follows
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own follows" ON user_follows
  FOR ALL USING (auth.uid() = follower_id);

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages" ON messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Activity Feed
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view activity feed" ON activity_feed
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own activity" ON activity_feed
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ================================================
-- 13. FUNCTIONS & TRIGGERS
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_gamification
DROP TRIGGER IF EXISTS update_user_gamification_updated_at ON user_gamification;
CREATE TRIGGER update_user_gamification_updated_at
    BEFORE UPDATE ON user_gamification
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for collections
DROP TRIGGER IF EXISTS update_collections_updated_at ON collections;
CREATE TRIGGER update_collections_updated_at
    BEFORE UPDATE ON collections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update collection bookmark count
CREATE OR REPLACE FUNCTION update_collection_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE collections
        SET bookmarks_count = bookmarks_count + 1
        WHERE id = NEW.collection_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE collections
        SET bookmarks_count = bookmarks_count - 1
        WHERE id = OLD.collection_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.collection_id IS DISTINCT FROM NEW.collection_id THEN
            UPDATE collections
            SET bookmarks_count = bookmarks_count - 1
            WHERE id = OLD.collection_id;
            UPDATE collections
            SET bookmarks_count = bookmarks_count + 1
            WHERE id = NEW.collection_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for bookmark count
DROP TRIGGER IF EXISTS update_collection_bookmark_count_trigger ON bookmarks;
CREATE TRIGGER update_collection_bookmark_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON bookmarks
    FOR EACH ROW
    EXECUTE FUNCTION update_collection_bookmark_count();

-- ================================================
-- SETUP COMPLETE!
-- ================================================
-- Run this entire file in your Supabase SQL Editor
-- or use the Supabase CLI: supabase db reset
-- ================================================
