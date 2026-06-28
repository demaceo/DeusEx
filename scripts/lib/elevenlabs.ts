/**
 * Minimal ElevenLabs text-to-speech client (build-time only).
 *
 * Uses the `with-timestamps` endpoint so each synthesized turn comes back with
 * character-level alignment — we keep the segment's end time to build the
 * episode transcript (start/end ms per speaker turn), which the player uses to
 * show the current speaker. Plain `fetch`, no SDK dependency.
 */

import type { VoiceSettings } from '../../src/data/personaVoices'

const API_BASE = 'https://api.elevenlabs.io/v1'
const DEFAULT_MODEL = process.env.PODCAST_TTS_MODEL ?? 'eleven_multilingual_v2'

export interface SynthesisResult {
  /** Raw MP3 bytes for this turn. */
  audio: Buffer
  /** Spoken duration in milliseconds, derived from the alignment. */
  durationMs: number
}

interface TimestampsResponse {
  audio_base64: string
  alignment: {
    characters: string[]
    character_start_times_seconds: number[]
    character_end_times_seconds: number[]
  } | null
}

/** Synthesize one turn with a specific voice. Throws on a non-2xx response. */
export async function synthesize(
  text: string,
  voiceId: string,
  settings: VoiceSettings,
  opts: { apiKey?: string; model?: string } = {},
): Promise<SynthesisResult> {
  const apiKey = opts.apiKey ?? process.env.ELEVENLABS_API_KEY
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY is not set')

  const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}/with-timestamps`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: opts.model ?? DEFAULT_MODEL,
      voice_settings: {
        stability: settings.stability,
        similarity_boost: settings.similarityBoost,
        style: settings.style,
        use_speaker_boost: settings.useSpeakerBoost,
        speed: settings.speed,
      },
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`ElevenLabs ${res.status} for voice ${voiceId}: ${body.slice(0, 300)}`)
  }

  const data = (await res.json()) as TimestampsResponse
  const audio = Buffer.from(data.audio_base64, 'base64')
  const endTimes = data.alignment?.character_end_times_seconds
  const durationMs =
    endTimes && endTimes.length ? Math.round(endTimes[endTimes.length - 1] * 1000) : 0

  return { audio, durationMs }
}
