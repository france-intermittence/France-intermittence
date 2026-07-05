import emailjs from '@emailjs/browser'
import { siteImages } from '../data/siteImages'
import type { LeadData } from './submitLead'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const notificationTemplateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID
const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function getProfilLabel(profil: LeadData['profil']): string {
  if (profil === 'intermittent') return 'Intermittent du spectacle'
  if (profil === 'devenir') return 'Souhaite devenir intermittent'
  return 'Non renseigné'
}

export async function sendLeadEmails(data: LeadData, reference: string): Promise<void> {
  if (!serviceId || !notificationTemplateId || !autoReplyTemplateId || !publicKey) {
    console.error('Configuration EmailJS incomplète : les e-mails n’ont pas été envoyés.')
    return
  }

  const templateParams = {
    reference,
    nom: data.nom.trim(),
    prenom: data.prenom.trim(),
    telephone: data.telephone.trim(),
    email: data.email.trim().toLowerCase(),
    domaine: data.domaine,
    heures_besoins: data.heuresBesoins,
    heures_realisees: data.heuresRealisees,
    date_anniversaire: data.dateAnniversaire,
    profil: getProfilLabel(data.profil),
    logo_url: siteImages.logoOfficiel,
  }

  try {
    await emailjs.send(serviceId, notificationTemplateId, templateParams, { publicKey })
  } catch (error) {
    console.error('Échec de l’e-mail de notification interne.', error)
  }

  await new Promise((resolve) => window.setTimeout(resolve, 1100))

  try {
    await emailjs.send(serviceId, autoReplyTemplateId, templateParams, { publicKey })
  } catch (error) {
    console.error('Échec de l’e-mail de confirmation client.', error)
  }
}
