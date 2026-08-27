import { useState } from 'react'
import {
  AlertTriangle,
  Captions,
  CaptionsOff,
  Headphones,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'
import { speakerInfo } from '../lib/speakerInfo'
import { CaptionsOverlay } from './CaptionsOverlay'
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

  // A failure has to say so. Otherwise the bar sits engaged at 0:00 and the
  // reader cannot tell a broken file from a slow one. Named as a dead end with
  // a way out: the written roundtable is right there, and retry rebuilds the
  // element rather than replaying a latched error.
  if (player.error) {
    return (
      <div
        className="masthead-player masthead-player--error"
        role="region"
        aria-label="Roundtable podcast player"
      >
        <AlertTriangle size={15} aria-hidden />
        <span className="masthead-player__error" role="status">
          {player.error}
        </span>
        <button
          type="button"
          className="masthead-player__retry"
          onClick={player.retry}
          aria-label="Retry loading the audio"
        >
          <RotateCcw size={13} aria-hidden />
          Try again
        </button>
      </div>
    )
  }

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
    <>
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
          onKeyDown={(e) => {
            // The native step (0.1s, for smooth drag/scrub precision) makes
            // arrow-key seeking impractically slow — jump further on arrow keys.
            // Home/End/PageUp/PageDown keep their native behavior.
            const forward = e.key === 'ArrowRight' || e.key === 'ArrowUp'
            const backward = e.key === 'ArrowLeft' || e.key === 'ArrowDown'
            if (!forward && !backward) return
            e.preventDefault()
            const delta = forward ? 5 : -5
            const v = Math.min(maxTime, Math.max(0, Math.min(player.currentTime, maxTime) + delta))
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

        <button
          type="button"
          className="masthead-player__cc"
          onClick={player.toggleCaptions}
          aria-pressed={player.captionsEnabled}
          aria-label={player.captionsEnabled ? 'Turn off captions' : 'Turn on captions'}
        >
          {player.captionsEnabled ? (
            <Captions size={16} aria-hidden />
          ) : (
            <CaptionsOff size={16} aria-hidden />
          )}
        </button>
      </div>
      <CaptionsOverlay cue={player.currentCue} visible={player.captionsEnabled} />
    </>
  )
}
