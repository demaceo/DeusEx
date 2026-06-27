import { describe, it, expect } from 'vitest'
import {
  DOCUMENTS,
  DOCUMENTS_BY_SLUG,
  assertReferentialIntegrity,
  getAdjacentParts,
  getDocumentBySlug,
} from './documents'
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
  it('exposes five documents with unique slugs', () => {
    expect(DOCUMENTS).toHaveLength(5)
    const slugs = DOCUMENTS.map((entry) => entry.doc.slug)
    expect(new Set(slugs).size).toBe(5)
    expect(slugs).toEqual(
      expect.arrayContaining([
        'real-costs',
        'whats-being-done',
        'getting-right',
        'the-race',
        'the-reality-problem',
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
    expect(charts.length).toBe(4)
    for (const chart of charts) {
      expect(chart.claimIds?.length ?? 0).toBeGreaterThan(0)
      for (const id of chart.claimIds ?? []) {
        expect(doc.claims[id]?.verificationStatus, `${chart.title} → ${id}`).toBe('verified')
      }
    }
  })
})

describe('getAdjacentParts (wrap-around series navigation)', () => {
  it('wraps backward from Part I to Part V and forward to Part II', () => {
    const { prev, next } = getAdjacentParts('part-i')
    expect(prev).toEqual({
      slug: 'the-reality-problem',
      partLabel: 'Part V',
      navTitle: 'The Reality Problem',
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

  it('wraps forward from Part V back to Part I', () => {
    const { prev, next } = getAdjacentParts('part-v')
    expect(prev.slug).toBe('the-race')
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
