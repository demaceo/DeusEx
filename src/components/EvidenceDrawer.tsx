import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { ClaimDrawerContext } from '../context/ClaimDrawerContext'
import { useDismissOnBack } from '../hooks/useDismissOnBack'
import { useDragToDismiss } from '../hooks/useDragToDismiss'
import type { Claim, Source } from '../types/content'

interface ActiveEvidence {
  claim: Claim
  source?: Source
}

/** Shared with {@link Modal}'s focus trap. */
export const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'

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
  // The element that opened the drawer, so focus returns there on close.
  const triggerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((claim: Claim, source?: Source) => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null
    setActive({ claim, source })
  }, [])

  const close = useCallback(() => {
    setActive(null)
    triggerRef.current?.focus()
    triggerRef.current = null
  }, [])

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
  const drawerRef = useRef<HTMLElement>(null)

  // Back closes the drawer instead of leaving the article; the handle lets a
  // thumb throw it away without reaching the far corner. At mobile widths the
  // drawer covers the scrim entirely, so neither the outside tap nor Escape is
  // available and these are the reader's real exits.
  useDismissOnBack(active !== null, onClose)
  const drag = useDragToDismiss(onClose)

  useEffect(() => {
    if (!active) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Trap focus within the drawer.
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // Lock body scroll while the drawer is open; restore on close.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
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
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        data-dragging={drag.dragging ? 'true' : undefined}
        style={drag.offset ? { transform: `translateY(${drag.offset}px)` } : undefined}
      >
        {/* Grab handle. Presentational on desktop (CSS hides it there, where the
            scrim is exposed and takes an outside click); the real gesture target
            on mobile, where it is the nearest exit to the reader's thumb. */}
        <div className="sheet-handle" aria-hidden="true" {...drag.handleProps}>
          <span className="sheet-handle__grip" />
        </div>

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
            No primary source linked yet. This claim is still being checked.
          </p>
        )}

        {/* Full-width exit pinned to the bottom of the sheet, inside the thumb
            zone. Shown only where the drawer covers the scrim (mobile); the
            corner button and an outside click cover the wider layouts. */}
        <button type="button" className="sheet-dismiss" onClick={onClose}>
          Close and keep reading
        </button>
      </aside>
    </div>
  )
}
