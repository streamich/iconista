import { useState, useEffect, useCallback } from 'react';
import { getIconUrl, getCdnUrl, getReactCode, getImgTagCode } from '../utils/cdn';
import { copyToClipboard } from '../utils/clipboard';
import { IconImage } from './IconImage';
import type { SelectedIcon } from '../types';

interface IconDetailProps {
  icon: SelectedIcon;
  onClose: () => void;
  onToast: (message: string) => void;
}

type Tab = 'react' | 'svg' | 'cdn' | 'img';

export function IconDetail({ icon, onClose, onToast }: IconDetailProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('react');
  const [previewSize, setPreviewSize] = useState(64);

  const url = getIconUrl(icon.set, icon.icon);
  const cdnUrl = getCdnUrl(icon.set, icon.icon);

  // Fetch SVG content
  useEffect(() => {
    setSvgContent(null);
    fetch(url)
      .then((r) => r.text())
      .then(setSvgContent)
      .catch(() => setSvgContent(null));
  }, [url]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCopy = useCallback(
    async (text: string, label: string) => {
      const ok = await copyToClipboard(text);
      onToast(ok ? `${label} copied!` : 'Copy failed');
    },
    [onToast]
  );

  const getCodeForTab = (): string => {
    switch (activeTab) {
      case 'react':
        return getReactCode(icon.set, icon.icon);
      case 'svg':
        return svgContent || 'Loading...';
      case 'cdn':
        return cdnUrl;
      case 'img':
        return getImgTagCode(icon.set, icon.icon);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'react', label: 'React' },
    { key: 'svg', label: 'SVG' },
    { key: 'cdn', label: 'CDN URL' },
    { key: 'img', label: 'IMG Tag' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-white dark:bg-gray-900 sm:rounded-2xl rounded-t-2xl shadow-2xl slide-up overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Preview area */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center w-28 h-28 rounded-2xl bg-gray-50 dark:bg-gray-800 mb-4">
            <IconImage
              set={icon.set}
              icon={icon.icon}
              className="transition-all"
              style={{ width: previewSize, height: previewSize }}
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {icon.icon}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {icon.setDisplayName}
          </p>

          {/* Size slider */}
          <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
            <span>16</span>
            <input
              type="range"
              min="16"
              max="128"
              value={previewSize}
              onChange={(e) => setPreviewSize(Number(e.target.value))}
              className="w-32 accent-indigo-500"
            />
            <span>128</span>
          </div>
        </div>

        {/* Code section */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code block */}
          <div className="relative group/code">
            <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto max-h-40">
              <code>{getCodeForTab()}</code>
            </pre>
            <button
              onClick={() => handleCopy(getCodeForTab(), tabs.find((t) => t.key === activeTab)!.label)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 opacity-0 group-hover/code:opacity-100 transition-all shadow-sm"
              title="Copy to clipboard"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleCopy(svgContent || '', 'SVG')}
              className="copy-btn flex-1 justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy SVG
            </button>
            <button
              onClick={() => handleCopy(cdnUrl, 'CDN URL')}
              className="copy-btn flex-1 justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Copy URL
            </button>
            <a
              href={url}
              download={`${icon.icon}.svg`}
              className="copy-btn flex-1 justify-center"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
