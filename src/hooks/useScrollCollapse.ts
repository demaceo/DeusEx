import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has scrolled far enough to collapse the masthead.
 *
 * Uses **hysteresis** — distinct collapse/expand thresholds — rather than a single
 * cutoff. A condensing sticky header changes its own in-flow height, which nudges
 * `scrollY` (via the browser's scroll-anchoring); a single threshold sits right in
 * that feedback zone and rapidly toggles, producing the visible stutter/flicker.
 * Collapsing at `collapseAt` but only expanding back below `expandAt` gives a dead
 * band that absorbs those small adjustments so the state flips once and stays put.
 *
 * Scroll handling is rAF-throttled and uses a passive listener to avoid layout thrash.
 */
export function useScrollCollapse(collapseAt = 120, expandAt = collapseAt - 60): boolean {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== 'undefined' && window.scrollY > collapseAt,
  )

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      setCollapsed((prev) => {
        if (!prev && y > collapseAt) return true
        if (prev && y < expandAt) return false
        return prev
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [collapseAt, expandAt])

  return collapsed
}
