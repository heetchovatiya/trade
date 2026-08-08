import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import Logo from './Logo'

const LINKS = [
  { href: '#asset-markets', label: 'Markets' },
  { href: '#platforms', label: 'Platforms' },
  { href: '#accounts', label: 'Accounts' },
  { href: '#tools', label: 'Tools' },
  { href: '#faq', label: 'Help' },
]

export default function Header({ onOpenSignup }) {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo compact />

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-track">
              <span className={`theme-toggle-thumb ${isDark ? 'dark' : ''}`}>
                {isDark ? '☾' : '☀'}
              </span>
            </span>
          </button>
          <button type="button" className="btn-text" onClick={onOpenSignup}>
            Log In
          </button>
          <button type="button" className="btn btn-gold btn-sm" onClick={onOpenSignup}>
            Create Account
          </button>
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
