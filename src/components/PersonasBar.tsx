import { PERSONAS, PERSONA_ORDER } from '../data/personas'

/** The shared five-persona legend. Identical across all documents. */
export function PersonasBar() {
  return (
    <div className="personas-bar">
      {PERSONA_ORDER.map((id) => {
        const persona = PERSONAS[id]
        return (
          <div className="persona-tag" key={id}>
            <div className="persona-dot" data-persona={id} />
            <span>{persona.name}</span>
          </div>
        )
      })}
    </div>
  )
}
