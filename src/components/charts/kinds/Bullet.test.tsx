import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import type { ChartSpec } from '../../../types/document'
import { Bullet } from './Bullet'

// Bullet is a pure presentational component (chart spec + measured width/height in, SVG out)
// with no context dependency, so it's rendered directly here rather than through
// ChartBlock/ChartFrame. Frame-level behavior (evidence button, verification badge, a11y
// table) stays covered by the shared ChartBlock.test.tsx; these cases are bullet-specific
// rendering detail.

type BulletSpec = Extract<ChartSpec, { kind: 'bullet' }>

const tutor: BulletSpec = {
  kind: 'bullet',
  title: 'AI tutor',
  unit: 'score',
  target: 3.5,
  targetLabel: 'Baseline',
  ariaLabel: 'AI tutor bullet',
  data: [{ label: 'AI tutor', value: 4.5 }],
}

function renderBullet(chart: BulletSpec, width = 500, height = 150) {
  return render(<Bullet chart={chart} width={width} height={height} />)
}

describe('Bullet rendering', () => {
  it('draws the target marker after the row bars, so it paints on top of them', () => {
    const { container } = renderBullet(tutor)
    const group = container.querySelector('svg > g') as SVGGElement
    const children = Array.from(group.children)
    const lineIndex = children.findIndex((el) => el.tagName === 'line')
    const lastRowGroupIndex = children.reduce((last, el, i) => (el.tagName === 'g' ? i : last), -1)
    expect(lineIndex).toBeGreaterThan(lastRowGroupIndex)
  })

  it('renders the dashed target marker and its label', () => {
    const { container } = renderBullet(tutor)
    expect(container.querySelector('line[stroke-dasharray="4 3"]')).toBeInTheDocument()
    const texts = Array.from(container.querySelectorAll('svg text')).map((t) => t.textContent)
    expect(texts).toContain('Baseline 3.5 score')
  })
})
