# Repository Guidelines

## Project Structure & Module Organization
- `app/` holds Next.js App Router entry points (routes, `layout.tsx`, `page.tsx`), global styles in `app/globals.css`, and metadata in `robots.ts`/`sitemap.ts`.
- `components/` contains reusable UI; `components/layout/`, `components/sections/`, and `components/ui/` organize larger layout pieces vs. smaller building blocks.
- `lib/` is for shared utilities and constants.
- `public/` serves static assets at `/`.

## Build, Test, and Development Commands
- `npm ci` installs dependencies for a clean setup.
- `npm run dev` starts the local dev server.
- `npm run build` creates a production build.
- `npm run start` runs the production build.
- `npm run lint` runs ESLint (Next.js config).
- `npm run typecheck` runs TypeScript without emit.
- `npm run format` formats code with Prettier.
- `npm run format:check` verifies formatting (CI gate).

## Coding Style & Naming Conventions
- TypeScript + React function components in `.tsx`.
- Prettier is the source of truth; avoid manual Tailwind class reordering (the plugin enforces it).
- Component files use PascalCase (e.g., `components/HomeClient.tsx`); utilities use camelCase (e.g., `lib/bodyScrollLock.ts`).

## Testing Guidelines
- No test framework is configured yet; quality gates are `lint`, `typecheck`, and `build`.
- If you add tests, include the corresponding npm script and document it here.

## Commit & Pull Request Guidelines
- Keep commits small and focused; history uses short imperative messages with occasional conventional prefixes (e.g., `chore: format files`).
- Use feature branches and open PRs (see `CONTRIBUTING.md`).
- PRs should include a brief summary, testing notes (commands run), and screenshots for UI changes.

## Tooling & Environment
- Node.js 20 (see `.nvmrc`); package manager is npm 10.
- Do not commit build artifacts (`node_modules/`, `.next/`) or local workspace files.

# Codex Redesign Protocol (No Drift)

## Branch safety
- Never work directly on `main`. All experimental/redesign work must stay on the `GEMINI` branch (or another explicitly stated non-main branch).
- Before making changes, confirm: `git branch --show-current` and `git status`.

## Content immutability
- Do NOT rewrite, paraphrase, shorten, or remove any existing website copy unless explicitly instructed.
- Do NOT change section order.
- Do NOT break section IDs/anchors used for navigation.

## Design continuity rules
- Treat the repo as the source of truth. If `DESIGN_SPEC.md` exists, read it first and follow it.
- If a new visual rule is needed, update `DESIGN_SPEC.md` BEFORE implementing it.
- Prefer shared primitives/components over one-off styling. Avoid inventing a new card/border/motion style per section unless the spec says so.

## Execution workflow
- Work in small, reviewable batches (patch-based changes).
- Prefer showing diffs/patches over wholesale rewrites.
- After each batch:
  - ensure `npm run build` passes (and run `npm run lint` if the change is non-trivial),
  - summarize changes and files touched.

## State tracking for multi-day work
- Maintain `PROJECT_STATE.md` during any multi-session redesign:
  - what’s done
  - what’s next
  - decisions locked
  - known issues
- If `PROJECT_STATE.md` does not exist, create it before starting a multi-session redesign.

## Safety
- Ask for approval before running destructive commands (deletes, resets, mass renames) or making sweeping refactors.
