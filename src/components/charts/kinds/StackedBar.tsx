import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { SEGMENT_VARIANTS, variantColor } from '../../chartTheme'
import { niceMax, roundedRectPath } from '../geometry'
import { ChartTooltip, GridLines } from '../primitives'
import { AXIS_TEXT } from '../style'
import { useTooltip } from '../useTooltip'

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
                {series.map((s, si) => {
                  const v = Number(row[s.key] ?? 0)
                  const y0 = y(acc)
                  const y1 = y(acc + v)
                  acc += v
                  const color = colorOf(si, s)
                  return (
                    <path
                      key={s.key}
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
                  )
                })}
                <text x={bx + barW / 2} y={innerH + 18} textAnchor="middle" style={AXIS_TEXT}>
                  {row.label}
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
