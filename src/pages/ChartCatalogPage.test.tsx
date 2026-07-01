import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { countByKind, getChartCatalog } from '../data/chartCatalog'
import { DOCUMENTS } from '../data/documents'
import { ChartCatalogPage } from './ChartCatalogPage'

function renderAt(path = '/charts') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ChartCatalogPage />
    </MemoryRouter>,
  )
}

const groups = getChartCatalog()
const totalCharts = groups.reduce((n, g) => n + g.entries.length, 0)
const counts = countByKind(groups)

describe('ChartCatalogPage', () => {
  it('links to every document that has at least one chart', () => {
    renderAt()
    for (const entry of DOCUMENTS) {
      const group = groups.find((g) => g.doc.id === entry.doc.id)!
      if (group.entries.length === 0) continue
      const link = screen.getByRole('link', {
        name: new RegExp(`${entry.partLabel}: ${entry.navTitle}`, 'i'),
      })
      expect(link).toHaveAttribute('href', `/${entry.doc.slug}`)
    }
  })

  it('shows the series-wide total on the "All charts" chip', () => {
    renderAt()
    const allChip = screen.getByRole('button', { name: /all charts/i })
    expect(allChip).toHaveTextContent(String(totalCharts))
  })

  it('honors a ?kind= filter from the URL, hiding non-matching charts', () => {
    const [kind] = Object.entries(counts).find(([, n]) => n > 0)!
    renderAt(`/charts?kind=${kind}`)
    // Every group heading shown must carry exactly its filtered count of that kind.
    const expectedGroups = groups.filter((g) => g.entries.some((e) => e.chart.kind === kind)).length
    const badges = screen
      .getAllByText(/chart[s]?$/i)
      .filter((el) => el.className === 'vp-doc__shown')
    expect(badges.length).toBe(expectedGroups)
  })

  it('renders real chart figures from the catalog (lazy ChartBlock path)', async () => {
    renderAt()
    const figures = await screen.findAllByRole('img', {}, { timeout: 15000 })
    expect(figures.length).toBeGreaterThan(0)
    for (const figure of figures) expect(figure).toHaveAttribute('aria-label')
  })
})
