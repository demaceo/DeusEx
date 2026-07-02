import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { PartNavTarget } from '../data/documents'
import type { Masthead } from '../types/document'

interface SeriesFooterProps {
  prev: PartNavTarget
  next: PartNavTarget
  /** Drives the top border's accent color to match this document's masthead. */
  accentColor: Masthead['accentColor']
}

/**
 * End-of-document navigation, so finishing a long roundtable opens onto the next
 * one instead of a dead-end. Surfaces the next part as a prominent card, plus the
 * previous part, the series index, and the evidence ledger.
 */
export function SeriesFooter({ prev, next, accentColor }: SeriesFooterProps) {
  return (
    <footer className="series-footer" data-accent={accentColor}>
      <div className="container series-footer__inner">
        <nav className="series-footer__more" aria-label="More series links">
          <Link to={`/${prev.slug}`}>
            ← {prev.partLabel} · {prev.navTitle}
          </Link>
          <Link to="/">Series index</Link>
          <Link to="/verification">Evidence ledger</Link>
        </nav>

        <Link className="series-footer__next" to={`/${next.slug}`}>
          <span className="series-footer__kicker">Next · {next.partLabel}</span>
          <span className="series-footer__title">
            {next.navTitle}
            <ArrowRight aria-hidden size={16} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </footer>
  )
}
