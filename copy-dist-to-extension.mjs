// copy-dist-to-extension.mjs

import fs from 'fs/promises';
import path from 'path';

const DIST = './dist';
const EXT = './chrome-extension';

// Helper: recursively copy
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// 1. Copy index.html to tabre.html
await fs.copyFile(path.join(DIST, 'index.html'), path.join(EXT, 'tabre.html'));

// 2. Copy assets folder
const assetsSrc = path.join(DIST, 'assets');
const assetsDest = path.join(EXT, 'assets');

// Remove old assets, if any, then copy
try {
  await fs.rm(assetsDest, { recursive: true, force: true });
} catch {}
await copyDir(assetsSrc, assetsDest);

console.log('Copied Vite build to chrome-extension!');
