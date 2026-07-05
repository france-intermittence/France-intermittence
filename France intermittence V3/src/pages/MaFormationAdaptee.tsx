import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { siteImages } from '../data/siteImages'
import { PageFaq } from '../components/PageFaq'
import { TrustBanner } from '../components/TrustBanner'
import { submitLead, type LeadData } from '../services/submitLead'
import { trackConversion } from '../lib/track'
import { formFaq } from '../data/seo'
import { siteConfig } from '../data/siteConfig'

const iconObjectif = siteImages.iconFormations
const iconGroupe = siteImages.iconGroupe
const iconTimer = siteImages.iconTimer

const badges = [
  { icon: iconObjectif, label: 'Objectif', sub: 'viser les 507 heures' },
  { icon: iconGroupe, label: 'Accompagnement', sub: 'personnalisé' },
  { icon: null, label: 'Prise en charge', sub: 'selon votre situation', euro: true },
  { icon: iconTimer, label: 'Réponse rapide', sub: 'après étude de votre demande' },
]

const domaines = [
  'Technique (son, lumière, vidéo...)',
  'Artistique (comédien, danseur, musicien...)',
  'Mise en scène / régie',
  'Cinéma / audiovisuel',
  'Production / administration',
  'Autre',
]


type FormErrors = Partial<Record<keyof LeadData, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Téléphone français plausible : chiffres et espaces, ~10 chiffres. */
function isPlausiblePhone(value: string): boolean {
  if (!/^[\d\s]+$/.test(value.trim())) return false
  const digits = value.replace(/\s/g, '')
  return digits.length === 10
}

/**
 * Normalise le paramètre d'URL `?profil=` vers une valeur connue.
 * Lecture seule : ne sert qu'à qualifier le lead, jamais à la validation.
 */
function readProfil(raw: string | null): LeadData['profil'] {
  if (raw === 'intermittent' || raw === 'devenir') return raw
  return undefined
}

function validate(form: LeadData): FormErrors {
  const errors: FormErrors = {}

  if (!form.nom.trim()) errors.nom = 'Veuillez indiquer votre nom.'
  if (!form.prenom.trim()) errors.prenom = 'Veuillez indiquer votre prénom.'
  if (form.heuresBesoins.trim() === '') errors.heuresBesoins = 'Veuillez indiquer vos heures restantes.'
  if (form.heuresRealisees.trim() === '') errors.heuresRealisees = 'Veuillez indiquer vos heures déjà réalisées.'
  if (!form.dateAnniversaire) errors.dateAnniversaire = 'Veuillez indiquer une date.'
  if (!form.domaine) errors.domaine = 'Veuillez sélectionner un domaine.'

  if (!form.telephone.trim()) {
    errors.telephone = 'Veuillez indiquer votre numéro de téléphone.'
  } else if (!isPlausiblePhone(form.telephone)) {
    errors.telephone = 'Numéro invalide (10 chiffres attendus, ex. : 06 12 34 56 78).'
  }

  if (!form.email.trim()) {
    errors.email = 'Veuillez indiquer votre e-mail.'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Adresse e-mail invalide.'
  }

  return errors
}

export function MaFormationAdaptee() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const profil = readProfil(searchParams.get('profil'))
  const totalHeures = 507

  const [form, setForm] = useState<LeadData>({
    nom: '',
    prenom: '',
    heuresBesoins: '',
    heuresRealisees: '',
    dateAnniversaire: '',
    domaine: '',
    telephone: '',
    email: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function clearError(name: keyof LeadData) {
    setErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target

    if (name === 'heuresBesoins') {
      const normalized = Math.min(Number(value), totalHeures)
      setForm((previous) => ({
        ...previous,
        heuresBesoins: value === '' ? '' : String(normalized),
        heuresRealisees: value === '' ? '' : String(totalHeures - normalized),
      }))
      clearError('heuresBesoins')
      clearError('heuresRealisees')
      return
    }

    if (name === 'heuresRealisees') {
      const normalized = Math.min(Number(value), totalHeures)
      setForm((previous) => ({
        ...previous,
        heuresRealisees: value === '' ? '' : String(normalized),
        heuresBesoins: value === '' ? '' : String(totalHeures - normalized),
      }))
      clearError('heuresBesoins')
      clearError('heuresRealisees')
      return
    }

    setForm((previous) => ({ ...previous, [name]: value }))
    clearError(name as keyof LeadData)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (submitting) return

    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Place le focus sur le premier champ en erreur pour l'accessibilité.
      const firstField = Object.keys(validationErrors)[0]
      document.getElementById(`mfa-${fieldToId(firstField)}`)?.focus()
      return
    }

    setErrors({})
    setSubmitError('')
    setSubmitting(true)

    try {
      // `profil` (issu du paramètre d'URL) qualifie le lead sans passer par le
      // formulaire ni la validation ; on l'ajoute uniquement à l'envoi.
      await submitLead(profil ? { ...form, profil } : form)
      trackConversion('lead_formation_adaptee', { domaine: form.domaine })
      navigate('/ma-formation-adaptee/confirmation')
    } catch {
      setSubmitError('Une erreur est survenue pendant l’envoi. Réessayez dans quelques instants ou contactez-nous par téléphone.')
      setSubmitting(false)
    }
  }

  return (
    <div className="mfa-page">
      <div className="mfa-hero">
        <h1 className="mfa-hero__title">Ma formation adaptée</h1>
        <div className="mfa-hero__underline" />
        <p className="mfa-hero__subtitle">
          Décrivez votre situation pour être orienté vers une formation cohérente avec votre métier, vos heures et votre objectif.
        </p>

        <div className="mfa-badges">
          {badges.map((badge) => (
            <div key={badge.label} className="mfa-badge">
              <div className="mfa-badge__icon">
                {badge.euro ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14.5 4A7 7 0 1 0 14.5 20" strokeLinecap="round" />
                    <path d="M5 9h8M5 15h8" strokeLinecap="round" />
                  </svg>
                ) : (
                  <img src={badge.icon!} alt="" loading="lazy" decoding="async" />
                )}
              </div>
              <div>
                <span className="mfa-badge__label">{badge.label}</span>
                <span className="mfa-badge__sub">{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mfa-form-wrap">
        <form className="mfa-form" onSubmit={handleSubmit} noValidate>
          <div className="mfa-form__row">
            <div className="mfa-form__field">
              <label htmlFor="mfa-nom">
                Nom <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                aria-required="true"
                aria-invalid={errors.nom ? true : undefined}
                aria-describedby={errors.nom ? 'mfa-nom-error' : undefined}
                className={errors.nom ? 'has-error' : undefined}
              />
              {errors.nom && (
                <p id="mfa-nom-error" className="mfa-form__error" role="alert">
                  {errors.nom}
                </p>
              )}
            </div>
            <div className="mfa-form__field">
              <label htmlFor="mfa-prenom">
                Prénom <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                aria-required="true"
                aria-invalid={errors.prenom ? true : undefined}
                aria-describedby={errors.prenom ? 'mfa-prenom-error' : undefined}
                className={errors.prenom ? 'has-error' : undefined}
              />
              {errors.prenom && (
                <p id="mfa-prenom-error" className="mfa-form__error" role="alert">
                  {errors.prenom}
                </p>
              )}
            </div>
          </div>

          <div className="mfa-form__row">
            <div className="mfa-form__field">
              <label htmlFor="mfa-heures-besoins">
                Heures restantes à réaliser <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-heures-besoins"
                name="heuresBesoins"
                value={form.heuresBesoins}
                onChange={handleChange}
                placeholder="Ex. : 300"
                type="number"
                min="0"
                max="507"
                aria-required="true"
                aria-invalid={errors.heuresBesoins ? true : undefined}
                aria-describedby={errors.heuresBesoins ? 'mfa-heures-besoins-error' : undefined}
                className={errors.heuresBesoins ? 'has-error' : undefined}
              />
              {errors.heuresBesoins && (
                <p id="mfa-heures-besoins-error" className="mfa-form__error" role="alert">
                  {errors.heuresBesoins}
                </p>
              )}
            </div>
            <div className="mfa-form__field">
              <label htmlFor="mfa-heures-realisees">
                Heures déjà réalisées <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-heures-realisees"
                name="heuresRealisees"
                value={form.heuresRealisees}
                onChange={handleChange}
                placeholder="Ex. : 120"
                type="number"
                min="0"
                max="507"
                aria-required="true"
                aria-invalid={errors.heuresRealisees ? true : undefined}
                aria-describedby={errors.heuresRealisees ? 'mfa-heures-realisees-error' : undefined}
                className={errors.heuresRealisees ? 'has-error' : undefined}
              />
              {errors.heuresRealisees && (
                <p id="mfa-heures-realisees-error" className="mfa-form__error" role="alert">
                  {errors.heuresRealisees}
                </p>
              )}
            </div>
          </div>

          <div className="mfa-form__row">
            <div className="mfa-form__field">
              <label htmlFor="mfa-date">
                Date d’anniversaire / renouvellement du statut <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-date"
                name="dateAnniversaire"
                value={form.dateAnniversaire}
                onChange={handleChange}
                type="date"
                aria-required="true"
                aria-invalid={errors.dateAnniversaire ? true : undefined}
                aria-describedby={errors.dateAnniversaire ? 'mfa-date-error' : undefined}
                className={errors.dateAnniversaire ? 'has-error' : undefined}
              />
              {errors.dateAnniversaire && (
                <p id="mfa-date-error" className="mfa-form__error" role="alert">
                  {errors.dateAnniversaire}
                </p>
              )}
            </div>
            <div className="mfa-form__field">
              <label htmlFor="mfa-domaine">
                Domaine d’activité <span className="mfa-form__required">*</span>
              </label>
              <select
                id="mfa-domaine"
                name="domaine"
                value={form.domaine}
                onChange={handleChange}
                className={`${form.domaine ? '' : 'is-placeholder'}${errors.domaine ? ' has-error' : ''}`.trim() || undefined}
                aria-required="true"
                aria-invalid={errors.domaine ? true : undefined}
                aria-describedby={errors.domaine ? 'mfa-domaine-error' : undefined}
              >
                <option value="">Sélectionnez votre domaine</option>
                {domaines.map((domaine) => (
                  <option key={domaine} value={domaine}>
                    {domaine}
                  </option>
                ))}
              </select>
              {errors.domaine && (
                <p id="mfa-domaine-error" className="mfa-form__error" role="alert">
                  {errors.domaine}
                </p>
              )}
            </div>
          </div>

          <div className="mfa-form__row">
            <div className="mfa-form__field">
              <label htmlFor="mfa-tel">
                Numéro de téléphone <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-tel"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
                type="tel"
                aria-required="true"
                aria-invalid={errors.telephone ? true : undefined}
                aria-describedby={errors.telephone ? 'mfa-tel-error' : undefined}
                className={errors.telephone ? 'has-error' : undefined}
              />
              {errors.telephone && (
                <p id="mfa-tel-error" className="mfa-form__error" role="alert">
                  {errors.telephone}
                </p>
              )}
            </div>
            <div className="mfa-form__field">
              <label htmlFor="mfa-email">
                E-mail <span className="mfa-form__required">*</span>
              </label>
              <input
                id="mfa-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre.email@exemple.fr"
                type="email"
                aria-required="true"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'mfa-email-error' : undefined}
                className={errors.email ? 'has-error' : undefined}
              />
              {errors.email && (
                <p id="mfa-email-error" className="mfa-form__error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="mfa-form__submit-error" role="alert">
              {submitError}
            </p>
          )}

          <button type="submit" className="mfa-form__submit" disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Envoi…' : 'Recevoir mon orientation gratuite'}
            {!submitting && (
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="mfa-form__reassurance">
            Gratuit et sans engagement · Réponse sous 24-48 h · 2 minutes ·{' '}
            <a href={siteConfig.phoneHref}>ou appelez le {siteConfig.phoneDisplay}</a>
          </p>
        </form>
      </div>

      <TrustBanner />
      <PageFaq title="Questions fréquentes avant d’envoyer votre demande" items={formFaq} />
    </div>
  )
}

/** Convertit un nom de champ (camelCase) vers le suffixe d'id utilisé dans le DOM. */
function fieldToId(field: string): string {
  switch (field) {
    case 'heuresBesoins':
      return 'heures-besoins'
    case 'heuresRealisees':
      return 'heures-realisees'
    case 'dateAnniversaire':
      return 'date'
    case 'telephone':
      return 'tel'
    default:
      return field
  }
}
