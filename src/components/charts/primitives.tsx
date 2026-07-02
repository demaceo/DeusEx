/**
 * Shared SVG/overlay primitive components for the chart kit: the editorial hover
 * tooltip, gridlines, and the dashed reference marker. Presentational only — each
 * kind composes them over its own d3-derived geometry. (The `useTooltip` hook and
 * text-style constants live in sibling modules to keep this file component-only.)
 */

import { CHART_COLORS, CHART_FONT } from '../chartTheme'
import { fmt, splitLabel } from './geometry'
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

/**
 * A category label split on literal `\n`s into stacked `<tspan>` lines (real part data uses
 * embedded newlines, e.g. "White House\nJul 2023", which a plain `<text>` node can't render).
 * `dy` is the single-line baseline offset in em (0 for a label sitting below an axis, 0.32 for
 * one vertically centered against a target y); `centered` additionally re-centers a multi-line
 * block around `y` so a 2-line label still lines up with its bar's mid-height.
 */
export function MultiLineLabel({
  x,
  y,
  label,
  anchor = 'middle',
  dy = 0,
  centered = false,
  lineHeight = 1.15,
  style,
}: {
  x: number
  y: number
  label: string
  anchor?: 'start' | 'middle' | 'end'
  dy?: number
  centered?: boolean
  lineHeight?: number
  style?: React.CSSProperties
}) {
  const lines = splitLabel(label)
  const centerShift = centered ? ((lines.length - 1) * lineHeight) / 2 : 0
  return (
    <text x={x} y={y} textAnchor={anchor} style={{ pointerEvents: 'none', ...style }}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={`${i === 0 ? dy - centerShift : lineHeight}em`}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

/**
 * Dashed gridlines at the given value-axis tick positions. `orientation: 'horizontal'` (the
 * default) draws horizontal lines at `scale(tick)` across `[x0, x1]`, for a vertical value
 * axis; `'vertical'` draws vertical lines at `scale(tick)` across `[y0, y1]`, for a horizontal
 * value axis (e.g. horizontally-oriented bars).
 */
export function GridLines({
  ticks,
  scale,
  x0,
  x1,
  y0,
  y1,
  orientation = 'horizontal',
}: {
  ticks: number[]
  scale: (value: number) => number
  x0?: number
  x1?: number
  y0?: number
  y1?: number
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <g aria-hidden="true">
      {ticks.map((tick, i) =>
        orientation === 'horizontal' ? (
          <line
            key={i}
            x1={x0}
            x2={x1}
            y1={scale(tick)}
            y2={scale(tick)}
            stroke={CHART_COLORS.rule}
            strokeDasharray="2 3"
          />
        ) : (
          <line
            key={i}
            x1={scale(tick)}
            x2={scale(tick)}
            y1={y0}
            y2={y1}
            stroke={CHART_COLORS.rule}
            strokeDasharray="2 3"
          />
        ),
      )}
    </g>
  )
}

/**
 * A dashed reference/threshold line with an optional mono label. `orientation:
 * 'horizontal'` (the default) draws it at `scale(value)` across `[x0, x1]`, for a vertical
 * value axis; `'vertical'` draws it at `scale(value)` across `[y0, y1]`, for a horizontal value
 * axis (e.g. horizontally-oriented bars).
 */
export function ReferenceMarker({
  value,
  label,
  color,
  scale,
  x0,
  x1,
  y0,
  y1,
  unit,
  orientation = 'horizontal',
}: {
  value: number
  label?: string
  color: string
  scale: (value: number) => number
  x0?: number
  x1?: number
  y0?: number
  y1?: number
  unit?: string
  orientation?: 'horizontal' | 'vertical'
}) {
  const textStyle = { fontFamily: CHART_FONT.mono, fontSize: 10, fill: color, fontWeight: 600 }
  if (orientation === 'vertical') {
    const xx = scale(value)
    return (
      <g aria-hidden="true">
        <line
          x1={xx}
          x2={xx}
          y1={y0}
          y2={y1}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="5 3"
        />
        {label ? (
          <text
            x={xx + 6}
            y={(y0 ?? 0) + 10}
            textAnchor="start"
            stroke={CHART_COLORS.white}
            strokeWidth={3}
            paintOrder="stroke"
            style={textStyle}
          >
            {label} {fmt(value, unit)}
          </text>
        ) : null}
      </g>
    )
  }
  const yy = scale(value)
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
          style={textStyle}
        >
          {label} {fmt(value, unit)}
        </text>
      ) : null}
    </g>
  )
}
