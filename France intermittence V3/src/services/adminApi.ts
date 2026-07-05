export type AdminLead = {
  id: string
  reference: string
  nom: string
  prenom: string
  heures_besoins: number
  heures_realisees: number
  date_anniversaire: string
  domaine: string
  telephone: string
  email: string
  profil: string | null
  statut: string
  created_at: string
}

export type AdminArticle = {
  id?: string
  slug: string
  title: string
  seo_title: string
  meta_description: string
  primary_keyword: string
  secondary_keywords: string[]
  search_intent: string
  alternate_seo_titles: string[]
  excerpt: string
  content_markdown: string
  category: string
  author_name: string
  featured_image_url: string | null
  featured_image_description: string | null
  featured_image_alt: string | null
  secondary_images: unknown[]
  faq: Array<{ question: string; answer: string }>
  internal_links: Array<{ label: string; url: string }>
  source_urls: string[]
  word_count?: number | null
  reading_time_minutes?: number | null
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  published_at?: string | null
  updated_at?: string
}

export type AdminEvent = {
  id: string
  event_type: 'page_view' | 'click'
  event_name: string
  page: string
  metadata: Record<string, unknown>
  created_at: string
}

export type AdminStats = {
  leads_total: number
  leads_7_days: number
  articles_total: number
  articles_published: number
  articles_draft: number
  page_views_total: number
  page_views_7_days: number
  call_clicks_total: number
  call_clicks_7_days: number
  callback_clicks_total: number
  callback_clicks_7_days: number
}

type AdminResponse = {
  stats?: AdminStats
  leads?: AdminLead[]
  articles?: AdminArticle[]
  article?: AdminArticle
  events?: AdminEvent[]
  publicUrl?: string
  path?: string
  ok?: boolean
  error?: string
}

const ADMIN_SESSION_KEY = 'fi-admin-code'

export function getStoredAdminCode() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) || ''
}

export function storeAdminCode(code: string) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, code)
}

export function clearAdminCode() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export async function adminRequest(action: string, payload: Record<string, unknown> = {}, code = getStoredAdminCode()) {
  const response = await fetch('/.netlify/functions/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-code': code,
    },
    body: JSON.stringify({ action, ...payload }),
  })

  const data = (await response.json()) as AdminResponse

  if (!response.ok) {
    throw new Error(data.error || 'Erreur admin.')
  }

  return data
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parseFaq(value: string) {
  return splitLines(value).map((line) => {
    const [question = '', ...answerParts] = line.split('|')
    return {
      question: question.trim(),
      answer: answerParts.join('|').trim(),
    }
  }).filter((item) => item.question && item.answer)
}

export function parseInternalLinks(value: string) {
  return splitLines(value).map((line) => {
    const [label = '', url = ''] = line.split('|')
    return {
      label: label.trim(),
      url: url.trim(),
    }
  }).filter((item) => item.label && item.url)
}

export async function fileToWebpUpload(file: File, slug: string) {
  const image = await createImageBitmap(file)
  const maxWidth = 1400
  const scale = Math.min(1, maxWidth / image.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)
  const context = canvas.getContext('2d')

  if (!context) throw new Error('Conversion image impossible.')

  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (!result) reject(new Error('Conversion WebP impossible.'))
      else resolve(result)
    }, 'image/webp', 0.86)
  })

  const buffer = await blob.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  const filename = `${slugify(slug || file.name.replace(/\.[^.]+$/, '')) || 'article'}-cover.webp`
  return {
    filename,
    base64: btoa(binary),
  }
}
