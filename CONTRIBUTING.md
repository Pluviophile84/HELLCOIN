# Contributing

This repo is a Next.js 14 (App Router) site. Please keep commits small and use feature branches + PRs.

## Local setup

- Node version: see `.nvmrc`
- Install deps:

```bash
npm ci
```

## Quality gates (same as CI)

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

## Formatting

```bash
npm run format
```

## Do not commit build artifacts

`node_modules/`, `.next/`, logs, and local env files are intentionally ignored via `.gitignore`.
