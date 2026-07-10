import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, SEGMENT_VARIANTS, variantColor } from '../../chartTheme'
import { fmt, niceMax, roundedRectPath } from '../geometry'
import { ChartTooltip, GridLines, ReferenceMarker } from '../primitives'
import { AXIS_TEXT } from '../style'
import { useTooltip } from '../useTooltip'

/** Segments shorter than this (px) skip their in-bar value label to avoid clutter/overlap. */
const MIN_LABEL_SEGMENT = 18

type StackedSpec = Extract<ChartSpec, { kind: 'stackedBar' }>

interface KindProps {
  chart: StackedSpec
  width: number
  height: number
}

const MAX_BAR = 80

export function StackedBar({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const { series, data } = chart

  const m = { top: 16, right: 12, bottom: 28, left: 46 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const x = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerW])
    .padding(0.4)

  const rowTotal = (row: (typeof data)[number]) =>
    series.reduce((sum, s) => sum + Number(row[s.key] ?? 0), 0)
  const domainMax = niceMax(max(data, rowTotal) ?? 0)
  const y = scaleLinear().domain([0, domainMax]).range([innerH, 0])
  const ticks = y.ticks(4)
  const colorOf = (i: number, s: StackedSpec['series'][number]) =>
    variantColor(s.variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length])

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
          {data.map((row, ri) => {
            const band = x.bandwidth()
            const barW = Math.min(band, MAX_BAR)
            const bx = (x(row.label) ?? 0) + (band - barW) / 2
            let acc = 0
            return (
              <g key={ri}>
                {/* Grow the whole column up from the baseline as it reveals. */}
                <g className="chart-bar__grow-v" style={{ animationDelay: `${ri * 40}ms` }}>
                  {series.map((s, si) => {
                    const v = Number(row[s.key] ?? 0)
                    const y0 = y(acc)
                    const y1 = y(acc + v)
                    acc += v
                    const color = colorOf(si, s)
                    return (
                      <g key={s.key}>
                        <path
                          d={roundedRectPath(bx, y1, barW, y0 - y1, {})}
                          fill={color}
                          onMouseEnter={() =>
                            show({
                              x: m.left + bx + barW / 2,
                              y: m.top + (y0 + y1) / 2,
                              label: row.label,
                              rows: [{ name: s.label, value: v, color }],
                            })
                          }
                          onMouseLeave={hide}
                        />
                        {y0 - y1 >= MIN_LABEL_SEGMENT ? (
                          <text
                            x={bx + barW / 2}
                            y={(y0 + y1) / 2}
                            dy="0.32em"
                            textAnchor="middle"
                            style={{
                              fontFamily: AXIS_TEXT.fontFamily,
                              fontSize: 11,
                              fill: CHART_COLORS.white,
                              fontWeight: 600,
                              pointerEvents: 'none',
                            }}
                          >
                            {fmt(v, chart.unit)}
                          </text>
                        ) : null}
                      </g>
                    )
                  })}
                </g>
                <text x={bx + barW / 2} y={innerH + 18} textAnchor="middle" style={AXIS_TEXT}>
                  {row.label}
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
              scale={y}
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
