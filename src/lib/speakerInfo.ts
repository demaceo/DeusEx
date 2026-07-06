import { PERSONAS } from '../data/personas'
import type { EpisodeSpeaker } from '../data/audioEpisodes'

/** Resolve the "Now: …" label + persona attributes for the current speaker. */
export function speakerInfo(speaker: EpisodeSpeaker | null): {
  name: string
  persona?: string
  Icon?: (typeof PERSONAS)[keyof typeof PERSONAS]['icon']
} {
  if (!speaker || speaker === 'host') return { name: 'Host' }
  const persona = PERSONAS[speaker]
  return { name: persona.name, persona: persona.id, Icon: persona.icon }
}
