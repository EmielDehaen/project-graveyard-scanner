# 🪦 Project Graveyard Scanner (PGS)

Een handige CLI-tool om door al je projecten te spitten en alle vergeten `TODO`, `FIXME` en `HACK` comments te verzamelen.

## Waarom PGS?
Als developers laten we overal comments achter in onze code. Veel van deze taken worden nooit afgerond en verdwijnen in de "project graveyard". PGS brengt deze taken weer tot leven door ze centraal te rapporteren.

## Tech Stack
- **TypeScript**: Voor type-safety en betere developer experience.
- **Node.js**: De runtime.
- **Commander**: Voor een professionele CLI interface.
- **Fast-glob**: Voor supersnelle file scanning.
- **Chalk**: Voor een kleurrijke terminal output.

## Installatie & Gebruik

### Vereisten
- Node.js & npm

### Installatie
```bash
npm install
```

### Scannen
Scan de huidige map:
```bash
npm run start
```

Scan een specifieke map:
```bash
npm run start -- /pad/naar/projecten
```

Exclusies toevoegen:
```bash
npm run start -- . --exclude "node_modules,dist,temp"
```

Resultaat opslaan als Markdown:
```bash
npm run start -- . --output GRAVEYARD.md
```

## Waarom deze keuzes?
Ik heb gekozen voor **TypeScript** omdat het de standaard is voor moderne Node.js applicaties en fouten tijdens development minimaliseert. **Fast-glob** is essentieel omdat het scannen van duizenden bestanden in meerdere projecten anders te traag zou zijn. De interface is simpel gehouden met **Commander** zodat het direct bruikbaar is voor elke developer.
