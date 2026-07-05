import { Link } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { siteConfig } from '../data/siteConfig'

const qualiopiLogo = siteImages.logoQualiopi
const supportPhoto = siteImages.accompagnementPhotoAvif
import { supportFaq } from '../data/seo'
import { PageFaq } from '../components/PageFaq'
import { Reveal } from '../components/Reveal'

function IconContact() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="15" r="5" />
      <path d="M5 31c0-5 4-9 9-9s9 4 9 9" />
      <circle cx="28" cy="13" r="3.5" />
      <path d="M26 22c4.5 0 8 3 8 8" />
      <path d="M27 4h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2l-3 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

function IconDiagnostic() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="8" width="22" height="27" rx="3" />
      <rect x="15" y="5" width="10" height="6" rx="2" />
      <path d="M13.5 17.5l1.6 1.6 2.4-2.8" />
      <path d="M21 18h6" />
      <path d="M13.5 24.5l1.6 1.6 2.4-2.8" />
      <path d="M21 25h6" />
    </svg>
  )
}

function IconTarget() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="19" cy="21" r="12" />
      <circle cx="19" cy="21" r="6.5" />
      <circle cx="19" cy="21" r="1.6" fill="currentColor" stroke="none" />
      <path d="M30 10l-11 11" />
      <path d="M19 21l4-.6M19 21l.6-4" />
      <path d="M30 10l.6-3.8M30 10l-3.8.6" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 5l13 4.5v8.5c0 8.5-5.5 14-13 16.5C12.5 36 7 30.5 7 22V9.5z" />
      <path d="M14 20.5l4 4 8.5-9.5" />
    </svg>
  )
}

function IconCap() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16.5l16-7 16 7-16 7z" />
      <path d="M11 19.5v7.5c0 2.2 4 4 9 4s9-1.8 9-4v-7.5" />
      <path d="M36 16.5v8.5" />
    </svg>
  )
}

const steps = [
  {
    title: 'Premier échange',
    desc: 'Vous exposez votre situation, votre rythme, vos contraintes et votre objectif de formation avec un interlocuteur qui connaît l’intermittence.',
    icon: <IconContact />,
  },
  {
    title: 'Diagnostic personnalisé',
    desc: 'Nous analysons votre parcours, vos droits potentiels et les options de formation cohérentes avec votre métier.',
    icon: <IconDiagnostic />,
  },
  {
    title: 'Orientation du projet',
    desc: 'Nous vous aidons à choisir la bonne direction, la bonne temporalité et le bon cadre de prise en charge.',
    icon: <IconTarget />,
  },
  {
    title: 'Montage et sécurisation',
    desc: 'Nous clarifions les démarches, les pièces à réunir et le chemin le plus réaliste pour votre dossier.',
    icon: <IconShield />,
  },
  {
    title: 'Entrée en formation',
    desc: 'Nous restons présents jusqu’au lancement du parcours pour vous permettre d’avancer avec plus de sérénité.',
    icon: <IconCap />,
  },
]

const checks = [
  'Une lecture concrète de votre situation d’intermittent',
  'Un accompagnement humain et réactif',
  'Une orientation vers des formations cohérentes',
  'Un suivi jusqu’à l’entrée en formation',
]

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M6 12.5l3.5 3.5 8-8.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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

export function Accompagnement() {
  return (
    <div className="acc-page">
      <Reveal>
        <header className="acc-intro">
          <p className="acc-intro__eyebrow">Notre accompagnement</p>
          <h1 className="acc-intro__title">
            Un accompagnement pensé pour
            <br />
            les réalités du spectacle vivant
          </h1>
          <span className="acc-intro__underline" />
          <p className="acc-intro__lede">
            De votre premier appel à l’entrée en formation, un interlocuteur qui connaît
            l’intermittence reste à vos côtés pour clarifier vos droits, structurer votre
            projet et avancer sans démarche administrative à votre charge.
          </p>
        </header>
      </Reveal>

      <Reveal>
      <div className="acc-grid">
        <div className="acc-left">
          <h2 className="acc-title">
            Les étapes de votre parcours
          </h2>
          <span className="acc-title__underline" />

          <div className="acc-timeline">
            {steps.map((step, index) => (
              <div className="acc-step" key={step.title}>
                <div className="acc-step__marker">
                  <span className="acc-step__num">{index + 1}</span>
                  {index < steps.length - 1 && <span className="acc-step__line" />}
                </div>
                <div className="acc-step__body">
                  <h3 className="acc-step__title">{step.title}</h3>
                  <p className="acc-step__desc">{step.desc}</p>
                </div>
                <div className="acc-step__icon">{step.icon}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="acc-card">
          <h2 className="acc-card__title">
            À vos côtés,
            <br />
            du premier appel au démarrage
          </h2>
          <span className="acc-card__underline" />

          <div className="acc-card__main">
            <div className="acc-card__photo">
              <img src={supportPhoto} alt="Conseillère France Intermittence en accompagnement personnalisé" loading="lazy" decoding="async" width={1122} height={1402} />
            </div>

            <ul className="acc-card__checks">
              {checks.map((item) => (
                <li key={item} className="acc-card__check">
                  <span className="acc-card__check-icon">
                    <CheckMark />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="acc-card__qualiopi">
            <div className="acc-card__qualiopi-logo">
              <img src={qualiopiLogo} alt="Qualiopi - Processus certifié" loading="lazy" decoding="async" />
            </div>
            <p className="acc-card__qualiopi-text">
              France Intermittence s’appuie sur une certification reconnue pour proposer un accompagnement rigoureux, clair et rassurant.
              Contact direct : <a href={siteConfig.emailHref}>{siteConfig.email}</a>.
            </p>
          </div>
        </aside>
      </div>
      </Reveal>

      <Reveal>
        <section className="acc-reassure" aria-label="Ce qui change pour vous">
          <p className="acc-reassure__eyebrow">Ce que ça change pour vous</p>
          <div className="acc-reassure__stats">
            <div className="acc-reassure__stat">
              <span className="acc-reassure__stat-value">507 h</span>
              <span className="acc-reassure__stat-label">le seuil qui peut ouvrir vos droits à la formation</span>
            </div>
            <div className="acc-reassure__stat">
              <span className="acc-reassure__stat-value">0</span>
              <span className="acc-reassure__stat-label">démarche administrative à gérer de votre côté</span>
            </div>
            <div className="acc-reassure__stat">
              <span className="acc-reassure__stat-value">1</span>
              <span className="acc-reassure__stat-label">interlocuteur dédié jusqu’à l’entrée en formation</span>
            </div>
          </div>
          <p className="acc-reassure__note">
            Selon votre situation et vos droits, votre formation peut vous coûter 0 €. Nous le
            vérifions avec vous avant toute démarche.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <PageFaq title="Questions fréquentes sur l’accompagnement" items={supportFaq} />
      </Reveal>

      <Reveal>
        <section className="acc-cta">
          <div className="acc-cta__inner">
            <div className="acc-cta__left">
              <div className="acc-cta__icon">
                <HandsHeartIcon />
              </div>
              <div>
                <h2 className="acc-cta__title">Parlons de votre projet de formation</h2>
                <p className="acc-cta__sub">
                  En quelques minutes, nous faisons le point sur votre situation et la formation
                  la plus adaptée à votre métier.
                </p>
              </div>
            </div>
            <div className="acc-cta__actions">
              <a href={siteConfig.phoneHref} className="acc-cta__btn acc-cta__btn--outline">
                <PhoneIcon />
                Nous contacter
              </a>
              <Link to="/ma-formation-adaptee" className="acc-cta__btn acc-cta__btn--primary">
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
