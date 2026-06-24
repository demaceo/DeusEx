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
  it('exposes three documents with unique slugs', () => {
    expect(DOCUMENTS).toHaveLength(3)
    const slugs = DOCUMENTS.map((entry) => entry.doc.slug)
    expect(new Set(slugs).size).toBe(3)
    expect(slugs).toEqual(
      expect.arrayContaining(['real-costs', 'whats-being-done', 'getting-right']),
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
  it('wraps backward from Part I to Part III and forward to Part II', () => {
    const { prev, next } = getAdjacentParts('part-i')
    expect(prev).toEqual({
      slug: 'getting-right',
      partLabel: 'Part III',
      navTitle: "What It's Actually Getting Right",
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
    expect(next.slug).toBe('getting-right')
  })

  it('wraps forward from Part III back to Part I', () => {
    const { prev, next } = getAdjacentParts('part-iii')
    expect(prev.slug).toBe('whats-being-done')
    expect(next).toEqual({
      slug: 'real-costs',
      partLabel: 'Part I',
      navTitle: 'A Roundtable on Real Costs',
    })
  })

  it('throws on an unknown document id', () => {
    // @ts-expect-error exercising the runtime guard with an invalid id
    expect(() => getAdjacentParts('part-iv')).toThrow()
  })
})
