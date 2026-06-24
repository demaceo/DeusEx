import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Claim } from '../types/content'
import { DocumentProvider } from './DocumentProvider'
import { Citation } from './Citation'

const claims: Record<string, Claim> = {
  c1: {
    id: 'c1',
    kind: 'citation',
    claimText: '[Example Source, 2026]',
    verificationStatus: 'pending',
  },
}

describe('Citation', () => {
  it('renders the claim text and exposes the verification status', () => {
    render(
      <DocumentProvider claims={claims}>
        <Citation claimId="c1" />
      </DocumentProvider>,
    )
    const cite = screen.getByText('[Example Source, 2026]')
    expect(cite).toBeInTheDocument()
    expect(cite).toHaveAttribute('data-verification', 'pending')
  })

  it('falls back to the claimId when the claim is unknown', () => {
    render(
      <DocumentProvider claims={claims}>
        <Citation claimId="missing" />
      </DocumentProvider>,
    )
    expect(screen.getByText('missing')).toHaveAttribute('data-verification', 'pending')
  })
})
