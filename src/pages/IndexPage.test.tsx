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

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(DOCUMENTS.length)

    for (const entry of DOCUMENTS) {
      const link = screen.getByRole('link', { name: new RegExp(entry.navTitle, 'i') })
      expect(link).toHaveAttribute('href', `/${entry.doc.slug}`)
    }
  })
})
