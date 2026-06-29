import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { partI } from '../data/parts/part-i'
import { partII } from '../data/parts/part-ii'
import { summarizeClaimStatuses } from '../data/claimSummary'
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
    expect(screen.getByText('View all →')).toBeInTheDocument()
  })
})

describe('verification notice reflects claim statuses', () => {
  // Every document has been fact-checked (no pending claims).
  describe.each(DOCUMENTS.map((entry) => entry.doc))('document $id is fully checked', (doc) => {
    it('shows as fact-checked with a verified count', () => {
      const summary = summarizeClaimStatuses(doc.claims)
      expect(summary.pending).toBe(0)
      expect(summary.verified).toBeGreaterThan(0)

      render(
        <MemoryRouter>
          <RoundtablePage document={doc} />
        </MemoryRouter>,
      )
      expect(screen.getByText(`${summary.verified} verified`)).toBeInTheDocument()
    })
  })
})

describe('RoundtablePage scroll-to-top', () => {
  it('scrolls to the top on mount and when the document changes', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const { rerender } = render(
      <MemoryRouter>
        <RoundtablePage document={partI} />
      </MemoryRouter>,
    )
    expect(scrollTo).toHaveBeenCalledWith(0, 0)

    scrollTo.mockClear()
    rerender(
      <MemoryRouter>
        <RoundtablePage document={partII} />
      </MemoryRouter>,
    )
    expect(scrollTo).toHaveBeenCalledWith(0, 0)

    scrollTo.mockRestore()
  })
})
