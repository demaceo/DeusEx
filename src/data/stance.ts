/**
 * Stance resolution and labels — the single source of truth for which camp a
 * debate turn argues from. A turn's stance is, in order of precedence: an
 * explicit per-turn override, then the round's `Section.stanceOverride`, then the
 * persona's default {@link Persona.stance}. Shared by the debate stage (to
 * position and badge turns) and the series-level "broke from type" view.
 */

import type { PersonaId, PersonaStance } from '../types/persona'
import { PERSONAS } from './personas'

/** Short label for the stance chip (mobile) and SR text. */
export const STANCE_LABEL: Record<PersonaStance, string> = {
  optimist: 'Optimistic',
  critic: 'Critical',
  neutral: 'Neutral',
}

/** Phrase for the badge shown when a turn argues off the speaker's default camp. */
export const CONCESSION_LABEL: Record<PersonaStance, string> = {
  optimist: 'Takes the optimistic side',
  critic: 'Takes the critical side',
  neutral: 'Finds common ground',
}

/** Resolve a turn's effective stance: per-turn override → round override → default. */
export function resolveStance(
  personaId: PersonaId,
  turnStance?: PersonaStance,
  roundOverride?: Partial<Record<PersonaId, PersonaStance>>,
): PersonaStance {
  return turnStance ?? roundOverride?.[personaId] ?? PERSONAS[personaId].stance
}
