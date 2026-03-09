# AI Review — Reviewer-Builder Governance

AI agents make mistakes in predictable ways. The same model will hit the same class of bugs across sessions — unused imports, hardcoded stubs, tests that can't fail. Without structure, each review is a fresh battle. With structure, each review builds on the last.

## 5-Minute Start

1. Skim [verdicts.md](verdicts.md) — know when to PASS/FAIL (2 min)
2. Run your first review using [protocol.md](protocol.md) — the flow section (2 min)
3. After the review, add your first pattern to [patterns.md](patterns.md) (1 min)

That's it. The template and archetypes come later, once you have 3+ sessions under your belt.

---

## What this is

A governance framework for the **Builder-Reviewer** dynamic: one AI writes, another checks.

> **Related module:** The **ai-collab** module covers broader multi-LLM collaboration patterns — when to use parallel evaluation, how to protect intent post-decision, structured rewrite flows. This module (ai-review) focuses specifically on the commit-level review cycle.

This module answers four questions:

1. **What does the Reviewer check?** → [patterns.md](patterns.md)
2. **When is something PASS vs FAIL?** → [verdicts.md](verdicts.md)
3. **How does the review flow work?** → [protocol.md](protocol.md)
4. **How do you brief the Builder to avoid known pitfalls?** → [prompt-template.md](prompt-template.md)

The module provides the structure. You fill in the specifics for your Builder — its blind spots, your codebase's conventions, your team's standards.

---

## Files

| File | Purpose |
|------|---------|
| [patterns.md](patterns.md) | Template for cataloging Builder bug patterns |
| [protocol.md](protocol.md) | Review flow, verdicts, escalation triggers |
| [verdicts.md](verdicts.md) | PASS/FAIL/CONDITIONAL criteria and rules |
| [prompt-template.md](prompt-template.md) | Briefing template for Builder agents |

---

## How to use

### 1. Track patterns

As you review your Builder's output, you'll notice recurring mistakes. Document them in `patterns.md` using the template provided. Each pattern gets:

- A name and description
- A concrete example
- A check (what to look for)
- A severity level

### 2. Follow the protocol

`protocol.md` defines the review flow:

```
Builder pushes → Reviewer fetches
  → Per commit: read diff, run checklist, give verdict
  → Report to human with blocking issues
  → Builder fixes → Reviewer re-reviews
```

### 3. Use clear verdicts

`verdicts.md` defines when to PASS, FAIL, or CONDITIONAL PASS. The key rule: **never give CONDITIONAL PASS when a blocking issue from a previous round is still open.**

### 4. Brief your Builder

`prompt-template.md` provides a template for briefing Builder agents. It includes slots for:

- Relevant patterns (so the Builder knows its own pitfalls)
- Definition of Done
- Scope constraints
- Output expectations

---

## Principles

- **Reviewer reviews, doesn't fix.** The moment the Reviewer starts fixing Builder code, accountability collapses. The Reviewer gives verdicts. The Builder fixes.
- **Patterns accumulate.** Each session teaches you something about your Builder. A pattern observed once is a candidate. Observed twice, it's confirmed and becomes a permanent checklist item.
- **Repeated bugs escalate.** Same bug twice = pattern, not incident. Automatic FAIL. This is the mechanism that forces improvement.
- **Build before review.** If the code doesn't compile, there's nothing to review. Run the build first — it takes seconds and can save hours.
- **Human decides.** The Reviewer gives verdicts. The human makes the final call on merge/reject. The Reviewer is an advisor with strong opinions, not the authority.

---

## The Feedback Loop

This is the engine that makes it work:

```
Builder makes mistake → Reviewer catches it → Pattern documented
  → Pattern added to Builder's briefing → Builder avoids it next time
  → Reviewer's checklist grows → Fewer bugs escape
```

Over time, your `patterns.md` becomes a living document of your Builder's evolution. Early sessions will have many FAILs. Later sessions should trend toward PASS — because the Builder is being briefed with its own history.
