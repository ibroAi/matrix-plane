import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const LOCKFILE_NAME = '.operator.lock.json';

export type LockFile = {
  registry: string;
  installed: Record<string, string>;
};

export function readLockfile(targetDir: string): LockFile | null {
  const path = join(targetDir, LOCKFILE_NAME);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8')) as LockFile;
}

export function writeLockfile(targetDir: string, lock: LockFile): void {
  const path = join(targetDir, LOCKFILE_NAME);
  writeFileSync(path, JSON.stringify(lock, null, 2) + '\n', 'utf-8');
}

export function addToLockfile(
  targetDir: string,
  registry: string,
  moduleName: string,
  version: string,
): void {
  const existing = readLockfile(targetDir);
  const lock: LockFile = existing ?? { registry, installed: {} };
  lock.installed[moduleName] = version;
  writeLockfile(targetDir, lock);
}

export function removeFromLockfile(targetDir: string, moduleName: string): void {
  const lock = readLockfile(targetDir);
  if (!lock) return;
  delete lock.installed[moduleName];
  writeLockfile(targetDir, lock);
}
