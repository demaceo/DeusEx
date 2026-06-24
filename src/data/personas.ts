/**
 * The five debate personas — declared once and shared by all three documents.
 * Documents reference a PersonaId; components resolve the full Persona via context.
 */

import type { Persona, PersonaId } from '../types/persona'

export const PERSONAS: Record<PersonaId, Persona> = {
  'tech-optimist': { id: 'tech-optimist', name: 'Tech Optimist', color: 'green', icon: '💻' },
  environmentalist: { id: 'environmentalist', name: 'Environmentalist', color: 'teal', icon: '🌿' },
  'labor-advocate': { id: 'labor-advocate', name: 'Labor Advocate', color: 'orange', icon: '✊' },
  'policy-realist': { id: 'policy-realist', name: 'Policy Realist', color: 'blue', icon: '⚖️' },
  'everyday-person': {
    id: 'everyday-person',
    name: 'Everyday Person',
    color: 'purple',
    icon: '🧓',
  },
}

/** Stable display order for the personas bar. */
export const PERSONA_ORDER: PersonaId[] = [
  'tech-optimist',
  'environmentalist',
  'labor-advocate',
  'policy-realist',
  'everyday-person',
]
