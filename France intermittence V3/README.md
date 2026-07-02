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

## Configuration EmailJS

Le formulaire envoie deux e-mails après l’enregistrement Supabase : une notification interne et une confirmation au client.

```dotenv
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID=your-notification-template-id
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your-autoreply-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

Les templates reçoivent les variables `reference`, `nom`, `prenom`, `telephone`, `email`, `domaine`, `heures_besoins`, `heures_realisees`, `date_anniversaire`, `profil` et `logo_url`. L’URL du logo est générée depuis le domaine qui héberge le site ; elle ne sera donc accessible dans les e-mails qu’une fois le site publié sur une URL HTTPS publique.

## Vérifications

```bash
npm run lint
npm run build
```

## Déploiement Netlify

Le fichier `netlify.toml` placé à la racine du dépôt configure automatiquement :

- le répertoire de base : `France intermittence V3` ;
- la commande de build : `npm run build` ;
- le dossier publié : `dist` ;
- le fallback SPA vers `index.html` pour les routes React Router.

Les variables suivantes doivent être définies dans **Netlify > Site configuration > Environment variables** :

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Ne jamais ajouter une clé Supabase `service_role` ou un token personnel dans Netlify sous un nom `VITE_*`.
