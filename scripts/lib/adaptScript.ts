/**
 * Conversational adaptation pass.
 *
 * Takes the faithfully-flattened turns and asks Claude to rewrite them into a
 * natural spoken-word dialogue script — contractions, light reactions, a brief
 * host intro/outro, and first-mention speaker naming — WITHOUT altering the
 * substance. This is the lever that makes the episode sound like a real panel
 * instead of a flat read.
 *
 * Editorial guardrails (enforced in the system prompt): every statistic, figure,
 * proper noun, and claim is preserved verbatim; no facts are invented; each
 * persona's position is unchanged. The output is committed as a transcript so a
 * human can review the wording before any audio ships.
 *
 * Build-time only — never imported by the client bundle.
 */

import Anthropic from '@anthropic-ai/sdk'
import { PERSONAS } from '../../src/data/personas'
import type { PersonaId } from '../../src/types/persona'
import type { Speaker, Turn } from './types'

const MODEL = process.env.PODCAST_LLM_MODEL ?? 'claude-opus-4-8'

/** JSON schema constraining Claude's output to an ordered dialogue script. */
const SCRIPT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    turns: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          speaker: { type: 'string' },
          text: { type: 'string' },
        },
        required: ['speaker', 'text'],
      },
    },
  },
  required: ['turns'],
} as const

/** A roster line so Claude knows who each speaker is and how they sound. */
function rosterLine(id: PersonaId): string {
  const p = PERSONAS[id]
  return `- ${id} — ${p.name}: ${p.role}. Cares about: ${p.focus}.`
}

function buildSystemPrompt(speakers: Speaker[]): string {
  const personaIds = speakers.filter((s): s is PersonaId => s !== 'host')
  const roster = personaIds.map(rosterLine).join('\n')
  return `You are an audio producer adapting a written, fact-checked roundtable debate into a natural-sounding podcast script for text-to-speech narration.

You will receive an ordered list of turns. Each turn has a "speaker" (a persona id, or "host" for the narrator) and the written "text". Rewrite each turn so it sounds like a real person speaking on a panel — while preserving the exact substance.

THE PANEL:
${roster}
- host — the Narrator: a neutral podcast host who frames the episode and reads connective/figure passages.

WHAT TO DO (delivery):
- Convert formal written prose into natural spoken English: use contractions, smoother rhythm, and the occasional light verbal connector ("Look,", "Here's the thing,", "Right,"). Keep it tasteful — this is a serious panel, not banter.
- Add a brief host intro turn at the very start that names the show ("the DeusEx Roundtable") and the episode's topic, and a brief host outro turn at the very end.
- The FIRST time each persona speaks, have the host introduce them by name and role in the immediately preceding host turn (or fold a natural "—" intro into the host line). Do not re-introduce them after that.
- Where a host turn narrates a statistic or chart, keep it as a clean spoken sentence.
- You may lightly merge a persona's run-on sentences or split a very long one for breath, and add a short reaction opener — but do not add new arguments.

HARD EDITORIAL GUARDRAILS (do not violate):
- Preserve EVERY statistic, number, unit, date, percentage, monetary figure, organization name, and proper noun EXACTLY as written. Never round, convert, or paraphrase a figure.
- Do not invent facts, sources, examples, or claims that are not in the input.
- Do not change any persona's position, conclusion, or argument. Adapt how it is said, never what is said.
- Keep every persona turn attributed to its original speaker. You may ADD host turns (intros, transitions, outro) but never reassign a persona's content to another speaker.
- Keep the turns in their original order. Host intro/transition/outro turns may be inserted between them.

OUTPUT:
- Return JSON matching the schema: { "turns": [ { "speaker", "text" }, ... ] }.
- "speaker" must be one of the persona ids above or "host".
- "text" is the spoken line only — no stage directions, no markdown, no speaker labels inside the text.`
}

export interface AdaptOptions {
  /** Override the model id (defaults to PODCAST_LLM_MODEL or claude-opus-4-8). */
  model?: string
  /** Anthropic client; constructed from env if omitted. */
  client?: Anthropic
}

/**
 * Run the adaptation. Returns the rewritten, ordered dialogue turns. Throws if
 * the model returns a speaker id outside the known roster (a guard against
 * misattribution) or malformed JSON after the SDK's built-in schema validation.
 */
export async function adaptScript(turns: Turn[], opts: AdaptOptions = {}): Promise<Turn[]> {
  const client = opts.client ?? new Anthropic()
  const speakers = Array.from(new Set(turns.map((t) => t.speaker)))
  const validSpeakers = new Set<string>([...speakers, 'host'])

  const userPayload = JSON.stringify(
    turns.map((t) => ({ speaker: t.speaker, text: t.text })),
    null,
    2,
  )

  // Stream the request: with a large max_tokens + adaptive thinking the SDK
  // refuses a non-streaming call that could exceed its 10-minute timeout.
  const response = await client.messages
    .stream({
      model: opts.model ?? MODEL,
      max_tokens: 32000,
      thinking: { type: 'adaptive' },
      output_config: {
        format: { type: 'json_schema', schema: SCRIPT_SCHEMA },
      },
      system: buildSystemPrompt(speakers),
      messages: [
        {
          role: 'user',
          content: `Adapt these ${turns.length} turns into a spoken podcast script. Preserve all facts and figures verbatim.\n\n${userPayload}`,
        },
      ],
    })
    .finalMessage()

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('adaptScript: model returned no text content')
  }

  const parsed = JSON.parse(textBlock.text) as { turns: Array<{ speaker: string; text: string }> }
  const out: Turn[] = []
  for (const t of parsed.turns) {
    if (!validSpeakers.has(t.speaker)) {
      throw new Error(`adaptScript: model produced unknown speaker "${t.speaker}"`)
    }
    const text = t.text.trim()
    if (text) out.push({ speaker: t.speaker as Speaker, text })
  }
  return out
}
