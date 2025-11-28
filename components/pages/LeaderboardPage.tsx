import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Zap, Target } from 'lucide-react';
import Leaderboard from '../Leaderboard';
import usePageTitle from '../usePageTitle';
import CodingBackground from '../CodingBackground';
import RevealOnScroll from '../RevealOnScroll';

const LeaderboardPage: React.FC = () => {
  usePageTitle("Leaderboard - Top Contributors");
  const [activeTab, setActiveTab] = useState<'all' | 'week' | 'month'>('all');

  const stats = [
    { 
      icon: Users, 
      label: 'Total Contributors', 
      value: '1,250+', 
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    { 
      icon: Trophy, 
      label: 'Active This Month', 
      value: '456', 
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900'
    },
    { 
      icon: Zap, 
      label: 'Total XP Earned', 
      value: '2.5M+', 
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    { 
      icon: Target, 
      label: 'Badges Awarded', 
      value: '3,420', 
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark-gray relative">
      <CodingBackground 
        intensity="low" 
        style="binary"
        className="absolute inset-0 z-0"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <RevealOnScroll direction="down" duration={800}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-brand-primary mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Leaderboard
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Celebrating our most active and engaged community members. Earn XP by contributing articles, 
              completing courses, participating in events, and helping others!
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats Cards */}
        <RevealOnScroll direction="up" delay={200} duration={800}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* How to Earn XP Section */}
        <RevealOnScroll direction="up" delay={400} duration={800}>
          <div className="bg-gradient-to-r from-brand-primary to-brand-ninja-gold rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2" />
              How to Earn XP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">📝 Write Articles</h3>
                <p className="text-white/90 text-sm">Share your knowledge and earn 100-500 XP per article</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🎓 Complete Courses</h3>
                <p className="text-white/90 text-sm">Finish courses to earn 50-200 XP per completion</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🎯 Join Events</h3>
                <p className="text-white/90 text-sm">Participate in hackathons and events for 200+ XP</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">💬 Help Others</h3>
                <p className="text-white/90 text-sm">Answer questions and get upvotes for 10-50 XP</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🔥 Daily Streak</h3>
                <p className="text-white/90 text-sm">Login daily to maintain streak and earn bonus XP</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">🏆 Earn Badges</h3>
                <p className="text-white/90 text-sm">Complete achievements for special badges and XP</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Leaderboard Section */}
        <RevealOnScroll direction="up" delay={600} duration={800}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-brand-primary" />
                Top Contributors
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                See where you rank among the community's most active members
              </p>
            </div>
            
            <div className="p-6">
              <Leaderboard limit={50} showCurrentUser={true} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Motivation Section */}
        <RevealOnScroll direction="up" delay={800} duration={800}>
          <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <Medal className="w-16 h-16 text-brand-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Climb the Ranks?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Every contribution counts! Start sharing your knowledge, helping others, and 
              participating in our community to earn XP and unlock exclusive badges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/articles"
                className="bg-brand-primary hover:bg-brand-ninja-gold text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Write an Article
              </a>
              <a
                href="/events"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Join an Event
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default LeaderboardPage;
