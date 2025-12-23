# Repo Guardrails (No Drift)

## Branch policy (non-negotiable)
- `main` is the production baseline. Do not commit directly to main.
- All work happens on `work/*` branches (prefer using the `*-WORK` worktree folder).
- Merge to main only when explicitly instructed.

## Design continuity (no drift)
- DESIGN_SPEC.md is the single source of truth for visuals, motion, spacing, and UI primitives.
- If a new visual rule is needed, update DESIGN_SPEC.md FIRST, then implement.
- Reuse shared components/primitives; do not invent one-off styles per section without documenting it.

## Execution workflow
- Work in small, reviewable batches; prefer diffs/patches.
- After each meaningful batch: update PROJECT_STATE.md (done/next/decisions/issues).
- Run checks before pushing:
  - `npm run lint` (if present)
  - `npm run build`

## Copy-edit safety
- Prefer replace-over-append when editing copy. Do not duplicate lines or add extra variants unless explicitly asked.

## Safety
- Ask for approval before destructive commands or sweeping refactors.
