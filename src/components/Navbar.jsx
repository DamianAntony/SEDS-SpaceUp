import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar({ onOpenArcade }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['about', 'speakers', 'schedule', 'sponsors']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'ABOUT' },
    { href: '#speakers', label: 'SPEAKERS' },
    { href: '#schedule', label: 'SCHEDULE' },
    { href: '#sponsors', label: 'SPONSORS' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <span className="nav-signal font-mono">
            <span className="signal-dot" />
            SYS: SIGNAL_ACQUIRED // FREQ: 1420.405 MHz
          </span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link font-mono ${
                activeSection === link.href.slice(1) ? 'active' : ''
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          <button
            className="btn-arcade-nav font-pixel interactive"
            onClick={() => {
              setMenuOpen(false)
              if (onOpenArcade) onOpenArcade()
            }}
          >
            [ 🎮 ARCADE ]
          </button>

          <a
            href="https://spaceup2026.vercel.app/register"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-register nav-register-btn font-pixel interactive"
            id="nav-register-btn"
          >
            [ REGISTER ]
          </a>
        </div>

        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-bg" />
        <div className="mobile-menu-content">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link font-pixel"
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="mobile-nav-index font-pixel">0{i + 1}</span>
              {link.label}
            </a>
          ))}

          <a
            href="#arcade"
            className="mobile-nav-link font-pixel"
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              if (onOpenArcade) onOpenArcade()
            }}
            style={{ animationDelay: `${navLinks.length * 0.1}s` }}
          >
            <span className="mobile-nav-index font-pixel">05</span>
            ARCADE
          </a>

          <a
            href="https://spaceup2026.vercel.app/register"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-register mobile-register font-pixel"
            onClick={() => setMenuOpen(false)}
          >
            [ REGISTER ]
          </a>
        </div>
      </div>
    </nav>
  )
}
