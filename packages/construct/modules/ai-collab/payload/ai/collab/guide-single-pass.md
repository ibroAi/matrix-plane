# Guide — Single-Pass Rewrite Flow

**Belongs to:** [ADR — Mode 1: Single-Pass Rewrite](adr-multi-llm-collab.md#mode-1-single-pass-rewrite)
**Purpose:** Practical guide for rewriting documents with two LLMs

---

## When to use this

You have a document that is correct in substance but needs improvement — readability, structure, consistency, or it has gaps that need filling. The document was written by one LLM and will be corrected or extended by another.

Typical situations:

- A spec written by Model A that Model B consolidates
- An architecture document that needs clarification
- A draft with known inconsistencies that need surgical fixing

---

## How it works in practice

### Step 1 — Model A delivers corrections

Model A (the model that owns the content) analyzes the document and delivers corrections. Not as prose, but as structured instructions.

The format that works: **natural language for context, YAML for actions**.

Model A writes a markdown file with:

- Explanation in natural language about what is wrong and why
- Concrete fixes in YAML that the receiving model can execute

Example — a correction file for an API spec:

```markdown
## 1.3 TraceMeta is in the wrong place

Trace information is partly attached to Message,
while Trace should be the primary forensics entity.
The current text implies Message carries trace data,
but the data model has Trace as the authoritative source.
```

```yaml
fixes:
  - id: "trace_authoritative_entity"
    section: "3.2 Data Model"
    change: >
      Clarify that Trace is the primary forensic record
      and Message only references it via foreign key.
    constraint: "No schema rewrite, only semantic clarification."

  - id: "remove_trace_from_message"
    section: "3.4 Message Schema"
    change: >
      Remove trace_data field from Message. Replace with
      trace_id foreign key reference.
    constraint: "Keep all other Message fields intact."

preserve:
  - "All endpoint definitions in section 4"
  - "The authentication flow in section 2"

forbidden:
  - "Do not add new endpoints"
  - "Do not change field names in existing schemas"
  - "Do not restructure the document's section hierarchy"
```

Notice the structure: each fix has an `id` (for tracking), a `section` (for location), a `change` (what to do), and a `constraint` (what not to do). The `preserve` and `forbidden` blocks at the end set global boundaries for the entire pass.

### Step 2 — Model B applies

Model B receives the markdown, reads the language for context, executes the YAML. Model B may:

- Apply the YAML instructions as described
- Push back if a fix is factually incorrect (the language provides enough context to judge)

Model B may not:

- Add new fixes on its own
- Change the structure or style of the document beyond the fixes
- Add interpretation where the YAML is concrete

### Step 3 — Human decides

The human reviews the result and decides: done, or another round. There is no automatic stop criterion. The human is the endpoint.

---

## Why YAML and not prose?

Prose feedback ("improve the forensics section") forces the receiving model to interpret. Interpretation is where drift begins. YAML reduces interpretation space to near zero: it states exactly what should change, where, and with what constraints.

The language around it exists so the receiving model can judge whether the fix makes sense. Without that context, the model would execute blindly — even if the fix is wrong.

---

## Pitfalls

**Too many fixes in one pass.** If you send 20+ fixes, the chance of unintended interactions between fixes grows. Keep it at 5-10 per round.

**The YAML is vague.** "Improve the context section" is not a fix, it's a wish. A fix specifies exactly what changes and where. If you can't formulate it concretely, it's not yet a fix but a discussion point.

**Model B goes freelancing.** If the receiving model starts improving beyond the fixes, you get exactly the oscillation you're trying to prevent. The `forbidden` and `preserve` fields in the YAML exist to prevent this.

**Nobody checks the result.** The human must read the final result. Not just the diff, but the whole thing. Two correct fixes can together create an inconsistency that neither model sees.

---

## The Anatomy of a Good Fix

A fix that works has four properties:

1. **Locatable** — you can point to exactly where in the document it applies
2. **Actionable** — the receiving model can execute it without guessing
3. **Bounded** — the constraint says what must NOT change
4. **Verifiable** — the human can check if it was applied correctly

A fix that fails typically lacks #3. Without a constraint, the receiving model will "helpfully" improve surrounding text, and that's where drift starts.

---

## Checklist

- [ ] Corrections are structured (YAML/JSON), not prose
- [ ] Each fix has an id, a section, an action, and a constraint
- [ ] There is a `preserve` and `forbidden` block
- [ ] The receiving model has enough language context to push back
- [ ] Fixes are batched in groups of 5-10, not 20+
- [ ] The human reviews the final result, not just the fixes
- [ ] If a second round is needed, only new fixes are sent — not the full set again
