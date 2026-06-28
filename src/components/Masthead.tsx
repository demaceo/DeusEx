import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Headphones, Pause, Play } from 'lucide-react'
import { useScrollCollapse } from '../hooks/useScrollCollapse'
import type { PartNavTarget } from '../data/documents'
import type { Masthead as MastheadData } from '../types/document'

interface MastheadProps {
  masthead: MastheadData
  prev: PartNavTarget
  next: PartNavTarget
  /** Audio-podcast controls. Omitted (or hasEpisode=false) hides the play button. */
  audio?: {
    hasEpisode: boolean
    isPlaying: boolean
    onToggle: () => void
  }
}

export function Masthead({ masthead, prev, next, audio }: MastheadProps) {
  const collapsed = useScrollCollapse()

  return (
    <header className="masthead" data-accent={masthead.accentColor} data-collapsed={collapsed}>
      <Link
        className="masthead-nav masthead-nav--prev"
        to={`/${prev.slug}`}
        aria-label={`Previous part: ${prev.partLabel} — ${prev.navTitle}`}
        title={`${prev.partLabel} — ${prev.navTitle}`}
      >
        <ChevronLeft aria-hidden size={28} />
      </Link>

      <div className="masthead-body">
        <p className="overline">{masthead.overline}</p>
        <h1>
          <Link
            className="masthead-title-link"
            to="/"
            aria-label="The AI Reckoning — return to the series index"
          >
            {masthead.titleLines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                {line.map((span, spanIndex) =>
                  span.em ? (
                    <em key={spanIndex}>{span.text}</em>
                  ) : (
                    <Fragment key={spanIndex}>{span.text}</Fragment>
                  ),
                )}
              </Fragment>
            ))}
          </Link>
        </h1>
        <p className="subtitle">{masthead.subtitle}</p>
        <p className="date-line">{masthead.dateLine}</p>
        {audio && audio.hasEpisode ? (
          <button
            type="button"
            className="masthead-listen"
            onClick={audio.onToggle}
            aria-label={audio.isPlaying ? 'Pause the audio podcast' : 'Listen to the audio podcast'}
            aria-pressed={audio.isPlaying}
          >
            <span className="masthead-listen__icon" aria-hidden>
              {audio.isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </span>
            <Headphones size={15} aria-hidden />
            <span className="masthead-listen__label">
              {audio.isPlaying ? 'Pause episode' : 'Listen to this Roundtable'}
            </span>
          </button>
        ) : null}
      </div>

      <Link
        className="masthead-nav masthead-nav--next"
        to={`/${next.slug}`}
        aria-label={`Next part: ${next.partLabel} — ${next.navTitle}`}
        title={`${next.partLabel} — ${next.navTitle}`}
      >
        <ChevronRight aria-hidden size={28} />
      </Link>
    </header>
  )
}
