import { sum } from 'd3-array'
import { Cpu, Droplet, DollarSign, Leaf, User, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ChartSpec } from '../../../types/document'
import { CHART_COLORS, SEGMENT_VARIANTS, variantColor } from '../../chartTheme'

type PictogramSpec = Extract<ChartSpec, { kind: 'pictogram' }>

interface KindProps {
  chart: PictogramSpec
  width: number
  height: number
}

const COLS = 10

const ICONS: Record<
  NonNullable<PictogramSpec['icon']>,
  ComponentType<{
    size?: number
    color?: string
    fill?: string
    strokeWidth?: number
    className?: string
    style?: React.CSSProperties
  }>
> = {
  user: User,
  droplet: Droplet,
  dollar: DollarSign,
  zap: Zap,
  leaf: Leaf,
  cpu: Cpu,
}

/**
 * Isotype/pictogram: a grid of `total` glyphs, filled per segment. More human and
 * evocative than a donut for "X of 100 people"-style proportions. Uses lucide icons
 * (already a dependency).
 */
export function Pictogram({ chart, width, height }: KindProps) {
  const total = chart.total ?? 100
  const rows = Math.ceil(total / COLS)
  const Icon = ICONS[chart.icon ?? 'user'] ?? User

  const cell = Math.max(
    12,
    Math.min(Math.floor((width - 8) / COLS), Math.floor((height - 8) / rows)),
  )
  const iconSize = cell - 4

  const totalValue = sum(chart.data, (d) => d.value) || 1
  const owner: number[] = new Array(total).fill(-1)
  let cursor = 0
  chart.data.forEach((d, si) => {
    const cells = Math.round((d.value / totalValue) * total)
    for (let k = 0; k < cells && cursor < total; k += 1, cursor += 1) owner[cursor] = si
  })

  return (
    <div
      className="chart-pictogram"
      style={{ gridTemplateColumns: `repeat(${COLS}, ${cell}px)`, gridAutoRows: `${cell}px` }}
    >
      {Array.from({ length: total }, (_, i) => {
        const si = owner[i]
        const color =
          si < 0
            ? CHART_COLORS.rule
            : variantColor(chart.data[si].variant ?? SEGMENT_VARIANTS[si % SEGMENT_VARIANTS.length])
        return (
          <Icon
            key={i}
            className="chart-cell"
            style={{ '--i': i } as React.CSSProperties}
            size={iconSize}
            color={color}
            fill={si < 0 ? 'none' : color}
            strokeWidth={si < 0 ? 1.5 : 0.5}
          />
        )
      })}
    </div>
  )
}
