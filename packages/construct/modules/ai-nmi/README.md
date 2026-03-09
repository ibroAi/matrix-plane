# NMI Extraction Pack

Drop-in pack to compile chat JSON logs into:
- `events.yaml` (NMI events)
- `state_trace.yaml` (state transitions)
- `snippets.yaml` (re-injection snippets)

## Included
- `spec/` — schemas + event/state definitions
- `prompts/` — single-pass + two-agent prompts
- `templates/` — YAML skeletons you can fill/validate
- `examples/` — minimal example IO

## Quick start
1) Feed your chat JSON (array of items) to `prompts/compiler_single_pass.txt`
2) Expect 3 YAML docs separated by `---`
3) Optionally run the Judge with `prompts/judge_precision.txt` to dedupe + normalize

## States (canonical)
BASELINE → STABLE → DIVERGENCE → REALIGNED → STABLE
DIVERGENCE → COLLAPSE → BASELINE (reset)

## Event types (canonical)
ANCHOR, REFLECTION, MEMORY, REPAIR, DRIFT, ARBITER

