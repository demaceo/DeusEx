import { max as d3max } from 'd3-array'
import { scaleSqrt } from 'd3-scale'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { fitWorld, loadBasemap, type WorldBasemap } from '../../../data/worldBasemap'
import { COUNTRY_CENTROIDS } from '../../../data/worldCentroids'
import type { ChartSpec, WorldMapDatum } from '../../../types/document'
import { CHART_COLORS } from '../../chartTheme'
import { fmt } from '../geometry'
import { ChartTooltip } from '../primitives'
import { AXIS_TEXT } from '../style'
import { useTooltip } from '../useTooltip'

type WorldMapSpec = Extract<ChartSpec, { kind: 'worldMap' }>

interface KindProps {
  chart: WorldMapSpec
  width: number
  height: number
  /** In a thumbnail preview, skip the year scrubber (button/input controls
   * can't nest inside the thumbnail's own trigger button) but still render
   * real data for the first frame. */
  thumbnail?: boolean
}

const SCRUBBER_H = 44
const AUTOPLAY_MS = 1600

const valueAt = (d: WorldMapDatum, year?: string): number =>
  (year ? d.values?.[year] : d.value) ?? 0

export function WorldMap({ chart, width, height, thumbnail }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const reduceMotion = usePrefersReducedMotion()
  const [basemap, setBasemap] = useState<WorldBasemap | null>(null)
  const [yearIndex, setYearIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let live = true
    loadBasemap().then((fc) => {
      if (live) setBasemap(fc)
    })
    return () => {
      live = false
    }
  }, [])

  const years = chart.years
  const hasYears = !!years?.length
  // Thumbnails skip the scrubber chrome (and the height reserved for it)
  // entirely, but still plot the first frame's real data below.
  const showScrubber = hasYears && !thumbnail

  useEffect(() => {
    if (!playing || reduceMotion || !years || years.length < 2) return
    const id = setInterval(() => setYearIndex((i) => (i + 1) % years.length), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [playing, reduceMotion, years])

  const mapH = showScrubber ? height - SCRUBBER_H : height
  const year = hasYears ? years![Math.min(yearIndex, years!.length - 1)] : undefined

  // Shared radius domain across ALL frames so bubbles visibly grow between years.
  const domainMax =
    chart.domainMax ??
    d3max(chart.data, (d) =>
      years ? (d3max(years, (y) => valueAt(d, y)) ?? 0) : valueAt(d, undefined),
    ) ??
    1
  const maxR = Math.max(16, Math.min(mapH, width) / 9)
  const radius = scaleSqrt().domain([0, domainMax]).range([0, maxR])

  return (
    <>
      {basemap ? (
        <MapSvg
          chart={chart}
          basemap={basemap}
          width={width}
          mapH={mapH}
          year={year}
          radius={radius}
          domainMax={domainMax}
          show={show}
          hide={hide}
        />
      ) : (
        <svg width={width} height={mapH} role="img" aria-label={chart.ariaLabel}>
          <text x={width / 2} y={mapH / 2} textAnchor="middle" style={AXIS_TEXT}>
            Loading map…
          </text>
        </svg>
      )}

      {showScrubber ? (
        <div className="chart-worldmap__scrubber">
          {years!.length === 2 ? (
            <div className="chart-worldmap__toggle" role="group" aria-label="Year">
              {years!.map((y, i) => (
                <button
                  key={y}
                  type="button"
                  data-active={i === yearIndex}
                  onClick={() => setYearIndex(i)}
                >
                  {y}
                </button>
              ))}
            </div>
          ) : (
            <>
              {!reduceMotion ? (
                <button
                  type="button"
                  className="chart-worldmap__play"
                  aria-label={playing ? 'Pause' : 'Play'}
                  onClick={() => setPlaying((p) => !p)}
                >
                  {playing ? '❙❙' : '▶'}
                </button>
              ) : null}
              <input
                type="range"
                min={0}
                max={years!.length - 1}
                step={1}
                value={yearIndex}
                aria-label="Year"
                onChange={(e) => {
                  setPlaying(false)
                  setYearIndex(Number(e.target.value))
                }}
              />
            </>
          )}
          <span className="chart-worldmap__year">{year}</span>
        </div>
      ) : null}

      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}

interface MapSvgProps {
  chart: WorldMapSpec
  basemap: WorldBasemap
  width: number
  mapH: number
  year?: string
  radius: (v: number) => number
  domainMax: number
  show: ReturnType<typeof useTooltip>['show']
  hide: ReturnType<typeof useTooltip>['hide']
}

function MapSvg({ chart, basemap, width, mapH, year, radius, domainMax, show, hide }: MapSvgProps) {
  const { projection, path } = fitWorld(basemap, width, mapH)

  // Resolve each datum to a projected bubble; largest first so small render on top.
  const bubbles = chart.data
    .map((d) => {
      const centroid = COUNTRY_CENTROIDS[d.iso]
      if (!centroid) return null
      const value = valueAt(d, year)
      const [cx, cy] = projection(centroid) ?? [0, 0]
      return { iso: d.iso, label: d.label, value, cx, cy, r: radius(value) }
    })
    .filter((b): b is NonNullable<typeof b> => b !== null && b.value > 0)
    .sort((a, b) => b.value - a.value)

  // Two-circle nested size legend, bottom-left, using the live radius scale.
  const legendVals = [domainMax, Math.round(domainMax / 4)]
  const legendBaseY = mapH - 14
  const legendX = 30
  const legendCaptionX = legendX + radius(domainMax) + 8

  return (
    <svg width={width} height={mapH} role="img" aria-label={chart.ariaLabel}>
      <g aria-hidden="true">
        {basemap.features.map((f, i) => (
          <path
            key={(f.id as string) ?? i}
            d={path(f) ?? ''}
            fill={CHART_COLORS.panel}
            stroke={CHART_COLORS.rule}
            strokeWidth={0.5}
          />
        ))}
      </g>
      <g aria-hidden="true">
        {bubbles.map((b) => (
          <circle
            key={b.iso}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            className="chart-worldmap__bubble"
            fill={CHART_COLORS.accent}
            fillOpacity={0.6}
            stroke={CHART_COLORS.white}
            strokeWidth={0.8}
            onMouseEnter={() =>
              show({
                x: b.cx,
                y: b.cy - b.r,
                label: b.label,
                rows: [{ value: b.value, color: CHART_COLORS.accent }],
              })
            }
            onMouseLeave={hide}
          />
        ))}
      </g>
      {/* In-map size legend */}
      <g aria-hidden="true">
        {legendVals.map((v, i) => {
          const rr = radius(v)
          return (
            <g key={i}>
              <circle
                cx={legendX}
                cy={legendBaseY - rr}
                r={rr}
                fill="none"
                stroke={CHART_COLORS.muted}
                strokeWidth={1}
              />
              <text
                x={legendCaptionX}
                y={legendBaseY - rr * 2 + 4}
                style={{ ...AXIS_TEXT, fontSize: 9 }}
              >
                {fmt(v, chart.unit)}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
