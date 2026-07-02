alter table public.blog_articles
  add column if not exists source_urls text[] not null default '{}',
  add column if not exists word_count integer,
  add column if not exists reading_time_minutes smallint;

alter table public.blog_articles
  drop constraint if exists blog_articles_word_count_minimum,
  add constraint blog_articles_word_count_minimum
    check (word_count is null or word_count >= 1300),
  drop constraint if exists blog_articles_reading_time_positive,
  add constraint blog_articles_reading_time_positive
    check (reading_time_minutes is null or reading_time_minutes > 0);

comment on column public.blog_articles.source_urls is
  'URLs institutionnelles vérifiées utilisées comme sources de l’article.';

comment on column public.blog_articles.word_count is
  'Nombre de mots du contenu éditorial hors balises HTML.';
