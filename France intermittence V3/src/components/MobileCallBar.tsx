import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

export function MobileCallBar() {
  return (
    <div className="mobile-call-bar" role="region" aria-label="Contact rapide">
      <a href={siteConfig.phoneHref} className="mobile-call-bar__call">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        Appeler
      </a>
      <Link to="/ma-formation-adaptee" className="mobile-call-bar__callback">
        Être rappelé
      </Link>
    </div>
  )
}
