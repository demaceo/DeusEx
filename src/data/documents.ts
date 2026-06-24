/**
 * Document registry. Maps slugs to the three roundtable documents and carries the
 * landing-page card metadata. Also runs a dev-time referential-integrity check so
 * dropped/dangling claims or sources surface loudly during development — a guard
 * against silent content loss during transcription, and a foundation for the
 * future verification pass.
 */

import type { Block, DocumentId, RoundtableDocument } from '../types/document'
import { partI } from './parts/part-i'
import { partII } from './parts/part-ii'
import { partIII } from './parts/part-iii'

export interface DocumentEntry {
  doc: RoundtableDocument
  /** "Part I" / "Part II" / "Part III". */
  partLabel: string
  /** Short distinctive title for the landing card. */
  navTitle: string
  /** One-line description for the landing card. */
  blurb: string
}

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

if (import.meta.env.DEV) {
  for (const entry of DOCUMENTS) assertReferentialIntegrity(entry.doc)
}
