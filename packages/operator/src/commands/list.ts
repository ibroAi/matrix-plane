import { fetchRegistry, getAliasFor } from '../lib/registry.js';
import { readLockfile } from '../lib/lockfile.js';

export async function cmdList(args: string[], flags: Record<string, string>): Promise<void> {
  const registryRepo = flags['registry'] ?? 'ibroAi/matrix-plane';
  const showInstalled = 'installed' in flags;
  const targetDir = flags['to'] ?? process.cwd();

  const registry = await fetchRegistry(registryRepo);
  let modules = Object.entries(registry.modules);

  if (showInstalled) {
    const lock = readLockfile(targetDir);
    if (!lock) {
      console.log('No modules installed. Run: npx @ibroai/operator init');
      return;
    }
    modules = modules.filter(([name]) => name in lock.installed);
  }

  for (const [name, entry] of modules) {
    const alias = getAliasFor(name);
    const aliasCol = (alias ?? '').padEnd(12);
    const nameCol = name.padEnd(14);
    console.log(`  ${aliasCol}  ${nameCol}  ${entry.latest}  ${entry.description}`);
  }
}
