import { lazy, Suspense, useState } from 'react'
import { getDocumentCharts } from '../data/chartCatalog'
import type { RoundtableDocument } from '../types/document'
import { ChartModal } from './ChartModal'

// Same code-split boundary as ChartBlock: a document with charts pays for the
// d3 bundle once, whether it's first reached via this carousel or scrolling
// to an in-article chart later.
const ChartThumbnail = lazy(() =>
  import('./charts/ChartThumbnail').then((m) => ({ default: m.ChartThumbnail })),
)

interface ChartThumbnailCarouselProps {
  document: RoundtableDocument
}

/**
 * A horizontally-scrollable row of live chart previews for this document,
 * shown beneath the intro. Clicking a thumbnail opens that chart at full size
 * in a modal. Renders nothing for a document with no charts.
 */
export function ChartThumbnailCarousel({ document }: ChartThumbnailCarouselProps) {
  const entries = getDocumentCharts(document)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (entries.length === 0) return null

  return (
    <div className="chart-thumb-carousel">
      <p className="chart-thumb-carousel__heading">
        {entries.length} chart{entries.length === 1 ? '' : 's'} in this roundtable
      </p>
      <Suspense fallback={<div className="chart-thumb-carousel__loading" aria-hidden="true" />}>
        <ul className="chart-thumb-carousel__list">
          {entries.map((entry, i) => (
            <ChartThumbnail key={i} chart={entry.chart} onOpen={() => setOpenIndex(i)} />
          ))}
        </ul>
      </Suspense>
      {openIndex !== null ? (
        <ChartModal chart={entries[openIndex].chart} onClose={() => setOpenIndex(null)} />
      ) : null}
    </div>
  )
}
