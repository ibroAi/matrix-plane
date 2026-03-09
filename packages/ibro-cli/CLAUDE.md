# ibro-cli — Package Instructions

**Package:** `@minion-protocol/ibro-cli`
**Binary:** `ibro`
**Location:** `packages/clis/ibro-cli`

---

## Wat dit is

MVP scaffold voor een CLI die AI-governance modules installeert vanuit `ai-kit`. De volledige behavioral spec staat in `docs/CLI_CONTRACT.md` — lees die **voor** je iets implementeert.

Commands: `ibro init`, `ibro add <module>`, `ibro list`, `ibro update`

---

## Belangrijke bestanden

| Bestand | Beschrijving |
|---------|-------------|
| `src/cli.ts` | Enige source file — MVP scaffold (21 regels) |
| `docs/CLI_CONTRACT.md` | Behavioral contract: exact gedrag per command |
| `docs/MENTAL_MODEL.md` | Scope en grenzen van ibro-cli vs ai-kit |
| `docs/ROADMAP.md` | v0.1 → v1.0 evolutie |
| `docs/BACKLOG.md` | Concrete implementatietaken |
| `tsconfig.json` | Extends root `tsconfig.base.json` |

---

## Build & Dev

```bash
# Build (TypeScript → dist/)
npm run build -w @minion-protocol/ibro-cli

# Dev (watch)
npm run dev -w @minion-protocol/ibro-cli

# Smoke test na build
node packages/clis/ibro-cli/dist/cli.js --help
```

Output: `packages/clis/ibro-cli/dist/cli.js`

---

## Architectuur

- **Zero runtime dependencies** — bewuste designkeuze, niet per ongeluk
- Geen DB, geen secrets, geen API calls in huidige scope
- Geen interne monorepo-lib dependencies
- TypeScript → CommonJS via `tsc`
- Node16 module resolution (geen `.js` imports nodig zolang er geen interne imports zijn)

---

## Implementatie regels

- Lees `docs/CLI_CONTRACT.md` voor je een command implementeert — de behavioral spec staat daar
- Overwrite policy (welke bestanden ibro mag overschrijven) staat ook in CLI_CONTRACT.md
- Lockfile schema: `.ibro.lock.json` in target project root
- Modules worden gedownload van GitHub (`ibroAi/ai-kit`), niet van npm
- Native `fetch` (Node 18+) voor network calls — geen extra HTTP-lib

---

## Niet doen

- Geen `commander` of andere CLI-framework toevoegen tenzij expliciet gevraagd
- Geen core-lib dependency tenzij expliciet gevraagd
- Geen `ai/` governance folder aanmaken in dit package — die zit in ai-kit modules
