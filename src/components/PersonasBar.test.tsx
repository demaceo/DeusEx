import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import { PersonasBar } from './PersonasBar'

const renderBar = () =>
  render(
    <MemoryRouter>
      <PersonasBar />
    </MemoryRouter>,
  )

describe('PersonasBar persona profiles', () => {
  it('renders a profile (role, focus, bio) for every persona', () => {
    renderBar()
    for (const id of PERSONA_ORDER) {
      const persona = PERSONAS[id]
      expect(screen.getByText(persona.role)).toBeInTheDocument()
      expect(screen.getByText(persona.focus)).toBeInTheDocument()
      expect(screen.getByText(persona.bio)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('tooltip')).toHaveLength(PERSONA_ORDER.length)
  })

  it('links each chip to its profile via aria-describedby', () => {
    renderBar()
    for (const id of PERSONA_ORDER) {
      const persona = PERSONAS[id]
      const button = screen.getByRole('button', { name: new RegExp(persona.name, 'i') })
      expect(button).toHaveAttribute('aria-describedby', `persona-profile-${id}`)
    }
  })

  it('renders an icon (svg, not emoji) in each persona profile', () => {
    const { container } = render(
      <MemoryRouter>
        <PersonasBar />
      </MemoryRouter>,
    )
    expect(container.querySelectorAll('svg')).toHaveLength(PERSONA_ORDER.length)
  })

  it('shows only the given subset of personas when personaIds is passed', () => {
    render(
      <MemoryRouter>
        <PersonasBar personaIds={['skeptic', 'artist']} label="The panel" />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('tooltip')).toHaveLength(2)
    expect(screen.getByText('The panel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /skeptic/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /tech optimist/i })).not.toBeInTheDocument()
  })
})
