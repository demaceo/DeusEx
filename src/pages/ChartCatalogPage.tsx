import { lazy, Suspense, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DocumentProvider } from '../components/DocumentProvider'
import { ClaimDrawerProvider } from '../components/EvidenceDrawer'
import {
  CHART_KIND_LABEL,
  CHART_KINDS,
  countByKind,
  getChartCatalog,
  type ChartKind,
} from '../data/chartCatalog'

// Charts are code-split out of the main bundle (see BlockRenderer) so pages
// that show no charts never pay for it; this page loads the same chunk once
// it's reached, same as any document page.
const ChartBlock = lazy(() =>
  import('../components/ChartBlock').then((m) => ({ default: m.ChartBlock })),
)

type Filter = 'all' | ChartKind

const FILTERS: Filter[] = ['all', ...CHART_KINDS]

function parseFilter(raw: string | null): Filter {
  return raw && (FILTERS as string[]).includes(raw) ? (raw as Filter) : 'all'
}

/** The count a filter chip should show. */
function filterCount(counts: Record<ChartKind, number>, total: number, f: Filter): number {
  return f === 'all' ? total : counts[f]
}

/**
 * `/charts` — every chart in the series, in one place. A projection over
 * {@link getChartCatalog}: grouped by roundtable (document), filterable by
 * chart type via a `?kind=` search param, each rendered through the real
 * `ChartBlock` so the catalog stays a faithful mirror of what readers see
 * in the documents themselves.
 */
export function ChartCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseFilter(searchParams.get('kind'))

  const setFilter = (f: Filter) => {
    setSearchParams(f === 'all' ? {} : { kind: f }, { replace: true })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const groups = useMemo(() => getChartCatalog(), [])
  const counts = useMemo(() => countByKind(groups), [groups])
  const totalCharts = useMemo(() => groups.reduce((n, g) => n + g.entries.length, 0), [groups])
  const kindsPresent = CHART_KINDS.filter((k) => counts[k] > 0).length

  const visibleGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          entries: group.entries.filter((e) => filter === 'all' || e.chart.kind === filter),
        }))
        .filter((group) => group.entries.length > 0),
    [groups, filter],
  )

  return (
    <ClaimDrawerProvider>
      <header className="chart-catalog-hero">
        <p className="overline">Chart Catalog · The AI Reckoning</p>
        <h1>
          Every Chart, <em>One Place</em>
        </h1>
        <p className="subtitle">
          Every data visualization across all {groups.length} roundtables: {totalCharts} charts
          spanning {kindsPresent} chart types. Filter by type, or browse by part below.
        </p>
      </header>

      <div className="container">
        <nav className="series-nav">
          <Link to="/">← The AI Reckoning series index</Link>
        </nav>

        <div className="vp-filters" role="group" aria-label="Filter charts by type">
          {FILTERS.map((f) => {
            const count = filterCount(counts, totalCharts, f)
            return (
              <button
                key={f}
                type="button"
                className="vp-filter"
                data-active={filter === f}
                disabled={count === 0}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All charts' : CHART_KIND_LABEL[f]}
                <span className="vp-filter__count">{count}</span>
              </button>
            )
          })}
        </div>

        {visibleGroups.length === 0 ? (
          <p className="vp-empty">No charts of this type yet.</p>
        ) : (
          visibleGroups.map((group) => (
            <DocumentProvider
              key={group.doc.id}
              claims={group.doc.claims}
              sources={group.doc.sources}
            >
              <section className="vp-doc">
                <div className="vp-doc__head">
                  <h2>
                    <Link to={`/${group.doc.slug}`}>
                      {group.partLabel}: {group.navTitle}
                    </Link>
                    <span className="vp-doc__shown">
                      {group.entries.length} chart{group.entries.length === 1 ? '' : 's'}
                    </span>
                  </h2>
                </div>

                {group.entries.map((entry, i) => (
                  <div key={i}>
                    <div className="chart-catalog__meta">
                      <span className="chart-catalog__kind">
                        {CHART_KIND_LABEL[entry.chart.kind]}
                      </span>
                      <Link
                        className="chart-catalog__round"
                        to={`/${group.doc.slug}#${entry.anchor}`}
                      >
                        {entry.roundLabel} →
                      </Link>
                    </div>
                    <Suspense
                      fallback={
                        <div className="chart-block chart-block--loading" aria-hidden="true" />
                      }
                    >
                      <ChartBlock chart={entry.chart} />
                    </Suspense>
                  </div>
                ))}
              </section>
            </DocumentProvider>
          ))
        )}
      </div>
    </ClaimDrawerProvider>
  )
}
