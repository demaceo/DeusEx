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
    // Callum: intense, inscrutable British — sounds brilliant and slightly dismissive,
    // nothing like the overused "Adam" default. Silicon Valley certainty with an edge.
    voiceId: 'N2lVS1w4EtoT3dr4eOWO',
    settings: { ...BASE, stability: 0.4, style: 0.45, speed: 1.02 },
    characterNote: 'Senior AI engineer. Confident, brisk, a touch dismissive.',
  },
  environmentalist: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah — warm, earnest female
    settings: { ...BASE, stability: 0.5, style: 0.38 },
    characterNote: 'Climate researcher. Earnest, grounded, quietly urgent.',
  },
  'labor-advocate': {
    // Sam: raspy, fast American — authentic working-class energy vs a "polished" voice.
    // Sounds like someone who has actually been to a picket line.
    voiceId: 'yoZ06aMxZJJ28mfd3POQ',
    settings: { ...BASE, stability: 0.42, style: 0.48, speed: 1.02 },
    characterNote: 'Labor organizer. Direct, fired up, morally insistent.',
  },
  'policy-realist': {
    voiceId: 'nPczCjzI2devNBz1zQrb', // Brian — deep, mature American male
    settings: { ...BASE, stability: 0.62, style: 0.18 },
    characterNote: 'Former regulatory attorney. Precise, dry, unhurried.',
  },
  'everyday-person': {
    voiceId: 'ThT5KcBeYPX3keUQqHPh', // Dorothy — pleasant older British female
    settings: { ...BASE, stability: 0.58, style: 0.28, speed: 0.96 },
    characterNote: 'Retired schoolteacher, late 60s. Warm, curious, plainspoken.',
  },
  'systems-humanist': {
    // Charlie: casual, conversational Australian — warm and approachable, a stark
    // contrast to the formal British/American male cluster (Brian, George, Bill).
    voiceId: 'IKne5meyi135sOtTRyHE',
    settings: { ...BASE, stability: 0.5, style: 0.35, speed: 0.98 },
    characterNote: 'Technology ethicist. Measured, humane, accessible.',
  },
  skeptic: {
    voiceId: 'pqHfZKP75CvOlQylNhV4', // Bill — older, grounded, trustworthy American
    settings: { ...BASE, stability: 0.52, style: 0.38 },
    characterNote: 'Veteran tech reporter. Wry, evidence-first, faintly weary.',
  },
  artist: {
    voiceId: 'XrExE9yKIg1WjnnlVkGX', // Matilda — warm, expressive female
    settings: { ...BASE, stability: 0.38, style: 0.52 },
    characterNote: 'Working illustrator & musician. Expressive, personal, lyrical.',
  },
  accelerationist: {
    voiceId: 'TxGEqnHWrfWFTfGW9XjX', // Josh — young, energetic male
    settings: { ...BASE, stability: 0.38, style: 0.48, speed: 1.06 },
    characterNote: 'e/acc founder. Fast, energetic, provocative.',
  },
  'safety-researcher': {
    voiceId: 'GBv7mTt0atIp3Br8iCZE', // Thomas — calm, contemplative American
    settings: { ...BASE, stability: 0.68, style: 0.18 },
    characterNote: 'Alignment researcher. Careful, deliberate, soberly precise.',
  },
  'young-person': {
    voiceId: 'jsCqWAovK2LkecY7zXl4', // Freya — young, expressive female
    settings: { ...BASE, stability: 0.38, style: 0.48, speed: 1.04 },
    characterNote: 'University student, early 20s. Direct, candid, a little impatient.',
  },
  clinician: {
    voiceId: 'oWAxZDx7w5VEj9dCyTzz', // Grace — gentle, caring female
    settings: { ...BASE, stability: 0.62, style: 0.22 },
    characterNote: 'Clinical psychologist. Calm, caring, carefully measured.',
  },
  economist: {
    voiceId: 'JBFqnCBsd6RMkjVDRZzb', // George — warm, mature British male
    settings: { ...BASE, stability: 0.58, style: 0.28 },
    characterNote: 'Political economist. Measured, dry, follows the incentives.',
  },
  'equity-researcher': {
    voiceId: 'pMsXgVXv3BLzUgSXRplE', // Serena — articulate, sharp female
    settings: { ...BASE, stability: 0.48, style: 0.42 },
    characterNote: 'Algorithmic-justice researcher. Sharp, principled, insistent.',
  },
  'land-defender': {
    // Clyde: strong, grounded, reliable American — sounds like someone who has been
    // through real things. More gravitas than Dave's casual British register.
    voiceId: '2EiwWnXFnvU5JabPnv8n',
    settings: { ...BASE, stability: 0.48, style: 0.42, speed: 0.97 },
    characterNote: 'Community organizer in an extraction zone. Resolute, unvarnished, weighty.',
  },
}
