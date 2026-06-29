import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PodcastPlayer } from './PodcastPlayer'
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
    scrubStart: vi.fn(),
    scrubEnd: vi.fn(),
    cycleRate: vi.fn(),
    ...overrides,
  }
}

describe('PodcastPlayer — idle state', () => {
  it('returns null when no episode is loaded', () => {
    const { container } = render(<PodcastPlayer player={makePlayer({ episode: null })} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the idle bar when not active', () => {
    render(<PodcastPlayer player={makePlayer()} />)
    expect(screen.getByRole('button', { name: /listen to the audio podcast/i })).toBeInTheDocument()
    expect(screen.getByText('Listen to this Roundtable')).toBeInTheDocument()
  })

  it('calls toggle when the idle play button is clicked', () => {
    const toggle = vi.fn()
    render(<PodcastPlayer player={makePlayer({ toggle })} />)
    fireEvent.click(screen.getByRole('button', { name: /listen to the audio podcast/i }))
    expect(toggle).toHaveBeenCalledOnce()
  })
})

describe('PodcastPlayer — active state', () => {
  function renderActive(overrides: Partial<PodcastPlayerState> = {}) {
    return render(<PodcastPlayer player={makePlayer({ isActive: true, ...overrides })} />)
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
      .querySelector('.podcast-player__now')
    expect(nowRegion).toHaveAttribute('aria-live', 'polite')
    expect(nowRegion).toHaveAttribute('aria-atomic', 'true')
  })
})

describe('PodcastPlayer — scrubber time sync', () => {
  it('time display tracks scrubbingAt position while dragging, not audio currentTime', () => {
    // Bug: previously the time counter showed player.currentTime (frozen during drag)
    // while the scrubber thumb showed scrubbingAt, causing visible desync.
    render(
      <PodcastPlayer
        player={makePlayer({ isActive: true, isPlaying: true, currentTime: 30, duration: 300 })}
      />,
    )

    // Before any scrub the display matches current time
    expect(screen.getByText('0:30 / 5:00')).toBeInTheDocument()

    const slider = screen.getByRole('slider')

    // Simulate pointer-down to begin scrub gesture
    fireEvent.pointerDown(slider)

    // Simulate dragging to 90 seconds
    fireEvent.change(slider, { target: { value: '90' } })

    // Time display must update to reflect the visual scrub position (1:30),
    // not stay frozen at the pre-scrub audio time (0:30).
    expect(screen.getByText('1:30 / 5:00')).toBeInTheDocument()
  })

  it('time display returns to audio currentTime after scrub is committed', () => {
    const scrubEnd = vi.fn()
    render(
      <PodcastPlayer
        player={makePlayer({ isActive: true, currentTime: 30, duration: 300, scrubEnd })}
      />,
    )

    const slider = screen.getByRole('slider')
    fireEvent.pointerDown(slider)
    fireEvent.change(slider, { target: { value: '90' } })

    // On pointer-up the scrub position is committed and scrubbingAt is cleared.
    // The time display falls back to player.currentTime (30s from the prop).
    fireEvent.pointerUp(slider, { target: slider })
    expect(screen.getByText('0:30 / 5:00')).toBeInTheDocument()
    expect(scrubEnd).toHaveBeenCalledOnce()
  })
})
