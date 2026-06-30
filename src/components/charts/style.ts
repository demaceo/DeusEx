/** Shared inline SVG text styles for the chart kit (axis ticks, value labels). */

import { CHART_COLORS, CHART_FONT } from '../chartTheme'

/** Mono axis-tick / category-label text, mirroring the old Recharts `AXIS_TICK`. */
export const AXIS_TEXT: React.CSSProperties = {
  fontFamily: CHART_FONT.mono,
  fontSize: 11,
  fill: CHART_COLORS.muted,
}

/** Mono always-on value label sitting on a bar/point. */
export const VALUE_LABEL: React.CSSProperties = {
  fontFamily: CHART_FONT.mono,
  fontSize: 11,
  fill: CHART_COLORS.ink,
  fontWeight: 600,
}
