import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartSkeleton } from './ChartSkeleton'

describe('ChartSkeleton', () => {
  it('announces the wait instead of rendering an aria-hidden void', () => {
    const { container } = render(<ChartSkeleton />)

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading chart')).toBeInTheDocument()
    // The whole placeholder used to carry aria-hidden, so nothing reached AT.
    expect(container.querySelector('[aria-hidden="true"]')).not.toBe(container.firstChild)
  })

  it('stays silent where many mount at once, without going invisible to AT', () => {
    render(<ChartSkeleton announce={false} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByText('Loading chart')).toBeInTheDocument()
  })

  it('draws uneven bars so it reads as a chart rather than a rule', () => {
    const { container } = render(<ChartSkeleton />)
    const bars = Array.from(container.querySelectorAll('.chart-skeleton__bar'))

    expect(bars.length).toBeGreaterThan(1)
    const heights = bars.map((b) => (b as HTMLElement).style.height)
    expect(new Set(heights).size).toBeGreaterThan(1)
  })

  it('carries the variant so the carousel and a figure size differently', () => {
    const { container: block } = render(<ChartSkeleton />)
    expect(block.querySelector('.chart-skeleton--block')).toBeInTheDocument()

    const { container: thumb } = render(<ChartSkeleton variant="thumb" />)
    expect(thumb.querySelector('.chart-skeleton--thumb')).toBeInTheDocument()
  })
})
