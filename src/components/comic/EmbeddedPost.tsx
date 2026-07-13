import type { EmbeddedPost as EmbeddedPostData } from '../../types/comic'

/** The social post artifact at the center of the episode. */
export function EmbeddedPost({ data }: { data: EmbeddedPostData }) {
  return (
    <figure className="comic-post" style={{ margin: 0 }}>
      <div className="comic-post__head">
        <span className="comic-post__avatar" aria-hidden="true">
          {data.author.charAt(0)}
        </span>
        <span>
          <span className="comic-post__author">{data.author}</span>
          <span className="comic-post__handle">{data.handle}</span>
        </span>
      </div>
      <blockquote className="comic-post__text" style={{ margin: 0 }}>
        {data.text}
      </blockquote>
      {data.meta && <span className="comic-post__meta">{data.meta}</span>}
    </figure>
  )
}
