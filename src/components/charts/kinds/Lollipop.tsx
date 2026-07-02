import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { variantColor } from '../../chartTheme'
import { fmt, niceMax } from '../geometry'
import { ChartTooltip, GridLines } from '../primitives'
import { AXIS_TEXT, VALUE_LABEL } from '../style'
import { useTooltip } from '../useTooltip'

type LollipopSpec = Extract<ChartSpec, { kind: 'lollipop' }>

interface KindProps {
  chart: LollipopSpec
  width: number
  height: number
}

/**
 * Stem-and-dot plot — far less ink than bars for sparse category comparisons, so
 * it fills the frame without big empty rectangles. Horizontal by default.
 */
export function Lollipop({ chart, width, height }: KindProps) {
  return chart.orientation === 'vertical' ? (
    <VerticalLollipop chart={chart} width={width} height={height} />
  ) : (
    <HorizontalLollipop chart={chart} width={width} height={height} />
  )
}

function HorizontalLollipop({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const m = { top: 8, right: 56, bottom: 8, left: 104 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const y = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerH])
    .padding(0.4)
  const domainMax = niceMax((max(data, (d) => d.value) ?? 0) * 1.04)
  const x = scaleLinear().domain([0, domainMax]).range([0, innerW])

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          {data.map((d, i) => {
            const cy = (y(d.label) ?? 0) + y.bandwidth() / 2
            const cx = x(d.value)
            const color = variantColor(d.variant ?? chart.variant)
            return (
              <g
                key={i}
                onMouseEnter={() =>
                  show({ x: m.left + cx, y: m.top + cy - 8, rows: [{ value: d.value, color }] })
                }
                onMouseLeave={hide}
              >
                <line x1={0} y1={cy} x2={cx} y2={cy} stroke={color} strokeWidth={2} />
                <circle cx={cx} cy={cy} r={7} fill={color} />
                <text x={cx + 12} y={cy} dy="0.32em" style={VALUE_LABEL}>
                  {fmt(d.value, chart.unit)}
                </text>
                <text x={-12} y={cy} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
                  {d.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}

function VerticalLollipop({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const m = { top: 28, right: 12, bottom: 28, left: 46 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const x = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerW])
    .padding(0.5)
  const domainMax = niceMax((max(data, (d) => d.value) ?? 0) * 1.04)
  const y = scaleLinear().domain([0, domainMax]).range([innerH, 0])
  const ticks = y.ticks(4)

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          <GridLines ticks={ticks} scale={y} x0={0} x1={innerW} />
          {ticks.map((t, i) => (
            <text key={i} x={-8} y={y(t)} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
              {t}
            </text>
          ))}
          {data.map((d, i) => {
            const cx = (x(d.label) ?? 0) + x.bandwidth() / 2
            const cy = y(d.value)
            const color = variantColor(d.variant ?? chart.variant)
            return (
              <g
                key={i}
                onMouseEnter={() =>
                  show({ x: m.left + cx, y: m.top + cy, rows: [{ value: d.value, color }] })
                }
                onMouseLeave={hide}
              >
                <line x1={cx} y1={innerH} x2={cx} y2={cy} stroke={color} strokeWidth={2} />
                <circle cx={cx} cy={cy} r={7} fill={color} />
                <text x={cx} y={cy - 12} textAnchor="middle" style={VALUE_LABEL}>
                  {fmt(d.value, chart.unit)}
                </text>
                <text x={cx} y={innerH + 18} textAnchor="middle" style={AXIS_TEXT}>
                  {d.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}
