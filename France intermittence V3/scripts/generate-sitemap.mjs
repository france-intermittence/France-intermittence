import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fetchPublishedBlogArticles } from './lib/blogArticles.mjs'

// Le domaine est lu depuis siteConfig.ts (source unique, celle utilisée par le
// canonical/JSON-LD à l'exécution) : le sitemap ne peut donc jamais diverger du
// domaine canonique.
const siteConfigSource = await readFile(resolve('src/data/siteConfig.ts'), 'utf8')
const originMatch = siteConfigSource.match(/siteUrl:\s*'([^']+)'/)

if (!originMatch) {
  throw new Error('Impossible de lire siteUrl depuis src/data/siteConfig.ts.')
}

const ORIGIN = originMatch[1].replace(/\/$/, '')

const metiersSource = await readFile(resolve('src/data/metiers.ts'), 'utf8')
const metierSlugs = [...metiersSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])

if (metierSlugs.length === 0) {
  throw new Error('Aucun slug métier trouvé dans src/data/metiers.ts.')
}

// Les articles viennent de Supabase (status='published'), pas du JSON statique
// content/blog/articles.json : ce fichier n'est que la source de rédaction
// utilisée par publish-blog-articles.mjs, alors que les articles créés depuis
// /admin sont écrits directement en base et doivent apparaître ici aussi.
const articles = await fetchPublishedBlogArticles()

/** @type {Array<{ path: string; priority: string; changefreq: string }>} */
const entries = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/financement', priority: '0.9', changefreq: 'monthly' },
  { path: '/accompagnement', priority: '0.9', changefreq: 'monthly' },
  { path: '/ma-formation-adaptee', priority: '0.9', changefreq: 'monthly' },
  { path: '/metiers', priority: '0.8', changefreq: 'monthly' },
  ...metierSlugs.map((slug) => ({ path: `/metiers/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  ...articles.map((article) => ({ path: `/blog/${article.slug}`, priority: '0.6', changefreq: 'monthly' })),
  { path: '/a-propos', priority: '0.5', changefreq: 'yearly' },
  { path: '/plan-du-site', priority: '0.3', changefreq: 'monthly' },
]

const today = new Date().toISOString().slice(0, 10)

const body = entries
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

await writeFile(resolve('public/sitemap.xml'), xml)
console.log(`sitemap.xml généré (${entries.length} URLs, domaine ${ORIGIN}).`)
