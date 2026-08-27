import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DebateNavFAB } from './DebateNavFAB'
import { DOCUMENTS } from '../data/documents'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <DebateNavFAB accentColor="teal" />
    </MemoryRouter>,
  )
}

const current = DOCUMENTS[2]

describe('DebateNavFAB', () => {
  it('starts closed and opens on the trigger', () => {
    renderAt(`/${current.doc.slug}`)
    const trigger = screen.getByRole('button', { name: /browse all debates/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /all debates/i })).toBeInTheDocument()
  })

  it('marks the part the reader is in, so the panel is a position not a fresh choice', () => {
    renderAt(`/${current.doc.slug}`)
    fireEvent.click(screen.getByRole('button', { name: /browse all debates/i }))

    const link = screen.getByRole('link', { current: 'page' })
    expect(link).toHaveAttribute('href', `/${current.doc.slug}`)
    expect(link).toHaveTextContent(/you are here/i)
  })

  it('marks nothing when the reader is not on a part page', () => {
    renderAt('/verification')
    fireEvent.click(screen.getByRole('button', { name: /browse all debates/i }))

    expect(screen.queryByRole('link', { current: 'page' })).not.toBeInTheDocument()
  })

  it('lists every part exactly once, under a heading that states the count', () => {
    renderAt(`/${current.doc.slug}`)
    fireEvent.click(screen.getByRole('button', { name: /browse all debates/i }))

    expect(screen.getAllByRole('link')).toHaveLength(DOCUMENTS.length)
    expect(screen.getByText(`All parts · ${DOCUMENTS.length}`)).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    renderAt(`/${current.doc.slug}`)
    const trigger = screen.getByRole('button', { name: /browse all debates/i })
    fireEvent.click(trigger)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
