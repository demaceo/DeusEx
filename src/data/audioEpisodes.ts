/**
 * Runtime access to generated podcast episodes.
 *
 * The build-time script (`scripts/generate-podcast.ts`) writes generated audio
 * to `public/audio/` and upserts `public/audio/episodes.json` — the manifest of
 * which parts have an episode. The app fetches that manifest once (cached) and
 * shows the play control only for parts present in it, so nothing is broken when
 * a part hasn't been generated yet.
 */

import type { DocumentId } from '../types/document'
import type { PersonaId } from '../types/persona'

/** A speaker in an episode transcript — any debate persona, or the narrator. */
export type EpisodeSpeaker = PersonaId | 'host'

/** One generated episode, keyed by DocumentId in the manifest. */
export interface AudioEpisode {
  slug: string
  title: string
  /** Public URL of the stitched MP3, e.g. "/audio/part-i.mp3". */
  src: string
  durationSec: number
  /** Public URL of the timestamped transcript JSON. */
  transcript: string
}

/** One timed turn in the transcript sidecar (drives current-speaker display). */
export interface TranscriptCue {
  speaker: EpisodeSpeaker
  text: string
  startMs: number
  endMs: number
}

export interface EpisodeTranscript {
  slug: string
  documentId: DocumentId
  durationMs: number
  cues: TranscriptCue[]
}

const MANIFEST_URL = '/audio/episodes.json'

let manifestPromise: Promise<Record<string, AudioEpisode>> | null = null

/** Fetch (and cache) the episode manifest. Returns {} if it can't be loaded. */
function loadManifest(): Promise<Record<string, AudioEpisode>> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL)
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, AudioEpisode>>) : {}))
      .catch(() => ({}))
  }
  return manifestPromise
}

/** The episode for a document, or null if none has been generated. */
export async function getEpisode(documentId: DocumentId): Promise<AudioEpisode | null> {
  const manifest = await loadManifest()
  return manifest[documentId] ?? null
}

/** Fetch a generated transcript sidecar. */
export async function getTranscript(episode: AudioEpisode): Promise<EpisodeTranscript | null> {
  try {
    const res = await fetch(episode.transcript)
    if (!res.ok) return null
    return (await res.json()) as EpisodeTranscript
  } catch {
    return null
  }
}
