# ibro — Command Contract (MVP)

This document is the **behavioral contract** for the `ibro` CLI.
It defines **what each command must do**, **inputs/outputs**, and **safety rules**.
Implementation details are intentionally out of scope.

---

## Global Rules

### Project root
- All commands operate relative to **current working directory** unless `--to <path>` is provided.

### Registry
- CLI reads module metadata from the **ai-kit registry**:
  - default registry: `ibroAi/ai-kit`
  - registry file: `registry.json`

### Target paths
- Modules are copied into the target project (default `.`).
- Standard install root inside target project: `./ai`

### Lockfile
- After any install/add/update operation, CLI must write/update:
  - `./.ibro.lock.json` in the target project root.

**Lockfile schema (MVP):**
```json
{
  "registry": "ibroAi/ai-kit",
  "installed": {
    "ai": "0.1.0",
    "ai-code": "0.1.0"
  }
}
```

### Safety / overwrite policy (MVP)
**Overwrite allowed (managed by ibro):**
- `ai/governance/**`
- `ai/templates/**`

**Never overwrite (user-owned):**
- `ai/context.md`
- `ai/assumptions.md`
- `ai/backlog.md`
- `ai/work/**`

If a file is user-owned and exists:
- keep existing file
- print a warning: `skipped user-owned file: <path>`

### Exit codes (MVP)
- `0` success
- `1` generic failure (network, permissions, invalid args, unknown module, etc.)

---

## Command: `ibro init`

### Syntax
```bash
ibro init [--to <path>] [--registry <org/repo>]
```

### Behavior
1. Determine target project root:
   - default: current directory
   - if `--to`: use that path
2. Resolve registry:
   - default: `ibroAi/ai-kit`
   - if `--registry`: override for this run (and store in lockfile)
3. Install **default module** from registry (registry `"default"` key, expected to be `"ai"` in MVP)
4. Copy module payload into target project:
   - `payload/ai` → `./ai`
5. Apply overwrite policy (see Global Rules).
6. Write/update `.ibro.lock.json`.
7. Print next steps:
   - `ibro add ai-code`
   - `ibro list`

---

## Command: `ibro add`

### Syntax
```bash
ibro add <module> [--to <path>] [--registry <org/repo>]
```

### Behavior
1. Validate `<module>` exists in registry.
2. Download/read module definition.
3. Copy module payload according to module `copies` mapping.
4. Apply overwrite policy (Global Rules).
5. Update `.ibro.lock.json`.
6. Print summary including skipped user-owned files.

---

## Command: `ibro list`

### Syntax
```bash
ibro list [--registry <org/repo>]
```

### Behavior
- Read registry.
- Print list: module name, latest version, description.

---

## Command: `ibro update` (optional in MVP)

### Syntax
```bash
ibro update [--to <path>] [--registry <org/repo>]
```

### Behavior (MVP-simple)
- Read `.ibro.lock.json` modules.
- Re-apply each module using registry latest.
- Respect overwrite rules.
- Update `.ibro.lock.json`.

If not implemented: do not ship the command.

---
