import type { Persona } from '../types/persona'

interface PersonaTagProps {
  persona: Persona
}

/**
 * A persona chip in the legend bar. On hover or keyboard focus it reveals a
 * floating profile card describing that persona. Reveal is CSS-driven
 * (`:hover` / `:focus-within` on the wrapper) so it works without JS state.
 */
export function PersonaTag({ persona }: PersonaTagProps) {
  const tooltipId = `persona-profile-${persona.id}`
  return (
    <div className="persona-tag-wrap" data-persona={persona.id}>
      <button type="button" className="persona-tag" aria-describedby={tooltipId}>
        <span className="persona-dot" />
        <span className="persona-tag__name">{persona.name}</span>
      </button>
      <div className="persona-profile" role="tooltip" id={tooltipId}>
        <div className="persona-profile__header">
          <span className="persona-profile__icon" aria-hidden="true">
            {persona.icon}
          </span>
          <span className="persona-profile__heading">
            <span className="persona-profile__name">{persona.name}</span>
            <span className="persona-profile__role">{persona.role}</span>
          </span>
        </div>
        <p className="persona-profile__focus">{persona.focus}</p>
        <p className="persona-profile__bio">{persona.bio}</p>
      </div>
    </div>
  )
}
