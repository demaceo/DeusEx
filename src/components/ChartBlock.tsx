import { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import type { VerificationStatus } from '../types/content'
import type { ChartSpec } from '../types/document'
import { ChartCanvas } from './charts/ChartCanvas'
import { ChartFrame } from './charts/ChartFrame'
import { canvasHeight } from './charts/geometry'

interface ChartBlockProps {
  chart: ChartSpec
}

/**
 * Aggregate the verification state of the claims a chart rests on. Mirrors the
 * StatBox pattern: a chart is only "verified" when every backing claim is.
 */
function useChartStatus(claimIds?: string[]): VerificationStatus | undefined {
  const ctx = useContext(DocumentContext)
  if (!claimIds || claimIds.length === 0) return undefined
  const statuses = claimIds.map((id) => ctx?.claims[id]?.verificationStatus ?? 'pending')
  if (statuses.every((s) => s === 'verified')) return 'verified'
  if (statuses.some((s) => s === 'disputed')) return 'disputed'
  if (statuses.some((s) => s === 'unverified')) return 'unverified'
  return 'pending'
}

/**
 * Renders one data-visualization block as an editorial figure. Charts are
 * hand-built from d3 scales/shapes and rendered as React SVG (no Recharts); the
 * shared {@link ChartFrame} supplies the header, legend, accessible table, and
 * source line. Data comes straight from the document; no fetching.
 */
export function ChartBlock({ chart }: ChartBlockProps) {
  const status = useChartStatus(chart.claimIds)
  const height = canvasHeight(chart)
  return (
    <ChartFrame
      chart={chart}
      status={status}
      height={height}
      renderCanvas={(width, revealed) => (
        <ChartCanvas chart={chart} width={width} height={height} revealed={revealed} />
      )}
    />
  )
}
