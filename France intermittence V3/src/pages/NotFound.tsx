import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/Icons'

export function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-page__eyebrow">Erreur 404</p>
      <h1 className="not-found-page__title">Cette page n’existe pas ou plus</h1>
      <p className="not-found-page__text">
        Le lien que vous avez suivi est peut-être obsolète, ou l’adresse comporte une erreur.
        Retrouvez nos formations, le financement AFDAS ou contactez-nous directement.
      </p>
      <div className="not-found-page__actions">
        <Link to="/" className="fi-button fi-button--primary">
          Retour à l’accueil
          <ArrowRightIcon className="fi-button__icon" />
        </Link>
        <Link to="/ma-formation-adaptee" className="fi-button fi-button--secondary">
          Ma formation adaptée
        </Link>
      </div>
    </main>
  )
}
