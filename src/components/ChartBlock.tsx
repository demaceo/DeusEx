import { useContext } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { DocumentContext } from '../context/DocumentContext'
import type { VerificationStatus } from '../types/content'
import type { ChartDatum, ChartSpec } from '../types/document'
import { AXIS_TICK, CHART_COLORS, CHART_FONT, SEGMENT_VARIANTS, variantColor } from './chartTheme'

interface ChartBlockProps {
  chart: ChartSpec
}

/** Format a numeric value with its unit. Handles `%`, `$`-prefixed units, and suffixes. */
function fmt(value: number, unit?: string): string {
  if (!unit) return `${value}`
  if (unit === '%') return `${value}%`
  if (unit.startsWith('$')) return `$${value}${unit.slice(1)}`
  return `${value} ${unit}`
}

/**
 * Aggregate the verification state of the claims a chart rests on. Mirrors the
 * StatBox pattern: a chart is only "verified" when every backing claim is.
 */
function useChartStatus(claimIds?: string[]): VerificationStatus | undefined {
  const ctx = useContext(DocumentContext)
  if (!claimIds || claimIds.length === 0) return undefined
  const statuses = claimIds.map((id) => ctx?.claims[id]?.verificationStatus ?? 'pending')
  if (statuses.every((s) => s === 'verified')) return 'verified'
  if (statuses.some((s) => s === 'disputed')) return 'disputed'
  if (statuses.some((s) => s === 'unverified')) return 'unverified'
  return 'pending'
}

/** Editorial tooltip: mono type, paper card, value formatted with the chart unit. */
function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string; payload?: ChartDatum }>
  label?: string | number
  unit?: string
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="chart-tooltip">
      {label != null ? <span className="chart-tooltip__label">{label}</span> : null}
      {payload.map((entry, i) => (
        <span key={i} className="chart-tooltip__row">
          <span className="chart-tooltip__swatch" style={{ background: entry.color }} />
          {entry.name ? <span className="chart-tooltip__name">{entry.name}</span> : null}
          <strong>{typeof entry.value === 'number' ? fmt(entry.value, unit) : entry.value}</strong>
        </span>
      ))}
    </div>
  )
}

const GRID_STROKE = CHART_COLORS.rule
const HEIGHT = 280

/** Renders the SVG chart for a given spec. Wrapped by ChartBlock in a sized canvas. */
function ChartCanvas({ chart }: ChartBlockProps) {
  const valueLabel = (value: unknown) =>
    typeof value === 'number' ? fmt(value, chart.unit) : `${value ?? ''}`

  switch (chart.kind) {
    case 'bar': {
      const horizontal = chart.orientation === 'horizontal'
      const defaultColor = variantColor(chart.variant)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chart.data}
            layout={horizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 18, right: 20, bottom: 4, left: horizontal ? 8 : 0 }}
          >
            <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 3" vertical={horizontal} />
            {horizontal ? (
              <>
                <XAxis type="number" tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={AXIS_TICK}
                  tickLine={false}
                  width={88}
                  stroke={GRID_STROKE}
                />
              </>
            ) : (
              <>
                <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} />
                <YAxis tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} width={44} />
              </>
            )}
            <Tooltip
              cursor={{ fill: 'rgba(192,57,43,0.06)' }}
              content={<ChartTooltip unit={chart.unit} />}
            />
            <Bar dataKey="value" radius={horizontal ? [0, 3, 3, 0] : [3, 3, 0, 0]} maxBarSize={64}>
              {chart.data.map((d, i) => (
                <Cell key={i} fill={d.variant ? variantColor(d.variant) : defaultColor} />
              ))}
              <LabelList
                dataKey="value"
                position={horizontal ? 'right' : 'top'}
                formatter={valueLabel}
                style={{
                  fontFamily: CHART_FONT.mono,
                  fontSize: 11,
                  fill: CHART_COLORS.ink,
                  fontWeight: 600,
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }

    case 'line': {
      const color = variantColor(chart.variant)
      const Chart = chart.area ? AreaChart : LineChart
      return (
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={chart.data} margin={{ top: 18, right: 24, bottom: 4, left: 0 }}>
            <defs>
              <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 3" vertical={false} />
            <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} />
            <YAxis tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} width={44} />
            <Tooltip content={<ChartTooltip unit={chart.unit} />} />
            {chart.area ? (
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
                fill="url(#chartArea)"
                dot={{ r: 4, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={valueLabel}
                  style={{ fontFamily: CHART_FONT.mono, fontSize: 11, fill: CHART_COLORS.ink }}
                />
              </Area>
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 4, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={valueLabel}
                  style={{ fontFamily: CHART_FONT.mono, fontSize: 11, fill: CHART_COLORS.ink }}
                />
              </Line>
            )}
          </Chart>
        </ResponsiveContainer>
      )
    }

    case 'donut': {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Tooltip content={<ChartTooltip unit={chart.unit} />} />
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="82%"
              paddingAngle={2}
              stroke={CHART_COLORS.paper}
              strokeWidth={2}
            >
              {chart.data.map((d, i) => (
                <Cell
                  key={i}
                  fill={variantColor(d.variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length])}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    }

    case 'stackedBar': {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data} margin={{ top: 12, right: 20, bottom: 4, left: 0 }}>
            <CartesianGrid stroke={GRID_STROKE} strokeDasharray="2 3" vertical={false} />
            <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} />
            <YAxis tick={AXIS_TICK} tickLine={false} stroke={GRID_STROKE} width={44} />
            <Tooltip
              cursor={{ fill: 'rgba(192,57,43,0.06)' }}
              content={<ChartTooltip unit={chart.unit} />}
            />
            {chart.series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                stackId="a"
                fill={variantColor(s.variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length])}
                maxBarSize={80}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )
    }
  }
}

/** Legend rows for donut / stacked charts, so labels keep the editorial mono type. */
function ChartLegend({ chart }: ChartBlockProps) {
  if (chart.kind === 'donut') {
    return (
      <ul className="chart-legend">
        {chart.data.map((d, i) => (
          <li key={i}>
            <span
              className="chart-legend__swatch"
              style={{
                background: variantColor(
                  d.variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length],
                ),
              }}
            />
            {d.label} <strong>{fmt(d.value, chart.unit)}</strong>
          </li>
        ))}
      </ul>
    )
  }
  if (chart.kind === 'stackedBar') {
    return (
      <ul className="chart-legend">
        {chart.series.map((s, i) => (
          <li key={s.key}>
            <span
              className="chart-legend__swatch"
              style={{
                background: variantColor(
                  s.variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length],
                ),
              }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    )
  }
  return null
}

/** Visually-hidden data table so the figures are readable by assistive tech. */
function ChartDataTable({ chart }: ChartBlockProps) {
  if (chart.kind === 'stackedBar') {
    return (
      <table className="chart-block__sr">
        <caption>{chart.title}</caption>
        <thead>
          <tr>
            <th>Category</th>
            {chart.series.map((s) => (
              <th key={s.key}>{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.data.map((row, i) => (
            <tr key={i}>
              <th scope="row">{row.label}</th>
              {chart.series.map((s) => (
                <td key={s.key}>{fmt(Number(row[s.key]), chart.unit)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return (
    <table className="chart-block__sr">
      <caption>{chart.title}</caption>
      <tbody>
        {chart.data.map((d, i) => (
          <tr key={i}>
            <th scope="row">{d.label}</th>
            <td>{fmt(d.value, chart.unit)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * Renders one data-visualization block as an editorial figure: mono eyebrow, serif
 * title, the Recharts chart, an optional legend, and a mono source caption carrying
 * the verification status. Data comes straight from the document; no fetching.
 */
export function ChartBlock({ chart }: ChartBlockProps) {
  const status = useChartStatus(chart.claimIds)
  return (
    <figure
      className="chart-block"
      data-variant={chart.variant}
      data-verification={status}
      role="img"
      aria-label={chart.ariaLabel}
    >
      <figcaption className="chart-block__head">
        {chart.labelTop ? <span className="chart-block__eyebrow">{chart.labelTop}</span> : null}
        <span className="chart-block__title">{chart.title}</span>
        {chart.subtitle ? <span className="chart-block__subtitle">{chart.subtitle}</span> : null}
      </figcaption>

      <div className="chart-block__canvas" style={{ height: HEIGHT }} aria-hidden="true">
        <ChartCanvas chart={chart} />
      </div>

      <ChartLegend chart={chart} />
      <ChartDataTable chart={chart} />

      {chart.source ? (
        <p className="chart-block__source">
          {status === 'verified' ? <span className="chart-block__verified">Verified</span> : null}
          {chart.source}
        </p>
      ) : null}
    </figure>
  )
}
