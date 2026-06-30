import { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import type { VerificationStatus } from '../types/content'
import type { ChartSpec } from '../types/document'
import { ChartFrame } from './charts/ChartFrame'
import { canvasHeight } from './charts/geometry'
import { BarChart } from './charts/kinds/BarChart'
import { Bullet } from './charts/kinds/Bullet'
import { ComparisonChart } from './charts/kinds/Comparison'
import { DonutGauge } from './charts/kinds/DonutGauge'
import { LineChart } from './charts/kinds/LineChart'
import { Lollipop } from './charts/kinds/Lollipop'
import { Pictogram } from './charts/kinds/Pictogram'
import { StackedBar } from './charts/kinds/StackedBar'
import { Waffle } from './charts/kinds/Waffle'
import { WorldMap } from './charts/kinds/WorldMap'

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

/** Dispatches a spec to its d3-rendered SVG kind. Exhaustive over `ChartSpec['kind']`. */
function ChartCanvas({
  chart,
  width,
  height,
}: {
  chart: ChartSpec
  width: number
  height: number
}) {
  switch (chart.kind) {
    case 'bar':
      return <BarChart chart={chart} width={width} height={height} />
    case 'line':
      return <LineChart chart={chart} width={width} height={height} />
    case 'donut':
      return <DonutGauge chart={chart} width={width} height={height} />
    case 'stackedBar':
      return <StackedBar chart={chart} width={width} height={height} />
    case 'comparison':
      return <ComparisonChart chart={chart} width={width} height={height} />
    case 'waffle':
      return <Waffle chart={chart} width={width} height={height} />
    case 'lollipop':
      return <Lollipop chart={chart} width={width} height={height} />
    case 'pictogram':
      return <Pictogram chart={chart} width={width} height={height} />
    case 'bullet':
      return <Bullet chart={chart} width={width} height={height} />
    case 'worldMap':
      return <WorldMap chart={chart} width={width} height={height} />
    default: {
      // Exhaustiveness guard: a new kind must add a case here or this errors at compile time.
      const _exhaustive: never = chart
      return _exhaustive
    }
  }
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
      renderCanvas={(width) => <ChartCanvas chart={chart} width={width} height={height} />}
    />
  )
}
