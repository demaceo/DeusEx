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
 * Sticky podcast player bar. Rendered once per Roundtable page when an episode
 * exists and the listener has engaged playback. Shows the current speaker
 * (synced via the transcript), a scrubber, time, and a playback-speed toggle.
 */
export function PodcastPlayer({ player }: PodcastPlayerProps) {
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
        max={player.duration || 0}
        step={0.1}
        value={Math.min(player.currentTime, player.duration || 0)}
        onChange={(e) => player.seek(Number(e.target.value))}
        aria-label="Seek"
      />

      <span className="podcast-player__time" aria-hidden>
        {formatTime(player.currentTime)} / {formatTime(player.duration)}
      </span>

      <button
        type="button"
        className="podcast-player__rate"
        onClick={player.cycleRate}
        aria-label={`Playback speed ${player.rate}×`}
      >
        {player.rate}×
      </button>
    </div>
  )
}
