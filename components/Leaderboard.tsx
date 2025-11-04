import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Crown } from 'lucide-react';
import { getLeaderboard, getUserRank } from '../services/gamificationService';
import { LeaderboardEntry, UserLevel } from '../types';
import { useAuth } from '../contexts/AuthContext';
import LazyImage from './LazyImage';
import { getInitials } from '../utils/helpers';

interface LeaderboardProps {
  limit?: number;
  showCurrentUser?: boolean;
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  limit = 50,
  showCurrentUser = true,
  className = '',
}) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [limit]);

  useEffect(() => {
    if (user && showCurrentUser) {
      loadUserRank();
    }
  }, [user, showCurrentUser]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(limit);
      setEntries(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserRank = async () => {
    if (!user) return;
    try {
      const rank = await getUserRank(user.id);
      setUserRank(rank);
    } catch (error) {
      console.error('Error loading user rank:', error);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getLevelColor = (level: UserLevel) => {
    const colors: Record<UserLevel, string> = {
      [UserLevel.NEWBIE]: 'text-gray-500',
      [UserLevel.BEGINNER]: 'text-green-500',
      [UserLevel.INTERMEDIATE]: 'text-blue-500',
      [UserLevel.ADVANCED]: 'text-purple-500',
      [UserLevel.EXPERT]: 'text-orange-500',
      [UserLevel.MASTER]: 'text-red-500',
      [UserLevel.LEGEND]: 'text-yellow-500',
    };
    return colors[level] || 'text-gray-500';
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-light-blue text-white p-6 rounded-t-lg">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Leaderboard</h2>
        </div>
        <p className="text-white/80">Top performers in the TechXNinjas community</p>

        {/* Filters */}
        <div className="flex gap-2 mt-4">
          {['all', 'week', 'month'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as typeof filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === filterOption
                  ? 'bg-white text-brand-primary'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {filterOption === 'all' ? 'All Time' : filterOption === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Current User Rank (if logged in) */}
      {user && showCurrentUser && userRank > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Rank:
              </span>
            </div>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              #{userRank}
            </span>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-white dark:bg-gray-800 rounded-b-lg overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {entries.map((entry) => (
            <div
              key={entry.user_id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                user?.id === entry.user_id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankIcon(entry.rank) || (
                    <div
                      className={`w-8 h-8 rounded-full ${getRankBadgeColor(
                        entry.rank
                      )} flex items-center justify-center text-sm font-bold`}
                    >
                      {entry.rank}
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  {entry.avatar_url ? (
                    <LazyImage
                      src={entry.avatar_url}
                      alt={entry.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-light-blue flex items-center justify-center text-white font-bold">
                      {getInitials(entry.username)}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {entry.username}
                    </h3>
                    {user?.id === entry.user_id && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm font-medium ${getLevelColor(entry.level)}`}>
                      {entry.level}
                    </span>
                    {entry.badges_count > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        • {entry.badges_count} badges
                      </span>
                    )}
                  </div>
                </div>

                {/* XP */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-bold text-brand-primary">
                    {entry.total_xp.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No leaderboard data available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
