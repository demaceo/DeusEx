import type { RouteObject } from 'react-router-dom'
import { DocumentRoute } from './pages/DocumentRoute'
import { IndexPage } from './pages/IndexPage'
import { NotFound } from './pages/NotFound'

/** Single source of truth for the route table (used by App and by tests). */
export const routes: RouteObject[] = [
  { path: '/', element: <IndexPage /> },
  { path: '/:slug', element: <DocumentRoute /> },
  { path: '*', element: <NotFound /> },
]
