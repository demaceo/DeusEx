import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/** rAF is a platform API, so this is read once (never changes mid-session). */
const SUPPORTS_RAF = typeof requestAnimationFrame === 'function'

/**
 * Drives a `progress` value 0→1 over `durationMs` via `requestAnimationFrame`,
 * for chart animations that can't be expressed in CSS (the donut's true arc
 * sweep). Returns `1` immediately when `active` is `undefined` (rendered outside
 * a reveal context, e.g. a thumbnail), under `prefers-reduced-motion`, or where
 * rAF is unavailable, so the mark shows complete with no motion. While `active`
 * is `false` it stays `0` (the "empty, waiting to be revealed" state), then
 * tweens once `active` flips true. Mirrors `useRevealOnScroll`'s fallbacks.
 */
export function useSweepProgress(active: boolean | undefined, durationMs = 700): number {
  const reduceMotion = usePrefersReducedMotion()
  const staticFull = active === undefined || reduceMotion || !SUPPORTS_RAF
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (staticFull || !active) return
    let raf = 0
    let startTs: number | null = null
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts
      const p = Math.min(1, (ts - startTs) / durationMs)
      setAnimated(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, staticFull, durationMs])

  if (staticFull) return 1
  if (!active) return 0
  return animated
}
