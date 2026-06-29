import type { RouteObject } from 'react-router-dom'
import { DocumentRoute } from './pages/DocumentRoute'
import { IndexPage } from './pages/IndexPage'
import { NotFound } from './pages/NotFound'
import { PersonaThreadPage } from './pages/PersonaThreadPage'
import { VerificationPage } from './pages/VerificationPage'
import { VoicesIndexPage } from './pages/VoicesIndexPage'

/** Single source of truth for the route table (used by App and by tests). */
export const routes: RouteObject[] = [
  { path: '/', element: <IndexPage /> },
  { path: '/verification', element: <VerificationPage /> },
  { path: '/voices', element: <VoicesIndexPage /> },
  { path: '/voices/:personaId', element: <PersonaThreadPage /> },
  { path: '/:slug', element: <DocumentRoute /> },
  { path: '*', element: <NotFound /> },
]
