import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { RoundNav, type RoundNavItem } from './RoundNav'

const items: RoundNavItem[] = [
  { id: 'round-1', label: 'Round I', title: 'Energy' },
  { id: 'round-2', label: 'Round II', title: 'Water' },
]

describe('RoundNav', () => {
  it('lists every round with its label and title', () => {
    render(<RoundNav items={items} accentColor="teal" />)
    expect(screen.getByText('Round I')).toBeInTheDocument()
    expect(screen.getByText('Energy')).toBeInTheDocument()
    expect(screen.getByText('Round II')).toBeInTheDocument()
    expect(screen.getByText('Water')).toBeInTheDocument()
  })

  it('marks the first round active by default', () => {
    render(<RoundNav items={items} accentColor="teal" />)
    const first = screen.getByRole('button', { name: /Energy/i })
    expect(first).toHaveAttribute('data-active', 'true')
    expect(first).toHaveAttribute('aria-current', 'true')
  })

  it('does not throw when a round is clicked (scrolls into view)', () => {
    render(<RoundNav items={items} accentColor="teal" />)
    expect(() => fireEvent.click(screen.getByRole('button', { name: /Water/i }))).not.toThrow()
  })

  it('carries the document accent color for CSS to resolve --masthead-accent', () => {
    const { container } = render(<RoundNav items={items} accentColor="teal" />)
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-accent', 'teal')
  })
})
