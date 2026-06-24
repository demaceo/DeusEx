import type { Paragraph } from '../types/content'
import { ParagraphView } from './ParagraphView'

interface IntroBlockProps {
  paragraphs: Paragraph[]
}

export function IntroBlock({ paragraphs }: IntroBlockProps) {
  return (
    <div className="intro-block">
      {paragraphs.map((paragraph, i) => (
        <ParagraphView key={i} paragraph={paragraph} />
      ))}
    </div>
  )
}
