/**
 * Chart color palette. Recharts paints SVG, and its renderer wants concrete hex
 * values (CSS `var()` doesn't resolve for every SVG attribute, and not at all in
 * jsdom under test). So this constant MIRRORS the design tokens in
 * `src/styles/tokens.css` — keep the two in sync if a token color ever changes.
 */

import type { ChartVariant } from '../types/document'

export const CHART_COLORS = {
  ink: '#0f0e0c',
  paper: '#f5f0e8',
  accent: '#c0392b',
  navy: '#1a3a5c',
  gold: '#b8860b',
  muted: '#6b6355',
  rule: '#d4cfc4',
  panel: '#ede8dc',
  white: '#ffffff',
  // persona colors
  optimist: '#27ae60',
  environ: '#16a085',
  labor: '#d35400',
  policy: '#2980b9',
} as const

const VARIANT_TO_COLOR: Record<ChartVariant, string> = {
  accent: CHART_COLORS.accent,
  navy: CHART_COLORS.navy,
  gold: CHART_COLORS.gold,
  optimist: CHART_COLORS.optimist,
  environ: CHART_COLORS.environ,
  labor: CHART_COLORS.labor,
  policy: CHART_COLORS.policy,
}

/** Resolve a {@link ChartVariant} to its hex color; defaults to the brand accent. */
export function variantColor(variant?: ChartVariant): string {
  return variant ? VARIANT_TO_COLOR[variant] : CHART_COLORS.accent
}

/** A muted-to-accent rotation used to color a single-series chart's segments/bars. */
export const SEGMENT_VARIANTS: ChartVariant[] = [
  'navy',
  'accent',
  'gold',
  'policy',
  'environ',
  'optimist',
]

/** Shared typography/axis styling for chart ticks and labels. */
export const CHART_FONT = {
  mono: "'IBM Plex Mono', ui-monospace, monospace",
  display: "'Playfair Display', Georgia, serif",
} as const

/** Tick props shared across cartesian axes. */
export const AXIS_TICK = {
  fontFamily: CHART_FONT.mono,
  fontSize: 11,
  fill: CHART_COLORS.muted,
} as const
