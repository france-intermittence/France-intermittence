import './App.css'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FundingSection } from './components/FundingSection'
import { Header } from './components/Header'
import { MobileCallBar } from './components/MobileCallBar'
import { HeroSection } from './components/HeroSection'
import { AudiencePaths } from './components/AudiencePaths'
import { UniverseCards } from './components/UniverseCards'
import { WaveSection } from './components/WaveSection'
import { Footer } from './components/Footer'
import { Reveal } from './components/Reveal'
import { Breadcrumb, type Crumb } from './components/Breadcrumb'
import { Seo } from './components/Seo'
import { MaFormationAdaptee } from './pages/MaFormationAdaptee'
import { Confirmation } from './pages/Confirmation'
import { Financement } from './pages/Financement'
import { Accompagnement } from './pages/Accompagnement'
import { Blog } from './pages/Blog'
import { About } from './pages/About'
import { LegalPage } from './pages/LegalPage'
import { legalPages } from './data/siteConfig'
import { routeSeo } from './data/seo'
import parisFrieze from '../icone/frise paris.svg'

const breadcrumbs: Record<string, Crumb[]> = {
  '/': [{ label: 'Accueil' }],
  '/financement': [{ label: 'Accueil', to: '/' }, { label: 'Financement' }],
  '/accompagnement': [{ label: 'Accueil', to: '/' }, { label: 'Accompagnement' }],
  '/ma-formation-adaptee': [{ label: 'Accueil', to: '/' }, { label: 'Ma formation adaptée' }],
  '/ma-formation-adaptee/confirmation': [
    { label: 'Accueil', to: '/' },
    { label: 'Ma formation adaptée', to: '/ma-formation-adaptee' },
    { label: 'Confirmation' },
  ],
  '/blog': [{ label: 'Accueil', to: '/' }, { label: 'Blog' }],
  '/a-propos': [{ label: 'Accueil', to: '/' }, { label: 'À propos' }],
  '/mentions-legales': [{ label: 'Accueil', to: '/' }, { label: 'Mentions légales' }],
  '/politique-confidentialite': [{ label: 'Accueil', to: '/' }, { label: 'Politique de confidentialité' }],
  '/cookies': [{ label: 'Accueil', to: '/' }, { label: 'Cookies' }],
  '/cgu': [{ label: 'Accueil', to: '/' }, { label: 'CGU' }],
}

function PageBreadcrumb() {
  const { pathname } = useLocation()
  const items = breadcrumbs[pathname]

  if (!items || pathname === '/') return null

  return (
    <div className="page-breadcrumb">
      <Breadcrumb items={items} />
    </div>
  )
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  const meta = routeSeo[pathname] ?? routeSeo['/']
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
        <WaveSection />
      </Reveal>
      <div className="paris-frieze" aria-hidden="true">
        <img src={parisFrieze} alt="" loading="lazy" decoding="async" />
      </div>
      <Reveal>
        <FundingSection />
      </Reveal>
    </main>
  )
}

function App() {
  return (
    <div className="page-shell">
      <RouteEffects />
      <Header />
      <PageBreadcrumb />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ma-formation-adaptee" element={<MaFormationAdaptee />} />
        <Route path="/ma-formation-adaptee/confirmation" element={<Confirmation />} />
        <Route path="/financement" element={<Financement />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/a-propos" element={<About />} />
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
      </Routes>
      <Footer />
      <MobileCallBar />
    </div>
  )
}

export default App
