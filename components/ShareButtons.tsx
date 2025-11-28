import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, MessageCircle, Send, Link as LinkIcon, Check } from 'lucide-react';
import { getShareUrl, copyToClipboard } from '../utils/helpers';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  showLabel?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description,
  className = '',
  showLabel = true,
  orientation = 'horizontal',
  size = 'md',
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram') => {
    const url = getShareUrl(platform, shareUrl, title);
    window.open(url, '_blank', 'width=600,height=400');
    setShowDropdown(false);
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowDropdown(false);
      }, 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
        setShowDropdown(false);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const shareButtons = [
    { platform: 'twitter' as const, icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-400' },
    { platform: 'facebook' as const, icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
    { platform: 'linkedin' as const, icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
    { platform: 'whatsapp' as const, icon: MessageCircle, label: 'WhatsApp', color: 'hover:bg-green-500' },
    { platform: 'telegram' as const, icon: Send, label: 'Telegram', color: 'hover:bg-blue-500' },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-all duration-200 hover:scale-110`}
        aria-label="Share"
        title="Share"
      >
        <Share2 size={iconSizes[size]} />
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown Content */}
          <div className={`absolute ${orientation === 'vertical' ? 'top-full mt-2' : 'left-full ml-2'} z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]`}>
            <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Share this {description || 'content'}
              </p>
            </div>

            {/* Share Buttons */}
            <div className={`flex ${orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-wrap gap-2'}`}>
              {shareButtons.map(({ platform, icon: Icon, label, color }) => (
                <button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  className={`flex items-center ${orientation === 'vertical' ? 'w-full justify-start' : 'justify-center'} px-3 py-2 rounded-md text-white ${color} transition-all duration-200 hover:scale-105`}
                  aria-label={`Share on ${label}`}
                  title={`Share on ${label}`}
                >
                  <Icon size={iconSizes[size] - 4} />
                  {showLabel && orientation === 'vertical' && (
                    <span className="ml-2 text-sm">{label}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Native Share (Mobile) */}
            {navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full mt-2 flex items-center justify-center px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
                aria-label="Share via..."
              >
                <Share2 size={iconSizes[size] - 4} />
                <span className="ml-2 text-sm">More options</span>
              </button>
            )}

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className={`w-full mt-2 flex items-center justify-center px-3 py-2 rounded-md transition-all duration-200 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label="Copy link"
            >
              {copied ? (
                <>
                  <Check size={iconSizes[size] - 4} />
                  <span className="ml-2 text-sm">Link copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon size={iconSizes[size] - 4} />
                  <span className="ml-2 text-sm">Copy link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButtons;
