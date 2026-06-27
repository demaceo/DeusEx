import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { VerificationPage } from './VerificationPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <VerificationPage />
    </MemoryRouter>,
  )
}

describe('VerificationPage', () => {
  it('links to every document in the series', () => {
    renderPage()
    for (const entry of DOCUMENTS) {
      const link = screen.getByRole('link', {
        name: new RegExp(`${entry.partLabel} — ${entry.navTitle}`, 'i'),
      })
      expect(link).toHaveAttribute('href', `/${entry.doc.slug}`)
    }
  })

  it('filters claims by status — no document has pending claims', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /^pending$/i }))
    // Every document is fully checked, so each renders an empty-state row.
    expect(screen.getAllByText(/no pending claims here/i)).toHaveLength(DOCUMENTS.length)
  })
})
