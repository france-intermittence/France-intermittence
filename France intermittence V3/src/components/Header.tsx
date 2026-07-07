import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { metierProfiles } from '../data/metiers'
import { siteConfig } from '../data/siteConfig'
import { PhoneIcon } from './Icons'

const officialLogo = siteImages.logoHeader

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/financement', label: 'Financement' },
  { to: '/accompagnement', label: 'Accompagnement' },
  { to: '/metiers', label: 'Métiers', dropdown: true },
  { to: '/ma-formation-adaptee', label: 'Ma formation adaptée' },
  { to: '/blog', label: 'Blog' },
  { to: '/a-propos', label: 'À propos' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [metiersOpen, setMetiersOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

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

    const closeMenu = () => {
      setOpen(false)
      setMetiersOpen(false)
    }
    window.addEventListener('resize', closeMenu)

    return () => window.removeEventListener('resize', closeMenu)
  }, [open])

  useEffect(() => {
    if (!metiersOpen) return

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setMetiersOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMetiersOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [metiersOpen])

  const closeMobileMenu = () => {
    setOpen(false)
    setMetiersOpen(false)
  }

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
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
          {navItems.map((item) =>
            item.dropdown ? (
              <div className={`site-header__dropdown ${metiersOpen ? 'is-open' : ''}`} key={item.to} ref={dropdownRef}>
                <button
                  type="button"
                  className={pathname.startsWith('/metiers') ? 'site-header__nav-active' : ''}
                  aria-expanded={metiersOpen}
                  aria-haspopup="true"
                  onClick={() => setMetiersOpen((value) => !value)}
                >
                  {item.label}
                  <span className="site-header__dropdown-chevron" aria-hidden="true" />
                </button>
                <div className="site-header__dropdown-menu" aria-label="Sélectionner un métier">
                  <Link to="/metiers" onClick={closeMobileMenu}>
                    Tous les métiers
                  </Link>
                  {metierProfiles.map((profile) => (
                    <Link key={profile.slug} to={`/metiers/${profile.slug}`} onClick={closeMobileMenu}>
                      {profile.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'site-header__nav-active' : '')} onClick={closeMobileMenu}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="site-header__actions">
          <a
            href={siteConfig.phoneHref}
            className="site-header__call-btn"
            onClick={closeMobileMenu}
            aria-label={`Nous contacter par téléphone au ${siteConfig.phoneDisplay}`}
          >
            <PhoneIcon className="site-header__call-icon" />
            Nous contacter
          </a>
          <Link to="/ma-formation-adaptee" className="fi-button fi-button--primary site-header__cta" onClick={closeMobileMenu}>
            Être rappelé
          </Link>
        </div>
      </div>
    </header>
  )
}
