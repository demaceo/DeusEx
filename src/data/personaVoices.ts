/**
 * Voice casting for the audio-podcast feature.
 *
 * Each debate persona (and the narrator host) is cast to a specific ElevenLabs
 * voice plus per-voice delivery settings. This map is the heart of making the
 * generated episode feel like a real panel rather than one flat TTS read: the
 * casting brief for each voice is the persona's own `role`/`focus`/`bio` in
 * `personas.ts`, so the voice matches the character.
 *
 * This file is imported ONLY by the build-time generation script
 * (`scripts/generate-podcast.ts`) — never by the shipped client bundle. The
 * `voiceId`s below are ElevenLabs' default-library voices; swap them for voices
 * from your own ElevenLabs library by editing this one map.
 */

import type { PersonaId } from '../types/persona'

/** ElevenLabs `voice_settings`, tuned per persona temperament. */
export interface VoiceSettings {
  /** 0–1. Lower = more expressive/variable; higher = steadier, more monotone. */
  stability: number
  /** 0–1. Fidelity to the original voice timbre. */
  similarityBoost: number
  /** 0–1. Style exaggeration; higher = more dramatic delivery. */
  style: number
  /** 0.7–1.2. Speaking rate. */
  speed: number
  useSpeakerBoost: boolean
}

export interface VoiceCasting {
  /** ElevenLabs voice id. */
  voiceId: string
  settings: VoiceSettings
  /** Human-readable casting rationale — guides future voice swaps. */
  characterNote: string
}

/** Sensible default delivery; personas override the fields that matter to them. */
const BASE: VoiceSettings = {
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.3,
  speed: 1.0,
  useSpeakerBoost: true,
}

/**
 * The narrator who frames the episode, names speakers on first mention, and reads
 * intro/prose/figure beats. Deliberately calm and neutral so the personas stand out.
 */
export const HOST_VOICE: VoiceCasting = {
  voiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel — calm, clear, classic narrator
  settings: { ...BASE, stability: 0.6, style: 0.2 },
  characterNote: 'Neutral podcast host/narrator. Measured, warm, unobtrusive.',
}

export const PERSONA_VOICES: Record<PersonaId, VoiceCasting> = {
  'tech-optimist': {
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam — deep, confident
    settings: { ...BASE, stability: 0.45, style: 0.35 },
    characterNote: 'Senior AI engineer. Confident, brisk, solution-oriented.',
  },
  environmentalist: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah — warm, earnest female
    settings: { ...BASE, stability: 0.5, style: 0.35 },
    characterNote: 'Climate researcher. Earnest, grounded, quietly urgent.',
  },
  'labor-advocate': {
    voiceId: 'ErXwobaYiN019PkySvjV', // Antoni — warm, well-rounded male
    settings: { ...BASE, stability: 0.45, style: 0.4 },
    characterNote: 'Labor organizer. Warm but firm, morally insistent.',
  },
  'policy-realist': {
    voiceId: 'nPczCjzI2devNBz1zQrb', // Brian — deep, mature American male
    settings: { ...BASE, stability: 0.6, style: 0.2 },
    characterNote: 'Former regulatory attorney. Precise, dry, unhurried.',
  },
  'everyday-person': {
    voiceId: 'ThT5KcBeYPX3keUQqHPh', // Dorothy — pleasant older female
    settings: { ...BASE, stability: 0.55, style: 0.3, speed: 0.97 },
    characterNote: 'Retired schoolteacher, late 60s. Warm, curious, plainspoken.',
  },
  'systems-humanist': {
    voiceId: 'onwK4e9ZLuTAKqWW03F9', // Daniel — authoritative, measured
    settings: { ...BASE, stability: 0.55, style: 0.3 },
    characterNote: 'Technology ethicist. Calibrated alarm balanced with hope.',
  },
  skeptic: {
    voiceId: 'pqHfZKP75CvOlQylNhV4', // Bill — older, trustworthy
    settings: { ...BASE, stability: 0.5, style: 0.35 },
    characterNote: 'Veteran tech reporter. Wry, evidence-first, faintly weary.',
  },
  artist: {
    voiceId: 'XrExE9yKIg1WjnnlVkGX', // Matilda — warm, expressive female
    settings: { ...BASE, stability: 0.4, style: 0.5 },
    characterNote: 'Working illustrator & musician. Expressive, personal, lyrical.',
  },
  accelerationist: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh — young, energetic male
    settings: { ...BASE, stability: 0.4, style: 0.45, speed: 1.05 },
    characterNote: 'e/acc founder. Fast, energetic, provocative.',
  },
  'safety-researcher': {
    voiceId: 'GBv7mTt0atIp3Br8iCZE', // Thomas — calm, contemplative
    settings: { ...BASE, stability: 0.65, style: 0.2 },
    characterNote: 'Alignment researcher. Careful, deliberate, soberly precise.',
  },
  'young-person': {
    voiceId: 'jsCqWAovK2LkecY7zXl4', // Freya — young, expressive female
    settings: { ...BASE, stability: 0.4, style: 0.45, speed: 1.03 },
    characterNote: 'University student, early 20s. Direct, candid, a little impatient.',
  },
  clinician: {
    voiceId: 'oWAxZDx7w5VEj9dCyTzz', // Grace — gentle, caring female
    settings: { ...BASE, stability: 0.6, style: 0.25 },
    characterNote: 'Clinical psychologist. Calm, caring, carefully measured.',
  },
  economist: {
    voiceId: 'JBFqnCBsd6RMkjVDRZzb', // George — warm, mature British male
    settings: { ...BASE, stability: 0.6, style: 0.25 },
    characterNote: 'Political economist. Measured, dry, follows the incentives.',
  },
  'equity-researcher': {
    voiceId: 'pMsXgVXv3BLzUgSXRplE', // Serena — pleasant, articulate female
    settings: { ...BASE, stability: 0.5, style: 0.35 },
    characterNote: 'Algorithmic-justice researcher. Sharp, principled, insistent.',
  },
  'land-defender': {
    voiceId: 'CYw3kZ02Hs0563khs1Fj', // Dave — grounded, conversational male
    settings: { ...BASE, stability: 0.45, style: 0.4 },
    characterNote: 'Community organizer in an extraction zone. Grounded, plainspoken, resolute.',
  },
}
