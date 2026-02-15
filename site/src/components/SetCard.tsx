import { IconImage } from './IconImage';
import type { IconSet } from '../types';

interface SetCardProps {
  set: IconSet;
  onClick: () => void;
}

export function SetCard({ set, onClick }: SetCardProps) {
  return (
    <div className="set-card group" onClick={onClick}>
      {/* Icon preview grid */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {set.previewIcons.slice(0, 18).map((icon) => (
          <div
            key={icon}
            className="aspect-square flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50 p-1.5"
          >
            <IconImage
              set={set.name}
              icon={icon}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Set info */}
      <div className="flex items-end justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
            {set.displayName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {set.iconCount.toLocaleString()} icons
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/0 to-gray-100/0 group-hover:from-gray-50/50 group-hover:to-gray-100/50 dark:group-hover:from-gray-800/20 dark:group-hover:to-gray-700/20 transition-all duration-300 pointer-events-none" />
    </div>
  );
}
