import { describe, it, expect } from 'vitest'
import { getPersonaCrossings } from './documents'
import { PERSONA_ORDER, PERSONAS } from './personas'
import { resolveStance } from './stance'

describe('resolveStance', () => {
  it('prefers the per-turn override, then the round override, then the default', () => {
    expect(resolveStance('tech-optimist')).toBe('optimist')
    expect(resolveStance('tech-optimist', undefined, { 'tech-optimist': 'critic' })).toBe('critic')
    // Per-turn override wins over the round override.
    expect(resolveStance('tech-optimist', 'neutral', { 'tech-optimist': 'critic' })).toBe('neutral')
    // An override aimed at another persona doesn't affect this one.
    expect(resolveStance('environmentalist', undefined, { 'tech-optimist': 'neutral' })).toBe(
      PERSONAS['environmentalist'].stance,
    )
  })
})

describe('getPersonaCrossings', () => {
  it('surfaces the environmentalist arguing the optimist side in Part III', () => {
    const partIII = getPersonaCrossings('environmentalist').filter(
      (c) => c.slug === 'getting-right',
    )
    expect(partIII.length).toBeGreaterThan(0)
    expect(partIII.every((c) => c.stance === 'optimist')).toBe(true)
    expect(partIII[0].excerpt.length).toBeGreaterThan(0)
  })

  it('surfaces the clinician finding common ground in Machines We Talk To', () => {
    const crossing = getPersonaCrossings('clinician').find((c) => c.slug === 'machines-we-talk-to')
    expect(crossing).toBeDefined()
    expect(crossing?.stance).toBe('neutral')
  })

  it('returns nothing for a persona who never breaks from type', () => {
    expect(getPersonaCrossings('land-defender')).toEqual([])
  })

  it('only reports turns that differ from the default, with content and a part label', () => {
    for (const id of PERSONA_ORDER) {
      for (const crossing of getPersonaCrossings(id)) {
        expect(crossing.stance).not.toBe(PERSONAS[id].stance)
        expect(crossing.excerpt.length).toBeGreaterThan(0)
        expect(crossing.partLabel).toMatch(/^Part /)
      }
    }
  })
})
