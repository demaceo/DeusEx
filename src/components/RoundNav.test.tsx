import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { RoundNav, type RoundNavItem } from './RoundNav'

const items: RoundNavItem[] = [
  { id: 'round-1', label: 'Round I', title: 'Energy' },
  { id: 'round-2', label: 'Round II', title: 'Water' },
]

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true, writable: true })
}

describe('RoundNav', () => {
  beforeEach(() => {
    setScrollY(0)
    // Run rAF callbacks synchronously so scroll handling is deterministic in tests.
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

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

  it('stays hidden until the masthead collapses', () => {
    const { container } = render(<RoundNav items={items} accentColor="teal" />)
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-visible', 'false')

    act(() => {
      setScrollY(200)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-visible', 'true')
  })

  it('renders already visible when the page mounts already scrolled past the collapse threshold', () => {
    setScrollY(200)
    const { container } = render(<RoundNav items={items} accentColor="teal" />)
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-visible', 'true')
  })

  it('hides again when scrolling back above the collapse threshold', () => {
    setScrollY(200)
    const { container } = render(<RoundNav items={items} accentColor="teal" />)
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-visible', 'true')

    act(() => {
      setScrollY(0)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(container.querySelector('.round-nav')).toHaveAttribute('data-visible', 'false')
  })
})
