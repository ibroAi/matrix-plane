import { fetchText } from './github.js';

const DEFAULT_REGISTRY_REPO = 'ibroAi/matrix-plane';
const DEFAULT_REGISTRY_PATH = 'packages/construct/registry.json';
const DEFAULT_REGISTRY_REF = 'main';

export const ALIASES: Record<string, string> = {
  redpill: 'ai',
  'kung-fu': 'ai-code',
  sparring: 'ai-collab',
  oracle: 'ai-review',
  sentinel: 'ai-test',
  mainframe: 'ai-spine',
  'deja-vu': 'ai-nmi',
  architect: 'ai-infra',
  construct: 'ai-vcon',
};

export type RegistrySource = {
  type: 'github';
  repo: string;
  ref: string;
  path: string;
};

export type RegistryEntry = {
  latest: string;
  description: string;
  source: RegistrySource;
};

export type Registry = {
  name: string;
  default: string;
  modules: Record<string, RegistryEntry>;
};

export function resolveAlias(name: string): string {
  return ALIASES[name] ?? name;
}

export function getAliasFor(name: string): string | undefined {
  return Object.entries(ALIASES).find(([, v]) => v === name)?.[0];
}

export async function fetchRegistry(registryRepo = DEFAULT_REGISTRY_REPO): Promise<Registry> {
  const url = `https://raw.githubusercontent.com/${registryRepo}/${DEFAULT_REGISTRY_REF}/${DEFAULT_REGISTRY_PATH}`;
  const text = await fetchText(url);
  return JSON.parse(text) as Registry;
}
