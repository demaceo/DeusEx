import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

/** How far the sheet must travel before releasing dismisses it. */
const DISMISS_THRESHOLD_PX = 90

export interface DragToDismiss {
  /** Live downward travel in px. 0 when idle. */
  offset: number
  /** True while a drag gesture is in flight (suppresses the settle transition). */
  dragging: boolean
  /** Spread onto the grab handle. */
  handleProps: {
    onPointerDown: (e: ReactPointerEvent<HTMLElement>) => void
    onPointerMove: (e: ReactPointerEvent<HTMLElement>) => void
    onPointerUp: (e: ReactPointerEvent<HTMLElement>) => void
    onPointerCancel: (e: ReactPointerEvent<HTMLElement>) => void
  }
}

/**
 * Drag-down-to-dismiss for a bottom/full-height sheet, driven from a grab handle.
 *
 * This is the gesture readers already have in every native sheet they use, and on
 * mobile it is the cheapest dismissal available: it starts at the top of the sheet
 * where the thumb already is, rather than at a small target in the far corner.
 *
 * Travel is clamped to downward only, so dragging up can never lift the sheet off
 * its anchor. Releasing past the threshold closes; anything short of it settles
 * back to rest.
 */
export function useDragToDismiss(onClose: () => void): DragToDismiss {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startY = useRef(0)

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLElement>) => {
    // Primary button/touch only, so a right-click or secondary pointer on the
    // handle doesn't start a gesture that can never be released cleanly.
    if (e.button !== 0) return
    startY.current = e.clientY
    setDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Pointer capture is unavailable (jsdom, older engines). The gesture still
      // tracks via the handler pair below; it just won't survive leaving the handle.
    }
  }, [])

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!dragging) return
      setOffset(Math.max(0, e.clientY - startY.current))
    },
    [dragging],
  )

  const onPointerEnd = useCallback(() => {
    if (!dragging) return
    setDragging(false)
    if (offset > DISMISS_THRESHOLD_PX) onClose()
    setOffset(0)
  }, [dragging, offset, onClose])

  return {
    offset,
    dragging,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
  }
}
