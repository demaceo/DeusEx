import type { Persona } from '../types/persona'
import { PersonaProfileCard } from './PersonaProfileCard'

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
      <PersonaProfileCard persona={persona} tooltipId={tooltipId} />
    </div>
  )
}
