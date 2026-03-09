# Builder Bug Patterns

> Track recurring mistakes your Builder makes. Each pattern, once confirmed across
> multiple sessions, becomes a permanent checklist item.

---

## How to use this file

### Pattern Lifecycle

```
Bug spotted → CANDIDATE (first sighting)
  → Same bug type again → CONFIRMED (permanent checklist item)
  → Never seen again → Remove after 5+ clean sessions
```

1. When you catch a new bug type, add it below using the template
2. Mark it as **(CANDIDATE)** until you see it a second time
3. After the second occurrence, promote it to **(CONFIRMED)** — it's now a permanent checklist item
4. Reference pattern numbers in your review reports (e.g., "Pattern #6 violation")
5. Feed confirmed patterns back into the Builder's briefing (see `prompt-template.md`)

### Why This Matters

Without tracked patterns, every review starts from zero. With tracked patterns, the Reviewer knows exactly where to look, and the Builder can be briefed to avoid its own weak spots. The pattern list is how your review system learns.

---

## Pattern Template

```markdown
### N. Pattern Name (CANDIDATE | CONFIRMED)
- **What**: Brief description of the mistake
- **Example**: Concrete instance with file/line reference
- **Check**: What to grep/look for during review
- **Severity**: BLOCKING / FUNCTIONAL / STYLE
- **First seen**: YYYY-MM-DD (session/PR reference)
- **Confirmed**: YYYY-MM-DD (second occurrence)
```

---

## Common Pattern Categories

The patterns below are frequently observed across different Builder agents.
Use them as a starting checklist and add your Builder-specific patterns after.

### Build & Type Safety

#### 1. Unused / Missing Imports
- **What**: Adds symbols to import but never uses them, or uses symbols without importing
- **Example**: `ShieldCheck` used in JSX but not in the import statement
- **Check**: After each commit, grep for unused imports in changed files
- **Severity**: BLOCKING (build fails)

#### 2. Return Type Blindness
- **What**: Ignores that `.catch()` on a Promise changes the return type to `T | void`
- **Example**: `const { x } = await promise` where promise may return void
- **Check**: Every `.catch()` on an async function — caller must be null/void-safe
- **Severity**: BLOCKING (runtime crash)

#### 3. SQL Syntax in Template Strings
- **What**: Single quotes inside single quotes in SQL strings
- **Example**: `'SELECT * WHERE status = 'running''` — parse error
- **Check**: Always use parameterized queries (`$1`, `$2`)
- **Severity**: BLOCKING (runtime error)

### Dependency Integrity

#### 4. Phantom Dependencies
- **What**: Adds lib to package.json but never imports it in source code
- **Example**: Library added to dependencies, zero import statements in the package
- **Check**: For every new dependency: `grep "from.*<lib-name>"` in consumer. No import = dead dep
- **Severity**: FUNCTIONAL (dead weight, misleading)

#### 5. Missing Config / Metadata
- **What**: References config entries, authors, or metadata that don't exist
- **Example**: Blog author referenced in frontmatter but not in authors config
- **Check**: Cross-reference all metadata lookups against their source files
- **Severity**: BLOCKING (build or runtime error)

### Test Integrity

#### 6. Fake Tests / Placeholder Assertions
- **What**: Tests that can never fail: `assert.ok(true)` or logic duplicated from production
- **Example**: Integration test with `assert.ok(true, 'description')` as verification
- **Check**: Every test MUST call production code. Every assertion must be able to fail
- **Severity**: BLOCKING (zero tolerance — fake tests are worse than no tests)

#### 7. Hardcoded Stubs as "Implementation"
- **What**: Calls a real service but ignores the result, returns hardcoded values
- **Example**: `evaluateJudge()` calls LLM, discards response, returns `{ verdict: 'pass', score: 0.9 }`
- **Check**: For every function calling an external service — is the result actually used?
- **Severity**: BLOCKING (fake implementation)

### Process Discipline

#### 8. Repeated Bugs After Fix
- **What**: Same bug returns in a later phase after being fixed earlier
- **Example**: Unsafe casts fixed in phase 2, reintroduced in phase 3
- **Check**: Cross-reference current issues against previous round's report
- **Severity**: BLOCKING (one occurrence = mistake, two = pattern → automatic FAIL)

#### 9. Push Without Local Build
- **What**: Pushes code without running the build locally first
- **Example**: 18+ type errors caught by CI that a local build would have found in seconds
- **Check**: Build output MUST appear in Builder's report. No build = automatic FAIL
- **Severity**: BLOCKING

#### 10. Property Naming Mismatch
- **What**: Uses camelCase properties while types expect snake_case (or vice versa)
- **Example**: `runId` in code while the type defines `run_id`
- **Check**: For every object literal implementing a typed interface — verify property names match
- **Severity**: BLOCKING (build fails)

---

## Archetype Starter Packs

Pick the archetype closest to your Builder's work. Copy the relevant patterns into "Your Builder-Specific Patterns" below and adjust to your codebase.

### TypeScript Builder

| # | Pattern | Check |
|---|---------|-------|
| T1 | Forgets `.js` extensions in imports (Node16 resolution) | `grep "from '\." ` — every relative import needs `.js` |
| T2 | Uses `as any` to bypass type errors instead of fixing them | `grep "as any"` in changed files — each one needs justification |
| T3 | Adds index.ts export but not the barrel re-export in parent | For every new file → verify parent `index.ts` exports it |
| T4 | Writes `interface` when `type` is the project convention (or vice versa) | Check project convention, grep for violations |
| T5 | Forgets `async` on functions that `await` inside them | Functions with `await` but no `async` keyword |
| T6 | Doesn't update `tsconfig.json` references when adding cross-package imports | New import from another package → check tsconfig references + composite |

### Python Builder

| # | Pattern | Check |
|---|---------|-------|
| P1 | Imports module at top but never uses it | `pylint` or `ruff` unused import check |
| P2 | Uses f-strings in SQL queries (injection risk) | `grep "f\".*SELECT\|f\".*INSERT"` — must use parameterized queries |
| P3 | Forgets `__init__.py` in new packages | Every new directory with `.py` files needs `__init__.py` |
| P4 | Type hints say `Optional[X]` but code doesn't check for `None` | Every `Optional` parameter → verify `None` guard exists |
| P5 | `requirements.txt` out of sync with actual imports | `pip freeze` vs `import` statements — new imports need new deps |
| P6 | Uses `except Exception` (too broad) instead of specific exceptions | `grep "except Exception"` — should catch specific errors |

### Document Builder

| # | Pattern | Check |
|---|---------|-------|
| D1 | Adds content that wasn't in the brief ("seemed logical") | Diff every section against the spec — additions need justification |
| D2 | Changes meaning during "readability" rewrites | Compare semantic intent of original vs rewrite, not just words |
| D3 | Invents references or links that don't exist | Every `[link](url)` and citation must be verified |
| D4 | Inconsistent terminology (uses 3 words for the same concept) | Grep for synonyms of key terms — pick one, use it everywhere |
| D5 | Silently drops sections during consolidation | Word count of original vs rewrite — significant shrinkage = red flag |
| D6 | Converts firm statements to hedged language ("should" → "could consider") | Grep for hedge words: "could", "might", "consider", "perhaps" |

---

## Your Builder-Specific Patterns

> Add patterns specific to your Builder agent below.
> Number them starting from 100 to keep them distinct from the common patterns above.
> Use the template. Track dates. Feed confirmed patterns into your Builder briefings.

After your first 3 review sessions, you'll likely have 2-5 candidates. After 10 sessions, you'll have a solid confirmed set. The common patterns above (1-10) cover ~60% of what most Builders get wrong. The archetype patterns give you a head start on the other 40%.

<!-- Your patterns here -->
