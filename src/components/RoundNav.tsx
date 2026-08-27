import { useEffect, useRef, useState } from 'react'
import { useActiveSection } from '../hooks/useReadingProgress'
import { useScrollCollapse } from '../hooks/useScrollCollapse'
import type { Masthead } from '../types/document'

export interface RoundNavItem {
  id: string
  label: string
  title?: string
}

interface RoundNavProps {
  items: RoundNavItem[]
  /** Drives the active round's accent color to match this document's masthead. */
  accentColor: Masthead['accentColor']
}

/**
 * Navigator listing the document's rounds, highlighting the one in view and
 * jumping to it on click. One component, two layouts, same markup and the same
 * accessibility tree:
 *
 * - Wide viewports (>=1280px): a rail in the left margin, where there is room.
 * - Everything narrower: a horizontal strip of round chips pinned under the
 *   masthead. Narrow screens previously had no in-document navigation at all;
 *   the reading-progress bar was treated as covering it, but that bar is 3px of
 *   `pointer-events: none` decoration and cannot be navigated with. A reader on
 *   a phone had no way to see the round structure or move between rounds.
 *
 * Fixed to the viewport rather than the document, so it fades out once the
 * sources/footer region scrolls into view instead of overlapping their dark band.
 *
 * Stays hidden until the Masthead itself has collapsed: shares `useScrollCollapse`
 * with it (same default thresholds) so both flip on the same scroll tick, then unfurls
 * into view rather than appearing as soon as the page mounts. On mobile that also
 * keeps it out of the pre-content stack a reader meets before the first sentence.
 */
export function RoundNav({ items, accentColor }: RoundNavProps) {
  const ids = items.map((i) => i.id)
  const active = useActiveSection(ids)
  const activeIndex = items.findIndex((i) => i.id === active)
  const collapsed = useScrollCollapse()
  const [nearEnd, setNearEnd] = useState(false)
  const listRef = useRef<HTMLOListElement>(null)

  // Keep the active chip in view in the mobile strip as the reader advances,
  // otherwise the current round scrolls off the end and the strip stops
  // reporting where they are. Only the list's own horizontal offset is touched,
  // never the page scroll, so this can't fight the reader mid-scroll. On the
  // desktop rail the list doesn't scroll horizontally and this is a no-op.
  useEffect(() => {
    const list = listRef.current
    if (!list || activeIndex < 0 || typeof list.scrollTo !== 'function') return
    const item = list.children[activeIndex] as HTMLElement | undefined
    if (!item) return
    const left = item.offsetLeft - (list.clientWidth - item.clientWidth) / 2
    list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [activeIndex])

  useEffect(() => {
    const sentinel = document.getElementById('sources-section')
    if (!sentinel || typeof IntersectionObserver === 'undefined') return

    // Fire while the sources section is still ~15% of a viewport below the
    // fold, so the nav has finished fading out before it could ever overlap
    // the footer's dark band.
    const observer = new IntersectionObserver(([entry]) => setNearEnd(entry.isIntersecting), {
      rootMargin: '0px 0px 15% 0px',
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="round-nav"
      aria-label="Rounds in this roundtable"
      data-visible={collapsed && !nearEnd}
      data-accent={accentColor}
    >
      <p className="round-nav__heading">
        On this Roundtable <br />
        {items.length ? <span className="round-nav__count"> · {items.length} rounds</span> : null}
      </p>
      <ol className="round-nav__list" ref={listRef}>
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              className="round-nav__link"
              data-active={item.id === active}
              data-status={i === activeIndex ? 'active' : i < activeIndex ? 'done' : 'upcoming'}
              aria-current={item.id === active ? 'true' : undefined}
              onClick={() => jump(item.id)}
            >
              <span className="round-nav__label">{item.label}</span>
              {item.title ? <span className="round-nav__title">{item.title}</span> : null}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
