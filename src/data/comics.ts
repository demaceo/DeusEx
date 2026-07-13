/**
 * Registry for the "Roundtable Reckoning" comic series. Deliberately separate
 * from `documents.ts`: comics never enter DOCUMENTS, so the essay series'
 * navigation, persona projections, chart catalog, verification dashboard, and
 * podcast pipeline are untouched. Mirrors the same dev-time
 * referential-integrity guard so dangling claims surface loudly.
 */

import type { ComicBlock, ComicDocument, ComicId } from '../types/comic'
import { unfilteredI } from './comics/unfiltered-i'

export interface ComicEntry {
  comic: ComicDocument
  /** "Episode I" / "Episode II". */
  episodeLabel: string
  /** Short distinctive title for the episode card. */
  navTitle: string
  /** One-line description for the episode card. */
  blurb: string
}

// Array order defines the series and navigation sequence.
export const COMICS: ComicEntry[] = [
  {
    comic: unfilteredI,
    episodeLabel: 'Episode I',
    navTitle: 'Good Faith Not Found',
    blurb: unfilteredI.cover.subtitle,
  },
]

export const COMICS_BY_SLUG: Record<string, ComicDocument> = Object.fromEntries(
  COMICS.map((entry) => [entry.comic.slug, entry.comic]),
)

export function getComicBySlug(slug: string | undefined): ComicDocument | undefined {
  if (!slug) return undefined
  return COMICS_BY_SLUG[slug]
}

/** A neighboring episode, projected for footer navigation. */
export interface EpisodeNavTarget {
  slug: string
  episodeLabel: string
  navTitle: string
}

/**
 * The previous and next episodes in series order, wrapping at the ends
 * (with a single episode, both point back at it). Throws if `id` is unknown.
 */
export function getAdjacentEpisodes(id: ComicId): {
  prev: EpisodeNavTarget
  next: EpisodeNavTarget
} {
  const n = COMICS.length
  const i = COMICS.findIndex((entry) => entry.comic.id === id)
  if (i === -1) {
    throw new Error(`getAdjacentEpisodes: unknown comic id "${id}"`)
  }
  const toTarget = (entry: ComicEntry): EpisodeNavTarget => ({
    slug: entry.comic.slug,
    episodeLabel: entry.episodeLabel,
    navTitle: entry.navTitle,
  })
  return {
    prev: toTarget(COMICS[(i - 1 + n) % n]),
    next: toTarget(COMICS[(i + 1) % n]),
  }
}

/** Collect every claimId referenced anywhere in a comic block. */
function claimIdsInComicBlock(block: ComicBlock): string[] {
  const ids: string[] = []
  switch (block.type) {
    case 'speech':
      for (const paragraph of block.data.paragraphs) {
        for (const node of paragraph) {
          if (node.type === 'cite') ids.push(node.claimId)
        }
      }
      break
    case 'chorusSwarm':
      for (const bubble of block.data.bubbles) {
        if (bubble.claimId) ids.push(bubble.claimId)
      }
      break
    case 'embeddedPost':
      if (block.data.claimId) ids.push(block.data.claimId)
      break
    case 'caption':
    case 'sfx':
      break
  }
  return ids
}

/**
 * Every referenced claimId resolves in `claims`, and every claim's sourceId
 * resolves in `sources`. Throws on the first dangling reference. Runs in dev
 * (below) and is exercised by the test suite.
 */
export function assertComicReferentialIntegrity(comic: ComicDocument): void {
  const referenced = new Set<string>()
  for (const scene of comic.scenes) {
    for (const panel of scene.panels) {
      for (const block of panel.blocks) {
        for (const id of claimIdsInComicBlock(block)) referenced.add(id)
      }
    }
  }
  for (const paragraph of comic.closing.paragraphs) {
    for (const node of paragraph) if (node.type === 'cite') referenced.add(node.claimId)
  }

  for (const id of referenced) {
    if (!comic.claims[id]) {
      throw new Error(`[${comic.id}] references unknown claim id "${id}"`)
    }
  }
  for (const claim of Object.values(comic.claims)) {
    if (claim.sourceId && !comic.sources.some((s) => s.id === claim.sourceId)) {
      throw new Error(
        `[${comic.id}] claim "${claim.id}" references unknown source "${claim.sourceId}"`,
      )
    }
  }
}

if (import.meta.env.DEV) {
  for (const entry of COMICS) assertComicReferentialIntegrity(entry.comic)
}
