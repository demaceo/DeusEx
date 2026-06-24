import type { Block } from '../types/document'
import { ChapterDivider } from './ChapterDivider'
import { DebateEntry } from './DebateEntry'
import { ParagraphView } from './ParagraphView'
import { Pullquote } from './Pullquote'
import { StatGrid } from './StatGrid'
import { SummaryList } from './SummaryList'
import { VerdictBox } from './VerdictBox'

interface BlockRendererProps {
  block: Block
}

/** Dispatches a content block to its component. Exhaustive over Block['type']. */
export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'statGrid':
      return <StatGrid grid={block.data} />
    case 'debate':
      return <DebateEntry entry={block.data} />
    case 'pullquote':
      return <Pullquote pullquote={block.data} />
    case 'verdict':
      return <VerdictBox verdict={block.data} />
    case 'divider':
      return <ChapterDivider />
    case 'summaryList':
      return <SummaryList summary={block.data} />
    case 'prose':
      return (
        <div className="prose-block">
          {block.data.paragraphs.map((paragraph, i) => (
            <ParagraphView key={i} paragraph={paragraph} />
          ))}
        </div>
      )
    default: {
      // Exhaustiveness guard: if a new Block variant is added, this errors at compile time.
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}
