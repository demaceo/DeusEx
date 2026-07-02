import { useId, type CSSProperties } from 'react'
import { PERSONAS } from '../data/personas'
import { CONCESSION_LABEL, STANCE_LABEL } from '../data/stance'
import type { DebateEntry as DebateEntryData } from '../types/document'
import type { PersonaId, PersonaStance } from '../types/persona'
import { PersonaProfileCard } from './PersonaProfileCard'
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
  const tooltipId = useId()
  const resolvedStance = stance ?? persona.stance
  // This turn argues off the speaker's usual camp — flag it once, on entry.
  const isConcession = isFirstOfSpeaker && resolvedStance !== persona.stance
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
      <div className="debate-entry__rail" aria-hidden={isFirstOfSpeaker ? undefined : true}>
        {isFirstOfSpeaker ? (
          <div className="persona-tag-wrap debate-entry__persona-trigger" data-persona={persona.id}>
            <button
              type="button"
              className="speaker-icon"
              aria-describedby={tooltipId}
              aria-label={`${persona.name}: view profile`}
            >
              <Icon size={22} strokeWidth={1.75} />
            </button>
            <PersonaProfileCard persona={persona} tooltipId={tooltipId} />
          </div>
        ) : (
          <div className="debate-entry__dot" data-persona={persona.id} />
        )}
      </div>

      <div className="debate-entry__body">
        {isFirstOfSpeaker ? (
          <div className="speaker-card">
            <span className="speaker-name">{persona.name}</span>
            <span className="debate-stance-tag" data-stance={resolvedStance}>
              {STANCE_LABEL[resolvedStance]}
            </span>
          </div>
        ) : (
          <span className="sr-only">{persona.name} continues:</span>
        )}

        {isConcession ? (
          <p className="debate-concession">
            <span aria-hidden="true">↔ </span>
            {CONCESSION_LABEL[resolvedStance]}
          </p>
        ) : null}

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
