create extension if not exists pgcrypto;

-- Mesure d'audience anonyme : pages vues et clics sur les CTA de conversion
-- (appel téléphonique, être rappelé, email). Aucune donnée personnelle ni
-- identifiant visiteur n'est stocké — uniquement le type d'événement, la
-- page et un court libellé. Écriture publique (anon), lecture réservée au
-- backend admin via la clé service_role (RLS bloque toute lecture publique).
create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_name text not null,
  page text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint site_events_type_values check (event_type in ('page_view', 'click')),
  constraint site_events_name_length check (char_length(event_name) between 1 and 80),
  constraint site_events_page_length check (char_length(page) between 1 and 300)
);

create index if not exists site_events_created_at_idx on public.site_events (created_at desc);
create index if not exists site_events_name_idx on public.site_events (event_name);
create index if not exists site_events_type_idx on public.site_events (event_type);

alter table public.site_events enable row level security;

revoke all on table public.site_events from anon, authenticated;
grant insert (event_type, event_name, page, metadata) on table public.site_events to anon;

drop policy if exists "Public can log site events" on public.site_events;
create policy "Public can log site events"
on public.site_events
for insert
to anon
with check (
  event_type in ('page_view', 'click')
  and char_length(event_name) between 1 and 80
  and char_length(page) between 1 and 300
);

comment on table public.site_events is 'Événements anonymes de mesure d''audience (pages vues, clics sur CTA) — écriture publique seule, lecture réservée au backend admin via la clé service_role.';
