/**
 * Render-time grouping of a section's blocks. The content model stores each
 * debate turn as a standalone `debate` block (no neighbour context), but the
 * debate stage needs to see a whole exchange at once — to position turns by
 * camp, group consecutive turns by the same speaker, and animate them as a
 * unit. This helper collapses each maximal run of consecutive `debate` blocks
 * into one {@link DebateThreadGroup}; every other block passes through untouched.
 *
 * Pure (no React, no DOM) and called per-section, so a non-debate block between
 * two debate blocks correctly splits the thread, and threads never merge across
 * sections. Adds no new `Block` variant — `BlockRenderer` stays exhaustive.
 */

import type { Block, DebateEntry } from '../types/document'

/** A maximal run of consecutive `debate` blocks, collapsed into one unit. */
export interface DebateThreadGroup {
  kind: 'debateThread'
  turns: DebateEntry[]
}

/** Any non-debate block, passed straight through to `BlockRenderer`. */
export interface SingleBlockGroup {
  kind: 'block'
  block: Block
}

export type BlockGroup = DebateThreadGroup | SingleBlockGroup

export function groupBlocks(blocks: Block[]): BlockGroup[] {
  const groups: BlockGroup[] = []
  let open: DebateThreadGroup | null = null

  for (const block of blocks) {
    if (block.type === 'debate') {
      if (!open) {
        open = { kind: 'debateThread', turns: [] }
        groups.push(open)
      }
      open.turns.push(block.data)
    } else {
      open = null
      groups.push({ kind: 'block', block })
    }
  }

  return groups
}
