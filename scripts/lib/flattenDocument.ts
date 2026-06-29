/**
 * Flatten a RoundtableDocument into an ordered list of spoken `Turn`s.
 *
 * Walks the document in exact source order (intro -> each section's blocks ->
 * closing) and emits one turn per debate bubble (spoken by its persona) and one
 * host turn per narrative/figure beat. Charts and stat grids are voiced by the
 * host using their already-plain-text values/titles so every NUMBER stays exact
 * — the adapter downstream is told never to alter figures.
 *
 * This is intentionally faithful and lossless on substance; the conversational
 * polish happens later in `adaptScript`.
 */

import type { Paragraph } from '../../src/types/content'
import type { Block, RoundtableDocument, Section } from '../../src/types/document'
import type { Turn } from './types'

/** Join a paragraph's text runs, dropping cite markers (kept as plain prose). */
function paragraphText(paragraph: Paragraph): string {
  return paragraph
    .map((node) => (node.type === 'text' ? node.value : (node.label ?? '')))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Join multiple paragraphs into one spoken passage. */
function paragraphsText(paragraphs: Paragraph[]): string {
  return paragraphs.map(paragraphText).filter(Boolean).join('\n\n')
}

/** Emit zero or more turns for a single block. */
function turnsForBlock(block: Block, context: string): Turn[] {
  switch (block.type) {
    case 'debate': {
      const text = paragraphsText(block.data.bubble.paragraphs)
      return text ? [{ speaker: block.data.personaId, text, context }] : []
    }
    case 'prose':
    case 'verdict': {
      const text = paragraphsText(block.data.paragraphs)
      return text ? [{ speaker: 'host', text, context }] : []
    }
    case 'pullquote': {
      const text = block.data.attribution
        ? `${block.data.text} — ${block.data.attribution}`
        : block.data.text
      return [{ speaker: 'host', text, context }]
    }
    case 'statGrid': {
      // Narrate the headline figures exactly; the adapter must keep them verbatim.
      const lines = block.data.stats.map((s) =>
        [s.labelTop, s.value, s.description].filter(Boolean).join(' — '),
      )
      const text = `By the numbers: ${lines.join('; ')}.`
      return [{ speaker: 'host', text, context }]
    }
    case 'chart': {
      const parts = [block.data.title, block.data.subtitle].filter(Boolean)
      const text = parts.length ? parts.join(' — ') : block.data.ariaLabel
      return [{ speaker: 'host', text, context }]
    }
    case 'incentiveAudit': {
      const text = `The race: ${block.data.race} The trap: ${block.data.trap} The way out: ${block.data.intervention}`
      return [{ speaker: 'host', text, context }]
    }
    case 'summaryList': {
      const items = block.data.items.map((i) => `${i.lead}: ${i.text}`).join(' ')
      return [{ speaker: 'host', text: `${block.data.heading}. ${items}`, context }]
    }
    case 'divider':
    default:
      return []
  }
}

function sectionContext(section: Section): string {
  const { roundLabel, title } = section.header
  return title ? `${roundLabel} · ${title}` : roundLabel
}

/** Produce the full ordered turn list for one document. */
export function flattenDocument(doc: RoundtableDocument): Turn[] {
  const turns: Turn[] = []

  const intro = paragraphsText(doc.intro)
  if (intro) turns.push({ speaker: 'host', text: intro, context: 'intro' })

  for (const section of doc.sections) {
    const context = sectionContext(section)
    for (const block of section.blocks) {
      turns.push(...turnsForBlock(block, context))
    }
  }

  if (doc.closing) {
    const closing = paragraphsText(doc.closing.paragraphs)
    if (closing) turns.push({ speaker: 'host', text: closing, context: 'closing' })
  }

  return turns
}
