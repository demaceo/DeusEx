import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import type { ComicPanel } from '../../types/comic'
import { ComicBlockRenderer } from './ComicBlockRenderer'

/**
 * One drawn panel: a hand-inked (or jagged/clean) frame around an ordered
 * stack of comic blocks, popping into place on first scroll into view.
 */
export function ComicPanelView({ panel }: { panel: ComicPanel }) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`comic-panel comic-panel--${panel.frame ?? 'sketch'} comic-reveal`}
      data-span={panel.span ?? 1}
      data-background={panel.background ?? 'flat'}
      data-revealed={revealed}
      role={panel.ariaLabel ? 'group' : undefined}
      aria-label={panel.ariaLabel}
    >
      {panel.blocks.map((block, i) => (
        <ComicBlockRenderer key={i} block={block} />
      ))}
    </div>
  )
}
