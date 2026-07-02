import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, CHART_FONT, variantColor } from '../../chartTheme'
import { fmt, niceMax } from '../geometry'
import { ChartTooltip } from '../primitives'
import { AXIS_TEXT, VALUE_LABEL } from '../style'
import { useTooltip } from '../useTooltip'

type BulletSpec = Extract<ChartSpec, { kind: 'bullet' }>

interface KindProps {
  chart: BulletSpec
  width: number
  height: number
}

/**
 * Bullet chart: each measure as a bar against a shared `target` marker on a muted
 * track. Built for "value vs threshold/goal" comparisons.
 */
export function Bullet({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const m = { top: 22, right: 58, bottom: 10, left: 112 }
  const innerW = Math.max(0, width - m.left - m.right)
  const innerH = Math.max(0, height - m.top - m.bottom)

  const domainMax = niceMax(Math.max(max(data, (d) => d.value) ?? 0, chart.target) * 1.05)
  const x = scaleLinear().domain([0, domainMax]).range([0, innerW])
  const y = scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerH])
    .padding(0.45)
  const tx = x(chart.target)

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          {/* Shared target marker spanning all rows. */}
          <line
            x1={tx}
            y1={-6}
            x2={tx}
            y2={innerH}
            stroke={CHART_COLORS.ink}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <text
            x={tx}
            y={-10}
            textAnchor="middle"
            style={{
              fontFamily: CHART_FONT.mono,
              fontSize: 10,
              fill: CHART_COLORS.ink,
              fontWeight: 600,
            }}
          >
            {chart.targetLabel ?? 'Target'} {fmt(chart.target, chart.unit)}
          </text>

          {data.map((d, i) => {
            const band = y.bandwidth()
            const ty = y(d.label) ?? 0
            const barH = band * 0.5
            const color = variantColor(d.variant ?? chart.variant)
            return (
              <g
                key={i}
                onMouseEnter={() =>
                  show({ x: m.left + x(d.value), y: m.top + ty, rows: [{ value: d.value, color }] })
                }
                onMouseLeave={hide}
              >
                <rect x={0} y={ty} width={innerW} height={band} rx={2} fill={CHART_COLORS.panel} />
                <rect
                  className="chart-bar__grow-h"
                  style={{ animationDelay: `${i * 60}ms` }}
                  x={0}
                  y={ty + (band - barH) / 2}
                  width={x(d.value)}
                  height={barH}
                  rx={2}
                  fill={color}
                />
                <text x={x(d.value) + 8} y={ty + band / 2} dy="0.32em" style={VALUE_LABEL}>
                  {fmt(d.value, chart.unit)}
                </text>
                <text x={-12} y={ty + band / 2} dy="0.32em" textAnchor="end" style={AXIS_TEXT}>
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
