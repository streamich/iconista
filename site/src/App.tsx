import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { SetCard } from './components/SetCard';
import { IconGrid } from './components/IconGrid';
import { IconDetail } from './components/IconDetail';
import { SearchResults } from './components/SearchResults';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { useToast } from './hooks/useToast';
import manifest from './data/manifest.json';
import type { Manifest, SelectedIcon, IconSet } from './types';

const data = manifest as Manifest;

// Build a lookup map for sets
const setMap = new Map<string, IconSet>();
for (const s of data.sets) {
  setMap.set(s.name, s);
}

function getSetFromHash(): IconSet | null {
  const hash = window.location.hash.slice(1); // remove #
  if (hash && setMap.has(hash)) {
    return setMap.get(hash)!;
  }
  return null;
}

export default function App() {
  const [dark, toggleDark] = useDarkMode();
  const { toasts, show: showToast } = useToast();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 150);
  const [activeSet, setActiveSet] = useState<IconSet | null>(getSetFromHash);
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon | null>(null);

  // Sync hash with activeSet
  useEffect(() => {
    const handler = () => {
      const set = getSetFromHash();
      setActiveSet(set);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const handleBack = useCallback(() => {
    window.location.hash = '';
    setActiveSet(null);
    setQuery('');
  }, []);

  const handleSelectSet = useCallback((set: IconSet) => {
    window.location.hash = set.name;
    setActiveSet(set);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectIcon = useCallback((icon: SelectedIcon) => {
    setSelectedIcon(icon);
  }, []);

  const handleNavigateToSet = useCallback((setName: string) => {
    const set = setMap.get(setName);
    if (set) handleSelectSet(set);
  }, [handleSelectSet]);

  const isSearching = query.length > 0;
  const hasResults = debouncedQuery.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header
        query={query}
        onQueryChange={setQuery}
        dark={dark}
        onToggleDark={toggleDark}
        totalIcons={data.totalIcons}
        activeSet={activeSet?.name ?? null}
        onBack={handleBack}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Search results view */}
        {isSearching && (
          <SearchResults
            manifest={data}
            query={debouncedQuery}
            onSelect={handleSelectIcon}
            onNavigateToSet={handleNavigateToSet}
          />
        )}

        {/* Set browser view */}
        {!isSearching && activeSet && (
          <div className="fade-in">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {activeSet.displayName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeSet.iconCount.toLocaleString()} icons &middot; Click any icon to copy
                </p>
              </div>
              <button
                onClick={handleBack}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                All sets
              </button>
            </div>
            <IconGrid
              setName={activeSet.name}
              setDisplayName={activeSet.displayName}
              icons={activeSet.icons}
              onSelect={handleSelectIcon}
            />
          </div>
        )}

        {/* Sets listing view */}
        {!isSearching && !activeSet && (
          <div className="fade-in">
            {/* Hero */}
            <div className="text-center mb-12 pt-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                <span className="text-gray-900 dark:text-white">
                  {data.totalIcons.toLocaleString()}
                </span>{' '}
                beautiful icons
              </h1>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Browse {data.sets.length} popular icon sets. Search, preview, and copy SVG, React
                components, or CDN URLs in one click.
              </p>

              {/* Quick stats */}
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {data.sets.length} sets
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pure SVG
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  CDN powered
                </div>
              </div>

              {/* npm install */}
              <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-800 text-gray-300 text-sm font-mono shadow-lg">
                <span className="text-green-400 select-none">$</span>
                <span>npm i iconista</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('npm i iconista');
                    showToast('Command copied!');
                  }}
                  className="ml-1 p-1 rounded-md text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sets grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.sets.map((set) => (
                <SetCard
                  key={set.name}
                  set={set}
                  onClick={() => handleSelectSet(set)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Icon detail modal */}
      {selectedIcon && (
        <IconDetail
          icon={selectedIcon}
          onClose={() => setSelectedIcon(null)}
          onToast={showToast}
        />
      )}

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
