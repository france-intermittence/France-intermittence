import './App.css'
import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FundingSection } from './components/FundingSection'
import { Header } from './components/Header'
import { MobileCallBar } from './components/MobileCallBar'
import { HeroSection } from './components/HeroSection'
import { AudiencePaths } from './components/AudiencePaths'
import { UniverseCards } from './components/UniverseCards'
import { SocialProof } from './components/SocialProof'
import { HomeSeoSections } from './components/HomeSeoSections'
import { Footer } from './components/Footer'
import { Reveal } from './components/Reveal'
import { Seo } from './components/Seo'
import type { Crumb } from './data/seo'
import { siteImages } from './data/siteImages'
import { legalPages } from './data/siteConfig'
import { routeSeo } from './data/seo'
import { metierProfiles } from './data/metiers'

const parisFrieze = siteImages.friseParisDecorative

// Chaque route (hors accueil) est chargée à la demande : elle ne pèse plus sur
// le chargement initial ni sur le bundle des autres pages. L'admin (~1 380
// lignes : graphiques, upload d'images…) sort ainsi entièrement du bundle
// public — aucun visiteur du site ne le télécharge plus.
const MaFormationAdaptee = lazy(() => import('./pages/MaFormationAdaptee').then((m) => ({ default: m.MaFormationAdaptee })))
const Confirmation = lazy(() => import('./pages/Confirmation').then((m) => ({ default: m.Confirmation })))
const Financement = lazy(() => import('./pages/Financement').then((m) => ({ default: m.Financement })))
const Accompagnement = lazy(() => import('./pages/Accompagnement').then((m) => ({ default: m.Accompagnement })))
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })))
const BlogArticle = lazy(() => import('./pages/BlogArticle').then((m) => ({ default: m.BlogArticle })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Metiers = lazy(() => import('./pages/Metiers').then((m) => ({ default: m.Metiers })))
const Admin = lazy(() => import('./pages/Admin').then((m) => ({ default: m.Admin })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))

const breadcrumbs: Record<string, Crumb[]> = {
  '/': [{ label: 'Accueil' }],
  '/financement': [{ label: 'Accueil', to: '/' }, { label: 'Financement' }],
  '/accompagnement': [{ label: 'Accueil', to: '/' }, { label: 'Accompagnement' }],
  '/metiers': [{ label: 'Accueil', to: '/' }, { label: 'Métiers' }],
  ...Object.fromEntries(
    metierProfiles.map((profile) => [
      `/metiers/${profile.slug}`,
      [{ label: 'Accueil', to: '/' }, { label: 'Métiers', to: '/metiers' }, { label: profile.shortTitle }],
    ]),
  ),
  '/ma-formation-adaptee': [{ label: 'Accueil', to: '/' }, { label: 'Ma formation adaptée' }],
  '/ma-formation-adaptee/confirmation': [
    { label: 'Accueil', to: '/' },
    { label: 'Ma formation adaptée', to: '/ma-formation-adaptee' },
    { label: 'Confirmation' },
  ],
  '/blog': [{ label: 'Accueil', to: '/' }, { label: 'Blog' }],
  '/a-propos': [{ label: 'Accueil', to: '/' }, { label: 'À propos' }],
  '/admin': [{ label: 'Accueil', to: '/' }, { label: 'Admin' }],
  '/mentions-legales': [{ label: 'Accueil', to: '/' }, { label: 'Mentions légales' }],
  '/politique-confidentialite': [{ label: 'Accueil', to: '/' }, { label: 'Politique de confidentialité' }],
  '/cookies': [{ label: 'Accueil', to: '/' }, { label: 'Cookies' }],
  '/cgu': [{ label: 'Accueil', to: '/' }, { label: 'CGU' }],
}

// Meta de repli pour toute route inconnue (soft-404) : jamais indexée, jamais
// confondue avec la home. `BlogArticle` gère son propre <Seo> une fois l'article
// chargé depuis Supabase ; on ne rend donc pas de Seo générique pour ces routes
// (évite un flash de meta "page introuvable" avant que l'article ne réponde).
const notFoundMeta = {
  title: 'Page introuvable | France Intermittence',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  image: routeSeo['/'].image,
  noindex: true,
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  const isBlogArticle = pathname.startsWith('/blog/')
  const meta = routeSeo[pathname] ?? (isBlogArticle ? null : notFoundMeta)
  const items = breadcrumbs[pathname] ?? []

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [hash, pathname])

  if (!meta) return null

  return <Seo pathname={pathname} meta={meta} breadcrumbs={items} />
}

function HomePage() {
  return (
    <main className="page-main">
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <AudiencePaths />
      </Reveal>
      <Reveal>
        <UniverseCards />
      </Reveal>
      <Reveal>
        <SocialProof title="Un accompagnement de confiance pour les intermittents du spectacle" />
      </Reveal>
      <div className="paris-frieze" aria-hidden="true">
        <img src={parisFrieze} alt="" loading="lazy" decoding="async" />
      </div>
      <Reveal>
        <FundingSection />
      </Reveal>
      <Reveal>
        <HomeSeoSections />
      </Reveal>
    </main>
  )
}

function App() {
  return (
    <div className="page-shell">
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <RouteEffects />
      <Header />
      <Suspense fallback={<div className="route-loading" aria-busy="true" aria-live="polite" />}>
        <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ma-formation-adaptee" element={<MaFormationAdaptee />} />
          <Route path="/ma-formation-adaptee/confirmation" element={<Confirmation />} />
          <Route path="/financement" element={<Financement />} />
          <Route path="/accompagnement" element={<Accompagnement />} />
          <Route path="/metiers" element={<Metiers />} />
          <Route path="/metiers/:slug" element={<Metiers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/mentions-legales"
            element={<LegalPage title={legalPages.mentions.title} intro={legalPages.mentions.intro} sections={legalPages.mentions.sections} />}
          />
          <Route
            path="/politique-confidentialite"
            element={<LegalPage title={legalPages.privacy.title} intro={legalPages.privacy.intro} sections={legalPages.privacy.sections} />}
          />
          <Route
            path="/cookies"
            element={<LegalPage title={legalPages.cookies.title} intro={legalPages.cookies.intro} sections={legalPages.cookies.sections} />}
          />
          <Route
            path="/cgu"
            element={<LegalPage title={legalPages.cgu.title} intro={legalPages.cgu.intro} sections={legalPages.cgu.sections} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Suspense>
      <Footer />
      <MobileCallBar />
    </div>
  )
}

export default App
