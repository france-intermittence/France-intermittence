// Migration ponctuelle : renomme les images du site en noms SEO-friendly et
// les envoie dans le bucket public Supabase `site-images`. Écrit une table de
// correspondance (ancien chemin local -> URL publique Supabase) utilisée pour
// mettre à jour les imports dans le code source.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const envContent = await readFile(resolve('.env.local'), 'utf8')
function envVar(name) {
  return envContent
    .split(/\r?\n/)
    .find((line) => line.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=')
    .replace(/^"|"$/g, '')
}

const supabaseUrl = envVar('VITE_SUPABASE_URL')
const serviceRoleKey = envVar('SUPABASE_SERVICE_ROLE_KEY')
if (!supabaseUrl || !serviceRoleKey) throw new Error('Variables Supabase manquantes dans .env.local.')

const BUCKET = 'site-images'

const mimeByExt = {
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

// [chemin local relatif à la racine du projet, nouveau nom de fichier SEO]
const files = [
  ['3- Recherches & Photos choisis/photo_hero_financement_couple.avif', 'hero-formation-intermittent-spectacle.avif'],
  ['3- Recherches & Photos choisis/photo_hero_financement_couple.png', 'hero-formation-intermittent-spectacle.png'],
  ['3- Recherches & Photos choisis/a propos.avif', 'conseillere-france-intermittence-portrait.avif'],
  ['3- Recherches & Photos choisis/a propos.png', 'conseillere-france-intermittence-portrait.png'],
  ['3- Recherches & Photos choisis/page dans accompagnement.avif', 'accompagnement-conseillere-formation-intermittent.avif'],
  ['3- Recherches & Photos choisis/Page blog 1.avif', 'article-507-heures-intermittence-spectacle.avif'],
  ['3- Recherches & Photos choisis/Page blog 1.png', 'article-507-heures-intermittence-spectacle.png'],
  ['3- Recherches & Photos choisis/Page blog 2.avif', 'article-cumul-emploi-intermittent-spectacle.avif'],
  ['3- Recherches & Photos choisis/Page blog 2.png', 'article-cumul-emploi-intermittent-spectacle.png'],
  ['3- Recherches & Photos choisis/ImageRepet.avif', 'formation-comedien-repetition-theatre.avif'],
  ['3- Recherches & Photos choisis/ImageConcert.avif', 'formation-musicien-concert-scene.avif'],
  ['3- Recherches & Photos choisis/ImageRegie.avif', 'formation-technicien-spectacle-regie.avif'],
  ['3- Recherches & Photos choisis/ImageBackScene.avif', 'formation-audiovisuel-plateau-tournage.avif'],
  ['3- Recherches & Photos choisis/ImageScene.avif', 'formation-danseur-scene-spectacle.avif'],
  ['3- Recherches & Photos choisis/ImageLight.avif', 'formation-realisateur-cadreur-eclairage.avif'],
  ['3- Recherches & Photos choisis/tournage-camera-cinema-plateau.avif', 'tournage-camera-cinema-plateau.avif'],
  ['3- Recherches & Photos choisis/equipe-tournage-controle-image-plateau.avif', 'equipe-tournage-controle-image-plateau.avif'],
  ['3- Recherches & Photos choisis/interview-tournage-camera-perche-son.avif', 'interview-tournage-camera-perche-son.avif'],
  ['certifications et partenaire/AFDAS.png', 'logo-afdas-partenaire-financement.png'],
  ['certifications et partenaire/Certifications qualiopi.png', 'logo-certification-qualiopi-formation.png'],
  ['certifications et partenaire/france-travail-logo-2048x726.png', 'logo-france-travail-partenaire.png'],
  ['logo officiel/Logo officiel.svg', 'logo-france-intermittence.svg'],
  ['icone/Calendrier-32.svg', 'icone-calendrier-formation.svg'],
  ['icone/Formations-32.svg', 'icone-formations-parcours.svg'],
  ['icone/Timer-32.svg', 'icone-delai-reponse-rapide.svg'],
  ['icone/casque-32.svg', 'icone-accompagnement-humain.svg'],
  ['icone/contrat , certifications-32.svg', 'icone-contrat-certification.svg'],
  ['icone/design appel assistance (2).svg', 'icone-appel-assistance.svg'],
  ['icone/groupe-32.svg', 'icone-equipe-accompagnement.svg'],
  ['icone/securité-32.svg', 'icone-securite-droits-formation.svg'],
  ['icone/frise paris.svg', 'frise-paris-decorative.svg'],
]

const mapping = {}

for (const [localPath, newName] of files) {
  const ext = newName.slice(newName.lastIndexOf('.'))
  const contentType = mimeByExt[ext]
  const bytes = await readFile(resolve(localPath))

  const response = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${encodeURIComponent(newName)}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      'content-type': contentType,
      'x-upsert': 'true',
    },
    body: bytes,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Échec upload ${localPath} -> ${newName} : ${response.status} ${errorText}`)
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${newName}`
  mapping[localPath] = publicUrl
  console.log(`✓ ${localPath} -> ${publicUrl}`)
}

await writeFile(resolve('scripts/.image-url-map.json'), JSON.stringify(mapping, null, 2))
console.log(`\n${Object.keys(mapping).length} images envoyées vers le bucket "${BUCKET}".`)
