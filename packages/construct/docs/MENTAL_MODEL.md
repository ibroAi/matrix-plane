# Mental Model — ibro ecosystem

This document defines the **mental model, scope, and boundaries** of the ibro ecosystem.

It exists to prevent confusion, scope creep, and incorrect assumptions —  
especially when working with AI or revisiting the project later.

If something feels unclear, this document is the source of truth.

---

## 1. Core Idea

The ibro ecosystem is built around **structure, not execution**.

It does NOT:
- run AI models
- abstract APIs
- automate decisions
- behave like an agent framework

It DOES:
- define structure
- enforce clarity
- make AI usage explicit
- prevent chaos and implicit behavior

---

## 2. The Two Core Repositories

### `construct`
**What it is:**
- A registry of **drop-in modules**
- Each module is a **folder payload**
- Contains no runtime logic
- Contains no executable behavior

**Think of it as:**
> A library of *project structure*, not code.

**It provides:**
- `/ai` folder templates
- governance rules
- prompt templates
- work scaffolding
- documentation structure

**It does NOT:**
- execute anything
- expose functions
- act as a library
- depend on Node/Python/etc.

---

### `ibro-cli`
**What it is:**
- A CLI that installs modules from `construct`
- A structure bootstrapper
- A safety layer for file operations

**What it does:**
- reads `registry.json`
- downloads module payloads
- copies files into a project
- applies overwrite rules
- writes `.ibro.lock`

**What it does NOT:**
- run AI
- interpret prompts
- execute logic from construct
- contain business logic

---

## 3. The Relationship (Important)

construct → defines structure
ibro-cli → installs structure
project → uses structure


Nothing more.

No hidden coupling.
No runtime magic.
No shared execution layer.

---

## 4. Mental Rule of Thumb

If you are asking:

> “Should this run something?”

→ It does **not** belong in construct  
→ It probably does **not** belong in ibro-cli either

If you are asking:

> “Should this define how work is structured?”

→ It belongs in construct

If you are asking:

> “Should this copy or manage files?”

→ It belongs in ibro-cli

---

## 5. What This Is NOT (Explicitly)

- ❌ Not an AI framework
- ❌ Not an agent system
- ❌ Not a workflow engine
- ❌ Not a prompt runner
- ❌ Not a replacement for code

This project is intentionally boring.

Boring is stable.
Stable scales.

---

## 6. Design Principle

> The purpose of ibro is not to be clever.
> The purpose of ibro is to make thinking visible.

If a feature hides intent, it does not belong here.

---

## 7. Future Direction (Non-binding)

In the future, other layers *may* exist:
- runners
- validators
- tooling
- visualizers

But they will always be **separate from construct**  
and **never blur responsibility boundaries**.

---

## 8. Final Rule

If you are unsure where something belongs:

→ It probably doesn’t belong yet.

Stop.
Clarify.
Then act.
