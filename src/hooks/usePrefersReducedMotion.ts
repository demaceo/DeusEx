import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const readReduced = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : false

/**
 * Tracks the OS "reduce motion" setting. Reads the initial value in a lazy state
 * initializer and subscribes for later changes — guarding `matchMedia` (absent in
 * jsdom and SSR) so it never throws, defaulting to `false` (motion allowed).
 * Used to suppress chart autoplay/transitions under `prefers-reduced-motion`.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(readReduced)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
