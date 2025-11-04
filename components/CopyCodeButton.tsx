import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

interface CopyCodeButtonProps {
  code: string;
  language?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CopyCodeButton: React.FC<CopyCodeButtonProps> = ({
  code,
  language,
  className = '',
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <button
      onClick={handleCopy}
      className={`${sizeClasses[size]} ${className} flex items-center gap-2 rounded-md transition-all duration-200 ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
      }`}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <Check size={iconSizes[size]} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={iconSizes[size]} />
          <span>Copy</span>
        </>
      )}
      {language && !copied && (
        <span className="ml-1 opacity-70 text-xs uppercase">{language}</span>
      )}
    </button>
  );
};

export default CopyCodeButton;
