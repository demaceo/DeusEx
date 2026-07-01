import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BlockRenderer } from '../components/BlockRenderer'
import { ChapterDivider } from '../components/ChapterDivider'
import { DebateNavFAB } from '../components/DebateNavFAB'
import { DebateThread } from '../components/DebateThread'
import { DocumentProvider } from '../components/DocumentProvider'
import { ClaimDrawerProvider } from '../components/EvidenceDrawer'
import { IntroBlock } from '../components/IntroBlock'
import { Masthead } from '../components/Masthead'
import { PersonasBar } from '../components/PersonasBar'
import { PodcastPlayer } from '../components/PodcastPlayer'
import { ReadingProgress } from '../components/ReadingProgress'
import { RoundNav, type RoundNavItem } from '../components/RoundNav'
import { SectionHeader } from '../components/SectionHeader'
import { SeriesFooter } from '../components/SeriesFooter'
import { SourcesSection } from '../components/SourcesSection'
import { VerdictBox } from '../components/VerdictBox'
import { VerificationNotice } from '../components/VerificationNotice'
import { getAdjacentParts, personasInDocument } from '../data/documents'
import { groupBlocks } from '../data/groupBlocks'
import { estimateReadingTime } from '../data/readingTime'
import { usePodcastPlayer } from '../hooks/usePodcastPlayer'
import type { RoundtableDocument } from '../types/document'

interface RoundtablePageProps {
  document: RoundtableDocument
}

/** Stable id for a section, used for the round navigator and aria-labelledby. */
const sectionId = (i: number) => `round-${i + 1}`

/** Renders one full roundtable document from data. One page, many data objects. */
export function RoundtablePage({ document }: RoundtablePageProps) {
  const { prev, next } = getAdjacentParts(document.id)
  const player = usePodcastPlayer(document.id)

  const personaIds = useMemo(() => personasInDocument(document), [document])
  const readingMinutes = useMemo(() => estimateReadingTime(document), [document])
  // Coalesce runs of consecutive debate turns into threads once per document, so
  // the stage can render them as one exchange (and the grouping stays stable
  // across re-renders for DebateThread's scroll observers).
  const groupedSections = useMemo(
    () => document.sections.map((section) => groupBlocks(section.blocks)),
    [document],
  )
  const navItems = useMemo<RoundNavItem[]>(
    () =>
      document.sections.map((section, i) => ({
        id: sectionId(i),
        label: section.header.roundLabel,
        title: section.header.title,
      })),
    [document],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [document.id])

  return (
    <DocumentProvider claims={document.claims} sources={document.sources}>
      <ClaimDrawerProvider>
        <Masthead masthead={document.masthead} prev={prev} next={next} />
        <ReadingProgress />
        <PodcastPlayer player={player} />
        <PersonasBar personaIds={personaIds} label="The panel" />

        <RoundNav items={navItems} />
        <DebateNavFAB />

        <div className="container">
          <nav className="series-nav">
            <Link to="/">← The AI Reckoning series index</Link>
            <Link to="/verification">Verification status →</Link>
          </nav>

          <p className="reading-time">
            {readingMinutes} min read · {navItems.length} rounds
          </p>
          <IntroBlock paragraphs={document.intro} />
          <VerificationNotice claims={document.claims} />

          {document.sections.map((section, i) => {
            const id = sectionId(i)
            return (
              <section
                key={i}
                id={id}
                aria-labelledby={section.header.title ? `${id}-title` : undefined}
              >
                {section.dividerBefore ? <ChapterDivider /> : null}
                <SectionHeader header={section.header} headingId={`${id}-title`} />
                {groupedSections[i].map((group, j) =>
                  group.kind === 'debateThread' ? (
                    <DebateThread
                      key={j}
                      turns={group.turns}
                      stanceOverride={section.stanceOverride}
                    />
                  ) : (
                    <BlockRenderer key={j} block={group.block} />
                  ),
                )}
              </section>
            )
          })}

          {document.closing ? <VerdictBox verdict={document.closing} /> : null}
        </div>

        <SourcesSection sources={document.sources} />
        <SeriesFooter prev={prev} next={next} />
      </ClaimDrawerProvider>
    </DocumentProvider>
  )
}
