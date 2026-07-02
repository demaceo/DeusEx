import type { Source } from '../types/content'

interface SourcesSectionProps {
  sources: Source[]
}

export function SourcesSection({ sources }: SourcesSectionProps) {
  return (
    <section className="sources-section" id="sources-section">
      <div className="container">
        <div className="sources-header">
          <h3>Primary Sources Referenced</h3>
          <div className="sources-header-rule" />
        </div>
        <ul className="source-list">
          {sources.map((source) => (
            <li key={source.id}>
              <strong>{source.title}</strong>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer noopener">
                  {source.description}
                </a>
              ) : (
                source.description
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
