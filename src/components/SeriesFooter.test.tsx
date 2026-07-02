import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SeriesFooter } from './SeriesFooter'

const prev = { slug: 'real-costs', partLabel: 'Part I', navTitle: 'A Roundtable on Real Costs' }
const next = {
  slug: 'whats-being-done',
  partLabel: 'Part II',
  navTitle: "What's Actually Being Done",
}

describe('SeriesFooter', () => {
  it('links to the next and previous parts, the index, and the ledger', () => {
    render(
      <MemoryRouter>
        <SeriesFooter prev={prev} next={next} accentColor="teal" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: new RegExp(next.navTitle, 'i') })).toHaveAttribute(
      'href',
      `/${next.slug}`,
    )
    expect(screen.getByRole('link', { name: new RegExp(prev.navTitle, 'i') })).toHaveAttribute(
      'href',
      `/${prev.slug}`,
    )
    expect(screen.getByRole('link', { name: /series index/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /evidence ledger/i })).toHaveAttribute(
      'href',
      '/verification',
    )
  })

  it('carries the document accent color for CSS to resolve --masthead-accent', () => {
    const { container } = render(
      <MemoryRouter>
        <SeriesFooter prev={prev} next={next} accentColor="teal" />
      </MemoryRouter>,
    )
    expect(container.querySelector('.series-footer')).toHaveAttribute('data-accent', 'teal')
  })
})
