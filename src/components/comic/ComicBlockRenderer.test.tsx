import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ComicBlock } from '../../types/comic'
import { ComicBlockRenderer } from './ComicBlockRenderer'

function renderBlock(block: ComicBlock) {
  return render(<ComicBlockRenderer block={block} />)
}

describe('ComicBlockRenderer', () => {
  it('renders a caption plate', () => {
    renderBlock({ type: 'caption', data: { text: 'Meanwhile, in the quote tweets...' } })
    expect(screen.getByText('Meanwhile, in the quote tweets...')).toBeInTheDocument()
  })

  it('renders a cast speech bubble with the speaker chip', () => {
    renderBlock({
      type: 'speech',
      data: {
        speaker: { kind: 'cast', castId: 'the-researcher' },
        paragraphs: [[{ type: 'text', value: 'What could go wrong?' }]],
      },
    })
    expect(screen.getByText('The Researcher')).toBeInTheDocument()
    expect(screen.getByText('What could go wrong?')).toBeInTheDocument()
  })

  it('renders a guest persona speech bubble with the canonical persona name', () => {
    renderBlock({
      type: 'speech',
      data: {
        speaker: { kind: 'persona', personaId: 'skeptic' },
        paragraphs: [[{ type: 'text', value: 'Show me the evidence.' }]],
      },
    })
    expect(screen.getByText('Skeptic')).toBeInTheDocument()
  })

  it('renders cite nodes as footnote links to the sources plate', () => {
    renderBlock({
      type: 'speech',
      data: {
        speaker: { kind: 'cast', castId: 'the-researcher' },
        paragraphs: [
          [
            { type: 'text', value: 'Probably impossible.' },
            { type: 'cite', claimId: 'c-x', label: '1' },
          ],
        ],
      },
    })
    const cite = screen.getByRole('link', { name: /jump to sources/i })
    expect(cite).toHaveAttribute('href', '#comic-sources')
  })

  it('renders a chorus swarm with verbatim text', () => {
    renderBlock({
      type: 'chorusSwarm',
      data: { bubbles: [{ text: 'AI is trash.', tilt: 2 }] },
    })
    expect(screen.getByText('AI is trash.')).toBeInTheDocument()
  })

  it('hides grawlix glyphs from assistive tech and adds a spoken placeholder', () => {
    renderBlock({
      type: 'chorusSwarm',
      data: {
        bubbles: [
          {
            grawlixParts: [
              { t: 'grawlix', v: '#$%@' },
              { t: 'text', v: ' AI and your data centers' },
            ],
          },
        ],
      },
    })
    const glyphs = screen.getByText('#$%@')
    expect(glyphs).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('[expletive]')).toHaveClass('sr-only')
    expect(screen.getByText(/AI and your data centers/)).toBeInTheDocument()
  })

  it('renders an SFX burst as a labeled image with hidden display text', () => {
    renderBlock({ type: 'sfx', data: { text: 'WHAM!', style: 'starburst', size: 'xl' } })
    const sfx = screen.getByRole('img', { name: /comic sound effect: wham!/i })
    expect(sfx).toBeInTheDocument()
  })

  it('labels a grawlix SFX burst without spelling out the symbols', () => {
    renderBlock({ type: 'sfx', data: { text: '#$%@!', style: 'grawlix' } })
    expect(screen.getByRole('img', { name: /comic sound effect: \[expletive\]/i })).toBeInTheDocument()
  })

  it('renders an embedded post with author, handle, and meta', () => {
    renderBlock({
      type: 'embeddedPost',
      data: {
        author: 'The Researcher',
        handle: '@the-researcher',
        text: 'Genuinely curious what people think.',
        meta: 'Posted to BlueSky',
      },
    })
    expect(screen.getByText('@the-researcher')).toBeInTheDocument()
    expect(screen.getByText('Genuinely curious what people think.')).toBeInTheDocument()
    expect(screen.getByText('Posted to BlueSky')).toBeInTheDocument()
  })
})
