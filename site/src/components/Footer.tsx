export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Iconista
            </span>
            <span>&mdash; Thousands of SVG icons with one React component</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            <a
              href="https://www.npmjs.com/package/iconista"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              npm
            </a>
            <a
              href="https://github.com/streamich/iconista"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
            <span>Unlicense</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
