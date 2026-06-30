import { scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, CHART_FONT, variantColor } from '../../chartTheme'
import { computeDelta, fmt, niceMax } from '../geometry'
import { AXIS_TEXT } from '../style'

type ComparisonSpec = Extract<ChartSpec, { kind: 'comparison' }>

interface KindProps {
  chart: ComparisonSpec
  width: number
  height: number
}

/** Big editorial figure (Playfair) sitting above each endpoint. */
const FIGURE: React.CSSProperties = {
  fontFamily: CHART_FONT.display,
  fontWeight: 900,
  fontSize: 26,
  fill: CHART_COLORS.ink,
}

/**
 * A two-point slope: before → after as a rising/falling line between two big
 * figures, with an auto-computed change badge. The change is the story, so this
 * reads in a fraction of a bar chart's height — killing the float on 2-value data.
 */
export function ComparisonChart({ chart, width, height }: KindProps) {
  const [before, after] = chart.data
  const m = { top: 46, right: 92, bottom: 30, left: 92 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const domainMax = niceMax(Math.max(before.value, after.value) * 1.05)
  const y = scaleLinear().domain([0, domainMax]).range([innerH, 0])
  const x0 = 0
  const x1 = innerW

  const beforeColor = variantColor(before.variant ?? 'navy')
  const afterColor = variantColor(after.variant ?? chart.variant)
  const delta = computeDelta(before.value, after.value)
  const deltaText = chart.deltaLabel ?? delta.text
  const arrow = delta.sign === 'up' ? '▲' : delta.sign === 'down' ? '▼' : '→'

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          <line
            x1={x0}
            y1={y(before.value)}
            x2={x1}
            y2={y(after.value)}
            stroke={afterColor}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={x0} cy={y(before.value)} r={7} fill={beforeColor} />
          <circle cx={x1} cy={y(after.value)} r={7} fill={afterColor} />
          <text x={x0} y={y(before.value) - 18} textAnchor="middle" style={FIGURE}>
            {fmt(before.value, chart.unit)}
          </text>
          <text x={x1} y={y(after.value) - 18} textAnchor="middle" style={FIGURE}>
            {fmt(after.value, chart.unit)}
          </text>
          <text x={x0} y={innerH + 22} textAnchor="middle" style={AXIS_TEXT}>
            {before.label}
          </text>
          <text x={x1} y={innerH + 22} textAnchor="middle" style={AXIS_TEXT}>
            {after.label}
          </text>
        </g>
      </svg>
      <span
        className="chart-delta-chip chart-delta-chip--lg"
        data-sign={delta.sign}
        style={{
          left: m.left + innerW / 2,
          top: m.top + (y(before.value) + y(after.value)) / 2 - 30,
        }}
      >
        {arrow} {deltaText}
      </span>
    </>
  )
}
