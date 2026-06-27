import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { ClaimDrawerContext } from '../context/ClaimDrawerContext'
import type { Claim, Source } from '../types/content'

interface ActiveEvidence {
  claim: Claim
  source?: Source
}

const STATUS_LABEL: Record<Claim['verificationStatus'], string> = {
  pending: 'Pending',
  verified: 'Verified',
  disputed: 'Disputed',
  unverified: 'Unverified',
}

const KIND_LABEL: Record<Claim['kind'], string> = {
  statistic: 'Statistic',
  citation: 'Citation',
}

/**
 * Holds the active-claim state and renders the evidence drawer. Wrap any view
 * whose citations/stats should be inspectable (RoundtablePage, PersonaThreadPage).
 * The drawer surfaces the full Claim — claimText, source, verified URL, reviewer
 * note, last-checked date — that the data model has always carried but never showed.
 */
export function ClaimDrawerProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveEvidence | null>(null)
  const open = useCallback((claim: Claim, source?: Source) => setActive({ claim, source }), [])
  const close = useCallback(() => setActive(null), [])

  return (
    <ClaimDrawerContext value={{ open }}>
      {children}
      <EvidenceDrawer active={active} onClose={close} />
    </ClaimDrawerContext>
  )
}

interface EvidenceDrawerProps {
  active: ActiveEvidence | null
  onClose: () => void
}

function EvidenceDrawer({ active, onClose }: EvidenceDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [active, onClose])

  if (!active) return null

  const { claim, source } = active
  const url = claim.verifiedUrl ?? source?.url
  const titleId = `evidence-title-${claim.id}`

  return (
    <div className="evidence-overlay" onClick={onClose}>
      <aside
        className="evidence-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="evidence-drawer__head">
          <span className="evidence-drawer__kicker">{KIND_LABEL[claim.kind]} · Evidence</span>
          <button
            type="button"
            className="evidence-drawer__close"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close evidence panel"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <p className="evidence-drawer__claim" id={titleId}>
          “{claim.claimText}”
        </p>

        <dl className="evidence-drawer__meta">
          <div>
            <dt>Status</dt>
            <dd>
              <span className="evidence-status" data-verification={claim.verificationStatus}>
                {STATUS_LABEL[claim.verificationStatus]}
              </span>
            </dd>
          </div>
          {source ? (
            <div>
              <dt>Source</dt>
              <dd>
                <strong>{source.title}</strong>
                <span className="evidence-drawer__source-desc">{source.description}</span>
              </dd>
            </div>
          ) : null}
          {claim.note ? (
            <div>
              <dt>Reviewer note</dt>
              <dd>{claim.note}</dd>
            </div>
          ) : null}
          {claim.lastCheckedISO ? (
            <div>
              <dt>Last checked</dt>
              <dd>{claim.lastCheckedISO}</dd>
            </div>
          ) : null}
        </dl>

        {url ? (
          <a className="evidence-drawer__link" href={url} target="_blank" rel="noreferrer">
            <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
            View primary source
          </a>
        ) : (
          <p className="evidence-drawer__pending">
            No primary source linked yet — this claim is still being checked.
          </p>
        )}
      </aside>
    </div>
  )
}
