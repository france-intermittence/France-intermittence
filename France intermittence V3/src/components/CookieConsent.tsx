import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getStoredConsent, setConsent } from '../lib/cookieConsent'

export function CookieConsent() {
  const [visible, setVisible] = useState(() => !getStoredConsent())

  if (!visible) return null

  function handle(value: 'accepted' | 'refused') {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Consentement aux cookies">
      <p className="cookie-consent__text">
        Nous utilisons des cookies de mesure d’audience anonyme (pages consultées, clics sur les
        boutons d’appel et de contact) pour comprendre l’usage du site. Aucune donnée personnelle
        n’est collectée ni partagée. <Link to="/cookies">En savoir plus</Link>
      </p>
      <div className="cookie-consent__actions">
        <button type="button" className="cookie-consent__refuse" onClick={() => handle('refused')}>
          Refuser
        </button>
        <button type="button" className="cookie-consent__accept" onClick={() => handle('accepted')}>
          Accepter
        </button>
      </div>
    </div>
  )
}
