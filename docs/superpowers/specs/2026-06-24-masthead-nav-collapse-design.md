# Masthead Navigation Arrows + Scroll-Collapse — Design

**Date:** 2026-06-24
**Status:** Approved (ready for implementation plan)

## Summary

Add two enhancements to the `Masthead` on each `RoundtablePage`:

1. **Navigation arrows** at the far left/right ends of the header that move between
   the three series documents (Part I → II → III), **wrapping around** at the ends
   (left arrow on Part I → Part III; right arrow on Part III → Part I). Both arrows
   are always active.
2. **Scroll-collapse:** as the user scrolls down, the masthead pins to the top
   (`position: sticky`) and smoothly condenses into a slim bar showing only the
   title (`span.text`) plus the navigation arrows. The overline, subtitle, and date
   line collapse away.

## Decisions (settled during brainstorming)

- **Collapse mode:** Sticky condensing header — one element, CSS-driven. (Not a
  separate scroll-away hero + slide-in bar.)
- **Edge behavior:** Wrap around the series. With 3 parts, `prev`/`next` always
  resolve, so both arrows are always active.
- **Arrows always visible:** Chevrons show in both the full hero state and the
  collapsed bar.
- **Scroll-to-top on part change:** Navigating to a new part lands the reader at the
  top of the new document (does not preserve scroll position).

## Architecture

### 1. Navigation data — keep `Masthead` presentational

`Masthead` must not know about the `DOCUMENTS` registry. Add one pure helper to
`src/data/documents.ts`:

```ts
export interface PartNavTarget {
  slug: string
  partLabel: string // "Part I" / "Part II" / "Part III"
  navTitle: string // short distinctive title for the destination
}

export function getAdjacentParts(id: DocumentId): {
  prev: PartNavTarget
  next: PartNavTarget
}
```

Implementation: find the index of the entry whose `doc.id === id` in `DOCUMENTS`,
then wrap with modulo over `n = DOCUMENTS.length`:

- `prev = DOCUMENTS[(i - 1 + n) % n]`
- `next = DOCUMENTS[(i + 1) % n]`

Each target is projected to `{ slug, partLabel, navTitle }`. Throw if `id` is not
found (mirrors the existing dev-time referential-integrity discipline in this file).

`RoundtablePage` has `document.id`, so it calls `getAdjacentParts(document.id)` and
passes `prev` and `next` to `<Masthead>`.

### 2. `Masthead` component changes

New props:

```ts
interface MastheadProps {
  masthead: MastheadData
  prev: PartNavTarget
  next: PartNavTarget
  // collapsed state is derived internally via the hook (see §3)
}
```

- Render two `<Link>` buttons using `lucide-react`'s `ChevronLeft` / `ChevronRight`,
  absolutely positioned at the far left/right edges of the header, vertically
  centered (`top: 50%; transform: translateY(-50%)`) so they stay put as the bar
  height shrinks.
- Accessibility: each arrow gets an `aria-label` such as
  `"Next part: Part II — What's Actually Being Done"` and a native `title` attribute
  for a hover tooltip. The chevron icon itself is `aria-hidden`.
- Wrap the existing overline / `h1` / subtitle / date-line markup in a single
  container element (e.g. `.masthead-body`) so the collapsible content can be
  targeted and animated as a unit. The `h1` (the `span.text` title) and the arrows
  remain visible when collapsed.
- The arrows are `<Link to={"/" + target.slug}>` so navigation stays within the SPA
  router.

### 3. Scroll-collapse hook

New reusable hook `src/hooks/useScrollCollapse.ts`:

```ts
export function useScrollCollapse(threshold = 80): boolean
```

- Holds a `collapsed` boolean in state.
- Subscribes to `window` `scroll` with a **passive** listener, throttled via
  `requestAnimationFrame` (avoid layout thrash on every scroll event).
- Sets `collapsed = window.scrollY > threshold`.
- Cleans up the listener and any pending rAF on unmount.
- Initializes from the current `scrollY` on mount (handles refresh-while-scrolled).

`Masthead` calls the hook and applies `data-collapsed={collapsed}` to its
`<header className="masthead">`.

### 4. CSS (`src/styles/base.css`, token-driven, matches existing convention)

- `.masthead`: add `position: sticky; top: 0; z-index: 50;` and a `transition` on
  `padding` (and `h1` font-size). Keep the existing dark `--ink` background,
  `overflow: hidden`, scan-line `::before`, and accent `::after` bottom stripe.
- `.masthead[data-collapsed='true']`: reduce vertical padding; shrink the `h1`
  font-size; collapse `.overline`, `.subtitle`, `.date-line` via
  `max-height: 0; opacity: 0; margin: 0; overflow: hidden` with a transition.
- `.masthead-nav` (`--prev` / `--next`): absolutely positioned circular hit area,
  subtle resting state, accent color on `:hover` and `:focus-visible`. Ensure a
  comfortable tap target (≥ 40px) for touch.
- Responsive: on narrow viewports, tighten the arrow inset and guarantee the title
  block has enough horizontal padding to clear the arrows (no overlap).
- `@media (prefers-reduced-motion: reduce)`: disable the transitions — the collapse
  still happens, just instantly.

### 5. Scroll-to-top on part change

Navigating between parts should start the reader at the top of the new document. Add
an effect keyed on the route `slug` (in `RoundtablePage` or `DocumentRoute`) that
calls `window.scrollTo(0, 0)` when the slug changes.

### 6. PersonasBar interaction

No change to `PersonasBar`. Because the masthead is `position: sticky` with a
`z-index`, the `PersonasBar` and article content scroll up _beneath_ the pinned,
condensed masthead. The masthead's solid `--ink` background and accent stripe keep
the boundary clean.

## Testing

- `src/data/documents.test.ts`: add `getAdjacentParts` cases —
  - Part I → `prev` is Part III (wrap), `next` is Part II.
  - Part II → `prev` Part I, `next` Part III.
  - Part III → `prev` Part II, `next` is Part I (wrap).
  - Unknown id throws.
- New `src/components/Masthead.test.tsx`: given `prev`/`next`, both arrow links
  render with the correct `href` (`/<slug>`) and the expected `aria-label`. Render
  inside a `MemoryRouter` (consistent with existing router-dependent tests).
- New `src/hooks/useScrollCollapse.test.ts` (or `.tsx`): mount, set
  `window.scrollY` and dispatch a synthetic `scroll` event, assert the returned
  boolean toggles across the threshold and back.

## Files touched

- `src/data/documents.ts` — add `PartNavTarget` + `getAdjacentParts`.
- `src/data/documents.test.ts` — adjacency tests.
- `src/components/Masthead.tsx` — props, arrows, collapse wiring.
- `src/components/Masthead.test.tsx` — new.
- `src/hooks/useScrollCollapse.ts` — new.
- `src/hooks/useScrollCollapse.test.ts` — new.
- `src/pages/RoundtablePage.tsx` — pass `prev`/`next`; scroll-to-top on slug change.
- `src/styles/base.css` — sticky + collapse + arrow styles.

## Out of scope (YAGNI)

- Keyboard arrow-key (←/→) shortcuts for part navigation.
- Progress indicator / reading position in the collapsed bar.
- Animated cross-fade between documents on navigation.
- Generalizing the sticky-collapse pattern beyond the masthead.
