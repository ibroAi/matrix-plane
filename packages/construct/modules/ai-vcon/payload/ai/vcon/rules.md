# Villon-Con (vcon) Artifact Governance

Strikte regels voor het werken met Villon-Con (vcon) artifacts binnen de Minion Protocol monorepo.

## Regels voor AI
1. **Integriteit**: Wijzig nooit de 'parties' of 'dialog' secties van een bestaande vcon zonder expliciete instructie.
2. **Metadata**: Elke nieuwe vcon-entry MOET voorzien zijn van een `timestamp` en `source_agent`.
3. **Privacy**: Scrub alle PII (Personally Identifiable Information) uit de 'text' payloads tenzij de `privacy_level` op 'internal' staat.

## Workflow
- AI genereert een draft vcon in `ai/vcon/drafts/`.
- Menselijke controle is vereist voor commit naar de `vcon-api`.
