/**
 * Build-time podcast generator.
 *
 * Pipeline:  part data  ->  flatten to turns  ->  Claude conversational rewrite
 *            ->  ElevenLabs synthesis (cast voice per persona)  ->  stitch MP3
 *            ->  write public/audio/<id>.mp3 + .transcript.json  ->  upsert
 *            public/audio/episodes.json (the runtime manifest the app reads).
 *
 * Run by a maintainer with API keys in .env.local — NEVER shipped to the client.
 *
 *   node --import tsx scripts/generate-podcast.ts --id=part-i --dry-run
 *   node --import tsx scripts/generate-podcast.ts --id=part-i
 *   node --import tsx scripts/generate-podcast.ts --id=part-i --from-script
 *
 * --dry-run stops after the Claude rewrite and writes only the reviewable script
 * JSON (no ElevenLabs spend), so the adapted wording can be signed off first.
 * --from-script skips flattening + the Claude rewrite entirely and synthesizes
 * the already-reviewed public/audio/<id>.script.json as-is: no ANTHROPIC_API_KEY
 * needed, and the audio matches exactly the wording that was signed off.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

// Load secrets from the repo root. `.env.local` is the documented, gitignored
// (*.local) target; `.env` is a fallback. Earlier paths win in dotenv.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: [resolve(ROOT, '.env.local'), resolve(ROOT, '.env')], quiet: true })

import { HOST_VOICE, PERSONA_VOICES } from '../src/data/personaVoices'
import type { RoundtableDocument } from '../src/types/document'
import { partI } from '../src/data/parts/part-i'
import { partII } from '../src/data/parts/part-ii'
import { partIII } from '../src/data/parts/part-iii'
import { partIV } from '../src/data/parts/part-iv'
import { partV } from '../src/data/parts/part-v'
import { partVI } from '../src/data/parts/part-vi'
import { partVII } from '../src/data/parts/part-vii'
import { partVIII } from '../src/data/parts/part-viii'
import { partIX } from '../src/data/parts/part-ix'
import { partX } from '../src/data/parts/part-x'
import { partXI } from '../src/data/parts/part-xi'
import { adaptScript } from './lib/adaptScript'
import { flattenDocument } from './lib/flattenDocument'
import { synthesize } from './lib/elevenlabs'
import type { EpisodeTranscript, TranscriptCue, Turn } from './lib/types'

// Import part modules directly (they import only types) to avoid src/data/documents.ts,
// which references import.meta.env.DEV and throws under Node.
const DOCS: RoundtableDocument[] = [
  partI,
  partII,
  partIII,
  partIV,
  partV,
  partVI,
  partVII,
  partVIII,
  partIX,
  partX,
  partXI,
]

const HERE = dirname(fileURLToPath(import.meta.url))
const AUDIO_DIR = resolve(HERE, '../public/audio')
const MANIFEST_PATH = resolve(AUDIO_DIR, 'episodes.json')

interface ManifestEntry {
  slug: string
  title: string
  src: string
  durationSec: number
  transcript: string
}
type Manifest = Record<string, ManifestEntry>

function parseArgs(argv: string[]): { id?: string; dryRun: boolean; fromScript: boolean } {
  let id: string | undefined
  let dryRun = false
  let fromScript = false
  for (const arg of argv) {
    if (arg === '--dry-run') dryRun = true
    else if (arg === '--from-script') fromScript = true
    else if (arg.startsWith('--id=')) id = arg.slice('--id='.length)
  }
  return { id, dryRun, fromScript }
}

function voiceFor(speaker: Turn['speaker']) {
  return speaker === 'host' ? HOST_VOICE : PERSONA_VOICES[speaker]
}

function episodeTitle(doc: RoundtableDocument): string {
  return doc.masthead.titleLines.map((line) => line.map((span) => span.text).join('')).join(' — ')
}

async function readManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST_PATH)) return {}
  try {
    return JSON.parse(await readFile(MANIFEST_PATH, 'utf8')) as Manifest
  } catch {
    return {}
  }
}

async function main() {
  const { id, dryRun, fromScript } = parseArgs(process.argv.slice(2))
  if (!id) {
    console.error('Usage: generate-podcast.ts --id=<id> [--dry-run | --from-script]')
    process.exit(1)
  }

  const doc = DOCS.find((d) => d.id === id)
  if (!doc) {
    console.error(`Unknown id "${id}". Known: ${DOCS.map((d) => d.id).join(', ')}`)
    process.exit(1)
  }

  await mkdir(AUDIO_DIR, { recursive: true })

  const scriptPath = resolve(AUDIO_DIR, `${doc.id}.script.json`)
  let script: Turn[]

  if (fromScript) {
    if (!existsSync(scriptPath)) {
      console.error(`--from-script given but ${scriptPath} does not exist. Run without it first.`)
      process.exit(1)
    }
    console.log(`[1/4] Reusing reviewed script at ${scriptPath} (no flatten, no Claude call)…`)
    const saved = JSON.parse(await readFile(scriptPath, 'utf8')) as { turns: Turn[] }
    script = saved.turns
    console.log(`      ${script.length} spoken turns.`)
  } else {
    console.log(`[1/4] Flattening ${doc.id} (${doc.slug})…`)
    const flat = flattenDocument(doc)
    console.log(`      ${flat.length} source turns.`)

    console.log('[2/4] Adapting to spoken dialogue with Claude (guardrails on)…')
    script = await adaptScript(flat)
    console.log(`      ${script.length} spoken turns.`)

    // Always write the reviewable script for editorial sign-off.
    await writeFile(scriptPath, JSON.stringify({ slug: doc.slug, turns: script }, null, 2))
    console.log(`      Script written to ${scriptPath}`)

    if (dryRun) {
      console.log(
        '[dry-run] Stopping before synthesis. Review the script, then re-run without --dry-run.',
      )
      return
    }
  }

  console.log('[3/4] Synthesizing with ElevenLabs (cast voices)…')
  const segments: Buffer[] = []
  const cues: TranscriptCue[] = []
  let cursorMs = 0
  for (let i = 0; i < script.length; i++) {
    const turn = script[i]
    const voice = voiceFor(turn.speaker)
    const { audio, durationMs } = await synthesize(turn.text, voice.voiceId, voice.settings)
    segments.push(audio)
    cues.push({ ...turn, startMs: cursorMs, endMs: cursorMs + durationMs })
    cursorMs += durationMs
    process.stdout.write(`\r      ${i + 1}/${script.length} turns synthesized…`)
  }
  process.stdout.write('\n')

  console.log('[4/4] Stitching + writing assets…')
  const mp3 = Buffer.concat(segments)
  const mp3Rel = `/audio/${doc.id}.mp3`
  const transcriptRel = `/audio/${doc.id}.transcript.json`
  await writeFile(resolve(AUDIO_DIR, `${doc.id}.mp3`), mp3)

  const transcript: EpisodeTranscript = {
    slug: doc.slug,
    documentId: doc.id,
    durationMs: cursorMs,
    cues,
  }
  await writeFile(resolve(AUDIO_DIR, `${doc.id}.transcript.json`), JSON.stringify(transcript))

  const manifest = await readManifest()
  manifest[doc.id] = {
    slug: doc.slug,
    title: episodeTitle(doc),
    src: mp3Rel,
    durationSec: Math.round(cursorMs / 100) / 10,
    transcript: transcriptRel,
  }
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

  console.log(
    `\nDone. ${doc.id}: ${(cursorMs / 1000).toFixed(1)}s across ${cues.length} turns.\n` +
      `  ${mp3Rel}\n  ${transcriptRel}\n  manifest: ${MANIFEST_PATH}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
