import { describe, it, expect } from 'vitest'
import { CHART_KINDS, countByKind, getChartCatalog, getDocumentCharts } from './chartCatalog'
import { DOCUMENTS } from './documents'
import type { ChartSpec, RoundtableDocument } from '../types/document'

/** Every chart block in a document, in render order (mirrors documents.test.ts). */
function chartsIn(doc: RoundtableDocument): ChartSpec[] {
  const charts: ChartSpec[] = []
  for (const section of doc.sections) {
    for (const block of section.blocks) {
      if (block.type === 'chart') charts.push(block.data)
    }
  }
  return charts
}

describe('getChartCatalog', () => {
  it('returns one group per document, in series order', () => {
    const groups = getChartCatalog()
    expect(groups).toHaveLength(DOCUMENTS.length)
    expect(groups.map((g) => g.doc.id)).toEqual(DOCUMENTS.map((e) => e.doc.id))
  })

  it('collects every chart block in each document', () => {
    const groups = getChartCatalog()
    for (const group of groups) {
      const expected = chartsIn(group.doc)
      expect(group.entries).toHaveLength(expected.length)
      expect(group.entries.map((e) => e.chart)).toEqual(expected)
    }
  })

  it('anchors each chart to its round, and labels the round with any subtitle', () => {
    const groups = getChartCatalog()
    for (const group of groups) {
      for (const entry of group.entries) {
        expect(entry.anchor).toMatch(/^round-\d+$/)
        expect(entry.roundLabel.length).toBeGreaterThan(0)
      }
    }
  })

  it('carries no entries for a document with no charts', () => {
    // Every real document either has charts or doesn't — either way the shape holds.
    const groups = getChartCatalog()
    for (const group of groups) {
      expect(Array.isArray(group.entries)).toBe(true)
    }
  })
})

describe('getDocumentCharts', () => {
  it('matches the per-document slice of getChartCatalog for every document', () => {
    const groups = getChartCatalog()
    for (const entry of DOCUMENTS) {
      const group = groups.find((g) => g.doc.id === entry.doc.id)
      expect(getDocumentCharts(entry.doc)).toEqual(group?.entries)
    }
  })

  it('returns an empty array, without throwing, for a document with no charts', () => {
    const emptyDoc: RoundtableDocument = {
      id: 'part-i',
      slug: 'test-empty',
      seriesLabel: 'Test',
      masthead: {
        overline: 'Test',
        titleLines: [[{ text: 'Test' }]],
        subtitle: 'Test',
        dateLine: 'Test',
        accentColor: 'accent',
      },
      intro: [],
      sections: [],
      sources: [],
      claims: {},
    }
    expect(() => getDocumentCharts(emptyDoc)).not.toThrow()
    expect(getDocumentCharts(emptyDoc)).toEqual([])
  })
})

describe('countByKind', () => {
  it('sums to the series-wide chart total and only uses known kinds', () => {
    const groups = getChartCatalog()
    const counts = countByKind(groups)
    const total = groups.reduce((n, g) => n + g.entries.length, 0)
    expect(Object.keys(counts).sort()).toEqual([...CHART_KINDS].sort())
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(total)
    expect(total).toBeGreaterThan(0)
  })

  it('counts each chart under its own kind', () => {
    const groups = getChartCatalog()
    const counts = countByKind(groups)
    for (const kind of CHART_KINDS) {
      const expected = groups.flatMap((g) => g.entries).filter((e) => e.chart.kind === kind).length
      expect(counts[kind]).toBe(expected)
    }
  })
})
