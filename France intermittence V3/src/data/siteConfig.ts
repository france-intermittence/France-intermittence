export const siteConfig = {
  brandName: 'France Intermittence',
  siteUrl: 'https://france-intermittence.fr',
  defaultTitle: 'France Intermittence | Formations et financement pour intermittents du spectacle',
  defaultDescription:
    'France Intermittence accompagne les intermittents du spectacle dans le choix de leur formation, le financement AFDAS et les démarches en Île-de-France et partout en France.',
  phoneDisplay: '+33 6 76 55 00 59',
  phoneHref: 'tel:+33676550059',
  email: 'contact@france-intermittence.fr',
  emailHref: 'mailto:contact@france-intermittence.fr',
  areaServed: ['Paris', 'Île-de-France', 'France'],
  serviceLabel: 'Accompagnement formation pour intermittents du spectacle',
  legal: {
    companyName: 'France Intermittence',
    legalForm: '[À compléter : forme juridique, ex. SASU, auto-entreprise…]',
    siret: '[À compléter : numéro SIRET]',
    rcs: '[À compléter : ville d’immatriculation RCS, si applicable]',
    registeredAddress: '[À compléter : adresse du siège social]',
    editor: 'France Intermittence',
    publicationDirector: 'France Intermittence',
    hosting:
      'Site statique déployable sur un hébergement web compatible Vite (type Netlify, Vercel ou serveur classique).',
    hostingProvider: 'Netlify, Inc. — 44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis.',
    contactEmail: 'contact@france-intermittence.fr',
    contactPhone: '+33 6 76 55 00 59',
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
  { label: 'Plan du site', to: '/plan-du-site' },
] as const

export const legalPages = {
  mentions: {
    title: 'Mentions légales',
    intro:
      'Conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, les présentes mentions légales précisent l’identité de l’éditeur du site France Intermittence, son hébergeur et les conditions d’utilisation du site.',
    sections: [
      {
        title: 'Éditeur du site',
        body: [
          `Le site france-intermittence.fr est édité par ${siteConfig.legal.companyName}, ${siteConfig.legal.legalForm}, immatriculée sous le numéro SIRET ${siteConfig.legal.siret}${siteConfig.legal.rcs.startsWith('[') ? '' : `, RCS ${siteConfig.legal.rcs}`}, dont le siège social est situé ${siteConfig.legal.registeredAddress}.`,
          `Directeur de la publication : ${siteConfig.legal.publicationDirector}.`,
          `Contact : ${siteConfig.legal.contactEmail} — ${siteConfig.legal.contactPhone}.`,
        ],
      },
      {
        title: 'Hébergement',
        body: [
          `Le site est hébergé par ${siteConfig.legal.hostingProvider}`,
          siteConfig.legal.hosting,
        ],
      },
      {
        title: 'Conception et réalisation',
        body: ['Site conçu et développé par WebFitYou (webfityou.com).'],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'L’ensemble des éléments présents sur ce site (textes, visuels, logos, illustrations, mise en page, structure) est protégé au titre du droit d’auteur et, le cas échéant, du droit des marques. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de France Intermittence est interdite et susceptible de constituer une contrefaçon.',
        ],
      },
      {
        title: 'Données personnelles et cookies',
        body: [
          'Le traitement des données personnelles collectées via ce site est détaillé dans la politique de confidentialité. L’utilisation de cookies et traceurs est détaillée dans la politique de cookies.',
        ],
      },
      {
        title: 'Limitation de responsabilité',
        body: [
          'France Intermittence met tout en œuvre pour proposer des informations et contenus aussi précis que possible, mais ne saurait être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour, qu’elles soient de son fait ou du fait de tiers.',
          'Le site peut contenir des liens vers des sites tiers. France Intermittence n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.',
        ],
      },
      {
        title: 'Droit applicable et litiges',
        body: [
          'Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français compétents seront seuls saisis.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    intro:
      'Cette page explique quelles données personnelles sont collectées sur le site France Intermittence, pourquoi, combien de temps, et quels sont vos droits, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.',
    sections: [
      {
        title: 'Responsable du traitement',
        body: [
          `Le responsable du traitement des données est ${siteConfig.legal.companyName}, joignable à ${siteConfig.legal.contactEmail}.`,
        ],
      },
      {
        title: 'Quelles données sont collectées',
        body: [
          'Données transmises via le formulaire « Ma formation adaptée » : nom, prénom, téléphone, email, date anniversaire, domaine d’activité, heures de travail réalisées et besoins, profil (intermittent ou en devenir).',
          'Données de mesure d’audience anonyme (avec votre consentement) : pages consultées et clics sur certains boutons (appeler, être rappelé), sans aucune information permettant de vous identifier individuellement. Voir la politique de cookies pour le détail.',
          'Aucune donnée bancaire ou de paiement n’est collectée sur ce site.',
        ],
      },
      {
        title: 'Finalités du traitement',
        body: [
          'Les données du formulaire servent exclusivement à : vous recontacter, qualifier votre besoin de formation, vérifier vos droits et vous accompagner dans le montage de votre dossier de financement.',
          'Les données de mesure d’audience servent à comprendre l’usage du site et à améliorer nos contenus et parcours.',
          'Vos données ne sont ni revendues, ni utilisées à des fins de prospection commerciale par des tiers, ni transmises hors de ce cadre.',
        ],
      },
      {
        title: 'Base légale',
        body: [
          'Le traitement des données du formulaire repose sur votre consentement, exprimé au moment de l’envoi du formulaire, ainsi que sur l’intérêt légitime de France Intermittence à répondre à votre demande.',
          'Le traitement des données de mesure d’audience repose exclusivement sur votre consentement, recueilli via le bandeau cookies.',
        ],
      },
      {
        title: 'Destinataires des données',
        body: [
          'Les données sont hébergées par Supabase (base de données) et transmises, pour les seules notifications par email, via le prestataire EmailJS. Ces prestataires agissent en tant que sous-traitants techniques et n’utilisent pas vos données à d’autres fins.',
        ],
      },
      {
        title: 'Durée de conservation',
        body: [
          'Les données d’un lead (formulaire) sont conservées pendant la durée nécessaire au traitement de votre demande puis archivées ou supprimées au-delà d’une durée raisonnable sans contact utile.',
          'Le choix relatif aux cookies de mesure d’audience est conservé 6 mois dans votre navigateur, après quoi il vous est à nouveau demandé.',
        ],
      },
      {
        title: 'Vos droits',
        body: [
          'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité sur les données vous concernant.',
          `Pour exercer ces droits, contactez-nous à ${siteConfig.legal.contactEmail}. Une réponse vous sera apportée dans un délai raisonnable.`,
          'Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas respectés.',
        ],
      },
      {
        title: 'Sécurité',
        body: [
          'Des mesures techniques (accès restreint, chiffrement des échanges) sont mises en œuvre pour protéger vos données contre tout accès non autorisé, perte ou divulgation.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Politique de cookies',
    intro:
      'Cette page explique ce qu’est un cookie, quels traceurs sont utilisés sur le site France Intermittence, à quoi ils servent et comment vous pouvez, à tout moment, accepter, refuser ou modifier votre choix.',
    sections: [
      {
        title: 'Qu’est-ce qu’un cookie ?',
        body: [
          'Un cookie (ou traceur) est un petit fichier déposé sur votre appareil lors de la visite d’un site. Il peut servir à faire fonctionner le site, à mémoriser vos préférences ou à mesurer la fréquentation, selon sa finalité.',
          'Certaines informations peuvent aussi être stockées directement dans votre navigateur (stockage local), sans passer par un cookie au sens strict. Ces technologies sont soumises aux mêmes règles et sont traitées de la même façon dans cette politique.',
        ],
      },
      {
        title: 'Les cookies et traceurs utilisés sur ce site',
        body: [
          'Cookies strictement nécessaires : indispensables au fonctionnement du site (navigation, affichage, connexion à l’espace d’administration réservé à l’équipe France Intermittence). Ils ne nécessitent pas votre consentement et ne peuvent pas être désactivés sans dégrader le site.',
          'Mesure d’audience : avec votre accord, nous mesurons de façon anonyme les pages consultées et les clics sur certains boutons (appeler, être rappelé) afin de comprendre l’usage du site et d’améliorer nos contenus. Ces données ne permettent pas de vous identifier individuellement, ne sont ni recoupées avec d’autres informations vous concernant, ni transmises à des tiers.',
          'Aucun cookie publicitaire ou de réseau social : le site ne dépose aucun cookie de ciblage publicitaire, de retargeting ou de partage vers les réseaux sociaux (Google Analytics, Facebook, LinkedIn ou équivalents ne sont pas utilisés).',
        ],
      },
      {
        title: 'Votre consentement',
        body: [
          'Au premier accès au site, un bandeau vous permet d’accepter ou de refuser les cookies de mesure d’audience, les deux choix étant proposés de manière équivalente. Aucune mesure d’audience n’est réalisée avant votre choix.',
          'Votre choix est mémorisé pendant 6 mois, puis le bandeau vous sera présenté à nouveau. Refuser n’a aucun impact sur l’accès aux pages, formulaires ou contenus du site.',
        ],
      },
      {
        title: 'Modifier votre choix à tout moment',
        body: [
          'Vous pouvez revenir sur votre décision quand vous le souhaitez via le lien « Gérer les cookies » présent en bas de chaque page du site, qui réaffiche le bandeau de consentement.',
          'Vous pouvez également supprimer les cookies et données de navigation directement depuis les réglages de votre navigateur.',
        ],
      },
      {
        title: 'Vos droits',
        body: [
          'Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression sur les données vous concernant. Pour plus de détails, consultez notre politique de confidentialité, ou contactez-nous directement.',
          'Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr) si vous estimez que vos droits ne sont pas respectés.',
        ],
      },
    ],
  },
  cgu: {
    title: 'Conditions générales d’utilisation',
    intro:
      'L’accès et l’utilisation du site france-intermittence.fr impliquent l’acceptation sans réserve des présentes conditions générales d’utilisation (CGU).',
    sections: [
      {
        title: 'Objet',
        body: [
          'Les présentes CGU ont pour objet de définir les modalités d’accès et d’utilisation du site par tout visiteur, ainsi que les droits et obligations des parties dans ce cadre.',
        ],
      },
      {
        title: 'Accès au site',
        body: [
          'Le site est accessible gratuitement à tout utilisateur disposant d’un accès à internet. Tous les frais nécessaires à cet accès (matériel, connexion) restent à la charge de l’utilisateur.',
          'France Intermittence s’efforce d’assurer un accès au site 24h/24, sans garantir une disponibilité continue et sans interruption, notamment en cas de maintenance ou de force majeure.',
        ],
      },
      {
        title: 'Services proposés',
        body: [
          'Le site présente les services d’accompagnement, de formation et de financement de France Intermittence pour les intermittents du spectacle, ainsi qu’un formulaire de mise en relation permettant à l’utilisateur de solliciter un accompagnement personnalisé.',
          'Les informations laissées via les formulaires ne valent pas validation automatique d’un dossier, d’un droit au financement ou d’une prise en charge : chaque situation fait l’objet d’une étude individuelle.',
        ],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'Le contenu du site (textes, visuels, logos, structure) est protégé par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite, conformément aux mentions légales.',
        ],
      },
      {
        title: 'Responsabilité',
        body: [
          'France Intermittence s’efforce d’assurer l’exactitude et la mise à jour des informations publiées sur le site, sans garantir l’absence d’erreurs, d’inexactitudes ou d’omissions.',
          'L’utilisateur reconnaît utiliser les informations du site sous sa responsabilité exclusive. Les contenus ont une valeur informative et ne constituent pas un conseil juridique ou administratif personnalisé, lequel est apporté dans le cadre de l’accompagnement individuel.',
        ],
      },
      {
        title: 'Liens hypertextes',
        body: [
          'Le site peut contenir des liens vers des sites tiers (organismes de formation, partenaires institutionnels). France Intermittence n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.',
        ],
      },
      {
        title: 'Modification des CGU',
        body: [
          'France Intermittence se réserve le droit de modifier les présentes CGU à tout moment, afin de les adapter aux évolutions du site ou de la réglementation. Il est recommandé à l’utilisateur de les consulter régulièrement.',
        ],
      },
      {
        title: 'Droit applicable et juridiction',
        body: [
          'Les présentes CGU sont régies par le droit français. En cas de litige et à défaut d’accord amiable, les tribunaux français compétents seront seuls saisis.',
        ],
      },
    ],
  },
} as const
