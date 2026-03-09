# ibro-cli

**A framework-style CLI to bootstrap AI-aware projects — with structure, rules, and zero bullshit.**

ibro-cli helps you start projects where AI is treated as a *collaborator*, not a magic box.

No prompt chaos.
No hidden assumptions.
No hand-wavy automation.

Just structure, intent, and control.

---

## What this is

`ibro-cli` is a CLI tool that sets up a **governed AI workspace** inside any project.

It gives you:
- a clear `/ai` folder
- explicit rules for AI behavior
- reproducible structure
- predictable collaboration with AI

This is not an AI agent.
This is not an abstraction layer.

It's a **foundation** for working with AI in a controlled, transparent way.

---

## What this is NOT

- ❌ Not a prompt library
- ❌ Not an AI wrapper
- ❌ Not an automation framework
- ❌ Not "AI magic"

If you want the AI to *decide for you*, this is not it.

If you want **clarity, structure, and control**, you're in the right place.

---

## Modules

ibro-cli installs modules from **construct** (`@minion-protocol/construct`):

- `ai` — universal AI governance folder
- `ai-code` — code-repo add-on
- `ai-nmi` — Narrative Memory Injection

Registry source: `ibroAi/construct` (GitHub, fetched at runtime)

---

## Package (monorepo)

**Package:** `@minion-protocol/ibro-cli`
**Binary:** `ibro`
**Location:** `packages/minion-protocol/clis/ibro-cli`

```bash
# Build
npm run build -w @minion-protocol/ibro-cli

# Dev (watch mode)
npm run dev -w @minion-protocol/ibro-cli

# Smoke test
node packages/minion-protocol/clis/ibro-cli/dist/cli.js --help
```

**Dependencies:** zero runtime deps (intentional design decision)

---

## Package structure

```
packages/minion-protocol/clis/ibro-cli/
├── src/
│   └── cli.ts               # Main entry point (MVP scaffold)
├── docs/
│   ├── CLI_CONTRACT.md      # Behavioral contract for all commands
│   ├── BACKLOG.md
│   ├── MENTAL_MODEL.md
│   ├── ROADMAP.md
│   ├── REPO_SPEC.md
│   └── releases/v0.1/
│       └── SCOPE.md
├── package.json
├── tsconfig.json
└── README.md
```

---

## Core idea

Most AI projects fail because:
- context is implicit
- rules live in people's heads
- prompts get copied without understanding
- nobody knows what the AI was allowed to assume

`ibro-cli` fixes that by making everything explicit.

You don't *ask* the AI.
You **work with it**.

---

## Project status

🚧 **Early stage (v0.1 mindset)**

MVP scaffold — commands specified in `docs/CLI_CONTRACT.md`, implementation in progress.

See `docs/ROADMAP.md` and `docs/BACKLOG.md` for planned work.

---

## Philosophy

- Structure > cleverness
- Explicit > implicit
- Reproducible > magical
- Human stays in control

If a feature adds confusion, it doesn't belong here.

---

## License

MIT

