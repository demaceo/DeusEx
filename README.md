# The AI Reckoning

A small React + TypeScript site that presents **The AI Reckoning** — a three-part roundtable
series in which five recurring voices (Tech Optimist, Environmentalist, Labor Advocate, Policy
Realist, and an Everyday Person) debate artificial intelligence:

1. **Part I — A Roundtable on Real Costs** (`/real-costs`) — energy, water, labor, regulation
2. **Part II — What's Actually Being Done** (`/whats-being-done`) — responses already underway
3. **Part III — What It's Actually Getting Right** (`/getting-right`) — documented positive outcomes

## How it's built (DRY by design)

The three documents share one design system, so the site is built from **content-as-data + one
shared component kit**, not three hand-maintained pages:

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
