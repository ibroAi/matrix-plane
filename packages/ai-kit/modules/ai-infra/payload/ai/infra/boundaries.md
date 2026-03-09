# Infrastructure Boundaries

Strikte grenzen voor AI-interactie met de infrastructuur.

## Verboden Gebieden
- Wijzig NOOIT `.env` bestanden direct.
- Gebruik alleen de `secrets-lib` voor toegang tot credentials via Infisical.
- Raak `k8s/` configuraties niet aan zonder expliciete 'infrastructure' task-id.

## Veilige Gebieden
- Lezen van `API.md` bestanden in `apis/`.
- Inspecteren van `package.json` voor afhankelijkheden.
