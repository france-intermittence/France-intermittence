import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// En local, VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY viennent de .env.local
// (non chargé automatiquement par un script Node hors Vite). Sur Netlify, ces
// variables sont déjà présentes dans process.env pour toute l'étape de build.
async function readEnvValue(name) {
  if (process.env[name]) return process.env[name]

  try {
    const envContent = await readFile(resolve('.env.local'), 'utf8')
    const line = envContent.split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`))
    return line?.split('=').slice(1).join('=').replace(/^"|"$/g, '')
  } catch {
    return undefined
  }
}

/**
 * Liste les articles publiés directement depuis Supabase (source de vérité
 * unique : c'est exactement ce que /blog affiche aux visiteurs et à
 * Googlebot, que l'article ait été publié via publish-blog-articles.mjs ou
 * créé depuis /admin). La RLS de blog_articles restreint déjà la clé anon
 * aux lignes status='published' et published_at <= now().
 */
export async function fetchPublishedBlogArticles() {
  const supabaseUrl = await readEnvValue('VITE_SUPABASE_URL')
  const anonKey = await readEnvValue('VITE_SUPABASE_ANON_KEY')

  if (!supabaseUrl || !anonKey) {
    throw new Error(
      'VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requis (env ou .env.local) pour lister les articles publiés.',
    )
  }

  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, '')}/rest/v1/blog_articles?select=slug,published_at,updated_at&status=eq.published&order=published_at.desc`,
    {
      headers: {
        apikey: anonKey,
        authorization: `Bearer ${anonKey}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Supabase a renvoyé ${response.status} lors de la récupération des articles publiés.`)
  }

  return response.json()
}
