import { fetchRegistry } from '../lib/registry.js';
import { installModule } from '../lib/installer.js';
import { addToLockfile } from '../lib/lockfile.js';

export async function cmdInit(args: string[], flags: Record<string, string>): Promise<void> {
  const targetDir = flags['to'] ?? process.cwd();
  const registryRepo = flags['registry'] ?? 'ibroAi/matrix-plane';

  const registry = await fetchRegistry(registryRepo);
  const defaultModule = registry.default;
  const entry = registry.modules[defaultModule];

  if (!entry) throw new Error(`Default module '${defaultModule}' not found in registry`);

  console.log(`Initializing with '${defaultModule}' module...`);

  const result = await installModule(entry.source.repo, entry.source.ref, entry.source.path, targetDir);

  addToLockfile(targetDir, registryRepo, defaultModule, entry.latest);

  console.log(`\n✓ ${defaultModule}@${entry.latest} installed (${result.installed.length} files)`);
  console.log(`\nNext:`);
  console.log(`  npx @ibroai/operator add kung-fu     # code rules`);
  console.log(`  npx @ibroai/operator list            # see all modules`);
}
