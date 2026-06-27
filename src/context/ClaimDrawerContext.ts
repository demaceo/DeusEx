/**
 * Context for the evidence drawer. A leaf component (Citation, StatBox) calls
 * `open(claim, source)` to reveal the full evidence behind a claim. Kept separate
 * from the provider component so the module exports only a hook + context (Fast
 * Refresh friendly), mirroring the DocumentContext / DocumentProvider split.
 */

import { createContext, useContext } from 'react'
import type { Claim, Source } from '../types/content'

export interface ClaimDrawerValue {
  /** Open the evidence drawer for a claim (with its resolved source, if any). */
  open: (claim: Claim, source?: Source) => void
}

/** Default opener is a no-op, so leaf components render fine outside a provider (e.g. in unit tests). */
export const ClaimDrawerContext = createContext<ClaimDrawerValue>({ open: () => {} })

/** Open the evidence drawer from a leaf component. */
export function useClaimDrawer(): ClaimDrawerValue {
  return useContext(ClaimDrawerContext)
}
