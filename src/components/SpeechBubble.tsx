import type { PersonaId } from '../types/persona'
import type { SpeechBubble as SpeechBubbleData } from '../types/document'
import { ParagraphView } from './ParagraphView'

interface SpeechBubbleProps {
  personaId: PersonaId
  bubble: SpeechBubbleData
}

export function SpeechBubble({ personaId, bubble }: SpeechBubbleProps) {
  return (
    <div className="speech-bubble" data-persona={personaId}>
      {bubble.paragraphs.map((paragraph, i) => (
        <ParagraphView key={i} paragraph={paragraph} />
      ))}
    </div>
  )
}
