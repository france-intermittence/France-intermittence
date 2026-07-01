export const siteConfig = {
  brandName: 'France Intermittence',
  siteUrl: 'https://www.france-intermittence.fr',
  defaultTitle: 'France Intermittence | Formations et financement pour intermittents du spectacle',
  defaultDescription:
    'France Intermittence accompagne les intermittents du spectacle dans le choix de leur formation, le financement AFDAS et les démarches en Île-de-France et partout en France.',
  phoneDisplay: '01 70 38 38 10',
  phoneHref: 'tel:0170383810',
  email: 'contact@france-intermittence.fr',
  emailHref: 'mailto:contact@france-intermittence.fr',
  areaServed: ['Paris', 'Île-de-France', 'France'],
  serviceLabel: 'Accompagnement formation pour intermittents du spectacle',
  legal: {
    companyName: 'France Intermittence',
    editor: 'France Intermittence',
    publicationDirector: 'France Intermittence',
    hosting:
      'Site statique déployable sur un hébergement web compatible Vite (type Netlify, Vercel ou serveur classique).',
    contactEmail: 'contact@france-intermittence.fr',
    contactPhone: '01 70 38 38 10',
  },
} as const

export const footerColumns = [
  {
    title: 'Accompagnement',
    links: [
      { label: 'Financement AFDAS', to: '/financement' },
      { label: 'Vérification des droits', to: '/financement' },
      { label: 'Montage de dossier', to: '/financement' },
      { label: 'Accompagnement personnalisé', to: '/accompagnement' },
    ],
  },
  {
    title: 'France Intermittence',
    links: [
      { label: 'À propos', to: '/a-propos' },
      { label: 'Blog', to: '/blog' },
      { label: 'Nous contacter', to: '/accompagnement' },
      { label: 'Ma formation adaptée', to: '/ma-formation-adaptee' },
    ],
  },
] as const

export const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/politique-confidentialite' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'CGU', to: '/cgu' },
] as const

export const legalPages = {
  mentions: {
    title: 'Mentions légales',
    intro:
      'Ces mentions légales présentent les informations générales relatives à l’éditeur du site France Intermittence et à son hébergement.',
    sections: [
      {
        title: 'Éditeur du site',
        body: [
          'Le site est édité par France Intermittence.',
          `Pour toute demande, vous pouvez écrire à ${siteConfig.legal.contactEmail} ou appeler le ${siteConfig.legal.contactPhone}.`,
        ],
      },
      {
        title: 'Direction de publication',
        body: [`Directeur de la publication : ${siteConfig.legal.publicationDirector}.`],
      },
      {
        title: 'Hébergement',
        body: [siteConfig.legal.hosting],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'Les textes, visuels, logos et éléments graphiques présents sur le site sont protégés. Toute reproduction ou réutilisation sans autorisation préalable est interdite.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    intro:
      'Cette page explique quelles données peuvent être collectées lorsque vous utilisez le site France Intermittence et comment elles sont utilisées.',
    sections: [
      {
        title: 'Données concernées',
        body: [
          'Les données transmises volontairement via les formulaires ou par prise de contact peuvent inclure votre nom, prénom, téléphone, email et informations liées à votre projet de formation.',
        ],
      },
      {
        title: 'Finalités',
        body: [
          'Ces données servent uniquement à vous recontacter, qualifier votre besoin, vous orienter vers une formation adaptée et vous accompagner dans vos démarches.',
        ],
      },
      {
        title: 'Durée et accès',
        body: [
          'Les données sont conservées pendant la durée strictement nécessaire au traitement de votre demande. Vous pouvez demander l’accès, la rectification ou la suppression de vos données par email.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Politique de cookies',
    intro:
      'Le site peut utiliser des cookies ou technologies équivalentes nécessaires au bon fonctionnement et à la mesure d’audience selon la configuration de déploiement retenue.',
    sections: [
      {
        title: 'Cookies essentiels',
        body: [
          'Ils permettent au site de fonctionner correctement, notamment pour la navigation et certains réglages d’affichage.',
        ],
      },
      {
        title: 'Mesure d’audience',
        body: [
          'Si un outil de mesure d’audience est activé en production, ses cookies devront être configurés conformément aux obligations applicables.',
        ],
      },
      {
        title: 'Gestion',
        body: [
          'Vous pouvez limiter l’usage des cookies depuis votre navigateur. Certaines fonctionnalités du site pourraient alors être dégradées.',
        ],
      },
    ],
  },
  cgu: {
    title: 'Conditions générales d’utilisation',
    intro:
      'L’utilisation du site implique l’acceptation des présentes conditions générales d’utilisation.',
    sections: [
      {
        title: 'Usage du site',
        body: [
          'Le site a pour vocation de présenter les services, formations et modalités d’accompagnement de France Intermittence.',
        ],
      },
      {
        title: 'Responsabilité',
        body: [
          'France Intermittence s’efforce d’assurer l’exactitude des informations publiées, sans garantir l’absence d’erreurs ou d’omissions.',
        ],
      },
      {
        title: 'Prise de contact',
        body: [
          'Les informations laissées via les formulaires ne valent pas validation automatique d’un dossier ou de droits au financement.',
        ],
      },
    ],
  },
} as const
