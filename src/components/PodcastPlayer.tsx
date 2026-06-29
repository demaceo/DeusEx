import { useRef, useState } from 'react'
import { Headphones, Pause, Play } from 'lucide-react'
import { PERSONAS } from '../data/personas'
import type { EpisodeSpeaker } from '../data/audioEpisodes'
import type { PodcastPlayer as PodcastPlayerState } from '../hooks/usePodcastPlayer'

interface PodcastPlayerProps {
  player: PodcastPlayerState
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Resolve the "Now: …" label + persona attributes for the current speaker. */
function speakerInfo(speaker: EpisodeSpeaker | null): {
  name: string
  persona?: string
  Icon?: (typeof PERSONAS)[keyof typeof PERSONAS]['icon']
} {
  if (!speaker || speaker === 'host') return { name: 'Host' }
  const persona = PERSONAS[speaker]
  return { name: persona.name, persona: persona.id, Icon: persona.icon }
}

/**
 * Sticky podcast player bar. Two states:
 * - Idle (episode exists, not yet active): compact "Listen to this Roundtable" bar.
 * - Active: full bar with speaker display, scrubber, time, and speed.
 *
 * The scrubber uses pointer events to bracket drag gestures. While dragging,
 * local `scrubbingAt` state drives the thumb so the controlled input doesn't
 * fight the audio element's timeupdate stream. The seek commits only on release.
 */
export function PodcastPlayer({ player }: PodcastPlayerProps) {
  // Local scrubbing state: null = not scrubbing; number = visual thumb position.
  const [scrubbingAt, setScrubbingAt] = useState<number | null>(null)
  // Ref mirrors scrubbing state so onChange can read it synchronously (avoiding
  // the batched-update race between onPointerDown and onChange).
  const isDragging = useRef(false)

  if (!player.episode) return null

  if (!player.isActive) {
    return (
      <div
        className="podcast-player podcast-player--idle"
        role="region"
        aria-label="Roundtable podcast player"
      >
        <button
          type="button"
          className="podcast-player__toggle"
          onClick={player.toggle}
          aria-label="Listen to the audio podcast"
        >
          <Play size={20} aria-hidden />
        </button>
        <span className="podcast-player__idle-label">
          <Headphones size={14} aria-hidden />
          Listen to this Roundtable
        </span>
      </div>
    )
  }

  const { name, persona, Icon } = speakerInfo(player.currentSpeaker)
  const displayTime = scrubbingAt ?? Math.min(player.currentTime, player.duration || 0)
  const maxTime = player.duration || 0

  return (
    <div className="podcast-player" role="region" aria-label="Roundtable podcast player">
      <button
        type="button"
        className="podcast-player__toggle"
        onClick={player.toggle}
        aria-label={player.isPlaying ? 'Pause podcast' : 'Play podcast'}
        aria-pressed={player.isPlaying}
      >
        {player.isPlaying ? <Pause size={20} aria-hidden /> : <Play size={20} aria-hidden />}
      </button>

      <div className="podcast-player__now" data-persona={persona}>
        {Icon ? (
          <span className="podcast-player__speaker-icon" aria-hidden>
            <Icon size={16} strokeWidth={1.75} />
          </span>
        ) : null}
        <span className="podcast-player__speaker">
          <span className="podcast-player__eyebrow">Now</span>
          <span className="podcast-player__speaker-name">{name}</span>
        </span>
      </div>

      <input
        type="range"
        className="podcast-player__scrubber"
        min={0}
        max={maxTime}
        step={0.1}
        value={displayTime}
        aria-label="Seek"
        aria-valuetext={`${formatTime(displayTime)} of ${formatTime(maxTime)}`}
        onPointerDown={() => {
          isDragging.current = true
          player.scrubStart()
          setScrubbingAt(player.currentTime)
        }}
        onChange={(e) => {
          const v = Number(e.target.value)
          if (isDragging.current) {
            // Pointer drag — update visual position only; seek commits on release.
            setScrubbingAt(v)
          } else {
            // Keyboard arrow — seek immediately (no gesture to bracket).
            player.seek(v)
          }
        }}
        onPointerUp={(e) => {
          const v = Number((e.target as HTMLInputElement).value)
          isDragging.current = false
          setScrubbingAt(null)
          player.scrubEnd(v)
        }}
        onPointerCancel={() => {
          // Cancelled gesture (e.g. touch interrupted) — restore without seeking.
          isDragging.current = false
          setScrubbingAt(null)
          player.scrubEnd(player.currentTime)
        }}
      />

      <span className="podcast-player__time" aria-hidden>
        {formatTime(player.currentTime)} / {formatTime(player.duration)}
      </span>

      <button
        type="button"
        className="podcast-player__rate"
        onClick={player.cycleRate}
        aria-label={`Playback speed ${player.rate}×. Click to change.`}
      >
        {player.rate}×
      </button>
    </div>
  )
}
