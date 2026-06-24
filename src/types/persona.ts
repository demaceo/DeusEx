/**
 * The five recurring debate personas. They are shared across all three documents,
 * so they are declared once (see `src/data/personas.ts`) and documents reference
 * a {@link PersonaId} only — never re-declaring name/color/icon.
 */

export type PersonaId =
  | 'tech-optimist'
  | 'environmentalist'
  | 'labor-advocate'
  | 'policy-realist'
  | 'everyday-person'

/** Maps to a CSS custom property (--c-optimist, --c-environ, ...) via data-attribute. */
export type PersonaColor = 'green' | 'teal' | 'orange' | 'blue' | 'purple'

export interface Persona {
  id: PersonaId
  /** Display name, e.g. "Tech Optimist". */
  name: string
  color: PersonaColor
  /** Emoji rendered in the speaker icon, e.g. "💻". */
  icon: string
  /** Short professional title shown in the profile card. */
  role: string
  /** One-line "what they care about" tagline. */
  focus: string
  /** One- or two-sentence description of the persona's viewpoint. */
  bio: string
}
