import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { siteImages } from '../data/siteImages'
import { Seo } from '../components/Seo'
import type { Crumb } from '../data/seo'
import { getPublishedBlogArticle, type BlogArticle as BlogArticleData } from '../services/blogArticles'

const articleImages: Record<string, string> = {
  '507-heures-intermittence-securiser-parcours': siteImages.blogFeaturedPng,
  'intermittent-spectacle-etapes-entrer-regime': siteImages.blogCumulPng,
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogArticle() {
  const { slug = '' } = useParams()
  const [article, setArticle] = useState<BlogArticleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getPublishedBlogArticle(slug)
      .then((result) => {
        if (!active) return
        setArticle(result)
        if (!result) setError('Cet article n’est pas disponible.')
      })
      .catch(() => {
        if (active) setError('L’article ne peut pas être chargé pour le moment.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return <main className="blog-article-state">Chargement de l’article…</main>
  }

  if (!article || error) {
    return (
      <main className="blog-article-state">
        <h1>Article indisponible</h1>
        <p>{error}</p>
        <Link to="/blog" className="fi-button fi-button--primary">Retour au blog</Link>
      </main>
    )
  }

  const image = article.featured_image_url ?? articleImages[article.slug] ?? siteImages.blogFeaturedPng
  const articleBody = article.content_markdown.replace(/^#\s+.+\r?\n+/, '')
  const breadcrumbs: Crumb[] = [
    { label: 'Accueil', to: '/' },
    { label: 'Blog', to: '/blog' },
    { label: article.title },
  ]

  return (
    <>
      <Seo
        pathname={`/blog/${article.slug}`}
        meta={{
          title: article.seo_title,
          description: article.meta_description,
          image,
          keywords: [article.primary_keyword, ...article.secondary_keywords].join(', '),
          type: 'article',
          faq: article.faq,
          article: {
            authorName: article.author_name,
            publishedAt: article.published_at,
            wordCount: article.word_count ?? undefined,
            category: article.category,
            keywords: [article.primary_keyword, ...article.secondary_keywords],
          },
        }}
        breadcrumbs={breadcrumbs}
      />

      <main className="blog-article-page">
        <header className="blog-article-hero">
          <div className="blog-article-meta">
            <span className="blog-tag">{article.category}</span>
            <span>{formatDate(article.published_at)}</span>
            {article.reading_time_minutes && <span>{article.reading_time_minutes} min de lecture</span>}
          </div>
          <h1>{article.title}</h1>
          <p className="blog-article-excerpt">{article.excerpt}</p>
        </header>

        <figure className="blog-article-image">
          <img src={image} alt={article.featured_image_alt ?? article.title} />
        </figure>

        <article className="blog-article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href = '', children }) =>
                href.startsWith('/') ? (
                  <Link to={href}>{children}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noreferrer noopener">{children}</a>
                ),
            }}
          >
            {articleBody}
          </ReactMarkdown>
        </article>

        {article.faq.length > 0 && (
          <section className="blog-article-faq" aria-labelledby="blog-faq-title">
            <p className="blog-eyebrow">Questions fréquentes</p>
            <h2 id="blog-faq-title">FAQ sur l’intermittence du spectacle</h2>
            <div className="blog-article-faq__list">
              {article.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {article.internal_links.length > 0 && (
          <aside className="blog-article-links" aria-labelledby="blog-links-title">
            <h2 id="blog-links-title">Pour poursuivre votre parcours</h2>
            <div>
              {article.internal_links.map((item) => (
                <Link key={item.url} to={item.url}>{item.label}</Link>
              ))}
            </div>
          </aside>
        )}
      </main>
    </>
  )
}
