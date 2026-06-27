import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
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

  it('links to the verification ledger', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /evidence ledger/i })
    expect(link).toHaveAttribute('href', '/verification')
  })
})
