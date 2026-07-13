import { PERSONAS } from '../../data/personas'
import { COMIC_CAST } from '../../data/comics/cast'
import type { ComicSpeech as ComicSpeechData } from '../../types/comic'
import { ComicParagraphs } from './ComicParagraphs'

/**
 * A glossy panelist speech bubble with a speaker chip. Guest personas set
 * `data-persona` so the global persona color tokens resolve; comic-only cast
 * members get their series-local colors from comic.css via `data-cast`.
 */
export function ComicSpeech({ data }: { data: ComicSpeechData }) {
  const { speaker } = data
  const resolved =
    speaker.kind === 'persona'
      ? { name: PERSONAS[speaker.personaId].name, Icon: PERSONAS[speaker.personaId].icon }
      : { name: COMIC_CAST[speaker.castId].name, Icon: COMIC_CAST[speaker.castId].icon }

  return (
    <div
      className="comic-speech"
      data-style={data.style ?? 'glossy'}
      data-tail={data.tailDirection ?? 'left'}
      data-persona={speaker.kind === 'persona' ? speaker.personaId : undefined}
      data-cast={speaker.kind === 'cast' ? speaker.castId : undefined}
    >
      <span className="comic-speech__speaker">
        <resolved.Icon size={14} strokeWidth={2.25} aria-hidden="true" />
        {resolved.name}
      </span>
      <div className="comic-speech__bubble">
        <ComicParagraphs paragraphs={data.paragraphs} />
      </div>
    </div>
  )
}
