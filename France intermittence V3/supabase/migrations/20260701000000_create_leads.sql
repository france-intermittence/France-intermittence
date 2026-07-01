create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  nom text not null,
  prenom text not null,
  heures_besoins smallint not null,
  heures_realisees smallint not null,
  date_anniversaire date not null,
  domaine text not null,
  telephone text not null,
  email text not null,
  profil text,
  statut text not null default 'nouveau',
  source text not null default 'website',
  created_at timestamptz not null default now(),
  constraint leads_reference_format check (reference ~ '^FI-[A-Z0-9]{10}$'),
  constraint leads_nom_length check (char_length(btrim(nom)) between 1 and 100),
  constraint leads_prenom_length check (char_length(btrim(prenom)) between 1 and 100),
  constraint leads_heures_besoins_range check (heures_besoins between 0 and 507),
  constraint leads_heures_realisees_range check (heures_realisees between 0 and 507),
  constraint leads_heures_total check (heures_besoins + heures_realisees = 507),
  constraint leads_domaine_length check (char_length(btrim(domaine)) between 1 and 150),
  constraint leads_telephone_length check (char_length(btrim(telephone)) between 10 and 30),
  constraint leads_email_format check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint leads_profil_values check (profil is null or profil in ('intermittent', 'devenir')),
  constraint leads_statut_values check (statut in ('nouveau', 'contacte', 'qualifie', 'archive')),
  constraint leads_source_website check (source = 'website')
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_statut_idx on public.leads (statut);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert (
  reference,
  nom,
  prenom,
  heures_besoins,
  heures_realisees,
  date_anniversaire,
  domaine,
  telephone,
  email,
  profil
) on table public.leads to anon;

drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
on public.leads
for insert
to anon
with check (
  statut = 'nouveau'
  and source = 'website'
  and char_length(btrim(nom)) between 1 and 100
  and char_length(btrim(prenom)) between 1 and 100
  and heures_besoins between 0 and 507
  and heures_realisees between 0 and 507
  and heures_besoins + heures_realisees = 507
  and char_length(btrim(domaine)) between 1 and 150
  and char_length(btrim(telephone)) between 10 and 30
  and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  and (profil is null or profil in ('intermittent', 'devenir'))
);

comment on table public.leads is 'Demandes envoyées depuis le formulaire Ma formation adaptée.';
