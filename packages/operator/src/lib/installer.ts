import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fetchAllFiles, fetchJson } from './github.js';

type ModuleJson = {
  name: string;
  version: string;
  copies: Array<{ from: string; to: string }>;
};

const USER_OWNED_PATTERNS = [
  /^ai\/context\.md$/,
  /^ai\/assumptions\.md$/,
  /^ai\/backlog\.md$/,
  /^ai\/work\//,
];

function isUserOwned(targetRelPath: string): boolean {
  return USER_OWNED_PATTERNS.some((p) => p.test(targetRelPath));
}

export type InstallResult = {
  installed: string[];
  skipped: string[];
};

export async function installModule(
  repo: string,
  ref: string,
  modulePath: string,
  targetDir: string,
): Promise<InstallResult> {
  const moduleJsonUrl = `https://raw.githubusercontent.com/${repo}/${ref}/${modulePath}/module.json`;
  const moduleJson = await fetchJson<ModuleJson>(moduleJsonUrl);

  const installed: string[] = [];
  const skipped: string[] = [];

  for (const copy of moduleJson.copies) {
    const fromPath = `${modulePath}/${copy.from}`;
    const files = await fetchAllFiles(repo, fromPath, ref);

    for (const file of files) {
      const relPath = file.repoPath.slice(fromPath.length + 1);
      const targetRelPath = `${copy.to}/${relPath}`;
      const targetAbsPath = join(targetDir, targetRelPath);

      if (isUserOwned(targetRelPath) && existsSync(targetAbsPath)) {
        console.log(`  skipped (user-owned): ${targetRelPath}`);
        skipped.push(targetRelPath);
        continue;
      }

      mkdirSync(dirname(targetAbsPath), { recursive: true });
      writeFileSync(targetAbsPath, file.content, 'utf-8');
      installed.push(targetRelPath);
    }
  }

  return { installed, skipped };
}
