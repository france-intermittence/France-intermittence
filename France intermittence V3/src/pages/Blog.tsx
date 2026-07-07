import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { siteConfig } from '../data/siteConfig'

const blogFeatured = siteImages.blogFeaturedAvif
const blogCumul = siteImages.blogCumulAvif
import { blogFaq } from '../data/seo'
import { Reveal } from '../components/Reveal'
import { PageFaq } from '../components/PageFaq'
import { getPublishedBlogArticles, type BlogArticle } from '../services/blogArticles'

const articleImages: Record<string, string> = {
  '507-heures-intermittence-securiser-parcours': blogFeatured,
  'intermittent-spectacle-etapes-entrer-regime': blogCumul,
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('fr-FR')
    .trim()
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M2 3a1 1 0 011-1h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function HandsHeartIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 12.2c1.6-2.6 5.4-1.9 5.4 1.1 0 2.2-3 4.3-5.4 5.9-2.4-1.6-5.4-3.7-5.4-5.9 0-3 3.8-3.7 5.4-1.1z" />
      <path d="M2 26v-5l5.5-3.2c.9-.5 2-.5 2.9.1L13 20" />
      <path d="M30 26v-5l-5.5-3.2c-.9-.5-2-.5-2.9.1L19 20" />
      <path d="M10.5 20l2.5 2.2c.6.5 1.4.8 2.2.8h4.3" />
    </svg>
  )
}

const ARTICLES_PER_PAGE = 4

export function Blog() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let active = true

    getPublishedBlogArticles()
      .then((result) => {
        if (active) setArticles(result)
      })
      .catch(() => {
        if (active) setError('Les articles ne peuvent pas être chargés pour le moment.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const normalizedQuery = normalizeSearch(query)
  const filteredArticles = normalizedQuery
    ? articles.filter((article) => {
        const searchableContent = [
          article.title,
          article.excerpt,
          article.category,
          article.primary_keyword,
          ...article.secondary_keywords,
        ].join(' ')

        return normalizeSearch(searchableContent).includes(normalizedQuery)
      })
    : articles

  useEffect(() => {
    setPage(1)
  }, [normalizedQuery])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  )
  const featured = pageArticles[0]
  const sideArticles = pageArticles.slice(1)

  return (
    <div className="blog-page">
      <Reveal>
        <header className="blog-header">
          <p className="blog-eyebrow">Ressources & actualités</p>
          <h1 className="blog-title">
            Ressources, conseils et actualités
            <br />
            pour les intermittents du spectacle
          </h1>
          <span className="blog-title__underline" />
          <p className="blog-intro">
            Des contenus fondés sur des sources institutionnelles pour comprendre vos droits,
            préparer vos démarches et avancer dans votre projet de formation avec plus de clarté.
          </p>
        </header>
      </Reveal>

      {!loading && !error && (
        <Reveal>
          <section className="blog-search" aria-label="Recherche dans les articles">
            <div className="blog-search__heading">
              <label htmlFor="blog-search-input">Rechercher un article</label>
              <span className="blog-search__count" aria-live="polite">
                {filteredArticles.length} {filteredArticles.length > 1 ? 'articles trouvés' : 'article trouvé'}
              </span>
            </div>
            <div className="blog-search__control">
              <input
                id="blog-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex. : 507 heures, France Travail, Afdas…"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')}>
                  Effacer
                </button>
              )}
            </div>
          </section>
        </Reveal>
      )}

      {loading && <p className="blog-loading">Chargement des articles…</p>}
      {error && <p className="blog-loading blog-loading--error">{error}</p>}

      {!loading && !error && featured && (
        <Reveal>
          <div className="blog-grid">
            <article className="blog-featured">
              <div className="blog-featured__media">
                <img
                  src={featured.featured_image_url ?? articleImages[featured.slug] ?? blogFeatured}
                  alt={featured.featured_image_alt ?? featured.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="blog-featured__body">
                <span className="blog-tag">{featured.category}</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__desc">{featured.excerpt}</p>
                <div className="blog-featured__footer">
                  <span className="blog-date">
                    <CalendarIcon /> {formatDate(featured.published_at)}
                  </span>
                  <Link to={`/blog/${featured.slug}`} className="blog-read-btn">
                    Lire l’article <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>

            <div className="blog-side">
              {sideArticles.map((article) => (
                <article className="blog-card" key={article.id}>
                  <div className="blog-card__media">
                    <img
                      src={article.featured_image_url ?? articleImages[article.slug] ?? blogCumul}
                      alt={article.featured_image_alt ?? article.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-tag">{article.category}</span>
                    <h3 className="blog-card__title">{article.title}</h3>
                    <span className="blog-date">
                      <CalendarIcon /> {formatDate(article.published_at)}
                    </span>
                  </div>
                  <Link to={`/blog/${article.slug}`} className="blog-card__arrow" aria-label={`Lire ${article.title}`}>
                    <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {!loading && !error && totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Pagination des articles">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon /> Précédent
          </button>
          <span className="blog-pagination__status">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant <ArrowIcon />
          </button>
        </nav>
      )}

      {!loading && !error && !featured && (
        <div className="blog-empty" role="status">
          <p className="blog-empty__eyebrow">Aucun résultat</p>
          <h2>Aucun article ne correspond à votre recherche.</h2>
          <p>Essayez un terme plus général ou affichez de nouveau tous les articles.</p>
          <button type="button" onClick={() => setQuery('')}>
            Voir tous les articles
          </button>
        </div>
      )}

      <Reveal>
        <PageFaq title="Questions fréquentes sur nos ressources" items={blogFaq} />
      </Reveal>

      <Reveal>
        <section className="blog-cta">
          <div className="blog-cta__inner">
            <div className="blog-cta__left">
              <div className="blog-cta__icon">
                <HandsHeartIcon />
              </div>
              <div>
                <h2 className="blog-cta__title">Prêt à passer de la lecture à l’action ?</h2>
                <p className="blog-cta__sub">
                  Chaque situation mérite d’être étudiée individuellement. Nous vous aidons à
                  clarifier votre projet, vos démarches et les financements envisageables.
                </p>
              </div>
            </div>
            <div className="blog-cta__actions">
              <a href={siteConfig.phoneHref} className="blog-cta__btn blog-cta__btn--outline">
                <PhoneIcon />
                Appeler le {siteConfig.phoneDisplay}
              </a>
              <Link to="/ma-formation-adaptee" className="blog-cta__btn blog-cta__btn--primary">
                Trouver ma formation adaptée
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
