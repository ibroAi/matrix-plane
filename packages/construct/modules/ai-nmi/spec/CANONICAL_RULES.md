# Canonical Rules

## Allowed states
- BASELINE
- STABLE
- DIVERGENCE
- REALIGNED
- COLLAPSE

## Allowed transitions
- BASELINE → STABLE        (via ANCHOR)
- STABLE → DIVERGENCE      (via DRIFT)
- DIVERGENCE → REALIGNED   (via REPAIR)
- REALIGNED → STABLE       (implicit)
- DIVERGENCE → COLLAPSE    (saturation / safety snapback / contradictions)
- COLLAPSE → BASELINE      (hard reset)

## Event definitions (tight)
- ANCHOR: establishes “how we work here” baseline
- REFLECTION: describes what happened / what shifted
- MEMORY: explicit “what should be remembered” narrative
- REPAIR: pulls behavior back without reset
- DRIFT: detects deviation from narrative baseline
- ARBITER: final choice / policy decision in multi-agent runs
