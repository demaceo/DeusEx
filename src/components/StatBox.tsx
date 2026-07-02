import type { CSSProperties } from 'react'
import { useClaimDrawer } from '../context/ClaimDrawerContext'
import { useClaim, useSource } from '../context/DocumentContext'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import type { StatBox as StatBoxData } from '../types/document'

interface StatBoxProps {
  stat: StatBoxData
  /** Position within its StatGrid; staggers the scroll-reveal delay. */
  index?: number
}

/** A single stat callout. Color via `data-variant`, verification via `data-verification`.
 *  When backed by a claim, the box opens the evidence drawer on click. Its value
 *  fades in the first time it scrolls into view. */
export function StatBox({ stat, index = 0 }: StatBoxProps) {
  const claim = useClaim(stat.claimId)
  const source = useSource(claim?.sourceId)
  const { open } = useClaimDrawer()
  const status = stat.claimId ? (claim?.verificationStatus ?? 'pending') : undefined
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>()

  const interactive = !!claim

  return (
    <div
      ref={ref}
      className="stat-box"
      data-variant={stat.variant}
      data-verification={status}
      data-revealed={revealed}
      style={{ '--reveal-index': index } as CSSProperties}
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
