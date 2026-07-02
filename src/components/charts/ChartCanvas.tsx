import type { ChartSpec } from '../../types/document'
import { BarChart } from './kinds/BarChart'
import { Bullet } from './kinds/Bullet'
import { ComparisonChart } from './kinds/Comparison'
import { DonutGauge } from './kinds/DonutGauge'
import { LineChart } from './kinds/LineChart'
import { Lollipop } from './kinds/Lollipop'
import { Pictogram } from './kinds/Pictogram'
import { StackedBar } from './kinds/StackedBar'
import { Waffle } from './kinds/Waffle'
import { WorldMap } from './kinds/WorldMap'

interface ChartCanvasProps {
  chart: ChartSpec
  width: number
  height: number
  /**
   * Rendering inside a small preview rather than the full `ChartFrame`. Only
   * `worldMap` reads this today, to skip its interactive year scrubber
   * (a nested button/input group that can't sit inside a thumbnail's own
   * trigger button).
   */
  thumbnail?: boolean
}

/** Dispatches a spec to its d3-rendered SVG kind. Exhaustive over `ChartSpec['kind']`. */
export function ChartCanvas({ chart, width, height, thumbnail }: ChartCanvasProps) {
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
      return <WorldMap chart={chart} width={width} height={height} thumbnail={thumbnail} />
    default: {
      // Exhaustiveness guard: a new kind must add a case here or this errors at compile time.
      const _exhaustive: never = chart
      return _exhaustive
    }
  }
}
