import { useEffect, useMemo, useState } from 'react'
import {
  adminRequest,
  clearAdminCode,
  fileToWebpUpload,
  getStoredAdminCode,
  parseFaq,
  parseInternalLinks,
  slugify,
  splitLines,
  storeAdminCode,
  type AdminArticle,
  type AdminLead,
  type AdminStats,
} from '../services/adminApi'
import { BarRankingList, LeadsTrendChart, StatTile, StatusStackBar } from '../components/AdminCharts'
import { articleInsights, bucketLeadsByDay, leadsPeriodDelta, topDomaines } from '../services/adminInsights'
import { MailIcon, PhoneIcon } from '../components/Icons'
import {
  ArticleIcon,
  CalendarIcon,
  ChartIcon,
  ClockIcon,
  CloseIcon,
  GridIcon,
  ImageIcon,
  InboxIcon,
  LogoutIcon,
  MenuIcon,
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
} from '../components/AdminIcons'

type AdminTab = 'dashboard' | 'stats' | 'leads' | 'articles'
type StatusFilter = 'all' | AdminArticle['status']

const emptyArticle: AdminArticle = {
  slug: '',
  title: '',
  seo_title: '',
  meta_description: '',
  primary_keyword: '',
  secondary_keywords: [],
  search_intent: 'Informationnelle',
  alternate_seo_titles: [],
  excerpt: '',
  content_markdown: '',
  category: 'Formation',
  author_name: 'France Intermittence',
  featured_image_url: null,
  featured_image_description: null,
  featured_image_alt: '',
  secondary_images: [],
  faq: [],
  internal_links: [],
  source_urls: [],
  status: 'draft',
  is_featured: false,
  published_at: null,
}

const navItems: Array<{ value: AdminTab; label: string; icon: typeof GridIcon }> = [
  { value: 'dashboard', label: 'Tableau de bord', icon: GridIcon },
  { value: 'stats', label: 'Statistiques', icon: ChartIcon },
  { value: 'leads', label: 'Leads', icon: InboxIcon },
  { value: 'articles', label: 'Articles', icon: ArticleIcon },
]

const statusLabels: Record<AdminArticle['status'], string> = {
  draft: 'Brouillon',
  published: 'Publié',
  archived: 'Archivé',
}

const statusTone: Record<AdminArticle['status'], 'good' | 'warning' | 'neutral'> = {
  published: 'good',
  draft: 'warning',
  archived: 'neutral',
}

function formatShortDate(value?: string | null) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
}

function articleToForm(article: AdminArticle) {
  return {
    ...article,
    secondaryKeywordsText: article.secondary_keywords?.join('\n') ?? '',
    alternateTitlesText: article.alternate_seo_titles?.join('\n') ?? '',
    sourceUrlsText: article.source_urls?.join('\n') ?? '',
    faqText: article.faq?.map((item) => `${item.question}|${item.answer}`).join('\n') ?? '',
    internalLinksText: article.internal_links?.map((item) => `${item.label}|${item.url}`).join('\n') ?? '',
  }
}

export function Admin() {
  const [code, setCode] = useState(getStoredAdminCode())
  const [authenticated, setAuthenticated] = useState(Boolean(getStoredAdminCode()))
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [leads, setLeads] = useState<AdminLead[]>([])
  const [articles, setArticles] = useState<AdminArticle[]>([])
  const [editing, setEditing] = useState(articleToForm(emptyArticle))
  const [editingSnapshot, setEditingSnapshot] = useState('')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null)

  const filteredLeads = useMemo(() => leads.slice(0, 60), [leads])
  const dailyLeads = useMemo(() => bucketLeadsByDay(leads, 14), [leads])
  const domaineTop = useMemo(() => topDomaines(leads, 6), [leads])
  const leadsDelta = useMemo(() => leadsPeriodDelta(leads), [leads])
  const insights = useMemo(() => articleInsights(articles), [articles])
  const filteredArticles = useMemo(
    () => (statusFilter === 'all' ? articles : articles.filter((article) => article.status === statusFilter)),
    [articles, statusFilter],
  )

  async function loadDashboard() {
    setLoading(true)
    setMessage('')
    try {
      const data = await adminRequest('dashboard')
      setStats(data.stats ?? null)
      setLeads(data.leads ?? [])
      setArticles(data.articles ?? [])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Chargement impossible.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authenticated) return
    void Promise.resolve().then(() => loadDashboard())
  }, [authenticated])

  useEffect(() => {
    if (!isEditorOpen) return
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeEditor()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditorOpen, editing, editingSnapshot])

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await adminRequest('login', { code }, code)
      storeAdminCode(code)
      setAuthenticated(true)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Code invalide.')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    clearAdminCode()
    setAuthenticated(false)
    setCode('')
  }

  function updateField(name: string, value: string | boolean) {
    setEditing((previous) => {
      const next = { ...previous, [name]: value }
      if (name === 'title' && !previous.id) {
        next.slug = slugify(String(value))
        next.seo_title = String(value).slice(0, 180)
      }
      return next
    })
  }

  function openEditor(article?: AdminArticle) {
    const form = articleToForm(article ?? emptyArticle)
    setEditing(form)
    setEditingSnapshot(JSON.stringify(form))
    setMessage('')
    setIsEditorOpen(true)
  }

  function closeEditor(force = false) {
    if (!force && JSON.stringify(editing) !== editingSnapshot) {
      const confirmed = window.confirm('Fermer sans enregistrer les modifications de cet article ?')
      if (!confirmed) return
    }
    setIsEditorOpen(false)
    setEditing(articleToForm(emptyArticle))
  }

  async function uploadCover(file: File) {
    setLoading(true)
    setMessage('')
    try {
      const image = await fileToWebpUpload(file, editing.slug || editing.title)
      const result = await adminRequest('uploadImage', { image })
      setEditing((previous) => ({
        ...previous,
        featured_image_url: result.publicUrl ?? previous.featured_image_url,
        featured_image_alt: previous.featured_image_alt || `Illustration de l’article ${previous.title}`,
      }))
      setMessage('Image convertie en WebP et envoyée dans le bucket blog-covers.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload impossible.')
    } finally {
      setLoading(false)
    }
  }

  async function saveArticle() {
    setLoading(true)
    setMessage('')
    try {
      const article: AdminArticle = {
        ...editing,
        secondary_keywords: splitLines(editing.secondaryKeywordsText),
        alternate_seo_titles: splitLines(editing.alternateTitlesText),
        source_urls: splitLines(editing.sourceUrlsText),
        faq: parseFaq(editing.faqText),
        internal_links: parseInternalLinks(editing.internalLinksText),
      }
      delete (article as Partial<typeof editing>).secondaryKeywordsText
      delete (article as Partial<typeof editing>).alternateTitlesText
      delete (article as Partial<typeof editing>).sourceUrlsText
      delete (article as Partial<typeof editing>).faqText
      delete (article as Partial<typeof editing>).internalLinksText

      await adminRequest('saveArticle', { article })
      closeEditor(true)
      await loadDashboard()
      setMessage('Article enregistré.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Enregistrement impossible.')
    } finally {
      setLoading(false)
    }
  }

  async function deleteArticle(article: AdminArticle) {
    if (!article.id || !window.confirm(`Supprimer "${article.title}" ?`)) return
    setLoading(true)
    setMessage('')
    try {
      await adminRequest('deleteArticle', { id: article.id })
      if (editing.id === article.id) closeEditor(true)
      await loadDashboard()
      setMessage('Article supprimé.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Suppression impossible.')
    } finally {
      setLoading(false)
    }
  }

  async function deleteLead(lead: AdminLead) {
    if (!window.confirm(`Supprimer le lead de ${lead.prenom} ${lead.nom} ?`)) return
    setLoading(true)
    setMessage('')
    try {
      await adminRequest('deleteLead', { id: lead.id })
      if (selectedLead?.id === lead.id) setSelectedLead(null)
      await loadDashboard()
      setMessage('Lead supprimé.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Suppression impossible.')
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <main className="admin-login">
        <form className="admin-login__card" onSubmit={handleLogin}>
          <p className="admin-eyebrow">Administration</p>
          <h1>Accès admin France Intermittence</h1>
          <p>Entrez le code administrateur pour accéder au tableau de bord.</p>
          <input value={code} onChange={(event) => setCode(event.target.value)} type="password" placeholder="Code admin" />
          <button type="submit" disabled={loading}>{loading ? 'Vérification…' : 'Se connecter'}</button>
          {message && <p className="admin-message admin-message--error">{message}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="admin-mobile-bar">
        <button type="button" className="admin-mobile-bar__icon" onClick={() => setMobileNavOpen(true)} aria-label="Ouvrir le menu">
          <MenuIcon />
        </button>
        <span className="admin-mobile-bar__title">France Intermittence</span>
        <button type="button" className="admin-mobile-bar__icon" onClick={logout} aria-label="Déconnexion">
          <LogoutIcon />
        </button>
      </div>

      {mobileNavOpen && <div className="admin-sidebar__backdrop" onClick={() => setMobileNavOpen(false)} />}

      <div className="admin-page__body">
      <aside className={`admin-sidebar ${mobileNavOpen ? 'is-open' : ''}`}>
        <div className="admin-sidebar__head">
          <div>
            <p className="admin-eyebrow">Admin</p>
            <h1>France Intermittence</h1>
          </div>
          <button type="button" className="admin-sidebar__close" onClick={() => setMobileNavOpen(false)} aria-label="Fermer le menu">
            <CloseIcon />
          </button>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            const count = item.value === 'leads' ? leads.length : item.value === 'articles' ? articles.length : null
            return (
              <button
                key={item.value}
                type="button"
                className={tab === item.value ? 'is-active' : ''}
                onClick={() => {
                  setTab(item.value)
                  setMobileNavOpen(false)
                }}
              >
                <Icon className="admin-sidebar__icon" />
                <span>{item.label}</span>
                {count !== null && <span className="admin-sidebar__count">{count}</span>}
              </button>
            )
          })}
        </nav>
        <button type="button" className="admin-sidebar__logout" onClick={logout}>
          <LogoutIcon className="admin-sidebar__icon" />
          <span>Déconnexion</span>
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">Admin</p>
            <h2>{tab === 'dashboard' ? 'Tableau de bord' : tab === 'stats' ? 'Statistiques du site' : tab === 'leads' ? 'Leads formulaire' : 'Gestion des articles'}</h2>
          </div>
          <button type="button" className="admin-button--ghost" onClick={loadDashboard} disabled={loading}>
            <RefreshIcon />
            {loading ? 'Chargement…' : 'Actualiser'}
          </button>
        </header>

        {message && <p className="admin-message">{message}</p>}

        {(tab === 'dashboard' || tab === 'stats') && (
          <>
            <div className="admin-stats">
              <StatTile icon={<InboxIcon />} label="Leads au total" value={stats?.leads_total ?? 0} />
              <StatTile
                icon={<ChartIcon />}
                label="Leads sur 7 jours"
                value={leadsDelta.current}
                deltaPct={leadsDelta.deltaPct}
                deltaLabel="vs 7 jours précédents"
              />
              <StatTile icon={<ArticleIcon />} label="Articles publiés" value={stats?.articles_published ?? 0} />
              <StatTile icon={<PencilIcon />} label="Brouillons" value={stats?.articles_draft ?? 0} />
            </div>

            <section className="admin-card admin-chart-card">
              <div className="admin-card__head">
                <h3>Évolution des leads</h3>
                <span className="admin-card__hint">14 derniers jours</span>
              </div>
              <LeadsTrendChart data={dailyLeads} />
            </section>

            <div className="admin-detail-grid">
              <section className="admin-card">
                <h3>Leads par domaine</h3>
                <BarRankingList items={domaineTop} emptyLabel="Aucun lead pour le moment." />
              </section>

              <section className="admin-card">
                <h3>Statut des articles</h3>
                <StatusStackBar
                  segments={[
                    { key: 'published', label: 'Publiés', value: insights.published, tone: 'good' },
                    { key: 'draft', label: 'Brouillons', value: insights.draft, tone: 'warning' },
                    { key: 'archived', label: 'Archivés', value: insights.archived, tone: 'neutral' },
                  ]}
                />
                <ul className="admin-mini-stats">
                  <li>
                    <StarIcon filled className="admin-mini-stats__icon" />
                    {insights.featured} article{insights.featured > 1 ? 's' : ''} en avant
                  </li>
                  <li>
                    <ClockIcon className="admin-mini-stats__icon" />
                    {insights.avgReadingTime} min de lecture en moyenne
                  </li>
                  <li>
                    <ArticleIcon className="admin-mini-stats__icon" />
                    {insights.totalWords.toLocaleString('fr-FR')} mots publiés au total
                  </li>
                </ul>
              </section>
            </div>
          </>
        )}

        {(tab === 'dashboard' || tab === 'leads') && (
          <section className="admin-card">
            <h3>Derniers leads</h3>
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Nom</th>
                    <th>Domaine</th>
                    <th>Heures</th>
                    <th>Contact</th>
                    <th>Statut</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="admin-table__row--clickable" onClick={() => setSelectedLead(lead)}>
                      <td data-label="Date">{new Date(lead.created_at).toLocaleDateString('fr-FR')}</td>
                      <td data-label="Nom">{lead.prenom} {lead.nom}<br /><small>{lead.reference}</small></td>
                      <td data-label="Domaine">{lead.domaine}</td>
                      <td data-label="Heures">{lead.heures_realisees}/507<br /><small>{lead.heures_besoins} restantes</small></td>
                      <td data-label="Contact">
                        <a href={`mailto:${lead.email}`} onClick={(event) => event.stopPropagation()}>{lead.email}</a>
                        <br />
                        <a href={`tel:${lead.telephone}`} onClick={(event) => event.stopPropagation()}>{lead.telephone}</a>
                      </td>
                      <td data-label="Statut">{lead.statut}</td>
                      <td data-label="Actions" className="admin-table__actions-cell">
                        <button
                          type="button"
                          className="admin-table__row-delete"
                          onClick={(event) => {
                            event.stopPropagation()
                            void deleteLead(lead)
                          }}
                          aria-label={`Supprimer le lead de ${lead.prenom} ${lead.nom}`}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} className="admin-empty">Aucun lead pour le moment.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === 'articles' && (
          <section className="admin-articles">
            <div className="admin-articles__toolbar">
              <div className="admin-filter-pills">
                {(['all', 'published', 'draft', 'archived'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={statusFilter === key ? 'is-active' : ''}
                    onClick={() => setStatusFilter(key)}
                  >
                    {key === 'all' ? `Tous (${articles.length})` : `${statusLabels[key]}s (${articles.filter((article) => article.status === key).length})`}
                  </button>
                ))}
              </div>
              <button type="button" className="admin-button--primary" onClick={() => openEditor()}>
                <PlusIcon />
                Nouvel article
              </button>
            </div>

            <div className="admin-article-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="admin-article-card">
                  <div className="admin-article-card__media">
                    {article.featured_image_url ? (
                      <img src={article.featured_image_url} alt={article.featured_image_alt || ''} loading="lazy" />
                    ) : (
                      <span className="admin-article-card__placeholder"><ImageIcon /></span>
                    )}
                    <span className={`admin-status-badge is-${statusTone[article.status]}`}>{statusLabels[article.status]}</span>
                    {article.is_featured && (
                      <span className="admin-article-card__featured" title="Article mis en avant">
                        <StarIcon filled />
                      </span>
                    )}
                  </div>
                  <div className="admin-article-card__body">
                    <span className="admin-article-card__tag"><TagIcon /> {article.category}</span>
                    <h4>{article.title || 'Sans titre'}</h4>
                    <p className="admin-article-card__meta">
                      <span><CalendarIcon /> {formatShortDate(article.updated_at ?? article.published_at)}</span>
                      {article.reading_time_minutes ? (
                        <span><ClockIcon /> {article.reading_time_minutes} min</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="admin-article-card__actions">
                    <button type="button" onClick={() => openEditor(article)}>
                      <PencilIcon />
                      Modifier
                    </button>
                    <button type="button" className="is-danger" onClick={() => void deleteArticle(article)}>
                      <TrashIcon />
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
              {filteredArticles.length === 0 && <p className="admin-empty">Aucun article dans cette catégorie.</p>}
            </div>
          </section>
        )}
      </section>
      </div>

      {isEditorOpen && (
        <div className="admin-modal-backdrop" onClick={() => closeEditor()}>
          <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-label={editing.id ? 'Modifier un article' : 'Créer un article'}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="admin-modal__header">
              <h3>{editing.id ? 'Modifier l’article' : 'Créer un article'}</h3>
              <button type="button" className="admin-modal__close" onClick={() => closeEditor()} aria-label="Fermer">
                <CloseIcon />
              </button>
            </header>

            <div className="admin-modal__body">
              <div className="admin-form-grid">
                <label>Titre<input value={editing.title} onChange={(event) => updateField('title', event.target.value)} /></label>
                <label>Slug<input value={editing.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} /></label>
                <label>SEO title<input value={editing.seo_title} onChange={(event) => updateField('seo_title', event.target.value)} /></label>
                <label>Meta description<textarea value={editing.meta_description} onChange={(event) => updateField('meta_description', event.target.value)} /></label>
                <label>Mot-clé principal<input value={editing.primary_keyword} onChange={(event) => updateField('primary_keyword', event.target.value)} /></label>
                <label>Intent SEO<input value={editing.search_intent} onChange={(event) => updateField('search_intent', event.target.value)} /></label>
                <label>Catégorie<input value={editing.category} onChange={(event) => updateField('category', event.target.value)} /></label>
                <label>Statut<select value={editing.status} onChange={(event) => updateField('status', event.target.value)}>
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select></label>
              </div>
              <label>Extrait<textarea value={editing.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} /></label>
              <label>Article Markdown<textarea className="admin-editor__content" value={editing.content_markdown} onChange={(event) => updateField('content_markdown', event.target.value)} /></label>
              <div
                className="admin-dropzone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  const file = event.dataTransfer.files[0]
                  if (file) void uploadCover(file)
                }}
              >
                <ImageIcon className="admin-dropzone__icon" />
                <strong>Glisser-déposer la couverture</strong>
                <span>Conversion WebP, renommage SEO et upload Supabase bucket blog-covers.</span>
                <input type="file" accept="image/*" onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) void uploadCover(file)
                }} />
              </div>
              {editing.featured_image_url && <img src={editing.featured_image_url} alt={editing.featured_image_alt || ''} className="admin-cover-preview" />}
              <label>Alt image de couverture<input value={editing.featured_image_alt ?? ''} onChange={(event) => updateField('featured_image_alt', event.target.value)} /></label>
              <label>Description image<textarea value={editing.featured_image_description ?? ''} onChange={(event) => updateField('featured_image_description', event.target.value)} /></label>
              <label>Mots-clés secondaires, un par ligne<textarea value={editing.secondaryKeywordsText} onChange={(event) => updateField('secondaryKeywordsText', event.target.value)} /></label>
              <label>FAQ SEO, format question|réponse<textarea value={editing.faqText} onChange={(event) => updateField('faqText', event.target.value)} /></label>
              <label>Liens internes, format label|/url<textarea value={editing.internalLinksText} onChange={(event) => updateField('internalLinksText', event.target.value)} /></label>
              <label>Sources, une URL par ligne<textarea value={editing.sourceUrlsText} onChange={(event) => updateField('sourceUrlsText', event.target.value)} /></label>
            </div>

            <footer className="admin-modal__footer">
              <label className="admin-checkbox"><input type="checkbox" checked={editing.is_featured} onChange={(event) => updateField('is_featured', event.target.checked)} /> Mettre en avant</label>
              <div className="admin-modal__footer-actions">
                {editing.id && (
                  <button type="button" className="admin-button--ghost is-danger" onClick={() => void deleteArticle(editing as AdminArticle)}>
                    <TrashIcon />
                    Supprimer
                  </button>
                )}
                <button type="button" className="admin-button--ghost" onClick={() => closeEditor()}>Annuler</button>
                <button type="button" className="admin-button--primary" onClick={() => void saveArticle()} disabled={loading}>
                  {loading ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {selectedLead && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div
            className="admin-modal admin-modal--lead"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedLead.prenom} ${selectedLead.nom}`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="admin-modal__header">
              <h3>{selectedLead.prenom} {selectedLead.nom}</h3>
              <button type="button" className="admin-modal__close" onClick={() => setSelectedLead(null)} aria-label="Fermer">
                <CloseIcon />
              </button>
            </header>

            <div className="admin-modal__body">
              <div className="admin-lead-actions">
                <a className="admin-button--primary" href={`tel:${selectedLead.telephone}`}>
                  <PhoneIcon />
                  Appeler {selectedLead.telephone}
                </a>
                <a className="admin-button--ghost" href={`mailto:${selectedLead.email}`}>
                  <MailIcon />
                  Répondre par email
                </a>
              </div>

              <dl className="admin-lead-details">
                <div>
                  <dt>Référence</dt>
                  <dd>{selectedLead.reference}</dd>
                </div>
                <div>
                  <dt>Statut</dt>
                  <dd>{selectedLead.statut}</dd>
                </div>
                <div>
                  <dt>Domaine</dt>
                  <dd>{selectedLead.domaine}</dd>
                </div>
                <div>
                  <dt>Profil</dt>
                  <dd>{selectedLead.profil || '—'}</dd>
                </div>
                <div>
                  <dt>Heures réalisées</dt>
                  <dd>{selectedLead.heures_realisees} / 507</dd>
                </div>
                <div>
                  <dt>Heures restantes</dt>
                  <dd>{selectedLead.heures_besoins}</dd>
                </div>
                <div>
                  <dt>Date anniversaire</dt>
                  <dd>{selectedLead.date_anniversaire ? formatShortDate(selectedLead.date_anniversaire) : '—'}</dd>
                </div>
                <div>
                  <dt>Reçu le</dt>
                  <dd>{new Date(selectedLead.created_at).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a></dd>
                </div>
                <div>
                  <dt>Téléphone</dt>
                  <dd><a href={`tel:${selectedLead.telephone}`}>{selectedLead.telephone}</a></dd>
                </div>
              </dl>
            </div>

            <footer className="admin-modal__footer">
              <button type="button" className="admin-button--ghost is-danger" onClick={() => void deleteLead(selectedLead)}>
                <TrashIcon />
                Supprimer ce lead
              </button>
              <button type="button" className="admin-button--ghost" onClick={() => setSelectedLead(null)}>Fermer</button>
            </footer>
          </div>
        </div>
      )}
    </main>
  )
}
