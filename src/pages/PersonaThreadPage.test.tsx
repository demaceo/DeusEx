import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { getPersonaThread } from '../data/documents'
import { PersonaThreadPage } from './PersonaThreadPage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/voices/:personaId" element={<PersonaThreadPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('PersonaThreadPage', () => {
  it("collects a persona's bubbles across the series", () => {
    renderAt('/voices/skeptic')

    // Header names the persona.
    expect(screen.getByRole('heading', { level: 1, name: 'Skeptic' })).toBeInTheDocument()

    // It renders as many round labels as the helper finds bubbles for the persona.
    const groups = getPersonaThread('skeptic')
    const totalEntries = groups.reduce((n, g) => n + g.entries.length, 0)
    expect(totalEntries).toBeGreaterThan(0)
    expect(screen.getAllByText(/^Round/i).length).toBe(totalEntries)
  })

  it('renders NotFound for an unknown persona', () => {
    renderAt('/voices/not-a-persona')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})
