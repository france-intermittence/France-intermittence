import { supabase } from '../lib/supabase'

export type BlogFaqItem = {
  question: string
  answer: string
}

export type BlogInternalLink = {
  label: string
  url: string
}

export type BlogArticle = {
  id: string
  slug: string
  title: string
  seo_title: string
  meta_description: string
  primary_keyword: string
  secondary_keywords: string[]
  excerpt: string
  content_markdown: string
  category: string
  author_name: string
  featured_image_url: string | null
  featured_image_alt: string | null
  faq: BlogFaqItem[]
  internal_links: BlogInternalLink[]
  source_urls: string[]
  word_count: number | null
  reading_time_minutes: number | null
  is_featured: boolean
  published_at: string
}

const articleColumns = [
  'id',
  'slug',
  'title',
  'seo_title',
  'meta_description',
  'primary_keyword',
  'secondary_keywords',
  'excerpt',
  'content_markdown',
  'category',
  'author_name',
  'featured_image_url',
  'featured_image_alt',
  'faq',
  'internal_links',
  'source_urls',
  'word_count',
  'reading_time_minutes',
  'is_featured',
  'published_at',
].join(',')

export async function getPublishedBlogArticles(): Promise<BlogArticle[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select(articleColumns)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  if (error) throw new Error('Impossible de charger les articles.', { cause: error })
  return (data ?? []) as unknown as BlogArticle[]
}

export async function getPublishedBlogArticle(slug: string): Promise<BlogArticle | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select(articleColumns)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw new Error('Impossible de charger cet article.', { cause: error })
  return data as unknown as BlogArticle | null
}
