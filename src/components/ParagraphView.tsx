import { Fragment } from 'react'
import type { Paragraph } from '../types/content'
import { Citation } from './Citation'

interface ParagraphViewProps {
  paragraph: Paragraph
}

/** Renders one paragraph: a sequence of text runs and inline citations. */
export function ParagraphView({ paragraph }: ParagraphViewProps) {
  return (
    <p>
      {paragraph.map((node, i) =>
        node.type === 'text' ? (
          <Fragment key={i}>{node.value}</Fragment>
        ) : (
          <Citation key={i} claimId={node.claimId} label={node.label} />
        ),
      )}
    </p>
  )
}
