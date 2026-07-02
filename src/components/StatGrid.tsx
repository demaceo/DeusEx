import type { StatGrid as StatGridData } from '../types/document'
import { StatBox } from './StatBox'

interface StatGridProps {
  grid: StatGridData
}

export function StatGrid({ grid }: StatGridProps) {
  return (
    <div className="stats-grid">
      {grid.stats.map((stat, i) => (
        <StatBox key={i} stat={stat} index={i} />
      ))}
    </div>
  )
}
