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
 * A "Systems Framing" callout that performs the diagnostic pivot:
 * incentive race → coordination trap → governance off-ramp.
 * Rendered as a visually distinct aside, not a debate bubble.
 */
export interface IncentiveAudit {
  /** The competitive dynamic being named — what everyone is racing toward. */
  race: string
  /** Why no single actor can exit the race unilaterally. */
  trap: string
  /** The coordination or governance intervention that changes the incentive. */
  intervention: string
}

/**
 * Color keys for chart series/segments. Mirror the persona + brand tokens in
 * `tokens.css` so charts speak the same visual language as the rest of the kit.
 * Resolved to hex by `variantColor` in `components/chartTheme.ts`.
 */
export type ChartVariant = 'accent' | 'navy' | 'gold' | 'optimist' | 'environ' | 'labor' | 'policy'

/** A single category/point: one bar, one line vertex, or one donut segment. */
export interface ChartDatum {
  /** Axis tick / segment label, e.g. "2025" or "Kenya". */
  label: string
  value: number
  /** Per-datum color override (e.g. one highlighted bar). Falls back to chart default. */
  variant?: ChartVariant
}

/** One series in a {@link StackedBarChartSpec}, keyed into each row's data. */
export interface ChartSeries {
  /** Row key holding this series' value, e.g. "top10". */
  key: string
  /** Legend label, e.g. "Top 10% of universities". */
  label: string
  variant?: ChartVariant
}

/** Fields shared by every chart kind. */
export interface ChartBase {
  /** Mono uppercase eyebrow above the title, e.g. "Energy · Projected demand". */
  labelTop?: string
  /** Serif figure title. */
  title: string
  /** One-line takeaway; also carries ranges/effect-sizes that aren't plotted points. */
  subtitle?: string
  /** Mono caption / source line under the chart. */
  source?: string
  /** Verified claims backing the plotted data — drive the verification status dot. */
  claimIds?: string[]
  /** Screen-reader description of what the chart shows. */
  ariaLabel: string
  /** Value suffix for axis ticks and tooltips, e.g. "TWh", "%", "L/kWh". */
  unit?: string
  /** Default series/bar color when a datum sets no `variant`. Defaults to accent. */
  variant?: ChartVariant
}

/**
 * A chart, expressed as data (never JSX) so it lives in the part files like every
 * other block. The union is discriminated by `kind`; `ChartBlock` renders each.
 */
export type ChartSpec =
  | (ChartBase & { kind: 'bar'; orientation?: 'vertical' | 'horizontal'; data: ChartDatum[] })
  | (ChartBase & { kind: 'line'; area?: boolean; data: ChartDatum[] })
  | (ChartBase & { kind: 'donut'; data: ChartDatum[] })
  | (ChartBase & {
      kind: 'stackedBar'
      series: ChartSeries[]
      /** One row per category; each row holds `label` plus a number under each series key. */
      data: Array<{ label: string } & Record<string, number | string>>
    })

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
  | { type: 'chart'; data: ChartSpec }
  | { type: 'incentiveAudit'; data: IncentiveAudit }

export interface Section {
  header: SectionHeader
  blocks: Block[]
  /** Render a "* * *" chapter divider above this section's header. */
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

export type DocumentId = 'part-i' | 'part-ii' | 'part-iii' | 'part-iv'

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
