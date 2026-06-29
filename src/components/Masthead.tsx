import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollCollapse } from '../hooks/useScrollCollapse'
import type { PartNavTarget } from '../data/documents'
import type { Masthead as MastheadData } from '../types/document'

interface MastheadProps {
  masthead: MastheadData
  prev: PartNavTarget
  next: PartNavTarget
}

export function Masthead({ masthead, prev, next }: MastheadProps) {
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
          {masthead.titleLines.map((line, lineIndex) => {
            const spans = line.map((span, spanIndex) =>
              span.em ? (
                <em key={spanIndex}>{span.text}</em>
              ) : (
                <Fragment key={spanIndex}>{span.text}</Fragment>
              ),
            )
            return (
              <Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                {/* Only the series-label line ("The AI Reckoning:") links home. */}
                {lineIndex === 0 ? (
                  <Link
                    className="masthead-title-link"
                    to="/"
                    aria-label="The AI Reckoning — return to the series index"
                  >
                    {spans}
                  </Link>
                ) : (
                  spans
                )}
              </Fragment>
            )
          })}
        </h1>
        <p className="subtitle">{masthead.subtitle}</p>
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
