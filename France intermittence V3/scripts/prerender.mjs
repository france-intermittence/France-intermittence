// Prérendu post-build : visite chaque route réelle du site dans un vrai
// Chromium headless (Playwright) et fige le HTML obtenu (contenu React monté,
// données Supabase chargées, <head> muté par Seo.tsx avec title/meta/JSON-LD)
// dans dist/<route>/index.html. Netlify sert ces fichiers statiques en
// priorité sur `_redirects` : les crawlers (Googlebot, GPTBot, ClaudeBot…)
// reçoivent un HTML complet sans exécuter de JavaScript, puis le bundle JS
// prend le relais pour l'expérience SPA normale des visiteurs humains.
//
// Pourquoi un script "maison" plutôt qu'un plugin (react-snap, vite-react-ssg,
// Astro, vike…) : voir l'étude comparative du 2026-07-05. En résumé, les
// plugins existants sont soit abandonnés (react-snap, react-ssg, 2022), soit
// incompatibles avec cette stack précise (Vite 8/Rolldown, react-router-dom
// v7) sans rétrograder des dépendances majeures, soit imposent d'abandonner
// react-router-dom pour leur propre routing. Un script Playwright ne touche
// à rien de l'architecture existante et rend exactement ce qu'un navigateur
// réel affiche — aucun audit de compatibilité SSR nécessaire.
import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright'

const PORT = 4174
const ORIGIN = `http://localhost:${PORT}`

async function collectRoutes() {
  const metiersSource = await readFile(resolve('src/data/metiers.ts'), 'utf8')
  const metierSlugs = [...metiersSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
  const articles = JSON.parse(await readFile(resolve('content/blog/articles.json'), 'utf8'))

  return [
    '/',
    '/financement',
    '/accompagnement',
    '/ma-formation-adaptee',
    '/metiers',
    ...metierSlugs.map((slug) => `/metiers/${slug}`),
    '/blog',
    ...articles.map((article) => `/blog/${article.slug}`),
    '/a-propos',
  ]
}

function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now()
  return new Promise((resolvePromise, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          resolvePromise()
          return
        }
      } catch {
        // Le serveur n'écoute pas encore : on réessaie.
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error('vite preview ne répond pas dans le délai imparti.'))
        return
      }
      setTimeout(check, 300)
    }
    check()
  })
}

async function prerenderRoute(page, route) {
  const url = `${ORIGIN}${route}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  const html = await page.content()
  const outputPath = route === '/' ? resolve('dist/index.html') : resolve(`dist${route}/index.html`)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
}

async function main() {
  const routes = await collectRoutes()
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
  })

  let browser
  try {
    await waitForServer(ORIGIN)
    // --no-sandbox : requis dans la plupart des environnements CI (dont Netlify),
    // qui exécutent le build en root sans sandbox utilisateur namespacé.
    browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()

    let failures = 0
    for (const route of routes) {
      try {
        await prerenderRoute(page, route)
        console.log(`  ✓ prérendu ${route}`)
      } catch (error) {
        failures += 1
        console.warn(`  ✗ échec sur ${route} : ${error instanceof Error ? error.message : error}`)
      }
    }

    console.log(`Prerendering terminé : ${routes.length - failures}/${routes.length} routes.`)
    if (failures > 0) {
      console.warn('Les routes en échec conservent le index.html CSR standard (aucune régression).')
    }
  } finally {
    if (browser) await browser.close()
    preview.kill()
  }
}

await main()
