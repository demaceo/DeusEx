import { describe, expect, it } from 'vitest'
import type { ChartSpec } from '../../types/document'
import { canvasHeight } from './geometry'

type WaffleSpec = Extract<ChartSpec, { kind: 'waffle' }>

const baseWaffle: WaffleSpec = {
  kind: 'waffle',
  title: 'Test waffle',
  ariaLabel: 'Test waffle',
  data: [
    { label: 'A', value: 70 },
    { label: 'B', value: 30 },
  ],
}

describe('canvasHeight (waffle)', () => {
  it('renders the default 100-cell (10-row) waffle at the historical 240px', () => {
    expect(canvasHeight(baseWaffle)).toBe(240)
  })

  it('scales taller for a waffle with more rows instead of clipping', () => {
    const bigWaffle: WaffleSpec = { ...baseWaffle, total: 250 }
    const height = canvasHeight(bigWaffle)
    expect(height).toBeGreaterThan(240)
    // 250 cells over 10 columns is 25 rows.
    expect(height).toBe(25 * 20 + 40)
  })
})
