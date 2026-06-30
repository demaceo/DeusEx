# Audio podcast generation

These scripts turn a static Roundtable part into a polished audio-podcast
episode at **build time**. The shipped app contains no API keys and makes no
TTS/LLM calls — it just serves the generated MP3 + transcript from `public/`.

## Pipeline

```
src/data/parts/part-*.ts                       (the static debate data)
   └─ flattenDocument()    → ordered spoken turns (intro/host + each persona)
       └─ adaptScript()    → Claude rewrites into natural spoken dialogue,
                             in each persona's own voice (humor/sarcasm/tone
                             from personaVoices.ts); every stat/claim preserved
           └─ ElevenLabs    → one cast voice per persona (personaVoices.ts)
               └─ stitch     → public/audio/<id>.mp3
                              + public/audio/<id>.transcript.json
                              + upsert public/audio/episodes.json (manifest)
```

The app reads `public/audio/episodes.json` at runtime and shows the masthead
play button only for parts present in it.

## One-time setup

1. `cp .env.example .env.local` and fill in `ELEVENLABS_API_KEY` and
   `ANTHROPIC_API_KEY`. (`.env.local` is gitignored.)
2. `npm install` (adds `@anthropic-ai/sdk`, `dotenv`, `tsx` as dev deps).
3. Cast each persona's voice in `src/data/personaVoices.ts` — swap the default
   ElevenLabs voice ids for voices from your own library if you prefer.

### Tuning a persona's character

`src/data/personaVoices.ts` holds two levers per persona, both authored here:

- **`settings`** — the ElevenLabs voice (stability/style/speed): controls how the
  voice _sounds_.
- **`delivery`** — humor, sarcasm, mannerisms, and tonal range: fed into
  `adaptScript()` so Claude writes each persona in their own register. This is
  what makes the Skeptic dry, the Accelerationist provocative, and keeps the
  Land Defender earnest. Humor is calibrated per persona and never lands on real
  harm. Edit `delivery` to change _how a persona talks_; edit `settings` to
  change _how their voice sounds_. Re-run a `--dry-run` after changing `delivery`
  to review the new wording before spending TTS credits.

## Generate an episode

Slugs match `RoundtableDocument.slug` (e.g. Part I is `real-costs`).

```sh
# 1. Editorial review — runs the Claude rewrite only, no ElevenLabs spend.
npm run podcast:generate -- --slug=real-costs --dry-run
#    Inspect public/audio/part-i.script.json: confirm every statistic, figure,
#    and persona position is preserved before spending TTS credits.

# 2. Full generation — synthesizes voices and writes the assets + manifest.
npm run podcast:generate -- --slug=real-costs
```

Then listen to `public/audio/part-i.mp3`, and commit the generated
`public/audio/*.mp3`, `*.transcript.json`, and `episodes.json`.

## Notes

- Turn timing in the transcript comes from ElevenLabs' character alignment;
  the player uses it to show the current speaker.
- Segments are concatenated MP3s (browsers play these fine). For studio-grade
  silence padding or background music, post-process the stitched file with
  `ffmpeg` — a natural place to extend `generate-podcast.ts`.
- Roll out to the rest of the series by re-running step 2 for each slug:
  `whats-actually-being-done`, `whats-actually-getting-right`, etc. (see
  `src/data/parts/*` for each `slug`).
