import { useLayoutEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Browser capability never changes mid-session, so this is read once. */
const SUPPORTS_OBSERVER = typeof IntersectionObserver !== 'undefined'

/**
 * A one-shot scroll reveal: `revealed` flips to `true` (and stays there) the
 * first time the ref'd element enters the viewport, mirroring DebateThread's
 * inline reveal observer (including its `useLayoutEffect` timing, so the gate
 * is set before first paint rather than flashing unstyled content). Under
 * `prefers-reduced-motion`, or where `IntersectionObserver` is unavailable,
 * reports `revealed: true` immediately so content is never held back.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>
  revealed: boolean
} {
  const ref = useRef<T>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(!SUPPORTS_OBSERVER)

  useLayoutEffect(() => {
    if (reduceMotion || !SUPPORTS_OBSERVER) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  return { ref, revealed: reduceMotion || revealed }
}
