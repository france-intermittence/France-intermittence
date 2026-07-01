import { Link } from 'react-router-dom'
import heroPhoto from '../../3- Recherches & Photos choisis/photo_hero_financement_couple.png'
import qualiopiLogo from '../../certifications et partenaire/Certifications qualiopi.png'
import afdasLogo from '../../certifications et partenaire/AFDAS.png'
import franceTravailLogo from '../../certifications et partenaire/france-travail-logo-2048x726.png'
import iconSecurite from '../../icone/securité-32.svg'
import iconFormations from '../../icone/Formations-32.svg'
import iconGroupe from '../../icone/groupe-32.svg'
import { siteConfig } from '../data/siteConfig'
import { Reveal } from '../components/Reveal'

const heroBadges = [
  { icon: iconSecurite, label: 'Certifié', sub: 'Qualiopi' },
  { icon: null, label: 'Financement', sub: 'selon vos droits', euro: true },
  { icon: null, label: 'Paiement direct', sub: 'quand il est possible', building: true },
  { icon: null, label: 'Appui humain', sub: 'de la vérification au dossier', handshake: true },
]

const steps = [
  {
    num: '1',
    icon: iconFormations,
    title: 'Vous clarifiez votre besoin',
    desc: 'Nous partons de votre métier, de votre objectif et de votre situation d’intermittent pour viser la bonne formation.',
  },
  {
    num: '2',
    icon: iconGroupe,
    title: 'Nous vérifions vos droits et montons le dossier',
    desc: 'AFDAS, France Travail ou autre cadre mobilisable: nous structurons les étapes et les justificatifs avec vous.',
  },
  {
    num: '3',
    icon: null,
    building: true,
    title: 'La formation peut démarrer dans un cadre sécurisé',
    desc: 'Quand la prise en charge est validée, vous avancez sereinement, avec un parcours plus lisible et moins d’incertitude.',
  },
]

const faqs = [
  {
    question: 'Les formations peuvent-elles être financées par l’AFDAS ?',
    answer:
      'Oui, selon vos droits et votre situation. France Intermittence vous aide à comprendre l’éligibilité possible et à préparer le bon dossier.',
  },
  {
    question: 'Dois-je avancer les frais de formation ?',
    answer:
      'Selon le cadre de prise en charge obtenu, le paiement peut être versé directement à l’organisme. Nous vous expliquons le scénario applicable à votre situation.',
  },
  {
    question: 'Intervenez-vous seulement à Paris ?',
    answer:
      'L’accompagnement est pensé depuis Paris et l’Île-de-France, mais des demandes peuvent aussi être suivies à distance selon les besoins.',
  },
]

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  )
}

function EuroIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M14.5 4A7 7 0 1 0 14.5 20M5 9h8M5 15h8" />
    </svg>
  )
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 12.5 11 15l4-4 1.5 1.5a2.2 2.2 0 0 0 3.1 0l2.4-2.4M2.5 12.4 6 9a2.2 2.2 0 0 1 3.1 0l1 1M12 7.5l1.5-1.5a2.2 2.2 0 0 1 3.1 0L21.5 11" />
      <path d="M2.5 12.4V19a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-8" />
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

export function Financement() {
  return (
    <div className="fin-page">
      <Reveal>
      <section className="fin-hero">
        <div className="fin-hero__content">
          <h1 className="fin-hero__title">
            Financer sa formation
            <br />
            sans se perdre dans les démarches
          </h1>
          <p className="fin-hero__accent">Un cadre clair, pensé pour les intermittents du spectacle</p>
          <p className="fin-hero__desc">
            Nous vous aidons à comprendre les solutions mobilisables, à vérifier vos droits
            et à structurer un dossier solide pour avancer avec plus de sérénité.
          </p>

          <div className="fin-hero__badges">
            {heroBadges.map((badge) => (
              <div key={badge.label} className="fin-hero__badge">
                <div className="fin-hero__badge-icon">
                  {badge.euro ? (
                    <EuroIcon />
                  ) : badge.building ? (
                    <BuildingIcon />
                  ) : badge.handshake ? (
                    <HandshakeIcon />
                  ) : (
                    <img src={badge.icon!} alt="" decoding="async" />
                  )}
                </div>
                <div>
                  <span className="fin-hero__badge-label">{badge.label}</span>
                  <span className="fin-hero__badge-sub">{badge.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-hero__visual">
          <img src={heroPhoto} alt="Deux personnes étudient un dossier de formation et de financement" decoding="async" />
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="fin-steps" id="etapes-financement">
        <h2 className="fin-steps__title">Un parcours en 3 étapes pour passer de l’intention à l’action</h2>

        <div className="fin-steps__grid">
          {steps.map((step, index) => (
            <div key={step.num} className="fin-steps__item">
              <div className="fin-step">
                <span className="fin-step__num">{step.num}</span>
                <div className="fin-step__row">
                  <div className="fin-step__icon">
                    {step.building ? <BuildingIcon /> : <img src={step.icon!} alt="" loading="lazy" decoding="async" />}
                  </div>
                  <div className="fin-step__text">
                    <h3 className="fin-step__title">{step.title}</h3>
                    <p className="fin-step__desc">{step.desc}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="fin-steps__arrow" aria-hidden="true">
                  <svg viewBox="0 0 40 12" fill="none">
                    <path d="M0 6h36M30 1l6 5-6 5" stroke="#ff5a1f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="fin-reassure" id="reassurance-financement">
        <div className="fin-reassure__text">
          <p className="fin-reassure__eyebrow">Votre budget formation</p>
          <h2 className="fin-reassure__title">
            Selon votre situation, votre formation peut vous coûter 0 €
          </h2>
          <p className="fin-reassure__desc">
            Dès 507 heures déclarées, vos droits à la formation peuvent ouvrir une prise en
            charge AFDAS. Nous vérifions votre éligibilité et montons le dossier avec vous,
            sans démarche administrative à votre charge.
          </p>
          <div className="fin-reassure__actions">
            <Link to="/ma-formation-adaptee" className="fi-button fi-button--primary">
              Vérifier mon éligibilité
            </Link>
            <a href={siteConfig.phoneHref} className="fin-reassure__phone">
              ou appelez le {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="fin-reassure__stats">
          <div className="fin-reassure__stat">
            <span className="fin-reassure__stat-value">507 h</span>
            <span className="fin-reassure__stat-label">le seuil d’ouverture des droits</span>
          </div>
          <div className="fin-reassure__stat">
            <span className="fin-reassure__stat-value">0 €*</span>
            <span className="fin-reassure__stat-label">de reste à charge possible</span>
          </div>
          <div className="fin-reassure__stat">
            <span className="fin-reassure__stat-value">0</span>
            <span className="fin-reassure__stat-label">démarche administrative à gérer</span>
          </div>
        </div>
        <p className="fin-reassure__note">* Selon vos droits et le cadre de prise en charge obtenu.</p>
      </section>
      </Reveal>

      <Reveal>
      <section className="fin-logos">
        <div className="fin-logos__group fin-logos__group--cert">
          <img src={qualiopiLogo} alt="Qualiopi - Processus certifié" className="fin-logos__qualiopi" loading="lazy" decoding="async" />
        </div>

        <span className="fin-logos__divider" aria-hidden="true" />

        <div className="fin-logos__group fin-logos__group--partners">
          <span className="fin-logos__label">Partenaires de financement</span>
          <div className="fin-logos__partners-row">
            <img src={afdasLogo} alt="AFDAS" className="fin-logos__partner" loading="lazy" decoding="async" />
            <img src={franceTravailLogo} alt="France Travail" className="fin-logos__partner fin-logos__partner--ft" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="fin-faq" id="faq-financement">
        <div className="fin-faq__header">
          <p className="fin-faq__eyebrow">Questions fréquentes</p>
          <h2 className="fin-faq__title">Les réponses utiles avant de lancer votre dossier</h2>
        </div>
        <div className="fin-faq__grid">
          {faqs.map((item) => (
            <article key={item.question} className="fin-faq__item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="fin-cta">
        <div className="fin-cta__inner">
          <div className="fin-cta__left">
            <div className="fin-cta__icon">
              <HandsHeartIcon />
            </div>
            <div>
              <h3 className="fin-cta__title">Besoin d’un regard humain sur votre financement ?</h3>
              <p className="fin-cta__sub">
                Notre équipe vous accompagne depuis Paris et l’Île-de-France, avec une réponse structurée et concrète.
              </p>
            </div>
          </div>
          <div className="fin-cta__actions">
            <a href={siteConfig.phoneHref} className="fin-cta__btn fin-cta__btn--outline">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Appeler un conseiller
            </a>
            <Link to="/ma-formation-adaptee" className="fin-cta__btn fin-cta__btn--primary">
              Vérifier mon financement
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      </Reveal>
    </div>
  )
}
