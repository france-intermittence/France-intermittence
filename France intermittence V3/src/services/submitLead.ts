/**
 * Données d'un lead transmises par le formulaire « Ma formation adaptée ».
 * Ce type décrit la charge utile telle qu'elle devra être envoyée, à terme,
 * vers la boîte e-mail du client (les demandes doivent arriver par e-mail).
 */
export type LeadData = {
  nom: string
  prenom: string
  /** Heures restantes à réaliser pour viser les 507 heures. */
  heuresBesoins: string
  /** Heures déjà réalisées (complément automatique à 507). */
  heuresRealisees: string
  /** Date d'anniversaire / renouvellement du statut (format ISO `YYYY-MM-DD`). */
  dateAnniversaire: string
  domaine: string
  telephone: string
  email: string
  /**
   * Profil d'origine du lead, capté depuis le paramètre d'URL `?profil=`
   * (`intermittent` ou `devenir`). Optionnel : sert uniquement à qualifier la
   * demande, n'est pas un champ de formulaire et n'entre pas dans la validation.
   */
  profil?: 'intermittent' | 'devenir'
}

export type SubmitLeadResult = {
  success: true
  /** Identifiant fictif de la demande, utile pour un futur suivi. */
  reference: string
}

/**
 * PLACEHOLDER — Aucune requête réseau réelle n'est effectuée ici.
 *
 * Cette fonction SIMULE l'envoi asynchrone d'un lead (petit délai puis succès)
 * afin que la mécanique du formulaire (état de soumission, redirection) soit
 * crédible et prête à brancher.
 *
 * 👉 C'EST ICI qu'on branchera plus tard l'envoi réel : la demande devra
 *    arriver sur l'e-mail du client. Au moment de l'intégration, remplacer le
 *    `setTimeout` ci-dessous par l'appel au backend / service d'e-mail, par ex. :
 *
 *      const response = await fetch('/api/leads', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify(data),
 *      })
 *      if (!response.ok) throw new Error('Échec de l’envoi du lead')
 *      return (await response.json()) as SubmitLeadResult
 *
 *    (ou un service tiers type EmailJS / Formspree / API maison qui relaie
 *     la demande vers l'adresse e-mail du client.)
 */
export function submitLead(data: LeadData): Promise<SubmitLeadResult> {
  // La donnée n'est volontairement pas exploitée : pas de réseau en maquette.
  void data

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        reference: `FI-${Date.now().toString(36).toUpperCase()}`,
      })
    }, 900)
  })
}
