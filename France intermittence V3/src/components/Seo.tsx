import { useEffect } from 'react'
import { buildStructuredData, type Crumb, type SeoMeta } from '../data/seo'
import { siteConfig } from '../data/siteConfig'

type SeoProps = {
  pathname: string
  meta: SeoMeta
  breadcrumbs: Crumb[]
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value)
  })
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value)
  })
}

export function Seo({ pathname, meta, breadcrumbs }: SeoProps) {
  useEffect(() => {
    const canonical = new URL(pathname, siteConfig.siteUrl).toString()
    const absoluteImage = new URL(meta.image, siteConfig.siteUrl).toString()
    const structuredData = buildStructuredData(pathname, meta, breadcrumbs)

    document.title = meta.title

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' })
    upsertMeta('meta[name="theme-color"]', { name: 'theme-color', content: '#071b5f' })

    if (meta.keywords) {
      upsertMeta('meta[name="keywords"]', { name: 'keywords', content: meta.keywords })
    }

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type ?? 'website' })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'fr_FR' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteConfig.brandName })

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage })

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical })

    const existing = document.getElementById('fi-structured-data')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'fi-structured-data'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      const cleanup = document.getElementById('fi-structured-data')
      if (cleanup) cleanup.remove()
    }
  }, [breadcrumbs, meta, pathname])

  return null
}
