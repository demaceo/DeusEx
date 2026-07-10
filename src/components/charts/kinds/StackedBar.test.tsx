import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import type { ChartSpec } from '../../../types/document'
import { StackedBar } from './StackedBar'

// StackedBar is a pure presentational component (chart spec + measured width/height in, SVG
// out) with no context dependency, so it's rendered directly here rather than through
// ChartBlock/ChartFrame. Frame-level behavior (legend, evidence button, verification badge,
// a11y table) stays covered by the shared ChartBlock.test.tsx; these cases are stackedBar-
// specific rendering detail.

type StackedSpec = Extract<ChartSpec, { kind: 'stackedBar' }>

const concentration: StackedSpec = {
  kind: 'stackedBar',
  title: 'Research concentration',
  unit: '%',
  ariaLabel: 'Stacked bar of research concentration',
  series: [
    { key: 'top10', label: 'Top 10%', variant: 'accent' },
    { key: 'rest', label: 'Everyone else', variant: 'navy' },
  ],
  data: [
    { label: 'Articles', top10: 55, rest: 45 },
    { label: 'Grants', top10: 50, rest: 50 },
  ],
}

function renderStacked(chart: StackedSpec, width = 500, height = 300) {
  return render(<StackedBar chart={chart} width={width} height={height} />)
}

describe('StackedBar rendering', () => {
  it('labels each segment large enough to hold text with its formatted value', () => {
    const { container } = renderStacked(concentration)
    const texts = Array.from(container.querySelectorAll('svg text')).map((t) => t.textContent)
    expect(texts).toContain('55%')
    expect(texts).toContain('45%')
    expect(texts).toContain('50%')
  })

  it('omits the in-bar label for a segment too short to hold text', () => {
    const spec: StackedSpec = {
      ...concentration,
      data: [{ label: 'Articles', top10: 99, rest: 1 }],
    }
    const { container } = renderStacked(spec)
    const texts = Array.from(container.querySelectorAll('svg text')).map((t) => t.textContent)
    expect(texts).not.toContain('1%')
    expect(texts).toContain('99%')
  })

  it('renders a reference marker when chart.reference is set', () => {
    const { container } = renderStacked({
      ...concentration,
      reference: { value: 50, label: 'Parity' },
    })
    expect(container.querySelector('line[stroke-dasharray="5 3"]')).toBeInTheDocument()
  })

  it('renders no reference marker when chart.reference is unset', () => {
    const { container } = renderStacked(concentration)
    expect(container.querySelector('line[stroke-dasharray="5 3"]')).not.toBeInTheDocument()
  })
})
