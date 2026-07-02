/**
 * Bar-specific interaction: hover (via the shared `useTooltip`) plus click-to-pin — clicking a
 * bar keeps its tooltip open and dims the others, until it's clicked again, a different bar is
 * clicked, `Escape` is pressed, or the pointer goes down outside the chart. Mouse/touch only, no
 * `tabIndex`: the pin is a convenience affordance, not a new information channel (every value is
 * already a static SVG label and every datum is already in the accessible data table), so it can
 * ship without the `ChartFrame` `role="img"`/`aria-hidden` rework a keyboard-focusable control
 * would need. Kept out of `useTooltip` itself since every other chart kind consumes that hook
 * as-is and has no use for pin state.
 */

import { useEffect, useRef, useState } from 'react'
import { useTooltip } from './useTooltip'
import type { TooltipState } from './useTooltip'

export function useBarInteraction() {
  const { tip, show, hide } = useTooltip()
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (pinnedIndex === null) return
    const onMouseDown = (e: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(e.target as Node)) {
        setPinnedIndex(null)
        hide()
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinnedIndex(null)
        hide()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [pinnedIndex, hide])

  const isDimmed = (i: number) => pinnedIndex !== null && pinnedIndex !== i

  /** Toggle the pin on datum `i`: pins+shows if unpinned or a different bar was pinned, clears if re-clicked. */
  const togglePin = (i: number, tipState: TooltipState) => {
    if (pinnedIndex === i) {
      setPinnedIndex(null)
      hide()
    } else {
      setPinnedIndex(i)
      show(tipState)
    }
  }

  return { tip, show, hide, svgRef, pinnedIndex, isDimmed, togglePin }
}
