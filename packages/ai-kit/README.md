# ai-kit

**Drop-in module registry for ibro-cli — AI governance folder templates, structure, and reusable building blocks.**

This package contains **modules**, not magic.

Each module is a folder payload that gets copied into a project by `ibro-cli`.
No automation. No agents. No hidden logic.

Just structure you can trust.

---

## What this is

`ai-kit` is the content layer of the ibro ecosystem.

It provides:
- reusable `/ai` folder templates
- governance and structure for AI usage
- predictable, inspectable project layouts
- zero runtime logic

Think of this as **infrastructure for thinking**, not code execution.

---

## What this is NOT

- ❌ Not an AI framework
- ❌ Not an agent system
- ❌ Not a prompt library
- ❌ Not automation

If you're looking for "AI that does things for you", this isn't it.

If you want **control, clarity, and repeatability**, you're in the right place.

---

## How it works

Each module contains:
- a `module.json` with metadata and `copies` spec
- a `payload/` folder with files that get copied verbatim into your project

`ibro-cli` reads `registry.json` and installs modules via GitHub download.

No magic. No transformation. No side effects.

---

## Modules

### `ai` (v0.1.0)
Base AI governance layer.

Installs `/ai` with:
- `governance/` — hard rules for AI behavior (00_READ_FIRST, AI_POLICY, NARRATIVE_MEMORY, etc.)
- `templates/` — reusable prompt/task/report/approval templates
- `work/` — structured workspace scaffold per task
- `context.md`, `assumptions.md`, `backlog.md` — user-owned fill-in files

### `ai-code` (v0.1.0)
Code-specific extension for projects with source code.

Installs `ai/code/` with:
- `code_rules.md` — small, reviewable changes, no breaking changes without callout
- `repo_snapshot.md` — codebase overview template
- `review_checklist.md` — code review criteria
- `change_log.md` — change tracking

### `ai-collab` (v0.1.0)
Multi-LLM collaboration patterns: single-pass rewrite, parallel evaluation, post-decision governance.

Installs `ai/collab/` with:
- `adr-multi-llm-collab.md` — one ADR, three collaboration modes
- `guide-single-pass.md` — structured YAML corrections between two models
- `guide-parallel-eval.md` — conflicting perspectives + synthesis techniques
- `guide-post-decision.md` — Architect/Rewriter/Gatekeeper roles for intent protection

### `ai-review` (v0.1.0)
Reviewer-builder governance: patterns, protocol, verdicts, briefing templates.

Installs `ai/review/` with:
- `patterns.md` — bug pattern tracking with archetype starter packs (TS, Python, Document)
- `protocol.md` — review flow, reviewer discipline rules, escalation triggers
- `verdicts.md` — PASS/FAIL/CONDITIONAL criteria and decision tree
- `prompt-template.md` — briefing template for Builder agents

### `ai-vcon` (v0.1.0)
Villon-Con (vcon) artifact governance and interaction rules.

Installs `ai/vcon/` with:
- `rules.md` — vcon artifact governance

### `ai-spine` (v0.1.0)
Governed Execution Spine rules and checklists.

Installs `ai/spine/` with:
- `checklists.md` — execution spine checklists
- `evidence.md` — evidence requirements

### `ai-infra` (v0.1.0)
Infrastructure boundaries and service mapping for AI.

Installs `ai/infra/` with:
- `boundaries.md` — infrastructure boundary definitions
- `services.md` — service mapping

### `ai-test` (v0.1.0)
Validation and verification rules for AI-generated code.

Installs `ai/test/` with:
- `policy.md` — test policy for AI-generated code
- `report_template.md` — test report template

### `ai-nmi`
Narrative Memory Injection — compile chatlog JSON into structured memory events.

Includes schemas (NMI_EVENT_SCHEMA, STATE_TRACE_SCHEMA), LLM prompts, templates and examples for the NMI state machine (BASELINE → STABLE → DIVERGENCE → REALIGNED → COLLAPSE).

---

## Package (monorepo)

**Package:** `@minion-protocol/ai-kit`
**Location:** `packages/minion-protocol/libs/ai-kit`

```bash
# Geen build stap — pure content package
npm list --workspaces | grep ai-kit
```

**Runtime source:** `ibro-cli` downloadt modules van `ibroAi/ai-kit` op GitHub.
De monorepo-kopie is de lokale source of truth voor development.

---

## Package structure

```
packages/minion-protocol/libs/ai-kit/
├── registry.json          # Module index (name, version, GitHub source)
├── modules/
│   ├── ai/                # Base governance layer
│   │   ├── module.json
│   │   └── payload/ai/
│   ├── ai-code/           # Code-specific rules and checklists
│   │   ├── module.json
│   │   └── payload/ai/code/
│   ├── ai-collab/         # Multi-LLM collaboration patterns
│   │   ├── module.json
│   │   └── payload/ai/collab/
│   ├── ai-infra/          # Infrastructure boundaries
│   │   ├── module.json
│   │   └── payload/ai/infra/
│   ├── ai-nmi/            # Narrative Memory Injection
│   │   ├── README.md
│   │   ├── spec/
│   │   ├── prompts/
│   │   ├── templates/
│   │   └── examples/
│   ├── ai-review/         # Reviewer-builder governance
│   │   ├── module.json
│   │   └── payload/ai/review/
│   ├── ai-spine/          # Governed Execution Spine
│   │   ├── module.json
│   │   └── payload/ai/spine/
│   ├── ai-test/           # Test policy for AI code
│   │   ├── module.json
│   │   └── payload/ai/test/
│   └── ai-vcon/           # Vcon artifact governance
│       ├── module.json
│       └── payload/ai/vcon/
├── docs/
│   ├── MENTAL_MODEL.md
│   ├── ROADMAP.md
│   ├── BACKLOG.md
│   └── REPO_SPEC.md
└── README.md
```

---

## Philosophy

- Structure beats cleverness
- Explicit beats implicit
- Humans stay in control
- AI should never guess

If something adds confusion, it does not belong here.

---

## Status

🚧 Early stage (v0.1)

This package is intentionally minimal.
Structure comes first. Content evolves later.

---

## License

MIT

