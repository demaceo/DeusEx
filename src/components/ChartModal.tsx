import { lazy, Suspense } from 'react'
import type { ChartSpec } from '../types/document'
import { Modal } from './Modal'

// Same code-split boundary as BlockRenderer/ChartCatalogPage, so opening a
// thumbnail is the only thing that pulls the d3-based chart bundle in.
const ChartBlock = lazy(() => import('./ChartBlock').then((m) => ({ default: m.ChartBlock })))

interface ChartModalProps {
  chart: ChartSpec
  onClose: () => void
}

/**
 * Full-size view of a chart, opened from its thumbnail in the carousel.
 * Renders the real `ChartBlock`, so it inherits verification status and the
 * "View evidence" affordance from whatever `DocumentProvider`/
 * `ClaimDrawerProvider` the carousel is already nested inside.
 */
export function ChartModal({ chart, onClose }: ChartModalProps) {
  return (
    <Modal onClose={onClose} ariaLabel={chart.title} className="chart-modal">
      <Suspense fallback={<div className="chart-block chart-block--loading" aria-hidden="true" />}>
        <ChartBlock chart={chart} />
      </Suspense>
    </Modal>
  )
}
