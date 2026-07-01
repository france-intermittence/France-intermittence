import { Link } from 'react-router-dom'
import blogFeatured from '../../3- Recherches & Photos choisis/Page blog 1.png'
import blogCumul from '../../3- Recherches & Photos choisis/Page blog 2.png'
import blogThalie from '../../3- Recherches & Photos choisis/Page blog 3.png'
import blogAfdas from '../../3- Recherches & Photos choisis/Page blog 4.png'
import { siteConfig } from '../data/siteConfig'
import { Reveal } from '../components/Reveal'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function HandsHeartIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 12.2c1.6-2.6 5.4-1.9 5.4 1.1 0 2.2-3 4.3-5.4 5.9-2.4-1.6-5.4-3.7-5.4-5.9 0-3 3.8-3.7 5.4-1.1z" />
      <path d="M2 26v-5l5.5-3.2c.9-.5 2-.5 2.9.1L13 20" />
      <path d="M30 26v-5l-5.5-3.2c-.9-.5-2-.5-2.9.1L19 20" />
      <path d="M10.5 20l2.5 2.2c.6.5 1.4.8 2.2.8h4.3" />
    </svg>
  )
}

const articles = [
  {
    tag: 'Droits & réglementation',
    title: "Cumul intermittent et activité complémentaire : les points à vérifier avant d’avancer",
    date: '09 février 2026',
    image: blogCumul,
    to: '/accompagnement',
  },
  {
    tag: 'Protection sociale',
    title: 'Mieux se faire accompagner quand son parcours devient plus complexe',
    date: '05 février 2026',
    image: blogThalie,
    to: '/accompagnement',
  },
  {
    tag: 'Formation',
    title: 'Financement AFDAS : les réflexes à avoir avant de choisir sa formation',
    date: '02 février 2026',
    image: blogAfdas,
    to: '/financement',
  },
]

export function Blog() {
  return (
    <div className="blog-page">
      <Reveal>
        <header className="blog-header">
          <p className="blog-eyebrow">Ressources & actualités</p>
          <h1 className="blog-title">
            Ressources, conseils et actualités
            <br />
            pour les intermittents du spectacle
          </h1>
          <span className="blog-title__underline" />
          <p className="blog-intro">
            Des contenus pour comprendre vos droits, préparer votre financement
            et avancer dans votre projet de formation avec plus de clarté.
          </p>
        </header>
      </Reveal>

      <Reveal>
      <div className="blog-grid">
        <article className="blog-featured">
          <div className="blog-featured__media">
            <img src={blogFeatured} alt="Conférence et ressources autour de la formation des intermittents" loading="lazy" decoding="async" />
          </div>
          <div className="blog-featured__body">
            <span className="blog-tag">Démarches</span>
            <h2 className="blog-featured__title">
              Construire son projet de formation quand on est intermittent: par où commencer ?
            </h2>
            <p className="blog-featured__desc">
              Objectif métier, calendrier, droits, financement et choix du bon interlocuteur:
              les bases à poser avant d’engager votre dossier.
            </p>
            <div className="blog-featured__footer">
              <span className="blog-date">
                <CalendarIcon /> 12 février 2026
              </span>
              <Link to="/ma-formation-adaptee" className="blog-read-btn">
                Lancer mon projet <ArrowIcon />
              </Link>
            </div>
          </div>
        </article>

        <div className="blog-side">
          {articles.map((article) => (
            <article className="blog-card" key={article.title}>
              <div className="blog-card__media">
                <img src={article.image} alt={article.title} loading="lazy" decoding="async" />
              </div>
              <div className="blog-card__body">
                <span className="blog-tag">{article.tag}</span>
                <h3 className="blog-card__title">{article.title}</h3>
                <span className="blog-date">
                  <CalendarIcon /> {article.date}
                </span>
              </div>
              <Link to={article.to} className="blog-card__arrow" aria-label={`Lire ${article.title}`}>
                <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
      </Reveal>

      <Reveal>
        <section className="blog-cta">
          <div className="blog-cta__inner">
            <div className="blog-cta__left">
              <div className="blog-cta__icon">
                <HandsHeartIcon />
              </div>
              <div>
                <h2 className="blog-cta__title">Prêt à passer de la lecture à l’action ?</h2>
                <p className="blog-cta__sub">
                  Selon votre situation et vos droits, votre formation peut vous coûter 0 €.
                  Nous le vérifions avec vous, sans démarche administrative à votre charge.
                </p>
              </div>
            </div>
            <div className="blog-cta__actions">
              <a href={siteConfig.phoneHref} className="blog-cta__btn blog-cta__btn--outline">
                <PhoneIcon />
                Appeler le {siteConfig.phoneDisplay}
              </a>
              <Link to="/ma-formation-adaptee" className="blog-cta__btn blog-cta__btn--primary">
                Trouver ma formation adaptée
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
