import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MastheadPlayer } from './MastheadPlayer'
import type { PodcastPlayer as PodcastPlayerState } from '../hooks/usePodcastPlayer'
import type { AudioEpisode } from '../data/audioEpisodes'

const episode: AudioEpisode = {
  slug: 'part-i',
  title: 'Part I',
  src: '/audio/part-i.mp3',
  durationSec: 300,
  transcript: '/audio/part-i.transcript.json',
}

function makePlayer(overrides: Partial<PodcastPlayerState> = {}): PodcastPlayerState {
  return {
    hasEpisode: true,
    episode,
    isPlaying: false,
    isActive: false,
    currentTime: 0,
    duration: 300,
    rate: 1,
    currentSpeaker: null,
    toggle: vi.fn(),
    seek: vi.fn(),
    cycleRate: vi.fn(),
    ...overrides,
  }
}

describe('MastheadPlayer — idle state', () => {
  it('returns null when no episode is loaded', () => {
    const { container } = render(<MastheadPlayer player={makePlayer({ episode: null })} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the idle bar when not active', () => {
    render(<MastheadPlayer player={makePlayer()} />)
    expect(screen.getByRole('button', { name: /listen to the audio podcast/i })).toBeInTheDocument()
    expect(screen.getByText('Listen to this Roundtable')).toBeInTheDocument()
  })

  it('shows the episode duration in the idle bar', () => {
    render(<MastheadPlayer player={makePlayer({ duration: 300 })} />)
    expect(screen.getByText('5:00')).toBeInTheDocument()
  })

  it('calls toggle when the idle play button is clicked', () => {
    const toggle = vi.fn()
    render(<MastheadPlayer player={makePlayer({ toggle })} />)
    fireEvent.click(screen.getByRole('button', { name: /listen to the audio podcast/i }))
    expect(toggle).toHaveBeenCalledOnce()
  })
})

describe('MastheadPlayer — active state', () => {
  function renderActive(overrides: Partial<PodcastPlayerState> = {}) {
    return render(<MastheadPlayer player={makePlayer({ isActive: true, ...overrides })} />)
  }

  it('shows play button when paused', () => {
    renderActive({ isPlaying: false })
    expect(screen.getByRole('button', { name: /play podcast/i })).toBeInTheDocument()
  })

  it('shows pause button when playing', () => {
    renderActive({ isPlaying: true })
    expect(screen.getByRole('button', { name: /pause podcast/i })).toBeInTheDocument()
  })

  it('displays current time and duration', () => {
    renderActive({ currentTime: 65, duration: 300 })
    expect(screen.getByText('1:05 / 5:00')).toBeInTheDocument()
  })

  it('displays current playback rate', () => {
    renderActive({ rate: 1.5 })
    expect(screen.getByRole('button', { name: /playback speed 1.5/i })).toBeInTheDocument()
  })

  it('speaker display has aria-live="polite"', () => {
    renderActive()
    const nowRegion = screen
      .getByRole('region', { name: /podcast player/i })
      .querySelector('.masthead-player__now')
    expect(nowRegion).toHaveAttribute('aria-live', 'polite')
    expect(nowRegion).toHaveAttribute('aria-atomic', 'true')
  })
})

describe('MastheadPlayer — scrubber seeks on change', () => {
  it('seeks immediately to the changed value and reflects it in the time display', () => {
    // The rebuilt scrubber seeks on every change — no deferred commit that can go
    // stale. A change to 90s must call seek(90) and show 1:30 right away.
    const seek = vi.fn()
    render(
      <MastheadPlayer
        player={makePlayer({
          isActive: true,
          isPlaying: true,
          currentTime: 30,
          duration: 300,
          seek,
        })}
      />,
    )

    // Before any interaction the display matches current time.
    expect(screen.getByText('0:30 / 5:00')).toBeInTheDocument()

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '90' } })

    expect(seek).toHaveBeenCalledWith(90)
    expect(screen.getByText('1:30 / 5:00')).toBeInTheDocument()
  })

  it('keeps the committed position after release — no snap-back to a stale value', () => {
    const seek = vi.fn()
    const { rerender } = render(
      <MastheadPlayer
        player={makePlayer({ isActive: true, currentTime: 30, duration: 300, seek })}
      />,
    )

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '90' } })
    expect(seek).toHaveBeenCalledWith(90)

    // The real hook's seek() sets audio.currentTime and currentTime state
    // synchronously; mirror that with a re-render carrying the new currentTime.
    rerender(
      <MastheadPlayer
        player={makePlayer({ isActive: true, currentTime: 90, duration: 300, seek })}
      />,
    )
    fireEvent.pointerUp(slider)

    // dragValue clears on release; the display falls back to currentTime (90s) —
    // the position just seeked to, never 0 or a prior value.
    expect(screen.getByText('1:30 / 5:00')).toBeInTheDocument()
  })
})
