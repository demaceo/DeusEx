import { describe, it, expect } from 'vitest'
import { DOCUMENTS } from './documents'
import { estimateReadingTime } from './readingTime'
import { partI } from './parts/part-i'

describe('estimateReadingTime', () => {
  it('returns a positive whole number of minutes for every document', () => {
    for (const entry of DOCUMENTS) {
      const minutes = estimateReadingTime(entry.doc)
      expect(Number.isInteger(minutes)).toBe(true)
      expect(minutes).toBeGreaterThanOrEqual(1)
    }
  })

  it('reports several minutes for a long document', () => {
    // Part I is a full multi-round roundtable; it should not read in under a minute.
    expect(estimateReadingTime(partI)).toBeGreaterThan(1)
  })
})
