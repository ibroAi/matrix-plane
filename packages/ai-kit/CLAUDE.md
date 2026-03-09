# ai-kit — Package Instructions

**Package:** `@minion-protocol/ai-kit`
**Location:** `packages/libs/ai-kit`

---

## Wat dit is

Pure content package — geen code, geen build stap, geen runtime. Bevat folder-payloads (modules) die `ibro-cli` installeert in doelprojecten via GitHub download.

---

## Belangrijke bestanden

| Bestand | Beschrijving |
|---------|-------------|
| `registry.json` | Module index — alle modules met naam, versie, GitHub source |
| `modules/{name}/module.json` | Per-module metadata en `copies` spec |
| `modules/{name}/payload/` | Bestanden die 1:1 gekopieerd worden |
| `docs/MENTAL_MODEL.md` | Scope en grenzen van ai-kit |
| `docs/ROADMAP.md` | v0.1 → toekomstige evolutie |

---

## Build & Dev

```bash
# Geen build stap — pure content
# Workspace check:
npm list --workspaces | grep ai-kit
```

---

## Nieuwe module toevoegen

1. Maak `modules/{naam}/` aan
2. Schrijf `modules/{naam}/module.json`:
   ```json
   {
     "name": "{naam}",
     "version": "0.1.0",
     "description": "...",
     "copies": [
       { "from": "payload/{target}", "to": "{target}" }
     ]
   }
   ```
3. Maak `modules/{naam}/payload/` aan met de te kopiëren bestanden
4. Voeg de module toe aan `registry.json` onder `modules`

---

## registry.json bijhouden

Elke nieuwe module moet in `registry.json` staan:

```json
{
  "modules": {
    "{naam}": {
      "latest": "0.1.0",
      "description": "...",
      "source": {
        "type": "github",
        "repo": "ibroAi/ai-kit",
        "ref": "main",
        "path": "modules/{naam}"
      }
    }
  }
}
```

---

## Regels

- **Geen executable code** in modules of payload — alleen Markdown, YAML, JSON, plaintext
- **Geen transformatie** — bestanden worden 1:1 gekopieerd, geen templating
- **User-owned files** (context.md, assumptions.md, backlog.md, work/**) worden nooit overschreven door ibro — houd dit in gedachten bij module design
- **Framework-owned files** (governance/**, templates/**) mogen overschreven worden bij update
- `registry.json` altijd updaten als je een module toevoegt of verwijdert

---

## Niet doen

- Geen `package.json` scripts toevoegen (er is niets te builden)
- Geen TypeScript, JavaScript of Python toevoegen aan modules
- Geen executable code in payload bestanden
- Geen AI-runtime logic — dit is structuur, geen executie
