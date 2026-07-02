import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, variantColor } from '../../chartTheme'
import { computeDelta, fmt, niceMax, roundedRectPath, splitLabel } from '../geometry'
import { ChartTooltip, GridLines, MultiLineLabel, ReferenceMarker } from '../primitives'
import { AXIS_TEXT, VALUE_LABEL } from '../style'
import { useBarInteraction } from '../useBarInteraction'
import type { TooltipState } from '../useTooltip'

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

/** Fill/stroke for a bar, hollow-and-dashed when its datum is a projection. */
function barPaint(projected: boolean, color: string) {
  return projected
    ? { fill: 'none', stroke: color, strokeWidth: 2, strokeDasharray: '4 3' }
    : { fill: color, stroke: undefined, strokeWidth: undefined, strokeDasharray: undefined }
}

function VerticalBars({ chart, width, height }: KindProps) {
  const { tip, show, hide, svgRef, pinnedIndex, isDimmed, togglePin } = useBarInteraction()
  const data = chart.data
  const showDelta = data.length === 2
  const hasAnnotations = (chart.annotations?.length ?? 0) > 0
  const maxLines = Math.max(1, ...data.map((d) => splitLabel(d.label).length))
  const m = {
    top: (showDelta ? 46 : 26) + (hasAnnotations ? 24 : 0),
    right: 12,
    bottom: 28 + (maxLines - 1) * 13,
    left: 46,
  }
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
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          <GridLines ticks={ticks} scale={y} x0={0} x1={innerW} />
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
            const tipState: TooltipState = {
              x: m.left + bx + barW / 2,
              y: m.top + by,
              label: d.label,
              rows: [{ value: d.value, color }],
            }
            return (
              <g
                key={i}
                onMouseEnter={() => {
                  if (pinnedIndex === null) show(tipState)
                }}
                onMouseLeave={() => {
                  if (pinnedIndex === null) hide()
                }}
                onClick={() => togglePin(i, tipState)}
              >
                <rect
                  className="chart-bar__hit"
                  x={x(d.label) ?? 0}
                  y={0}
                  width={band}
                  height={innerH}
                  fill="transparent"
                />
                <g className="chart-bar__mark" data-dimmed={isDimmed(i) || undefined}>
                  <path
                    className="chart-bar__grow-v"
                    style={{ animationDelay: `${i * 40}ms` }}
                    d={roundedRectPath(bx, by, barW, bh, { tl: 3, tr: 3 })}
                    {...barPaint(d.projected === true, color)}
                  />
                  <text
                    x={bx + barW / 2}
                    y={by - 8}
                    textAnchor="middle"
                    style={{ ...VALUE_LABEL, pointerEvents: 'none' }}
                  >
                    {fmt(d.value, chart.unit)}
                  </text>
                </g>
                <MultiLineLabel
                  x={(x(d.label) ?? 0) + band / 2}
                  y={innerH + 18}
                  label={d.label}
                  style={AXIS_TEXT}
                />
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
          {(chart.annotations ?? []).map((a, i) => {
            const d = data.find((p) => p.label === a.at)
            if (!d) return null
            const band = x.bandwidth()
            const barW = Math.min(band, MAX_BAR)
            const bx = (x(d.label) ?? 0) + (band - barW) / 2
            const topY = y(d.value) - 8
            return (
              <g key={`anno-${i}`} aria-hidden="true">
                <line
                  x1={bx + barW / 2}
                  y1={topY - 14}
                  x2={bx + barW / 2}
                  y2={topY - 2}
                  stroke={CHART_COLORS.muted}
                />
                <text
                  x={bx + barW / 2}
                  y={topY - 20}
                  textAnchor="middle"
                  stroke={CHART_COLORS.white}
                  strokeWidth={3}
                  paintOrder="stroke"
                  style={{ ...AXIS_TEXT, fill: CHART_COLORS.ink, fontWeight: 600 }}
                >
                  {a.text}
                </text>
              </g>
            )
          })}
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
  const { tip, show, hide, svgRef, pinnedIndex, isDimmed, togglePin } = useBarInteraction()
  const data = chart.data
  const showDelta = data.length === 2
  const delta = showDelta ? computeDelta(data[0].value, data[1].value) : null
  const m = { top: showDelta ? 46 : 8, right: 52, bottom: 8, left: 96 }
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
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${m.left},${m.top})`}>
          <GridLines ticks={ticks} scale={x} y0={0} y1={innerH} orientation="vertical" />
          {data.map((d, i) => {
            const band = y.bandwidth()
            const barH = Math.min(band, 42)
            const by = (y(d.label) ?? 0) + (band - barH) / 2
            const bw = x(d.value)
            const color = variantColor(d.variant ?? chart.variant)
            const tipState: TooltipState = {
              x: m.left + bw,
              y: m.top + by + barH / 2,
              label: d.label,
              rows: [{ value: d.value, color }],
            }
            return (
              <g
                key={i}
                onMouseEnter={() => {
                  if (pinnedIndex === null) show(tipState)
                }}
                onMouseLeave={() => {
                  if (pinnedIndex === null) hide()
                }}
                onClick={() => togglePin(i, tipState)}
              >
                <rect
                  className="chart-bar__hit"
                  x={0}
                  y={y(d.label) ?? 0}
                  width={innerW}
                  height={band}
                  fill="transparent"
                />
                <g className="chart-bar__mark" data-dimmed={isDimmed(i) || undefined}>
                  <path
                    className="chart-bar__grow-h"
                    style={{ animationDelay: `${i * 40}ms` }}
                    d={roundedRectPath(0, by, bw, barH, { tr: 3, br: 3 })}
                    {...barPaint(d.projected === true, color)}
                  />
                  <text
                    x={bw + 8}
                    y={by + barH / 2}
                    dy="0.32em"
                    style={{ ...VALUE_LABEL, pointerEvents: 'none' }}
                  >
                    {fmt(d.value, chart.unit)}
                  </text>
                </g>
                <MultiLineLabel
                  x={-10}
                  y={by + barH / 2}
                  label={d.label}
                  anchor="end"
                  dy={0.32}
                  centered
                  style={AXIS_TEXT}
                />
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
              scale={x}
              y0={0}
              y1={innerH}
              unit={chart.unit}
              orientation="vertical"
            />
          ) : null}
          {(chart.annotations ?? []).map((a, i) => {
            const d = data.find((p) => p.label === a.at)
            if (!d) return null
            const band = y.bandwidth()
            const barH = Math.min(band, 42)
            const by = (y(d.label) ?? 0) + (band - barH) / 2
            const bw = x(d.value)
            return (
              <text
                key={`anno-${i}`}
                aria-hidden="true"
                x={bw + 60}
                y={by + barH / 2}
                dy="0.32em"
                textAnchor="start"
                stroke={CHART_COLORS.white}
                strokeWidth={3}
                paintOrder="stroke"
                style={{ ...AXIS_TEXT, fill: CHART_COLORS.ink, fontWeight: 600 }}
              >
                {a.text}
              </text>
            )
          })}
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
