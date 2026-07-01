import { useClaimDrawer } from '../context/ClaimDrawerContext'
import { useClaim, useSource } from '../context/DocumentContext'
import type { StatBox as StatBoxData } from '../types/document'

interface StatBoxProps {
  stat: StatBoxData
}

/** A single stat callout. Color via `data-variant`, verification via `data-verification`.
 *  When backed by a claim, the box opens the evidence drawer on click. */
export function StatBox({ stat }: StatBoxProps) {
  const claim = useClaim(stat.claimId)
  const source = useSource(claim?.sourceId)
  const { open } = useClaimDrawer()
  const status = stat.claimId ? (claim?.verificationStatus ?? 'pending') : undefined

  const interactive = !!claim

  return (
    <div
      className="stat-box"
      data-variant={stat.variant}
      data-verification={status}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${stat.value}: ${stat.description} (view evidence)` : undefined}
      title={interactive ? 'View evidence' : undefined}
      onClick={interactive ? () => open(claim, source) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                open(claim, source)
              }
            }
          : undefined
      }
    >
      {stat.labelTop ? <span className="stat-label-top">{stat.labelTop}</span> : null}
      <span className="stat-num" data-size={stat.size ?? 'large'}>
        {stat.value}
      </span>
      <span className="stat-desc">{stat.description}</span>
      {interactive ? (
        <span className="stat-box__evidence" aria-hidden="true">
          View evidence
        </span>
      ) : null}
    </div>
  )
}
