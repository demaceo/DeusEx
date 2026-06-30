import { extent } from 'd3-array'
import { scaleLinear, scalePoint } from 'd3-scale'
import { area as d3area, curveMonotoneX, line as d3line } from 'd3-shape'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, variantColor } from '../../chartTheme'
import { fmt } from '../geometry'
import { ChartTooltip, GridLines, ReferenceMarker } from '../primitives'
import { AXIS_TEXT, VALUE_LABEL } from '../style'
import { useTooltip } from '../useTooltip'

type LineSpec = Extract<ChartSpec, { kind: 'line' }>

interface KindProps {
  chart: LineSpec
  width: number
  height: number
}

export function LineChart({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const color = variantColor(chart.variant)
  const gradientId = `chartArea-${chart.title.replace(/\W+/g, '').slice(0, 24)}`

  const m = { top: 24, right: 24, bottom: 26, left: 44 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const x = scalePoint<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerW])
    .padding(0.5)

  const [lo = 0, hi = 1] = extent(data, (d) => d.value)
  const pad = (hi - lo) * 0.15 || hi * 0.1 || 1
  const y = scaleLinear()
    .domain([lo - pad, hi + pad])
    .range([innerH, 0])
  const ticks = y.ticks(4)

  const px = (d: { label: string }) => x(d.label) ?? 0
  const py = (d: { value: number }) => y(d.value)

  // Split into a solid leading run and a dashed projected tail (the segment into
  // the first projected point and everything after it draws dashed).
  const firstProjected = data.findIndex((d) => d.projected)
  const hasProjection = firstProjected > 0
  const solid = hasProjection ? data.slice(0, firstProjected) : data
  const dashed = hasProjection ? data.slice(firstProjected - 1) : []

  const lineGen = d3line<(typeof data)[number]>().x(px).y(py).curve(curveMonotoneX)
  const areaGen = d3area<(typeof data)[number]>().x(px).y0(innerH).y1(py).curve(curveMonotoneX)

  return (
    <>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <g transform={`translate(${m.left},${m.top})`}>
          <GridLines ticks={ticks} y={y} x0={0} x1={innerW} />
          {ticks.map((t, i) => (
            <text key={i} x={-8} y={y(t)} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
              {t}
            </text>
          ))}

          {chart.area ? <path d={areaGen(data) ?? ''} fill={`url(#${gradientId})`} /> : null}

          <path d={lineGen(solid) ?? ''} fill="none" stroke={color} strokeWidth={2.5} />
          {dashed.length >= 2 ? (
            <path
              d={lineGen(dashed) ?? ''}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
              strokeDasharray="5 4"
            />
          ) : null}

          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={px(d)}
                cy={py(d)}
                r={4}
                fill={d.projected ? CHART_COLORS.white : color}
                stroke={color}
                strokeWidth={d.projected ? 2 : 0}
                onMouseEnter={() =>
                  show({
                    x: m.left + px(d),
                    y: m.top + py(d),
                    label: d.label,
                    rows: [{ value: d.value, color }],
                  })
                }
                onMouseLeave={hide}
              />
              <text x={px(d)} y={py(d) - 12} textAnchor="middle" style={VALUE_LABEL}>
                {fmt(d.value, chart.unit)}
              </text>
              <text x={px(d)} y={innerH + 18} textAnchor="middle" style={AXIS_TEXT}>
                {d.label}
              </text>
            </g>
          ))}

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
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}
