# ibro-cli — Roadmap

This document describes the planned evolution of **ibro-cli**.
It is intentionally pragmatic and versioned by milestones, not dates.

---

## 🎯 Vision

ibro-cli is a framework-style CLI for bootstrapping **AI-aware projects** with:

- explicit structure
- clear governance
- reproducible workflows
- zero prompt chaos

The goal is not automation.
The goal is **control and clarity when working with AI**.

---

## 🟢 v0.1 — Foundation (MVP)

### Goal
Ship a usable CLI with a clear mental model and minimal moving parts.

### Scope
- Initialize an AI-governed project
- Install modules from `ai-kit`
- Keep everything transparent and inspectable

### Features
- `ibro init`
- `ibro add <module>`
- `ibro list`
- `.ibro.lock` generation
- Safe overwrite rules
- TypeScript build
- `/ai` governance folder included

### Non-goals
- No plugin system
- No config DSL
- No remote execution
- No AI automation

---

## 🟡 v0.2 — Usability & Stability

### Goal
Make ibro-cli comfortable to use daily.

### Features
- `ibro update`
- better error messages
- colored output
- dry-run mode
- improved module metadata
- clearer install feedback

### Improvements
- safer file merging
- better conflict warnings
- clearer help output

---

## 🟠 v0.3 — Ecosystem Layer

### Goal
Turn ibro-cli into a reusable foundation.

### Features
- module dependencies
- presets (e.g. `ibro init backend`)
- module validation
- version pinning
- richer registry format

---

## 🔵 v1.0 — Stable Core

### Goal
Stable interface with long-term compatibility.

### Features
- backward compatibility guarantees
- documented extension points
- stable registry format
- mature CLI UX

---

## 🔮 Future Ideas (Not Committed)

- Python CLI (`ibro-py`)
- GitHub Action integration
- Interactive TUI
- Project health checks
- AI-assisted diffing

---

## Design Principle

> ibro-cli must never be smarter than the developer.  
> It exists to enforce structure, not decisions.
