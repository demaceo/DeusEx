import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DocumentRoute } from './pages/DocumentRoute'
import { IndexPage } from './pages/IndexPage'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
  { path: '/', element: <IndexPage /> },
  { path: '/:slug', element: <DocumentRoute /> },
  { path: '*', element: <NotFound /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
