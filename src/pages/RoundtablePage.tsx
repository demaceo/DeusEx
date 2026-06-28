import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BlockRenderer } from '../components/BlockRenderer'
import { ChapterDivider } from '../components/ChapterDivider'
import { CompanionBanner } from '../components/CompanionBanner'
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
        <Masthead
          masthead={document.masthead}
          prev={prev}
          next={next}
          audio={{
            hasEpisode: player.hasEpisode,
            isPlaying: player.isPlaying,
            onToggle: player.toggle,
          }}
        />
        <ReadingProgress />
        <PodcastPlayer player={player} />
        <PersonasBar personaIds={personaIds} label="The panel" />
        {document.companion ? <CompanionBanner banner={document.companion} /> : null}

        <RoundNav items={navItems} />

        <div className="container">
          <nav className="series-nav">
            <Link to="/">← The AI Reckoning — series index</Link>
            <Link to="/verification">Verification status →</Link>
          </nav>

          <VerificationNotice claims={document.claims} />
          <p className="reading-time">
            {readingMinutes} min read · {navItems.length} rounds
          </p>
          <IntroBlock paragraphs={document.intro} />

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
                {section.blocks.map((block, j) => (
                  <BlockRenderer key={j} block={block} />
                ))}
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
