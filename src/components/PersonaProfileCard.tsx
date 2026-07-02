import { Link } from 'react-router-dom'
import type { Persona } from '../types/persona'

interface PersonaProfileCardProps {
  persona: Persona
  tooltipId: string
}

/**
 * The floating profile card revealed by a persona trigger (chip or speaker
 * icon). Purely presentational; reveal timing is CSS-driven by the caller via
 * `.persona-tag-wrap:hover`/`:focus-within`, so this only renders the panel.
 */
export function PersonaProfileCard({ persona, tooltipId }: PersonaProfileCardProps) {
  const Icon = persona.icon
  return (
    <div className="persona-profile" role="tooltip" id={tooltipId}>
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
