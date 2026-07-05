export type ProofStat = { value: string; label: string }
export type ProofTestimonial = { quote: string; name: string; role: string }

/**
 * Source unique des preuves sociales (SocialProof.tsx). `proofTestimonials`
 * reste vide tant qu'aucun témoignage réel, nommé et consenti n'a été
 * recueilli : ne pas y ajouter de citations inventées (avis fictifs
 * interdits par le droit de la consommation).
 */
export const proofStats: ProofStat[] = [
  { value: '1 000+', label: 'intermittents accompagnés' },
  { value: '1 500+', label: 'de dossiers de financement étudiés' },
  { value: '10 ans', label: "d'accompagnement à Paris et en Île-de-France" },
]

export const proofTestimonials: ProofTestimonial[] = []
