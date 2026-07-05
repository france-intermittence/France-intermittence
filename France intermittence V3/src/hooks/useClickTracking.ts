import { useEffect } from 'react'
import { trackEvent } from '../lib/track'

/**
 * Écoute globale (délégation d'événements) des clics sur les liens de
 * conversion : appel téléphonique, email, et entrée dans le parcours "Ma
 * formation adaptée" (formulaire de rappel). Une seule écoute couvre tous
 * les boutons du site (header, footer, hero, cartes contact, barre mobile…)
 * sans avoir à instrumenter chaque composant individuellement.
 */
export function useClickTracking(): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest('a')
      if (!link) return

      const href = link.getAttribute('href') || ''
      const label = link.textContent?.trim().slice(0, 60) || ''

      if (href.startsWith('tel:')) {
        trackEvent('click', 'call_click', { href, label })
      } else if (href.startsWith('mailto:')) {
        trackEvent('click', 'email_click', { href, label })
      } else if (href === '/ma-formation-adaptee' || href.startsWith('/ma-formation-adaptee?') || href.startsWith('/ma-formation-adaptee#')) {
        trackEvent('click', 'callback_click', { label })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])
}
