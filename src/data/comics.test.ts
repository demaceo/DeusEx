import { describe, it, expect } from 'vitest'
import {
  COMICS,
  assertComicReferentialIntegrity,
  getAdjacentEpisodes,
  getComicBySlug,
} from './comics'

describe('comics registry', () => {
  it('contains episode I with its slug', () => {
    expect(COMICS).toHaveLength(1)
    expect(COMICS.map((entry) => entry.comic.slug)).toEqual(['good-faith-not-found'])
  })

  it('resolves known slugs and rejects unknown ones', () => {
    expect(getComicBySlug('good-faith-not-found')?.id).toBe('unfiltered-i')
    expect(getComicBySlug('not-a-real-slug')).toBeUndefined()
    expect(getComicBySlug(undefined)).toBeUndefined()
  })

  it('passes referential integrity for every episode', () => {
    for (const entry of COMICS) {
      expect(() => assertComicReferentialIntegrity(entry.comic)).not.toThrow()
    }
  })

  it('self-wraps adjacent navigation while there is a single episode', () => {
    const { prev, next } = getAdjacentEpisodes('unfiltered-i')
    expect(prev.slug).toBe('good-faith-not-found')
    expect(next.slug).toBe('good-faith-not-found')
  })

  it('backs every chorus quote with a verified claim', () => {
    for (const entry of COMICS) {
      const { comic } = entry
      for (const scene of comic.scenes) {
        for (const panel of scene.panels) {
          for (const block of panel.blocks) {
            if (block.type !== 'chorusSwarm') continue
            for (const bubble of block.data.bubbles) {
              if (!bubble.claimId) continue
              const claim = comic.claims[bubble.claimId]
              expect(claim, `claim ${bubble.claimId} in ${comic.id}`).toBeDefined()
              expect(claim.verificationStatus).toBe('verified')
              expect(claim.kind).toBe('citation')
            }
          }
        }
      }
    }
  })

  it('stores the real verbatim text for grawlixed quotes', () => {
    const comic = getComicBySlug('good-faith-not-found')!
    // grawlix is a rendering treatment; the registry keeps the actual words
    expect(comic.claims['c-uf1-r2'].claimText).toContain('fuck AI')
    expect(comic.claims['c-uf1-r2'].claimText).toContain('waste of human meat')
  })

  it('contains no em dash in any user-facing string', () => {
    // CLAUDE.md invariant: user-facing text never uses an em dash
    for (const entry of COMICS) {
      const serialized = JSON.stringify(entry.comic) + entry.navTitle + entry.blurb
      expect(serialized).not.toContain('—')
    }
  })
})
