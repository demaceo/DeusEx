import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PersonaProfileCard } from './PersonaProfileCard'
import type { Persona } from '../types/persona'

interface PersonaDisclosureProps {
  persona: Persona
  /** Stable id for the card, so the trigger can point `aria-controls` at it. */
  cardId: string
  /** Class for the trigger button, e.g. `persona-tag` or `speaker-icon`. */
  triggerClassName: string
  /** Accessible name for the trigger, when its content alone isn't enough. */
  triggerLabel?: string
  /** Extra class on the wrapper, e.g. the debate stage's positioning hook. */
  wrapClassName?: string
  /** Trigger content: the chip's dot and name, or the speaker icon. */
  children: ReactNode
}

/**
 * A persona trigger and its profile card, as a disclosure.
 *
 * The reveal used to be pure CSS (`:hover` / `:focus-within`) with no click
 * handler at all, which meant the card was effectively unreachable on a
 * touchscreen: there is no hover, the button did nothing when tapped, and
 * nothing in the stylesheet branched on pointer type. Tapping now toggles an
 * explicit state, and hover is layered on top of it for pointer devices only.
 *
 * It is a disclosure rather than a tooltip because the card holds a link
 * ("Follow this voice"). A `role="tooltip"` must not contain interactive
 * content: it isn't reachable, so that link was unusable to assistive tech even
 * on a mouse.
 */
export function PersonaDisclosure({
  persona,
  cardId,
  triggerClassName,
  triggerLabel,
  wrapClassName,
  children,
}: PersonaDisclosureProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: Event) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // pointerdown rather than click: a tap that lands outside should dismiss on
    // contact, before the tapped element runs its own handler.
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={wrapRef}
      className={wrapClassName ? `persona-tag-wrap ${wrapClassName}` : 'persona-tag-wrap'}
      data-persona={persona.id}
      data-open={open ? 'true' : undefined}
    >
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-controls={cardId}
        aria-label={triggerLabel}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </button>
      <PersonaProfileCard persona={persona} cardId={cardId} onClose={() => setOpen(false)} />
    </div>
  )
}
