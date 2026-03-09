# Governed Execution Spine (Top Gun)

Regels voor AI-agents die opereren binnen de 'Spine' van het systeem.

## Checklists
Voordat een taak als 'voltooid' wordt gemarkeerd, moet de AI bewijzen dat elke stap in de relevante checklist is uitgevoerd.

## Afwijkingen
Als de AI een afwijking (divergence) detecteert van het verwachte pad:
1. Stop alle uitvoering.
2. Log de staat in `ai/spine/evidence.md`.
3. Wacht op menselijke instructie.
