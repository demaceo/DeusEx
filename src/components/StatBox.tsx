import { useClaim } from '../context/DocumentContext'
import type { StatBox as StatBoxData } from '../types/document'

interface StatBoxProps {
  stat: StatBoxData
}

/** A single stat callout. Color via `data-variant`, verification via `data-verification`. */
export function StatBox({ stat }: StatBoxProps) {
  const claim = useClaim(stat.claimId)
  const status = stat.claimId ? (claim?.verificationStatus ?? 'pending') : undefined
  return (
    <div className="stat-box" data-variant={stat.variant} data-verification={status}>
      {stat.labelTop ? <span className="stat-label-top">{stat.labelTop}</span> : null}
      <span className="stat-num" data-size={stat.size ?? 'large'}>
        {stat.value}
      </span>
      <span className="stat-desc">{stat.description}</span>
    </div>
  )
}
