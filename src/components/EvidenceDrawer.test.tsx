import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { Claim, Source } from '../types/content'
import { DocumentProvider } from './DocumentProvider'
import { ClaimDrawerProvider } from './EvidenceDrawer'
import { Citation } from './Citation'

const claims: Record<string, Claim> = {
  c1: {
    id: 'c1',
    kind: 'citation',
    claimText: 'A checkable assertion',
    sourceId: 'src-1',
    verificationStatus: 'verified',
    verifiedUrl: 'https://example.org/proof',
    note: 'Confirmed against the primary source.',
    lastCheckedISO: '2026-06-27',
  },
}

const sources: Source[] = [
  { id: 'src-1', title: 'Example Source', description: 'A primary reference.' },
]

function renderCitation() {
  return render(
    <DocumentProvider claims={claims} sources={sources}>
      <ClaimDrawerProvider>
        <Citation claimId="c1" />
      </ClaimDrawerProvider>
    </DocumentProvider>,
  )
}

describe('EvidenceDrawer', () => {
  it('opens with the claim, source, note, and primary-source link on click', () => {
    renderCitation()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('A checkable assertion'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Example Source')).toBeInTheDocument()
    expect(screen.getByText('Confirmed against the primary source.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view primary source/i })).toHaveAttribute(
      'href',
      'https://example.org/proof',
    )
  })

  it('closes on the close button', () => {
    renderCitation()

    fireEvent.click(screen.getByText('A checkable assertion'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close evidence panel/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
