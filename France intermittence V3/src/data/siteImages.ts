// Images statiques du site (photos, logos partenaires, icônes), hébergées
// dans le bucket public Supabase Storage `site-images`, avec des noms de
// fichiers SEO-friendly.
const BASE = 'https://mcykcupkczgsufxklmbr.supabase.co/storage/v1/object/public/site-images'

export const siteImages = {
  heroCoupleAvif: `${BASE}/hero-formation-intermittent-spectacle.avif`,
  heroCouplePng: `${BASE}/hero-formation-intermittent-spectacle.png`,
  aboutPortraitAvif: `${BASE}/conseillere-france-intermittence-portrait.avif`,
  aboutPortraitPng: `${BASE}/conseillere-france-intermittence-portrait.png`,
  accompagnementPhotoAvif: `${BASE}/accompagnement-conseillere-formation-intermittent.avif`,
  financementHeroWebp: `${BASE}/financement-formation-signature-dossier-conseiller.webp`,
  blogFeaturedAvif: `${BASE}/article-507-heures-intermittence-spectacle.avif`,
  blogFeaturedPng: `${BASE}/article-507-heures-intermittence-spectacle.png`,
  blogCumulAvif: `${BASE}/article-cumul-emploi-intermittent-spectacle.avif`,
  blogCumulPng: `${BASE}/article-cumul-emploi-intermittent-spectacle.png`,
  metierComediens: `${BASE}/formation-comedien-repetition-theatre.avif`,
  metierMusiciens: `${BASE}/formation-musicien-concert-scene.avif`,
  metierTechniciens: `${BASE}/formation-technicien-spectacle-regie.avif`,
  metierAudiovisuel: `${BASE}/formation-audiovisuel-plateau-tournage.avif`,
  metierDanseurs: `${BASE}/formation-danseur-scene-spectacle.avif`,
  metierRealisateurs: `${BASE}/formation-realisateur-cadreur-eclairage.avif`,
  homePhotoBandPlateau: `${BASE}/tournage-camera-cinema-plateau.avif`,
  homePhotoBandEquipe: `${BASE}/equipe-tournage-controle-image-plateau.avif`,
  homePhotoBandInterview: `${BASE}/interview-tournage-camera-perche-son.avif`,
  logoAfdas: `${BASE}/logo-afdas-partenaire-financement.png`,
  logoQualiopi: `${BASE}/logo-certification-qualiopi-formation.png`,
  logoFranceTravail: `${BASE}/logo-france-travail-partenaire.png`,
  logoOfficiel: `${BASE}/logo-france-intermittence.svg`,
  iconCalendrier: `${BASE}/icone-calendrier-formation.svg`,
  iconFormations: `${BASE}/icone-formations-parcours.svg`,
  iconTimer: `${BASE}/icone-delai-reponse-rapide.svg`,
  iconCasque: `${BASE}/icone-accompagnement-humain.svg`,
  iconContratCertification: `${BASE}/icone-contrat-certification.svg`,
  iconAppelAssistance: `${BASE}/icone-appel-assistance.svg`,
  iconGroupe: `${BASE}/icone-equipe-accompagnement.svg`,
  iconSecurite: `${BASE}/icone-securite-droits-formation.svg`,
  friseParisDecorative: `${BASE}/frise-paris-decorative.svg`,
} as const
