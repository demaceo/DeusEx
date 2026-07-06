import { speakerInfo } from '../lib/speakerInfo'
import type { TranscriptCue } from '../data/audioEpisodes'

interface CaptionsOverlayProps {
  cue: TranscriptCue | null
  visible: boolean
}

/**
 * Floating subtitle-style overlay showing the active transcript cue's text.
 * Fixed to the viewport so it stays visible independent of scroll position
 * and the masthead's collapsed state.
 */
export function CaptionsOverlay({ cue, visible }: CaptionsOverlayProps) {
  if (!visible) return null

  const { name, persona } = speakerInfo(cue?.speaker ?? null)

  return (
    <div className="captions-overlay" data-persona={persona} role="status" aria-live="polite">
      <span className="captions-overlay__speaker">{name}</span>
      <p className="captions-overlay__text">{cue?.text ?? ''}</p>
    </div>
  )
}
