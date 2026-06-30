/**
 * Kind-agnostic figure shell around a chart canvas: mono eyebrow, serif title,
 * the rendered SVG, an optional legend rail, a visually-hidden data table for
 * assistive tech, and the mono source line carrying verification status. Measures
 * its own width (replacing Recharts' ResponsiveContainer) and hands it to the
 * kind via `renderCanvas`.
 */

import { useClaimDrawer } from '../../context/ClaimDrawerContext'
import { useClaim, useSource } from '../../context/DocumentContext'
import { useChartWidth } from '../../hooks/useChartWidth'
import type { VerificationStatus } from '../../types/content'
import type { ChartSpec } from '../../types/document'
import { SEGMENT_VARIANTS, variantColor } from '../chartTheme'
import { defaultLayout, fmt } from './geometry'

interface ChartFrameProps {
  chart: ChartSpec
  status?: VerificationStatus
  height: number
  renderCanvas: (width: number) => React.ReactNode
}

/** Whether a kind carries a legend/aside that can float into the side rail. */
function hasAside(chart: ChartSpec): boolean {
  return (
    chart.kind === 'donut' ||
    chart.kind === 'stackedBar' ||
    chart.kind === 'waffle' ||
    chart.kind === 'pictogram'
  )
}

export function ChartFrame({ chart, status, height, renderCanvas }: ChartFrameProps) {
  const { ref, width } = useChartWidth<HTMLDivElement>()
  // Charts opt into the evidence drawer via their primary backing claim, mirroring
  // the StatBox affordance. The default drawer context is a no-op, so this is safe
  // outside a ClaimDrawerProvider (e.g. in unit tests).
  const { open } = useClaimDrawer()
  const claim = useClaim(chart.claimIds?.[0])
  const source = useSource(claim?.sourceId)

  // Kinds with their own interactive controls (the world map's year scrubber) can't
  // sit inside a `role="img"` / `aria-hidden` container — that would hide the
  // controls from assistive tech. They carry `role="img"` on their inner SVG instead.
  const interactive = chart.kind === 'worldMap'

  return (
    <figure
      className="chart-block"
      data-variant={chart.variant}
      data-verification={status}
      data-layout={defaultLayout(chart)}
      role={interactive ? undefined : 'img'}
      aria-label={interactive ? undefined : chart.ariaLabel}
    >
      <figcaption className="chart-block__head">
        {chart.labelTop ? <span className="chart-block__eyebrow">{chart.labelTop}</span> : null}
        <span className="chart-block__title">{chart.title}</span>
        {chart.subtitle ? <span className="chart-block__subtitle">{chart.subtitle}</span> : null}
      </figcaption>

      <div className="chart-block__body">
        <div
          className="chart-block__canvas"
          ref={ref}
          style={{ height }}
          aria-hidden={interactive ? undefined : true}
        >
          {renderCanvas(width)}
        </div>
        {hasAside(chart) ? (
          <div className="chart-block__aside">
            <ChartLegend chart={chart} />
          </div>
        ) : null}
      </div>

      <ChartDataTable chart={chart} />

      {chart.source ? (
        <p className="chart-block__source">
          {status === 'verified' ? <span className="chart-block__verified">Verified</span> : null}
          {chart.source}
        </p>
      ) : null}

      {claim ? (
        <button type="button" className="chart-block__evidence" onClick={() => open(claim, source)}>
          View evidence
        </button>
      ) : null}
    </figure>
  )
}

/** Legend rows for proportion / stacked charts, keeping labels in the editorial mono type. */
function ChartLegend({ chart }: { chart: ChartSpec }) {
  if (chart.kind === 'donut' || chart.kind === 'waffle' || chart.kind === 'pictogram') {
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
function ChartDataTable({ chart }: { chart: ChartSpec }) {
  if (chart.kind === 'worldMap' && chart.years?.length) {
    const years = chart.years
    return (
      <table className="chart-block__sr">
        <caption>{chart.title}</caption>
        <thead>
          <tr>
            <th>Country</th>
            {years.map((y) => (
              <th key={y}>{y}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.data.map((d, i) => (
            <tr key={i}>
              <th scope="row">{d.label}</th>
              {years.map((y) => (
                <td key={y}>{fmt(Number(d.values?.[y] ?? 0), chart.unit)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  if (chart.kind === 'worldMap') {
    return (
      <table className="chart-block__sr">
        <caption>{chart.title}</caption>
        <tbody>
          {chart.data.map((d, i) => (
            <tr key={i}>
              <th scope="row">{d.label}</th>
              <td>{fmt(Number(d.value ?? 0), chart.unit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
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
