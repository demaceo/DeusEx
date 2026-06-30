/**
 * Pure math + formatting helpers shared by the d3-rendered chart kinds. No React,
 * no SVG — just the geometry (paths, nice scales, deltas) and value formatting the
 * kind components compose into markup.
 */

import type { ChartSpec } from '../../types/document'

/** Format a numeric value with its unit. Handles `%`, `$`-prefixed units, and suffixes. */
export function fmt(value: number, unit?: string): string {
  if (!unit) return `${value}`
  if (unit === '%') return `${value}%`
  if (unit.startsWith('$')) return `$${value}${unit.slice(1)}`
  return `${value} ${unit}`
}

/** Round a domain maximum up to a clean tick boundary so axes don't end mid-gap. */
export function niceMax(max: number): number {
  if (max <= 0) return 1
  const pow = Math.pow(10, Math.floor(Math.log10(max)))
  const n = max / pow
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10
  return step * pow
}

export interface Delta {
  /** Display text, e.g. "+105%", "×43", "−62%". */
  text: string
  /** Direction of change, for color/semantics. */
  sign: 'up' | 'down' | 'flat'
}

/**
 * The change from `before` to `after`, formatted as an editorial badge. Large
 * growth reads as a multiplier (`×43`), everything else as a signed percent
 * (`+105%`, `−62%`). Uses a true minus sign to match the type kit.
 */
export function computeDelta(before: number, after: number): Delta {
  if (before === 0) {
    return { text: after > 0 ? 'new' : '0%', sign: after > 0 ? 'up' : 'flat' }
  }
  const pct = ((after - before) / Math.abs(before)) * 100
  const sign: Delta['sign'] = pct > 0.5 ? 'up' : pct < -0.5 ? 'down' : 'flat'
  const ratio = after / before
  if (ratio >= 5) {
    const mult = ratio >= 10 ? Math.round(ratio) : Math.round(ratio * 10) / 10
    return { text: `×${mult}`, sign }
  }
  const rounded = Math.round(pct)
  const body = `${Math.abs(rounded)}%`
  return { text: rounded > 0 ? `+${body}` : rounded < 0 ? `−${body}` : body, sign }
}

/** Per-corner rounded-rectangle path. Corners clamp to the rect so thin bars stay clean. */
export function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  corners: { tl?: number; tr?: number; br?: number; bl?: number } = {},
): string {
  if (w <= 0 || h <= 0) return ''
  const lim = Math.min(w, h) / 2
  const tl = Math.min(corners.tl ?? 0, lim)
  const tr = Math.min(corners.tr ?? 0, lim)
  const br = Math.min(corners.br ?? 0, lim)
  const bl = Math.min(corners.bl ?? 0, lim)
  return [
    `M${x + tl},${y}`,
    `H${x + w - tr}`,
    tr ? `A${tr},${tr} 0 0 1 ${x + w},${y + tr}` : '',
    `V${y + h - br}`,
    br ? `A${br},${br} 0 0 1 ${x + w - br},${y + h}` : '',
    `H${x + bl}`,
    bl ? `A${bl},${bl} 0 0 1 ${x},${y + h - bl}` : '',
    `V${y + tl}`,
    tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : '',
    'Z',
  ]
    .filter(Boolean)
    .join(' ')
}

/** Index of the segment whose figure fills the donut gauge center (largest by default). */
export function dominantIndex(values: number[], override?: number): number {
  if (override != null && override >= 0 && override < values.length) return override
  let best = 0
  for (let i = 1; i < values.length; i += 1) if (values[i] > values[best]) best = i
  return best
}

/** Wide-screen default: proportion/legend charts float their aside into a side rail. */
export function defaultLayout(chart: ChartSpec): 'inline' | 'split' {
  if (chart.layout) return chart.layout
  return chart.kind === 'donut' ||
    chart.kind === 'stackedBar' ||
    chart.kind === 'waffle' ||
    chart.kind === 'pictogram'
    ? 'split'
    : 'inline'
}

/**
 * Canvas height per kind and data density — the core fix for the old fixed 280px
 * box that left sparse charts floating. Short comparisons get a low, deliberate
 * frame; horizontal layouts grow with their row count.
 */
export function canvasHeight(chart: ChartSpec): number {
  switch (chart.kind) {
    case 'donut':
      return 264
    case 'line':
      return chart.data.length <= 3 ? 220 : 280
    case 'stackedBar':
      return 300
    case 'bar': {
      const n = chart.data.length
      if (chart.orientation === 'horizontal') return Math.max(150, 44 + n * 46)
      return n <= 3 ? 240 : 300
    }
    case 'comparison':
      return 210
    case 'waffle':
      return 240
    case 'pictogram': {
      const total = chart.total ?? 100
      const rows = Math.ceil(total / 10)
      return rows * 24 + 24
    }
    case 'lollipop': {
      const n = chart.data.length
      if (chart.orientation === 'vertical') return n <= 3 ? 240 : 300
      return Math.max(150, 44 + n * 46)
    }
    case 'bullet':
      return Math.max(130, 26 + chart.data.length * 56)
  }
}
