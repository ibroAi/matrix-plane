import { fetchRegistry, resolveAlias } from '../lib/registry.js';
import { installModule } from '../lib/installer.js';
import { addToLockfile } from '../lib/lockfile.js';

export async function cmdAdd(args: string[], flags: Record<string, string>): Promise<void> {
  const rawName = args[0];
  if (!rawName) {
    console.error('Usage: operator add <module>');
    process.exit(1);
  }

  const moduleName = resolveAlias(rawName);
  const targetDir = flags['to'] ?? process.cwd();
  const registryRepo = flags['registry'] ?? 'ibroAi/matrix-plane';

  const registry = await fetchRegistry(registryRepo);
  const entry = registry.modules[moduleName];

  if (!entry) {
    const suffix = rawName !== moduleName ? ` (resolved: ${moduleName})` : '';
    console.error(`Unknown module: ${rawName}${suffix}`);
    console.error(`Run 'operator list' to see available modules.`);
    process.exit(1);
  }

  console.log(`Installing ${moduleName}@${entry.latest}...`);

  const result = await installModule(entry.source.repo, entry.source.ref, entry.source.path, targetDir);

  addToLockfile(targetDir, registryRepo, moduleName, entry.latest);

  console.log(`\n✓ ${moduleName}@${entry.latest} installed (${result.installed.length} files)`);
  if (result.skipped.length > 0) {
    console.log(`  ${result.skipped.length} user-owned file(s) skipped`);
  }
}
