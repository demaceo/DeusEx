import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlockRenderer } from './BlockRenderer'
import { DocumentProvider } from './DocumentProvider'
import { partI } from '../data/parts/part-i'

/**
 * Integration smoke test: drives a real chart block from the real document data
 * through BlockRenderer's lazy ChartBlock + Suspense path (no Recharts mock), so
 * the dynamic import, real claims registry, and verification wiring are exercised
 * end-to-end. Uses the ResizeObserver stub from test/setup.ts.
 */
describe('BlockRenderer chart dispatch', () => {
  it('lazily renders a chart block from real document data', async () => {
    const chartBlock = partI.sections.flatMap((s) => s.blocks).find((b) => b.type === 'chart')
    expect(chartBlock).toBeDefined()

    render(
      <DocumentProvider claims={partI.claims}>
        <BlockRenderer block={chartBlock!} />
      </DocumentProvider>,
    )

    // The figure resolves once the lazy chunk loads.
    const figure = await screen.findByRole('img')
    expect(figure).toHaveAttribute('aria-label')
    // Part I's charts all rest on verified claims, so the status surfaces.
    expect(figure).toHaveAttribute('data-verification', 'verified')
  })
})
