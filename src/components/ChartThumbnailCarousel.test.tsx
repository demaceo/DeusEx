import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { getDocumentCharts } from '../data/chartCatalog'
import { partI } from '../data/parts/part-i'
import type { RoundtableDocument } from '../types/document'
import { ChartThumbnailCarousel } from './ChartThumbnailCarousel'
import { DocumentProvider } from './DocumentProvider'
import { ClaimDrawerProvider } from './EvidenceDrawer'

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

function renderCarousel(doc: RoundtableDocument) {
  return render(
    <DocumentProvider claims={doc.claims} sources={doc.sources}>
      <ClaimDrawerProvider>
        <ChartThumbnailCarousel document={doc} />
      </ClaimDrawerProvider>
    </DocumentProvider>,
  )
}

// Real document data drives the "has charts" cases, exercising the lazy
// ChartThumbnail/ChartBlock chunks end-to-end (mirrors BlockRenderer.test.tsx's
// generous timeout: a cold Vitest transform of the chart chunk can be slow).
describe('ChartThumbnailCarousel', () => {
  it('renders nothing for a document with no charts', () => {
    const { container } = renderCarousel(emptyDoc)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders one thumbnail button per chart in the document', async () => {
    renderCarousel(partI)
    const entries = getDocumentCharts(partI)
    const buttons = await screen.findAllByRole(
      'button',
      { name: /^View chart:/ },
      { timeout: 15000 },
    )
    expect(buttons).toHaveLength(entries.length)
  })

  it('opens the full chart in a labeled dialog when a thumbnail is clicked', async () => {
    renderCarousel(partI)
    const first = getDocumentCharts(partI)[0]

    const trigger = await screen.findByRole(
      'button',
      { name: `View chart: ${first.chart.title}` },
      { timeout: 15000 },
    )
    fireEvent.click(trigger)

    const dialog = await screen.findByRole(
      'dialog',
      { name: first.chart.title },
      { timeout: 15000 },
    )
    expect(dialog).toBeInTheDocument()
  })

  it('closes on Escape and restores focus to the thumbnail', async () => {
    renderCarousel(partI)
    const first = getDocumentCharts(partI)[0]

    const trigger = await screen.findByRole(
      'button',
      { name: `View chart: ${first.chart.title}` },
      { timeout: 15000 },
    )
    trigger.focus()
    fireEvent.click(trigger)
    await screen.findByRole('dialog', {}, { timeout: 15000 })

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes on the close button', async () => {
    renderCarousel(partI)
    const first = getDocumentCharts(partI)[0]

    const trigger = await screen.findByRole(
      'button',
      { name: `View chart: ${first.chart.title}` },
      { timeout: 15000 },
    )
    fireEvent.click(trigger)
    await screen.findByRole('dialog', {}, { timeout: 15000 })

    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
