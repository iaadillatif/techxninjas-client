import { supabase } from '../lib/supabaseClient';
import {
  Badge,
  UserBadge,
  UserGamification,
  LeaderboardEntry,
  BadgeType,
  UserLevel,
  Achievement,
} from '../types';

/**
 * Service for managing gamification features
 * Including badges, XP, levels, streaks, and leaderboards
 */

const XP_PER_LEVEL = 1000;
const LEVEL_MULTIPLIER = 1.5;

/**
 * Calculate user level based on total XP
 */
export const calculateLevel = (totalXp: number): UserLevel => {
  if (totalXp < 500) return UserLevel.NEWBIE;
  if (totalXp < 2000) return UserLevel.BEGINNER;
  if (totalXp < 5000) return UserLevel.INTERMEDIATE;
  if (totalXp < 10000) return UserLevel.ADVANCED;
  if (totalXp < 20000) return UserLevel.EXPERT;
  if (totalXp < 50000) return UserLevel.MASTER;
  return UserLevel.LEGEND;
};

/**
 * Calculate XP required for next level
 */
export const calculateXpForNextLevel = (currentLevel: number): number => {
  return Math.floor(XP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, currentLevel - 1));
};

/**
 * Get or create user gamification profile
 */
export const getUserGamification = async (userId: string): Promise<UserGamification | null> => {
  try {
    const { data, error } = await supabase
      .from('user_gamification')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // User gamification doesn't exist, create it
      return await createUserGamification(userId);
    }

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user gamification:', error);
    return null;
  }
};

/**
 * Create initial gamification profile for user
 */
export const createUserGamification = async (userId: string): Promise<UserGamification | null> => {
  try {
    const { data, error } = await supabase
      .from('user_gamification')
      .insert([
        {
          user_id: userId,
          total_xp: 0,
          level: UserLevel.NEWBIE,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString(),
          courses_completed: 0,
          articles_read: 0,
          events_attended: 0,
          articles_written: 0,
          helpful_reviews: 0,
          shares_count: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user gamification:', error);
    return null;
  }
};

/**
 * Award XP to user and check for level up
 */
export const awardXP = async (
  userId: string,
  xpAmount: number,
  reason: string
): Promise<{ leveledUp: boolean; newLevel?: UserLevel; totalXp: number }> => {
  try {
    let gamification = await getUserGamification(userId);
    if (!gamification) {
      gamification = await createUserGamification(userId);
      if (!gamification) throw new Error('Failed to create gamification profile');
    }

    const newTotalXp = gamification.total_xp + xpAmount;
    const oldLevel = gamification.level;
    const newLevel = calculateLevel(newTotalXp);
    const leveledUp = newLevel !== oldLevel;

    const { error } = await supabase
      .from('user_gamification')
      .update({
        total_xp: newTotalXp,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);

    if (error) throw error;

    // If leveled up, create notification
    if (leveledUp) {
      await createLevelUpNotification(userId, newLevel);
    }

    return {
      leveledUp,
      newLevel: leveledUp ? newLevel : undefined,
      totalXp: newTotalXp,
    };
  } catch (error) {
    console.error('Error awarding XP:', error);
    return { leveledUp: false, totalXp: 0 };
  }
};

/**
 * Update user streak
 */
export const updateStreak = async (userId: string): Promise<void> => {
  try {
    const gamification = await getUserGamification(userId);
    if (!gamification) return;

    const today = new Date();
    const lastActivity = new Date(gamification.last_activity_date);
    const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = gamification.current_streak;
    let longestStreak = gamification.longest_streak;

    if (diffDays === 0) {
      // Same day, no change
      return;
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak += 1;
      if (newStreak > longestStreak) {
        longestStreak = newStreak;
      }

      // Check for streak badges
      if (newStreak === 7) {
        await awardBadge(userId, BadgeType.STREAK_7_DAYS);
      } else if (newStreak === 30) {
        await awardBadge(userId, BadgeType.STREAK_30_DAYS);
      } else if (newStreak === 100) {
        await awardBadge(userId, BadgeType.STREAK_100_DAYS);
      }
    } else {
      // Streak broken
      newStreak = 1;
    }

    const { error } = await supabase
      .from('user_gamification')
      .update({
        current_streak: newStreak,
        longest_streak: longestStreak,
        last_activity_date: today.toISOString(),
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};

/**
 * Get all available badges
 */
export const getAllBadges = async (): Promise<Badge[]> => {
  try {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .order('rarity', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching badges:', error);
    return [];
  }
};

/**
 * Get user's earned badges
 */
export const getUserBadges = async (userId: string): Promise<UserBadge[]> => {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }
};

/**
 * Award badge to user
 */
export const awardBadge = async (userId: string, badgeType: BadgeType): Promise<boolean> => {
  try {
    // Check if user already has this badge
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', userId)
      .eq('badge_type', badgeType)
      .single();

    if (existing) {
      console.log('User already has this badge');
      return false;
    }

    // Get badge details
    const { data: badge, error: badgeError } = await supabase
      .from('badges')
      .select('*')
      .eq('type', badgeType)
      .single();

    if (badgeError) throw badgeError;
    if (!badge) {
      console.error('Badge not found:', badgeType);
      return false;
    }

    // Award badge
    const { error: insertError } = await supabase
      .from('user_badges')
      .insert([
        {
          user_id: userId,
          badge_id: badge.id,
          earned_at: new Date().toISOString(),
        },
      ]);

    if (insertError) throw insertError;

    // Award XP for earning badge
    await awardXP(userId, badge.xp_reward, `Earned badge: ${badge.name}`);

    // Create notification
    await createBadgeNotification(userId, badge);

    return true;
  } catch (error) {
    console.error('Error awarding badge:', error);
    return false;
  }
};

/**
 * Get leaderboard (top users by XP)
 */
export const getLeaderboard = async (limit: number = 100): Promise<LeaderboardEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('user_gamification')
      .select('user_id, total_xp, level, user_profiles(username, avatar_url)')
      .order('total_xp', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map((entry: any, index: number) => ({
      user_id: entry.user_id,
      username: entry.user_profiles?.username || 'Anonymous',
      avatar_url: entry.user_profiles?.avatar_url,
      total_xp: entry.total_xp,
      level: entry.level,
      badges_count: 0, // Will be populated separately if needed
      rank: index + 1,
    }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

/**
 * Get user's rank on leaderboard
 */
export const getUserRank = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('user_gamification')
      .select('user_id, total_xp')
      .order('total_xp', { ascending: false });

    if (error) throw error;

    const rank = (data || []).findIndex((entry: any) => entry.user_id === userId);
    return rank === -1 ? 0 : rank + 1;
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return 0;
  }
};

/**
 * Get user achievements
 */
export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const gamification = await getUserGamification(userId);
    if (!gamification) return [];

    const achievements: Achievement[] = [
      {
        id: '1',
        title: 'Course Completion Master',
        description: 'Complete 10 courses',
        icon: '🎓',
        progress: gamification.courses_completed,
        total: 10,
        completed: gamification.courses_completed >= 10,
      },
      {
        id: '2',
        title: 'Avid Reader',
        description: 'Read 50 articles',
        icon: '📚',
        progress: gamification.articles_read,
        total: 50,
        completed: gamification.articles_read >= 50,
      },
      {
        id: '3',
        title: 'Event Enthusiast',
        description: 'Attend 5 events',
        icon: '🎉',
        progress: gamification.events_attended,
        total: 5,
        completed: gamification.events_attended >= 5,
      },
      {
        id: '4',
        title: 'Content Creator',
        description: 'Write 10 articles',
        icon: '✍️',
        progress: gamification.articles_written,
        total: 10,
        completed: gamification.articles_written >= 10,
      },
      {
        id: '5',
        title: 'Streak Champion',
        description: 'Maintain a 30-day streak',
        icon: '🔥',
        progress: gamification.current_streak,
        total: 30,
        completed: gamification.current_streak >= 30,
      },
    ];

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

/**
 * Create badge earned notification
 */
const createBadgeNotification = async (userId: string, badge: Badge): Promise<void> => {
  try {
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'badge_earned',
        title: 'New Badge Earned!',
        message: `You've earned the "${badge.name}" badge! ${badge.description}`,
        read: false,
        data: { badge_id: badge.id },
      },
    ]);
  } catch (error) {
    console.error('Error creating badge notification:', error);
  }
};

/**
 * Create level up notification
 */
const createLevelUpNotification = async (userId: string, newLevel: UserLevel): Promise<void> => {
  try {
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'level_up',
        title: 'Level Up!',
        message: `Congratulations! You've reached ${newLevel} level!`,
        read: false,
        data: { level: newLevel },
      },
    ]);
  } catch (error) {
    console.error('Error creating level up notification:', error);
  }
};

/**
 * Track activity and award XP
 */
export const trackActivity = async (
  userId: string,
  activityType: 'course_completed' | 'article_read' | 'event_attended' | 'article_written' | 'review_posted' | 'content_shared',
  itemId?: string
): Promise<void> => {
  try {
    // Award XP based on activity type
    const xpRewards: Record<string, number> = {
      course_completed: 100,
      article_read: 10,
      event_attended: 50,
      article_written: 200,
      review_posted: 20,
      content_shared: 5,
    };

    const xp = xpRewards[activityType] || 10;
    await awardXP(userId, xp, activityType);

    // Update streak
    await updateStreak(userId);

    // Update activity counters
    const updateFields: Record<string, string> = {
      course_completed: 'courses_completed',
      article_read: 'articles_read',
      event_attended: 'events_attended',
      article_written: 'articles_written',
      review_posted: 'helpful_reviews',
      content_shared: 'shares_count',
    };

    const field = updateFields[activityType];
    if (field) {
      const gamification = await getUserGamification(userId);
      if (gamification) {
        const currentValue = (gamification as any)[field] || 0;
        await supabase
          .from('user_gamification')
          .update({ [field]: currentValue + 1 })
          .eq('user_id', userId);
      }
    }

    // Check for first-time badges
    if (activityType === 'course_completed') {
      const gamification = await getUserGamification(userId);
      if (gamification) {
        if (gamification.courses_completed === 0) {
          await awardBadge(userId, BadgeType.FIRST_COURSE);
        } else if (gamification.courses_completed === 4) {
          await awardBadge(userId, BadgeType.COMPLETE_5_COURSES);
        } else if (gamification.courses_completed === 9) {
          await awardBadge(userId, BadgeType.COMPLETE_10_COURSES);
        }
      }
    }
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};
