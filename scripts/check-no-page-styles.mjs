import { readdir } from 'node:fs/promises';
import path from 'node:path';

const banned = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (entry.name === 'page.module.css' || entry.name === 'page.css') {
      banned.push(fullPath);
    }
  }
}

await walk(path.join(process.cwd(), 'src', 'app'));

if (banned.length > 0) {
  console.error('Page-owned style files are not allowed:', banned);
  process.exit(1);
}
