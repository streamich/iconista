import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const setsDir = path.resolve(__dirname, '../../sets');
const outDir = path.resolve(__dirname, '../src/data');

// Display names for icon sets
const setDisplayNames = {
  ant_fill: 'Ant Design Filled',
  ant_outline: 'Ant Design Outlined',
  ant_twotone: 'Ant Design Two Tone',
  atlaskit: 'Atlassian Atlaskit',
  auth0: 'Auth0',
  bootstrap: 'Bootstrap Icons',
  elastic: 'Elastic UI',
  emojione_v2: 'EmojiOne v2',
  fontawesome_brands: 'Font Awesome Brands',
  fontawesome_regular: 'Font Awesome Regular',
  fontawesome_solid: 'Font Awesome Solid',
  ibm_16: 'IBM Carbon 16px',
  ibm_32: 'IBM Carbon 32px',
  lineicons: 'LineIcons',
  lucide: 'Lucide',
  pluralsight: 'Pluralsight',
  pluralsight_illustrations: 'Pluralsight Illustrations',
  radix: 'Radix Icons',
  simple: 'Simple Icons',
  tabler: 'Tabler Icons',
  tabler_filled: 'Tabler Icons Filled',
  vscode: 'VS Code Icons',
  vscode_dark: 'VS Code Dark Icons',
};

// Read the sets index
const setsIndex = JSON.parse(fs.readFileSync(path.join(setsDir, 'index.json'), 'utf-8'));

const manifest = {
  sets: [],
  totalIcons: 0,
};

for (const setName of setsIndex) {
  const setIndexPath = path.join(setsDir, setName, 'index.json');
  if (!fs.existsSync(setIndexPath)) {
    console.warn(`Skipping ${setName}: no index.json found`);
    continue;
  }

  const icons = JSON.parse(fs.readFileSync(setIndexPath, 'utf-8'));

  manifest.sets.push({
    name: setName,
    displayName: setDisplayNames[setName] || setName,
    iconCount: icons.length,
    // Include a subset for preview on the sets listing page
    previewIcons: icons.slice(0, 30),
    icons: icons,
  });

  manifest.totalIcons += icons.length;
}

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Write the manifest
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(manifest),
  'utf-8'
);

console.log(`Generated manifest: ${manifest.sets.length} sets, ${manifest.totalIcons} icons`);
