import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { render, screen, within } from '@testing-library/react'
import { DocumentProvider } from './DocumentProvider'
import type { Claim } from '../types/content'
import type { ChartSpec } from '../types/document'

// Recharts' ResponsiveContainer measures its parent via ResizeObserver, which
// reports 0×0 in jsdom and renders an empty SVG. Stub it to a fixed-size box so
// the chart mounts; the assertions below target the figure/caption DOM, not SVG.
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>()
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
      <div style={{ width: 600, height: 300 }}>{children}</div>
    ),
  }
})

import { ChartBlock } from './ChartBlock'

/** Render a chart with every backing claim stubbed as verified. */
function renderChart(chart: ChartSpec) {
  const claims: Record<string, Claim> = {}
  for (const id of chart.claimIds ?? []) {
    claims[id] = { id, kind: 'statistic', claimText: id, verificationStatus: 'verified' }
  }
  return render(
    <DocumentProvider claims={claims}>
      <ChartBlock chart={chart} />
    </DocumentProvider>,
  )
}

const barChart: ChartSpec = {
  kind: 'bar',
  title: 'Electricity demand',
  subtitle: 'A two-point comparison',
  source: 'IEA',
  unit: 'TWh',
  claimIds: ['claim-a', 'claim-b'],
  ariaLabel: 'Bar chart of electricity demand',
  data: [
    { label: '2025', value: 460 },
    { label: '2030', value: 945 },
  ],
}

describe('ChartBlock', () => {
  it('renders an accessible figure with title, subtitle, and source', () => {
    const { container } = renderChart(barChart)
    expect(screen.getByRole('img', { name: 'Bar chart of electricity demand' })).toBeInTheDocument()
    expect(container.querySelector('.chart-block__title')).toHaveTextContent('Electricity demand')
    expect(container.querySelector('.chart-block__subtitle')).toHaveTextContent(
      'A two-point comparison',
    )
    expect(container.querySelector('.chart-block__source')).toHaveTextContent('IEA')
  })

  it('surfaces a "Verified" badge and status when all claims are verified', () => {
    const { container } = renderChart(barChart)
    expect(screen.getByText('Verified')).toBeInTheDocument()
    expect(container.querySelector('.chart-block')).toHaveAttribute('data-verification', 'verified')
  })

  it('falls back to a pending status dot when a claim is unresolved', () => {
    const { container } = render(
      <DocumentProvider claims={{}}>
        <ChartBlock chart={barChart} />
      </DocumentProvider>,
    )
    expect(container.querySelector('.chart-block')).toHaveAttribute('data-verification', 'pending')
    expect(screen.queryByText('Verified')).not.toBeInTheDocument()
  })

  it('exposes the data as a visually-hidden table for assistive tech', () => {
    renderChart(barChart)
    const table = screen.getByRole('table')
    expect(within(table).getByText('2025')).toBeInTheDocument()
    expect(within(table).getByText('460 TWh')).toBeInTheDocument()
    expect(within(table).getByText('945 TWh')).toBeInTheDocument()
  })

  it('renders a legend for donut charts', () => {
    const { container } = renderChart({
      kind: 'donut',
      title: 'Water breakdown',
      unit: 'B L',
      ariaLabel: 'Donut of water use',
      claimIds: ['claim-a'],
      data: [
        { label: 'Indirect', value: 373 },
        { label: 'Direct', value: 140 },
        { label: 'Manufacturing', value: 47 },
      ],
    })
    const legend = container.querySelector('.chart-legend') as HTMLElement
    expect(within(legend).getByText('Indirect')).toBeInTheDocument()
    expect(within(legend).getByText('373 B L')).toBeInTheDocument()
  })

  it('renders a legend and per-series table for stacked bars', () => {
    const { container } = renderChart({
      kind: 'stackedBar',
      title: 'Research concentration',
      unit: '%',
      ariaLabel: 'Stacked bar of research concentration',
      claimIds: ['claim-a'],
      series: [
        { key: 'top10', label: 'Top 10%' },
        { key: 'rest', label: 'Everyone else' },
      ],
      data: [
        { label: 'Articles', top10: 55, rest: 45 },
        { label: 'Grants', top10: 50, rest: 50 },
      ],
    })
    const legend = container.querySelector('.chart-legend') as HTMLElement
    expect(within(legend).getByText('Top 10%')).toBeInTheDocument()
    expect(within(legend).getByText('Everyone else')).toBeInTheDocument()
    const table = screen.getByRole('table')
    expect(within(table).getByText('Articles')).toBeInTheDocument()
    expect(within(table).getByText('55%')).toBeInTheDocument()
  })

  it('formats currency and percentage units correctly', () => {
    renderChart({
      kind: 'bar',
      orientation: 'horizontal',
      title: 'Wages',
      unit: '$/hr',
      ariaLabel: 'Wage chart',
      data: [{ label: 'Kenya', value: 2 }],
    })
    expect(screen.getByText('$2/hr')).toBeInTheDocument()
  })
})
