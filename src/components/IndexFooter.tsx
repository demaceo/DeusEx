import { Link } from 'react-router-dom'
import { getChartCatalog } from '../data/chartCatalog'
import { aggregateClaimStatuses, pct } from '../data/claimSummary'
import { DOCUMENTS } from '../data/documents'

/**
 * Closes the series index: a short colophon, links to the three series-wide
 * views (evidence ledger, chart catalog, voice crossings), and a closing
 * tally tying back to the hero's "grounded in cited evidence" claim.
 */
export function IndexFooter() {
  const totalCharts = getChartCatalog().reduce((n, group) => n + group.entries.length, 0)
  const claims = aggregateClaimStatuses(DOCUMENTS.map((entry) => entry.doc.claims))

  return (
    <footer className="index-footer">
      <div className="index-container index-footer__inner">
        <div className="index-footer__colophon">
          <p className="index-footer__name">The AI Reckoning</p>
          <p className="index-footer__tagline">
            An eleven-part roundtable on artificial intelligence, argued by a recurring cast and
            checked against cited evidence.
          </p>
        </div>

        <nav className="index-footer__links" aria-label="Series-wide views">
          <Link to="/verification">Evidence ledger</Link>
          <Link to="/charts">Every chart in the series</Link>
          <Link to="/voices">Voice crossings</Link>
        </nav>

        <p className="index-footer__tally">
          {DOCUMENTS.length} parts · {totalCharts} charts · {pct(claims.verified, claims.total)}% of
          claims verified
        </p>
      </div>
    </footer>
  )
}
