import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { DocumentProvider } from './DocumentProvider'
import { ClaimDrawerContext } from '../context/ClaimDrawerContext'
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

  it('opens the evidence drawer when "View evidence" is clicked', () => {
    const open = vi.fn()
    const claims: Record<string, Claim> = {
      'claim-a': {
        id: 'claim-a',
        kind: 'statistic',
        claimText: 'x',
        verificationStatus: 'verified',
      },
      'claim-b': {
        id: 'claim-b',
        kind: 'statistic',
        claimText: 'y',
        verificationStatus: 'verified',
      },
    }
    render(
      <ClaimDrawerContext.Provider value={{ open }}>
        <DocumentProvider claims={claims}>
          <ChartBlock chart={barChart} />
        </DocumentProvider>
      </ClaimDrawerContext.Provider>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'View evidence' }))
    expect(open).toHaveBeenCalledTimes(1)
    expect(open.mock.calls[0][0].id).toBe('claim-a')
  })

  it('omits the evidence affordance when no backing claim resolves', () => {
    render(
      <DocumentProvider claims={{}}>
        <ChartBlock chart={barChart} />
      </DocumentProvider>,
    )
    expect(screen.queryByRole('button', { name: 'View evidence' })).not.toBeInTheDocument()
  })

  it('draws a reference marker on a bar chart', () => {
    const { container } = renderChart({
      kind: 'bar',
      title: 'Patents',
      unit: 'K',
      ariaLabel: 'Patents bar',
      reference: { value: 15.3, label: '2015 baseline' },
      data: [
        { label: '2015', value: 15.3 },
        { label: '2021', value: 71.4 },
      ],
    })
    expect(container.querySelector('.chart-block__canvas')).toHaveTextContent('2015 baseline')
  })

  it('world map renders a safe placeholder + per-year table without a basemap', () => {
    const { container } = renderChart({
      kind: 'worldMap',
      title: 'Data centers',
      ariaLabel: 'World map of data centers',
      years: ['2020', '2025', '2030'],
      claimIds: ['claim-a'],
      data: [
        {
          iso: '840',
          label: 'United States',
          values: { '2020': 2714, '2025': 5427, '2030': 10854 },
        },
        { iso: '156', label: 'China', values: { '2020': 225, '2025': 449, '2030': 898 } },
      ],
    })
    // jsdom has no fetch → basemap is null → graceful placeholder, no crash.
    expect(screen.getByRole('img', { name: 'World map of data centers' })).toBeInTheDocument()
    const table = container.querySelector('.chart-block__sr') as HTMLElement
    expect(within(table).getByText('United States')).toBeInTheDocument()
    expect(within(table).getByText('5427')).toBeInTheDocument()
    expect(within(table).getByText('10854')).toBeInTheDocument()
  })

  it('world map scrubber updates the active year', () => {
    const { container } = renderChart({
      kind: 'worldMap',
      title: 'Data centers',
      ariaLabel: 'World map of data centers',
      years: ['2020', '2025', '2030'],
      claimIds: ['claim-a'],
      data: [
        {
          iso: '840',
          label: 'United States',
          values: { '2020': 2714, '2025': 5427, '2030': 10854 },
        },
      ],
    })
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement
    expect(container.querySelector('.chart-worldmap__year')).toHaveTextContent('2020')
    fireEvent.change(slider, { target: { value: '2' } })
    expect(container.querySelector('.chart-worldmap__year')).toHaveTextContent('2030')
  })

  it('world map uses a two-button toggle for two frames', () => {
    const { container } = renderChart({
      kind: 'worldMap',
      title: 'Two frames',
      ariaLabel: 'Two frame map',
      years: ['2024', '2030'],
      claimIds: ['claim-a'],
      data: [{ iso: '840', label: 'United States', values: { '2024': 1, '2030': 2 } }],
    })
    expect(container.querySelector('input[type="range"]')).toBeNull()
    const buttons = container.querySelectorAll('.chart-worldmap__toggle button')
    expect(buttons).toHaveLength(2)
    fireEvent.click(buttons[1])
    expect(container.querySelector('.chart-worldmap__year')).toHaveTextContent('2030')
  })

  it('marks a projected tail and shades the band on a line chart', () => {
    const { container } = renderChart({
      kind: 'line',
      area: true,
      band: true,
      title: 'Synthetic share',
      unit: '%',
      ariaLabel: 'Synthetic share line',
      annotations: [{ at: '2022', text: 'Report published' }],
      data: [
        { label: '2022', value: 10 },
        { label: '2024', value: 45, projected: true },
        { label: '2026', value: 90, projected: true },
      ],
    })
    const canvas = container.querySelector('.chart-block__canvas') as HTMLElement
    expect(canvas).toHaveTextContent('PROJECTED')
    expect(canvas).toHaveTextContent('Report published')
    expect(canvas.querySelector('path[stroke-dasharray]')).not.toBeNull()
  })

  it('renders a line reference marker even when its value sits below the data range', () => {
    const { container } = renderChart({
      kind: 'line',
      title: 'E-waste',
      unit: 'Mt',
      ariaLabel: 'E-waste line',
      reference: { value: 13.8, label: 'recycled' },
      data: [
        { label: '2014', value: 44 },
        { label: '2022', value: 62 },
        { label: '2030', value: 82, projected: true },
      ],
    })
    const canvas = container.querySelector('.chart-block__canvas') as HTMLElement
    // The reference (13.8) is below every data value (44+); folding it into the
    // domain keeps its dashed marker + label on-canvas rather than clipped away.
    expect(canvas).toHaveTextContent('recycled')
    expect(canvas.querySelector('line[stroke-dasharray="5 3"]')).not.toBeNull()
  })

  it('renders a line annotation callout keyed to its point', () => {
    const { container } = renderChart({
      kind: 'line',
      area: true,
      title: 'Flood reach',
      unit: 'countries',
      ariaLabel: 'Flood reach line',
      annotations: [{ at: '2025', text: '2B+ people' }],
      data: [
        { label: '2018', value: 1 },
        { label: '2025', value: 150 },
      ],
    })
    expect(container.querySelector('.chart-block__canvas')).toHaveTextContent('2B+ people')
  })

  it('marks the figure with a scroll-reveal state for the entrance animation', () => {
    const { container } = renderChart(barChart)
    // jsdom's IntersectionObserver stub never fires, so the figure sits at
    // 'pending' (marks held empty) until a real viewport reveal flips it to 'in'.
    expect(container.querySelector('.chart-block')).toHaveAttribute('data-reveal', 'pending')
  })

  it('draws the full donut immediately under reduced motion (sweep terminal state)', () => {
    const original = window.matchMedia
    window.matchMedia = ((query: string) => ({
      matches: /prefers-reduced-motion: reduce/.test(query),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
    try {
      const { container } = renderChart({
        kind: 'donut',
        title: 'Water breakdown',
        unit: 'B L',
        ariaLabel: 'Donut of water use',
        data: [
          { label: 'Indirect', value: 373 },
          { label: 'Direct', value: 140 },
          { label: 'Manufacturing', value: 47 },
        ],
      })
      // Reduced motion skips the sweep, so all three wedges render fully at once.
      const arcs = container.querySelectorAll('.chart-block__canvas svg path')
      expect(arcs).toHaveLength(3)
      arcs.forEach((arc) => expect(arc.getAttribute('d')).toBeTruthy())
    } finally {
      window.matchMedia = original
    }
  })
})
