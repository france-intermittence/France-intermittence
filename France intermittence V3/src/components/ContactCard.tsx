import { siteImages } from '../data/siteImages'
import { MailIcon, PhoneIcon } from './Icons'
import { siteConfig } from '../data/siteConfig'

const assistanceIcon = siteImages.iconAppelAssistance

export function ContactCard() {
  return (
    <aside className="contact-card">
      <div className="contact-card__html" aria-label="Contact France Intermittence">
        <div className="contact-card__content">
          <p className="contact-card__eyebrow">Besoin d’un accompagnement ?</p>
          <h3 className="contact-card__title">Nos conseillers sont à votre écoute.</h3>

          <div className="contact-card__rows">
            <div className="contact-card__row">
              <span className="contact-card__icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              <div className="contact-card__details">
                <a className="contact-card__value contact-card__value--phone" href={siteConfig.phoneHref}>
                  {siteConfig.phoneDisplay}
                </a>
                <span className="contact-card__badge">Prix d’un appel local</span>
              </div>
            </div>

            <div className="contact-card__row">
              <span className="contact-card__icon" aria-hidden="true">
                <MailIcon />
              </span>
              <div className="contact-card__details">
                <a className="contact-card__value" href={siteConfig.emailHref}>
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card__figure" aria-hidden="true">
          <img src={assistanceIcon} className="contact-card__figure-art" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </aside>
  )
}
