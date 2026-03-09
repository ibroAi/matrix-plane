# Verdict Criteria

> Rules for when to give PASS, FAIL, or CONDITIONAL PASS.
> These are not guidelines — they are hard rules.

---

## Verdicts

| Verdict | When |
|---------|------|
| PASS | All checks green, no blocking issues |
| FAIL | At least 1 blocking issue (build breaks, fake test, phantom dep, security) |
| CONDITIONAL PASS | ALL blocking issues from current AND previous rounds are fixed, only style/minor issues remain |

---

## Hard Rules

### CONDITIONAL PASS may NEVER be given when a blocking issue from a previous round is still open.

This is the single most important rule. A CONDITIONAL PASS with open blockers is worse than a FAIL — it signals to the human that things are almost done when they're not.

### Same bug twice = automatic FAIL

One occurrence is a mistake. Two occurrences is a pattern. When a bug type that was flagged in a previous round reappears:

- It does not matter if it's in a different file
- It does not matter if it's a "minor" variant
- The verdict is FAIL, with explicit mention that this is a repeated pattern

### Build failure = instant FAIL, no content review

If the code doesn't compile:

1. Report the build failure
2. Give FAIL verdict
3. Do NOT review the code line by line — it's wasted effort
4. Builder must fix the build first, then re-submit for full review

### Fake tests = zero tolerance FAIL

Tests that can never fail are worse than no tests. They provide false confidence. Any of the following trigger an immediate FAIL:

- `assert.ok(true)` or equivalent always-true assertions
- Test logic that duplicates production code instead of calling it
- "Integration test" that never invokes the real function
- Tests that mock everything including the thing being tested

---

## Severity Levels

Use these to categorize issues in your report:

| Level | Meaning | Impact on verdict |
|-------|---------|-------------------|
| BLOCKING | Breaks build, causes runtime error, security issue, fake test | Always FAIL |
| FUNCTIONAL | Doesn't break build but causes wrong behavior | FAIL if critical path, CONDITIONAL otherwise |
| STYLE | Naming, formatting, non-functional concerns | Does not affect verdict |

---

## Verdict Decision Tree

```
1. Does the code build?
   NO  → FAIL (stop here)
   YES → continue

2. Are there fake tests?
   YES → FAIL (stop here)
   NO  → continue

3. Are there blocking issues from previous rounds still open?
   YES → FAIL
   NO  → continue

4. Are there new blocking issues?
   YES → FAIL
   NO  → continue

5. Are there functional issues?
   YES → CONDITIONAL PASS (list what must be fixed)
   NO  → continue

6. Only style issues or no issues?
   → PASS
```

---

## Communicating Verdicts

Always include in your verdict:

1. **The verdict itself** (PASS/FAIL/CONDITIONAL)
2. **Numbered list of blocking issues** (if FAIL)
3. **What the Builder must do** (concrete actions, not hints)
4. **What was good** (acknowledge correct work — this matters for Builder morale and calibration)
