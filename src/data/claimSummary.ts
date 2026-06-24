/** Tally of a document's claims by verification status. */
import type { Claim, VerificationStatus } from '../types/content'

export interface ClaimStatusSummary {
  total: number
  verified: number
  disputed: number
  unverified: number
  pending: number
}

const EMPTY: ClaimStatusSummary = {
  total: 0,
  verified: 0,
  disputed: 0,
  unverified: 0,
  pending: 0,
}

/** Count claims by verification status for a document's claims registry. */
export function summarizeClaimStatuses(claims: Record<string, Claim>): ClaimStatusSummary {
  const summary: ClaimStatusSummary = { ...EMPTY }
  for (const claim of Object.values(claims)) {
    summary.total += 1
    const status: VerificationStatus = claim.verificationStatus
    summary[status] += 1
  }
  return summary
}
