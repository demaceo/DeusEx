import type { ComicDocument } from '../../types/comic'
import { ComicParagraphs } from './ComicParagraphs'

/** The episode's closing plate: inked panel, yellow label, the takeaway. */
export function ComicVerdictPlate({ closing }: { closing: ComicDocument['closing'] }) {
  return (
    <aside className="comic-verdict">
      <p className="comic-verdict__label">{closing.label}</p>
      <ComicParagraphs paragraphs={closing.paragraphs} />
    </aside>
  )
}
