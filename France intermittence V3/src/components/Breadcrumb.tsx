import { Link } from 'react-router-dom'

export type Crumb = { label: string; to?: string }

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Fil d’Ariane">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} className="breadcrumb__item">
            {item.to && !isLast ? (
              <Link to={item.to} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'breadcrumb__current' : 'breadcrumb__link'}>{item.label}</span>
            )}
            {!isLast && (
              <span className="breadcrumb__sep" aria-hidden="true">
                ›
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
