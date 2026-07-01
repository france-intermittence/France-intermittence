import iconSecurite from '../../icone/securité-32.svg'
import qualiopiLogo from '../../certifications et partenaire/Certifications qualiopi.png'
import afdasLogo from '../../certifications et partenaire/AFDAS.png'
import franceTravailLogo from '../../certifications et partenaire/france-travail-logo-2048x726.png'

export function TrustBanner() {
  return (
    <section className="mfa-trust" aria-label="Certifications et partenaires">
      <div className="mfa-trust__intro">
        <div className="mfa-trust__icon-wrap">
          <img src={iconSecurite} alt="" className="mfa-trust__icon" loading="lazy" decoding="async" />
        </div>
        <div>
          <p className="mfa-trust__eyebrow">Cadre de confiance</p>
          <h2 className="mfa-trust__title">Une prise en charge structurée pour les intermittents du spectacle</h2>
          <p className="mfa-trust__text">
            France Intermittence s’appuie sur une certification reconnue et des partenaires identifiés
            pour accompagner les intermittents du spectacle dans la durée.
          </p>
        </div>
      </div>

      <div className="mfa-trust__grid">
        <article className="mfa-trust__panel mfa-trust__panel--qualiopi">
          <span className="mfa-trust__label">Certification</span>
          <div className="mfa-trust__logo-box mfa-trust__logo-box--qualiopi">
            <img src={qualiopiLogo} alt="Qualiopi - Processus certifié" loading="lazy" decoding="async" />
          </div>
          <p className="mfa-trust__panel-text">
            Organisme certifié Qualiopi pour les actions de formation.
          </p>
        </article>

        <article className="mfa-trust__panel">
          <span className="mfa-trust__label">Partenaires de financement</span>
          <div className="mfa-trust__partners">
            <div className="mfa-trust__partner-logo">
              <img src={afdasLogo} alt="AFDAS" loading="lazy" decoding="async" />
            </div>
            <div className="mfa-trust__partner-logo mfa-trust__partner-logo--ft">
              <img src={franceTravailLogo} alt="France Travail" loading="lazy" decoding="async" />
            </div>
          </div>
          <p className="mfa-trust__panel-text">
            AFDAS et France Travail peuvent intervenir selon votre situation, vos droits et votre projet de formation.
          </p>
        </article>
      </div>
    </section>
  )
}
