import { useActiveSection } from '../hooks/useReadingProgress'

export interface RoundNavItem {
  id: string
  label: string
  title?: string
}

interface RoundNavProps {
  items: RoundNavItem[]
}

/**
 * A sticky left-rail navigator listing the document's rounds, highlighting the one
 * in view and jumping to it on click. Shown only where there's margin room (wide
 * viewports); the reading-progress bar covers navigation on narrow screens.
 */
export function RoundNav({ items }: RoundNavProps) {
  const ids = items.map((i) => i.id)
  const active = useActiveSection(ids)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="round-nav" aria-label="Rounds in this roundtable">
      <p className="round-nav__heading">On this page</p>
      <ol className="round-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="round-nav__link"
              data-active={item.id === active}
              aria-current={item.id === active ? 'true' : undefined}
              onClick={() => jump(item.id)}
            >
              <span className="round-nav__label">{item.label}</span>
              {item.title ? <span className="round-nav__title">{item.title}</span> : null}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
