import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import type { PersonaId } from '../types/persona'
import { PersonaTag } from './PersonaTag'

interface PersonasBarProps {
  /** Which personas to show, in order. Defaults to the full series cast. */
  personaIds?: PersonaId[]
  /** Optional eyebrow label, e.g. "The panel" on a document. */
  label?: string
}

/** The persona legend. Shows the full cast by default, or a document's subset. */
export function PersonasBar({ personaIds = PERSONA_ORDER, label }: PersonasBarProps) {
  return (
    <div className="personas-bar">
      {label ? <p className="personas-bar__label">{label}</p> : null}
      <div className="personas-bar__tags">
        {personaIds.map((id) => (
          <PersonaTag key={id} persona={PERSONAS[id]} />
        ))}
      </div>
    </div>
  )
}
