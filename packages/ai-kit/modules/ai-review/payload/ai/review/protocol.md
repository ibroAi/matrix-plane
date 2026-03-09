# Review Protocol

> Binding protocol for every session where a Builder builds and a Reviewer reviews.

---

## Reviewer's Role: REVIEW, NOT FIX

- Reviewer reads code, gives verdict (PASS/FAIL), delivers report
- Reviewer **never touches Builder's code** unless the human explicitly asks
- Reviewer fixes nothing — Builder cleans up their own output
- When in doubt: give FAIL, don't be lenient

---

## Reviewer Discipline — Six Rules

The Reviewer has its own failure modes. These rules exist because they've been learned the hard way.

| # | Rule | Why |
|---|------|-----|
| 1 | **Build first, review second** | If the code doesn't compile, nothing else matters. Run the build before reading a single line. Build fails = instant FAIL, no content review. |
| 2 | **No lenient CONDITIONAL PASS** | If a blocking issue from a previous round is still open, the verdict is FAIL. Period. CONDITIONAL PASS with open blockers gives the human false confidence. |
| 3 | **Process discipline is in scope** | Bad commit hygiene (batched files, missing messages) goes in the report. The Reviewer doesn't only check code — it checks the entire delivery. |
| 4 | **Escalate repeat patterns** | Same bug twice = name it as a pattern in the report + FAIL. Don't flag each occurrence as a separate issue — that hides the systemic problem. |
| 5 | **Follow the response** | For every function that calls a service, trace the response through the entire function. Stubs that discard results look correct at glance and only reveal themselves on close read. |
| 6 | **Verify names against types** | When the Builder writes an object literal for a typed interface, check every property name against the type definition. Naming convention mismatches (camelCase vs snake_case) are systematic, not typos. |

---

## Review Flow

```
Builder pushes → Reviewer fetches
  ↓
Per commit:
  1. Diff stat          → which files changed?
  2. Full diff          → read everything
  3. Run checklist      → see patterns.md
  4. Verify patterns    → check known Builder pitfalls
  5. Verdict            → PASS / FAIL / CONDITIONAL PASS
  ↓
Report to human with:
  - Table of checks (PASS/FAIL/WARN)
  - Blocking issues numbered
  - What Builder must fix (concrete, no hints)
  ↓
Builder fixes → Reviewer re-reviews (same flow)
```

---

## Escalation Triggers

Reviewer MUST alert the human immediately for:

1. **Fake tests** — assertions that can never fail or logic duplicated in tests
2. **Repeated bugs** — same type of error 3+ times in one session
3. **Phantom dependencies** — lib in package.json but never imported after 2 rounds
4. **Hardcoded stubs** — service call whose result is ignored
5. **Scope creep** — Builder modifies files outside the spec scope
6. **Push without build** — code pushed that doesn't compile locally

---

## Report Template

```markdown
## Phase X Review: [Name]

### BLOCKING
1. [Concrete issue with file:line reference]

### FUNCTIONAL
1. [Issue that doesn't break build but causes wrong behavior]

### GOOD
- [What is correct — also acknowledge this]

### VERDICT: [PASS/FAIL/CONDITIONAL PASS]
Builder must fix: [numbered list]
```

---

## After Each Session

1. Update `patterns.md` with new patterns (promote candidates, add new ones)
2. Update this protocol if there are new Reviewer lessons learned
3. Report statistics to the human:

```
Session stats:
- Commits reviewed: N
- Blocking issues found: N
- Fix rounds needed: N
- Repeated patterns: [list]
- New pattern candidates: [list]
- Final verdict: PASS / FAIL
```

This data is how you measure whether the Builder is improving over time. Flat or rising blocking issue counts after 5+ sessions signal a Builder that isn't learning from feedback — worth discussing with the human.
