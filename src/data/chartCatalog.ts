/**
 * Chart catalog: every `ChartBlock` instance across the whole series, projected
 * for the `/charts` catalog page. A pure read-only view over {@link DOCUMENTS} —
 * grouped by document (roundtable) in series order, with each chart's kind kept
 * alongside so the page can also categorize/filter by chart type.
 */

import type { ChartSpec, RoundtableDocument } from '../types/document'
import { DOCUMENTS, sectionId } from './documents'

export type ChartKind = ChartSpec['kind']

/** Display label per chart kind, and the canonical order the catalog lists them in. */
export const CHART_KIND_LABEL: Record<ChartKind, string> = {
  bar: 'Bar',
  line: 'Line',
  donut: 'Donut / gauge',
  stackedBar: 'Stacked bar',
  comparison: 'Comparison',
  waffle: 'Waffle',
  lollipop: 'Lollipop',
  pictogram: 'Pictogram',
  bullet: 'Bullet',
  worldMap: 'World map',
}

export const CHART_KINDS: ChartKind[] = [
  'bar',
  'line',
  'donut',
  'stackedBar',
  'comparison',
  'waffle',
  'lollipop',
  'pictogram',
  'bullet',
  'worldMap',
]

/** One chart, with enough of its home round to link back into the live document. */
export interface ChartCatalogEntry {
  chart: ChartSpec
  /** Anchor into the source document's round section, e.g. "round-3". */
  anchor: string
  /** e.g. "Round II" or "Round II · Water Usage". */
  roundLabel: string
}

/** Every chart in one document, in section order. */
export interface ChartCatalogGroup {
  doc: RoundtableDocument
  partLabel: string
  navTitle: string
  entries: ChartCatalogEntry[]
}

/**
 * Every `chart` block across the whole series, grouped by document in series
 * order (mirrors {@link getPersonaThread}'s shape). Powers the `/charts`
 * catalog page's categorization by roundtable and, via each entry's
 * `chart.kind`, by chart type.
 */
export function getChartCatalog(): ChartCatalogGroup[] {
  return DOCUMENTS.map((entry) => {
    const entries: ChartCatalogEntry[] = []
    entry.doc.sections.forEach((section, i) => {
      for (const block of section.blocks) {
        if (block.type !== 'chart') continue
        const { roundLabel, title } = section.header
        entries.push({
          chart: block.data,
          anchor: sectionId(i),
          roundLabel: title ? `${roundLabel} · ${title}` : roundLabel,
        })
      }
    })
    return {
      doc: entry.doc,
      partLabel: entry.partLabel,
      navTitle: entry.navTitle,
      entries,
    }
  })
}

/** Count of chart instances per kind across a set of catalog groups. */
export function countByKind(groups: ChartCatalogGroup[]): Record<ChartKind, number> {
  const counts = Object.fromEntries(CHART_KINDS.map((k) => [k, 0])) as Record<ChartKind, number>
  for (const group of groups) {
    for (const entry of group.entries) counts[entry.chart.kind] += 1
  }
  return counts
}
