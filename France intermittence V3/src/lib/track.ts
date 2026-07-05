import { hasAnalyticsConsent } from './cookieConsent'

export type TrackEventType = 'page_view' | 'click'

/**
 * Envoie un événement de mesure d'audience anonyme (table `site_events`).
 * N'envoie rien tant que le visiteur n'a pas accepté les cookies de mesure
 * d'audience (voir CookieConsent.tsx / lib/cookieConsent.ts). Échec silencieux
 * : le tracking ne doit jamais interrompre la navigation.
 *
 * Import dynamique de `./supabase` : cette fonction est appelée dès le
 * premier rendu (App.tsx, hors lazy-loading), un import statique gonflerait
 * le bundle initial de tout le client @supabase/supabase-js pour chaque
 * visiteur, y compris ceux qui refusent les cookies.
 */
export function trackEvent(eventType: TrackEventType, eventName: string, metadata: Record<string, unknown> = {}): void {
  if (!hasAnalyticsConsent()) return

  const page = typeof window !== 'undefined' ? window.location.pathname : ''

  import('./supabase').then(({ supabase }) => {
    supabase
      .from('site_events')
      .insert({ event_type: eventType, event_name: eventName, page, metadata })
      .then(({ error }) => {
        if (error) console.warn('[track] échec d’envoi de l’événement :', error.message)
      })
  })
}

/** Conservé pour compatibilité avec les appels existants (ex. formulaire Ma formation adaptée). */
export function trackConversion(name: string, payload?: Record<string, unknown>): void {
  trackEvent('click', name, payload)
}
