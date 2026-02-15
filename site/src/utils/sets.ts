// Sets that contain colorful icons (emoji, brand logos, etc.) that should NOT be inverted in dark mode
const COLORFUL_SETS = new Set([
  'emojione_v2',
  'simple',
  'fontawesome_brands',
  'vscode',
  'vscode_dark',
  'pluralsight_illustrations',
]);

export function isColorfulSet(setName: string): boolean {
  return COLORFUL_SETS.has(setName);
}
