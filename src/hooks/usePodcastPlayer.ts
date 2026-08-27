import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  getEpisode,
  getTranscript,
  type AudioEpisode,
  type EpisodeSpeaker,
  type TranscriptCue,
} from '../data/audioEpisodes'
import type { DocumentId } from '../types/document'

const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const
export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

const CAPTIONS_STORAGE_KEY = 'deusex:captions-enabled'

export interface PodcastPlayer {
  /** Whether a generated episode exists for this document. */
  hasEpisode: boolean
  episode: AudioEpisode | null
  isPlaying: boolean
  /** Whether the player bar should be shown (user has engaged playback). */
  isActive: boolean
  currentTime: number
  duration: number
  rate: PlaybackRate
  /** The transcript cue at the current playhead, or null. */
  currentCue: TranscriptCue | null
  /** The speaker id at the current playhead, or null. */
  currentSpeaker: EpisodeSpeaker | null
  /** Whether the closed-captions overlay is enabled. Persisted globally. */
  captionsEnabled: boolean
  /**
   * Set when the audio element fails or stalls indefinitely. Without this the
   * bar can sit "engaged" at 0:00 forever on a missing MP3 or a dropped
   * connection, with nothing to tell the reader whether it is loading or broken.
   */
  error: string | null
  /** Clears {@link error} and retries playback from the current position. */
  retry: () => void
  toggleCaptions: () => void
  toggle: () => void
  /** Seek to an absolute position (seconds). Sets audio.currentTime immediately. */
  seek: (seconds: number) => void
  cycleRate: () => void
}

/**
 * Owns a single HTMLAudioElement for the current document's episode and exposes
 * declarative playback state. The transcript sidecar is loaded lazily on first
 * play to resolve the current speaker.
 *
 * Scrubbing is a plain `seek` on every input change: the component drives the
 * thumb from its own drag state while the gesture is live, and each change seeks
 * the audio element directly, so there is no separate commit step to go stale.
 */
export function usePodcastPlayer(documentId: DocumentId): PodcastPlayer {
  const [episode, setEpisode] = useState<AudioEpisode | null>(null)
  const [cues, setCues] = useState<TranscriptCue[] | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState<PlaybackRate>(1)
  const [error, setError] = useState<string | null>(null)
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(CAPTIONS_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Resolve the episode for this document; reset everything when it changes.
  useEffect(() => {
    let cancelled = false
    getEpisode(documentId).then((ep) => {
      if (cancelled) return
      setEpisode(ep)
      setCues(null)
      setIsActive(false)
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
      setError(null)
    })
    return () => {
      cancelled = true
      audioRef.current?.pause()
      audioRef.current = null
      // Immediately hide the player bar when the document changes so it
      // doesn't linger while the next episode manifest fetch is in-flight.
      // (The full state reset follows after getEpisode resolves above.)
      setIsActive(false)
      setIsPlaying(false)
      setEpisode(null)
    }
  }, [documentId])

  const ensureAudio = useCallback((): HTMLAudioElement | null => {
    if (!episode) return null
    if (audioRef.current) return audioRef.current
    const audio = new Audio(episode.src)
    audio.preload = 'metadata'
    audio.playbackRate = rate
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('durationchange', () => setDuration(audio.duration || 0))
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })
    // A missing or unplayable MP3 fires `error` and nothing else: without this
    // the bar stays engaged at 0:00 with no way to tell broken from loading.
    audio.addEventListener('error', () => {
      setIsPlaying(false)
      setError('Audio unavailable. The written roundtable below is complete.')
    })
    // `stalled` means the network went quiet mid-buffer. Recoverable, so it gets
    // a retry-oriented message rather than the terminal one above.
    audio.addEventListener('stalled', () => {
      setError('Audio stalled. Check your connection and try again.')
    })
    // Any successful progress clears a stall we reported earlier.
    audio.addEventListener('playing', () => setError(null))
    audioRef.current = audio
    return audio
  }, [episode, rate])

  const toggle = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return
    setIsActive(true)
    if (audio.paused) {
      if (!cues && episode) getTranscript(episode).then((t) => setCues(t?.cues ?? []))
      audio.play().catch(() => {
        // Play was rejected (e.g. browser autoplay policy). If the audio still
        // hasn't started, retract the active state so the bar doesn't show
        // as engaged when nothing is actually playing.
        if (audio.paused) setIsActive(false)
      })
    } else {
      audio.pause()
    }
  }, [cues, ensureAudio, episode])

  const retry = useCallback(() => {
    setError(null)
    // A failed media element latches its error state, so replaying the same one
    // just fails again. Rebuild it, resuming where the reader left off.
    const previous = audioRef.current
    const resumeAt = previous?.currentTime ?? 0
    previous?.pause()
    audioRef.current = null

    const audio = ensureAudio()
    if (!audio) return
    if (resumeAt > 0) audio.currentTime = resumeAt
    setIsActive(true)
    audio.play().catch(() => {
      setError('Audio unavailable. The written roundtable below is complete.')
    })
  }, [ensureAudio])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setCurrentTime(seconds)
  }, [])

  const cycleRate = useCallback(() => {
    setRate((prev) => {
      const next = PLAYBACK_RATES[(PLAYBACK_RATES.indexOf(prev) + 1) % PLAYBACK_RATES.length]
      if (audioRef.current) audioRef.current.playbackRate = next
      return next
    })
  }, [])

  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => {
      const next = !prev
      try {
        localStorage.setItem(CAPTIONS_STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable (private mode, disabled) — degrade silently.
      }
      return next
    })
  }, [])

  const currentCue = useMemo<TranscriptCue | null>(() => {
    if (!cues || cues.length === 0) return null
    const ms = currentTime * 1000
    return cues.find((c) => ms >= c.startMs && ms < c.endMs) ?? null
  }, [cues, currentTime])
  const currentSpeaker = currentCue?.speaker ?? null

  return {
    hasEpisode: episode !== null,
    episode,
    isPlaying,
    isActive,
    currentTime,
    duration: duration || (episode?.durationSec ?? 0),
    rate,
    currentCue,
    currentSpeaker,
    captionsEnabled,
    error,
    retry,
    toggleCaptions,
    toggle,
    seek,
    cycleRate,
  }
}
