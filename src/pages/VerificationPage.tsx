import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DOCUMENTS } from '../data/documents'
import { summarizeClaimStatuses, type ClaimStatusSummary } from '../data/claimSummary'
import type { Claim, Source, VerificationStatus } from '../types/content'

type Filter = 'all' | VerificationStatus

const STATUSES: VerificationStatus[] = ['verified', 'disputed', 'unverified', 'pending']

const FILTERS: Filter[] = ['all', ...STATUSES]

function parseFilter(raw: string | null): Filter {
  return raw && (FILTERS as string[]).includes(raw) ? (raw as Filter) : 'all'
}

/** The count a filter would match, for its chip badge. */
function filterCount(summary: ClaimStatusSummary, f: Filter): number {
  return f === 'all' ? summary.total : summary[f]
}

const STATUS_LABEL: Record<VerificationStatus, string> = {
  verified: 'Verified',
  disputed: 'Disputed',
  unverified: 'Unverified',
  pending: 'Pending',
}

/** Sum two summaries field by field — used to build the series-wide aggregate. */
function addSummaries(a: ClaimStatusSummary, b: ClaimStatusSummary): ClaimStatusSummary {
  return {
    total: a.total + b.total,
    verified: a.verified + b.verified,
    disputed: a.disputed + b.disputed,
    unverified: a.unverified + b.unverified,
    pending: a.pending + b.pending,
  }
}

function pct(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100)
}

/** A compact verified/total progress bar with the four status counts beside it. */
function SummaryMeter({ summary }: { summary: ClaimStatusSummary }) {
  return (
    <div className="vp-meter">
      <div className="vp-meter__bar" aria-hidden="true">
        <span style={{ width: `${pct(summary.verified, summary.total)}%` }} />
      </div>
      <ul className="verification-notice__counts">
        {STATUSES.map((s) =>
          summary[s] > 0 ? (
            <li key={s} data-verification={s}>
              {summary[s]} {STATUS_LABEL[s].toLowerCase()}
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}

function sourceUrl(claim: Claim, sources: Source[]): string | undefined {
  if (claim.verifiedUrl) return claim.verifiedUrl
  return sources.find((s) => s.id === claim.sourceId)?.url
}

/**
 * Series-wide verification dashboard. Surfaces the claim/verification model the
 * whole codebase is built around — `summarizeClaimStatuses` over every document —
 * with a status filter and per-claim source links. Read-only projection over DOCUMENTS.
 */
export function VerificationPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseFilter(searchParams.get('status'))

  const setFilter = (f: Filter) => {
    setSearchParams(f === 'all' ? {} : { status: f }, { replace: true })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const perDoc = useMemo(
    () =>
      DOCUMENTS.map((entry) => ({
        entry,
        summary: summarizeClaimStatuses(entry.doc.claims),
        claims: Object.values(entry.doc.claims),
      })),
    [],
  )

  const aggregate = useMemo(
    () =>
      perDoc.reduce((acc, d) => addSummaries(acc, d.summary), {
        total: 0,
        verified: 0,
        disputed: 0,
        unverified: 0,
        pending: 0,
      }),
    [perDoc],
  )

  const matches = (claim: Claim) => filter === 'all' || claim.verificationStatus === filter

  return (
    <div className="verification-page">
      <header className="vp-hero">
        <p className="overline">Verification · The AI Reckoning</p>
        <h1>
          The <em>Evidence</em> Ledger
        </h1>
        <p className="subtitle">
          Every statistic and citation in the series is an individually-checkable claim. This is the
          running tally — {aggregate.verified} of {aggregate.total} claims verified against primary
          sources ({pct(aggregate.verified, aggregate.total)}%).
        </p>
        <SummaryMeter summary={aggregate} />
      </header>

      <div className="container">
        <nav className="series-nav">
          <Link to="/">← The AI Reckoning — series index</Link>
        </nav>

        <div className="vp-filters" role="group" aria-label="Filter claims by status">
          {FILTERS.map((f) => {
            const count = filterCount(aggregate, f)
            return (
              <button
                key={f}
                type="button"
                className="vp-filter"
                data-active={filter === f}
                data-verification={f === 'all' ? undefined : f}
                disabled={count === 0}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All claims' : STATUS_LABEL[f]}
                <span className="vp-filter__count">{count}</span>
              </button>
            )
          })}
        </div>

        {perDoc.map(({ entry, summary, claims }) => {
          const shown = claims.filter(matches)
          return (
            <section key={entry.doc.id} className="vp-doc">
              <div className="vp-doc__head">
                <h2>
                  <Link to={`/${entry.doc.slug}`}>
                    {entry.partLabel} — {entry.navTitle}
                  </Link>
                  {filter !== 'all' ? (
                    <span className="vp-doc__shown">
                      {shown.length} {STATUS_LABEL[filter].toLowerCase()}
                    </span>
                  ) : null}
                </h2>
                <SummaryMeter summary={summary} />
              </div>

              {shown.length === 0 ? (
                <p className="vp-empty">No {filter === 'all' ? '' : `${filter} `}claims here.</p>
              ) : (
                <ul className="vp-claims">
                  {shown.map((claim) => {
                    const url = sourceUrl(claim, entry.doc.sources)
                    return (
                      <li key={claim.id} className="vp-claim">
                        <span
                          className="evidence-status"
                          data-verification={claim.verificationStatus}
                        >
                          {STATUS_LABEL[claim.verificationStatus]}
                        </span>
                        <span className="vp-claim__text">
                          {url ? (
                            <a href={url} target="_blank" rel="noreferrer">
                              {claim.claimText}
                            </a>
                          ) : (
                            claim.claimText
                          )}
                          <span className="vp-claim__kind">{claim.kind}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
