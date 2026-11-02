import { describe, it, expect } from 'vitest'
import { DOCUMENTS } from './documents'
import type { RoundtableDocument } from '../types/document'

/**
 * Citation lock for dialogue revisions.
 *
 * Each persona's set of cited claims is snapshotted per part. A dialogue
 * rewrite may reorder turns, split them, add uncited reactions, or reword
 * anything, but it may not drop a citation, add one, or move a claim to a
 * different speaker without the snapshot diff showing it in review. That keeps
 * the evidence (and the verification dashboard built on it) attached to the
 * same voice that asserts it.
 *
 * Changing a part's claims on purpose? Run `pnpm vitest run -u` and review the
 * snapshot diff in the PR like any other content change.
 */
function citationsBySpeaker(doc: RoundtableDocument): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const section of doc.sections) {
    for (const block of section.blocks) {
      if (block.type !== 'debate') continue
      const ids = block.data.bubble.paragraphs
        .flat()
        .flatMap((node) => (node.type === 'cite' ? [node.claimId] : []))
      if (ids.length === 0) continue
      ;(out[block.data.personaId] ??= []).push(...ids)
    }
  }
  return Object.fromEntries(
    Object.entries(out)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([persona, ids]) => [persona, [...ids].sort()]),
  )
}

describe.each(DOCUMENTS.map((entry) => entry.doc))('$id debate citations', (doc) => {
  it('each persona keeps exactly its cited claims', () => {
    expect(citationsBySpeaker(doc)).toMatchSnapshot()
  })
})
