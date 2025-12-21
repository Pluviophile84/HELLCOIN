# Codex Kickoff (Use this at the start of any redesign task)

You are working in this repo under AGENTS.md rules.

## Mandatory first actions (do before coding)
1) Read: AGENTS.md, DESIGN_SPEC.md, PROJECT_STATE.md.
2) Summarize constraints you must follow (branch safety, content immutability, anchors/order, no new visual rules without spec update).
3) Propose a phased plan:
   - Phase 1: design system / primitives (if needed)
   - Phase 2+: section batches
   - Include which files will change per phase.
4) Wait for approval before implementing.

## Implementation rules
- Work in small batches and show diffs.
- After each batch: run `npm run build` (and `npm run lint` when non-trivial).
- Update PROJECT_STATE.md after each batch (done/next/decisions/issues).
