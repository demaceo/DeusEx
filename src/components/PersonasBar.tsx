import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import { PersonaTag } from './PersonaTag'

/** The shared five-persona legend. Identical across all documents. */
export function PersonasBar() {
  return (
    <div className="personas-bar">
      {PERSONA_ORDER.map((id) => (
        <PersonaTag key={id} persona={PERSONAS[id]} />
      ))}
    </div>
  )
}
