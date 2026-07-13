import { useParams } from 'react-router-dom'
import { getComicBySlug } from '../data/comics'
import { ComicPage } from './ComicPage'
import { NotFound } from './NotFound'

/** Resolves the /unfiltered/:slug route param to a comic, or NotFound. */
export function ComicRoute() {
  const { slug } = useParams()
  const comic = getComicBySlug(slug)
  if (!comic) return <NotFound />
  return <ComicPage comic={comic} />
}
