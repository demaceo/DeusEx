import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PERSONAS } from '../data/personas'
import type { DebateEntry as DebateEntryData } from '../types/document'
import { DebateEntry } from './DebateEntry'

const turn = (personaId: DebateEntryData['personaId'], text: string): DebateEntryData => ({
  personaId,
  bubble: { paragraphs: [[{ type: 'text', value: text }]] },
})

describe('DebateEntry', () => {
  it('does not render the old inline role tag', () => {
    const { container } = render(
      <MemoryRouter>
        <DebateEntry entry={turn('tech-optimist', 'Hello.')} />
      </MemoryRouter>,
    )
    expect(container.querySelector('.speaker-role')).not.toBeInTheDocument()
  })

  it('exposes a profile trigger with role/focus/bio for the first turn of a speaker', () => {
    const persona = PERSONAS['tech-optimist']
    const { container } = render(
      <MemoryRouter>
        <DebateEntry entry={turn('tech-optimist', 'Hello.')} isFirstOfSpeaker />
      </MemoryRouter>,
    )
    const trigger = screen.getByRole('button', { name: `${persona.name}: view profile` })
    expect(trigger.getAttribute('aria-describedby')).toBeTruthy()
    expect(screen.getByText(persona.role)).toBeInTheDocument()
    expect(screen.getByText(persona.focus)).toBeInTheDocument()
    expect(screen.getByText(persona.bio)).toBeInTheDocument()
    expect(container.querySelector('.debate-entry__rail')).not.toHaveAttribute('aria-hidden')
  })

  it('does not render a profile trigger for continuation turns', () => {
    const { container } = render(
      <MemoryRouter>
        <DebateEntry entry={turn('tech-optimist', 'More.')} isFirstOfSpeaker={false} />
      </MemoryRouter>,
    )
    expect(screen.queryByRole('button', { name: /view profile/i })).not.toBeInTheDocument()
    expect(container.querySelector('.debate-entry__dot')).toBeInTheDocument()
    expect(container.querySelector('.debate-entry__rail')).toHaveAttribute('aria-hidden', 'true')
  })

  it('gives two turns by the same persona in one render distinct tooltip ids', () => {
    const { container } = render(
      <MemoryRouter>
        <DebateEntry entry={turn('tech-optimist', 'First.')} isFirstOfSpeaker turnIndex={0} />
        <DebateEntry
          entry={turn('tech-optimist', 'Second, later.')}
          isFirstOfSpeaker
          turnIndex={1}
        />
      </MemoryRouter>,
    )
    const ids = Array.from(container.querySelectorAll('[role="tooltip"]')).map((el) => el.id)
    expect(ids).toHaveLength(2)
    expect(ids.every(Boolean)).toBe(true)
    expect(new Set(ids).size).toBe(2)
  })
})
