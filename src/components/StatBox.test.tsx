import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import type { Claim } from '../types/content'
import type { StatBox as StatBoxData } from '../types/document'
import { DocumentProvider } from './DocumentProvider'
import { ClaimDrawerProvider } from './EvidenceDrawer'
import { StatBox } from './StatBox'

const claim = (status: Claim['verificationStatus']): Claim => ({
  id: `c-${status}`,
  kind: 'statistic',
  claimText: `A ${status} claim`,
  verificationStatus: status,
})

function renderStat(stat: StatBoxData, claims: Record<string, Claim> = {}) {
  return render(
    <DocumentProvider claims={claims}>
      <ClaimDrawerProvider>
        <StatBox stat={stat} />
      </ClaimDrawerProvider>
    </DocumentProvider>,
  )
}

describe('StatBox', () => {
  it('renders plain, non-interactive content when there is no claim', () => {
    renderStat({ value: '460 TWh', description: 'Annual demand' })
    expect(screen.getByText('460 TWh')).toBeInTheDocument()
    expect(screen.getByText('Annual demand')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText('View evidence')).not.toBeInTheDocument()
  })

  it.each(['pending', 'verified', 'disputed', 'unverified'] as const)(
    'marks a %s claim with the matching data-verification status',
    (status) => {
      const c = claim(status)
      renderStat({ value: '167', description: 'Something checkable', claimId: c.id }, { [c.id]: c })
      expect(screen.getByRole('button')).toHaveAttribute('data-verification', status)
    },
  )

  it('shows the View evidence affordance once a claim is attached', () => {
    const c = claim('verified')
    renderStat({ value: '167', description: 'Something checkable', claimId: c.id }, { [c.id]: c })
    expect(screen.getByText('View evidence')).toBeInTheDocument()
  })

  it('opens the evidence drawer for its claim on click', () => {
    const c = claim('verified')
    renderStat({ value: '167', description: 'Something checkable', claimId: c.id }, { [c.id]: c })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Verified')).toBeInTheDocument()
  })

  it('starts not yet revealed, before the scroll observer fires', () => {
    // jsdom's IntersectionObserver stub (test/setup.ts) never invokes its
    // callback, so this exercises the hook's default state, the same way
    // RoundNav.test.tsx checks default state against the same stub.
    renderStat({ value: '167', description: 'Something checkable' })
    const box = screen.getByText('167').closest('.stat-box')
    expect(box).toHaveAttribute('data-revealed', 'false')
  })
})
