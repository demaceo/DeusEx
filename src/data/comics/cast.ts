/**
 * The comic series' own characters. Kept out of `PERSONAS` on purpose: they
 * exist only inside "Roundtable Reckoning", so they never appear on /voices,
 * the personas bar, or the podcast voice-casting table. Guest panelists from
 * the recurring cast are referenced by PersonaId and resolve via PERSONAS.
 */

import { FlaskConical, MessagesSquare } from 'lucide-react'
import type { ComicCastId, ComicCastMember } from '../../types/comic'

export const COMIC_CAST: Record<ComicCastId, ComicCastMember> = {
  'the-researcher': {
    id: 'the-researcher',
    name: 'The Researcher',
    icon: FlaskConical,
    role: 'Doctoral researcher, rejection of AI',
    bio: 'Studies why people reject AI, then becomes her own best data point when a post about anti-AI sentiment gets swarmed by it.',
  },
  'the-chorus': {
    id: 'the-chorus',
    name: 'The Chorus',
    icon: MessagesSquare,
    role: 'Anonymous reply swarm',
    bio: 'Two hundred non-followers with strong feelings and no questions. Quoted verbatim; handles withheld.',
  },
}

/** Cast strip display order. */
export const CAST_ORDER: ComicCastId[] = ['the-researcher', 'the-chorus']
