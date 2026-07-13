/**
 * Content model for the "Roundtable Reckoning" comic series: unfiltered
 * conversations rendered as an animated comic book. Deliberately a parallel
 * universe to `document.ts` — comics never enter `DOCUMENTS`, so the essay
 * series' navigation, persona projections, verification dashboard, and
 * podcast pipeline are untouched. See `src/data/comics.ts` for the registry.
 */

import type { LucideIcon } from 'lucide-react'
import type { Claim, Paragraph, Source } from './content'
import type { PersonaId } from './persona'

/** Closed union of comic episode ids; extend when adding an episode. */
export type ComicId = 'unfiltered-i'

/**
 * Series-local characters. These are NOT PersonaIds: they exist only inside
 * the comic series, so they never surface on /voices, the personas bar, or
 * the podcast voice-casting table.
 */
export type ComicCastId = 'the-researcher' | 'the-chorus'

/** Authoritative record for one comic-only character (see data/comics/cast.ts). */
export interface ComicCastMember {
  id: ComicCastId
  name: string
  icon: LucideIcon
  /** Short descriptor shown in the cast strip, e.g. "Doctoral researcher". */
  role: string
  /** One-line intro for the cast strip. */
  bio: string
}

/**
 * Who is talking in a speech bubble: a comic-only character, or one of the
 * recurring series personas guesting in the comic (resolved via PERSONAS so
 * their name/color/icon stay canonical).
 */
export type ComicSpeaker =
  | { kind: 'cast'; castId: ComicCastId }
  | { kind: 'persona'; personaId: PersonaId }

/** Skewed yellow narration plate pinned to a panel corner. */
export interface ComicCaption {
  text: string
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/** A glossy comic speech bubble spoken by a named character. */
export interface ComicSpeech {
  speaker: ComicSpeaker
  paragraphs: Paragraph[]
  /** Bubble treatment; `glossy` is the default panelist look. */
  style?: 'glossy' | 'thought' | 'shout'
  tailDirection?: 'left' | 'right' | 'down'
}

/**
 * One mixed run of a partially-grawlixed quote: plain text interleaved with
 * comic symbol swearing ("#$%@"). The claim registry stores the real verbatim
 * text; grawlix is purely a rendering treatment.
 */
export type GrawlixRun = { t: 'text'; v: string } | { t: 'grawlix'; v: string }

/** One hostile reply in the swarm. Provide `text` OR `grawlixParts`. */
export interface ChorusBubble {
  /** Verbatim quote, rendered as-is in a jagged bubble. */
  text?: string
  /** Mixed verbatim + grawlix rendering of the quote. */
  grawlixParts?: GrawlixRun[]
  /** Links the quote to the episode's claim registry. */
  claimId?: string
  /** Rotation in degrees, roughly -6..6, for the pinned-up look. */
  tilt?: number
  /** `heavy` renders bigger, redder, and more jagged: the gut punches. */
  weight?: 'normal' | 'heavy'
}

/** The anonymous reply swarm: a wall of jagged attack bubbles. */
export interface ChorusSwarm {
  bubbles: ChorusBubble[]
}

/** A big onomatopoeia or grawlix burst ("WHAM!", "#$%@!"). */
export interface SfxBurst {
  text: string
  style: 'starburst' | 'grawlix'
  size?: 'md' | 'lg' | 'xl'
}

/** An embedded social post artifact (the BlueSky post that starts it all). */
export interface EmbeddedPost {
  author: string
  handle: string
  text: string
  /** Timestamp / reply-count line, e.g. "3:47 PM · 214 replies". */
  meta?: string
  claimId?: string
}

/**
 * Everything a comic panel can contain. Parallel to `Block`, with its own
 * exhaustive renderer (`ComicBlockRenderer`); adding a variant here is a
 * compile error until the renderer gains a case.
 */
export type ComicBlock =
  | { type: 'caption'; data: ComicCaption }
  | { type: 'speech'; data: ComicSpeech }
  | { type: 'chorusSwarm'; data: ChorusSwarm }
  | { type: 'sfx'; data: SfxBurst }
  | { type: 'embeddedPost'; data: EmbeddedPost }

/** One drawn panel: a frame around an ordered stack of comic blocks. */
export interface ComicPanel {
  blocks: ComicBlock[]
  /** Frame treatment; `sketch` (hand-inked) is the default. */
  frame?: 'sketch' | 'jagged' | 'clean' | 'borderless'
  /** Grid columns occupied within the scene layout. */
  span?: 1 | 2 | 3
  background?: 'halftone' | 'burst' | 'flat' | 'paper'
  /** Panel-as-image description for assistive tech. */
  ariaLabel?: string
}

/** A titled page of panels with a layout recipe. */
export interface ComicScene {
  /** Anchor id, e.g. "scene-2". */
  id: string
  /** Eyebrow label, e.g. "Scene 2". */
  kicker: string
  title?: string
  layout: 'splash' | 'grid-2' | 'grid-3' | 'mosaic'
  panels: ComicPanel[]
}

/** The top-level shape of one comic episode. */
export interface ComicDocument {
  id: ComicId
  /** URL slug under /unfiltered/, e.g. "good-faith-not-found". */
  slug: string
  /** e.g. "Roundtable Reckoning · Episode I". */
  seriesLabel: string
  cover: {
    overline: string
    titleLines: string[]
    subtitle: string
    dateLine: string
  }
  /** Guest panelists from the recurring cast, in appearance order. */
  guests: PersonaId[]
  scenes: ComicScene[]
  /** Closing verdict plate. */
  closing: { label: string; paragraphs: Paragraph[] }
  sources: Source[]
  claims: Record<string, Claim>
}
