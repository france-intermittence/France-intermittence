import type { Crumb } from '../components/Breadcrumb'
import heroVisual from '../../3- Recherches & Photos choisis/photo_hero_financement_couple.png'
import aboutVisual from '../../3- Recherches & Photos choisis/a propos.png'
import financementVisual from '../../3- Recherches & Photos choisis/photo_hero_financement_couple.png'
import blogVisual from '../../3- Recherches & Photos choisis/Page blog 1.png'
import { siteConfig } from './siteConfig'

export type SeoMeta = {
  title: string
  description: string
  image: string
  noindex?: boolean
  type?: 'website' | 'article'
  keywords?: string
  serviceName?: string
  faq?: Array<{ question: string; answer: string }>
}

const financingFaq = [
  {
    question: 'Les formations peuvent-elles être financées par l’AFDAS ?',
    answer:
      'Oui, selon vos droits et votre situation. France Intermittence vous aide à vérifier votre éligibilité et à constituer votre dossier.',
  },
  {
    question: 'Dois-je avancer les frais de formation ?',
    answer:
      'Dans de nombreux cas, non. Le financement peut être versé directement à l’organisme selon la prise en charge obtenue.',
  },
  {
    question: 'France Intermittence accompagne-t-il les démarches administratives ?',
    answer:
      'Oui. L’équipe accompagne les intermittents du spectacle dans la compréhension des droits, le montage du dossier et le suivi.',
  },
] as const

const supportFaq = [
  {
    question: 'Qui peut se faire accompagner ?',
    answer:
      'L’accompagnement est pensé pour les intermittents du spectacle qui souhaitent clarifier leur projet, leurs droits ou leur parcours de formation.',
  },
  {
    question: 'L’accompagnement est-il réservé à Paris ?',
    answer:
      'Non. France Intermittence intervient en Île-de-France et accompagne aussi des demandes partout en France selon les besoins.',
  },
] as const

const formFaq = [
  {
    question: 'Pourquoi remplir Ma Formation Adaptée ?',
    answer:
      'Le formulaire permet à l’équipe d’orienter rapidement l’intermittent vers la formation la plus adaptée à son objectif et à son volume d’heures.',
  },
  {
    question: 'Combien de temps faut-il pour être recontacté ?',
    answer:
      'France Intermittence annonce un retour rapide afin de qualifier votre besoin et de vous proposer la bonne orientation.',
  },
] as const

export const routeSeo: Record<string, SeoMeta> = {
  '/': {
    title: 'France Intermittence | Formations et financement pour intermittents du spectacle',
    description:
      'Formations pour intermittents du spectacle, accompagnement humain, financement AFDAS et démarches simplifiées à Paris, en Île-de-France et partout en France.',
    image: heroVisual,
    type: 'website',
    keywords:
      'intermittents du spectacle, formation intermittents, financement AFDAS, Paris, Île-de-France, France Intermittence',
    serviceName: 'Formation et accompagnement des intermittents du spectacle',
  },
  '/financement': {
    title: 'Financement AFDAS | France Intermittence',
    description:
      'Découvrez comment financer votre formation avec l’AFDAS ou France Travail. France Intermittence vous accompagne dans les droits, le dossier et la prise en charge.',
    image: financementVisual,
    type: 'website',
    keywords:
      'financement AFDAS, intermittents du spectacle, prise en charge formation, France Travail, formation financée Paris',
    serviceName: 'Accompagnement au financement de formation',
    faq: financingFaq.map((item) => ({ ...item })),
  },
  '/accompagnement': {
    title: 'Accompagnement personnalisé | France Intermittence',
    description:
      'France Intermittence accompagne les intermittents du spectacle à chaque étape: diagnostic, orientation, dossier et entrée en formation en Île-de-France et partout en France.',
    image: aboutVisual,
    type: 'website',
    keywords:
      'accompagnement intermittents, formation spectacle vivant, accompagnement AFDAS, intermittents Paris Île-de-France',
    serviceName: 'Accompagnement personnalisé pour intermittents du spectacle',
    faq: supportFaq.map((item) => ({ ...item })),
  },
  '/ma-formation-adaptee': {
    title: 'Ma Formation Adaptée | France Intermittence',
    description:
      'Présentez votre situation et trouvez la formation adaptée à votre parcours d’intermittent du spectacle avec l’accompagnement de France Intermittence.',
    image: heroVisual,
    type: 'website',
    keywords:
      'formation adaptée intermittents, 507 heures, intermittents du spectacle, accompagnement formation Paris',
    serviceName: 'Orientation vers une formation adaptée',
    faq: formFaq.map((item) => ({ ...item })),
  },
  '/ma-formation-adaptee/confirmation': {
    title: 'Confirmation de votre demande | France Intermittence',
    description:
      'Votre demande de formation adaptée a bien été prise en compte par France Intermittence.',
    image: heroVisual,
    noindex: true,
    type: 'website',
  },
  '/blog': {
    title: 'Blog intermittence et formation | France Intermittence',
    description:
      'Actualités, conseils, droits, financement AFDAS et ressources pour les intermittents du spectacle en Île-de-France et partout en France.',
    image: blogVisual,
    type: 'website',
    keywords:
      'blog intermittents du spectacle, actualités AFDAS, droits intermittence, formation spectacle',
  },
  '/a-propos': {
    title: 'À propos | France Intermittence',
    description:
      'Découvrez France Intermittence, son expertise, sa certification Qualiopi, son accompagnement métier et son engagement auprès des intermittents du spectacle.',
    image: aboutVisual,
    type: 'website',
    keywords:
      'France Intermittence, Qualiopi, intermittents du spectacle, formation professionnelle spectacle',
  },
  '/mentions-legales': {
    title: 'Mentions légales | France Intermittence',
    description: 'Informations légales relatives au site France Intermittence.',
    image: aboutVisual,
    noindex: true,
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité | France Intermittence',
    description: 'Politique de confidentialité et traitement des données personnelles de France Intermittence.',
    image: aboutVisual,
    noindex: true,
  },
  '/cookies': {
    title: 'Cookies | France Intermittence',
    description: 'Informations sur l’usage des cookies et technologies similaires.',
    image: aboutVisual,
    noindex: true,
  },
  '/cgu': {
    title: 'CGU | France Intermittence',
    description: 'Conditions générales d’utilisation du site France Intermittence.',
    image: aboutVisual,
    noindex: true,
  },
}

export function buildStructuredData(pathname: string, meta: SeoMeta, breadcrumbs: Crumb[]) {
  const canonical = new URL(pathname, siteConfig.siteUrl).toString()

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    areaServed: siteConfig.areaServed,
    description: siteConfig.defaultDescription,
  }

  const breadcrumbData = breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: new URL(crumb.to ?? pathname, siteConfig.siteUrl).toString(),
        })),
      }
    : null

  const serviceData = meta.serviceName
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: meta.serviceName,
        provider: {
          '@type': 'Organization',
          name: siteConfig.brandName,
        },
        areaServed: siteConfig.areaServed,
        serviceType: meta.serviceName,
        url: canonical,
        description: meta.description,
      }
    : null

  const faqData = meta.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: meta.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return [organization, breadcrumbData, serviceData, faqData].filter(Boolean)
}
