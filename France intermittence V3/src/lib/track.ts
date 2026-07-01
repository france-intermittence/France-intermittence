/**
 * Helper de tracking factice (placeholder analytics).
 *
 * Aucun outil d'analyse réel n'est branché en maquette : on se contente d'un
 * `console.info`. C'est ici qu'on brancherait plus tard un vrai fournisseur
 * (Google Analytics, Matomo, Plausible…) en remplaçant le corps de la fonction.
 */
export function trackConversion(name: string, payload?: Record<string, unknown>): void {
  console.info('[track] conversion:', name, payload ?? {})
}
