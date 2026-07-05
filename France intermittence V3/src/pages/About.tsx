import { Link } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { siteConfig } from '../data/siteConfig'

const aboutPhoto = siteImages.aboutPortraitAvif
const qualiopiLogo = siteImages.logoQualiopi
const certificationIcon = siteImages.iconContratCertification
const trainerIcon = siteImages.iconCasque
const groupIcon = siteImages.iconGroupe
const calendarIcon = siteImages.iconCalendrier
const shieldIcon = siteImages.iconSecurite
import { aboutFaq } from '../data/seo'
import { PageFaq } from '../components/PageFaq'
import { Reveal } from '../components/Reveal'

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

type AboutFeature = {
  title: string
  description: string
  tone: 'cyan' | 'violet' | 'orange'
  icon: string
}

const navigationItems = [
  { label: 'Notre approche', href: '#approche' },
  { label: 'Ce qui nous distingue', href: '#engagements' },
  { label: 'Repères de confiance', href: '#preuves' },
] as const

const features: AboutFeature[] = [
  {
    title: 'Un cadre certifié',
    description:
      'Notre organisme s’appuie sur un cadre certifié pour proposer des parcours fiables, lisibles et activables.',
    tone: 'cyan',
    icon: certificationIcon,
  },
  {
    title: 'Des intervenants en activité',
    description:
      'Les réalités du spectacle vivant, de l’audiovisuel et des environnements techniques nourrissent la pédagogie.',
    tone: 'violet',
    icon: trainerIcon,
  },
  {
    title: 'Des projets pensés avec le financement',
    description:
      'Le financement n’est pas traité à la fin: il fait partie du cadrage du projet dès les premiers échanges.',
    tone: 'orange',
    icon: certificationIcon,
  },
  {
    title: 'Une relation à taille humaine',
    description:
      'Les échanges restent concrets, réactifs et personnalisés pour permettre d’avancer sans se disperser.',
    tone: 'cyan',
    icon: groupIcon,
  },
]

const commitments = [
  {
    title: 'Clarifier vite',
    text: 'Vous aider à comprendre votre point de départ, vos marges de manœuvre et les options réalistes pour avancer.',
  },
  {
    title: 'Orienter juste',
    text: 'Relier votre métier, votre calendrier et votre besoin à une formation cohérente, plutôt qu’à une solution générique.',
  },
  {
    title: 'Sécuriser les démarches',
    text: 'Transformer un parcours souvent flou en étapes compréhensibles, préparées et plus simples à piloter.',
  },
] as const

const highlights = [
  {
    title: 'Spécialisation intermittents',
    text: 'Un positionnement centré sur les intermittents du spectacle, leurs rythmes, leurs contraintes et leurs droits.',
  },
  {
    title: 'Ancrage Paris / Île-de-France',
    text: 'Un accompagnement pensé localement avec possibilité d’échanges à distance selon la situation.',
  },
  {
    title: 'Accompagnement de bout en bout',
    text: 'De la clarification du besoin jusqu’à l’entrée en formation, avec une même logique de suivi.',
  },
] as const

export function About() {
  return (
    <main className="about-page">
      <Reveal>
      <section className="about-hero">
        <div className="about-hero__media">
          <img src={aboutPhoto} alt="Portrait d’une conseillère France Intermittence" className="about-hero__image" decoding="async" width={1086} height={1448} />
        </div>

        <div className="about-hero__content">
          <p className="about-hero__eyebrow">À propos de France Intermittence</p>
          <h1 className="about-hero__title">
            Une équipe engagée pour
            <br />
            rendre la formation plus
            <br />
            lisible pour les intermittents
          </h1>
          <p className="about-hero__lead">
            France Intermittence accompagne les professionnels du spectacle vivant et de l’audiovisuel avec une approche claire,
            concrète et orientée résultats. Notre priorité: relier le bon projet de formation, le bon niveau d’accompagnement et le bon cadre de financement.
          </p>

          <div className="about-hero__nav" aria-label="Navigation dans la page À propos">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} className="about-hero__nav-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="about-hero__features">
            {features.map((feature) => (
              <article key={feature.title} className="about-feature">
                <div className={`about-feature__icon about-feature__icon--${feature.tone}`}>
                  <img src={feature.icon} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="about-feature__body">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="about-panel about-panel--approach" id="approche">
        <div className="about-panel__intro">
          <p className="about-panel__eyebrow">Notre approche</p>
          <h2 className="about-panel__title">Une lecture plus simple de la formation, du financement et du bon timing</h2>
          <p className="about-panel__text">
            Notre rôle n’est pas seulement de présenter des formations. Nous aidons à transformer une situation parfois complexe
            en un parcours compréhensible: comprendre le besoin, choisir la bonne orientation, puis structurer les démarches sans perdre de temps.
          </p>
        </div>

        <div className="about-commitments">
          {commitments.map((commitment) => (
            <article key={commitment.title} className="about-commitment">
              <h3>{commitment.title}</h3>
              <p>{commitment.text}</p>
            </article>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="about-panel about-panel--highlights" id="engagements">
        <div className="about-panel__intro">
          <p className="about-panel__eyebrow">Ce qui nous distingue</p>
          <h2 className="about-panel__title">Des repères concrets pour mieux décider et avancer plus sereinement</h2>
        </div>

        <div className="about-highlights">
          {highlights.map((highlight, index) => (
            <article key={highlight.title} className="about-highlight">
              <span className="about-highlight__index">0{index + 1}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
            </article>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="about-proof-section" id="preuves">
        <div className="about-proof-section__intro">
          <p className="about-panel__eyebrow">Repères de confiance</p>
          <h2 className="about-panel__title">Un cadre certifié et une expertise dédiée aux intermittents</h2>
          <span className="about-proof-section__underline" />
          <p className="about-panel__text">
            Des repères concrets pour avancer sereinement: un processus certifié, une organisation structurée
            et une connaissance fine des métiers du spectacle.
          </p>
        </div>

      <div className="about-proof">
        <article className="about-proof__item about-proof__item--logo">
          <div className="about-proof__logo-wrap">
            <img src={qualiopiLogo} alt="Qualiopi - processus certifié" loading="lazy" decoding="async" />
          </div>
        </article>

        <article className="about-proof__item">
          <div className="about-proof__icon">
            <img src={calendarIcon} alt="" loading="lazy" decoding="async" />
          </div>
          <div>
            <h3>Un cadre structuré</h3>
            <p>Des parcours conçus pour sécuriser l’orientation, les démarches et l’entrée en formation.</p>
          </div>
        </article>

        <article className="about-proof__item">
          <div className="about-proof__icon about-proof__icon--shield">
            <img src={shieldIcon} alt="" loading="lazy" decoding="async" />
          </div>
          <div>
            <h3>Intermittents, Paris & Île-de-France</h3>
            <p>Une expertise dédiée aux métiers du spectacle, avec accompagnement local et à distance selon les besoins.</p>
          </div>
        </article>
      </div>
      </section>
      </Reveal>

      <Reveal>
        <PageFaq title="Questions fréquentes sur France Intermittence" items={aboutFaq} />
      </Reveal>

      <Reveal>
        <section className="about-cta">
          <div className="about-cta__inner">
            <div className="about-cta__left">
              <div className="about-cta__icon">
                <HandsHeartIcon />
              </div>
              <div>
                <h2 className="about-cta__title">Vous voulez clarifier votre projet de formation ?</h2>
                <p className="about-cta__sub">
                  Nous vous aidons à choisir la bonne direction, à vérifier votre cadre de
                  financement et à poser les prochaines étapes.
                </p>
              </div>
            </div>
            <div className="about-cta__actions">
              <a href={siteConfig.phoneHref} className="about-cta__btn about-cta__btn--outline">
                <PhoneIcon />
                Appeler le {siteConfig.phoneDisplay}
              </a>
              <Link to="/ma-formation-adaptee" className="about-cta__btn about-cta__btn--primary">
                Trouver ma formation adaptée
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
