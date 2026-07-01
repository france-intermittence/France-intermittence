import { useNavigate } from 'react-router-dom'
import iconObjectif from '../../icone/Formations-32.svg'
import iconGroupe from '../../icone/groupe-32.svg'
import iconTimer from '../../icone/Timer-32.svg'
import { TrustBanner } from '../components/TrustBanner'

const badges = [
  { icon: iconObjectif, label: 'Objectif', sub: 'formation adaptée' },
  { icon: iconGroupe, label: 'Accompagnement', sub: 'personnalisé' },
  { icon: null, label: 'Prise en charge', sub: 'selon votre situation', euro: true },
  { icon: iconTimer, label: 'Réponse', sub: 'rapide et structurée' },
]

export function Confirmation() {
  const navigate = useNavigate()

  return (
    <div className="mfa-page">
      <div className="mfa-confirm-wrap">
        <div className="mfa-confirm__check">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#e8f8f5" />
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#0d9e84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="mfa-confirm__title">
          Votre demande a bien été transmise.
          <span className="mfa-confirm__highlight"> Notre équipe revient vers vous rapidement.</span>
        </h2>
        <p className="mfa-confirm__text">
          Un conseiller dédié va relire votre demande, étudier votre situation et vous proposer une orientation cohérente avec votre projet et vos droits.
        </p>

        <div className="mfa-badges mfa-badges--confirm">
          {badges.map((badge) => (
            <div key={badge.label} className="mfa-badge">
              <div className="mfa-badge__icon">
                {badge.euro ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14.5 4A7 7 0 1 0 14.5 20" strokeLinecap="round" />
                    <path d="M5 9h8M5 15h8" strokeLinecap="round" />
                  </svg>
                ) : (
                  <img src={badge.icon!} alt="" loading="lazy" decoding="async" />
                )}
              </div>
              <div>
                <span className="mfa-badge__label">{badge.label}</span>
                <span className="mfa-badge__sub">{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="mfa-confirm__back" onClick={() => navigate('/')}>
          Retour à l’accueil
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <TrustBanner />
    </div>
  )
}
