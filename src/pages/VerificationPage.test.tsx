import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { summarizeClaimStatuses } from '../data/claimSummary'
import { VerificationPage } from './VerificationPage'

function renderAt(path = '/verification') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <VerificationPage />
    </MemoryRouter>,
  )
}

const aggregateTotal = DOCUMENTS.reduce(
  (n, entry) => n + summarizeClaimStatuses(entry.doc.claims).total,
  0,
)

describe('VerificationPage', () => {
  it('links to every document in the series', () => {
    renderAt()
    for (const entry of DOCUMENTS) {
      const link = screen.getByRole('link', {
        name: new RegExp(`${entry.partLabel} — ${entry.navTitle}`, 'i'),
      })
      expect(link).toHaveAttribute('href', `/${entry.doc.slug}`)
    }
  })

  it('shows a count on each filter chip', () => {
    renderAt()
    // The "All claims" chip carries the series-wide total.
    const allChip = screen.getByRole('button', { name: /all claims/i })
    expect(allChip).toHaveTextContent(String(aggregateTotal))
  })

  it('honors a ?status= filter from the URL', () => {
    // No document has pending claims, so a pending deep-link empties every section.
    renderAt('/verification?status=pending')
    expect(screen.getAllByText(/no pending claims here/i)).toHaveLength(DOCUMENTS.length)
  })
})
