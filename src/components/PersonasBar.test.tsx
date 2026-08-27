import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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
    expect(screen.getAllByRole('group')).toHaveLength(PERSONA_ORDER.length)
  })

  it('links each chip to its profile as a collapsed disclosure', () => {
    renderBar()
    for (const id of PERSONA_ORDER) {
      const persona = PERSONAS[id]
      const button = screen.getByRole('button', { name: persona.name })
      expect(button).toHaveAttribute('aria-controls', `persona-profile-${id}`)
      expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('opens a persona profile on tap, the only path a touchscreen has', () => {
    renderBar()
    const button = screen.getByRole('button', { name: PERSONAS.skeptic.name })

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button.closest('.persona-tag-wrap')?.getAttribute('data-open')).toBe('true')
  })

  it('closes an open profile from the card, Escape, and an outside tap', () => {
    renderBar()
    const button = screen.getByRole('button', { name: PERSONAS.skeptic.name })

    fireEvent.click(button)
    fireEvent.click(screen.getByRole('button', { name: `Close ${PERSONAS.skeptic.name} profile` }))
    expect(button).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(button)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(button)
    fireEvent.pointerDown(document.body)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders an icon (svg, not emoji) in each persona profile', () => {
    const { container } = render(
      <MemoryRouter>
        <PersonasBar />
      </MemoryRouter>,
    )
    expect(container.querySelectorAll('.persona-profile__icon svg')).toHaveLength(
      PERSONA_ORDER.length,
    )
  })

  it('shows only the given subset of personas when personaIds is passed', () => {
    render(
      <MemoryRouter>
        <PersonasBar personaIds={['skeptic', 'artist']} label="The panel" />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('group')).toHaveLength(2)
    expect(screen.getByText('The panel')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: PERSONAS.skeptic.name })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: PERSONAS['tech-optimist'].name }),
    ).not.toBeInTheDocument()
  })

  it('summarises the panel as a count so the chips can collapse on a phone', () => {
    renderBar()
    const toggle = screen.getByRole('button', {
      name: new RegExp(`${PERSONA_ORDER.length} voices`, 'i'),
    })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls')
  })

  it('expands and re-collapses the panel on tap', () => {
    renderBar()
    const toggle = screen.getByRole('button', {
      name: new RegExp(`${PERSONA_ORDER.length} voices`, 'i'),
    })

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle.closest('.personas-bar')).toHaveAttribute('data-open', 'true')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle.closest('.personas-bar')).not.toHaveAttribute('data-open')
  })

  it('names the panel from the label when one is given, and counts the subset', () => {
    render(
      <MemoryRouter>
        <PersonasBar personaIds={['skeptic', 'artist']} label="The panel" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: /the panel · 2 voices/i })).toBeInTheDocument()
  })

  it('keeps every chip in the DOM while collapsed, so the panel stays reachable', () => {
    renderBar()
    // Collapsing is presentational: the chips are hidden by CSS at narrow widths,
    // never unmounted, so assistive tech and search still reach the full cast.
    expect(screen.getAllByRole('group')).toHaveLength(PERSONA_ORDER.length)
  })
})
