import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import officialLogo from '../../logo officiel/Logo officiel.svg'
import { siteConfig } from '../data/siteConfig'

export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setCompact((previous) => {
        if (!previous && window.scrollY > 80) return true
        if (previous && window.scrollY < 40) return false
        return previous
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const closeMenu = () => setOpen(false)
    window.addEventListener('resize', closeMenu)

    return () => window.removeEventListener('resize', closeMenu)
  }, [open])

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''} ${open ? 'is-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="site-header__top-line" />
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={siteConfig.brandName}>
          <img src={officialLogo} className="site-header__logo-image" alt={siteConfig.brandName} decoding="async" />
        </Link>

        <button
          type="button"
          className={`site-header__burger ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          <NavLink to="/financement" className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')}>
            Financement
          </NavLink>
          <NavLink to="/accompagnement" className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')}>
            Accompagnement
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')}>
            Blog
          </NavLink>
          <NavLink to="/a-propos" className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')}>
            À propos
          </NavLink>
          <NavLink to="/ma-formation-adaptee" className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')}>
            Ma formation adaptée
          </NavLink>
        </nav>

        <div className="site-header__actions">
          <a href={siteConfig.emailHref} className="site-header__email-link">Nous contacter</a>
          <a href={siteConfig.phoneHref} className="site-header__phone">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {siteConfig.phoneDisplay}
          </a>
          <Link to="/ma-formation-adaptee" className="fi-button fi-button--primary site-header__cta">
            Être rappelé
          </Link>
          <button
            type="button"
            className={`site-header__collapse-btn ${collapsed ? 'is-collapsed' : ''}`}
            aria-label={collapsed ? 'Afficher la navigation' : 'Réduire la navigation'}
            onClick={() => setCollapsed((value) => !value)}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
