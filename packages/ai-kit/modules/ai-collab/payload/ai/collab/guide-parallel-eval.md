# Guide — Parallel Multi-LLM Evaluation

**Belongs to:** [ADR — Mode 2: Parallel Evaluation](adr-multi-llm-collab.md#mode-2-parallel-evaluation)
**Purpose:** Practical guide for using multiple LLMs simultaneously for perspective analysis

---

## When to use this

You face a decision where you're unsure of the direction. None of the models have the full picture, and neither do you. You want multiple perspectives side by side before choosing.

Typical situations:

- An architecture decision with multiple valid directions
- A spec that needs validation for gaps you can't see yourself
- A concept you want to test under critique from different angles
- An ADR or protocol you want to verify is realistic

---

## How it works in practice

### Step 1 — Same input, multiple models

You give the same document or question to two or more LLMs. Not sequentially (that is sequential review, see ADR-003), but simultaneously or in the same session.

Example: Model A wrote a protocol. That same protocol went to Model B for review. Both received the same input — the protocol itself — and delivered independent analysis.

### Step 2 — Outputs remain separate

You don't merge the outputs. You don't let another model rank or average them. You read them both and keep them side by side.

What Model A said: it's usable, publishable, ready.

What Model B said: the core assumption is wrong, the role separation is too rigid, the stop criterion is unrealistic.

That contradiction is the point. Not a problem, but the value.

### Step 3 — You synthesize

The human reads both perspectives and makes a choice. In this case: the protocol was rewritten as an ADR with Model B's feedback incorporated. Model A did the rewriting. Neither model decided — the human decided.

---

## What makes this different from "just asking twice"?

The difference lies in the intent. "Asking twice" is hoping for a better answer. Parallel evaluation is deliberately seeking contradictory perspectives. You don't want confirmation — you want tension.

Each model has blind spots. Some models lean toward structure and completeness, sometimes at the expense of realism. Others lean toward pragmatism and nuance, sometimes at the expense of formal correctness. By letting them both react to the same input, the blind spots of one become visible through the other.

---

## When does this not work?

**For pure execution tasks.** If you know what needs to happen and you just need someone to do it, parallel evaluation is waste. Use single-pass rewrite instead.

**With too many models.** Three perspectives are informative. Five perspectives are noise. The cognitive load for the human to synthesize doesn't scale linearly — it explodes. Two to three models is the sweet spot.

**When you've already made a decision.** Parallel evaluation belongs before the canonical decision. After that comes [post-decision governance](guide-post-decision.md). If after your decision you're still asking multiple models for their opinion, you're implicitly reopening the discussion.

---

## Practical Synthesis Techniques

The hardest part of parallel evaluation isn't getting the perspectives — it's combining them into a decision. Here are concrete techniques:

### The Conflict Map

After reading all outputs, make a simple table:

| Topic | Model A says | Model B says | My take |
|-------|-------------|-------------|---------|
| Auth approach | JWT stateless | Session-based | JWT (perf) |
| Error handling | Global middleware | Per-route | Global (consistency) |
| API versioning | URL prefix | Header | URL prefix (simplicity) |

The "My take" column is where the human adds value. You're not averaging — you're choosing, with reasons.

### The Red Flag Test

For each model's output, ask: *"What would go wrong if I followed this completely?"* The answer reveals the model's blind spot. Use the other model's perspective to patch that blind spot, but don't try to create a Frankenstein hybrid of both.

### The 80/20 Rule

Usually, one perspective is 80% right and the other fills in the 20% that's missing. Pick the stronger foundation and surgically incorporate insights from the other. Don't try to give each perspective equal weight — that produces mush.

### Time-box the synthesis

Set a hard limit. If you can't decide in 30 minutes of reading, you either need more information (not more perspectives) or the decision doesn't matter as much as you think. Either way, more models won't help.

---

## Pitfalls

**Seeking consensus instead of tension.** If two of three models say the same thing, the tendency is to ignore the third. But the divergent perspective is often the most valuable — it sees something the other two miss.

**Comparing too long.** At some point you have enough perspectives. Further comparison doesn't add information, it adds doubt. The human must choose a moment where analysis stops and decision begins.

**Letting models react to each other's output.** That's no longer parallel evaluation, that's a debate. Debates between models converge toward the most confident output, not the best one. The human must do the synthesis, not the models.

---

## Checklist

- [ ] All models receive the same input (no filtered versions)
- [ ] Outputs are not automatically merged or ranked
- [ ] The human reads all outputs before a choice is made
- [ ] Maximum 2-3 models are involved
- [ ] After synthesis, one direction is chosen — no hybrid of everything
- [ ] The chosen direction becomes canon (transition to [post-decision governance](guide-post-decision.md))
