import { useParams } from 'react-router-dom'
import { getDocumentBySlug } from '../data/documents'
import { NotFound } from './NotFound'
import { RoundtablePage } from './RoundtablePage'

/** Resolves the :slug route param to a document, or renders NotFound. */
export function DocumentRoute() {
  const { slug } = useParams()
  const document = getDocumentBySlug(slug)
  if (!document) return <NotFound />
  return <RoundtablePage document={document} />
}
