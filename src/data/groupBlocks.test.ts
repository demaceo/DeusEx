import { describe, expect, it } from 'vitest'
import type { Block, DebateEntry } from '../types/document'
import type { PersonaId } from '../types/persona'
import { groupBlocks, type DebateThreadGroup } from './groupBlocks'

const debate = (personaId: PersonaId): Block => ({
  type: 'debate',
  data: { personaId, bubble: { paragraphs: [] } },
})

const prose: Block = { type: 'prose', data: { paragraphs: [] } }
const divider: Block = { type: 'divider' }

const speakers = (group: DebateThreadGroup): PersonaId[] =>
  group.turns.map((t: DebateEntry) => t.personaId)

describe('groupBlocks', () => {
  it('returns nothing for no blocks', () => {
    expect(groupBlocks([])).toEqual([])
  })

  it('wraps a lone debate block in a single-turn thread', () => {
    const groups = groupBlocks([debate('tech-optimist')])
    expect(groups).toHaveLength(1)
    expect(groups[0]).toMatchObject({ kind: 'debateThread' })
    expect(speakers(groups[0] as DebateThreadGroup)).toEqual(['tech-optimist'])
  })

  it('coalesces a run of consecutive debate blocks into one thread, in order', () => {
    const groups = groupBlocks([
      debate('everyday-person'),
      debate('tech-optimist'),
      debate('tech-optimist'),
      debate('environmentalist'),
    ])
    expect(groups).toHaveLength(1)
    expect(speakers(groups[0] as DebateThreadGroup)).toEqual([
      'everyday-person',
      'tech-optimist',
      'tech-optimist',
      'environmentalist',
    ])
  })

  it('passes non-debate blocks straight through', () => {
    const groups = groupBlocks([prose, divider])
    expect(groups).toEqual([
      { kind: 'block', block: prose },
      { kind: 'block', block: divider },
    ])
  })

  it('splits a thread when a non-debate block interrupts it', () => {
    const groups = groupBlocks([debate('tech-optimist'), prose, debate('environmentalist')])
    expect(groups.map((g) => g.kind)).toEqual(['debateThread', 'block', 'debateThread'])
    expect(speakers(groups[0] as DebateThreadGroup)).toEqual(['tech-optimist'])
    expect(speakers(groups[2] as DebateThreadGroup)).toEqual(['environmentalist'])
  })

  it('handles leading and trailing non-debate blocks around a run', () => {
    const groups = groupBlocks([prose, debate('skeptic'), debate('economist'), divider])
    expect(groups.map((g) => g.kind)).toEqual(['block', 'debateThread', 'block'])
    expect(speakers(groups[1] as DebateThreadGroup)).toEqual(['skeptic', 'economist'])
  })

  it('preserves original block order overall', () => {
    const groups = groupBlocks([debate('artist'), divider, prose, debate('clinician')])
    expect(groups.map((g) => g.kind)).toEqual(['debateThread', 'block', 'block', 'debateThread'])
  })
})
