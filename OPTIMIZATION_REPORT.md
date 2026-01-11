# Optimization Report (Code-only, Zero Visual Drift)

This optimization pass is intentionally limited to changes that preserve **design, behavior, and motion feel** for default users.

## Implemented (Safe) Improvements

### 1) Homepage no longer wrapped in a single client boundary
- Replaced `AppShellClient` (client wrapper around the entire page) with `AppChromeClient` (client-only chrome: loader, navbar, scroll progress, overlay).
- `app/page.tsx` now renders page content outside the client chrome.

**Benefit:** reduces the size of the hydrated client subtree and prevents a single client component from owning the full homepage.

### 2) Hero scroll hot path: removed per-frame React state updates
- `components/sections/Hero.tsx` no longer calls `setState` on scroll.
- Scroll updates write to scoped CSS variables on the hero section element.
- Existing transitions and visual output are preserved.

**Benefit:** fewer React renders during scroll, smoother scrolling on mobile.

### 3) Scroll progress bar: removed per-frame React state updates
- `components/ui/ScrollProgress.tsx` updates the progress bar via `transform: scaleX(...)` directly.
- Preserves baseline behavior: short pages do not render the bar.
- Reduced-motion users do not get continuous updates (aligns with accessibility intent).

**Benefit:** negligible overhead during scroll.

### 4) Server component conversion where strictly safe
- `components/sections/ThePit.tsx` converted to a Server Component (no hooks, no client-only APIs).

**Benefit:** small hydration reduction.

## Not Implemented (By Design, to avoid behavior drift)
A full “server/island refactor” of the animated sections would require re-implementing Framer Motion variants/whileInView behavior without turning the content elements into client motion components, which risks animation timing/feel drift. Under the “zero behavior change” constraint, those sections remain client components.

## Validation Checklist (for your local environment)
- `npm ci`
- `npm run build`
- `npm run start`
- Manual parity check: hero scroll feel, navbar, overlays, and all section animations.
