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

/** Sum two summaries field by field, e.g. to build a series-wide aggregate. */
export function addSummaries(a: ClaimStatusSummary, b: ClaimStatusSummary): ClaimStatusSummary {
  return {
    total: a.total + b.total,
    verified: a.verified + b.verified,
    disputed: a.disputed + b.disputed,
    unverified: a.unverified + b.unverified,
    pending: a.pending + b.pending,
  }
}

/** Percentage of `part` within `whole`, rounded; 0 when `whole` is 0. */
export function pct(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100)
}

/** Series-wide aggregate across every document's claims registry. */
export function aggregateClaimStatuses(claimsPerDoc: Record<string, Claim>[]): ClaimStatusSummary {
  return claimsPerDoc.reduce((acc, claims) => addSummaries(acc, summarizeClaimStatuses(claims)), {
    ...EMPTY,
  })
}
