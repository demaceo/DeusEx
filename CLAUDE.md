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
pnpm podcast:generate -- --id=part-i --dry-run   # Claude rewrite only, no TTS spend
pnpm podcast:generate -- --id=part-i             # full synth + write assets
```

Pre-commit hooks (Husky + lint-staged) run ESLint + Prettier automatically on staged `.ts`/`.tsx` files.

## Architecture

This is **The AI Reckoning** — an eleven-part roundtable debate site built on a strict content-as-data pattern: typed schemas define the content model, data files hold all prose and metadata, and one shared component kit renders everything. No hand-authored page markup. A separate build-time pipeline can turn any part into a voiced podcast episode.

### Content model (`src/types/`)

Three files define the entire domain:

- **`content.ts`** — `Claim`, `Source`, `VerificationStatus` (`pending | verified | disputed | unverified`), `InlineNode` (text | cite), `Paragraph` (ordered `InlineNode[]`). The `Claim` is the unit of future fact-checking; every statistic and citation is one.
- **`document.ts`** — `Block` (discriminated union of all renderable content types), `Section`, `RoundtableDocument` (the top-level shape), `ChartSpec`, `StatBox`, and all supporting interfaces.
- **`persona.ts`** — `PersonaId`, `PersonaColor`, `PersonaStance`, `Persona`. The recurring personas (15 as of Part XI: `tech-optimist`, `environmentalist`, … `equity-researcher`, `land-defender`) are declared once in `src/data/personas.ts`; part files reference only `PersonaId`. A persona's `stance` (`optimist | critic | neutral`) is their default camp on the debate stage; `Section.stanceOverride` and `DebateEntry.stance` override it per round / per turn (resolved by `src/data/stance.ts`).

### Data (`src/data/`)

- **`parts/part-{i–xi}.ts`** — each roundtable document as a fully-typed `RoundtableDocument` literal (eleven parts, using lowercase roman numerals). Every statistic is a `Claim` entry; every citation is an `InlineNode` of type `cite` referencing a `claimId`.
- **`documents.ts`** — the slug registry (`DOCUMENTS`, `DOCUMENTS_BY_SLUG`), navigation helpers (`getAdjacentParts`, `sectionId`), persona projections (`getPersonaThread`, `getPersonaCrossings`, `getAllCrossings`, `personasInDocument`), and **`assertReferentialIntegrity`** — a dev-time check (and test fixture) that throws on any dangling `claimId` or `sourceId`. This runs automatically in dev via `import.meta.env.DEV`.
- **`personas.ts`** — the authoritative `Persona` objects (one per `PersonaId`). **`personaVoices.ts`** — ElevenLabs voice casting per persona, used only by the podcast generator; it must have an entry for every `PersonaId` (`Record<PersonaId, VoiceCasting>`), so adding a persona requires adding its casting here or `tsc` fails.
- **`audioEpisodes.ts`** — runtime access to generated podcast episodes. Fetches the `public/audio/episodes.json` manifest (cached) and exposes `getEpisode(documentId)` / `getTranscript(episode)`; the play control only appears for parts present in the manifest.

### Components (`src/components/`)

- **`BlockRenderer.tsx`** — the central dispatch switch over `Block['type']`. Exhaustive: TypeScript errors at compile time if a new `Block` variant is added without a matching case. `ChartBlock` is lazy-loaded here to keep the d3-backed chart chunk out of the initial bundle (the same `lazy()` boundary is used by `ChartModal` and `ChartCatalogPage`).
- **`RoundtablePage.tsx`** — wraps a `RoundtableDocument` in `DocumentProvider` (claims/sources context) and `ClaimDrawerProvider` (evidence drawer state), then renders Masthead → PersonasBar → sections → SourcesSection.
- **`DocumentProvider.tsx`** / **`DocumentContext.ts`** — supplies `claims` and `sources` to all descendant components so `Citation` and `EvidenceDrawer` can resolve references without prop drilling.
- **`EvidenceDrawer.tsx`** — slide-in panel triggered by clicking any `<cite>` node or stat box; reads from `ClaimDrawerContext`.
- **`ChartBlock.tsx`** — entry point for a chart figure; aggregates the verification status of its backing claims and hands off to `charts/ChartFrame` (figure shell, legend, screen-reader data table, source line) and `charts/ChartCanvas`, which dispatches on `ChartSpec.kind` (`bar | line | donut | stackedBar | comparison | waffle | lollipop | pictogram | bullet | worldMap`). Charts are hand-built React SVG over d3 scales/shapes (`d3-array`, `d3-scale`, `d3-shape`, `d3-geo` + `topojson-client` for the world map). There is no charting library.

### Podcast subsystem (`scripts/`, build-time only)

The shipped app contains **no API keys and makes no TTS/LLM calls** — it only serves pre-generated MP3s + transcripts from `public/audio/`. Generation is a maintainer step:

- **`scripts/generate-podcast.ts`** — orchestrator: flatten part → Claude rewrite → ElevenLabs synth → stitch MP3 → write `public/audio/<id>.{mp3,transcript.json}` and upsert `episodes.json`. `--dry-run` stops after the Claude rewrite (no TTS spend) so wording can be signed off first.
- **`scripts/lib/`** — `flattenDocument.ts` (part → ordered turns), `adaptScript.ts` (Claude conversational rewrite, preserving every claim), `elevenlabs.ts` (synthesis), `types.ts`.
- It imports part modules **directly** (not `documents.ts`) because `documents.ts` references `import.meta.env.DEV` and throws under Node. When adding a part, also register it in the `DOCS` array in `generate-podcast.ts` if it should be podcast-able.
- Runtime side: **`MastheadPlayer.tsx`** (docked inside the sticky `Masthead`, condensing with it on scroll) + **`usePodcastPlayer.ts`** drive playback and current-speaker display from the transcript cues. See `scripts/README.md` for the full workflow and one-time `.env.local` setup.

### Design system (`src/styles/`)

- **Webfonts** — the three editorial faces (Playfair Display, Source Serif 4, IBM Plex Mono) are self-hosted via `@fontsource` and imported once in **`src/main.tsx`**. The two serifs are variable fonts, which fontsource declares under a `Variable`-suffixed family name, so `--font-display` / `--font-serif` must lead with `'Playfair Display Variable'` / `'Source Serif 4 Variable'` and `chartTheme.ts` must mirror that. Mono is static: only weights 400/600/700 are imported, so a new bold-mono rule needs its weight added there. Comic faces stay page-level imports.
- **`tokens.css`** — single source of truth for all colors, fonts, and easing. Persona colors are applied via the `[data-persona='...']` data attribute — components set `data-persona={personaId}` and CSS resolves `--persona-color`.
- **`src/components/chartTheme.ts`** — **mirrors `tokens.css` in hex** because charts paint SVG and CSS `var()` doesn't resolve for SVG attributes (and not at all in jsdom under test). If a token color changes, update both files.

### Comic series — "Roundtable Reckoning" (`/unfiltered`)

A second, visually separate series: unfiltered conversations rendered as an animated comic book. It is a deliberate parallel universe to the essay series — comics never enter `DOCUMENTS`, so essay navigation, persona projections, the chart catalog, the verification dashboard, and the podcast pipeline are untouched.

- **`src/types/comic.ts`** — `ComicDocument`, `ComicScene`, `ComicPanel`, and the `ComicBlock` union (`caption | speech | chorusSwarm | sfx | embeddedPost`). `ComicSpeaker` is either a series-local `ComicCastId` (`the-researcher`, `the-chorus`; declared in `src/data/comics/cast.ts`, NOT in `PersonaId`) or a guest `PersonaId` resolving through `PERSONAS`.
- **`src/data/comics.ts`** — the comic registry (`COMICS`, `getComicBySlug`, `getAdjacentEpisodes`) and `assertComicReferentialIntegrity` (dev + `comics.test.ts`). Episodes live in `src/data/comics/` (e.g. `unfiltered-i.ts`).
- **`src/components/comic/ComicBlockRenderer.tsx`** — exhaustive switch over `ComicBlock['type']` with the same `never` guard idiom as `BlockRenderer`; adding a comic block variant requires a case here.
- **`src/styles/comic.css`** — the comic design system. Every rule is scoped under `[data-series='roundtable-reckoning']`; full-page chrome only under `.comic-root[data-series=…]`. `tokens.css`/`base.css`/`components.css` are untouched by it. Comic fonts (`@fontsource/bangers`, `@fontsource/permanent-marker`) are imported from the comic pages only, so essay pages never load them.
- **Grawlix**: hostile quotes may render partially as comic symbol swearing (`grawlixParts`), but the claim registry always stores the real verbatim text; grawlix glyphs are `aria-hidden` with an `sr-only` "[expletive]" fallback.
- **Adding an episode**: create `src/data/comics/<id>.ts`, extend `ComicId` in `types/comic.ts`, register it in `COMICS`. Podcast generation does not apply to comics.

### Pages (`src/pages/`) & routing

The route table lives in **`src/routes.tsx`** (single source of truth, used by `App` and by tests). Note `/:slug` is matched last so the static routes win.

| Route                | Page                                                             |
| -------------------- | ---------------------------------------------------------------- |
| `/`                  | `IndexPage` — series landing with document cards                 |
| `/verification`      | `VerificationPage` — claim status dashboard (`?status=` filter)  |
| `/voices`            | `VoicesIndexPage` — series-wide map of stance crossings          |
| `/voices/:personaId` | `PersonaThreadPage` — one persona's bubbles across all parts     |
| `/charts`            | `ChartCatalogPage` — every chart in the series (`?kind=` filter) |
| `/unfiltered`        | `UnfilteredIndexPage` — comic series landing                     |
| `/unfiltered/:slug`  | `ComicRoute` → `ComicPage`                                       |
| `/:slug`             | `DocumentRoute` → `RoundtablePage`                               |
| `*`                  | `NotFound`                                                       |

### Key invariants

1. **Adding a new `Block` type** requires updating the `Block` union in `document.ts` AND adding a `case` in `BlockRenderer.tsx`. The `never` exhaustiveness guard in `BlockRenderer` will cause a compile error until both are done.
2. **Claim and source IDs must stay consistent** within a document. Add a claim to `doc.claims` and a source to `doc.sources` before referencing them in blocks — `assertReferentialIntegrity` (run in dev and in `documents.test.ts`) will throw on any dangling reference.
3. **Chart colors must be hex** in `chartTheme.ts`. Do not use `var(--token)` references there.
4. **Personas are never re-declared** in part files — use `PersonaId` only; the authoritative `Persona` objects live in `src/data/personas.ts`.
5. **Adding a new part** means: create `src/data/parts/part-{n}.ts`, add its id to the `DocumentId` union in `document.ts`, register it in `DOCUMENTS` in `documents.ts` (array order = series/nav order), and — if it should be podcast-able — add it to the `DOCS` array in `scripts/generate-podcast.ts`.
6. **Never use an em dash (`—`) in user-facing text** — that includes part content (`bio`, `focus`, prose `value`/`text` fields, chart `title`/`subtitle`/`description`/`ariaLabel`, `source`, pullquote `attribution`, claim `note`, etc.), persona copy, page/component JSX text, `aria-label`/`title` attributes, and `index.html` meta tags. Rewrite the sentence with a comma, period, colon, semicolon, or parentheses instead of substituting a hyphen or en dash for the em dash. This does not apply to code comments, which aren't user-facing.

## Deployment

Deployed on Vercel. `vercel.json` adds a catch-all SPA rewrite so all deep links (e.g. `/getting-right`) resolve to `index.html`.
