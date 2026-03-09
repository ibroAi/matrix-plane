import { fetchRegistry, resolveAlias } from '../lib/registry.js';
import { readLockfile, addToLockfile } from '../lib/lockfile.js';
import { installModule } from '../lib/installer.js';

export async function cmdUpdate(args: string[], flags: Record<string, string>): Promise<void> {
  const targetDir = flags['to'] ?? process.cwd();
  const registryRepo = flags['registry'] ?? 'ibroAi/matrix-plane';

  const lock = readLockfile(targetDir);
  if (!lock) {
    console.error('No .operator.lock.json found. Run: npx @ibroai/operator init');
    process.exit(1);
  }

  const registry = await fetchRegistry(registryRepo);
  const toUpdate = args[0] ? [resolveAlias(args[0])] : Object.keys(lock.installed);

  for (const moduleName of toUpdate) {
    const entry = registry.modules[moduleName];
    if (!entry) {
      console.error(`Unknown module: ${moduleName} — skipping`);
      continue;
    }

    console.log(`Updating ${moduleName}@${entry.latest}...`);
    const result = await installModule(entry.source.repo, entry.source.ref, entry.source.path, targetDir);
    addToLockfile(targetDir, registryRepo, moduleName, entry.latest);
    console.log(`  ✓ ${moduleName}@${entry.latest} (${result.installed.length} files updated)`);
  }
}
