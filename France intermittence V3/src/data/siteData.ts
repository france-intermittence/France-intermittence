export type UniverseItem = {
  title: string
  description: string
  icon: string
}

export type BenefitItem = {
  text: string
  icon: string
}

export type FundingItem = {
  title: string
  description: string
  icon: string
  tone: 'orange' | 'blue'
}

export const heroBenefits: BenefitItem[] = [
  { icon: 'people', text: 'Pensé pour les intermittents du spectacle' },
  { icon: 'shield', text: 'Financement mobilisable selon vos droits' },
  { icon: 'heart', text: 'Accompagnement humain à chaque étape' },
  { icon: 'check', text: 'Démarches simplifiées, parcours plus clair' },
]

export const universeItems: UniverseItem[] = [
  { icon: 'technique', title: 'Technique', description: 'Son, lumière, vidéo, machinerie et régie technique.' },
  { icon: 'artistique', title: 'Artistique', description: 'Interprétation, danse, écriture, direction artistique et scène.' },
  {
    icon: 'career',
    title: 'Métiers & carrière',
    description: 'Production, administration, diffusion et structuration de parcours.',
  },
  { icon: 'digital', title: 'Numérique', description: 'MAO, montage, design, outils créatifs et réseaux sociaux.' },
  { icon: 'wellness', title: 'Bien-être', description: 'Prévention, voix, corps, rythme et gestion de l’intensité métier.' },
  { icon: 'catalog', title: 'Toutes les formations', description: 'Explorer les besoins et trouver la formation la plus adaptée.' },
]

export const fundingItems: FundingItem[] = [
  {
    icon: 'euro',
    tone: 'orange',
    title: 'Prise en charge des coûts pédagogiques',
    description: 'Selon votre situation, les financements mobilisables peuvent couvrir tout ou partie de votre formation.',
  },
  {
    icon: 'document',
    tone: 'blue',
    title: 'Accompagnement des démarches',
    description: 'Nous vous aidons à vérifier vos droits, préparer les justificatifs et constituer le bon dossier.',
  },
  {
    icon: 'secure',
    tone: 'orange',
    title: 'Paiement direct à l’organisme',
    description: 'Quand le financement le permet, le règlement peut être versé directement à l’école ou à l’organisme.',
  },
]
