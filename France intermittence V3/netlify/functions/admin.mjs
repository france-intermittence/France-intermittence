const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  }
}

function getEnv(name) {
  return process.env[name] ?? ''
}

function getSupabaseConfig() {
  const url = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL')
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')

  if (!url || !serviceKey) {
    throw new Error('Configuration admin Supabase manquante.')
  }

  return { url: url.replace(/\/$/, ''), serviceKey }
}

function assertAdmin(event, body) {
  const expected = getEnv('ADMIN_CODE') || 'jordan'
  const received = event.headers['x-admin-code'] || event.headers['X-Admin-Code'] || body?.code

  if (received !== expected) {
    return false
  }

  return true
}

async function supabaseFetch(path, options = {}) {
  const { url, serviceKey } = getSupabaseConfig()
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      Prefer: 'return=representation',
      ...options.headers,
    },
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Erreur Supabase.')
  }

  return data
}

function calculateReadTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return {
    word_count: words,
    reading_time_minutes: Math.max(1, Math.ceil(words / 220)),
  }
}

function normalizeArticle(payload) {
  const read = calculateReadTime(payload.content_markdown || '')
  const status = payload.status || 'draft'

  return {
    slug: payload.slug,
    title: payload.title,
    seo_title: payload.seo_title,
    meta_description: payload.meta_description,
    primary_keyword: payload.primary_keyword,
    secondary_keywords: payload.secondary_keywords || [],
    search_intent: payload.search_intent || 'Informationnelle',
    alternate_seo_titles: payload.alternate_seo_titles || [],
    excerpt: payload.excerpt,
    content_markdown: payload.content_markdown,
    category: payload.category || 'Formation',
    author_name: payload.author_name || 'France Intermittence',
    featured_image_url: payload.featured_image_url || null,
    featured_image_description: payload.featured_image_description || null,
    featured_image_alt: payload.featured_image_alt || null,
    secondary_images: payload.secondary_images || [],
    faq: payload.faq || [],
    internal_links: payload.internal_links || [],
    source_urls: payload.source_urls || [],
    word_count: read.word_count,
    reading_time_minutes: read.reading_time_minutes,
    status,
    is_featured: Boolean(payload.is_featured),
    published_at: status === 'published' ? payload.published_at || new Date().toISOString() : payload.published_at || null,
  }
}

async function listLeads() {
  return supabaseFetch('/rest/v1/leads?select=*&order=created_at.desc&limit=200')
}

async function listArticles() {
  return supabaseFetch('/rest/v1/blog_articles?select=*&order=updated_at.desc&limit=200')
}

async function saveArticle(payload) {
  const article = normalizeArticle(payload)
  const method = payload.id ? 'PATCH' : 'POST'
  const path = payload.id
    ? `/rest/v1/blog_articles?id=eq.${encodeURIComponent(payload.id)}`
    : '/rest/v1/blog_articles'

  return supabaseFetch(path, {
    method,
    body: JSON.stringify(article),
  })
}

async function deleteArticle(id) {
  await supabaseFetch(`/rest/v1/blog_articles?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  })
  return { ok: true }
}

async function deleteLead(id) {
  await supabaseFetch(`/rest/v1/leads?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  })
  return { ok: true }
}

async function uploadImage(payload) {
  const { url, serviceKey } = getSupabaseConfig()
  const bucket = 'blog-covers'
  const filename = payload.filename
  const base64 = payload.base64

  if (!filename || !base64) {
    throw new Error('Image invalide.')
  }

  const bytes = Buffer.from(base64, 'base64')
  const objectPath = `${Date.now()}-${filename}`
  const response = await fetch(`${url}/storage/v1/object/${bucket}/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'image/webp',
      'Cache-Control': '31536000',
      'x-upsert': 'true',
    },
    body: bytes,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Upload image impossible.')
  }

  return {
    path: objectPath,
    publicUrl: `${url}/storage/v1/object/public/${bucket}/${objectPath}`,
  }
}

function getStats(leads, articles) {
  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

  return {
    leads_total: leads.length,
    leads_7_days: leads.filter((lead) => new Date(lead.created_at).getTime() >= sevenDaysAgo).length,
    articles_total: articles.length,
    articles_published: articles.filter((article) => article.status === 'published').length,
    articles_draft: articles.filter((article) => article.status === 'draft').length,
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Méthode non autorisée.' })
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {}

    if (!assertAdmin(event, body)) {
      return json(401, { error: 'Code admin invalide.' })
    }

    if (body.action === 'login') {
      return json(200, { ok: true })
    }

    if (body.action === 'dashboard') {
      const [leads, articles] = await Promise.all([listLeads(), listArticles()])
      return json(200, { stats: getStats(leads, articles), leads, articles })
    }

    if (body.action === 'leads') {
      return json(200, { leads: await listLeads() })
    }

    if (body.action === 'articles') {
      return json(200, { articles: await listArticles() })
    }

    if (body.action === 'saveArticle') {
      return json(200, { article: (await saveArticle(body.article))[0] })
    }

    if (body.action === 'deleteArticle') {
      return json(200, await deleteArticle(body.id))
    }

    if (body.action === 'deleteLead') {
      return json(200, await deleteLead(body.id))
    }

    if (body.action === 'uploadImage') {
      return json(200, await uploadImage(body.image))
    }

    return json(400, { error: 'Action admin inconnue.' })
  } catch (error) {
    return json(500, { error: error instanceof Error ? error.message : 'Erreur admin.' })
  }
}
