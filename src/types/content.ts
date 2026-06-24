/**
 * Core content + verification model.
 *
 * The verification scaffolding here is the spine of the project's long-term goal:
 * every statistic and citation in the documents must eventually be confirmed true.
 * Each claim is an individually-addressable object that can carry a status and a
 * real source URL, so a future verification pass iterates a flat list and writes
 * results back in one place — no re-walking of prose.
 */

/**
 * Verification lifecycle of a single claim.
 * - `pending`     — transcribed, not yet checked (default for everything today)
 * - `verified`    — confirmed against a primary/credible source
 * - `disputed`    — sources conflict, or the figure looks wrong
 * - `unverified`  — checked but no supporting source could be found
 */
export type VerificationStatus = 'pending' | 'verified' | 'disputed' | 'unverified'

/**
 * A primary source. Appears in a document's Sources section and is referenced by
 * claims via {@link Claim.sourceId}.
 */
export interface Source {
  id: string
  /** Bolded lead-in shown in the Sources grid (e.g. publisher + date). */
  title: string
  /** Description line shown in the Sources grid. */
  description: string
  /** FUTURE: the canonical URL for this source, filled during verification. */
  url?: string
}

/** Whether a claim is a hard statistic/metric or a softer attributed citation. */
export type ClaimKind = 'statistic' | 'citation'

/**
 * A single verifiable assertion — the unit a future verification phase iterates.
 * Statistics (the big stat-box numbers) and inline `<cite>` references are both
 * Claims so they share one verification workflow.
 */
export interface Claim {
  id: string
  kind: ClaimKind
  /** The asserted value/quote exactly as it appears in the prose. */
  claimText: string
  /** The Source this claim rests on, if known. */
  sourceId?: string
  /** Verification state. Transcription sets this to `pending`. */
  verificationStatus: VerificationStatus
  /** FUTURE: the exact URL that substantiates the claim. */
  verifiedUrl?: string
  /** FUTURE: reviewer note — e.g. why a claim is disputed. */
  note?: string
  /** FUTURE: ISO timestamp of the last verification check. */
  lastCheckedISO?: string
}

/**
 * Inline prose token. A paragraph is an ordered list of these so each citation
 * stays a first-class, individually-addressable object (no string parsing).
 */
export type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'cite'; claimId: string; label?: string }

/** A paragraph: an ordered list of text runs and citation references. */
export type Paragraph = InlineNode[]
