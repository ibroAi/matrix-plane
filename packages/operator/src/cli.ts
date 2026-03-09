/**
 * ibro (MVP scaffold)
 * Behavior contract: ../COMMAND_CONTRACT.md
 *
 * NOTE: This file is intentionally a scaffold for init commit.
 * Implement commands later.
 */
function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.length === 0) {
    console.log("ibro (MVP scaffold). See COMMAND_CONTRACT.md for the command contract.");
    console.log("Planned commands: init, add <module>, list, (optional) update");
    process.exit(0);
  }

  console.log("ibro (MVP scaffold). Not implemented yet.");
  console.log("See COMMAND_CONTRACT.md and implement the commands.");
  process.exit(0);
}

main();
