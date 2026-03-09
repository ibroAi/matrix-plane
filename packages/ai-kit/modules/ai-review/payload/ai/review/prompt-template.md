# Builder Briefing Template

> The Reviewer fills this template based on the human's spec.
> Output = copy-paste ready prompt for the Builder agent.

---

## Start Here: A Real Example

Don't read the template first. Read this filled example. It shows what the final output looks like — that's all you need for your first 3 sessions.

```
# Task: Add envelope archival endpoint

## Context
You are working on minion-protocol (branch: feature/post-office/archive-endpoint).
Read these files FIRST, in full:
- CLAUDE.md (operational rules, conventions)
- GIT-RULES.md (git discipline — atomic commits, branch strategy)
- BUILDER-PITFALLS.md (your known pitfalls + output expectations)
- packages/apis/post-office-api/README.md (package-specific info)
- packages/libs/post-office-lib/README.md (package-specific info)

## Spec
Add POST /v1/envelopes/:id/archive endpoint. Sets status to 'archived',
logs envelope_event. Returns 200 with updated envelope. 404 if not found.
Already-archived envelopes return 409.

## Scope
- Packages: post-office-api, post-office-lib
- Branch: feature/post-office/archive-endpoint
- Base: develop
- Files OUTSIDE scope: do not touch

## Your Known Pitfalls For This Type of Work
- [ ] Check imports — no unused, no missing
- [ ] SQL: parameterized queries only, no string interpolation
- [ ] db.query() returns unknown[] — cast to concrete type
- [ ] Property names: snake_case to match core-lib types
- [ ] Run npm run build locally before push

## Definition of Done
- [ ] POST endpoint responds 200/404/409
- [ ] envelope_event logged for archival
- [ ] Local build passes
- [ ] All tests pass
- [ ] Report follows agreed format
- [ ] One file per commit (atomic commits)

## Output
Deliver a push report in the agreed format.
The Reviewer will check your push against a full checklist.
Save yourself a FAIL: read your known pitfalls BEFORE you start.
```

That's it. Copy this structure, replace the content with your task, send to Builder.

---

## The Generic Template

Once you've done this a few times and want a reusable skeleton:

**Note on `{{placeholders}}`:** Mustache-style syntax is a naming convention, not a rendering engine. Replace each placeholder manually. Sections in `{{#SECTION}}...{{/SECTION}}` are repeated per item or omitted if empty.

```
# Task: {{SPEC_TITLE}}

## Context
You are working on {{REPO_NAME}} (branch: {{BRANCH_NAME}}).
Read these files FIRST, in full:
- Project rules (operational rules, conventions)
- Git rules (git discipline — atomic commits, branch strategy)
{{#BUILDER_DOCS}}
- {{DOC_PATH}} (your known pitfalls + output expectations)
{{/BUILDER_DOCS}}
{{#PACKAGE_READMES}}
- {{README_PATH}} (package-specific info)
{{/PACKAGE_READMES}}

## Spec
{{SPEC_CONTENT}}

## Scope
- **Packages**: {{PACKAGES}}
- **Branch**: {{BRANCH_NAME}}
- **Base**: {{BASE_BRANCH}}
- **Files OUTSIDE scope**: do not touch

## Your Known Pitfalls For This Type of Work
{{#RELEVANT_PATTERNS}}
- [ ] {{PATTERN}}
{{/RELEVANT_PATTERNS}}

## Definition of Done
{{#DOD_ITEMS}}
- [ ] {{DOD_ITEM}}
{{/DOD_ITEMS}}
- [ ] Local build passes
- [ ] All tests pass
- [ ] Report follows agreed format
- [ ] One file per commit (atomic commits)

## Output
Deliver a push report in the agreed format.
The Reviewer will check your push against a full checklist.
Save yourself a FAIL: read your known pitfalls BEFORE you start.
```

---

## How the Reviewer Fills This

1. Human gives spec (text, link, or verbal)
2. Reviewer reads spec, determines:
   - Which packages are affected → `{{PACKAGES}}`
   - Which docs the Builder should read → `{{BUILDER_DOCS}}`, `{{PACKAGE_READMES}}`
   - Which patterns from `patterns.md` are relevant → `{{RELEVANT_PATTERNS}}`
   - Definition of Done items → `{{DOD_ITEMS}}`
3. Reviewer fills in the template, delivers to human
4. Human sends to Builder
5. Builder builds, pushes with report
6. Reviewer reviews (see [protocol.md](protocol.md))

---

## Pattern Selection Guide

Map work types to relevant pattern numbers from your `patterns.md`:

| Type of work | Likely relevant patterns |
|--------------|-------------------------|
| New library | Imports, return types, component props, phantom deps, naming, build |
| API endpoint | Imports, SQL, return types, fake tests, stubs, naming, build |
| Frontend/UI | Imports, return types, component props, config/metadata |
| Event/messaging | Return types, dead code, stubs, naming, build |
| Writing tests | Private field access, fake tests, repeated bugs |
| Refactoring | Imports, return types, phantom deps, repeated bugs, naming, build |

Over time, pattern selection becomes muscle memory.
