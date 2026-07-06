const CONSENT_KEY = 'fi-cookie-consent'
const CONSENT_VERSION = 1
const CONSENT_TTL_DAYS = 180

export type ConsentValue = 'accepted' | 'refused'
type StoredConsent = { value: ConsentValue; version: number; timestamp: number }

export const CONSENT_CHANGE_EVENT = 'fi-consent-change'

export function getStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.version !== CONSENT_VERSION) return null

    const ageDays = (Date.now() - parsed.timestamp) / 86_400_000
    if (ageDays > CONSENT_TTL_DAYS) return null

    return parsed
  } catch {
    return null
  }
}

export function setConsent(value: ConsentValue): void {
  const stored: StoredConsent = { value, version: CONSENT_VERSION, timestamp: Date.now() }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }))
}

/** Efface le choix mémorisé et réaffiche le bandeau (lien "Gérer les cookies" du footer). */
export function reopenConsentBanner(): void {
  localStorage.removeItem(CONSENT_KEY)
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: null }))
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent()?.value === 'accepted'
}
