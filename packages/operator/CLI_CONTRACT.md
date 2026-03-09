# operator — CLI Contract

The behavioral contract for `@ibroai/operator`.
Defines what each command does, inputs/outputs, and safety rules.
Implementation details are out of scope.

---

## Usage

```bash
npx @ibroai/operator <command> [options]
```

---

## Global Rules

### Working directory
All commands operate relative to **current working directory** unless `--to <path>` is provided.

### Registry
Default registry: `ibroAi/matrix-plane` → `packages/construct/registry.json`
Override with `--registry <org/repo>`.

### Lockfile
After any install/add/update/remove operation, operator writes/updates:
```
.operator.lock.json
```

**Schema:**
```json
{
  "registry": "ibroAi/matrix-plane",
  "installed": {
    "ai": "0.1.0",
    "ai-code": "0.1.0"
  }
}
```

### Overwrite policy

**Never overwrite (user-owned):**
- `ai/context.md`
- `ai/assumptions.md`
- `ai/backlog.md`
- `ai/work/**`

**Always overwrite (framework-owned):**
- `ai/governance/**`
- `ai/templates/**`
- `ai/<module>/**`

Skipped files print: `skipped (user-owned): ai/context.md`

### Exit codes
- `0` success
- `1` failure (network, permissions, unknown module, invalid args)

---

## Module Aliases

Matrix-themed aliases resolve to real module names:

```
redpill   → ai
kung-fu   → ai-code
sparring  → ai-collab
oracle    → ai-review
sentinel  → ai-test
mainframe → ai-spine
deja-vu   → ai-nmi
architect → ai-infra
construct → ai-vcon
```

All commands accept both the real name and the alias.

---

## Commands

### `operator init`

```bash
npx @ibroai/operator init [--to <path>] [--registry <org/repo>]
```

1. Determine target root (`cwd` or `--to`)
2. Resolve registry
3. Install default module (`ai` / redpill)
4. Apply overwrite policy
5. Write `.operator.lock.json`
6. Print next steps

---

### `operator add <module>`

```bash
npx @ibroai/operator add <module> [--to <path>] [--registry <org/repo>]
```

1. Resolve alias if needed
2. Validate module exists in registry
3. Download module payload from GitHub
4. Copy files per module `copies` spec
5. Apply overwrite policy
6. Update `.operator.lock.json`
7. Print summary + skipped files

---

### `operator remove <module>`

```bash
npx @ibroai/operator remove <module> [--to <path>]
```

1. Resolve alias if needed
2. Validate module is installed (check lockfile)
3. Remove **framework-owned files only** for that module
4. Never touch user-owned files
5. Update `.operator.lock.json`

---

### `operator list`

```bash
npx @ibroai/operator list [--registry <org/repo>] [--installed]
```

- Default: all available modules from registry (name, alias, version, description)
- `--installed`: only modules in `.operator.lock.json`

**Output format:**
```
redpill   (ai)         0.1.0  Universal AI governance folder
kung-fu   (ai-code)    0.1.0  Code rules, review checklist
oracle    (ai-review)  0.1.0  Reviewer-builder governance
...
```

---

### `operator status`

```bash
npx @ibroai/operator status [--to <path>]
```

Compares `.operator.lock.json` against files on disk.

**Output:**
```
✓ ai          0.1.0  installed
✓ ai-code     0.1.0  installed
✗ ai-review   —      missing files
```

---

### `operator update [module]`

```bash
npx @ibroai/operator update [module] [--to <path>] [--registry <org/repo>]
```

- Without module: re-apply all installed modules at registry latest
- With module: update that module only
- Respects overwrite policy
- Updates `.operator.lock.json`

---

## Not in scope (MVP)

- No version pinning (always `latest`)
- No offline mode
- No private registries
- No interactive prompts
