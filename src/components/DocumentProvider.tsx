import type { ReactNode } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import type { Claim } from '../types/content'

interface DocumentProviderProps {
  claims: Record<string, Claim>
  children: ReactNode
}

/** Supplies the active document's claims registry to descendant components. */
export function DocumentProvider({ claims, children }: DocumentProviderProps) {
  return <DocumentContext value={{ claims }}>{children}</DocumentContext>
}
