import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import type { Persona } from '../types/persona'

interface PersonaProfileCardProps {
  persona: Persona
  /** Id the trigger's `aria-controls` points at. */
  cardId: string
  /** Dismisses the card. Surfaced as a button where there is no hover to leave. */
  onClose: () => void
}

/**
 * The floating profile card revealed by a persona trigger (chip or speaker
 * icon). Reveal state is owned by {@link PersonaDisclosure}; this renders the
 * panel only.
 *
 * `role="group"`, not `role="tooltip"`: the card contains a link, and a tooltip
 * is not allowed to hold interactive content (it isn't reachable, so the link
 * would be dead to assistive tech).
 */
export function PersonaProfileCard({ persona, cardId, onClose }: PersonaProfileCardProps) {
  const Icon = persona.icon
  return (
    <div
      className="persona-profile"
      role="group"
      id={cardId}
      aria-label={`${persona.name} profile`}
    >
      {/* On a hover-capable pointer the card closes by moving away, so CSS hides
          this. Where there is no hover, tapping elsewhere is the only other exit
          and that isn't discoverable on its own. */}
      <button
        type="button"
        className="persona-profile__close"
        onClick={onClose}
        aria-label={`Close ${persona.name} profile`}
      >
        <X size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      <div className="persona-profile__header">
        <span className="persona-profile__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span className="persona-profile__heading">
          <span className="persona-profile__name">{persona.name}</span>
          <span className="persona-profile__role">{persona.role}</span>
        </span>
      </div>
      <p className="persona-profile__focus">{persona.focus}</p>
      <p className="persona-profile__bio">{persona.bio}</p>
      <Link className="persona-profile__thread" to={`/voices/${persona.id}`}>
        Follow this voice →
      </Link>
    </div>
  )
}
