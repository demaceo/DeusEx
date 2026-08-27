interface ChartSkeletonProps {
  /** `block` fills a chart figure's footprint; `thumb` fits the carousel rail. */
  variant?: 'block' | 'thumb'
  /**
   * Announce the wait politely. True where one chart is loading in the reader's
   * view; false on the catalog and the carousel, where a dozen skeletons mount
   * at once and a dozen live regions would talk over each other.
   */
  announce?: boolean
}

/** Bar heights, in percent. Uneven on purpose: a flat row reads as a rule, not a chart. */
const BARS = [42, 68, 55, 88, 34, 72, 61]

/**
 * Placeholder shown while the d3-backed chart bundle loads.
 *
 * It replaces a bare `aria-hidden` grey rectangle, which was indistinguishable
 * from a chart that had failed to render, and which told screen readers nothing
 * at all: the reader could not tell whether to keep waiting.
 */
export function ChartSkeleton({ variant = 'block', announce = true }: ChartSkeletonProps) {
  return (
    <div
      className={`chart-skeleton chart-skeleton--${variant}`}
      role={announce ? 'status' : undefined}
    >
      <span className="sr-only">Loading chart</span>
      <span className="chart-skeleton__bars" aria-hidden="true">
        {BARS.map((height, i) => (
          <span
            key={i}
            className="chart-skeleton__bar"
            style={{ height: `${height}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </span>
    </div>
  )
}
