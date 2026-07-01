import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Masthead } from './Masthead'
import type { Masthead as MastheadData } from '../types/document'
import type { PartNavTarget } from '../data/documents'

const masthead: MastheadData = {
  overline: 'Overline text',
  titleLines: [[{ text: 'The ' }, { text: 'Title', em: true }]],
  subtitle: 'A subtitle sentence.',
  dateLine: 'Updated 2026',
  accentColor: 'accent',
}

const prev: PartNavTarget = {
  slug: 'getting-right',
  partLabel: 'Part III',
  navTitle: "What It's Actually Getting Right",
}
const next: PartNavTarget = {
  slug: 'whats-being-done',
  partLabel: 'Part II',
  navTitle: "What's Actually Being Done",
}

function renderMasthead() {
  return render(
    <MemoryRouter>
      <Masthead masthead={masthead} prev={prev} next={next} />
    </MemoryRouter>,
  )
}

describe('Masthead navigation arrows', () => {
  it('renders prev/next arrows linking to the adjacent parts with accessible labels', () => {
    renderMasthead()
    const prevLink = screen.getByRole('link', {
      name: "Previous part, Part III: What It's Actually Getting Right",
    })
    const nextLink = screen.getByRole('link', {
      name: "Next part, Part II: What's Actually Being Done",
    })
    expect(prevLink).toHaveAttribute('href', '/getting-right')
    expect(nextLink).toHaveAttribute('href', '/whats-being-done')
  })

  it('still renders the title and subtitle', () => {
    renderMasthead()
    expect(screen.getByText('A subtitle sentence.')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
