import type { Paragraph } from '../../types/content'

/**
 * Renders Paragraph[] inside comic bubbles. `cite` nodes become footnote
 * marks linking to the episode's sources plate (the comic keeps the claim
 * registry but skips the essay series' evidence drawer).
 */
export function ComicParagraphs({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <>
      {paragraphs.map((paragraph, pi) => (
        <p key={pi}>
          {paragraph.map((node, ni) =>
            node.type === 'text' ? (
              <span key={ni}>{node.value}</span>
            ) : (
              <a
                key={ni}
                className="comic-cite"
                href="#comic-sources"
                aria-label="Jump to sources"
              >
                {node.label ?? '*'}
              </a>
            ),
          )}
        </p>
      ))}
    </>
  )
}
