import { useState } from 'react'
import { Headphones, Pause, Play } from 'lucide-react'
import { PERSONAS } from '../data/personas'
import type { EpisodeSpeaker } from '../data/audioEpisodes'
import type { PodcastPlayer as PodcastPlayerState } from '../hooks/usePodcastPlayer'

interface MastheadPlayerProps {
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
 * The roundtable's audio player, docked inside the sticky masthead so it stays
 * pinned and visible as the reader scrolls. Two states:
 * - Idle (episode exists, not yet engaged): compact "Listen to this Roundtable" row.
 * - Active: play/pause, live speaker chip, scrubber, time, and speed.
 *
 * When the masthead condenses on scroll (`[data-collapsed='true']`), CSS shrinks
 * this to a slim strip (play + progress + time); no JS state is involved.
 *
 * Scrubbing seeks on every `onChange` — the audio element is always at the last
 * value the input reported, so releasing the thumb can never commit a stale time.
 * `dragValue` only keeps the thumb crisp while audio is playing under the drag.
 */
export function MastheadPlayer({ player }: MastheadPlayerProps) {
  // While dragging: the visual thumb position. null = show live playback time.
  const [dragValue, setDragValue] = useState<number | null>(null)

  if (!player.episode) return null

  const maxTime = player.duration || 0

  if (!player.isActive) {
    return (
      <div
        className="masthead-player masthead-player--idle"
        role="region"
        aria-label="Roundtable podcast player"
      >
        <button
          type="button"
          className="masthead-player__toggle"
          onClick={player.toggle}
          aria-label="Listen to the audio podcast"
        >
          <Play size={18} aria-hidden />
        </button>
        <span className="masthead-player__idle-label">
          <Headphones size={13} aria-hidden />
          Listen to this Roundtable
        </span>
        <span className="masthead-player__idle-time" aria-hidden>
          {formatTime(maxTime)}
        </span>
      </div>
    )
  }

  const { name, persona, Icon } = speakerInfo(player.currentSpeaker)
  const displayTime = dragValue ?? Math.min(player.currentTime, maxTime)

  return (
    <div className="masthead-player" role="region" aria-label="Roundtable podcast player">
      <button
        type="button"
        className="masthead-player__toggle"
        onClick={player.toggle}
        aria-label={player.isPlaying ? 'Pause podcast' : 'Play podcast'}
        aria-pressed={player.isPlaying}
      >
        {player.isPlaying ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
      </button>

      <div
        className="masthead-player__now"
        data-persona={persona}
        aria-live="polite"
        aria-atomic="true"
      >
        {Icon ? (
          <span className="masthead-player__speaker-icon" aria-hidden>
            <Icon size={14} strokeWidth={1.75} />
          </span>
        ) : null}
        <span className="masthead-player__speaker">
          <span className="masthead-player__eyebrow">Now</span>
          <span className="masthead-player__speaker-name">{name}</span>
        </span>
      </div>

      <input
        type="range"
        className="masthead-player__scrubber"
        min={0}
        max={maxTime}
        step={0.1}
        value={displayTime}
        aria-label="Seek"
        aria-valuetext={`${formatTime(displayTime)} of ${formatTime(maxTime)}`}
        onChange={(e) => {
          // Seek on every change — pointer drag and keyboard alike. The audio
          // element follows immediately, so there is no deferred commit that can
          // go stale on release. dragValue keeps the thumb crisp during playback.
          const v = Number(e.target.value)
          setDragValue(v)
          player.seek(v)
        }}
        onPointerUp={() => setDragValue(null)}
        onPointerCancel={() => setDragValue(null)}
        onBlur={() => setDragValue(null)}
        onKeyUp={() => setDragValue(null)}
      />

      <span className="masthead-player__time" aria-hidden>
        {formatTime(displayTime)} / {formatTime(maxTime)}
      </span>

      <button
        type="button"
        className="masthead-player__rate"
        onClick={player.cycleRate}
        aria-label={`Playback speed ${player.rate}×. Click to change.`}
      >
        {player.rate}×
      </button>
    </div>
  )
}
