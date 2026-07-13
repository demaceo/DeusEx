import type { ComicDocument } from '../../types/comic'
import { SfxBurst } from './SfxBurst'

/** The episode's cover splash: sunburst, stacked display title, WHAM. */
export function ComicMasthead({ comic }: { comic: ComicDocument }) {
  return (
    <header className="comic-cover">
      <SfxBurst data={{ text: 'WHAM!', style: 'starburst', size: 'md' }} />
      <p className="comic-cover__overline">{comic.cover.overline}</p>
      <h1 className="comic-cover__title">
        {comic.cover.titleLines.map((line) => (
          <span key={line} className="comic-cover__title-line">
            {line}
          </span>
        ))}
      </h1>
      <p className="comic-cover__subtitle">{comic.cover.subtitle}</p>
      <p className="comic-cover__dateline">{comic.cover.dateLine}</p>
    </header>
  )
}
