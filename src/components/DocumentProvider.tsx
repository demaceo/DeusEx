import type { ReactNode } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import type { Claim, Source } from '../types/content'

interface DocumentProviderProps {
  claims: Record<string, Claim>
  /** The document's sources, so the evidence drawer can resolve a claim's source. */
  sources?: Source[]
  children: ReactNode
}

/** Supplies the active document's claims registry and sources to descendant components. */
export function DocumentProvider({ claims, sources = [], children }: DocumentProviderProps) {
  return <DocumentContext value={{ claims, sources }}>{children}</DocumentContext>
}
