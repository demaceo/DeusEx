import { describe, it, expect } from 'vitest'
import manifest from '../../public/audio/episodes.json'

describe('podcast episode manifest', () => {
  it('episode titles never use an em dash (CLAUDE.md invariant 6)', () => {
    for (const [id, episode] of Object.entries(manifest)) {
      expect(episode.title, id).not.toContain('—')
    }
  })
})
