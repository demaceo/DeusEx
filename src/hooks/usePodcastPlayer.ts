import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  getEpisode,
  getTranscript,
  type AudioEpisode,
  type EpisodeSpeaker,
  type TranscriptCue,
} from '../data/audioEpisodes'
import type { DocumentId } from '../types/document'

const PLAYBACK_RATES = [1, 1.25, 1.5] as const
export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

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
  /** The speaker id at the current playhead, or null. */
  currentSpeaker: EpisodeSpeaker | null
  toggle: () => void
  seek: (seconds: number) => void
  cycleRate: () => void
}

/**
 * Owns a single HTMLAudioElement for the current document's episode and exposes
 * declarative playback state. The transcript sidecar is loaded lazily on first
 * play to resolve the current speaker. Mirrors the project's hooks convention
 * (rAF-free here — `timeupdate` fires often enough for a scrubber + speaker tag).
 */
export function usePodcastPlayer(documentId: DocumentId): PodcastPlayer {
  const [episode, setEpisode] = useState<AudioEpisode | null>(null)
  const [cues, setCues] = useState<TranscriptCue[] | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState<PlaybackRate>(1)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Resolve the episode for this document; reset everything when it changes.
  // State is reset inside the async resolution (not synchronously in the effect
  // body) and the previous audio element is torn down in cleanup.
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
    })
    return () => {
      cancelled = true
      audioRef.current?.pause()
      audioRef.current = null
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
    audioRef.current = audio
    return audio
  }, [episode, rate])

  const toggle = useCallback(() => {
    const audio = ensureAudio()
    if (!audio) return
    setIsActive(true)
    if (audio.paused) {
      if (!cues && episode) getTranscript(episode).then((t) => setCues(t?.cues ?? []))
      void audio.play()
    } else {
      audio.pause()
    }
  }, [cues, ensureAudio, episode])

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

  const currentSpeaker = useMemo<EpisodeSpeaker | null>(() => {
    if (!cues || cues.length === 0) return null
    const ms = currentTime * 1000
    const cue = cues.find((c) => ms >= c.startMs && ms < c.endMs)
    return cue?.speaker ?? null
  }, [cues, currentTime])

  return {
    hasEpisode: episode !== null,
    episode,
    isPlaying,
    isActive,
    currentTime,
    duration: duration || (episode?.durationSec ?? 0),
    rate,
    currentSpeaker,
    toggle,
    seek,
    cycleRate,
  }
}
