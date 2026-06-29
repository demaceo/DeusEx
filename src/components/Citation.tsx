import { useClaimDrawer } from '../context/ClaimDrawerContext'
import { useClaim, useSource } from '../context/DocumentContext'

interface CitationProps {
  claimId: string
  /** Optional override for the visible citation label. */
  label?: string
}

/**
 * Renders an inline `<cite>`. Resolves the claim from context and exposes its
 * verification status via `data-verification` — the styling seam the verification
 * pass lights up. When the claim resolves, the cite becomes a button that opens the
 * evidence drawer. The label falls back to the claim's text.
 */
export function Citation({ claimId, label }: CitationProps) {
  const claim = useClaim(claimId)
  const source = useSource(claim?.sourceId)
  const { open } = useClaimDrawer()
  const text = label ?? claim?.claimText ?? claimId
  const status = claim?.verificationStatus ?? 'pending'

  if (!claim) {
    return (
      <cite data-verification={status} title={`Verification: ${status}`}>
        {text}
      </cite>
    )
  }

  return (
    <cite
      data-verification={status}
      role="button"
      tabIndex={0}
      aria-label={`${text} — view evidence (${status})`}
      title={`Verification: ${status} — view evidence`}
      onClick={() => open(claim, source)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open(claim, source)
        }
      }}
    >
      {text}
    </cite>
  )
}
