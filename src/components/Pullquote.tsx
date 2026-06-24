import type { Pullquote as PullquoteData } from '../types/document'

interface PullquoteProps {
  pullquote: PullquoteData
}

export function Pullquote({ pullquote }: PullquoteProps) {
  return (
    <blockquote className="pullquote">
      <p>{pullquote.text}</p>
      {pullquote.attribution ? <span className="attrib">{pullquote.attribution}</span> : null}
    </blockquote>
  )
}
