import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Width charts fall back to before measurement or where `ResizeObserver` is
 * unavailable (SSR, or jsdom where the test setup stubs it as a no-op). Keeps SVG
 * charts from rendering into a zero-width box. Matches the 600px the old Recharts
 * test mock used, so unit snapshots stay stable.
 */
const FALLBACK_WIDTH = 600

/**
 * Measures the rendered width of a container so an SVG chart can size to it —
 * the hand-rolled replacement for Recharts' `ResponsiveContainer`. Returns a ref
 * to attach to the measured element and the current width (never zero: it falls
 * back to {@link FALLBACK_WIDTH} until a real measurement lands).
 *
 * Measurement runs in a layout effect so the real width is known before paint,
 * avoiding a fallback-width flash; a `ResizeObserver` keeps it current on resize.
 */
export function useChartWidth<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>
  width: number
} {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const w = el.clientWidth
      setWidth((prev) => (w > 0 && w !== prev ? w : prev))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, width: width || FALLBACK_WIDTH }
}
