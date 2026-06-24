import { describe, it, expect } from 'vitest'
import {
  DOCUMENTS,
  DOCUMENTS_BY_SLUG,
  assertReferentialIntegrity,
  getDocumentBySlug,
} from './documents'

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
})
