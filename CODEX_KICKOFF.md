# Codex Kickoff (Big Work Mode)

Use this for multi-file changes, new sections, refactors, or redesigns.

## Mandatory first actions
1) Read: AGENTS.md, DESIGN_SPEC.md, PROJECT_STATE.md.
2) Summarize the constraints you must follow (branch policy, design continuity, copy safety).
3) Propose a phased plan and list files likely to change.
4) Wait for approval before implementing.

## Implementation rules
- Work in small batches and show diffs.
- After each batch: run `npm run build` (and `npm run lint` for non-trivial changes).
- Update PROJECT_STATE.md after each batch.
