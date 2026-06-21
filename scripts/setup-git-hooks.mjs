import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();
const hooksPath = path.join(repoRoot, '.husky');

if (!existsSync(hooksPath)) {
  console.warn(`No .husky directory found at ${hooksPath}. Skipping git hook setup.`);
  process.exit(0);
}

const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: repoRoot,
  encoding: 'utf8'
});

if (result.status !== 0) {
  console.warn('Git repository not detected. Skipping repo-local hook bootstrap.');
  process.exit(0);
}

const hookConfig = spawnSync('git', ['config', 'core.hooksPath', '.husky'], {
  cwd: repoRoot,
  encoding: 'utf8'
});

if (hookConfig.status !== 0) {
  console.error(hookConfig.stderr.trim() || 'Failed to set core.hooksPath to .husky.');
  process.exit(hookConfig.status ?? 1);
}

console.log('Configured git core.hooksPath to .husky');
