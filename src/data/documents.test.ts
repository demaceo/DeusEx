import { describe, it, expect } from 'vitest'
import {
  DOCUMENTS,
  DOCUMENTS_BY_SLUG,
  assertReferentialIntegrity,
  getAdjacentParts,
  getDocumentBySlug,
  personasInDocument,
} from './documents'
import { PERSONA_ORDER } from './personas'
import type { ChartSpec, RoundtableDocument } from '../types/document'

/** Every chart block in a document, in render order. */
function chartsIn(doc: RoundtableDocument): ChartSpec[] {
  const charts: ChartSpec[] = []
  for (const section of doc.sections) {
    for (const block of section.blocks) {
      if (block.type === 'chart') charts.push(block.data)
    }
  }
  return charts
}

describe('document registry', () => {
  it('exposes eleven documents with unique slugs', () => {
    expect(DOCUMENTS).toHaveLength(11)
    const slugs = DOCUMENTS.map((entry) => entry.doc.slug)
    expect(new Set(slugs).size).toBe(11)
    expect(slugs).toEqual(
      expect.arrayContaining([
        'real-costs',
        'whats-being-done',
        'getting-right',
        'the-race',
        'the-reality-problem',
        'the-tail-risk',
        'machines-we-talk-to',
        'whose-intelligence',
        'the-creativity-question',
        'pattern-and-prejudice',
        'the-ground-it-comes-from',
      ]),
    )
  })

  it('resolves known slugs and rejects unknown ones', () => {
    expect(getDocumentBySlug('real-costs')?.id).toBe('part-i')
    expect(DOCUMENTS_BY_SLUG['getting-right'].id).toBe('part-iii')
    expect(getDocumentBySlug('does-not-exist')).toBeUndefined()
    expect(getDocumentBySlug(undefined)).toBeUndefined()
  })
})

describe.each(DOCUMENTS.map((entry) => entry.doc))('$id personasInDocument', (doc) => {
  it('returns the speaking personas, in canonical order, as a subset of the cast', () => {
    const used = personasInDocument(doc)
    expect(used.length).toBeGreaterThan(0)
    expect(used.length).toBeLessThanOrEqual(PERSONA_ORDER.length)
    // Ordered by PERSONA_ORDER.
    const expectedOrder = PERSONA_ORDER.filter((id) => used.includes(id))
    expect(used).toEqual(expectedOrder)
    // Every returned persona actually speaks in the document.
    const speaking = new Set<string>()
    for (const section of doc.sections) {
      for (const block of section.blocks) {
        if (block.type === 'debate') speaking.add(block.data.personaId)
      }
    }
    for (const id of used) expect(speaking.has(id)).toBe(true)
  })
})

describe.each(DOCUMENTS.map((entry) => entry.doc))('$id content integrity', (doc) => {
  it('has a non-empty claims registry and sources', () => {
    expect(Object.keys(doc.claims).length).toBeGreaterThan(0)
    expect(doc.sources.length).toBeGreaterThan(0)
  })

  it('every referenced claim and source resolves', () => {
    expect(() => assertReferentialIntegrity(doc)).not.toThrow()
  })

  it('charts rest only on verified claims', () => {
    const charts = chartsIn(doc)
    // Part I carries an extra chart — the data-center world map.
    expect(charts.length).toBe(doc.id === 'part-i' ? 5 : 4)
    for (const chart of charts) {
      expect(chart.claimIds?.length ?? 0).toBeGreaterThan(0)
      for (const id of chart.claimIds ?? []) {
        expect(doc.claims[id]?.verificationStatus, `${chart.title} → ${id}`).toBe('verified')
      }
    }
  })
})

describe('getAdjacentParts (wrap-around series navigation)', () => {
  it('wraps backward from Part I to Part XI and forward to Part II', () => {
    const { prev, next } = getAdjacentParts('part-i')
    expect(prev).toEqual({
      slug: 'the-ground-it-comes-from',
      partLabel: 'Part XI',
      navTitle: 'The Ground It Comes From',
    })
    expect(next).toEqual({
      slug: 'whats-being-done',
      partLabel: 'Part II',
      navTitle: "What's Actually Being Done",
    })
  })

  it('returns direct neighbors for the middle part', () => {
    const { prev, next } = getAdjacentParts('part-ii')
    expect(prev.slug).toBe('real-costs')
    expect(next).toEqual({
      slug: 'getting-right',
      partLabel: 'Part III',
      navTitle: "What It's Actually Getting Right",
    })
  })

  it('returns Part IV as next from Part III', () => {
    const { prev, next } = getAdjacentParts('part-iii')
    expect(prev.slug).toBe('whats-being-done')
    expect(next).toEqual({
      slug: 'the-race',
      partLabel: 'Part IV',
      navTitle: "The Race We're In",
    })
  })

  it('returns Part V as next from Part IV', () => {
    const { prev, next } = getAdjacentParts('part-iv')
    expect(prev.slug).toBe('getting-right')
    expect(next).toEqual({
      slug: 'the-reality-problem',
      partLabel: 'Part V',
      navTitle: 'The Reality Problem',
    })
  })

  it('returns Part VI as next from Part V', () => {
    const { prev, next } = getAdjacentParts('part-v')
    expect(prev.slug).toBe('the-race')
    expect(next).toEqual({
      slug: 'the-tail-risk',
      partLabel: 'Part VI',
      navTitle: 'The Tail Risk',
    })
  })

  it('returns Part VII as next from Part VI', () => {
    const { prev, next } = getAdjacentParts('part-vi')
    expect(prev.slug).toBe('the-reality-problem')
    expect(next).toEqual({
      slug: 'machines-we-talk-to',
      partLabel: 'Part VII',
      navTitle: 'Machines We Talk To',
    })
  })

  it('returns Part VIII as next from Part VII', () => {
    const { prev, next } = getAdjacentParts('part-vii')
    expect(prev.slug).toBe('the-tail-risk')
    expect(next).toEqual({
      slug: 'whose-intelligence',
      partLabel: 'Part VIII',
      navTitle: 'Whose Intelligence?',
    })
  })

  it('returns Part IX as next from Part VIII', () => {
    const { prev, next } = getAdjacentParts('part-viii')
    expect(prev.slug).toBe('machines-we-talk-to')
    expect(next).toEqual({
      slug: 'the-creativity-question',
      partLabel: 'Part IX',
      navTitle: 'The Creativity Question',
    })
  })

  it('returns Part X as next from Part IX', () => {
    const { prev, next } = getAdjacentParts('part-ix')
    expect(prev.slug).toBe('whose-intelligence')
    expect(next).toEqual({
      slug: 'pattern-and-prejudice',
      partLabel: 'Part X',
      navTitle: 'Pattern and Prejudice',
    })
  })

  it('returns Part XI as next from Part X', () => {
    const { prev, next } = getAdjacentParts('part-x')
    expect(prev.slug).toBe('the-creativity-question')
    expect(next).toEqual({
      slug: 'the-ground-it-comes-from',
      partLabel: 'Part XI',
      navTitle: 'The Ground It Comes From',
    })
  })

  it('wraps forward from Part XI back to Part I', () => {
    const { prev, next } = getAdjacentParts('part-xi')
    expect(prev.slug).toBe('pattern-and-prejudice')
    expect(next).toEqual({
      slug: 'real-costs',
      partLabel: 'Part I',
      navTitle: 'A Roundtable on Real Costs',
    })
  })

  it('throws on an unknown document id', () => {
    // @ts-expect-error exercising the runtime guard with an invalid id
    expect(() => getAdjacentParts('part-unknown')).toThrow()
  })
})
