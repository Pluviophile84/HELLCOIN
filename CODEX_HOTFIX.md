# Codex Hotfix (Small Work Mode)

Use this for a small, contained change (typically 1–3 files), e.g.:
- change a color, spacing, font size
- tweak a single component
- fix a small UI bug

## Rules
1) Still follow AGENTS.md + DESIGN_SPEC.md (no drift).
2) No long kickoff summary or big plan.
3) Do the smallest safe patch and show the diff.
4) Run checks only if relevant or requested:
   - If change is purely CSS/tailwind class: skip build/lint unless requested.
   - If change touches logic/components: run `npm run build` (and `npm run lint` if available) if requested.
5) Never push unless explicitly instructed.
