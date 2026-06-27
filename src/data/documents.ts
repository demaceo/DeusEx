/**
 * Document registry. Maps slugs to the three roundtable documents and carries the
 * landing-page card metadata. Also runs a dev-time referential-integrity check so
 * dropped/dangling claims or sources surface loudly during development — a guard
 * against silent content loss during transcription, and a foundation for the
 * future verification pass.
 */

import type { Block, DocumentId, RoundtableDocument, SpeechBubble } from '../types/document'
import type { PersonaId } from '../types/persona'
import { PERSONA_ORDER } from './personas'
import { partI } from './parts/part-i'
import { partII } from './parts/part-ii'
import { partIII } from './parts/part-iii'
import { partIV } from './parts/part-iv'
import { partV } from './parts/part-v'
import { partVI } from './parts/part-vi'
import { partVII } from './parts/part-vii'
import { partVIII } from './parts/part-viii'
import { partIX } from './parts/part-ix'

export interface DocumentEntry {
  doc: RoundtableDocument
  /** "Part I" / "Part II" / "Part III". */
  partLabel: string
  /** Short distinctive title for the landing card. */
  navTitle: string
  /** One-line description for the landing card. */
  blurb: string
}

// Array order defines the series and navigation sequence — reordering changes prev/next navigation.
export const DOCUMENTS: DocumentEntry[] = [
  {
    doc: partI,
    partLabel: 'Part I',
    navTitle: 'A Roundtable on Real Costs',
    blurb: partI.masthead.subtitle,
  },
  {
    doc: partII,
    partLabel: 'Part II',
    navTitle: "What's Actually Being Done",
    blurb: partII.masthead.subtitle,
  },
  {
    doc: partIII,
    partLabel: 'Part III',
    navTitle: "What It's Actually Getting Right",
    blurb: partIII.masthead.subtitle,
  },
  {
    doc: partIV,
    partLabel: 'Part IV',
    navTitle: "The Race We're In",
    blurb: partIV.masthead.subtitle,
  },
  {
    doc: partV,
    partLabel: 'Part V',
    navTitle: 'The Reality Problem',
    blurb: partV.masthead.subtitle,
  },
  {
    doc: partVI,
    partLabel: 'Part VI',
    navTitle: 'The Tail Risk',
    blurb: partVI.masthead.subtitle,
  },
  {
    doc: partVII,
    partLabel: 'Part VII',
    navTitle: 'Machines We Talk To',
    blurb: partVII.masthead.subtitle,
  },
  {
    doc: partVIII,
    partLabel: 'Part VIII',
    navTitle: 'Whose Intelligence?',
    blurb: partVIII.masthead.subtitle,
  },
  {
    doc: partIX,
    partLabel: 'Part IX',
    navTitle: 'The Creativity Question',
    blurb: partIX.masthead.subtitle,
  },
]

export const DOCUMENTS_BY_SLUG: Record<string, RoundtableDocument> = Object.fromEntries(
  DOCUMENTS.map((entry) => [entry.doc.slug, entry.doc]),
)

export function getDocumentBySlug(slug: string | undefined): RoundtableDocument | undefined {
  if (!slug) return undefined
  return DOCUMENTS_BY_SLUG[slug]
}

/** A neighboring document, projected for masthead navigation. */
export interface PartNavTarget {
  slug: string
  partLabel: string
  navTitle: string
}

/**
 * The previous and next documents in series order, wrapping around at the ends
 * (Part I's prev is Part III; Part III's next is Part I). Throws if `id` is unknown.
 */
export function getAdjacentParts(id: DocumentId): {
  prev: PartNavTarget
  next: PartNavTarget
} {
  const n = DOCUMENTS.length
  const i = DOCUMENTS.findIndex((entry) => entry.doc.id === id)
  if (i === -1) {
    throw new Error(`getAdjacentParts: unknown document id "${id}"`)
  }
  const toTarget = (entry: DocumentEntry): PartNavTarget => ({
    slug: entry.doc.slug,
    partLabel: entry.partLabel,
    navTitle: entry.navTitle,
  })
  return {
    prev: toTarget(DOCUMENTS[(i - 1 + n) % n]),
    next: toTarget(DOCUMENTS[(i + 1) % n]),
  }
}

/** Collect every claimId referenced anywhere in a block (cites + stat boxes). */
function claimIdsInBlock(block: Block): string[] {
  const ids: string[] = []
  const collectParagraphs = (paragraphs: { type: string; claimId?: string }[][]) => {
    for (const paragraph of paragraphs) {
      for (const node of paragraph) {
        if (node.type === 'cite' && node.claimId) ids.push(node.claimId)
      }
    }
  }
  switch (block.type) {
    case 'statGrid':
      for (const stat of block.data.stats) if (stat.claimId) ids.push(stat.claimId)
      break
    case 'debate':
      collectParagraphs(block.data.bubble.paragraphs)
      break
    case 'verdict':
    case 'prose':
      collectParagraphs(block.data.paragraphs)
      break
    case 'chart':
      if (block.data.claimIds) ids.push(...block.data.claimIds)
      break
    default:
      break
  }
  return ids
}

/**
 * Every referenced claimId resolves in `claims`, and every claim's sourceId resolves
 * in `sources`. Throws on the first dangling reference. Runs in dev (below) and is
 * exercised by the test suite.
 */
export function assertReferentialIntegrity(doc: RoundtableDocument): void {
  const referenced = new Set<string>()
  for (const paragraph of doc.intro) {
    for (const node of paragraph) if (node.type === 'cite') referenced.add(node.claimId)
  }
  for (const section of doc.sections) {
    for (const block of section.blocks) for (const id of claimIdsInBlock(block)) referenced.add(id)
  }
  if (doc.closing) {
    for (const paragraph of doc.closing.paragraphs)
      for (const node of paragraph) if (node.type === 'cite') referenced.add(node.claimId)
  }

  for (const id of referenced) {
    if (!doc.claims[id]) {
      throw new Error(`[${doc.id}] references unknown claim id "${id}"`)
    }
  }
  for (const claim of Object.values(doc.claims)) {
    if (claim.sourceId && !doc.sources.some((s) => s.id === claim.sourceId)) {
      throw new Error(
        `[${doc.id}] claim "${claim.id}" references unknown source "${claim.sourceId}"`,
      )
    }
  }
}

/**
 * The personas that actually speak in a document, in `PERSONA_ORDER`. Lets the
 * personas bar show only the voices present in the piece the reader is on, rather
 * than the full series cast.
 */
export function personasInDocument(doc: RoundtableDocument): PersonaId[] {
  const present = new Set<PersonaId>()
  for (const section of doc.sections) {
    for (const block of section.blocks) {
      if (block.type === 'debate') present.add(block.data.personaId)
    }
  }
  return PERSONA_ORDER.filter((id) => present.has(id))
}

/** One persona's contributions within a single document, in render order. */
export interface PersonaThreadEntry {
  /** e.g. "Round II" or "Round II · Water Usage". */
  roundLabel: string
  bubble: SpeechBubble
}

/** All of a persona's debate bubbles in one document, with the document's context. */
export interface PersonaThreadGroup {
  doc: RoundtableDocument
  partLabel: string
  navTitle: string
  entries: PersonaThreadEntry[]
}

/**
 * Collect every `debate` bubble a persona speaks across the whole series, grouped
 * by document in series order. Powers the `/voices/:personaId` thread view — a
 * pure projection over {@link DOCUMENTS}, so it stays in sync as parts are added.
 * Each group carries its source document so claims resolve against the right registry.
 */
export function getPersonaThread(personaId: PersonaId): PersonaThreadGroup[] {
  const groups: PersonaThreadGroup[] = []
  for (const entry of DOCUMENTS) {
    const entries: PersonaThreadEntry[] = []
    for (const section of entry.doc.sections) {
      for (const block of section.blocks) {
        if (block.type === 'debate' && block.data.personaId === personaId) {
          const { roundLabel, title } = section.header
          entries.push({
            roundLabel: title ? `${roundLabel} · ${title}` : roundLabel,
            bubble: block.data.bubble,
          })
        }
      }
    }
    if (entries.length > 0) {
      groups.push({
        doc: entry.doc,
        partLabel: entry.partLabel,
        navTitle: entry.navTitle,
        entries,
      })
    }
  }
  return groups
}

if (import.meta.env.DEV) {
  for (const entry of DOCUMENTS) assertReferentialIntegrity(entry.doc)
}
