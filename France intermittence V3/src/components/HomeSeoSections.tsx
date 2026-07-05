import { Link } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { ArrowRightIcon, BenefitIcon, FundingIcon, StepIcon, UniverseIcon } from './Icons'
import { metierProfiles } from '../data/metiers'

const qualiopiLogo = siteImages.logoQualiopi

const photoBands = [
  {
    photo: siteImages.homePhotoBandPlateau,
    alt: 'Caméra de cinéma professionnelle sur un plateau de tournage',
    icon: 'technique',
    caption: 'Des métiers concrets, une formation qui suit le rythme du plateau.',
  },
  {
    photo: siteImages.homePhotoBandEquipe,
    alt: 'Réalisateur et équipe technique contrôlant l’image sur un plateau de tournage',
    icon: 'career',
    caption: 'Un accompagnement pensé pour coller à la réalité de vos tournages et de vos contrats.',
  },
  {
    photo: siteImages.homePhotoBandInterview,
    alt: 'Équipe technique en tournage avec caméra et perche son lors d’une interview',
    icon: 'digital',
    caption: 'Des ressources pensées pour les techniciens, artistes et professionnels de l’audiovisuel.',
  },
] as const

const steps = [
  {
    icon: 'search',
    title: 'Analyse',
    text: 'Analyse de votre situation d’intermittent ou de futur intermittent',
  },
  {
    icon: 'rights',
    title: 'Financement',
    text: 'Identification des financements mobilisables selon vos droits',
  },
  {
    icon: 'folder',
    title: 'Dossier',
    text: 'Montage du dossier et préparation des justificatifs nécessaires',
  },
  {
    icon: 'spark',
    title: 'Validation',
    text: 'Suivi jusqu’à validation de la formation et démarrage du parcours',
  },
]

const trustItems = [
  {
    icon: 'people',
    title: 'Spécialisation spectacle',
    text: 'Une spécialisation claire sur les intermittents du spectacle, artistes et techniciens.',
  },
  {
    icon: 'shield',
    title: 'Lecture des dispositifs',
    text: 'Une lecture concrète des dispositifs AFDAS, France Travail et financements formation.',
  },
  {
    icon: 'check',
    title: 'Dossier cadré',
    text: 'Un accompagnement administratif pour éviter les erreurs de dossier et les allers-retours inutiles.',
  },
  {
    icon: 'heart',
    title: 'Suivi humain',
    text: 'Un conseil humain pour relier votre besoin de formation à votre métier, votre calendrier et vos droits.',
  },
]

const internalLinks = [
  {
    to: '/financement',
    title: 'Comprendre le financement formation des intermittents',
    text: 'Voir les prises en charge possibles, les démarches et les points à vérifier avant de déposer un dossier.',
  },
  {
    to: '/accompagnement',
    title: 'Être accompagné dans vos démarches administratives',
    text: 'Découvrir comment France Intermittence vous aide à clarifier vos droits et à constituer votre dossier.',
  },
  {
    to: '/ma-formation-adaptee',
    title: 'Trouver une formation adaptée à votre profil',
    text: 'Décrire votre situation pour être orienté vers une formation cohérente avec votre métier et vos objectifs.',
  },
  {
    to: '/blog',
    title: 'Lire nos ressources sur les droits des intermittents',
    text: 'Approfondir les sujets AFDAS, 507 heures, formation professionnelle et parcours intermittent.',
  },
]

const usefulArticles = [
  {
    to: '/blog/507-heures-intermittence-securiser-parcours',
    category: 'Droits & démarches',
    title: 'Comprendre les 507 heures et sécuriser son parcours',
    text: 'Relier formation, calendrier professionnel et maintien des droits.',
  },
  {
    to: '/blog/contributions-formation-role-afdas-intermittent',
    category: 'Financement',
    title: 'AFDAS, France Travail : quels financements regarder ?',
    text: 'Identifier les dispositifs adaptés à votre situation.',
  },
  {
    to: '/blog/heures-formation-assimilees-507-heures',
    category: 'Formation',
    title: 'Quand la formation compte-t-elle dans les 507 heures ?',
    text: 'Plafond de 338 h, ARE-Formation et conditions d’assimilation.',
  },
]

const serviceCards = [
  {
    icon: 'document',
    title: 'Droits et conditions',
    text: 'Vérifier votre situation, vos droits formation, les justificatifs et les critères avant de déposer une demande.',
  },
  {
    icon: 'euro',
    title: 'Financement',
    text: 'Identifier les prises en charge possibles selon votre profil, le financeur et la formation envisagée.',
  },
  {
    icon: 'secure',
    title: 'Délais et validation',
    text: 'Anticiper les étapes administratives pour limiter les blocages et préparer un dossier plus clair.',
  },
]

const faqItems = [
  {
    question: 'Comment financer une formation quand on est intermittent ?',
    answer:
      'Le financement dépend de votre situation, de vos droits ouverts, de votre projet et du type de formation visé. France Intermittence vous aide à vérifier les pistes possibles, à préparer les justificatifs et à orienter le dossier vers le bon dispositif.',
  },
  {
    question: 'L’AFDAS prend-il en charge ma formation ?',
    answer:
      'L’AFDAS peut intervenir pour certains artistes-auteurs, intermittents, techniciens ou professionnels du spectacle selon les critères applicables au moment de la demande. Une vérification personnalisée reste nécessaire avant d’engager les démarches.',
  },
  {
    question: 'Puis-je me former entre deux contrats ?',
    answer:
      'Oui, une formation peut souvent s’intégrer entre deux contrats si le calendrier, les droits et les conditions de prise en charge sont compatibles. L’objectif est de construire un parcours réaliste sans fragiliser votre activité.',
  },
  {
    question: 'Combien d’heures faut-il pour accéder à un financement ?',
    answer:
      'Il n’existe pas une réponse unique valable pour tous les dossiers. Les conditions varient selon votre statut, votre historique d’activité, le financeur sollicité et la formation choisie. Un diagnostic permet de clarifier rapidement les options.',
  },
  {
    question: 'France Intermittence accompagne-t-il les artistes et techniciens ?',
    answer:
      'Oui. L’accompagnement s’adresse aux artistes, techniciens, profils audiovisuels et professionnels du spectacle qui veulent sécuriser leur projet de formation, comprendre leurs droits et simplifier leurs démarches.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

function PhotoBand({ photo, alt, icon, caption }: (typeof photoBands)[number]) {
  return (
    <figure className="home-seo__photo-band">
      <img src={photo} alt={alt} loading="lazy" decoding="async" width={1600} height={900} />
      <figcaption>
        <span className="home-seo__photo-band-icon">
          <UniverseIcon kind={icon} />
        </span>
        {caption}
      </figcaption>
    </figure>
  )
}

export function HomeSeoSections() {
  return (
    <section className="home-seo" aria-labelledby="home-seo-title">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      <header className="home-seo__hero">
        <div className="home-seo__hero-copy">
          <p className="home-seo__eyebrow">Formation intermittent du spectacle</p>
          <h2 className="section-title home-seo__title" id="home-seo-title">
            Comment ça marche pour vos droits, votre financement et vos délais&nbsp;?
          </h2>
          <p>
            La formation professionnelle peut vous aider à renforcer vos compétences, préparer une
            évolution de carrière ou sécuriser votre parcours d’intermittent du spectacle. Selon votre
            situation, plusieurs interlocuteurs peuvent entrer en jeu&nbsp;: AFDAS, France Travail,
            organisme de formation, employeurs ou dispositifs liés à votre activité.
          </p>
          <p>
            Avant de lancer une demande, il faut vérifier vos droits, la cohérence de la formation, les
            conditions de prise en charge, les justificatifs attendus et les délais de traitement.
            France Intermittence vous aide à rendre ce parcours plus lisible, de l’analyse de votre
            situation jusqu’au suivi du dossier.
          </p>
        </div>

        <aside className="home-seo__qualiopi" aria-label="Certification Qualiopi">
          <span>Certification qualité</span>
          <img src={qualiopiLogo} alt="Certification Qualiopi" loading="lazy" decoding="async" />
          <p>Un repère qualité pour vos démarches de formation professionnelle.</p>
        </aside>
      </header>

      <div className="home-seo__service-grid" aria-label="Points clés du financement formation">
        {serviceCards.map((item) => (
          <article className="home-seo__service-card" key={item.title}>
            <span className="home-seo__icon home-seo__icon--orange">
              <FundingIcon kind={item.icon} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <PhotoBand {...photoBands[0]} />

      <div className="home-seo__split">
        <article className="home-seo__panel home-seo__panel--blue">
          <span className="home-seo__panel-icon">
            <BenefitIcon kind="building" />
          </span>
          <div>
            <h3>Accompagnement formation intermittent à Paris, en Île-de-France et à distance</h3>
            <p>
              Nous accompagnons les intermittents du spectacle basés à Paris, en Île-de-France et
              partout en France à distance. L’objectif reste le même&nbsp;: trouver une formation
              pertinente, comprendre les financements possibles et avancer avec un dossier clair.
            </p>
          </div>
        </article>

        <article className="home-seo__panel home-seo__panel--orange">
          <span className="home-seo__panel-icon">
            <BenefitIcon kind="shield" />
          </span>
          <div>
            <h3>Pourquoi choisir France Intermittence&nbsp;?</h3>
            <ul className="home-seo__check-list">
              <li>Spécialisation intermittent du spectacle</li>
              <li>Accompagnement administratif</li>
              <li>Financement formation clarifié</li>
              <li>Conseil personnalisé et suivi humain</li>
            </ul>
          </div>
        </article>
      </div>

      <section className="home-seo__block home-seo__block--steps" aria-labelledby="home-steps-title">
        <div className="home-seo__block-heading">
          <div>
            <p className="home-seo__kicker">Parcours guidé</p>
            <h3 id="home-steps-title">Votre accompagnement en 4 étapes</h3>
          </div>
          <Link to="/ma-formation-adaptee">Démarrer mon diagnostic</Link>
        </div>
        <div className="home-seo__steps">
          {steps.map((step, index) => (
            <article className="home-seo__step" key={step.title}>
              <span className="home-seo__step-number">{index + 1}</span>
              <span className="home-seo__step-icon">
                <StepIcon kind={step.icon} />
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <PhotoBand {...photoBands[1]} />

      <section className="home-seo__block" aria-labelledby="home-profiles-title">
        <div className="home-seo__block-heading">
          <div>
            <p className="home-seo__kicker">Métiers du spectacle</p>
            <h3 id="home-profiles-title">Des formations adaptées à chaque profil métier</h3>
          </div>
        </div>
        <div className="home-seo__profiles">
          {metierProfiles.map((item) => (
            <Link to={`/metiers/${item.slug}`} className="home-seo__profile" key={item.slug}>
              <span className="home-seo__icon">
                <UniverseIcon kind={item.icon} />
              </span>
              <h4>{item.shortTitle}</h4>
              <p>{item.intro}</p>
              <span className="home-seo__profile-link">
                Voir la page métier <ArrowRightIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="home-seo__trust-layout">
        <section className="home-seo__panel" aria-labelledby="home-trust-title">
          <p className="home-seo__kicker">Engagements</p>
          <h3 id="home-trust-title">Des preuves de confiance concrètes</h3>
          <div className="home-seo__trust-list">
            {trustItems.map((item) => (
              <article className="home-seo__trust-item" key={item.title}>
                <span className="home-seo__icon home-seo__icon--soft">
                  <BenefitIcon kind={item.icon} />
                </span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="home-seo__panel home-seo__panel--links" aria-labelledby="home-links-title">
          <p className="home-seo__kicker">Maillage interne</p>
          <h3 id="home-links-title">Continuer votre parcours</h3>
          <div className="home-seo__links">
            {internalLinks.map((item) => (
              <Link to={item.to} key={item.to} className="home-seo__link-card">
                <strong>{item.title}</strong>
                <span>{item.text}</span>
                <ArrowRightIcon />
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <PhotoBand {...photoBands[2]} />

      <section className="home-seo__block home-seo__block--articles" aria-labelledby="home-articles-title">
        <div className="home-seo__block-heading">
          <div>
            <p className="home-seo__kicker">Ressources</p>
            <h3 id="home-articles-title">Ressources utiles pour les intermittents</h3>
          </div>
          <Link to="/blog">Voir tous les articles</Link>
        </div>
        <div className="home-seo__articles">
          {usefulArticles.map((article) => (
            <article className="home-seo__article" key={article.title}>
              <span>{article.category}</span>
              <h4>{article.title}</h4>
              <p>{article.text}</p>
              <Link to={article.to}>
                Lire l’article
                <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-seo__faq" aria-labelledby="home-faq-title">
        <div className="home-seo__block-heading">
          <div>
            <p className="home-seo__kicker">FAQ formation intermittent</p>
            <h3 id="home-faq-title">Questions fréquentes sur la formation des intermittents</h3>
          </div>
        </div>
        <div className="home-seo__faq-list">
          {faqItems.map((item) => (
            <details className="home-seo__faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  )
}
