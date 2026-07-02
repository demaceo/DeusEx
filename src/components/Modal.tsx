import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { FOCUSABLE } from './EvidenceDrawer'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  /** Accessible name for the dialog. Provide this or `ariaLabelledBy`. */
  ariaLabel?: string
  ariaLabelledBy?: string
  className?: string
}

/**
 * A centered lightbox dialog: scrim, focus trap, Escape/click-outside to
 * close, body-scroll lock. Unlike the always-mounted `EvidenceDrawer`, this is
 * conditionally mounted (rendered only while open), so it captures the
 * triggering element itself on mount rather than requiring the caller to
 * track a ref.
 */
export function Modal({ onClose, children, ariaLabel, ariaLabelledBy, className }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Runs once per mount: capture the trigger for focus restoration, lock
  // background scroll, and move focus into the dialog. Deliberately excludes
  // `onClose` from its deps so an unstable caller-side callback identity can
  // never re-run this (which would reset the captured trigger mid-lifecycle).
  useEffect(() => {
    const trigger = (document.activeElement as HTMLElement) ?? null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = prevOverflow
      trigger?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Trap focus within the dialog.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
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
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={className ? `modal ${className}` : 'modal'}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  )
}
