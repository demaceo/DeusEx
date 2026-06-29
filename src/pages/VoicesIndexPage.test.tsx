import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { VoicesIndexPage } from './VoicesIndexPage'

describe('VoicesIndexPage', () => {
  it('renders the series-wide crossings overview', () => {
    render(
      <MemoryRouter>
        <VoicesIndexPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /the crossings/i })).toBeInTheDocument()
    // The environmentalist broke from type (Part III), so it heads a group, linked to its thread.
    const link = screen.getByRole('link', { name: 'Environmentalist' })
    expect(link).toHaveAttribute('href', '/voices/environmentalist')
    // Its crossings carry the concession move label.
    expect(screen.getAllByText(/Takes the optimistic side/i).length).toBeGreaterThan(0)
  })
})
