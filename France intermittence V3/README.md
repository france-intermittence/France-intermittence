# France Intermittence

Site React/Vite de France Intermittence avec enregistrement des demandes dans Supabase.

## Développement local

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur `http://127.0.0.1:5173/` lorsque Vite est lancé avec `--host 127.0.0.1`.

## Configuration Supabase

Copier `.env.example` vers `.env.local`, puis renseigner :

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Ces deux variables doivent aussi être définies dans l’hébergeur de production. La clé `service_role` et les tokens personnels Supabase ne doivent jamais être placés dans une variable `VITE_*`, dans le dépôt ou dans du code exécuté par le navigateur.

La migration de la table `leads` se trouve dans `supabase/migrations/20260701000000_create_leads.sql`. Elle active RLS, autorise uniquement l’insertion publique des champs du formulaire et interdit la lecture publique.

## Vérifications

```bash
npm run lint
npm run build
```
