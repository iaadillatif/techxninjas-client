import React from 'react';
import { Clock } from 'lucide-react';
import { calculateReadingTime, formatReadingTime } from '../utils/helpers';

interface ReadingTimeProps {
  content: string;
  className?: string;
  showIcon?: boolean;
  wordsPerMinute?: number;
}

const ReadingTime: React.FC<ReadingTimeProps> = ({
  content,
  className = '',
  showIcon = true,
  wordsPerMinute = 200,
}) => {
  const minutes = calculateReadingTime(content, wordsPerMinute);
  const formattedTime = formatReadingTime(minutes);

  return (
    <div className={`flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {showIcon && <Clock size={16} className="flex-shrink-0" />}
      <span>{formattedTime}</span>
    </div>
  );
};

export default ReadingTime;
