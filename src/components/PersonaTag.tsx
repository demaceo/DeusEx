import { PersonaDisclosure } from './PersonaDisclosure'
import type { Persona } from '../types/persona'

interface PersonaTagProps {
  persona: Persona
}

/**
 * A persona chip in the legend bar. Tapping or clicking it reveals that
 * persona's profile card; on a pointer device hovering does the same.
 */
export function PersonaTag({ persona }: PersonaTagProps) {
  return (
    <PersonaDisclosure
      persona={persona}
      cardId={`persona-profile-${persona.id}`}
      triggerClassName="persona-tag"
    >
      <span className="persona-dot" />
      <span className="persona-tag__name">{persona.name}</span>
    </PersonaDisclosure>
  )
}
