import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { unfilteredI } from '../data/comics/unfiltered-i'
import { PERSONAS } from '../data/personas'
import { ComicPage } from './ComicPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ComicPage comic={unfilteredI} />
    </MemoryRouter>,
  )
}

describe('ComicPage', () => {
  it('renders the cover title and subtitle', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/roundtable/i)
    expect(screen.getByText(unfilteredI.cover.subtitle)).toBeInTheDocument()
  })

  it('scopes the page under the comic design system attribute', () => {
    const { container } = renderPage()
    expect(container.querySelector("[data-series='roundtable-reckoning']")).not.toBeNull()
  })

  it('renders an anchored section per scene', () => {
    const { container } = renderPage()
    for (const scene of unfilteredI.scenes) {
      expect(container.querySelector(`#${scene.id}`)).not.toBeNull()
    }
  })

  it('introduces the comic cast and the guest panelists', () => {
    renderPage()
    expect(screen.getAllByText('The Researcher').length).toBeGreaterThan(0)
    expect(screen.getAllByText('The Chorus').length).toBeGreaterThan(0)
    for (const guest of unfilteredI.guests) {
      expect(screen.getAllByText(PERSONAS[guest].name).length).toBeGreaterThan(0)
    }
  })

  it('renders every panel with its reveal gate and its content in the document', () => {
    // The reveal is CSS-only (opacity/transform), so panel content must be
    // present and readable regardless of the data-revealed state.
    const { container } = renderPage()
    const panels = container.querySelectorAll('.comic-panel')
    expect(panels.length).toBeGreaterThan(0)
    for (const panel of panels) {
      expect(panel.classList.contains('comic-reveal')).toBe(true)
      expect(panel.hasAttribute('data-revealed')).toBe(true)
    }
    expect(screen.getByText(/final score/i)).toBeInTheDocument()
  })

  it('renders the sources plate with the thread source', () => {
    renderPage()
    expect(screen.getByText('BlueSky reply thread, screenshot, 2026')).toBeInTheDocument()
  })

  it('links back to the episode index and the essay series', () => {
    renderPage()
    expect(screen.getByRole('link', { name: /all episodes/i })).toHaveAttribute(
      'href',
      '/unfiltered',
    )
    expect(screen.getByRole('link', { name: /the ai reckoning series/i })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
