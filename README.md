# 🪦 Project Graveyard Scanner (PGS)

[![npm version](https://img.shields.io/npm/v/@efinitydev/project-graveyard-scanner.svg?style=flat-square)](https://www.npmjs.com/package/@efinitydev/project-graveyard-scanner)

A professional CLI tool and library by **Efinity** to sift through your projects and collect all forgotten `TODO`, `FIXME`, and `HACK` comments.

## Why PGS?
As developers, we leave comments throughout our code. Many of these tasks are never completed and disappear into the "project graveyard." PGS brings these tasks back to life by reporting them centrally, helping you keep your codebase clean.

## Features
- **CLI Tool:** Fast and colorful terminal output to scan any directory.
- **Library Support:** Exported functions to integrate scanning logic into your own (React/Node) applications.
- **CI Ready:** Includes GitHub Actions workflow for automated build verification.
- **Fast Scanning:** Uses `fast-glob` for high-performance file system traversal.

## Installation

### Global CLI
Install the tool globally to use the `pgs` command anywhere:
```bash
npm install -g @efinitydev/project-graveyard-scanner
```

### As a Library
Add it to your project:
```bash
npm install @efinitydev/project-graveyard-scanner
```

## Usage

### CLI
Scan the current directory:
```bash
pgs
```

Scan a specific directory with exclusions:
```bash
pgs /path/to/projects --exclude "node_modules,dist,temp"
```

Save results to a Markdown report:
```bash
pgs . --output GRAVEYARD.md
```

### Library API
```typescript
import { scanDirectory, report } from '@efinitydev/project-graveyard-scanner';

const results = await scanDirectory('./my-projects', ['node_modules']);
console.log(results);
```

## License
This project is licensed under the **PolyForm Non-Commercial License 1.0.0**. See the `LICENSE` file for details. For commercial usage, please contact **Efinity (Emiel Dehaen)**.

---
Built with ⚡ by [Efinity](https://efinity.be)
