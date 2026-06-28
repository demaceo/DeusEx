/**
 * Shared types for the build-time podcast generation pipeline. These describe the
 * intermediate "spoken turn" representation that flows:
 *   flattenDocument -> adaptScript (Claude) -> ElevenLabs synthesis.
 */

import type { PersonaId } from '../../src/types/persona'

/** A speaker in the episode: any debate persona, or the narrating host. */
export type Speaker = PersonaId | 'host'

/**
 * One unit of speech in source order. `flattenDocument` produces these straight
 * from the document; `adaptScript` returns the same shape with conversationally
 * rewritten `text` (and possibly inserted host transitions).
 */
export interface Turn {
  speaker: Speaker
  text: string
  /**
   * Origin of the turn, for the adapter's context and for debugging. Not sent to TTS.
   * e.g. "Round I · Energy Consumption" or "intro" / "closing".
   */
  context?: string
}

/** A turn enriched with playback timing after synthesis, written to the transcript. */
export interface TranscriptCue extends Turn {
  startMs: number
  endMs: number
}

/** The sidecar transcript committed next to each episode MP3. */
export interface EpisodeTranscript {
  slug: string
  documentId: string
  durationMs: number
  cues: TranscriptCue[]
}
