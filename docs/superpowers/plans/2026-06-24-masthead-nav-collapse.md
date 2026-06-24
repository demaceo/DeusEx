# Masthead Navigation Arrows + Scroll-Collapse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add wrap-around prev/next navigation arrows to the roundtable masthead and make the masthead condense into a slim sticky bar (title + arrows only) as the reader scrolls.

**Architecture:** A pure data helper (`getAdjacentParts`) computes the wrap-around neighbors so the `Masthead` stays presentational. A small reusable hook (`useScrollCollapse`) tracks scroll position and toggles a `data-collapsed` attribute. The collapse animation is entirely CSS in `base.css` (the masthead becomes `position: sticky`). `RoundtablePage` wires the neighbors in and resets scroll to the top on part change.

**Tech Stack:** React 19, react-router-dom v7 (`Link`, `MemoryRouter` in tests), lucide-react (chevron icons), Vitest + @testing-library/react, hand-authored token-driven CSS.

## Global Constraints

- **Keep `Masthead` presentational** — it must NOT import from `src/data/documents`. Neighbors arrive as props.
- **Wrap-around navigation** — left arrow on Part I → Part III; right arrow on Part III → Part I. Both arrows always active.
- **Collapse threshold:** `80` px of `window.scrollY` (the hook's default).
- **Arrow accessible name / tooltip wording (verbatim):**
  - prev: `Previous part: <partLabel> — <navTitle>` (em-dash `—`, U+2014)
  - next: `Next part: <partLabel> — <navTitle>`
- **Tests use `globals: false`** — every test file must `import { describe, it, expect, ... } from 'vitest'`. Router-dependent components render inside `<MemoryRouter>`.
- **Pre-commit hook runs `prettier --write`, `tsc -b`, and `vitest run` on every commit** — each task's commit must leave the build and full suite green. Do not use `--no-verify`.
- **CSS lives in `src/styles/base.css`** and uses existing tokens (`--ink`, `--paper`, `--accent`, `--masthead-accent`). No new CSS framework.

## File Structure

- `src/data/documents.ts` — add `PartNavTarget` interface + `getAdjacentParts(id)` (wrap-around neighbor lookup).
- `src/data/documents.test.ts` — add adjacency tests.
- `src/hooks/useScrollCollapse.ts` — **new** reusable scroll-threshold hook.
- `src/hooks/useScrollCollapse.test.ts` — **new** hook tests.
- `src/components/Masthead.tsx` — add `prev`/`next` props, chevron arrow links, and collapse wiring (`data-collapsed`).
- `src/components/Masthead.test.tsx` — **new** arrow-rendering tests.
- `src/pages/RoundtablePage.tsx` — compute neighbors, pass to `Masthead`, scroll-to-top on part change.
- `src/pages/RoundtablePage.test.tsx` — add scroll-to-top test.
- `src/test/setup.ts` — stub `window.scrollTo` (jsdom doesn't implement it).
- `src/styles/base.css` — sticky + collapse + arrow styles.

---

### Task 1: `getAdjacentParts` data helper

**Files:**

- Modify: `src/data/documents.ts` (add after the `DocumentEntry`/`DOCUMENTS` block, near the existing `getDocumentBySlug`)
- Test: `src/data/documents.test.ts`

**Interfaces:**

- Consumes: existing `DOCUMENTS` array and `DocumentId` type.
- Produces:
  - `export interface PartNavTarget { slug: string; partLabel: string; navTitle: string }`
  - `export function getAdjacentParts(id: DocumentId): { prev: PartNavTarget; next: PartNavTarget }`

Reference data (already in the repo): part-i → slug `real-costs`, label `Part I`, navTitle `A Roundtable on Real Costs`; part-ii → slug `whats-being-done`, label `Part II`, navTitle `What's Actually Being Done`; part-iii → slug `getting-right`, label `Part III`, navTitle `What It's Actually Getting Right`.

- [ ] **Step 1: Write the failing tests**

Add to `src/data/documents.test.ts` — extend the existing top imports to include `getAdjacentParts`, then add a new `describe` block:

```ts
// add getAdjacentParts to the existing import from './documents'
import {
  DOCUMENTS,
  DOCUMENTS_BY_SLUG,
  assertReferentialIntegrity,
  getAdjacentParts,
  getDocumentBySlug,
} from './documents'

describe('getAdjacentParts (wrap-around series navigation)', () => {
  it('wraps backward from Part I to Part III and forward to Part II', () => {
    const { prev, next } = getAdjacentParts('part-i')
    expect(prev).toEqual({
      slug: 'getting-right',
      partLabel: 'Part III',
      navTitle: "What It's Actually Getting Right",
    })
    expect(next).toEqual({
      slug: 'whats-being-done',
      partLabel: 'Part II',
      navTitle: "What's Actually Being Done",
    })
  })

  it('returns direct neighbors for the middle part', () => {
    const { prev, next } = getAdjacentParts('part-ii')
    expect(prev.slug).toBe('real-costs')
    expect(next.slug).toBe('getting-right')
  })

  it('wraps forward from Part III back to Part I', () => {
    const { prev, next } = getAdjacentParts('part-iii')
    expect(prev.slug).toBe('whats-being-done')
    expect(next).toEqual({
      slug: 'real-costs',
      partLabel: 'Part I',
      navTitle: 'A Roundtable on Real Costs',
    })
  })

  it('throws on an unknown document id', () => {
    // @ts-expect-error exercising the runtime guard with an invalid id
    expect(() => getAdjacentParts('part-iv')).toThrow()
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/data/documents.test.ts`
Expected: FAIL — `getAdjacentParts is not a function` (or import error).

- [ ] **Step 3: Implement `getAdjacentParts`**

In `src/data/documents.ts`, add the interface and function immediately after `getDocumentBySlug` (around line 52). `DocumentId` is already imported transitively via `RoundtableDocument`; if not in scope, add it to the existing `import type { Block, RoundtableDocument } from '../types/document'` line → `import type { Block, DocumentId, RoundtableDocument } from '../types/document'`.

```ts
/** A neighboring document, projected for masthead navigation. */
export interface PartNavTarget {
  slug: string
  partLabel: string
  navTitle: string
}

/**
 * The previous and next documents in series order, wrapping around at the ends
 * (Part I's prev is Part III; Part III's next is Part I). Throws if `id` is unknown.
 */
export function getAdjacentParts(id: DocumentId): {
  prev: PartNavTarget
  next: PartNavTarget
} {
  const n = DOCUMENTS.length
  const i = DOCUMENTS.findIndex((entry) => entry.doc.id === id)
  if (i === -1) {
    throw new Error(`getAdjacentParts: unknown document id "${id}"`)
  }
  const toTarget = (entry: DocumentEntry): PartNavTarget => ({
    slug: entry.doc.slug,
    partLabel: entry.partLabel,
    navTitle: entry.navTitle,
  })
  return {
    prev: toTarget(DOCUMENTS[(i - 1 + n) % n]),
    next: toTarget(DOCUMENTS[(i + 1) % n]),
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/data/documents.test.ts`
Expected: PASS (all `getAdjacentParts` cases plus the existing registry tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/documents.ts src/data/documents.test.ts
git commit -m "Add getAdjacentParts wrap-around series-navigation helper"
```

(The pre-commit hook runs prettier + `tsc -b` + `vitest run`; expect all green.)

---

### Task 2: `useScrollCollapse` hook

**Files:**

- Create: `src/hooks/useScrollCollapse.ts`
- Test: `src/hooks/useScrollCollapse.test.ts`

**Interfaces:**

- Consumes: nothing from earlier tasks (React only).
- Produces: `export function useScrollCollapse(threshold?: number): boolean` — `true` once `window.scrollY` exceeds `threshold` (default `80`), `false` at/below it.

- [ ] **Step 1: Write the failing tests**

Create `src/hooks/useScrollCollapse.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollCollapse } from './useScrollCollapse'

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true })
}

describe('useScrollCollapse', () => {
  beforeEach(() => {
    setScrollY(0)
    // Run rAF callbacks synchronously so scroll handling is deterministic in tests.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts uncollapsed at the top of the page', () => {
    const { result } = renderHook(() => useScrollCollapse(80))
    expect(result.current).toBe(false)
  })

  it('collapses past the threshold and expands again below it', () => {
    const { result } = renderHook(() => useScrollCollapse(80))

    act(() => {
      setScrollY(120)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      setScrollY(10)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(false)
  })

  it('initializes collapsed when the page is already scrolled', () => {
    setScrollY(200)
    const { result } = renderHook(() => useScrollCollapse(80))
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/hooks/useScrollCollapse.test.ts`
Expected: FAIL — cannot resolve `./useScrollCollapse`.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useScrollCollapse.ts`:

```ts
import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has scrolled past `threshold` pixels. Drives the
 * masthead's collapse-on-scroll behavior. Scroll handling is rAF-throttled and
 * uses a passive listener to avoid layout thrash.
 */
export function useScrollCollapse(threshold = 80): boolean {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  )

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      setCollapsed(window.scrollY > threshold)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    // Sync once in case the page mounted already scrolled (refresh / back-nav).
    setCollapsed(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return collapsed
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/hooks/useScrollCollapse.test.ts`
Expected: PASS (all three cases).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollCollapse.ts src/hooks/useScrollCollapse.test.ts
git commit -m "Add useScrollCollapse hook for scroll-threshold tracking"
```

---

### Task 3: Masthead arrows + collapse wiring (and pass-through from RoundtablePage)

`Masthead` gains two **required** props, so `RoundtablePage` must pass them in the same commit to keep `tsc -b` green. Both changes land together.

**Files:**

- Modify: `src/components/Masthead.tsx`
- Modify: `src/pages/RoundtablePage.tsx` (pass neighbors only — scroll-to-top comes in Task 4)
- Test: `src/components/Masthead.test.tsx` (new)

**Interfaces:**

- Consumes: `PartNavTarget` from `src/data/documents` (Task 1); `useScrollCollapse` from `src/hooks/useScrollCollapse` (Task 2); `ChevronLeft`, `ChevronRight` from `lucide-react`.
- Produces: `Masthead` now requires `prev: PartNavTarget` and `next: PartNavTarget` props.

- [ ] **Step 1: Verify the lucide-react chevron exports exist**

Run: `node -e "const m=require('lucide-react'); console.log(typeof m.ChevronLeft, typeof m.ChevronRight)"`
Expected: prints `function function` (or `object object` for forwardRef components — either confirms they exist). If it errors, the icons are still importable as ESM; proceed and rely on the test.

- [ ] **Step 2: Write the failing test**

Create `src/components/Masthead.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Masthead } from './Masthead'
import type { Masthead as MastheadData } from '../types/document'
import type { PartNavTarget } from '../data/documents'

const masthead: MastheadData = {
  overline: 'Overline text',
  titleLines: [[{ text: 'The ' }, { text: 'Title', em: true }]],
  subtitle: 'A subtitle sentence.',
  dateLine: 'Updated 2026',
  accentColor: 'accent',
}

const prev: PartNavTarget = {
  slug: 'getting-right',
  partLabel: 'Part III',
  navTitle: "What It's Actually Getting Right",
}
const next: PartNavTarget = {
  slug: 'whats-being-done',
  partLabel: 'Part II',
  navTitle: "What's Actually Being Done",
}

function renderMasthead() {
  return render(
    <MemoryRouter>
      <Masthead masthead={masthead} prev={prev} next={next} />
    </MemoryRouter>,
  )
}

describe('Masthead navigation arrows', () => {
  it('renders prev/next arrows linking to the adjacent parts with accessible labels', () => {
    renderMasthead()
    const prevLink = screen.getByRole('link', { name: /previous part: part iii/i })
    const nextLink = screen.getByRole('link', { name: /next part: part ii/i })
    expect(prevLink).toHaveAttribute('href', '/getting-right')
    expect(nextLink).toHaveAttribute('href', '/whats-being-done')
  })

  it('still renders the title and subtitle', () => {
    renderMasthead()
    expect(screen.getByText('A subtitle sentence.')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run src/components/Masthead.test.tsx`
Expected: FAIL — `Masthead` does not accept `prev`/`next` and renders no `link` roles.

- [ ] **Step 4: Implement the Masthead changes**

Replace the full contents of `src/components/Masthead.tsx` with:

```tsx
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollCollapse } from '../hooks/useScrollCollapse'
import type { PartNavTarget } from '../data/documents'
import type { Masthead as MastheadData } from '../types/document'

interface MastheadProps {
  masthead: MastheadData
  prev: PartNavTarget
  next: PartNavTarget
}

export function Masthead({ masthead, prev, next }: MastheadProps) {
  const collapsed = useScrollCollapse()

  return (
    <header className="masthead" data-accent={masthead.accentColor} data-collapsed={collapsed}>
      <Link
        className="masthead-nav masthead-nav--prev"
        to={`/${prev.slug}`}
        aria-label={`Previous part: ${prev.partLabel} — ${prev.navTitle}`}
        title={`${prev.partLabel} — ${prev.navTitle}`}
      >
        <ChevronLeft aria-hidden size={28} />
      </Link>

      <div className="masthead-body">
        <p className="overline">{masthead.overline}</p>
        <h1>
          {masthead.titleLines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 ? <br /> : null}
              {line.map((span, spanIndex) =>
                span.em ? (
                  <em key={spanIndex}>{span.text}</em>
                ) : (
                  <Fragment key={spanIndex}>{span.text}</Fragment>
                ),
              )}
            </Fragment>
          ))}
        </h1>
        <p className="subtitle">{masthead.subtitle}</p>
        <p className="date-line">{masthead.dateLine}</p>
      </div>

      <Link
        className="masthead-nav masthead-nav--next"
        to={`/${next.slug}`}
        aria-label={`Next part: ${next.partLabel} — ${next.navTitle}`}
        title={`${next.partLabel} — ${next.navTitle}`}
      >
        <ChevronRight aria-hidden size={28} />
      </Link>
    </header>
  )
}
```

- [ ] **Step 5: Wire the neighbors in RoundtablePage**

In `src/pages/RoundtablePage.tsx`, import the helper and compute neighbors. Add to the imports:

```tsx
import { getAdjacentParts } from '../data/documents'
```

Then inside the component body, before the `return`:

```tsx
const { prev, next } = getAdjacentParts(document.id)
```

And update the Masthead usage:

```tsx
<Masthead masthead={document.masthead} prev={prev} next={next} />
```

- [ ] **Step 6: Run the Masthead and page tests to verify they pass**

Run: `npx vitest run src/components/Masthead.test.tsx src/pages/RoundtablePage.test.tsx`
Expected: PASS — arrows render with correct hrefs/labels; existing RoundtablePage tests still pass (they render inside `MemoryRouter`).

- [ ] **Step 7: Commit**

```bash
git add src/components/Masthead.tsx src/components/Masthead.test.tsx src/pages/RoundtablePage.tsx
git commit -m "Add masthead navigation arrows and collapse wiring"
```

---

### Task 4: Scroll-to-top on part change

**Files:**

- Modify: `src/test/setup.ts` (stub `window.scrollTo` — jsdom doesn't implement it)
- Modify: `src/pages/RoundtablePage.tsx` (effect keyed on `document.id`)
- Test: `src/pages/RoundtablePage.test.tsx`

**Interfaces:**

- Consumes: `document.id` (already on the `RoundtableDocument` prop).
- Produces: no new exports; a side effect (`window.scrollTo(0, 0)`) on mount and whenever the rendered document changes.

- [ ] **Step 1: Stub `window.scrollTo` in test setup**

In `src/test/setup.ts`, add after the existing `ResizeObserver` stub block:

```ts
// jsdom doesn't implement scrollTo; stub it so scroll-to-top effects are no-ops.
window.scrollTo = (() => {}) as typeof window.scrollTo
```

- [ ] **Step 2: Write the failing test**

Add to `src/pages/RoundtablePage.test.tsx` — extend the top imports and add a new `describe`:

```ts
// extend existing imports
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { partI } from '../data/parts/part-i'
import { partII } from '../data/parts/part-ii'
import { summarizeClaimStatuses } from '../data/claimSummary'
import { RoundtablePage } from './RoundtablePage'

describe('RoundtablePage scroll-to-top', () => {
  it('scrolls to the top on mount and when the document changes', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const { rerender } = render(
      <MemoryRouter>
        <RoundtablePage document={partI} />
      </MemoryRouter>,
    )
    expect(scrollTo).toHaveBeenCalledWith(0, 0)

    scrollTo.mockClear()
    rerender(
      <MemoryRouter>
        <RoundtablePage document={partII} />
      </MemoryRouter>,
    )
    expect(scrollTo).toHaveBeenCalledWith(0, 0)

    scrollTo.mockRestore()
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run src/pages/RoundtablePage.test.tsx`
Expected: FAIL — `scrollTo` was not called (effect not implemented yet).

- [ ] **Step 4: Implement the effect**

In `src/pages/RoundtablePage.tsx`, add `useEffect` to the React import (the file currently imports only from `react-router-dom` and components — add a React import line):

```tsx
import { useEffect } from 'react'
```

Then inside the component, alongside the `getAdjacentParts` call:

```tsx
useEffect(() => {
  window.scrollTo(0, 0)
}, [document.id])
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run src/pages/RoundtablePage.test.tsx`
Expected: PASS — `scrollTo` called with `(0, 0)` on mount and on the part change.

- [ ] **Step 6: Commit**

```bash
git add src/test/setup.ts src/pages/RoundtablePage.tsx src/pages/RoundtablePage.test.tsx
git commit -m "Reset scroll to top on roundtable part change"
```

---

### Task 5: Sticky condense + arrow styles (CSS)

Pure styling — verified by the full suite staying green and the production build succeeding, plus a manual visual check. No unit test.

**Files:**

- Modify: `src/styles/base.css` (the `MASTHEAD` section, lines ~34–109)

**Interfaces:**

- Consumes: the `data-collapsed` attribute and `.masthead-nav` / `.masthead-body` classes produced in Task 3; existing tokens `--ink`, `--paper`, `--accent`, `--masthead-accent`.
- Produces: no code exports — visual behavior only.

- [ ] **Step 1: Make the masthead sticky and transition-ready**

In `src/styles/base.css`, change the base `.masthead` rule (currently `position: relative;`) to make it sticky and animate padding. Replace:

```css
.masthead {
  background: var(--ink);
  color: var(--paper);
  padding: 3.5rem 2rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
```

with:

```css
.masthead {
  background: var(--ink);
  color: var(--paper);
  padding: 3.5rem 2rem 2.5rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 50;
  overflow: hidden;
  transition: padding 0.3s ease;
}
```

- [ ] **Step 2: Add the collapse + arrow rules**

In `src/styles/base.css`, immediately after the existing `.masthead .date-line { ... }` rule (around line 109, before the `PERSONAS BAR` section), add:

```css
/* horizontal padding so the centered text never collides with the edge arrows */
.masthead-body {
  padding: 0 3.25rem;
}

.masthead h1 {
  transition: font-size 0.3s ease;
}

/* collapsible lines animate to zero height/opacity when condensed */
.masthead .overline,
.masthead .subtitle,
.masthead .date-line {
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.25s ease,
    margin 0.3s ease;
}
.masthead .overline,
.masthead .date-line {
  max-height: 3rem;
}
.masthead .subtitle {
  max-height: 10rem;
}

/* ── condensed state ── */
.masthead[data-collapsed='true'] {
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}
.masthead[data-collapsed='true'] h1 {
  font-size: clamp(1rem, 3vw, 1.45rem);
  margin-bottom: 0;
}
.masthead[data-collapsed='true'] .overline,
.masthead[data-collapsed='true'] .subtitle,
.masthead[data-collapsed='true'] .date-line {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}

/* ── navigation arrows ── */
.masthead-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: rgba(245, 240, 232, 0.55);
  background: transparent;
  z-index: 2;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}
.masthead-nav--prev {
  left: 1rem;
}
.masthead-nav--next {
  right: 1rem;
}
.masthead-nav:hover,
.masthead-nav:focus-visible {
  color: var(--masthead-accent, var(--accent));
  background: rgba(255, 255, 255, 0.06);
  outline: none;
}
.masthead-nav:focus-visible {
  box-shadow: 0 0 0 2px var(--masthead-accent, var(--accent));
}

@media (max-width: 640px) {
  .masthead-body {
    padding: 0 2.75rem;
  }
  .masthead-nav {
    width: 40px;
    height: 40px;
  }
  .masthead-nav--prev {
    left: 0.35rem;
  }
  .masthead-nav--next {
    right: 0.35rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .masthead,
  .masthead h1,
  .masthead .overline,
  .masthead .subtitle,
  .masthead .date-line,
  .masthead-nav {
    transition: none;
  }
}
```

- [ ] **Step 3: Verify the full suite and the build**

Run: `npm test`
Expected: PASS — all tests including the new adjacency/hook/masthead/scroll tests.

Run: `npm run build`
Expected: `tsc -b` + `vite build` succeed with no errors.

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open a part page (e.g. `/real-costs`), and confirm:

1. Chevron arrows sit at the far left/right of the masthead and link to the wrap-around neighbors.
2. Scrolling down condenses the masthead to a slim sticky bar showing only the title + arrows; scrolling back up restores the full hero.
3. Clicking an arrow navigates to the adjacent part and lands at the top of the page.

- [ ] **Step 5: Commit**

```bash
git add src/styles/base.css
git commit -m "Style sticky condensing masthead and navigation arrows"
```

---

## Self-Review

**Spec coverage:**

- Nav arrows at far ends → Task 3 (markup) + Task 5 (positioning). ✓
- Wrap-around prev/next → Task 1 (`getAdjacentParts`) + tests. ✓
- Navigate to adjacent RoundtablePage → Task 3 (`<Link to>`). ✓
- Collapse on scroll showing only `span.text` (title) + arrows → Task 2 (hook) + Task 3 (`data-collapsed`) + Task 5 (CSS hides overline/subtitle/date, keeps h1 + arrows). ✓
- Sticky condensing header (chosen mode) → Task 5 (`position: sticky`). ✓
- Arrows always visible (hero + collapsed) → arrows live outside `.masthead-body`; never hidden by collapse rules. ✓
- Scroll-to-top on part change → Task 4. ✓
- PersonasBar unchanged, scrolls beneath → no PersonasBar edits; `z-index: 50` on masthead. ✓
- Tests: adjacency, masthead arrows, hook, scroll-to-top → Tasks 1–4. ✓
- prefers-reduced-motion → Task 5. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every command has expected output. ✓

**Type consistency:** `PartNavTarget { slug, partLabel, navTitle }` defined in Task 1 and consumed unchanged in Task 3's props and test. `getAdjacentParts(id): { prev, next }` shape matches the `{ prev, next }` destructure in RoundtablePage (Task 3) and tests (Task 1). `useScrollCollapse(threshold?: number): boolean` defined in Task 2, called arg-less in Task 3. `data-collapsed` / `.masthead-nav` / `.masthead-body` names are identical across Task 3 (markup) and Task 5 (CSS). ✓
