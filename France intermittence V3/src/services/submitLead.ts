import { supabase } from '../lib/supabase'
import { sendLeadEmails } from './sendLeadEmails'

export type LeadData = {
  nom: string
  prenom: string
  heuresBesoins: string
  heuresRealisees: string
  dateAnniversaire: string
  domaine: string
  telephone: string
  email: string
  profil?: 'intermittent' | 'devenir'
}

export type SubmitLeadResult = {
  success: true
  reference: string
}

function createLeadReference(): string {
  const suffix = crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()
  return `FI-${suffix}`
}

export async function submitLead(data: LeadData): Promise<SubmitLeadResult> {
  const reference = createLeadReference()
  const { error } = await supabase.from('leads').insert({
    reference,
    nom: data.nom.trim(),
    prenom: data.prenom.trim(),
    heures_besoins: Number(data.heuresBesoins),
    heures_realisees: Number(data.heuresRealisees),
    date_anniversaire: data.dateAnniversaire,
    domaine: data.domaine,
    telephone: data.telephone.trim(),
    email: data.email.trim().toLowerCase(),
    profil: data.profil ?? null,
  })

  if (error) {
    throw new Error('La demande n’a pas pu être enregistrée.', { cause: error })
  }

  await sendLeadEmails(data, reference)

  return { success: true, reference }
}
