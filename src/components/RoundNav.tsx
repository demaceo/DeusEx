import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useReadingProgress'
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
 * A sticky left-rail navigator listing the document's rounds, highlighting the one
 * in view and jumping to it on click. Shown only where there's margin room (wide
 * viewports); the reading-progress bar covers navigation on narrow screens. Fixed
 * to the viewport rather than the document, so it fades out once the sources/
 * footer region scrolls into view, instead of ever overlapping their dark band.
 */
export function RoundNav({ items, accentColor }: RoundNavProps) {
  const ids = items.map((i) => i.id)
  const active = useActiveSection(ids)
  const activeIndex = items.findIndex((i) => i.id === active)
  const [nearEnd, setNearEnd] = useState(false)

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
      data-visible={!nearEnd}
      data-accent={accentColor}
    >
      <p className="round-nav__heading">
        On this Roundtable
        {items.length ? <span className="round-nav__count"> · {items.length} rounds</span> : null}
      </p>
      <ol className="round-nav__list">
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
