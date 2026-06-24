/**
 * Document structure types. A {@link RoundtableDocument} is the typed form of one
 * source HTML file; it is rendered by the shared component kit. Block ordering from
 * the source is preserved faithfully via the discriminated-union {@link Block}.
 */

import type { Claim, Paragraph, Source } from './content'
import type { PersonaColor, PersonaId } from './persona'

/** Stat-box color variants. Part I uses the base (no variant); II/III use these. */
export type StatVariant = 'positive' | 'teal' | 'blue' | 'neutral' | 'caution'

export interface StatBox {
  /** Small uppercase label above the number (II/III). Omit for Part I. */
  labelTop?: string
  /** The large headline figure, e.g. "460 TWh". */
  value: string
  /** Supporting label/description below the number. */
  description: string
  variant?: StatVariant
  /** Headline figure size (II/III mix large and medium). Defaults to large. */
  size?: 'large' | 'medium'
  /** Links the headline figure to a verifiable Claim. */
  claimId?: string
}

export interface StatGrid {
  stats: StatBox[]
}

export interface SpeechBubble {
  paragraphs: Paragraph[]
}

export interface DebateEntry {
  personaId: PersonaId
  bubble: SpeechBubble
}

export interface Pullquote {
  text: string
  attribution?: string
}

export interface VerdictBox {
  /** Pseudo-element label, e.g. "The Bottom Line" or "Assessment". */
  label: string
  paragraphs: Paragraph[]
}

export interface SectionHeader {
  /** e.g. "Round I" or "Closing". */
  roundLabel: string
  /** The h2 title. Omit for label-only headers (e.g. Part I "The Participants"). */
  title?: string
}

/** A titled definition list (Part I's "Who's at the table" roster). */
export interface SummaryList {
  heading: string
  items: Array<{ lead: string; text: string }>
}

/**
 * A heterogeneous content block. The union preserves arbitrary source ordering;
 * `BlockRenderer` switches over `type` exhaustively.
 */
export type Block =
  | { type: 'statGrid'; data: StatGrid }
  | { type: 'debate'; data: DebateEntry }
  | { type: 'pullquote'; data: Pullquote }
  | { type: 'verdict'; data: VerdictBox }
  | { type: 'divider' }
  | { type: 'prose'; data: { paragraphs: Paragraph[] } }
  | { type: 'summaryList'; data: SummaryList }

export interface Section {
  header: SectionHeader
  blocks: Block[]
  /** Render a ✦✦✦ chapter divider above this section's header. */
  dividerBefore?: boolean
}

/** One run within a title line; `em` marks the italic/accent portion. */
export interface TitleSpan {
  text: string
  em?: boolean
}

export interface Masthead {
  overline: string
  /**
   * The headline as ordered lines of spans. Each inner array is one line (a
   * source `<br>`); spans with `em: true` render in the accent italic. This keeps
   * all three documents' differing title layouts faithful with one model.
   */
  titleLines: TitleSpan[][]
  subtitle: string
  dateLine: string
  /** Drives the masthead bottom accent stripe. */
  accentColor: PersonaColor | 'gold' | 'accent'
}

export interface CompanionBanner {
  text: string
}

export type DocumentId = 'part-i' | 'part-ii' | 'part-iii'

export interface RoundtableDocument {
  id: DocumentId
  /** URL slug, e.g. "real-costs". */
  slug: string
  seriesLabel: string
  masthead: Masthead
  companion?: CompanionBanner
  intro: Paragraph[]
  sections: Section[]
  /** Optional closing verdict block (II/III). */
  closing?: VerdictBox
  sources: Source[]
  /** Verification registry: every Claim in the document, keyed by Claim.id. */
  claims: Record<string, Claim>
}
