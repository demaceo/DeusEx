import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { PartNavTarget } from '../data/documents'

interface SeriesFooterProps {
  prev: PartNavTarget
  next: PartNavTarget
}

/**
 * End-of-document navigation, so finishing a long roundtable opens onto the next
 * one instead of a dead-end. Surfaces the next part as a prominent card, plus the
 * previous part, the series index, and the evidence ledger.
 */
export function SeriesFooter({ prev, next }: SeriesFooterProps) {
  return (
    <footer className="series-footer">
      <div className="container">
        <Link className="series-footer__next" to={`/${next.slug}`}>
          <span className="series-footer__kicker">Continue the series · {next.partLabel}</span>
          <span className="series-footer__title">
            {next.navTitle}
            <ArrowRight aria-hidden size={20} strokeWidth={2} />
          </span>
        </Link>

        <div className="series-footer__more">
          <Link to={`/${prev.slug}`}>
            ← {prev.partLabel} · {prev.navTitle}
          </Link>
          <Link to="/">The AI Reckoning — series index</Link>
          <Link to="/verification">Evidence ledger</Link>
        </div>
      </div>
    </footer>
  )
}
