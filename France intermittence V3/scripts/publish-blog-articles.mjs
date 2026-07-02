import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const requestedSlugs = new Set(process.argv.slice(2))
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required.')
}

const envContent = await readFile(resolve('.env.local'), 'utf8')
const supabaseUrl = envContent
  .split(/\r?\n/)
  .find((line) => line.startsWith('VITE_SUPABASE_URL='))
  ?.split('=')
  .slice(1)
  .join('=')
  .replace(/^"|"$/g, '')

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is missing from .env.local.')
}

const articles = JSON.parse(await readFile(resolve('content/blog/articles.json'), 'utf8'))
const selectedArticles = articles.filter((article) => requestedSlugs.has(article.slug))

if (selectedArticles.length !== requestedSlugs.size) {
  throw new Error('At least one requested article is missing from articles.json.')
}

const rows = await Promise.all(
  selectedArticles.map(async (article) => ({
    slug: article.slug,
    title: article.title,
    seo_title: article.seoTitle,
    meta_description: article.metaDescription,
    primary_keyword: article.primaryKeyword,
    secondary_keywords: article.secondaryKeywords,
    search_intent: article.searchIntent,
    alternate_seo_titles: article.alternateSeoTitles,
    excerpt: article.excerpt,
    content_markdown: await readFile(resolve('content/blog', article.file), 'utf8'),
    category: article.category,
    author_name: 'France Intermittence',
    featured_image_url: null,
    featured_image_description: article.featuredImageDescription,
    featured_image_alt: article.featuredImageAlt,
    secondary_images: article.secondaryImages,
    faq: article.faq,
    internal_links: article.internalLinks,
    source_urls: article.sourceUrls,
    word_count: article.wordCount,
    reading_time_minutes: article.readingTimeMinutes,
    status: 'published',
    is_featured: article.isFeatured,
    published_at: new Date().toISOString(),
  })),
)

const response = await fetch(`${supabaseUrl}/rest/v1/blog_articles?on_conflict=slug`, {
  method: 'POST',
  headers: {
    apikey: serviceRoleKey,
    authorization: `Bearer ${serviceRoleKey}`,
    'content-type': 'application/json',
    prefer: 'resolution=merge-duplicates,return=representation',
  },
  body: JSON.stringify(rows),
})

const responseBody = await response.text()

if (!response.ok) {
  throw new Error(`Supabase returned ${response.status}: ${responseBody}`)
}

const publishedArticles = responseBody ? JSON.parse(responseBody) : []

for (const article of publishedArticles) {
  console.log(`${article.slug}: ${article.status} (${article.word_count} words)`)
}
