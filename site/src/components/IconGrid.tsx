import { useState, useEffect, useRef, useCallback } from 'react';
import { IconImage } from './IconImage';
import type { SelectedIcon } from '../types';

interface IconGridProps {
  setName: string;
  setDisplayName: string;
  icons: string[];
  onSelect: (icon: SelectedIcon) => void;
}

const BATCH_SIZE = 200;

export function IconGrid({ setName, setDisplayName, icons, onSelect }: IconGridProps) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visible count when icons change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [icons]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, icons.length));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [icons.length]);

  const handleClick = useCallback(
    (icon: string) => {
      onSelect({ set: setName, setDisplayName, icon });
    },
    [setName, setDisplayName, onSelect]
  );

  const visibleIcons = icons.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
        {visibleIcons.map((icon) => (
          <button
            key={icon}
            className="icon-card aspect-square p-2 group/icon"
            onClick={() => handleClick(icon)}
            title={icon}
          >
            <IconImage
              set={setName}
              icon={icon}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] font-medium whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
              {icon}
            </div>
          </button>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      {visibleCount < icons.length && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading more icons...
          </div>
        </div>
      )}
    </div>
  );
}
