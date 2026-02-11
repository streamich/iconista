import { useMemo } from 'react';
import { IconGrid } from './IconGrid';
import type { Manifest, SelectedIcon } from '../types';

interface SearchResultsProps {
  manifest: Manifest;
  query: string;
  onSelect: (icon: SelectedIcon) => void;
}

interface SearchResult {
  setName: string;
  setDisplayName: string;
  icons: string[];
}

export function SearchResults({ manifest, query, onSelect }: SearchResultsProps) {
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const out: SearchResult[] = [];

    for (const set of manifest.sets) {
      // Check if query matches set name
      const setMatches =
        set.name.toLowerCase().includes(q) ||
        set.displayName.toLowerCase().includes(q);

      if (setMatches) {
        // Show all icons in matching set
        out.push({
          setName: set.name,
          setDisplayName: set.displayName,
          icons: set.icons,
        });
      } else {
        // Filter icons by name
        const matchingIcons = set.icons.filter((icon) =>
          icon.toLowerCase().includes(q)
        );
        if (matchingIcons.length > 0) {
          out.push({
            setName: set.name,
            setDisplayName: set.displayName,
            icons: matchingIcons,
          });
        }
      }
    }

    return out;
  }, [manifest, query]);

  const totalMatches = results.reduce((acc, r) => acc + r.icons.length, 0);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500">
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-lg font-medium">No icons found</p>
        <p className="text-sm mt-1">
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {totalMatches.toLocaleString()} icon{totalMatches !== 1 ? 's' : ''} found across {results.length} set{results.length !== 1 ? 's' : ''}
      </p>

      {results.map((result) => (
        <div key={result.setName}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            {result.setDisplayName}
            <span className="text-xs font-normal text-gray-400 dark:text-gray-500">
              {result.icons.length.toLocaleString()} match{result.icons.length !== 1 ? 'es' : ''}
            </span>
          </h3>
          <IconGrid
            setName={result.setName}
            setDisplayName={result.setDisplayName}
            icons={result.icons}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
