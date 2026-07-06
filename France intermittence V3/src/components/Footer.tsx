import { Link } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { footerColumns, legalLinks, siteConfig } from '../data/siteConfig'
import { reopenConsentBanner } from '../lib/cookieConsent'

const officialLogo = siteImages.logoOfficiel
const qualiopiLogo = siteImages.logoQualiopi

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__brand-head">
            <img src={officialLogo} alt={siteConfig.brandName} className="site-footer__logo" loading="lazy" decoding="async" />
            <img src={qualiopiLogo} alt="Certification Qualiopi" className="site-footer__quality-logo" loading="lazy" decoding="async" />
          </div>
          <p className="site-footer__tagline">
            Le partenaire formation des intermittents du spectacle. Financement, accompagnement et suivi à chaque étape de votre parcours, à Paris, en Île-de-France et partout en France.
          </p>
        </div>

        <div className="site-footer__nav">
          {footerColumns.map((column) => (
            <div key={column.title} className="site-footer__col">
              <h4 className="site-footer__col-title">{column.title}</h4>
              <ul className="site-footer__col-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="site-footer__col site-footer__contact-col">
            <h4 className="site-footer__col-title">Contact</h4>
            <div className="site-footer__contact">
              <a href={siteConfig.phoneHref} className="site-footer__contact-item">
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {siteConfig.phoneDisplay}
              </a>
              <a href={siteConfig.emailHref} className="site-footer__contact-item">
                <svg viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0l6 5 6-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {siteConfig.email}
              </a>
            </div>
            <p className="site-footer__contact-zone">
              Zone desservie : Paris, Île-de-France et accompagnement à distance selon votre situation.
            </p>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <span>© {new Date().getFullYear()} {siteConfig.brandName}. Tous droits réservés.</span>
          <p className="site-footer__credit">
            Site réalisé par{' '}
            <a href="https://webfityou.com/" target="_blank" rel="noreferrer noopener">
              WebFitYou
            </a>
          </p>
          <div className="site-footer__legal">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
            <button type="button" className="site-footer__manage-cookies" onClick={reopenConsentBanner}>
              Gérer les cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
