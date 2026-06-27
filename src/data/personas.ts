/**
 * The five debate personas — declared once and shared by all three documents.
 * Documents reference a PersonaId; components resolve the full Persona via context.
 */

import { Cpu, HardHat, Leaf, Network, Palette, Scale, ScanSearch, UserRound } from 'lucide-react'
import type { Persona, PersonaId } from '../types/persona'

export const PERSONAS: Record<PersonaId, Persona> = {
  'tech-optimist': {
    id: 'tech-optimist',
    name: 'Tech Optimist',
    color: 'green',
    icon: Cpu,
    role: 'Senior engineer at a major AI lab',
    focus: 'Innovation will solve the problems it creates',
    bio: "Believes the technology's benefits outweigh its costs, and that most harms are engineering problems with engineering solutions.",
  },
  environmentalist: {
    id: 'environmentalist',
    name: 'Environmentalist',
    color: 'teal',
    icon: Leaf,
    role: 'Climate researcher & policy advocate',
    focus: 'The measurable damage happening right now',
    bio: 'Focused on the concrete environmental costs of AI — energy, water, and emissions — and on who is forced to bear them.',
  },
  'labor-advocate': {
    id: 'labor-advocate',
    name: 'Labor Advocate',
    color: 'orange',
    icon: HardHat,
    role: 'Labor researcher & organizer',
    focus: 'The hidden human cost of AI supply chains',
    bio: 'Documents the data annotators and content moderators behind AI systems, particularly across the Global South.',
  },
  'policy-realist': {
    id: 'policy-realist',
    name: 'Policy Realist',
    color: 'blue',
    icon: Scale,
    role: 'Former regulatory attorney',
    focus: 'Structural governance over good intentions',
    bio: 'Follows the law closely and believes binding rules with real enforcement are the only durable fix.',
  },
  'everyday-person': {
    id: 'everyday-person',
    name: 'Everyday Person',
    color: 'purple',
    icon: UserRound,
    role: 'Retired schoolteacher, late 60s',
    focus: 'Encountering AI for the first time',
    bio: 'Uses a smartphone and watches the news, but AI was never part of her daily vocabulary — until lately.',
  },
  'systems-humanist': {
    id: 'systems-humanist',
    name: 'Systems Humanist',
    color: 'amber',
    icon: Network,
    role: 'Technology ethicist & coordination researcher',
    focus: 'Incentive structures, not just symptoms',
    bio: "Argues that AI's harms aren't accidents or bad actors — they're the predictable output of misaligned races no single player can stop alone. The fix is coordination, not blame.",
  },
  skeptic: {
    id: 'skeptic',
    name: 'Skeptic',
    color: 'slate',
    icon: ScanSearch,
    role: 'Veteran technology reporter',
    focus: 'Cut the hype; show me the evidence',
    bio: 'Has covered three tech bubbles and treats every breathless claim — boom or doom — as a number to be checked. Suspects much of the "reckoning" is marketing in both directions.',
  },
  artist: {
    id: 'artist',
    name: 'Artist',
    color: 'rose',
    icon: Palette,
    role: 'Working illustrator & musician',
    focus: 'What it costs the people who make culture',
    bio: 'Found her catalogue in a training set she never consented to. Speaks for the creators whose work became raw material — and asks what authorship is worth when anything can be synthesized.',
  },
}

/** Stable display order for the personas bar. */
export const PERSONA_ORDER: PersonaId[] = [
  'tech-optimist',
  'environmentalist',
  'labor-advocate',
  'policy-realist',
  'everyday-person',
  'systems-humanist',
  'skeptic',
  'artist',
]
