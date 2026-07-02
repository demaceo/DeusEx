import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import { IndexPage } from './IndexPage'

describe('IndexPage', () => {
  it('renders one card linking to each document', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )

    for (const entry of DOCUMENTS) {
      const link = screen.getByRole('link', { name: new RegExp(entry.navTitle, 'i') })
      expect(link).toHaveAttribute('href', `/${entry.doc.slug}`)
    }
  })

  it('tints each part link with its own masthead accent color', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    for (const entry of DOCUMENTS) {
      const link = screen.getByRole('link', { name: new RegExp(entry.navTitle, 'i') })
      expect(link).toHaveAttribute('data-accent', entry.doc.masthead.accentColor)
    }
  })

  it('shows the live document count rather than a hardcoded number', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    expect(screen.getByText(new RegExp(`^${DOCUMENTS.length} documents`))).toBeInTheDocument()
  })

  it('links to the verification ledger', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /evidence ledger/i })
    expect(link).toHaveAttribute('href', '/verification')
  })

  it('links to the chart catalog', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /chart in the series/i })
    expect(link).toHaveAttribute('href', '/charts')
  })

  it('links to the voice crossings view', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /voice crossings/i })
    expect(link).toHaveAttribute('href', '/voices')
  })

  it('groups the panel into stance bands with correct voice counts', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    const bands: Array<[string, number]> = [
      ['The Optimists', PERSONA_ORDER.filter((id) => PERSONAS[id].stance === 'optimist').length],
      [
        'The Neutral & Independent',
        PERSONA_ORDER.filter((id) => PERSONAS[id].stance === 'neutral').length,
      ],
      ['The Critics', PERSONA_ORDER.filter((id) => PERSONAS[id].stance === 'critic').length],
    ]
    for (const [heading, count] of bands) {
      expect(count).toBeGreaterThan(0)
      const el = screen.getByRole('heading', { level: 3, name: new RegExp(`^${heading}`) })
      expect(el).toHaveTextContent(`${count} voice`)
    }
  })

  it('links every persona in the panel to their voice thread', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    for (const id of PERSONA_ORDER) {
      const link = screen.getByRole('link', { name: new RegExp(PERSONAS[id].name, 'i') })
      expect(link).toHaveAttribute('href', `/voices/${id}`)
    }
  })
})
