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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCollapsed(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return collapsed
}
