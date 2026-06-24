import type { VerdictBox as VerdictBoxData } from '../types/document'
import { ParagraphView } from './ParagraphView'

interface VerdictBoxProps {
  verdict: VerdictBoxData
}

/**
 * "The Bottom Line" / "Assessment" callout. The label is data-driven (rendered as
 * a real element rather than a CSS pseudo-element) so one component serves both.
 */
export function VerdictBox({ verdict }: VerdictBoxProps) {
  return (
    <div className="verdict-box">
      <span className="verdict-label">{verdict.label}</span>
      {verdict.paragraphs.map((paragraph, i) => (
        <ParagraphView key={i} paragraph={paragraph} />
      ))}
    </div>
  )
}
