import { Link } from 'react-router-dom'
import { heroBenefits } from '../data/siteData'
import { ArrowRightIcon, MessageIcon } from './Icons'
import { TrustItems } from './TrustItems'
import { siteConfig } from '../data/siteConfig'
import { siteImages } from '../data/siteImages'

export function HeroSection() {
  return (
    <section className="hero-section" id="accueil">
      <div className="hero-section__panel">
        <div className="hero-section__content">
          <h1>
            Intermittent du spectacle&nbsp;:
            <br />
            sécurisez vos 507 heures grâce à la formation.
          </h1>
          <p>
            Vous devez compléter vos heures pour maintenir vos droits&nbsp;? Nous identifions
            avec vous la formation adaptée et, selon votre situation, votre formation peut vous
            coûter 0&nbsp;€. Vous n&apos;avez aucune démarche administrative à gérer&nbsp;: nous
            nous occupons du dossier.
          </p>
          <div className="hero-section__actions">
            <Link to="/ma-formation-adaptee" className="fi-button fi-button--primary">
              Trouver ma formation gratuite
              <ArrowRightIcon />
            </Link>
            <Link to="/financement" className="fi-button fi-button--secondary">
              <span className="fi-button__icon">
                <MessageIcon />
              </span>
              Comprendre le financement
            </Link>
          </div>
          <TrustItems items={heroBenefits} />
        </div>

        <div className="hero-section__visual">
          <img
            src={siteImages.heroCoupleAvif}
            className="hero-section__art"
            alt="Deux professionnels échangent sur un projet de formation pour intermittents du spectacle"
            fetchPriority="high"
            width={548}
            height={394}
          />
          <article className="hero-section__floating-card">
            <span className="hero-section__floating-icon">
              <MessageIcon />
            </span>
            <div>
              <h2>Un conseiller spécialisé intermittence vous répond</h2>
              <p>
                Étude gratuite de votre situation. Appelez le {siteConfig.phoneDisplay}.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
