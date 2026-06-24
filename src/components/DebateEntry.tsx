import { PERSONAS } from '../data/personas'
import type { DebateEntry as DebateEntryData } from '../types/document'
import { SpeechBubble } from './SpeechBubble'

interface DebateEntryProps {
  entry: DebateEntryData
}

export function DebateEntry({ entry }: DebateEntryProps) {
  const persona = PERSONAS[entry.personaId]
  return (
    <div className="debate-entry">
      <div className="speaker-card">
        <div className="speaker-icon" data-persona={persona.id} aria-hidden="true">
          {persona.icon}
        </div>
        <div className="speaker-name">{persona.name}</div>
      </div>
      <SpeechBubble personaId={persona.id} bubble={entry.bubble} />
    </div>
  )
}
