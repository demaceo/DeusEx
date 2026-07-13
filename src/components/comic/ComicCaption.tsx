import type { ComicCaption as ComicCaptionData } from '../../types/comic'

/** Skewed yellow narration plate pinned to a panel corner. */
export function ComicCaption({ data }: { data: ComicCaptionData }) {
  const placement = data.placement ?? 'top-left'
  return (
    <p className={`comic-caption comic-caption--${placement}`}>
      <span>{data.text}</span>
    </p>
  )
}
