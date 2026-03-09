import { resolveAlias } from '../lib/registry.js';
import { readLockfile, removeFromLockfile } from '../lib/lockfile.js';

export async function cmdRemove(args: string[], flags: Record<string, string>): Promise<void> {
  const rawName = args[0];
  if (!rawName) {
    console.error('Usage: operator remove <module>');
    process.exit(1);
  }

  const moduleName = resolveAlias(rawName);
  const targetDir = flags['to'] ?? process.cwd();

  const lock = readLockfile(targetDir);
  if (!lock || !lock.installed[moduleName]) {
    console.error(`Module '${moduleName}' is not installed.`);
    process.exit(1);
  }

  removeFromLockfile(targetDir, moduleName);

  console.log(`✓ ${moduleName} removed from lockfile.`);
  console.log(`  Note: files in ai/ were not deleted (may contain your changes).`);
}
