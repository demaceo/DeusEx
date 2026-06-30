import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, variantColor } from '../../chartTheme'
import { computeDelta, fmt, niceMax, roundedRectPath } from '../geometry'
import { ChartTooltip, GridLines, ReferenceMarker } from '../primitives'
import { AXIS_TEXT, VALUE_LABEL } from '../style'
import { useTooltip } from '../useTooltip'

type BarSpec = Extract<ChartSpec, { kind: 'bar' }>

interface KindProps {
  chart: BarSpec
  width: number
  height: number
}

/** Thickest a single bar gets — keeps a 2-bar comparison from ballooning into slabs. */
const MAX_BAR = 110

export function BarChart({ chart, width, height }: KindProps) {
  return chart.orientation === 'horizontal' ? (
    <HorizontalBars chart={chart} width={width} height={height} />
  ) : (
    <VerticalBars chart={chart} width={width} height={height} />
  )
}

function VerticalBars({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const showDelta = data.length === 2
  const m = { top: showDelta ? 46 : 26, right: 12, bottom: 28, left: 46 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const x = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerW])
    .padding(data.length <= 3 ? 0.45 : 0.32)

  const domainMax = niceMax((max(data, (d) => d.value) ?? 0) * 1.02)
  const y = scaleLinear().domain([0, domainMax]).range([innerH, 0])
  const ticks = y.ticks(4)
  const delta = showDelta ? computeDelta(data[0].value, data[1].value) : null

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          <GridLines ticks={ticks} y={y} x0={0} x1={innerW} />
          {ticks.map((t, i) => (
            <text key={i} x={-8} y={y(t)} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
              {t}
            </text>
          ))}
          {data.map((d, i) => {
            const band = x.bandwidth()
            const barW = Math.min(band, MAX_BAR)
            const bx = (x(d.label) ?? 0) + (band - barW) / 2
            const by = y(d.value)
            const bh = innerH - by
            const color = variantColor(d.variant ?? chart.variant)
            return (
              <g key={i}>
                <path
                  d={roundedRectPath(bx, by, barW, bh, { tl: 3, tr: 3 })}
                  fill={color}
                  onMouseEnter={() =>
                    show({
                      x: m.left + bx + barW / 2,
                      y: m.top + by,
                      rows: [{ value: d.value, color }],
                    })
                  }
                  onMouseLeave={hide}
                />
                <text x={bx + barW / 2} y={by - 8} textAnchor="middle" style={VALUE_LABEL}>
                  {fmt(d.value, chart.unit)}
                </text>
                <text
                  x={(x(d.label) ?? 0) + band / 2}
                  y={innerH + 18}
                  textAnchor="middle"
                  style={AXIS_TEXT}
                >
                  {d.label}
                </text>
              </g>
            )
          })}
          {chart.reference ? (
            <ReferenceMarker
              value={chart.reference.value}
              label={chart.reference.label}
              color={
                chart.reference.variant ? variantColor(chart.reference.variant) : CHART_COLORS.muted
              }
              y={y}
              x0={0}
              x1={innerW}
              unit={chart.unit}
            />
          ) : null}
        </g>
      </svg>
      {delta ? (
        <span
          className="chart-delta-chip"
          data-sign={delta.sign}
          style={{ left: m.left + innerW / 2, top: 6 }}
        >
          {delta.sign === 'up' ? '▲' : delta.sign === 'down' ? '▼' : '→'} {delta.text}
        </span>
      ) : null}
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}

function HorizontalBars({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const m = { top: 8, right: 52, bottom: 8, left: 96 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const y = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerH])
    .padding(0.32)
  const domainMax = niceMax((max(data, (d) => d.value) ?? 0) * 1.02)
  const x = scaleLinear().domain([0, domainMax]).range([0, innerW])
  const ticks = x.ticks(4)

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={x(t)}
              x2={x(t)}
              y1={0}
              y2={innerH}
              stroke={CHART_COLORS.rule}
              strokeDasharray="2 3"
            />
          ))}
          {data.map((d, i) => {
            const band = y.bandwidth()
            const barH = Math.min(band, 42)
            const by = (y(d.label) ?? 0) + (band - barH) / 2
            const bw = x(d.value)
            const color = variantColor(d.variant ?? chart.variant)
            return (
              <g key={i}>
                <path
                  d={roundedRectPath(0, by, bw, barH, { tr: 3, br: 3 })}
                  fill={color}
                  onMouseEnter={() =>
                    show({
                      x: m.left + bw,
                      y: m.top + by + barH / 2,
                      rows: [{ value: d.value, color }],
                    })
                  }
                  onMouseLeave={hide}
                />
                <text x={bw + 8} y={by + barH / 2} dy="0.32em" style={VALUE_LABEL}>
                  {fmt(d.value, chart.unit)}
                </text>
                <text x={-10} y={by + barH / 2} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
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
