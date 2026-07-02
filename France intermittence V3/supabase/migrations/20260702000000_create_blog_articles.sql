create table if not exists public.blog_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  seo_title text not null,
  meta_description text not null,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  search_intent text not null,
  alternate_seo_titles text[] not null default '{}',
  excerpt text not null,
  content_markdown text not null,
  category text not null default 'Formation',
  author_name text not null default 'France Intermittence',
  featured_image_url text,
  featured_image_description text,
  featured_image_alt text,
  secondary_images jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  internal_links jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_articles_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint blog_articles_title_length check (char_length(btrim(title)) between 10 and 180),
  constraint blog_articles_seo_title_length check (char_length(btrim(seo_title)) between 10 and 180),
  constraint blog_articles_meta_description_length check (char_length(btrim(meta_description)) between 120 and 170),
  constraint blog_articles_excerpt_length check (char_length(btrim(excerpt)) between 40 and 500),
  constraint blog_articles_content_not_empty check (char_length(btrim(content_markdown)) >= 100),
  constraint blog_articles_status_values check (status in ('draft', 'published', 'archived')),
  constraint blog_articles_publish_date check (status <> 'published' or published_at is not null),
  constraint blog_articles_secondary_images_array check (jsonb_typeof(secondary_images) = 'array'),
  constraint blog_articles_faq_array check (jsonb_typeof(faq) = 'array'),
  constraint blog_articles_internal_links_array check (jsonb_typeof(internal_links) = 'array')
);

create index if not exists blog_articles_publication_idx
  on public.blog_articles (status, published_at desc);

create index if not exists blog_articles_featured_idx
  on public.blog_articles (is_featured, published_at desc)
  where status = 'published';

create index if not exists blog_articles_category_idx
  on public.blog_articles (category);

create or replace function public.set_blog_articles_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_blog_articles_updated_at on public.blog_articles;
create trigger set_blog_articles_updated_at
before update on public.blog_articles
for each row
execute function public.set_blog_articles_updated_at();

alter table public.blog_articles enable row level security;

revoke all on table public.blog_articles from anon, authenticated;
grant select on table public.blog_articles to anon, authenticated;

drop policy if exists "Published blog articles are public" on public.blog_articles;
create policy "Published blog articles are public"
on public.blog_articles
for select
to anon, authenticated
using (
  status = 'published'
  and published_at is not null
  and published_at <= now()
);

comment on table public.blog_articles is
  'Articles SEO du blog France Intermittence. Les écritures sont réservées aux accès administrateur et service_role.';

comment on column public.blog_articles.content_markdown is
  'Article complet structuré avec un seul H1, plusieurs H2/H3 et les CTA éditoriaux.';

comment on column public.blog_articles.faq is
  'Liste JSON de questions/réponses au format [{"question":"...","answer":"..."}].';

comment on column public.blog_articles.internal_links is
  'Liste JSON de liens internes au format [{"label":"...","url":"/..."}].';
