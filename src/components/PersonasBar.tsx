import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import type { PersonaId } from '../types/persona'
import { PersonaTag } from './PersonaTag'

interface PersonasBarProps {
  /** Which personas to show, in order. Defaults to the full series cast. */
  personaIds?: PersonaId[]
  /** Optional eyebrow label, e.g. "The panel" on a document. */
  label?: string
}

/**
 * The persona legend. Shows the full cast by default, or a document's subset.
 *
 * On narrow viewports the chips collapse behind a disclosure. Expanded, they are
 * the largest block a reader has to scroll past before reaching the first
 * sentence: up to nine names on a part page and fifteen on the series index,
 * none of which mean anything yet to someone arriving cold. Summarised as a
 * count, the panel stays announced and one tap away without standing between
 * the reader and the piece. Wider viewports have the room and show them outright.
 */
export function PersonasBar({ personaIds = PERSONA_ORDER, label }: PersonasBarProps) {
  const [open, setOpen] = useState(false)
  const tagsId = useId()
  const count = personaIds.length

  return (
    <div className="personas-bar" data-open={open ? 'true' : undefined}>
      {label ? <p className="personas-bar__label">{label}</p> : null}

      <button
        type="button"
        className="personas-bar__toggle"
        aria-expanded={open}
        aria-controls={tagsId}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label ?? 'The panel'} · {count} voice{count === 1 ? '' : 's'}
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="personas-bar__tags" id={tagsId}>
        {personaIds.map((id) => (
          <PersonaTag key={id} persona={PERSONAS[id]} />
        ))}
      </div>
    </div>
  )
}
