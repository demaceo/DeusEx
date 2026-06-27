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
})
