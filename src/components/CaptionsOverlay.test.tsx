import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CaptionsOverlay } from './CaptionsOverlay'
import type { TranscriptCue } from '../data/audioEpisodes'

const cue: TranscriptCue = {
  speaker: 'tech-optimist',
  text: 'Progress always comes with a receipt.',
  startMs: 0,
  endMs: 5000,
}

describe('CaptionsOverlay', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(<CaptionsOverlay cue={cue} visible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the cue text and speaker name when visible', () => {
    render(<CaptionsOverlay cue={cue} visible={true} />)
    expect(screen.getByText(cue.text)).toBeInTheDocument()
    expect(screen.getByText('Tech Optimist', { exact: false })).toBeInTheDocument()
  })

  it('renders the overlay with an empty caption when there is no active cue', () => {
    render(<CaptionsOverlay cue={null} visible={true} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
