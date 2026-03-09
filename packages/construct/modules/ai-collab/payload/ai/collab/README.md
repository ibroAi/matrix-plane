# AI Collaboration Patterns

When multiple LLMs work on the same artifact, things go wrong in predictable ways: oscillating rewrites, contradictory advice, semantic drift, no clear endpoint. These three modes prevent that — not through automation, but through human-anchored structure.

## 5-Minute Start

1. Read the [ADR](adr-multi-llm-collab.md) — one page, three modes, the reasoning behind all of this
2. Pick the guide that matches your situation:
   - Correcting a document? → [Single-Pass Rewrite](guide-single-pass.md)
   - Need perspectives before deciding? → [Parallel Evaluation](guide-parallel-eval.md)
   - Decision made, protecting intent? → [Post-Decision Governance](guide-post-decision.md)
3. Follow the guide. Check the boxes. Done.

If your workflow also involves a dedicated Reviewer checking a Builder's output, see the **ai-review** module for verdict criteria, pattern tracking, and briefing templates.

---

## The Three Modes

| Mode | Phase | Use when |
|------|-------|----------|
| Single-Pass Rewrite | Pre/post-decision | Correcting a document with structured YAML instructions |
| Parallel Evaluation | Pre-decision | Gathering conflicting perspectives before choosing |
| Post-Decision Governance | Post-decision | Protecting intent during execution and rewriting |

All three share one invariant: **the human decides when something is done.**

---

## How They Relate

```
[Parallel Evaluation]     →  Human chooses direction  →  [Post-Decision Governance]
  (conflicting perspectives)    (canonical decision)       (protect intent)

[Single-Pass Rewrite]     →  Can occur before OR after the canonical decision
  (structured corrections)
```

---

## Files

| File | What | Read time |
|------|------|-----------|
| [adr-multi-llm-collab.md](adr-multi-llm-collab.md) | The *why* — decision, rationale, consequences | 5 min |
| [guide-single-pass.md](guide-single-pass.md) | The *how* — YAML corrections, pitfalls, checklist | 5 min |
| [guide-parallel-eval.md](guide-parallel-eval.md) | The *how* — synthesis techniques, pitfalls, checklist | 5 min |
| [guide-post-decision.md](guide-post-decision.md) | The *how* — roles, gate review, pitfalls, checklist | 5 min |

---

## When NOT to Use These

- **One model, clear instruction** — just do it. No pattern needed.
- **Fully automated pipelines** — these patterns require a human in the loop.
- **Real-time agent messaging** — these are artifact collaboration patterns, not communication protocols.
- **When you're procrastinating** — if the task is straightforward but feels big, start working instead of reaching for a framework.
