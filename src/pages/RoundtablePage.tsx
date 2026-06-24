import { Link } from 'react-router-dom'
import { BlockRenderer } from '../components/BlockRenderer'
import { ChapterDivider } from '../components/ChapterDivider'
import { CompanionBanner } from '../components/CompanionBanner'
import { DocumentProvider } from '../components/DocumentProvider'
import { IntroBlock } from '../components/IntroBlock'
import { Masthead } from '../components/Masthead'
import { PersonasBar } from '../components/PersonasBar'
import { SectionHeader } from '../components/SectionHeader'
import { SourcesSection } from '../components/SourcesSection'
import { VerdictBox } from '../components/VerdictBox'
import { VerificationNotice } from '../components/VerificationNotice'
import { getAdjacentParts } from '../data/documents'
import type { RoundtableDocument } from '../types/document'

interface RoundtablePageProps {
  document: RoundtableDocument
}

/** Renders one full roundtable document from data. One page, three data objects. */
export function RoundtablePage({ document }: RoundtablePageProps) {
  const { prev, next } = getAdjacentParts(document.id)

  return (
    <DocumentProvider claims={document.claims}>
      <Masthead masthead={document.masthead} prev={prev} next={next} />
      <PersonasBar />
      {document.companion ? <CompanionBanner banner={document.companion} /> : null}

      <div className="container">
        <nav className="series-nav">
          <Link to="/">← The AI Reckoning — series index</Link>
        </nav>

        <VerificationNotice claims={document.claims} />
        <IntroBlock paragraphs={document.intro} />

        {document.sections.map((section, i) => (
          <section key={i}>
            {section.dividerBefore ? <ChapterDivider /> : null}
            <SectionHeader header={section.header} />
            {section.blocks.map((block, j) => (
              <BlockRenderer key={j} block={block} />
            ))}
          </section>
        ))}

        {document.closing ? <VerdictBox verdict={document.closing} /> : null}
      </div>

      <SourcesSection sources={document.sources} />
    </DocumentProvider>
  )
}
