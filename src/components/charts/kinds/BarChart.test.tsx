import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ChartSpec } from '../../../types/document'
import { BarChart } from './BarChart'

// BarChart is a pure presentational component (chart spec + measured width/height in, SVG
// out) with no context dependency, so it's rendered directly here rather than through
// ChartBlock/ChartFrame. Frame-level behavior (evidence button, verification badge, a11y
// table) stays covered by the shared ChartBlock.test.tsx; these cases are bar-specific
// rendering/interaction detail.

type BarSpec = Extract<ChartSpec, { kind: 'bar' }>

const threeBar: BarSpec = {
  kind: 'bar',
  title: 'AI labs by summit',
  unit: 'labs',
  ariaLabel: 'Bar chart of AI labs by summit',
  data: [
    { label: 'White House\nJul 2023', value: 7 },
    { label: 'Bletchley', value: 16 },
    { label: 'Seoul', value: 16, projected: true },
  ],
  annotations: [{ at: 'Bletchley', text: 'Report published' }],
}

function renderBar(chart: BarSpec, width = 700, height = 300) {
  return render(<BarChart chart={chart} width={width} height={height} />)
}

describe('BarChart interaction', () => {
  it('shows the category name alongside the value on hover (vertical)', () => {
    const { container } = renderBar(threeBar)
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.mouseEnter(hits[1])
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent('Bletchley')
  })

  it('shows the category name alongside the value on hover (horizontal)', () => {
    const { container } = renderBar({ ...threeBar, orientation: 'horizontal' })
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.mouseEnter(hits[0])
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent('White House')
  })

  it('clicking a bar pins its tooltip and dims the others', () => {
    const { container } = renderBar(threeBar)
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.click(hits[0])
    const marks = container.querySelectorAll('.chart-bar__mark')
    expect(marks[0]).not.toHaveAttribute('data-dimmed')
    expect(marks[1]).toHaveAttribute('data-dimmed', 'true')
    expect(marks[2]).toHaveAttribute('data-dimmed', 'true')
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent('White House')
  })

  it('hovering a different bar while one is pinned does not move the tooltip', () => {
    const { container } = renderBar(threeBar)
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.click(hits[0])
    fireEvent.mouseEnter(hits[1])
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent('White House')
  })

  it('clicking the pinned bar again unpins it', () => {
    const { container } = renderBar(threeBar)
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.click(hits[0])
    fireEvent.click(hits[0])
    expect(container.querySelectorAll('.chart-bar__mark[data-dimmed]')).toHaveLength(0)
    expect(container.querySelector('.chart-tooltip')).not.toBeInTheDocument()
  })

  it('clicking a different bar moves the pin', () => {
    const { container } = renderBar(threeBar)
    const hits = container.querySelectorAll('.chart-bar__hit')
    fireEvent.click(hits[0])
    fireEvent.click(hits[1])
    const marks = container.querySelectorAll('.chart-bar__mark')
    expect(marks[0]).toHaveAttribute('data-dimmed', 'true')
    expect(marks[1]).not.toHaveAttribute('data-dimmed')
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent('Bletchley')
  })

  it('Escape clears an active pin', () => {
    const { container } = renderBar(threeBar)
    fireEvent.click(container.querySelectorAll('.chart-bar__hit')[0])
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(container.querySelectorAll('.chart-bar__mark[data-dimmed]')).toHaveLength(0)
  })

  it('a mousedown outside the chart clears an active pin', () => {
    const { container } = renderBar(threeBar)
    fireEvent.click(container.querySelectorAll('.chart-bar__hit')[0])
    fireEvent.mouseDown(document.body)
    expect(container.querySelectorAll('.chart-bar__mark[data-dimmed]')).toHaveLength(0)
  })
})

describe('BarChart labels', () => {
  it('splits a label on \\n into stacked tspans (vertical)', () => {
    renderBar(threeBar)
    expect(screen.getByText('White House').tagName.toLowerCase()).toBe('tspan')
    expect(screen.getByText('Jul 2023').tagName.toLowerCase()).toBe('tspan')
  })

  it('splits a label on \\n into stacked tspans (horizontal)', () => {
    renderBar({ ...threeBar, orientation: 'horizontal' })
    expect(screen.getByText('White House').tagName.toLowerCase()).toBe('tspan')
    expect(screen.getByText('Jul 2023').tagName.toLowerCase()).toBe('tspan')
  })
})

describe('BarChart annotations and projected data', () => {
  it('renders a leader-line annotation keyed to its datum', () => {
    renderBar(threeBar)
    expect(screen.getByText('Report published')).toBeInTheDocument()
  })

  it('renders nothing (and does not throw) for an annotation with no matching datum', () => {
    expect(() =>
      renderBar({
        ...threeBar,
        annotations: [{ at: 'Not A Real Label', text: 'Should not appear' }],
      }),
    ).not.toThrow()
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument()
  })

  it('renders a projected datum with a hollow/dashed treatment', () => {
    const { container } = renderBar(threeBar)
    const bars = container.querySelectorAll('.chart-bar__grow-v')
    expect(bars[2]).toHaveAttribute('fill', 'none')
    expect(bars[2]).toHaveAttribute('stroke-dasharray', '4 3')
    expect(bars[0]).not.toHaveAttribute('stroke-dasharray')
  })
})

describe('HorizontalBars parity with VerticalBars', () => {
  const twoBar: BarSpec = {
    kind: 'bar',
    orientation: 'horizontal',
    title: 'Water use',
    unit: 'B gal',
    ariaLabel: 'Bar chart of water use',
    reference: { value: 10, label: 'Baseline' },
    data: [
      { label: '2023', value: 228 },
      { label: '2028', value: 456 },
    ],
  }

  it('shows a delta chip for 2-point horizontal data', () => {
    const { container } = renderBar(twoBar)
    expect(container.querySelector('.chart-delta-chip')).toHaveTextContent('+100%')
  })

  it('renders a reference marker', () => {
    const { container } = renderBar(twoBar)
    expect(container.querySelector('line[stroke-dasharray="5 3"]')).toBeInTheDocument()
  })

  it('renders vertical gridlines via the shared GridLines primitive', () => {
    const { container } = renderBar(twoBar)
    const gridLines = container.querySelectorAll('line[stroke-dasharray="2 3"]')
    expect(gridLines.length).toBeGreaterThan(0)
    gridLines.forEach((line) => {
      expect(line.getAttribute('x1')).toBe(line.getAttribute('x2'))
    })
  })
})

describe('BarChart hit target', () => {
  it('the hit-rect spans the full band, not just the visually clamped bar (vertical)', () => {
    const { container } = renderBar(
      {
        kind: 'bar',
        title: 't',
        ariaLabel: 'a',
        data: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ],
      },
      700,
      300,
    )
    const hit = container.querySelectorAll('.chart-bar__hit')[0]
    expect(Number(hit.getAttribute('width'))).toBeGreaterThan(110)
  })

  it('the hit-rect spans the full band, not just the clamped bar height (horizontal)', () => {
    const { container } = renderBar(
      {
        kind: 'bar',
        orientation: 'horizontal',
        title: 't',
        ariaLabel: 'a',
        data: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ],
      },
      500,
      500,
    )
    const hit = container.querySelectorAll('.chart-bar__hit')[0]
    expect(Number(hit.getAttribute('height'))).toBeGreaterThan(42)
  })
})

describe('BarChart entrance animation', () => {
  // Reduced-motion gating is pure CSS (`@media (prefers-reduced-motion: no-preference)`),
  // matching the pre-existing `.chart-block__canvas` chart-rise entrance — not asserted here
  // in JS, same as that existing animation has no dedicated reduced-motion test.
  it('applies a staggered grow-in class to every bar', () => {
    const { container } = renderBar(threeBar)
    const bars = container.querySelectorAll('.chart-bar__grow-v')
    expect(bars).toHaveLength(3)
    bars.forEach((bar, i) => {
      expect((bar as HTMLElement).style.animationDelay).toBe(`${i * 40}ms`)
    })
  })
})
