# Validation Policy

Elke wijziging door een AI moet worden geverifieerd.

## Regels
1. **Empirische Reproductie**: Fix nooit een bug zonder eerst een falende test te schrijven.
2. **Geen Regressie**: Bestaande tests mogen alleen worden gewijzigd als de business logica verandert.
3. **Golden Path**: Nieuwe features vereisen altijd een update aan `test/golden-path.test.ts` of een equivalente integratietest.
