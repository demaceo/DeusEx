import type { ComicBlock } from '../../types/comic'
import { ChorusSwarm } from './ChorusSwarm'
import { ComicCaption } from './ComicCaption'
import { ComicSpeech } from './ComicSpeech'
import { EmbeddedPost } from './EmbeddedPost'
import { SfxBurst } from './SfxBurst'

/**
 * Central dispatch for comic blocks, mirroring BlockRenderer's exhaustive
 * switch: adding a ComicBlock variant without a case here is a compile error.
 */
export function ComicBlockRenderer({ block }: { block: ComicBlock }) {
  switch (block.type) {
    case 'caption':
      return <ComicCaption data={block.data} />
    case 'speech':
      return <ComicSpeech data={block.data} />
    case 'chorusSwarm':
      return <ChorusSwarm data={block.data} />
    case 'sfx':
      return <SfxBurst data={block.data} />
    case 'embeddedPost':
      return <EmbeddedPost data={block.data} />
    default: {
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}
