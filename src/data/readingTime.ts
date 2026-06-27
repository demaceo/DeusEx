/**
 * Estimate reading time for a roundtable document. A pure projection over the
 * content model (intro + every block's prose), counting words at ~200 wpm. Used to
 * set readers' expectations before they dive into a long debate.
 */

import type { Paragraph } from '../types/content'
import type { Block, RoundtableDocument } from '../types/document'

const WORDS_PER_MINUTE = 200

function countParagraphs(paragraphs: Paragraph[]): number {
  let words = 0
  for (const paragraph of paragraphs) {
    for (const node of paragraph) {
      if (node.type === 'text') words += node.value.trim().split(/\s+/).filter(Boolean).length
    }
  }
  return words
}

function countBlock(block: Block): number {
  switch (block.type) {
    case 'debate':
      return countParagraphs(block.data.bubble.paragraphs)
    case 'prose':
    case 'verdict':
      return countParagraphs(block.data.paragraphs)
    case 'pullquote':
      return block.data.text.split(/\s+/).filter(Boolean).length
    case 'incentiveAudit':
      return [block.data.race, block.data.trap, block.data.intervention]
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length
    case 'summaryList':
      return block.data.items.reduce(
        (n, item) => n + `${item.lead} ${item.text}`.split(/\s+/).filter(Boolean).length,
        0,
      )
    default:
      // statGrid / chart / divider — negligible prose; skip.
      return 0
  }
}

/** Whole-minute reading-time estimate, never below 1. */
export function estimateReadingTime(doc: RoundtableDocument): number {
  let words = countParagraphs(doc.intro)
  for (const section of doc.sections) {
    for (const block of section.blocks) words += countBlock(block)
  }
  if (doc.closing) words += countParagraphs(doc.closing.paragraphs)
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}
