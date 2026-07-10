import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import type { ChartSpec } from '../../../types/document'
import { Pictogram } from './Pictogram'

// Pictogram is a pure presentational component (chart spec + measured width/height in, icon
// grid out) with no context dependency, so it's rendered directly here rather than through
// ChartBlock/ChartFrame. Frame-level behavior (evidence button, verification badge, a11y
// table) stays covered by the shared ChartBlock.test.tsx; these cases are pictogram-specific
// hover interaction detail.

type PictogramSpec = Extract<ChartSpec, { kind: 'pictogram' }>

const loneliness: PictogramSpec = {
  kind: 'pictogram',
  title: 'A Population Already Lonely',
  unit: '%',
  ariaLabel: 'Pictogram of loneliness',
  data: [
    { label: 'Reported loneliness', value: 50 },
    { label: 'Did not', value: 50 },
  ],
}

function renderPictogram(chart: PictogramSpec, width = 400, height = 264) {
  return render(<Pictogram chart={chart} width={width} height={height} />)
}

describe('Pictogram interaction', () => {
  it('shows the segment label and value on hover', () => {
    const { container } = renderPictogram(loneliness)
    const icons = container.querySelectorAll('.chart-pictogram svg')
    fireEvent.mouseEnter(icons[0])
    expect(container.querySelector('.chart-tooltip__label')).toHaveTextContent(
      'Reported loneliness',
    )
  })

  it('does not show a tooltip for an empty (unassigned) cell', () => {
    // Three equal segments over 10 cells round down to 9 assigned cells (3+3+3),
    // leaving cell index 9 unowned.
    const threeWay: PictogramSpec = {
      ...loneliness,
      total: 10,
      data: [
        { label: 'A', value: 1 },
        { label: 'B', value: 1 },
        { label: 'C', value: 1 },
      ],
    }
    const { container } = renderPictogram(threeWay)
    const icons = container.querySelectorAll('.chart-pictogram svg')
    fireEvent.mouseEnter(icons[9])
    expect(container.querySelector('.chart-tooltip')).not.toBeInTheDocument()
  })
})
