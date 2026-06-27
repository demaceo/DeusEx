/**
 * Context that exposes the active document's claims registry (and the sources
 * those claims rest on) to leaf components (Citation, StatBox) so they can resolve
 * a claimId → Claim → Source without prop-drilling.
 */

import { createContext, useContext } from 'react'
import type { Claim, Source } from '../types/content'

export interface DocumentContextValue {
  claims: Record<string, Claim>
  sources: Source[]
}

export const DocumentContext = createContext<DocumentContextValue | null>(null)

/** Resolve a single claim by id. Returns undefined if the id is unknown. */
export function useClaim(claimId: string | undefined): Claim | undefined {
  const ctx = useContext(DocumentContext)
  if (!ctx || !claimId) return undefined
  return ctx.claims[claimId]
}

/** Resolve a single source by id within the active document. */
export function useSource(sourceId: string | undefined): Source | undefined {
  const ctx = useContext(DocumentContext)
  if (!ctx || !sourceId) return undefined
  return ctx.sources.find((s) => s.id === sourceId)
}
