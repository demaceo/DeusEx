/**
 * Shared SVG/overlay primitive components for the chart kit: the editorial hover
 * tooltip, gridlines, and the dashed reference marker. Presentational only — each
 * kind composes them over its own d3-derived geometry. (The `useTooltip` hook and
 * text-style constants live in sibling modules to keep this file component-only.)
 */

import { CHART_COLORS, CHART_FONT } from '../chartTheme'
import { fmt } from './geometry'
import type { TooltipState } from './useTooltip'

/** The paper-card tooltip, absolutely positioned within the (relative) canvas. */
export function ChartTooltip({ tip, unit }: { tip: TooltipState | null; unit?: string }) {
  if (!tip) return null
  return (
    <div
      className="chart-tooltip chart-tooltip--floating"
      style={{ left: tip.x, top: tip.y }}
      role="presentation"
    >
      {tip.label != null ? <span className="chart-tooltip__label">{tip.label}</span> : null}
      {tip.rows.map((row, i) => (
        <span key={i} className="chart-tooltip__row">
          <span className="chart-tooltip__swatch" style={{ background: row.color }} />
          {row.name ? <span className="chart-tooltip__name">{row.name}</span> : null}
          <strong>{typeof row.value === 'number' ? fmt(row.value, unit) : row.value}</strong>
        </span>
      ))}
    </div>
  )
}

/** Horizontal dashed gridlines at the given value-axis tick positions. */
export function GridLines({
  ticks,
  y,
  x0,
  x1,
}: {
  ticks: number[]
  y: (value: number) => number
  x0: number
  x1: number
}) {
  return (
    <g aria-hidden="true">
      {ticks.map((tick, i) => (
        <line
          key={i}
          x1={x0}
          x2={x1}
          y1={y(tick)}
          y2={y(tick)}
          stroke={CHART_COLORS.rule}
          strokeDasharray="2 3"
        />
      ))}
    </g>
  )
}

/** A dashed reference/threshold line with an optional mono label (bar/line/stacked). */
export function ReferenceMarker({
  value,
  label,
  color,
  y,
  x0,
  x1,
  unit,
}: {
  value: number
  label?: string
  color: string
  y: (value: number) => number
  x0: number
  x1: number
  unit?: string
}) {
  const yy = y(value)
  return (
    <g aria-hidden="true">
      <line
        x1={x0}
        x2={x1}
        y1={yy}
        y2={yy}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="5 3"
      />
      {label ? (
        <text
          x={x1}
          y={yy - 5}
          textAnchor="end"
          stroke={CHART_COLORS.white}
          strokeWidth={3}
          paintOrder="stroke"
          style={{ fontFamily: CHART_FONT.mono, fontSize: 10, fill: color, fontWeight: 600 }}
        >
          {label} {fmt(value, unit)}
        </text>
      ) : null}
    </g>
  )
}
