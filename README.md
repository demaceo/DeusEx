# The AI Reckoning

A small React + TypeScript site that presents **The AI Reckoning** — a roundtable series in which
recurring voices (Tech Optimist, Environmentalist, Labor Advocate, Policy Realist, an Everyday
Person, a Systems Humanist, a Skeptic, and an Artist) debate artificial intelligence:

1. **Part I — A Roundtable on Real Costs** (`/real-costs`) — energy, water, labor, regulation
2. **Part II — What's Actually Being Done** (`/whats-being-done`) — responses already underway
3. **Part III — What It's Actually Getting Right** (`/getting-right`) — documented positive outcomes
4. **Part IV — The Race We're In** (`/the-race`) — incentives, coordination, governance
5. **Part V — The Reality Problem** (`/the-reality-problem`) — truth, synthetic media, trust

## Reading features

- **Evidence drawer** — click any statistic or citation to open a panel with its source, verified
  URL, reviewer note, and last-checked date (the full `Claim` behind the figure).
- **Evidence ledger** (`/verification`) — a series-wide verification dashboard tallying how many of
  each document's claims are verified, with a status filter and links to primary sources.
- **Follow a voice** (`/voices/:personaId`) — one persona's complete arc collected from every
  debate bubble they speak across the series.

## How it's built (DRY by design)

All documents share one design system, so the site is built from **content-as-data + one
shared component kit**, not hand-maintained pages:

- `src/types/` — the content model (`RoundtableDocument`, `Block`, `Claim`, `InlineNode`, …).
- `src/data/parts/part-*.ts` — each document as typed data; `src/data/documents.ts` is the slug
  registry.
- `src/components/` — one set of presentational components (Masthead, DebateEntry, StatGrid,
  Citation, …) rendered for all three documents.
- `src/styles/` — `tokens.css` is the single source of truth for the design system.

## Verification of statistics

Every statistic and citation is an individually-addressable **`Claim`** in a per-document
registry, each carrying a `verificationStatus` (`pending` / `verified` / `disputed` /
`unverified`) and a slot for a real source URL. Today everything is `pending` and the site
visibly flags figures as **not yet independently verified** — actual fact-checking against
primary sources is a dedicated later pass. A dev-time referential-integrity check
(`src/data/documents.ts`) ensures no claim or source reference dangles.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build
pnpm lint
pnpm preview
```

Deployed on Vercel; `vercel.json` adds an SPA rewrite so deep links (e.g. `/getting-right`)
resolve to the app.
