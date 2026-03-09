# Repository Specification — ibroAi

This document defines the **standard structure and rules** for all repositories under the `ibroAi` ecosystem.

The goal is consistency, clarity, and long-term maintainability.

This is not a technical constraint.
This is a thinking and organization contract.

---

## 1. Core Principles

- Structure over cleverness
- Explicit over implicit
- Reproducible over magical
- Humans stay in control
- AI is constrained by design

If a decision increases ambiguity, it does not belong here.

---

## 2. Standard Repository Layout

Every ibroAi repository follows this baseline structure:

<repo>/
├── README.md
├── LICENSE
├── docs/
│ ├── ROADMAP.md
│ ├── BACKLOG.md
│ └── releases/
│ └── v0.1/
│ ├── SCOPE.md
│ └── DECISIONS.md
└── ai/ # required for code repos
├── README.md
├── context.md
├── assumptions.md
├── backlog.md
├── governance/
├── templates/
└── work/
└── _template/
└── tasks/


---

## 3. docs/ Folder Rules

### Living documents
These files evolve continuously:

- `docs/ROADMAP.md` → direction and intent
- `docs/BACKLOG.md` → work to be done

They are **not versioned**.

---

### Release snapshots
Each meaningful milestone gets a snapshot:

docs/releases/vX.Y/
├── SCOPE.md
└── DECISIONS.md


Rules:
- These files are immutable once created
- They describe *why* decisions were made
- Not a changelog, not marketing

---

## 4. The /ai Folder

The `/ai` folder defines how AI is allowed to operate in the repository.

It exists to:
- make assumptions explicit
- constrain AI behavior
- avoid prompt chaos
- make work reproducible

### Required files
- `context.md`
- `assumptions.md`
- `backlog.md`

### Governance
All AI behavior must follow:
- `ai/governance/00_READ_FIRST.md`
- `ai/governance/AI_POLICY.md`

---

## 5. What a “Release” Means

A release is **not** a package publish.

A release means:
> “This structure and intent are stable enough to preserve.”

Releases are about:
- decisions
- scope
- direction

Not about:
- features
- version numbers
- marketing

---

## 6. Commit Conventions

Recommended prefixes:

- `docs:` documentation changes
- `chore:` structure or cleanup
- `feat:` new functionality
- `fix:` bug fixes

Avoid:
- `update`
- `stuff`
- `wip`

---

## 7. Design Rule

> If a file exists, it must have a reason.
> If a rule exists, it must be written down.

Everything else is optional.