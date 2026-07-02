import { useReadingProgress } from '../hooks/useReadingProgress'
import type { Masthead } from '../types/document'

interface ReadingProgressProps {
  /** Drives the fill color to match this document's masthead. */
  accentColor: Masthead['accentColor']
}

/** A slim progress bar, pinned under the masthead, tracking scroll through the document. */
export function ReadingProgress({ accentColor }: ReadingProgressProps) {
  const progress = useReadingProgress()
  return (
    <div
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
