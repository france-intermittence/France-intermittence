import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRightIcon, BenefitIcon, FundingIcon, UniverseIcon } from '../components/Icons'
import { getMetierFaq, getMetierProfile, metierProfiles } from '../data/metiers'
import { siteConfig } from '../data/siteConfig'
import { siteImages } from '../data/siteImages'

const metierImages: Record<string, string> = {
  comediens: siteImages.metierComediens,
  musiciens: siteImages.metierMusiciens,
  'techniciens-spectacle': siteImages.metierTechniciens,
  audiovisuel: siteImages.metierAudiovisuel,
  danseurs: siteImages.metierDanseurs,
  'realisateurs-monteurs-cadreurs': siteImages.metierRealisateurs,
}

function MetiersIndex() {
  return (
    <main className="metiers-page">
      <section className="metiers-hero">
        <p className="metiers-eyebrow">Métiers du spectacle</p>
        <h1>Formations par métier pour intermittents du spectacle</h1>
        <p>
          Explorez les parcours de formation adaptés aux artistes, techniciens et professionnels de
          l’audiovisuel. Chaque page métier présente des exemples de formations, les retours attendus
          et les points à vérifier pour le financement.
        </p>
      </section>

      <section className="metiers-grid" aria-label="Choisir un métier">
        {metierProfiles.map((profile) => (
          <Link to={`/metiers/${profile.slug}`} className="metiers-card" key={profile.slug}>
            <img src={metierImages[profile.slug]} alt={`Formation ${profile.shortTitle} pour intermittents du spectacle`} loading="lazy" decoding="async" />
            <span className="metiers-card__icon"><UniverseIcon kind={profile.icon} /></span>
            <h2>{profile.shortTitle}</h2>
            <p>{profile.intro}</p>
            <span className="metiers-card__link">
              Voir les formations <ArrowRightIcon />
            </span>
          </Link>
        ))}
      </section>
    </main>
  )
}

function MetierDetail() {
  const { slug } = useParams()
  const profile = getMetierProfile(slug)

  if (!profile) return <Navigate to="/metiers" replace />

  const faq = getMetierFaq(profile)
  const currentIndex = metierProfiles.findIndex((item) => item.slug === profile.slug)
  const relatedMetiers = [
    metierProfiles[(currentIndex + 1) % metierProfiles.length],
    metierProfiles[(currentIndex + 2) % metierProfiles.length],
  ]

  return (
    <main className="metier-page">
      <section className="metier-hero">
        <div className="metier-hero__copy">
          <p className="metiers-eyebrow">Métiers du spectacle</p>
          <h1>{profile.title}</h1>
          <p>{profile.description}</p>
          <div className="metier-hero__actions">
            <Link to="/ma-formation-adaptee" className="fi-button fi-button--primary">
              Trouver ma formation adaptée
              <ArrowRightIcon />
            </Link>
            <a href={siteConfig.phoneHref} className="fi-button fi-button--secondary">
              Nous contacter
            </a>
          </div>
        </div>
        <figure className="metier-hero__media">
          <img src={metierImages[profile.slug]} alt={`Professionnels ${profile.shortTitle} en formation`} loading="eager" decoding="async" />
          <figcaption>
            <UniverseIcon kind={profile.icon} />
            <span>{profile.shortTitle}</span>
          </figcaption>
        </figure>
      </section>

      <section className="metier-section metier-section--intro">
        <div>
          <p className="metiers-eyebrow">Situations fréquentes</p>
          <h2>Quand envisager une formation&nbsp;?</h2>
          <p>{profile.specificIntro}</p>
        </div>
        <div className="metier-pills">
          {profile.situations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="metier-section metier-section--split">
        <div>
          <p className="metiers-eyebrow">Formations possibles</p>
          <h2>Quels parcours regarder en priorité&nbsp;?</h2>
          <div className="metier-list">
            {profile.formations.map((item) => (
              <article className="metier-list__item" key={item}>
                <span>
                  <FundingIcon kind="document" />
                </span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="metiers-eyebrow">Retours attendus</p>
          <h2>Ce que la formation peut apporter</h2>
          <div className="metier-list">
            {profile.outcomes.map((item) => (
              <article className="metier-list__item" key={item}>
                <span>
                  <BenefitIcon kind="check" />
                </span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="metier-section metier-section--split">
        <div>
          <p className="metiers-eyebrow">Parcours type</p>
          <h2>Comment on construit le projet</h2>
          <div className="metier-list">
            {profile.program.map((item) => (
              <article className="metier-list__item" key={item}>
                <span><BenefitIcon kind="shield" /></span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="metiers-eyebrow">Retours de formation</p>
          <h2>Ce que les parcours permettent de clarifier</h2>
          <div className="metier-list">
            {profile.feedback.map((item) => (
              <article className="metier-list__item" key={item}>
                <span><BenefitIcon kind="heart" /></span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="metier-funding">
        <span className="metier-funding__icon">
          <BenefitIcon kind="shield" />
        </span>
        <div>
          <p className="metiers-eyebrow">Financement formation</p>
          <h2>AFDAS, France Travail et dossier de prise en charge</h2>
          <p>{profile.fundingNote}</p>
          <p>
            France Intermittence vous aide à vérifier les droits, les délais, la cohérence du projet
            et les justificatifs avant d’engager la demande de financement.{' '}
            <Link to="/financement">Voir le détail du financement</Link>.
          </p>
        </div>
      </section>

      <section className="metier-section metier-section--faq">
        <p className="metiers-eyebrow">Questions fréquentes</p>
        <h2>Formation {profile.shortTitle.toLocaleLowerCase('fr-FR')} : les points à clarifier</h2>
        <div className="metier-faq">
          {faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="metier-section metier-related" aria-labelledby="metier-related-title">
        <p className="metiers-eyebrow">Pour aller plus loin</p>
        <h2 id="metier-related-title">Poursuivre votre parcours</h2>
        <div className="metier-related__links">
          <Link to="/financement">Comprendre le financement AFDAS</Link>
          <Link to="/blog/507-heures-intermittence-securiser-parcours">Sécuriser vos 507 heures</Link>
          {relatedMetiers.map((related) => (
            <Link key={related.slug} to={`/metiers/${related.slug}`}>
              Formation {related.shortTitle.toLocaleLowerCase('fr-FR')}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export function Metiers() {
  const { slug } = useParams()
  return slug ? <MetierDetail /> : <MetiersIndex />
}
