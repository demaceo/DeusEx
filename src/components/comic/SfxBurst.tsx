import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import type { SfxBurst as SfxBurstData } from '../../types/comic'

/** A starburst onomatopoeia ("WHAM!") or grawlix burst ("#$%@!"). */
export function SfxBurst({ data }: { data: SfxBurstData }) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>()
  const spoken = data.style === 'grawlix' ? '[expletive]' : data.text
  return (
    <div
      ref={ref}
      className={`comic-sfx comic-sfx--${data.style} comic-sfx--${data.size ?? 'lg'}`}
      data-revealed={revealed}
      role="img"
      aria-label={`Comic sound effect: ${spoken}`}
    >
      <span aria-hidden="true">{data.text}</span>
    </div>
  )
}
