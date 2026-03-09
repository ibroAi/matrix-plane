# NARRATIVE MEMORY INJECTION (NMI)

This document defines the **rules and contract** for Narrative Memory Injection (NMI)
inside the ibro ecosystem.

NMI is not “memory”.
NMI is a **written, reviewable claim** about what may be remembered.

If it is not written down, it does not exist.

---

## 1. What NMI is

NMI is a controlled method to propose and store **high-signal, durable facts**
that improve future collaboration.

It exists to prevent:
- accidental context drift
- prompt spaghetti
- hidden assumptions
- “the model remembers something” ambiguity

NMI is always:
- explicit
- traceable
- reviewable
- reversible

---

## 2. What NMI is NOT

- ❌ not automatic memory
- ❌ not “the model learned this”
- ❌ not a substitute for documentation
- ❌ not a dumping ground for chat logs
- ❌ not a place for secrets

If you can’t defend why it should persist, it doesn’t belong in NMI.

---

## 3. When NMI is allowed

NMI is allowed only for information that is:

### Durable
Likely true for weeks/months (not “today’s plan”)

### High leverage
Improves future work quality significantly

### Low risk
Does not increase privacy/security risk

### Verifiable (or clearly marked)
If it’s a fact: must be verifiable.
If it’s a preference: must be explicit.
If it’s a hypothesis: must be labeled and time-bounded.

---

## 4. What NMI MUST NEVER contain

### Sensitive / private
- credentials, keys, tokens
- personal addresses
- private messages
- medical / legal / financial data (unless explicitly requested)

### Unbounded identity claims
- “User is X”
- political or medical labels
- psychological profiling

### Vague fluff
- “User likes good answers”
- “Be helpful”
- “Important info”

---

## 5. Memory Claim Format (mandatory)

Every memory entry must follow this format:

```yaml
id: <kebab-case-id>
type: preference | fact | convention | constraint | hypothesis
claim: <single clear sentence>
scope: <where this applies>
source: <origin of this info>
confidence: high | medium | low
created: YYYY-MM-DD
review_by: YYYY-MM-DD
expiry: YYYY-MM-DD (required for hypothesis)
```

### Example

```yaml
id: zip-over-2-files
type: constraint
claim: If output includes more than two files, provide them as a zip archive.
scope: all ibroAi repos
source: user instruction
confidence: high
created: 2026-01-31
review_by: 2026-04-01
```

---

## 6. Workflow

1. Proposal written in:
   `ai/work/<topic>/nmi-proposal.md`

2. Optional AI review (analysis only)

3. Human decision recorded in:
   `ai/work/<topic>/decision.md`

4. Accepted claims copied into:
   `ai/governance/NARRATIVE_MEMORY.md`

No decision = no memory.

---

## 7. Failure Modes

- over-collection
- stale memories
- unclear scope
- treating assumptions as facts
- hidden coupling between systems

Rule:
> If NMI grows without friction, it is being misused.

---

## 8. Final Rule

If it does not meaningfully improve future work,
it must not be remembered.
