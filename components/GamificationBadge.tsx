import React from 'react';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { Badge as BadgeType } from '../types';

interface GamificationBadgeProps {
  badge: BadgeType;
  earned?: boolean;
  earnedAt?: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const GamificationBadge: React.FC<GamificationBadgeProps> = ({
  badge,
  earned = false,
  earnedAt,
  size = 'md',
  showTooltip = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityGlow = {
    common: 'shadow-gray-400/50',
    rare: 'shadow-blue-500/50',
    epic: 'shadow-purple-500/50',
    legendary: 'shadow-yellow-500/50',
  };

  const getRarityIcon = () => {
    switch (badge.rarity) {
      case 'legendary':
        return <Trophy className="w-full h-full" />;
      case 'epic':
        return <Star className="w-full h-full" />;
      case 'rare':
        return <Award className="w-full h-full" />;
      default:
        return <Zap className="w-full h-full" />;
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Badge Container */}
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${
          rarityColors[badge.rarity]
        } ${earned ? `shadow-lg ${rarityGlow[badge.rarity]}` : 'grayscale opacity-50'} 
        flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer`}
      >
        {/* Badge Icon/Emoji */}
        <div className="text-white p-2">
          {badge.icon ? (
            <div className="text-2xl md:text-3xl lg:text-4xl">{badge.icon}</div>
          ) : (
            getRarityIcon()
          )}
        </div>

        {/* Earned Indicator */}
        {earned && (
          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-gray-800">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Rarity Indicator */}
        {badge.rarity === 'legendary' && earned && (
          <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-400/20"></div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg p-3 shadow-xl min-w-[200px] max-w-[300px]">
            {/* Badge Name */}
            <div className="font-bold mb-1 flex items-center gap-2">
              <span>{badge.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  badge.rarity === 'legendary'
                    ? 'bg-yellow-500 text-black'
                    : badge.rarity === 'epic'
                    ? 'bg-purple-500'
                    : badge.rarity === 'rare'
                    ? 'bg-blue-500'
                    : 'bg-gray-500'
                }`}
              >
                {badge.rarity}
              </span>
            </div>

            {/* Badge Description */}
            <div className="text-gray-300 dark:text-gray-400 text-xs mb-2">
              {badge.description}
            </div>

            {/* XP Reward */}
            <div className="text-yellow-400 text-xs font-semibold">
              +{badge.xp_reward} XP
            </div>

            {/* Earned Date */}
            {earned && earnedAt && (
              <div className="text-green-400 text-xs mt-2 pt-2 border-t border-gray-700">
                Earned: {new Date(earnedAt).toLocaleDateString()}
              </div>
            )}

            {/* Not Earned */}
            {!earned && (
              <div className="text-gray-400 text-xs mt-2 pt-2 border-t border-gray-700">
                🔒 Not yet earned
              </div>
            )}

            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-8 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationBadge;
