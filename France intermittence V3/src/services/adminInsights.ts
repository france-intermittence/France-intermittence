import type { AdminArticle, AdminEvent, AdminLead } from './adminApi'

export type DayBucket = { date: Date; count: number }

const EVENT_LABELS: Record<string, string> = {
  call_click: 'Clic sur appeler',
  callback_click: 'Clic sur être rappelé',
  email_click: 'Clic sur email',
  page_view: 'Page vue',
}

export function eventLabel(name: string): string {
  return EVENT_LABELS[name] ?? name
}

export function bucketEventsByDay(events: AdminEvent[], days = 14, eventName?: string): DayBucket[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const buckets: DayBucket[] = []

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    buckets.push({ date, count: 0 })
  }

  const start = buckets[0].date.getTime()
  const filtered = eventName ? events.filter((event) => event.event_name === eventName) : events

  filtered.forEach((event) => {
    const created = new Date(event.created_at)
    created.setHours(0, 0, 0, 0)
    const diffDays = Math.round((created.getTime() - start) / 86_400_000)
    if (diffDays >= 0 && diffDays < buckets.length) {
      buckets[diffDays].count += 1
    }
  })

  return buckets
}

export function topEventNames(events: AdminEvent[], limit = 6) {
  const counts = new Map<string, number>()

  events.forEach((event) => {
    counts.set(event.event_name, (counts.get(event.event_name) ?? 0) + 1)
  })

  return [...counts.entries()]
    .map(([name, count]) => ({ name, label: eventLabel(name), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function topPagesByClicks(events: AdminEvent[], limit = 6) {
  const counts = new Map<string, number>()

  events
    .filter((event) => event.event_type === 'click')
    .forEach((event) => {
      const key = event.page || 'Inconnue'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })

  return [...counts.entries()]
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function clickThroughRate(events: AdminEvent[]) {
  const pageViews = events.filter((event) => event.event_type === 'page_view').length
  const conversions = events.filter((event) => event.event_name === 'call_click' || event.event_name === 'callback_click').length
  const ratePct = pageViews === 0 ? 0 : Math.round((conversions / pageViews) * 1000) / 10

  return { pageViews, conversions, ratePct }
}

export function bucketLeadsByDay(leads: AdminLead[], days = 14): DayBucket[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const buckets: DayBucket[] = []

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    buckets.push({ date, count: 0 })
  }

  const start = buckets[0].date.getTime()

  leads.forEach((lead) => {
    const created = new Date(lead.created_at)
    created.setHours(0, 0, 0, 0)
    const diffDays = Math.round((created.getTime() - start) / 86_400_000)
    if (diffDays >= 0 && diffDays < buckets.length) {
      buckets[diffDays].count += 1
    }
  })

  return buckets
}

export function topDomaines(leads: AdminLead[], limit = 6) {
  const counts = new Map<string, number>()

  leads.forEach((lead) => {
    const key = lead.domaine?.trim() || 'Non renseigné'
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function articleInsights(articles: AdminArticle[]) {
  const published = articles.filter((article) => article.status === 'published').length
  const draft = articles.filter((article) => article.status === 'draft').length
  const archived = articles.filter((article) => article.status === 'archived').length
  const featured = articles.filter((article) => article.is_featured).length
  const totalWords = articles.reduce((sum, article) => sum + (article.word_count ?? 0), 0)
  const readingTimes = articles.map((article) => article.reading_time_minutes ?? 0).filter(Boolean)
  const avgReadingTime = readingTimes.length
    ? Math.round(readingTimes.reduce((sum, minutes) => sum + minutes, 0) / readingTimes.length)
    : 0

  return { published, draft, archived, featured, totalWords, avgReadingTime, total: articles.length }
}

export function leadsPeriodDelta(leads: AdminLead[]) {
  const now = Date.now()
  const sevenDays = 7 * 86_400_000
  const current = leads.filter((lead) => now - new Date(lead.created_at).getTime() < sevenDays).length
  const previous = leads.filter((lead) => {
    const diff = now - new Date(lead.created_at).getTime()
    return diff >= sevenDays && diff < sevenDays * 2
  }).length
  const deltaPct = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100)

  return { current, previous, deltaPct }
}
