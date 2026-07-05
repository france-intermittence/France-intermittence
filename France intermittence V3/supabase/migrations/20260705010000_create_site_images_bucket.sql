-- Bucket public pour les images statiques du site (photos, logos partenaires,
-- icônes) : renommées en SEO-friendly puis migrées depuis les imports locaux
-- Vite vers ce bucket. Créé via l'API Storage (voir scripts/upload-site-images.mjs) ;
-- cette migration documente et rejoue la même définition pour rester alignée
-- avec le reste du schéma versionné.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  8388608,
  array['image/avif', 'image/png', 'image/svg+xml', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Site images are public" on storage.objects;
create policy "Site images are public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-images');
