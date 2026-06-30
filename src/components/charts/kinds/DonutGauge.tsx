import { arc as d3arc, pie as d3pie } from 'd3-shape'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, SEGMENT_VARIANTS, variantColor } from '../../chartTheme'
import { dominantIndex, fmt } from '../geometry'
import { ChartTooltip } from '../primitives'
import { useTooltip } from '../useTooltip'

type DonutSpec = Extract<ChartSpec, { kind: 'donut' }>

interface KindProps {
  chart: DonutSpec
  width: number
  height: number
}

/**
 * A proportion gauge: a bold ring with the headline figure filling what used to be
 * an empty center hole. Defaults the center to the largest segment; `centerIndex`
 * overrides. This is the fix for the old hollow 2-segment donuts.
 */
export function DonutGauge({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const data = chart.data
  const cx = width / 2
  const cy = height / 2
  const R = Math.min(width, height) / 2 - 6
  const innerR = R * 0.62
  const outerR = R * 0.92

  const pieGen = d3pie<(typeof data)[number]>()
    .value((d) => d.value)
    .sort(null)
    .padAngle(0.02)
  const arcGen = d3arc<ReturnType<typeof pieGen>[number]>()
    .innerRadius(innerR)
    .outerRadius(outerR)
    .cornerRadius(2)
  const arcs = pieGen(data)

  const center =
    data[
      dominantIndex(
        data.map((d) => d.value),
        chart.centerIndex,
      )
    ]
  const colorOf = (i: number) =>
    variantColor(data[i].variant ?? SEGMENT_VARIANTS[i % SEGMENT_VARIANTS.length])

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${cx},${cy})`}>
          {arcs.map((a, i) => {
            const [mx, my] = arcGen.centroid(a)
            return (
              <path
                key={i}
                d={arcGen(a) ?? ''}
                fill={colorOf(i)}
                stroke={CHART_COLORS.paper}
                strokeWidth={2}
                onMouseEnter={() =>
                  show({
                    x: cx + mx,
                    y: cy + my,
                    label: data[i].label,
                    rows: [{ value: data[i].value, color: colorOf(i) }],
                  })
                }
                onMouseLeave={hide}
              />
            )
          })}
        </g>
      </svg>
      <div className="chart-donut__center" aria-hidden="true">
        <span className="chart-donut__figure">{fmt(center.value, chart.unit)}</span>
        <span className="chart-donut__caption">{center.label}</span>
      </div>
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}
