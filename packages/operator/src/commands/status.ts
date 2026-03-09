import { existsSync } from 'fs';
import { join } from 'path';
import { readLockfile } from '../lib/lockfile.js';

export async function cmdStatus(args: string[], flags: Record<string, string>): Promise<void> {
  const targetDir = flags['to'] ?? process.cwd();

  const lock = readLockfile(targetDir);
  if (!lock) {
    console.log('No .operator.lock.json found. Run: npx @ibroai/operator init');
    return;
  }

  const entries = Object.entries(lock.installed);
  if (entries.length === 0) {
    console.log('No modules installed.');
    return;
  }

  const aiDir = join(targetDir, 'ai');

  for (const [name, version] of entries) {
    const exists = existsSync(aiDir);
    const icon = exists ? '✓' : '✗';
    console.log(`  ${icon}  ${name.padEnd(15)} ${version}`);
  }
}
