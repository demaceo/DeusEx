import { useEffect, useRef } from 'react'
import { useReadingProgress } from '../hooks/useReadingProgress'
import type { Masthead } from '../types/document'

interface ReadingProgressProps {
  /** Drives the fill color to match this document's masthead. */
  accentColor: Masthead['accentColor']
}

/** A slim progress bar, pinned under the masthead, tracking scroll through the document. */
export function ReadingProgress({ accentColor }: ReadingProgressProps) {
  const progress = useReadingProgress()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const masthead = document.querySelector<HTMLElement>('.masthead')
    const el = ref.current
    if (!masthead || !el) return

    // Track the sticky masthead's live height (it changes as it collapses on
    // scroll) so this bar sits flush under it instead of overlapping its top
    // edge — a fixed `top: 0` would paint over the header, since both are
    // pinned to the viewport's top and this bar's z-index must sit above it
    // for the fill to ever be visible.
    //
    // Published on the root rather than this element: the mobile round strip
    // pins itself directly beneath the same header and needs the same number,
    // and it is nowhere near this component in the tree.
    const root = document.documentElement
    const sync = () => root.style.setProperty('--masthead-height', `${masthead.offsetHeight}px`)
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(masthead)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--masthead-height')
    }
  }, [])

  return (
    <div
      ref={ref}
      className="reading-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      data-accent={accentColor}
    >
      <span className="reading-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
