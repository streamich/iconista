import { useState } from 'react';
import { getIconUrl } from '../utils/cdn';
import { isColorfulSet } from '../utils/sets';

interface IconImageProps {
  set: string;
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

export function IconImage({ set, icon, className = '', style }: IconImageProps) {
  const [error, setError] = useState(false);
  const colorful = isColorfulSet(set);
  const url = getIconUrl(set, icon);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center text-gray-300 dark:text-gray-600 ${className}`}
        style={style}
        title={`${icon} (failed to load)`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={icon}
      className={`object-contain ${colorful ? '' : 'dark:invert dark:opacity-90'} ${className}`}
      style={style}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
