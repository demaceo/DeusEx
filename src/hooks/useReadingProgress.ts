import { useEffect, useState } from 'react'

/**
 * Fraction (0–1) of the page the reader has scrolled through. rAF-throttled with a
 * passive listener, mirroring {@link useScrollCollapse}. Drives the reading-progress bar.
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      setProgress(scrollable <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / scrollable)))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/**
 * The id of the section currently in view, tracked with an IntersectionObserver.
 * Returns the first observed id until the reader scrolls. Powers the round navigator's
 * active highlight.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key ? key.split('|') : []
    if (sectionIds.length === 0) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        // Pick the section in document order with the largest visible area.
        let best: string | undefined
        let bestRatio = 0
        for (const id of sectionIds) {
          const ratio = visible.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best) setActive(best)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}
