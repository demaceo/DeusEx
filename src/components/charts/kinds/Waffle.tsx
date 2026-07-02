import { sum } from 'd3-array'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, SEGMENT_VARIANTS, variantColor } from '../../chartTheme'
import { ChartTooltip } from '../primitives'
import { useTooltip } from '../useTooltip'

type WaffleSpec = Extract<ChartSpec, { kind: 'waffle' }>

interface KindProps {
  chart: WaffleSpec
  width: number
  height: number
}

const COLS = 10
const GAP = 4

/**
 * A unit/dot-grid ("waffle") of `total` cells, filled per segment — reads instantly
 * as "90 of 100." An editorial alternative to a 2-segment donut for the most
 * quotable proportions.
 */
export function Waffle({ chart, width, height }: KindProps) {
  const { tip, show, hide } = useTooltip()
  const total = chart.total ?? 100
  const rows = Math.ceil(total / COLS)

  const cell = Math.max(
    6,
    Math.min((width - GAP * (COLS - 1)) / COLS, (height - GAP * (rows - 1)) / rows),
  )
  const gridW = cell * COLS + GAP * (COLS - 1)
  const gridH = cell * rows + GAP * (rows - 1)
  const offX = (width - gridW) / 2
  const offY = (height - gridH) / 2

  // Map each cell index to its owning segment (or -1 for the empty remainder).
  const totalValue = sum(chart.data, (d) => d.value) || 1
  const owner: number[] = new Array(total).fill(-1)
  let cursor = 0
  chart.data.forEach((d, si) => {
    const cells = Math.round((d.value / totalValue) * total)
    for (let k = 0; k < cells && cursor < total; k += 1, cursor += 1) owner[cursor] = si
  })
  const colorOf = (si: number) =>
    si < 0
      ? CHART_COLORS.panel
      : variantColor(chart.data[si].variant ?? SEGMENT_VARIANTS[si % SEGMENT_VARIANTS.length])

  return (
    <>
      <svg width={width} height={height}>
        {Array.from({ length: total }, (_, i) => {
          const r = Math.floor(i / COLS)
          const c = i % COLS
          const x = offX + c * (cell + GAP)
          const y = offY + r * (cell + GAP)
          const si = owner[i]
          return (
            <rect
              key={i}
              className="chart-cell"
              style={{ '--i': i } as React.CSSProperties}
              x={x}
              y={y}
              width={cell}
              height={cell}
              rx={2}
              fill={colorOf(si)}
              onMouseEnter={
                si < 0
                  ? undefined
                  : () =>
                      show({
                        x: x + cell / 2,
                        y,
                        label: chart.data[si].label,
                        rows: [{ value: chart.data[si].value, color: colorOf(si) }],
                      })
              }
              onMouseLeave={hide}
            />
          )
        })}
      </svg>
      <ChartTooltip tip={tip} unit={chart.unit} />
    </>
  )
}
