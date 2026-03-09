import { cmdInit } from './commands/init.js';
import { cmdAdd } from './commands/add.js';
import { cmdRemove } from './commands/remove.js';
import { cmdList } from './commands/list.js';
import { cmdStatus } from './commands/status.js';
import { cmdUpdate } from './commands/update.js';

const HELP = `
operator — install construct modules into any project

Usage:
  npx @ibroai/operator <command> [options]

Commands:
  init                     Install base governance (redpill)
  add <module>             Install a module
  remove <module>          Remove a module from lockfile
  list [--installed]       List available (or installed) modules
  status                   Show install status
  update [module]          Update installed modules

Options:
  --to <path>              Target directory (default: cwd)
  --registry <org/repo>    Override registry source

Module aliases:
  redpill   → ai          kung-fu   → ai-code
  sparring  → ai-collab   oracle    → ai-review
  sentinel  → ai-test     mainframe → ai-spine
  deja-vu   → ai-nmi      architect → ai-infra
  construct → ai-vcon
`;

function parseArgs(argv: string[]): {
  command: string;
  args: string[];
  flags: Record<string, string>;
} {
  const [command = '', ...rest] = argv;
  const args: string[] = [];
  const flags: Record<string, string> = {};

  for (let i = 0; i < rest.length; i++) {
    if (rest[i].startsWith('--')) {
      const key = rest[i].slice(2);
      const value = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : 'true';
      flags[key] = value;
    } else {
      args.push(rest[i]);
    }
  }

  return { command, args, flags };
}

async function main(): Promise<void> {
  const { command, args, flags } = parseArgs(process.argv.slice(2));

  if (!command || command === '--help' || command === 'help') {
    console.log(HELP);
    process.exit(0);
  }

  try {
    switch (command) {
      case 'init':   await cmdInit(args, flags);   break;
      case 'add':    await cmdAdd(args, flags);    break;
      case 'remove': await cmdRemove(args, flags); break;
      case 'list':   await cmdList(args, flags);   break;
      case 'status': await cmdStatus(args, flags); break;
      case 'update': await cmdUpdate(args, flags); break;
      default:
        console.error(`Unknown command: ${command}`);
        console.error(`Run 'operator --help' for usage.`);
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

main();
