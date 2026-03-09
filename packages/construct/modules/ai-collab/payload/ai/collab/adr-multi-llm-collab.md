# ADR — Human-Anchored Multi-LLM Collaboration

## Context

When multiple LLMs work on the same artifact, instability emerges in predictable ways: oscillating rewrites, contradictory advice, semantic drift, no clear endpoint. These problems vary by phase but share one root cause: **no external stability point**.

Autonomous inter-model protocols were considered — voting, consensus, automatic stop criteria. Practical usage showed that stability consistently came from the same source: **human judgment at key decision points**.

This ADR covers three collaboration modes, each addressing a different phase:

| Mode | Phase | Core question |
|------|-------|---------------|
| Single-Pass Rewrite | Pre/post-decision | How do two models correct a document without oscillating? |
| Parallel Evaluation | Pre-decision | How do multiple perspectives inform a choice without causing paralysis? |
| Post-Decision Governance | Post-decision | How does intent survive execution by multiple models? |

All three share one invariant: **the human decides when something is done.**

---

## Decision

> **Human-anchored collaboration** over autonomous inter-LLM protocols.

LLMs function as tools under human direction, not self-steering processes. There is no autonomous convergence, no model voting, no automatic consensus.

---

## Mode 1: Single-Pass Rewrite

**Use when:** A document written by one model needs correction or improvement by another.

**How it works:**
1. Model A analyzes the document and delivers corrections as structured instructions (YAML/JSON with natural language context)
2. Model B applies the corrections — may push back on factually incorrect fixes, may not add its own
3. Human reviews and decides: done, or another round

**Why structured instructions:** Prose feedback ("improve the forensics section") forces interpretation. Interpretation is where drift begins. YAML reduces interpretation space to near zero.

**Key constraint:** The flow stays mostly single-pass. Extra iteration happens only when semantic errors persist or corrections weren't applicable. The human, not a rule, decides when to stop.

### Consequences

| Positive | Negative |
|----------|----------|
| Fast convergence | Depends on human judgment |
| Less semantic drift | Limited automation potential |
| Low collaboration complexity | Less reproducible decisions |

---

## Mode 2: Parallel Evaluation

**Use when:** You face a decision with multiple valid directions and want conflicting perspectives before choosing.

**How it works:**
1. Same input goes to 2-3 models simultaneously
2. Outputs remain separate — no merging, averaging, or model-ranking
3. Human reads all outputs, synthesizes, and chooses one direction

**Why not consensus:** Conflicts between models reveal hidden assumptions, missing preconditions, and different abstraction levels. Automatic consensus would weaken these signals. The value is in the *difference*, not agreement.

**Key constraint:** After synthesis, one direction is chosen. That direction becomes the canon. Parallel evaluation ends — governance begins (Mode 3).

### Consequences

| Positive | Negative |
|----------|----------|
| Maximum perspective utilization | Higher cognitive load for human |
| Better assumption detection | Slower throughput |
| Strong exploration support | Depends on human synthesis quality |

---

## Mode 3: Post-Decision Governance

**Use when:** A canonical decision exists and must survive execution (rewriting, elaboration, implementation) by multiple models.

**How it works:**
1. **Architect + human** determine architecture (canonical decision)
2. **Both models** review the decision (last chance for content-level changes)
3. **Architect + human** process feedback, create canonical artifact
4. **Rewriter** rewrites for readability/structure — may not change meaning
5. **Gatekeeper** verifies rewrite against canon — may not introduce new architecture

**Why two review types:** Content review (step 2) asks "is the decision correct?" and may change the canon. Execution review (step 5) asks "is the rewrite faithful?" and may not. Mixing these is the primary source of post-decision drift.

**Key constraint:** The canon is fixed after step 3. Changes require explicit human re-decision. Models remain tools for execution and verification, not sources of new decision-making.

### Consequences

| Positive | Negative |
|----------|----------|
| Strong drift protection | Limited model autonomy |
| Clear intent → execution line | Extra human involvement |
| Consistent quality control | Less suitable for automation |

---

## How the Modes Relate

```
[Parallel Evaluation]     →  Human chooses direction  →  [Post-Decision Governance]
  (conflicting perspectives)    (canonical decision)       (protect intent)

[Single-Pass Rewrite]     →  Can occur before OR after the canonical decision
  (structured corrections)
```

Single-pass rewrite is the workhorse. Before the decision, it corrects drafts. After the decision, it's the format the Gatekeeper uses to deliver fixes to the Rewriter.

---

## Summary

> Stability in multi-LLM collaboration arises from **human judgment at phase boundaries**, not from inter-model protocols.

The three modes provide structure for three phases. The human provides the stability.
