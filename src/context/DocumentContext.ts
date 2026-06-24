/**
 * Context that exposes the active document's claims registry to leaf components
 * (Citation, StatBox) so they can resolve a claimId → Claim without prop-drilling.
 */

import { createContext, useContext } from 'react'
import type { Claim } from '../types/content'

export interface DocumentContextValue {
  claims: Record<string, Claim>
}

export const DocumentContext = createContext<DocumentContextValue | null>(null)

/** Resolve a single claim by id. Returns undefined if the id is unknown. */
export function useClaim(claimId: string | undefined): Claim | undefined {
  const ctx = useContext(DocumentContext)
  if (!ctx || !claimId) return undefined
  return ctx.claims[claimId]
}
