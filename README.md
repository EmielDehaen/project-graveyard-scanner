# 🪦 Project Graveyard Scanner (PGS)

A handy CLI tool to sift through your projects and collect all forgotten `TODO`, `FIXME`, and `HACK` comments.

## Why PGS?
As developers, we leave comments throughout our code. Many of these tasks are never completed and disappear into the "project graveyard." PGS brings these tasks back to life by reporting them centrally.

## Tech Stack
- **TypeScript**: For type-safety and better developer experience.
- **Node.js**: The runtime.
- **Commander**: For a professional CLI interface.
- **Fast-glob**: For super-fast file scanning.
- **Chalk**: For colorful terminal output.

## Installation & Usage

### Prerequisites
- Node.js & npm

### Installation
```bash
npm install
```

### Scanning
Scan the current directory:
```bash
npm run start
```

Scan a specific directory:
```bash
npm run start -- /path/to/projects
```

Add exclusions:
```bash
npm run start -- . --exclude "node_modules,dist,temp"
```

Save results as Markdown:
```bash
npm run start -- . --output GRAVEYARD.md
```

## Architecture Decisions
I chose **TypeScript** because it is the standard for modern Node.js applications and minimizes errors during development. **Fast-glob** is essential because scanning thousands of files across multiple projects would otherwise be too slow. The interface is kept simple with **Commander** to ensure it is immediately usable for any developer.
