import { useReadingProgress } from '../hooks/useReadingProgress'

/** A slim progress bar, pinned under the masthead, tracking scroll through the document. */
export function ReadingProgress() {
  const progress = useReadingProgress()
  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <span className="reading-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
