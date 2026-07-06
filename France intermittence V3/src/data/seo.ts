// Ces visuels alimentent uniquement og:image/twitter:image (Seo.tsx). On
// garde volontairement le PNG ici : Facebook/X/LinkedIn ne supportent pas
// tous l'AVIF pour les aperçus de partage, contrairement aux <img> du site
// (navigateurs modernes) qui utilisent la version AVIF plus légère ci-dessous.
import { siteImages } from './siteImages'
import { siteConfig } from './siteConfig'

const aboutVisual = siteImages.aboutPortraitPng
// Logo carré (même visuel que le favicon), servi depuis /public : utilisé comme
// aperçu de partage (WhatsApp, Facebook, LinkedIn...) sur les pages "vitrine".
// Les articles de blog gardent leur propre photo (voir BlogArticle.tsx).
const logoVisual = '/web-app-manifest-512x512.png'
import { getMetierFaq, metierProfiles } from './metiers'

export type Crumb = { label: string; to?: string }

export type ArticleMeta = {
  authorName: string
  publishedAt: string
  modifiedAt?: string
  wordCount?: number
  category?: string
  keywords?: string[]
}

export type SeoMeta = {
  title: string
  description: string
  image: string
  noindex?: boolean
  type?: 'website' | 'article'
  keywords?: string
  serviceName?: string
  faq?: Array<{ question: string; answer: string }>
  /** Présent uniquement sur un article de blog → émet un schema BlogPosting. */
  article?: ArticleMeta
  /** Présent sur une page de listing (métiers, blog) → émet un schema ItemList. */
  itemList?: Array<{ name: string; url: string }>
}

// Ces tableaux sont la SOURCE UNIQUE de vérité pour chaque FAQ : les pages
// (Financement.tsx, Accompagnement.tsx, MaFormationAdaptee.tsx, About.tsx,
// Blog.tsx) les importent pour l'affichage, et `buildStructuredData` les
// utilise pour le JSON-LD FAQPage. Le contenu affiché et le schema ne peuvent
// donc plus diverger.

export const financingFaq = [
  {
    question: 'Les formations peuvent-elles être financées par l’AFDAS ?',
    answer:
      'Oui, selon vos droits et votre situation. France Intermittence vous aide à comprendre l’éligibilité possible et à préparer le bon dossier.',
  },
  {
    question: 'Dois-je avancer les frais de formation ?',
    answer:
      'Selon le cadre de prise en charge obtenu, le paiement peut être versé directement à l’organisme. Nous vous expliquons le scénario applicable à votre situation.',
  },
  {
    question: 'Intervenez-vous seulement à Paris ?',
    answer:
      'L’accompagnement est pensé depuis Paris et l’Île-de-France, mais des demandes peuvent aussi être suivies à distance selon les besoins.',
  },
]

export const supportFaq = [
  {
    question: 'Comment se déroule l’accompagnement France Intermittence ?',
    answer:
      'L’accompagnement commence par un échange sur votre situation, votre métier, vos heures, vos contraintes et votre objectif. Nous clarifions ensuite les formations pertinentes, les droits mobilisables et les démarches à préparer.',
  },
  {
    question: 'Est-ce que je dois gérer seul le dossier administratif ?',
    answer:
      'Non. L’objectif de l’accompagnement est justement de vous aider à comprendre les pièces attendues, les délais et le chemin administratif le plus cohérent pour votre demande.',
  },
  {
    question: 'L’accompagnement concerne-t-il seulement les intermittents confirmés ?',
    answer:
      'Non. Il peut aussi concerner les personnes qui souhaitent devenir intermittentes ou structurer un projet de formation en lien avec les métiers du spectacle et de l’audiovisuel.',
  },
  {
    question: 'Peut-on être accompagné à distance ?',
    answer:
      'Oui. France Intermittence accompagne à Paris, en Île-de-France et à distance selon votre situation, votre disponibilité et le type de démarche à préparer.',
  },
]

export const formFaq = [
  {
    question: 'Pourquoi remplir le formulaire Ma formation adaptée ?',
    answer:
      'Le formulaire permet de comprendre votre situation, votre domaine d’activité, vos heures restantes et votre objectif. Ces informations servent à vous orienter vers une formation cohérente et un cadre de financement possible.',
  },
  {
    question: 'Est-ce que l’envoi du formulaire m’engage ?',
    answer:
      'Non. L’envoi permet uniquement à France Intermittence d’étudier votre demande et de vous recontacter. Vous gardez la main sur la suite du parcours.',
  },
  {
    question: 'Pourquoi demander les heures réalisées et restantes ?',
    answer:
      'Ces informations aident à situer votre parcours d’intermittent, à comprendre votre échéance et à vérifier si une formation peut s’intégrer utilement dans votre calendrier.',
  },
  {
    question: 'Combien de temps faut-il pour être recontacté ?',
    answer:
      'L’objectif est de revenir rapidement vers vous après étude des informations transmises, afin de clarifier les prochaines étapes et les formations pertinentes.',
  },
]

export const aboutFaq = [
  {
    question: 'France Intermittence est-il spécialisé dans les intermittents du spectacle ?',
    answer:
      'Oui. L’accompagnement est pensé pour les artistes, techniciens et professionnels de l’audiovisuel qui doivent composer avec les contraintes de l’intermittence, des droits formation et des calendriers de mission.',
  },
  {
    question: 'À quoi sert la certification Qualiopi ?',
    answer:
      'Qualiopi est un repère qualité pour les actions de formation. Elle donne un cadre plus lisible aux démarches et peut être importante dans l’étude des prises en charge.',
  },
  {
    question: 'France Intermittence intervient-il seulement en Île-de-France ?',
    answer:
      'L’ancrage est parisien et francilien, mais l’accompagnement peut aussi se faire à distance selon votre situation et votre projet.',
  },
  {
    question: 'Pourquoi passer par un accompagnement plutôt que chercher seul ?',
    answer:
      'Parce que le choix d’une formation, le financement et les justificatifs peuvent vite devenir complexes. L’accompagnement aide à éviter les erreurs de cadrage et à gagner du temps.',
  },
]

export const blogFaq = [
  {
    question: 'À quoi servent les ressources du blog ?',
    answer:
      'Les articles aident à comprendre les droits, les financements, l’AFDAS, France Travail et les démarches liées à la formation des intermittents du spectacle.',
  },
  {
    question: 'Les articles remplacent-ils un diagnostic personnalisé ?',
    answer:
      'Non. Ils donnent des repères généraux. Chaque situation dépend de votre métier, de vos heures, de votre calendrier et du type de formation envisagé.',
  },
  {
    question: 'Puis-je demander un accompagnement après avoir lu un article ?',
    answer:
      'Oui. Si un sujet correspond à votre situation, vous pouvez remplir Ma formation adaptée ou nous contacter pour clarifier les prochaines étapes.',
  },
]

export const routeSeo: Record<string, SeoMeta> = {
  '/': {
    title: 'France Intermittence | Formations et financement pour intermittents du spectacle',
    description:
      'Formations pour intermittents du spectacle, accompagnement humain, financement AFDAS et démarches simplifiées à Paris, en Île-de-France et partout en France.',
    image: logoVisual,
    type: 'website',
    keywords:
      'intermittents du spectacle, formation intermittents, financement AFDAS, Paris, Île-de-France, France Intermittence',
    serviceName: 'Formation et accompagnement des intermittents du spectacle',
  },
  '/financement': {
    title: 'Financement AFDAS | France Intermittence',
    description:
      'Découvrez comment financer votre formation avec l’AFDAS ou France Travail. France Intermittence vous accompagne dans les droits, le dossier et la prise en charge.',
    image: logoVisual,
    type: 'website',
    keywords:
      'financement AFDAS, intermittents du spectacle, prise en charge formation, France Travail, formation financée Paris',
    serviceName: 'Accompagnement au financement de formation',
    faq: financingFaq,
  },
  '/accompagnement': {
    title: 'Accompagnement personnalisé | France Intermittence',
    description:
      'France Intermittence accompagne les intermittents du spectacle à chaque étape: diagnostic, orientation, dossier et entrée en formation en Île-de-France et partout en France.',
    image: logoVisual,
    type: 'website',
    keywords:
      'accompagnement intermittents, formation spectacle vivant, accompagnement AFDAS, intermittents Paris Île-de-France',
    serviceName: 'Accompagnement personnalisé pour intermittents du spectacle',
    faq: supportFaq,
  },
  '/metiers': {
    title: 'Métiers du spectacle | Formations pour intermittents',
    description:
      'Pages métiers pour intermittents du spectacle : comédiens, musiciens, techniciens, audiovisuel, danseurs, réalisateurs, monteurs et cadreurs.',
    image: logoVisual,
    type: 'website',
    keywords:
      'métiers du spectacle, formations intermittents, comédiens, musiciens, techniciens spectacle, audiovisuel, danseurs',
    serviceName: 'Formations par métier pour intermittents du spectacle',
    itemList: metierProfiles.map((profile) => ({
      name: profile.shortTitle,
      url: new URL(`/metiers/${profile.slug}`, siteConfig.siteUrl).toString(),
    })),
  },
  ...Object.fromEntries(
    metierProfiles.map((profile) => [
      `/metiers/${profile.slug}`,
      {
        title: profile.seoTitle,
        description: profile.seoDescription,
        image: logoVisual,
        type: 'website' as const,
        keywords: profile.keywords,
        serviceName: profile.title,
        faq: getMetierFaq(profile),
      },
    ]),
  ),
  '/ma-formation-adaptee': {
    title: 'Ma Formation Adaptée | France Intermittence',
    description:
      'Présentez votre situation et trouvez la formation adaptée à votre parcours d’intermittent du spectacle avec l’accompagnement de France Intermittence.',
    image: logoVisual,
    type: 'website',
    keywords:
      'formation adaptée intermittents, 507 heures, intermittents du spectacle, accompagnement formation Paris',
    serviceName: 'Orientation vers une formation adaptée',
    faq: formFaq,
  },
  '/ma-formation-adaptee/confirmation': {
    title: 'Confirmation de votre demande | France Intermittence',
    description:
      'Votre demande de formation adaptée a bien été prise en compte par France Intermittence.',
    image: logoVisual,
    noindex: true,
    type: 'website',
  },
  '/blog': {
    title: 'Blog intermittence et formation | France Intermittence',
    description:
      'Actualités, conseils, droits, financement AFDAS et ressources pour les intermittents du spectacle en Île-de-France et partout en France.',
    image: logoVisual,
    type: 'website',
    keywords:
      'blog intermittents du spectacle, actualités AFDAS, droits intermittence, formation spectacle',
    faq: blogFaq,
  },
  '/a-propos': {
    title: 'À propos | France Intermittence',
    description:
      'Découvrez France Intermittence, son expertise, sa certification Qualiopi, son accompagnement métier et son engagement auprès des intermittents du spectacle.',
    image: logoVisual,
    type: 'website',
    keywords:
      'France Intermittence, Qualiopi, intermittents du spectacle, formation professionnelle spectacle',
    faq: aboutFaq,
  },
  '/admin': {
    title: 'Admin | France Intermittence',
    description: 'Espace d’administration France Intermittence.',
    image: aboutVisual,
    noindex: true,
  },
  '/mentions-legales': {
    title: 'Mentions légales | France Intermittence',
    description: 'Informations légales relatives au site France Intermittence.',
    image: logoVisual,
    noindex: true,
  },
  '/politique-confidentialite': {
    title: 'Politique de confidentialité | France Intermittence',
    description: 'Politique de confidentialité et traitement des données personnelles de France Intermittence.',
    image: logoVisual,
    noindex: true,
  },
  '/cookies': {
    title: 'Cookies | France Intermittence',
    description: 'Informations sur l’usage des cookies et technologies similaires.',
    image: logoVisual,
    noindex: true,
  },
  '/cgu': {
    title: 'CGU | France Intermittence',
    description: 'Conditions générales d’utilisation du site France Intermittence.',
    image: logoVisual,
    noindex: true,
  },
  '/plan-du-site': {
    title: 'Plan du site | France Intermittence',
    description: 'Retrouvez toutes les pages du site France Intermittence : financement, accompagnement, métiers, blog et informations légales.',
    image: logoVisual,
  },
}

const logoUrl = siteImages.logoOfficiel

export function buildStructuredData(pathname: string, meta: SeoMeta, breadcrumbs: Crumb[]) {
  const canonical = new URL(pathname, siteConfig.siteUrl).toString()

  // Organization + ProfessionalService : entité désambiguïsée pour Google et
  // les moteurs IA (logo, contact, zone desservie). `sameAs` sera ajouté dès
  // que des profils sociaux/GBP existent — aucune URL n'est inventée ici.
  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    logo: logoUrl,
    image: logoUrl,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    areaServed: siteConfig.areaServed,
    description: siteConfig.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneHref.replace('tel:', ''),
      email: siteConfig.email,
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: 'French',
    },
  }

  // WebSite : identité du site elle-même, distincte de l'organisation.
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    publisher: { '@type': 'Organization', name: siteConfig.brandName },
    inLanguage: 'fr-FR',
  }

  const itemListData = meta.itemList?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: meta.itemList.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.name,
          url: entry.url,
        })),
      }
    : null

  const articleData = meta.article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: meta.title,
        description: meta.description,
        image: /^https?:\/\//.test(meta.image) ? meta.image : new URL(meta.image, siteConfig.siteUrl).toString(),
        url: canonical,
        inLanguage: 'fr-FR',
        datePublished: meta.article.publishedAt,
        dateModified: meta.article.modifiedAt ?? meta.article.publishedAt,
        wordCount: meta.article.wordCount,
        articleSection: meta.article.category,
        keywords: meta.article.keywords?.join(', '),
        author: { '@type': 'Organization', name: meta.article.authorName },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.brandName,
          logo: { '@type': 'ImageObject', url: logoUrl },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      }
    : null

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

  return [organization, websiteData, breadcrumbData, serviceData, itemListData, articleData, faqData].filter(Boolean)
}
