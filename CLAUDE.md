# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev            # dev server at http://localhost:5173
pnpm build          # tsc -b && vite build
pnpm typecheck      # type-check only (no emit)
pnpm lint           # eslint
pnpm format         # prettier --write
pnpm test           # vitest run (all tests, once)
pnpm test:watch     # vitest interactive watch mode
```

Run a single test file:

```bash
pnpm vitest run src/path/to/file.test.ts
```

Podcast generation (build-time, maintainer-only — needs API keys in `.env.local`):

```bash
pnpm podcast:generate -- --slug=real-costs --dry-run   # Claude rewrite only, no TTS spend
pnpm podcast:generate -- --slug=real-costs             # full synth + write assets
```

Pre-commit hooks (Husky + lint-staged) run ESLint + Prettier automatically on staged `.ts`/`.tsx` files.

## Architecture

This is **The AI Reckoning** — an eleven-part roundtable debate site built on a strict content-as-data pattern: typed schemas define the content model, data files hold all prose and metadata, and one shared component kit renders everything. No hand-authored page markup. A separate build-time pipeline can turn any part into a voiced podcast episode.

### Content model (`src/types/`)

Three files define the entire domain:

- **`content.ts`** — `Claim`, `Source`, `VerificationStatus` (`pending | verified | disputed | unverified`), `InlineNode` (text | cite), `Paragraph` (ordered `InlineNode[]`). The `Claim` is the unit of future fact-checking; every statistic and citation is one.
- **`document.ts`** — `Block` (discriminated union of all renderable content types), `Section`, `RoundtableDocument` (the top-level shape), `ChartSpec`, `StatBox`, and all supporting interfaces.
- **`persona.ts`** — `PersonaId`, `PersonaColor`, `Persona`. The recurring personas (14 as of Part XI: `tech-optimist`, `environmentalist`, … `equity-researcher`, `land-defender`) are declared once in `src/data/personas.ts`; part files reference only `PersonaId`.

### Data (`src/data/`)

- **`parts/part-{i–xi}.ts`** — each roundtable document as a fully-typed `RoundtableDocument` literal (eleven parts, using lowercase roman numerals). Every statistic is a `Claim` entry; every citation is an `InlineNode` of type `cite` referencing a `claimId`.
- **`documents.ts`** — the slug registry (`DOCUMENTS`, `DOCUMENTS_BY_SLUG`), navigation helpers (`getAdjacentParts`), persona thread projection (`getPersonaThread`), and **`assertReferentialIntegrity`** — a dev-time check (and test fixture) that throws on any dangling `claimId` or `sourceId`. This runs automatically in dev via `import.meta.env.DEV`.
- **`personas.ts`** — the authoritative `Persona` objects (one per `PersonaId`). **`personaVoices.ts`** — ElevenLabs voice casting per persona, used only by the podcast generator; it must have an entry for every `PersonaId` (`Record<PersonaId, VoiceCasting>`), so adding a persona requires adding its casting here or `tsc` fails.
- **`audioEpisodes.ts`** — runtime access to generated podcast episodes. Fetches the `public/audio/episodes.json` manifest (cached) and exposes `getEpisode(documentId)` / `getTranscript(episode)`; the play control only appears for parts present in the manifest.

### Components (`src/components/`)

- **`BlockRenderer.tsx`** — the central dispatch switch over `Block['type']`. Exhaustive: TypeScript errors at compile time if a new `Block` variant is added without a matching case. `ChartBlock` is lazy-loaded here to keep Recharts out of the initial bundle.
- **`RoundtablePage.tsx`** — wraps a `RoundtableDocument` in `DocumentProvider` (claims/sources context) and `ClaimDrawerProvider` (evidence drawer state), then renders Masthead → PersonasBar → sections → SourcesSection.
- **`DocumentProvider.tsx`** / **`DocumentContext.ts`** — supplies `claims` and `sources` to all descendant components so `Citation` and `EvidenceDrawer` can resolve references without prop drilling.
- **`EvidenceDrawer.tsx`** — slide-in panel triggered by clicking any `<cite>` node or stat box; reads from `ClaimDrawerContext`.
- **`ChartBlock.tsx`** — Recharts wrapper. Dispatches on `ChartSpec.kind` (`bar | line | donut | stackedBar`).

### Podcast subsystem (`scripts/`, build-time only)

The shipped app contains **no API keys and makes no TTS/LLM calls** — it only serves pre-generated MP3s + transcripts from `public/audio/`. Generation is a maintainer step:

- **`scripts/generate-podcast.ts`** — orchestrator: flatten part → Claude rewrite → ElevenLabs synth → stitch MP3 → write `public/audio/<id>.{mp3,transcript.json}` and upsert `episodes.json`. `--dry-run` stops after the Claude rewrite (no TTS spend) so wording can be signed off first.
- **`scripts/lib/`** — `flattenDocument.ts` (part → ordered turns), `adaptScript.ts` (Claude conversational rewrite, preserving every claim), `elevenlabs.ts` (synthesis), `types.ts`.
- It imports part modules **directly** (not `documents.ts`) because `documents.ts` references `import.meta.env.DEV` and throws under Node. When adding a part, also register it in the `DOCS` array in `generate-podcast.ts` if it should be podcast-able.
- Runtime side: **`MastheadPlayer.tsx`** (docked inside the sticky `Masthead`, condensing with it on scroll) + **`usePodcastPlayer.ts`** drive playback and current-speaker display from the transcript cues. See `scripts/README.md` for the full workflow and one-time `.env.local` setup.

### Design system (`src/styles/`)

- **`tokens.css`** — single source of truth for all colors, fonts, and easing. Persona colors are applied via the `[data-persona='...']` data attribute — components set `data-persona={personaId}` and CSS resolves `--persona-color`.
- **`chartTheme.ts`** — **mirrors `tokens.css` in hex** because Recharts renders SVG and CSS `var()` doesn't resolve for SVG attributes. If a token color changes, update both files.

### Pages (`src/pages/`) & routing

The route table lives in **`src/routes.tsx`** (single source of truth, used by `App` and by tests). Note `/:slug` is matched last so the static routes win.

| Route                | Page                                                         |
| -------------------- | ------------------------------------------------------------ |
| `/`                  | `IndexPage` — series landing with document cards             |
| `/verification`      | `VerificationPage` — claim status dashboard                  |
| `/voices/:personaId` | `PersonaThreadPage` — one persona's bubbles across all parts |
| `/:slug`             | `DocumentRoute` → `RoundtablePage`                           |
| `*`                  | `NotFound`                                                   |

### Key invariants

1. **Adding a new `Block` type** requires updating the `Block` union in `document.ts` AND adding a `case` in `BlockRenderer.tsx`. The `never` exhaustiveness guard in `BlockRenderer` will cause a compile error until both are done.
2. **Claim and source IDs must stay consistent** within a document. Add a claim to `doc.claims` and a source to `doc.sources` before referencing them in blocks — `assertReferentialIntegrity` (run in dev and in `documents.test.ts`) will throw on any dangling reference.
3. **Chart colors must be hex** in `chartTheme.ts`. Do not use `var(--token)` references there.
4. **Personas are never re-declared** in part files — use `PersonaId` only; the authoritative `Persona` objects live in `src/data/personas.ts`.
5. **Adding a new part** means: create `src/data/parts/part-{n}.ts`, add its id to the `DocumentId` union in `document.ts`, register it in `DOCUMENTS` in `documents.ts` (array order = series/nav order), and — if it should be podcast-able — add it to the `DOCS` array in `scripts/generate-podcast.ts`.
6. **Never use an em dash (`—`) in user-facing text** — that includes part content (`bio`, `focus`, prose `value`/`text` fields, chart `title`/`subtitle`/`description`/`ariaLabel`, `source`, pullquote `attribution`, claim `note`, etc.), persona copy, page/component JSX text, `aria-label`/`title` attributes, and `index.html` meta tags. Rewrite the sentence with a comma, period, colon, semicolon, or parentheses instead of substituting a hyphen or en dash for the em dash. This does not apply to code comments, which aren't user-facing.

## Deployment

Deployed on Vercel. `vercel.json` adds a catch-all SPA rewrite so all deep links (e.g. `/getting-right`) resolve to `index.html`.
