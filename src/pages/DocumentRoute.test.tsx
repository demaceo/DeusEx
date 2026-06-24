import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routes } from '../routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

describe('routing', () => {
  it('renders the matching document for a known slug', () => {
    renderAt('/real-costs')
    expect(screen.getByText(/Five voices examine/i)).toBeInTheDocument()
  })

  it('renders NotFound for an unknown slug', () => {
    renderAt('/does-not-exist')
    expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  })
})
