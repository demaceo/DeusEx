import type { Claim } from '../types/content'
import { summarizeClaimStatuses } from '../data/claimSummary'

interface VerificationNoticeProps {
  claims: Record<string, Claim>
}

/**
 * Document-aware verification banner. Surfaces how many of this document's
 * statistics and citations have been independently checked against primary
 * sources (verified / disputed / unverified) versus still pending. The inline
 * citation and stat-box colors reflect the same per-claim status.
 */
export function VerificationNotice({ claims }: VerificationNoticeProps) {
  const s = summarizeClaimStatuses(claims)
  const allChecked = s.total > 0 && s.pending === 0

  return (
    <aside className="verification-notice" role="note">
      <span className="verification-notice__badge" data-state={allChecked ? 'checked' : 'pending'}>
        {allChecked ? 'Fact-checked' : 'Verification in progress'}
      </span>
      <div className="verification-notice__body">
        <p>
          {allChecked
            ? `This document’s ${s.total} statistics and citations have been independently checked against primary sources.`
            : 'This document’s statistics and citations are still being independently checked against primary sources, and should not be treated as confirmed until they are.'}{' '}
          Hover any citation for its status; verified sources link out in the list below.
        </p>
        <ul className="verification-notice__counts">
          <li data-verification="verified">{s.verified} verified</li>
          <li data-verification="disputed">{s.disputed} disputed</li>
          <li data-verification="unverified">{s.unverified} unverified</li>
          {s.pending > 0 ? <li data-verification="pending">{s.pending} pending</li> : null}
        </ul>
      </div>
    </aside>
  )
}
