import { useState } from 'react'

/** One line in the tooltip — a colored swatch plus an optional name and a value. */
export interface TooltipRow {
  name?: string
  value: number | string
  color: string
}

/** Tooltip position (canvas pixels) and contents. `null` hides it. */
export interface TooltipState {
  x: number
  y: number
  label?: string
  rows: TooltipRow[]
}

/** Minimal hover-tooltip state holder shared by the cartesian/radial chart kinds. */
export function useTooltip() {
  const [tip, setTip] = useState<TooltipState | null>(null)
  return { tip, show: setTip, hide: () => setTip(null) }
}
