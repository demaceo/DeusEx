import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { RoundtablePage } from './RoundtablePage'

describe.each(DOCUMENTS.map((entry) => entry.doc))('RoundtablePage renders $id', (doc) => {
  it('shows the masthead subtitle, sources, and the verification notice', () => {
    render(
      <MemoryRouter>
        <RoundtablePage document={doc} />
      </MemoryRouter>,
    )
    expect(screen.getByText(doc.masthead.subtitle)).toBeInTheDocument()
    expect(screen.getByText('Primary Sources Referenced')).toBeInTheDocument()
    expect(screen.getByText(/pending independent verification/i)).toBeInTheDocument()
  })
})
