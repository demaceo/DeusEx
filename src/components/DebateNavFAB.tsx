import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { DOCUMENTS } from '../data/documents'
import type { Masthead } from '../types/document'

interface DebateNavFABProps {
  /** Drives the trigger's hover color to match this document's masthead. */
  accentColor: Masthead['accentColor']
}

export function DebateNavFAB({ accentColor }: DebateNavFABProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className="debate-nav-fab" ref={containerRef} data-accent={accentColor}>
      {open && (
        <nav className="debate-nav-fab__panel" aria-label="All debates">
          {DOCUMENTS.map((entry) => (
            <Link
              key={entry.doc.id}
              className="debate-nav-fab__item"
              to={`/${entry.doc.slug}`}
              onClick={() => setOpen(false)}
            >
              <span className="debate-nav-fab__part">{entry.partLabel}</span>
              <span className="debate-nav-fab__title">{entry.navTitle}</span>
            </Link>
          ))}
        </nav>
      )}
      <button
        type="button"
        className="debate-nav-fab__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Browse all debates"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
      </button>
    </div>
  )
}
