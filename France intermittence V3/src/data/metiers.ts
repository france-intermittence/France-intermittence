export type MetierProfile = {
  slug: string
  icon: string
  title: string
  shortTitle: string
  intro: string
  description: string
  /** Phrase spécifique au métier (entités concrètes) affichée sous "Quand envisager une formation ?". */
  specificIntro: string
  situations: string[]
  formations: string[]
  program: string[]
  outcomes: string[]
  feedback: string[]
  fundingNote: string
  seoTitle: string
  seoDescription: string
  keywords: string
}

export const metierProfiles: MetierProfile[] = [
  {
    slug: 'comediens',
    icon: 'artistique',
    title: 'Formations pour comédiens intermittents',
    shortTitle: 'Comédiens',
    intro: 'Construire un parcours de formation utile pour le jeu, la voix, le casting et la présence scénique.',
    description:
      'Les comédiens intermittents peuvent mobiliser la formation pour consolider leur technique, préparer des auditions, élargir leur registre ou structurer une évolution de carrière. France Intermittence vous aide à relier votre besoin artistique à vos droits, aux délais de financement et aux justificatifs attendus.',
    specificIntro:
      'Pour un comédien, une formation casting, self-tape ou technique vocale renforce directement la préparation aux auditions et l’employabilité auprès des directeurs de casting.',
    situations: ['Préparer une audition ou un casting', 'Renforcer le jeu caméra', 'Travailler la voix et la diction'],
    formations: ['Jeu caméra et théâtre', 'Voix, diction et interprétation', 'Casting, audition et self tape', 'Improvisation et présence scénique'],
    program: ['Diagnostic de niveau et objectifs artistiques', 'Sélection d’un organisme adapté', 'Vérification du calendrier avec vos contrats'],
    outcomes: ['Un projet de formation plus clair', 'Un dossier mieux cadré', 'Une montée en compétence ciblée', 'Un calendrier compatible avec vos contrats'],
    feedback: ['Plus d’aisance en audition', 'Un book et une présentation mieux préparés', 'Une formation reliée aux objectifs de carrière'],
    fundingNote:
      'Selon votre situation, une prise en charge AFDAS, France Travail ou un autre dispositif peut être étudié avant l’entrée en formation.',
    seoTitle: 'Formation comédien intermittent | France Intermittence',
    seoDescription:
      'Formations pour comédiens intermittents : jeu caméra, théâtre, voix, casting, financement AFDAS et accompagnement administratif.',
    keywords: 'formation comédien intermittent, jeu caméra, casting, formation théâtre, AFDAS comédien',
  },
  {
    slug: 'musiciens',
    icon: 'artistique',
    title: 'Formations pour musiciens intermittents',
    shortTitle: 'Musiciens',
    intro: 'Développer vos compétences musicales, techniques et professionnelles avec un parcours cohérent.',
    description:
      'Pour les musiciens intermittents, la formation peut servir à perfectionner une pratique, maîtriser des outils de production ou développer une stratégie artistique. L’accompagnement consiste à identifier la formation pertinente, vérifier les financements possibles et préparer les pièces du dossier.',
    specificIntro:
      'Pour un musicien, une formation MAO, home studio ou composition assistée par ordinateur ouvre de nouvelles missions de production et sécurise une pratique en évolution constante.',
    situations: ['Produire ses maquettes en autonomie', 'Structurer un projet musical', 'Renforcer une technique vocale ou instrumentale'],
    formations: ['MAO et production musicale', 'Composition et arrangement', 'Technique vocale ou instrumentale', 'Développement de projet artistique'],
    program: ['Clarification du projet musical', 'Choix entre technique, production ou stratégie', 'Montage du dossier selon vos droits'],
    outcomes: ['Des compétences directement mobilisables', 'Un choix de formation adapté à votre style', 'Une meilleure autonomie sur les outils', 'Une stratégie de parcours plus lisible'],
    feedback: ['Des outils mieux maîtrisés en répétition et studio', 'Une progression concrète sur le son ou la composition', 'Un projet artistique mieux cadré'],
    fundingNote:
      'Le financement dépend de vos droits, de votre activité récente, du type de formation et des critères du financeur sollicité.',
    seoTitle: 'Formation musicien intermittent | France Intermittence',
    seoDescription:
      'Formations pour musiciens intermittents : MAO, composition, voix, production musicale, financement et accompagnement dossier.',
    keywords: 'formation musicien intermittent, formation MAO AFDAS, production musicale, formation voix intermittent',
  },
  {
    slug: 'techniciens-spectacle',
    icon: 'technique',
    title: 'Formations pour techniciens du spectacle',
    shortTitle: 'Techniciens spectacle',
    intro: 'Sécuriser vos compétences techniques en son, lumière, plateau, régie ou sécurité.',
    description:
      'Les techniciens du spectacle évoluent dans des environnements exigeants où les normes, les outils et les pratiques changent vite. Une formation ciblée permet de renforcer votre employabilité, d’accéder à de nouvelles missions ou de sécuriser une spécialité technique.',
    specificIntro:
      'Pour un technicien, une formation habilitation électrique, travail en hauteur, CACES nacelle ou SSIAP ouvre directement de nouvelles missions et sécurise l’employabilité sur le terrain.',
    situations: ['Se spécialiser en son, lumière ou vidéo', 'Actualiser ses compétences sécurité', 'Accéder à plus de missions techniques'],
    formations: ['Son, lumière et vidéo', 'Régie technique et plateau', 'Machinerie et sécurité', 'Logiciels et outils professionnels'],
    program: ['Analyse des missions visées', 'Vérification des prérequis techniques', 'Préparation des justificatifs demandés'],
    outcomes: ['Une qualification technique renforcée', 'Des missions plus diversifiées', 'Une meilleure conformité aux exigences terrain', 'Un dossier de financement structuré'],
    feedback: ['Une meilleure lecture des contraintes plateau', 'Des compétences plus visibles auprès des employeurs', 'Une montée en technicité exploitable rapidement'],
    fundingNote:
      'France Intermittence vous aide à vérifier les conditions de prise en charge et à préparer un dossier compatible avec votre calendrier professionnel.',
    seoTitle: 'Formation technicien spectacle intermittent | France Intermittence',
    seoDescription:
      'Formations pour techniciens du spectacle : son, lumière, vidéo, régie, sécurité, financement AFDAS et accompagnement.',
    keywords: 'formation technicien spectacle intermittent, formation son lumière, régie technique, AFDAS technicien',
  },
  {
    slug: 'audiovisuel',
    icon: 'digital',
    title: 'Formations audiovisuel pour intermittents',
    shortTitle: 'Audiovisuel',
    intro: 'Renforcer vos compétences image, son, montage, postproduction et écriture audiovisuelle.',
    description:
      'Les métiers de l’audiovisuel demandent une veille constante sur les outils, les formats et les workflows. La formation peut vous aider à consolider une expertise, changer de poste, progresser sur un logiciel ou structurer un projet professionnel.',
    specificIntro:
      'Pour un professionnel de l’audiovisuel, une formation montage, étalonnage ou prise de vue renforce la polyvalence sur les tournages et en postproduction.',
    situations: ['Changer de logiciel ou de workflow', 'Monter en compétence sur l’image', 'Préparer une évolution vers la postproduction'],
    formations: ['Montage et postproduction', 'Cadrage et prise de vue', 'Prise de son audiovisuelle', 'Écriture et production de contenus'],
    program: ['Identification du niveau technique', 'Choix d’une formation orientée production réelle', 'Organisation du calendrier et du financement'],
    outcomes: ['Une meilleure maîtrise des outils', 'Un positionnement métier plus clair', 'Des compétences adaptées aux productions actuelles', 'Un parcours finançable mieux préparé'],
    feedback: ['Une pratique plus fluide sur les logiciels', 'Un workflow plus professionnel', 'Une meilleure cohérence entre formation et missions visées'],
    fundingNote:
      'Les financements possibles varient selon votre statut, le financeur, la formation retenue et les justificatifs disponibles.',
    seoTitle: 'Formation audiovisuel intermittent | France Intermittence',
    seoDescription:
      'Formations audiovisuel pour intermittents : montage, cadrage, postproduction, prise de son, financement et accompagnement.',
    keywords: 'formation audiovisuel intermittent, formation montage, cadrage, postproduction, AFDAS audiovisuel',
  },
  {
    slug: 'danseurs',
    icon: 'wellness',
    title: 'Formations pour danseurs intermittents',
    shortTitle: 'Danseurs',
    intro: 'Préserver le corps, développer la technique et préparer les transitions de carrière.',
    description:
      'Pour les danseurs intermittents, la formation peut soutenir le perfectionnement artistique, la prévention, la transmission ou la préparation d’une évolution professionnelle. L’enjeu est de choisir un parcours utile, réaliste et compatible avec votre activité.',
    specificIntro:
      'Pour un danseur, une formation en prévention corporelle, pédagogie ou reconversion professionnelle sécurise la pratique sur la durée et anticipe l’après-carrière.',
    situations: ['Prévenir les blessures et préserver le corps', 'Développer la transmission', 'Anticiper une transition professionnelle'],
    formations: ['Perfectionnement technique', 'Prévention corporelle', 'Pédagogie et transmission', 'Préparation de reconversion ou transition'],
    program: ['Analyse du parcours artistique', 'Cadrage des objectifs corporels ou pédagogiques', 'Recherche du dispositif de financement pertinent'],
    outcomes: ['Une pratique mieux sécurisée', 'Une évolution professionnelle anticipée', 'Un projet pédagogique structuré', 'Un accompagnement administratif plus simple'],
    feedback: ['Un meilleur équilibre entre pratique et prévention', 'Une transition mieux préparée', 'Un projet de transmission plus lisible'],
    fundingNote:
      'Un diagnostic permet de vérifier si votre projet peut être relié à vos droits formation et aux dispositifs disponibles.',
    seoTitle: 'Formation danseur intermittent | France Intermittence',
    seoDescription:
      'Formations pour danseurs intermittents : technique, prévention corporelle, pédagogie, transition professionnelle et financement.',
    keywords: 'formation danseur intermittent, prévention corporelle danse, pédagogie danse, financement formation danseur',
  },
  {
    slug: 'realisateurs-monteurs-cadreurs',
    icon: 'career',
    title: 'Formations pour réalisateurs, monteurs et cadreurs',
    shortTitle: 'Réalisateurs, monteurs, cadreurs',
    intro: 'Développer vos compétences image, narration, montage et workflow de production.',
    description:
      'Les réalisateurs, monteurs et cadreurs peuvent utiliser la formation pour renforcer leur maîtrise technique, améliorer leur narration, évoluer sur de nouveaux outils ou élargir leurs opportunités professionnelles. France Intermittence aide à cadrer le projet et le financement.',
    specificIntro:
      'Pour un réalisateur, monteur ou cadreur, une formation en écriture, montage narratif ou cadrage renforce la direction artistique et la maîtrise technique des tournages.',
    situations: ['Améliorer la narration image', 'Structurer un workflow montage', 'Renforcer le cadrage ou la lumière'],
    formations: ['Réalisation et narration visuelle', 'Montage image et workflow', 'Cadrage, lumière et formats', 'Production et diffusion de contenus'],
    program: ['Définition du projet audiovisuel', 'Choix d’une formation orientée pratique', 'Vérification des droits et des délais'],
    outcomes: ['Une pratique technique consolidée', 'Une narration plus maîtrisée', 'Une meilleure autonomie de production', 'Un dossier de prise en charge plus lisible'],
    feedback: ['Une meilleure cohérence entre image et récit', 'Un montage plus efficace', 'Une production mieux organisée'],
    fundingNote:
      'La prise en charge dépend de votre situation professionnelle, de la formation choisie et du financeur mobilisable.',
    seoTitle: 'Formation réalisateur monteur cadreur intermittent | France Intermittence',
    seoDescription:
      'Formations pour réalisateurs, monteurs et cadreurs intermittents : image, montage, cadrage, workflow, financement et accompagnement.',
    keywords: 'formation réalisateur intermittent, formation monteur intermittent, formation cadreur, montage image AFDAS',
  },
]

export function getMetierProfile(slug: string | undefined) {
  return metierProfiles.find((profile) => profile.slug === slug)
}

/**
 * FAQ affichée sur chaque page métier (Metiers.tsx) — exportée pour rester la
 * source unique utilisée aussi par le JSON-LD FAQPage (src/data/seo.ts).
 */
export function getMetierFaq(profile: MetierProfile) {
  return [
    {
      question: 'Cette formation peut-elle être financée ?',
      answer: profile.fundingNote,
    },
    {
      question: 'Comment choisir la bonne formation ?',
      answer:
        'Le choix dépend de votre métier, de votre niveau actuel, de vos objectifs professionnels et de votre calendrier. Un diagnostic permet d’éviter une formation trop générale ou mal alignée avec votre parcours.',
    },
    {
      question: 'Quels retours attendre après la formation ?',
      answer:
        'Les retours attendus sont généralement une compétence plus solide, un positionnement métier plus clair et une capacité à mobiliser la formation dans vos prochains contrats.',
    },
  ]
}
