import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted editorial faces for the three families declared in tokens.css.
// Variable files for the two serifs (one file covers every weight the kit uses,
// 700/800/900 display and 400/700 body), static per-weight files for the mono.
// All are `font-display: swap` and unicode-range gated, so a reader downloads
// only the subsets their text actually needs. The comic faces stay page-level
// imports (see ComicPage) so essay pages never load them.
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/source-serif-4/wght-italic.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource/ibm-plex-mono/700.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/comic.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
