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

  it('keeps the active chip in horizontal view without moving page scroll', () => {
    const listScrollTo = vi.fn()
    // jsdom implements no element scrolling at all, so Element.prototype.scrollTo
    // has to be installed rather than spied on.
    const proto = Object.getPrototypeOf(document.createElement('ol')) as Record<string, unknown>
    proto.scrollTo = listScrollTo
    const windowScrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    try {
      render(<RoundNav items={items} accentColor="teal" />)

      // The strip scrolls itself. Page scroll is never touched, so tracking the
      // reader's position can't yank them mid-scroll.
      expect(listScrollTo).toHaveBeenCalled()
      expect(listScrollTo.mock.calls[0][0]).toMatchObject({ behavior: 'smooth' })
      expect(windowScrollTo).not.toHaveBeenCalled()
    } finally {
      delete proto.scrollTo
      windowScrollTo.mockRestore()
    }
  })

  it('survives an engine with no element scrolling rather than throwing', () => {
    // The jsdom default: Element.prototype.scrollTo is undefined.
    expect(Object.getPrototypeOf(document.createElement('ol')).scrollTo).toBeUndefined()
    expect(() => render(<RoundNav items={items} accentColor="teal" />)).not.toThrow()
  })

  it('renders one shared list for both layouts rather than duplicating the nav', () => {
    const { container } = render(<RoundNav items={items} accentColor="teal" />)
    expect(container.querySelectorAll('.round-nav')).toHaveLength(1)
    expect(container.querySelectorAll('.round-nav__list')).toHaveLength(1)
    expect(container.querySelectorAll('.round-nav__link')).toHaveLength(items.length)
  })
})
