import { useClaim } from '../context/DocumentContext'

interface CitationProps {
  claimId: string
  /** Optional override for the visible citation label. */
  label?: string
}

/**
 * Renders an inline `<cite>`. Resolves the claim from context and exposes its
 * verification status via `data-verification` — the styling seam a future
 * verification pass lights up. The label falls back to the claim's text.
 */
export function Citation({ claimId, label }: CitationProps) {
  const claim = useClaim(claimId)
  const text = label ?? claim?.claimText ?? claimId
  const status = claim?.verificationStatus ?? 'pending'
  return (
    <cite data-verification={status} title={`Verification: ${status}`}>
      {text}
    </cite>
  )
}
