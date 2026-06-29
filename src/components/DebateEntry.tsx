import type { CSSProperties } from 'react'
import { PERSONAS } from '../data/personas'
import type { DebateEntry as DebateEntryData } from '../types/document'
import type { PersonaId, PersonaStance } from '../types/persona'
import { SpeechBubble } from './SpeechBubble'

interface DebateEntryProps {
  entry: DebateEntryData
  /** Camp that places this turn on the stage. Defaults to the persona's stance. */
  stance?: PersonaStance
  /** False when the previous turn was the same speaker — hides the avatar/name. */
  isFirstOfSpeaker?: boolean
  /** The speaker of the previous turn, to render a "responding to…" cue. */
  previousPersonaId?: PersonaId
  /** Position within the thread; drives the staggered reveal delay. */
  turnIndex?: number
}

const STANCE_LABEL: Record<PersonaStance, string> = {
  optimist: 'Optimistic',
  critic: 'Critical',
  neutral: 'Neutral',
}

/**
 * One debate turn, positioned on the stage by its {@link PersonaStance}. Renders
 * the speaker's avatar, name and role only on the first turn of a run; later
 * turns by the same speaker tuck under a small connector dot. When the speaker
 * changes it shows who they're responding to. Defaults make a lone turn (rendered
 * straight through `BlockRenderer`) self-contained.
 */
export function DebateEntry({
  entry,
  stance,
  isFirstOfSpeaker = true,
  previousPersonaId,
  turnIndex = 0,
}: DebateEntryProps) {
  const persona = PERSONAS[entry.personaId]
  const Icon = persona.icon
  const resolvedStance = stance ?? persona.stance
  const repliedTo =
    previousPersonaId && previousPersonaId !== entry.personaId
      ? PERSONAS[previousPersonaId]
      : undefined

  return (
    <div
      className="debate-entry"
      role="listitem"
      data-persona={persona.id}
      data-stance={resolvedStance}
      data-first={isFirstOfSpeaker}
      style={{ '--turn-index': turnIndex } as CSSProperties}
    >
      <div className="debate-entry__rail" aria-hidden="true">
        {isFirstOfSpeaker ? (
          <div className="speaker-icon" data-persona={persona.id}>
            <Icon size={22} strokeWidth={1.75} />
          </div>
        ) : (
          <div className="debate-entry__dot" data-persona={persona.id} />
        )}
      </div>

      <div className="debate-entry__body">
        {isFirstOfSpeaker ? (
          <div className="speaker-card">
            <span className="speaker-name">{persona.name}</span>
            <span className="speaker-role">{persona.role}</span>
            <span className="debate-stance-tag" data-stance={resolvedStance}>
              {STANCE_LABEL[resolvedStance]}
            </span>
          </div>
        ) : (
          <span className="sr-only">{persona.name} continues:</span>
        )}

        {repliedTo ? (
          <p className="debate-reply">
            <span aria-hidden="true">↳ </span>responding to <b>{repliedTo.name}</b>
          </p>
        ) : null}

        <SpeechBubble personaId={persona.id} bubble={entry.bubble} />
      </div>
    </div>
  )
}
