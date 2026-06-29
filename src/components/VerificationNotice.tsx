import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import type { Claim } from '../types/content'
import { summarizeClaimStatuses } from '../data/claimSummary'

interface VerificationNoticeProps {
  claims: Record<string, Claim>
}

export function VerificationNotice({ claims }: VerificationNoticeProps) {
  const s = summarizeClaimStatuses(claims)

  return (
    <div className="verification-notice" role="note" aria-label="Claim verification status">
      <ShieldCheck size={13} className="verification-notice__icon" aria-hidden />
      <span className="verification-notice__counts">
        <span data-verification="verified">{s.verified} verified</span>
        {s.disputed > 0 ? <span data-verification="disputed">{s.disputed} disputed</span> : null}
        {s.unverified > 0 ? (
          <span data-verification="unverified">{s.unverified} unverified</span>
        ) : null}
        {s.pending > 0 ? <span data-verification="pending">{s.pending} pending</span> : null}
      </span>
      <Link to="/verification" className="verification-notice__link">
        View all →
      </Link>
    </div>
  )
}
