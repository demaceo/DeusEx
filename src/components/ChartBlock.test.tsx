import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { DocumentProvider } from './DocumentProvider'
import type { Claim } from '../types/content'
import type { ChartSpec } from '../types/document'
import { ChartBlock } from './ChartBlock'

// Charts are now hand-built React SVG (d3 for the math) — no Recharts, so no
// ResponsiveContainer mock. useChartWidth falls back to a fixed width when
// ResizeObserver reports nothing (the test setup stubs it as a no-op), so the SVG
// mounts at a stable size; assertions below target the figure/caption/table DOM.

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

  it('auto-computes a delta chip for a two-point bar', () => {
    const { container } = renderChart(barChart)
    const chip = container.querySelector('.chart-delta-chip')
    expect(chip).not.toBeNull()
    expect(chip).toHaveTextContent('+105%')
    expect(chip).toHaveAttribute('data-sign', 'up')
  })

  it('exposes the data as a visually-hidden table for assistive tech', () => {
    const { container } = renderChart(barChart)
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('2025')).toBeInTheDocument()
    expect(within(table).getByText('460 TWh')).toBeInTheDocument()
    expect(within(table).getByText('945 TWh')).toBeInTheDocument()
  })

  it('renders a donut legend and fills the gauge center with the dominant figure', () => {
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
    // Center gauge surfaces the largest segment.
    expect(container.querySelector('.chart-donut__figure')).toHaveTextContent('373 B L')
    expect(container.querySelector('.chart-donut__caption')).toHaveTextContent('Indirect')
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
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('Articles')).toBeInTheDocument()
    expect(within(table).getByText('55%')).toBeInTheDocument()
  })

  it('formats currency and percentage units correctly', () => {
    const { container } = renderChart({
      kind: 'bar',
      orientation: 'horizontal',
      title: 'Wages',
      unit: '$/hr',
      ariaLabel: 'Wage chart',
      data: [{ label: 'Kenya', value: 2 }],
    })
    // The value appears both as an SVG label and in the accessible table.
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('$2/hr')).toBeInTheDocument()
  })

  it('renders a comparison slope with a delta badge and accessible pair', () => {
    const { container } = renderChart({
      kind: 'comparison',
      title: 'Demand',
      unit: 'TWh',
      ariaLabel: 'Comparison of demand',
      data: [
        { label: '2025', value: 460 },
        { label: '2030', value: 945 },
      ],
    })
    expect(container.querySelector('.chart-delta-chip')).toHaveTextContent('+105%')
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('460 TWh')).toBeInTheDocument()
    expect(within(table).getByText('945 TWh')).toBeInTheDocument()
  })

  it('honors an explicit deltaLabel on a comparison', () => {
    const { container } = renderChart({
      kind: 'comparison',
      title: 'Gap',
      unit: '%',
      deltaLabel: '×43',
      ariaLabel: 'Comparison gap',
      data: [
        { label: 'Lighter men', value: 0.8 },
        { label: 'Darker women', value: 34.7 },
      ],
    })
    expect(container.querySelector('.chart-delta-chip')).toHaveTextContent('×43')
  })

  it('renders a waffle as a 100-cell grid with a legend', () => {
    const { container } = renderChart({
      kind: 'waffle',
      title: 'Cobalt',
      unit: '%',
      ariaLabel: 'Cobalt waffle',
      data: [
        { label: 'DR Congo', value: 70 },
        { label: 'Rest of world', value: 30 },
      ],
    })
    expect(container.querySelectorAll('.chart-block__canvas svg rect')).toHaveLength(100)
    const legend = container.querySelector('.chart-legend') as HTMLElement
    expect(within(legend).getByText('DR Congo')).toBeInTheDocument()
    expect(within(legend).getByText('70%')).toBeInTheDocument()
  })

  it('renders a pictogram as an icon grid with a legend', () => {
    const { container } = renderChart({
      kind: 'pictogram',
      title: 'Loneliness',
      unit: '%',
      icon: 'user',
      ariaLabel: 'Loneliness pictogram',
      data: [
        { label: 'Reported loneliness', value: 50 },
        { label: 'Did not', value: 50 },
      ],
    })
    expect(container.querySelectorAll('.chart-pictogram svg')).toHaveLength(100)
    const legend = container.querySelector('.chart-legend') as HTMLElement
    expect(within(legend).getByText('Reported loneliness')).toBeInTheDocument()
  })

  it('renders a lollipop with a dot per category and accessible values', () => {
    const { container } = renderChart({
      kind: 'lollipop',
      orientation: 'horizontal',
      title: 'Investment',
      unit: '$B',
      ariaLabel: 'Investment lollipop',
      data: [
        { label: 'United States', value: 67.2 },
        { label: 'China', value: 7.8 },
        { label: 'United Kingdom', value: 3.8 },
      ],
    })
    expect(container.querySelectorAll('.chart-block__canvas svg circle')).toHaveLength(3)
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('$67.2B')).toBeInTheDocument()
  })

  it('renders a bullet with a labeled target marker', () => {
    const { container } = renderChart({
      kind: 'bullet',
      title: 'AI tutor',
      unit: 'score',
      target: 3.5,
      targetLabel: 'Baseline',
      ariaLabel: 'AI tutor bullet',
      data: [{ label: 'AI tutor', value: 4.5 }],
    })
    expect(container.querySelector('.chart-block__canvas svg')).toBeInTheDocument()
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('4.5 score')).toBeInTheDocument()
  })
})
