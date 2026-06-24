import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>That page doesn’t exist in this series.</p>
      <Link to="/">← Back to the series index</Link>
    </div>
  )
}
