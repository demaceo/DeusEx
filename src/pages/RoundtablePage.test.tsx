import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS, getDocumentBySlug } from '../data/documents'
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
    expect(screen.getByText(/independently checked against primary sources/i)).toBeInTheDocument()
  })
})

describe('verification notice reflects claim statuses', () => {
  it('shows Part I as fact-checked with a verified count', () => {
    const partI = getDocumentBySlug('real-costs')!
    const summary = summarizeClaimStatuses(partI.claims)
    expect(summary.pending).toBe(0)
    expect(summary.verified).toBeGreaterThan(0)

    render(
      <MemoryRouter>
        <RoundtablePage document={partI} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Fact-checked')).toBeInTheDocument()
    expect(screen.getByText(`${summary.verified} verified`)).toBeInTheDocument()
  })
})
