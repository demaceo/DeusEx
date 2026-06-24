/**
 * The five debate personas — declared once and shared by all three documents.
 * Documents reference a PersonaId; components resolve the full Persona via context.
 */

import type { Persona, PersonaId } from '../types/persona'

export const PERSONAS: Record<PersonaId, Persona> = {
  'tech-optimist': {
    id: 'tech-optimist',
    name: 'Tech Optimist',
    color: 'green',
    icon: '💻',
    role: 'Senior engineer at a major AI lab',
    focus: 'Innovation will solve the problems it creates',
    bio: "Believes the technology's benefits outweigh its costs, and that most harms are engineering problems with engineering solutions.",
  },
  environmentalist: {
    id: 'environmentalist',
    name: 'Environmentalist',
    color: 'teal',
    icon: '🌿',
    role: 'Climate researcher & policy advocate',
    focus: 'The measurable damage happening right now',
    bio: 'Focused on the concrete environmental costs of AI — energy, water, and emissions — and on who is forced to bear them.',
  },
  'labor-advocate': {
    id: 'labor-advocate',
    name: 'Labor Advocate',
    color: 'orange',
    icon: '✊',
    role: 'Labor researcher & organizer',
    focus: 'The hidden human cost of AI supply chains',
    bio: 'Documents the data annotators and content moderators behind AI systems, particularly across the Global South.',
  },
  'policy-realist': {
    id: 'policy-realist',
    name: 'Policy Realist',
    color: 'blue',
    icon: '⚖️',
    role: 'Former regulatory attorney',
    focus: 'Structural governance over good intentions',
    bio: 'Follows the law closely and believes binding rules with real enforcement are the only durable fix.',
  },
  'everyday-person': {
    id: 'everyday-person',
    name: 'Everyday Person',
    color: 'purple',
    icon: '🧓',
    role: 'Retired schoolteacher, late 60s',
    focus: 'Encountering AI for the first time',
    bio: 'Uses a smartphone and watches the news, but AI was never part of her daily vocabulary — until lately.',
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
