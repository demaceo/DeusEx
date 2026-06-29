/**
 * The recurring debate personas. They are shared across every document,
 * so they are declared once (see `src/data/personas.ts`) and documents reference
 * a {@link PersonaId} only — never re-declaring name/color/icon.
 */

import type { LucideIcon } from 'lucide-react'

export type PersonaId =
  | 'tech-optimist'
  | 'environmentalist'
  | 'labor-advocate'
  | 'policy-realist'
  | 'everyday-person'
  | 'systems-humanist'
  | 'skeptic'
  | 'artist'
  | 'accelerationist'
  | 'safety-researcher'
  | 'young-person'
  | 'clinician'
  | 'economist'
  | 'equity-researcher'
  | 'land-defender'

/** Maps to a CSS custom property (--c-optimist, --c-environ, ...) via data-attribute. */
export type PersonaColor =
  | 'green'
  | 'teal'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'amber'
  | 'slate'
  | 'rose'
  | 'flame'
  | 'indigo'
  | 'cyan'
  | 'clay'
  | 'bronze'
  | 'violet'
  | 'umber'

/**
 * Which camp a persona argues from, used to place their turns on the debate
 * stage: `optimist` sits left of the center axis, `critic` right, `neutral`
 * centered. A persona's stance is its default lean across the series; an
 * individual turn may override it via {@link DebateEntry.stance}.
 */
export type PersonaStance = 'optimist' | 'critic' | 'neutral'

export interface Persona {
  id: PersonaId
  /** Display name, e.g. "Tech Optimist". */
  name: string
  color: PersonaColor
  /** Lucide icon component rendered in the speaker disc and profile card. */
  icon: LucideIcon
  /** Default debate camp; positions the speaker on the stage. */
  stance: PersonaStance
  /** Short professional title shown in the profile card. */
  role: string
  /** One-line "what they care about" tagline. */
  focus: string
  /** One- or two-sentence description of the persona's viewpoint. */
  bio: string
}
