# Guide — Post-Decision Governance Flow

**Belongs to:** [ADR — Mode 3: Post-Decision Governance](adr-multi-llm-collab.md#mode-3-post-decision-governance)
**Purpose:** Practical guide for protecting architectural intent after a canonical decision

---

## When to use this

The decision has been made. The architecture is locked. Now it must be written out, rewritten, or implemented — and you're doing that with multiple LLMs. The risk shifts: no longer "are we choosing the right direction?" but "does the direction survive execution?"

Typical situations:

- Model A and you agreed on an API spec. Model B must rewrite it.
- An ADR is approved. It must be elaborated into implementation tickets.
- An architecture decision is locked. The documentation must be written around it.

---

## Roles

This flow uses three named roles. In practice, the same LLM can fill multiple roles across different steps, but the roles themselves must stay distinct:

| Role | Responsibility | Core constraint |
|------|---------------|-----------------|
| **Architect** | Co-designs with the human, owns the canonical decision | May not delegate intent ownership to another model |
| **Rewriter** | Improves text for readability, structure, consistency | May not change meaning or add content |
| **Gatekeeper** | Verifies execution against the canon | May not introduce new architecture |

The human is always present as the final authority, but is not listed as a "role" — the human is the system, not a participant in it.

---

## The flow in five steps

### Step 1 — Architecture decision (Architect + human)

The Architect and the human discuss until there is agreement on direction. This can take multiple rounds. [Parallel evaluation](guide-parallel-eval.md) can be part of this. The result is a **canonical decision** — the truth of this moment.

### Step 2 — Review (Architect + Rewriter, independent)

Both models review the decision independently. This is the last chance for content-level course correction. After this step, review shifts from content to execution.

### Step 3 — Decide on feedback + write out (Architect + human)

The human decides which review feedback is incorporated. The Architect writes out the document with the approved adjustments. The result is the **canonical artifact**.

### Step 4 — Rewrite (Rewriter)

The Rewriter rewrites the artifact for readability, structure, and consistency. The Rewriter may improve the text but not change the meaning.

### Step 5 — Gate review (Gatekeeper)

The Gatekeeper reviews the Rewriter's output. Not on readability — that's the Rewriter's domain — but exclusively on:

- Is the architectural intent intact?
- Are there semantic shifts?
- Has new meaning been introduced?

The Gatekeeper delivers feedback as markdown with YAML actions (see [single-pass rewrite guide](guide-single-pass.md)). If everything checks out: approved. If not: the Rewriter applies the specific fixes and the Gatekeeper checks again.

> **For code review specifically:** If the Gatekeeper is reviewing code rather than documents, consider using the **ai-review** module — it provides verdict criteria, pattern tracking, and structured report templates designed for code-level review.

> **Note:** The Architect and Gatekeeper are often the same LLM. That's fine — what matters is that the *role* is different. In step 1, that model co-creates. In step 5, it only verifies.

---

## The critical distinction: two types of review

This is the most important concept in the entire flow. There exist two fundamentally different reviews that must never be mixed:

**Content review** (step 2) asks: is the decision correct? Is the architecture right? Are we missing something? This review may change the canon. It belongs before or during decision-making.

**Execution review** (step 5) asks: is the rewrite faithful to the canon? Has something shifted? This review may not change the canon. It belongs exclusively after the decision.

Mixing these two is the primary source of drift. If the Gatekeeper in step 5 says "actually the ContextBuilder should be a middleware" — that's not execution review, that's a reopening of architecture. That's only allowed if the human explicitly decides to go back to step 1.

---

## When does the flow break?

**When the Gatekeeper introduces new architecture.** Then it's no longer a gate but a redesign. The human must recognize this and explicitly decide: do we accept the new direction (back to step 1) or hold the canon?

**When the Rewriter fills gaps.** "This wasn't there but it seemed logical" is the most dangerous sentence in a rewrite. Adding is not rewriting. If something is missing, it must go back to the human, not be solved by the Rewriter.

**When the human skips the gate review.** If the Rewriter's output is not checked against the original intent, nobody knows if there's drift. The gate is not optional — it's the mechanism that makes the entire flow work.

**When there is no explicit canon.** If the decision from step 1 doesn't exist somewhere concrete — a document, a spec, a set of principles — then the gate review has nothing to check against. The canon must be tangible, not "what we had in our heads."

---

## Role summary

| Step | Role | What | May do | May not do |
|------|------|------|--------|------------|
| 1. Decision | Architect + human | Determine architecture | Everything | — |
| 2. Review | Architect + Rewriter | Content validation | Influence the canon | — |
| 3. Write out | Architect + human | Process feedback, create document | Adjust canon based on review | Silently change |
| 4. Rewrite | Rewriter | Readability, structure | Improve text | Change meaning, add content |
| 5. Gate | Gatekeeper | Consistency check | Flag deviations | Introduce new architecture |

---

## Relationship to Other Modes

The three modes form a complete system with a temporal pivot point:

**Before the canonical decision:**
- [Parallel evaluation](guide-parallel-eval.md) — gather multiple perspectives
- [Single-pass rewrite](guide-single-pass.md) — correct and improve drafts

**The canonical decision** — human chooses direction

**After the canonical decision:**
- Post-decision governance (this guide) — guard intent during execution

Single-pass rewrite can occur both before and after the decision. Before: as a correction mechanism on drafts. After: as the format the Gatekeeper uses to deliver fixes to the Rewriter (step 5 → step 4 correction round).

---

## Checklist

- [ ] There is an explicit canonical decision (document, spec, or principles)
- [ ] Content review is completed before rewriting begins
- [ ] The rewriting model has the instruction not to add content
- [ ] The gate review checks exclusively for consistency with the canon
- [ ] The human decides on reopening if the gate raises new questions
- [ ] Fixes from the gate are structured (YAML), not prose
