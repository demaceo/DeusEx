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
 * `voiceId`s below are custom voices from the project's own ElevenLabs library,
 * cast deliberately for accent and character variety (English, Scottish,
 * Nigerian, South African, Black American, Spanish, Russian, Irish, American,
 * and Australian are all represented at least once). Where a persona's actual
 * gender is established in the prose (see the part files under
 * `src/data/parts/`), the cast voice matches it; swap any entry for another
 * voice from your library by editing this one map.
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

/**
 * Per-persona acting direction fed into the Claude adaptation pass
 * (`scripts/lib/adaptScript.ts`). Where `settings` controls the ElevenLabs
 * *voice*, this controls the *words*: it tells the rewrite how each speaker
 * jokes, jabs, and carries a sentence so listeners can tell who's talking from
 * the phrasing alone. Calibrated per persona — witty speakers carry the humor;
 * earnest/grave speakers stay sincere. It never licenses changing the substance.
 */
export interface VoiceDelivery {
  /**
   * Humor register, calibrated to the character — e.g. 'dry, deadpan';
   * 'none — earnest and grave'; 'gallows wit, never at others' expense'.
   */
  humor: string
  /** Sarcasm dial, from 'none' to 'sharp and frequent'. */
  sarcasm: string
  /** Signature verbal mannerisms / tics that make the speaker recognizable. */
  mannerisms: string
  /** Tonal range — how much the delivery varies and where it sits emotionally. */
  tone: string
}

export interface VoiceCasting {
  /** ElevenLabs voice id. */
  voiceId: string
  settings: VoiceSettings
  /** Human-readable casting rationale — guides future voice swaps. */
  characterNote: string
  /** Acting direction for the script-adaptation pass (see VoiceDelivery). */
  delivery: VoiceDelivery
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
  voiceId: 'VlUmeC1Uzj3NnwiVR9K9', // Black man — steady, resonant narrator; distinct from every persona voice
  settings: { ...BASE, stability: 0.6, style: 0.2 },
  characterNote: 'Neutral podcast host/narrator. Measured, warm, unobtrusive.',
  delivery: {
    humor: 'none — the faintest dry warmth in a transition at most',
    sarcasm: 'none',
    mannerisms: 'clean framing, lets a beat land before the next speaker',
    tone: 'even and unobtrusive; never editorializes or takes a side',
  },
}

export const PERSONA_VOICES: Record<PersonaId, VoiceCasting> = {
  'tech-optimist': {
    // Specifically cast for this persona.
    voiceId: 'ljX1ZrXuDIIRVcmiVSyR',
    settings: { ...BASE, stability: 0.4, style: 0.45, speed: 1.02 },
    characterNote: 'Senior AI engineer. Confident, brisk, a touch dismissive.',
    delivery: {
      humor: 'dry and confident; the occasional clever aside, never goofy',
      sarcasm: 'light — a faint "obviously" when a critic states the expected',
      mannerisms:
        'frames problems as solvable: "that\'s just an engineering problem"; brisk, declarative',
      tone: 'assured and a little impatient; warms when talking about what the tech can do',
    },
  },
  environmentalist: {
    voiceId: 'gsm4lUH9bnZ3pjR1Pw7w', // South African woman — grounds the climate argument in the Global South
    settings: { ...BASE, stability: 0.5, style: 0.38 },
    characterNote: 'Climate researcher. Earnest, grounded, quietly urgent.',
    delivery: {
      humor: 'minimal — earnest; at most a tired, rueful note about being ignored',
      sarcasm: 'rare and restrained',
      mannerisms: 'grounds claims in the physical world — water, megawatts, who lives downwind',
      tone: 'quietly urgent and steady; never shrill, never resigned',
    },
  },
  'labor-advocate': {
    // Nigerian man — ties the delivery to the bio's Global South data-labor supply chain.
    voiceId: 'U7wWSnxIJwCjioxt86mk',
    settings: { ...BASE, stability: 0.42, style: 0.48, speed: 1.02 },
    characterNote: 'Labor organizer. Direct, fired up, morally insistent.',
    delivery: {
      humor: "none — earnest and morally serious; speaks for people who aren't in the room",
      sarcasm: 'occasional bitter edge when describing how the work is hidden',
      mannerisms: 'names the workers and the wage; "let\'s be honest about who pays for this"',
      tone: 'direct and fired up; controlled anger, not a rant',
    },
  },
  'policy-realist': {
    voiceId: 'jRAAK67SEFE9m7ci5DhD', // English man — dry, buttoned-up regulatory register
    settings: { ...BASE, stability: 0.62, style: 0.18 },
    characterNote: 'Former regulatory attorney. Precise, dry, unhurried.',
    delivery: {
      humor: 'deadpan; the bone-dry wit of someone who has read the fine print',
      sarcasm: 'dry and understated — a flat aside about good intentions versus enforcement',
      mannerisms: 'measured qualifiers; "in practice", "on paper"; lets a precise point sit',
      tone: 'unhurried and even; the calm of someone who has seen rules fail before',
    },
  },
  'everyday-person': {
    voiceId: 'DbwWo4rVEd5NrejHYUnm', // Irish woman — warm, plainspoken (persona is written as female in part-i.ts)
    settings: { ...BASE, stability: 0.58, style: 0.28, speed: 0.96 },
    characterNote: 'Retired schoolteacher, late 60s. Warm, curious, plainspoken.',
    delivery: {
      humor:
        'gentle and self-aware; light wit about being new to all this, never the butt of the joke',
      sarcasm: 'none — earnest curiosity',
      mannerisms: 'asks the plain question everyone is thinking; "now, help me understand"',
      tone: 'warm and unhurried; genuine wonder, occasionally a little worried',
    },
  },
  'systems-humanist': {
    // Australian male — casual, conversational warmth; the bridge-builder register.
    voiceId: 'DYkrAHD8iwork3YSUBbs',
    settings: { ...BASE, stability: 0.5, style: 0.35, speed: 0.98 },
    characterNote: 'Technology ethicist. Measured, humane, accessible.',
    delivery: {
      humor: 'warm and wry; the occasional light analogy to defuse a tense exchange',
      sarcasm: 'none — reframes rather than jabs',
      mannerisms:
        'zooms out to the system; "no one chose this, exactly"; finds the shared incentive',
      tone: 'measured and humane; calm bridge-builder, never preachy',
    },
  },
  skeptic: {
    voiceId: 'IXa3pM2v3YjF2UVeGPGR', // American man — plain, grounded newsroom voice
    settings: { ...BASE, stability: 0.46, style: 0.44 }, // looser, more inflection for the wry asides
    characterNote: 'Veteran tech reporter. Wry, evidence-first, faintly weary.',
    delivery: {
      humor: 'wry and dry — the gallows humor of someone who has covered three bubbles',
      sarcasm: 'frequent and pointed, aimed at hype in both directions (boom and doom)',
      mannerisms:
        'asks for the number; "says who?"; deflates a breathless claim with a flat counter-fact',
      tone: 'faintly weary but sharp; unimpressed until shown the evidence',
    },
  },
  artist: {
    voiceId: 'DXX4Q5Bh1vqK8CciYVPf', // Black woman ("Kiki") — expressive, lyrical (persona is written as female in part-v.ts/part-ix.ts)
    settings: { ...BASE, stability: 0.38, style: 0.52 },
    characterNote: 'Working illustrator & musician. Expressive, personal, lyrical.',
    delivery: {
      humor: 'rueful, personal wit; can laugh at the absurdity without softening the loss',
      sarcasm: 'occasional, bittersweet — a sharp line about her work becoming "raw material"',
      mannerisms:
        'reaches for image and metaphor; speaks from her own experience, not abstractions',
      tone: 'expressive and lyrical; ranges from tender to quietly furious',
    },
  },
  accelerationist: {
    voiceId: '1THll2MhJjluQYaSQxDr', // Spanish male — fast, confident energy
    settings: { ...BASE, stability: 0.38, style: 0.48, speed: 1.1 },
    characterNote: 'e/acc founder. Fast, energetic, provocative.',
    delivery: {
      humor: 'provocative and quick; enjoys a sharp, contrarian one-liner',
      sarcasm: 'sharp and frequent toward "doomers" and caution for caution\'s sake',
      mannerisms:
        'reframes risk as the cost of delay; "every year we wait, people die waiting"; talks fast',
      tone: 'high-energy and bullish; relishes the argument, never defensive',
    },
  },
  'safety-researcher': {
    voiceId: 'Xh5OictnmgRO4dff7pLm', // Russian man — grave, deliberate weight for existential-risk stakes
    settings: { ...BASE, stability: 0.68, style: 0.18 },
    characterNote: 'Alignment researcher. Careful, deliberate, soberly precise.',
    delivery: {
      humor: 'sparing — a single dry, understated line to puncture false certainty',
      sarcasm: 'almost none; prefers careful precision to a jab',
      mannerisms:
        'thinks in probabilities and tail risk; "even a small chance, if it\'s irreversible"; pauses to qualify',
      tone: 'sober and deliberate; calm precisely because the stakes are high',
    },
  },
  'young-person': {
    voiceId: 'YyqkX0AHv8W5D1vxG9lR', // American woman — warm, witty, candid
    settings: { ...BASE, stability: 0.38, style: 0.48, speed: 1.04 },
    characterNote: 'University student, early 20s. Direct, candid, a little impatient.',
    delivery: {
      humor: 'candid, deadpan, gen-Z dry; quick to call something out as obvious',
      sarcasm: 'frequent and light, especially toward older voices treating this as a novelty',
      mannerisms:
        'speaks from lived experience; "I\'ve literally watched this happen"; a little impatient',
      tone: 'direct and unfiltered; warmer and more serious when describing friends who were hurt',
    },
  },
  clinician: {
    voiceId: 'DODLEQrClDo8wCz460ld', // American woman — friendly, comforting (persona is written as female in part-vii.ts)
    settings: { ...BASE, stability: 0.62, style: 0.22 },
    characterNote: 'Clinical psychologist. Calm, caring, carefully measured.',
    delivery: {
      humor: 'none — careful and compassionate; warmth, not jokes',
      sarcasm: 'none',
      mannerisms:
        'holds two truths at once; "it helps some people, and it harms others"; cites what she sees in the room',
      tone: 'calm and caring; measured precisely because real patients are behind every claim',
    },
  },
  economist: {
    voiceId: 'h8eW5xfRUGVJrZhAFxqK', // Scottish woman (persona is written as female in part-viii.ts: "Her argument")
    settings: { ...BASE, stability: 0.52, style: 0.34 }, // a touch more color for the dry, knowing wit
    characterNote: 'Political economist. Measured, dry, follows the incentives.',
    delivery: {
      humor: 'dry, knowing; the cool wit of someone who has watched the money move',
      sarcasm: 'understated — a flat "follow the money" aside when someone invokes good intentions',
      mannerisms:
        'always asks who captures the gain; "the question isn\'t what it can do, it\'s who owns it"',
      tone: 'measured and unhurried; cool detachment that sharpens on concentration of power',
    },
  },
  'equity-researcher': {
    voiceId: '6aDn1KB0hjpdcocrUkmq', // Black woman — sharp, principled
    settings: { ...BASE, stability: 0.48, style: 0.42 },
    characterNote: 'Algorithmic-justice researcher. Sharp, principled, insistent.',
    delivery: {
      humor:
        'minimal — a sharp, mirthless half-laugh at "neutral" systems, never levity about harm',
      sarcasm: 'pointed and precise when puncturing claims of objectivity',
      mannerisms:
        'names who the system fails; "a model trained on an unjust past will reproduce it at scale"',
      tone: 'sharp and principled; controlled insistence, evidence in hand',
    },
  },
  'land-defender': {
    // Nigerian woman — first-hand extraction-zone gravity (persona is written as
    // female in part-xi.ts: "She lives where the minerals come from").
    voiceId: 'b8XX4QShLFkd3yZQlz8T',
    settings: { ...BASE, stability: 0.56, style: 0.3, speed: 0.97 },
    characterNote: 'Community organizer in an extraction zone. Resolute, unvarnished, weighty.',
    delivery: {
      humor: 'none — earnest, grave, first-hand; the weight of lived experience, never a punchline',
      sarcasm: 'rare; at most a hard, quiet edge about who is never asked',
      mannerisms:
        'speaks from the ground; "come and see where it comes from"; concrete, unvarnished',
      tone: 'resolute and weighty; slow, deliberate, carries the gravity of the place',
    },
  },
}
