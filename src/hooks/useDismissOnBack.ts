import { useEffect, useRef } from 'react'

/** Marks the throwaway history entry an open overlay pushes. */
const OVERLAY_STATE_KEY = '__deusexOverlay'

/**
 * Makes the browser/OS Back gesture close an overlay instead of navigating away
 * from the document underneath it.
 *
 * At mobile widths the drawer and modal both fill the viewport, so the scrim has
 * no exposed surface to tap and there is no hardware Escape key. Without this,
 * Back is the only instinct left and it throws the reader out of the article
 * entirely, losing their scroll position.
 *
 * While the overlay is open, one throwaway entry sits on the stack at the same
 * URL. Popping it fires `popstate` and closes the overlay. Closing any other way
 * (close button, Escape, scrim tap, drag-dismiss) pops that entry back off during
 * cleanup so it can never accumulate, guarded on the entry still being the
 * current one: if a navigation happened while the overlay was open, the stale
 * entry is left alone rather than yanking the reader backwards.
 */
export function useDismissOnBack(active: boolean, onClose: () => void) {
  // Held in a ref so an unstable caller-side callback identity can't tear down
  // and re-push the history entry mid-lifecycle. Synced in an effect rather than
  // during render; the initial value is already correct from useRef.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!active) return

    window.history.pushState({ [OVERLAY_STATE_KEY]: true }, '')
    let poppedByUser = false

    const onPop = () => {
      poppedByUser = true
      closeRef.current()
    }
    window.addEventListener('popstate', onPop)

    return () => {
      window.removeEventListener('popstate', onPop)
      // Back already consumed the entry; nothing left to clean up.
      if (poppedByUser) return
      // Only retract our own entry. If something navigated while the overlay was
      // open, the top of the stack is no longer ours and going back would undo
      // that navigation instead.
      if (window.history.state?.[OVERLAY_STATE_KEY]) window.history.back()
    }
  }, [active])
}
