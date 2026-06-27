/**
 * The five recurring debate personas. They are shared across all three documents,
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

export interface Persona {
  id: PersonaId
  /** Display name, e.g. "Tech Optimist". */
  name: string
  color: PersonaColor
  /** Lucide icon component rendered in the speaker disc and profile card. */
  icon: LucideIcon
  /** Short professional title shown in the profile card. */
  role: string
  /** One-line "what they care about" tagline. */
  focus: string
  /** One- or two-sentence description of the persona's viewpoint. */
  bio: string
}
