import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { metierProfiles } from '../data/metiers'
import { legalLinks } from '../data/siteConfig'
import { getPublishedBlogArticles, type BlogArticle } from '../services/blogArticles'

export function PlanDuSite() {
  const [articles, setArticles] = useState<BlogArticle[]>([])

  useEffect(() => {
    let active = true

    getPublishedBlogArticles()
      .then((data) => {
        if (active) setArticles(data)
      })
      .catch(() => {
        // Le plan du site reste utilisable même si les articles ne se chargent pas.
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="legal-page sitemap-page">
      <div className="legal-page__header">
        <p className="legal-page__eyebrow">Navigation</p>
        <h1 className="legal-page__title">Plan du site</h1>
        <p className="legal-page__intro">Retrouvez ci-dessous l’ensemble des pages du site France Intermittence.</p>
      </div>

      <div className="sitemap-page__grid">
        <section className="sitemap-page__col">
          <h2>Pages principales</h2>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/financement">Financement</Link></li>
            <li><Link to="/accompagnement">Accompagnement</Link></li>
            <li><Link to="/ma-formation-adaptee">Ma formation adaptée</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
          </ul>
        </section>

        <section className="sitemap-page__col">
          <h2>Métiers</h2>
          <ul>
            <li><Link to="/metiers">Tous les métiers</Link></li>
            {metierProfiles.map((profile) => (
              <li key={profile.slug}>
                <Link to={`/metiers/${profile.slug}`}>{profile.shortTitle}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="sitemap-page__col">
          <h2>Blog</h2>
          <ul>
            <li><Link to="/blog">Tous les articles</Link></li>
            {articles.map((article) => (
              <li key={article.slug}>
                <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="sitemap-page__col">
          <h2>Informations légales</h2>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
