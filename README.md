# Terre de Victoire — site de l'église

Site de **Victory Outreach Ministry International — filiale de Lomé (Terre de Victoire)**.
Next.js 16 · React 19 · Tailwind CSS 4 · GSAP + Lenis. Entièrement en français, pensé d'abord pour le téléphone,
avec un thème clair (« Jour ») et un thème sombre (« Veillée »).

## Ce que fait le site

| Page | Contenu |
| --- | --- |
| `/` | Accueil : prochain culte + compte à rebours, programme de la semaine, vision, dernier culte, verset du jour, blog |
| `/eglise` | Vision, mission, pasteurs, ce que nous croyons, questions pour une première visite |
| `/direct` | Direct YouTube détecté automatiquement, rediffusions avec recherche et filtres |
| `/bible` | Bible Louis Segond 1910 complète : recherche (référence ou mots), verset du jour, surlignage, partage, mode nuit/sépia, reprise de lecture |
| `/galerie` | Photos de la vie de l'église, visionneuse plein écran utilisable au clavier |
| `/blog` | Nouvelles et articles gérés depuis l'administration |
| `/nous-trouver` | Carte interactive, distance depuis votre position, itinéraire Google Maps / Waze / Plans, formulaire de contact et de prière |
| `/admin` | Espace équipe : articles, galerie photo, réglages du site, messages reçus |

**Shalom**, la colombe du logo, guide les visiteurs de page en page (on peut la laisser se reposer).
Les cultes s'ajoutent à l'agenda du téléphone via `/api/agenda` (fichier .ics).

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis choisissez un ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

Sans base Redis, les articles, réglages et messages sont enregistrés dans `.data/` (ignoré par git).

## Mettre en ligne (Vercel recommandé)

1. Importez le dépôt sur [vercel.com](https://vercel.com).
2. **Storage → Upstash Redis** (offre gratuite) : les variables `UPSTASH_REDIS_REST_URL`/`TOKEN`
   (ou `KV_REST_API_URL`/`TOKEN`) sont reconnues automatiquement. **Indispensable sur Vercel**,
   sinon les modifications faites dans l'admin seraient perdues (un bandeau le rappelle dans l'admin).
3. Ajoutez `ADMIN_PASSWORD` et `NEXT_PUBLIC_SITE_URL`.
4. Facultatif : `YOUTUBE_API_KEY` (YouTube Data API v3, gratuite) pour plus de vidéos et une détection
   plus fine des directs. Sans clé, le site lit le flux public de la chaîne (15 dernières vidéos).

## Ajouter les photos de la galerie

Deux façons, au choix :

1. **Depuis l'administration** (`/admin/galerie`) : choisissez plusieurs photos d'un coup (celles de la page
   Facebook, par exemple), décrivez-les en quelques mots, réordonnez-les, enregistrez. Elles sont allégées
   automatiquement. La première photo s'affiche aussi en grand sur l'accueil.
2. **Dans le dépôt** : déposez des fichiers `.jpg` / `.webp` dans `public/images/galerie/`. Ils sont utilisés
   tant qu'aucune photo n'a été ajoutée depuis l'administration.

Tant que la galerie est vide, le site affiche des images des derniers cultes filmés et un lien vers Facebook.

## Design, animations et accessibilité

- **Charte** : `app/globals.css`. Les couleurs sont des variables (`--paper`, `--ink`, `--accent`…) définies
  pour le thème clair, le thème sombre (`[data-theme="dark"]`) et les sections sombres (`.on-dark`).
  La bande tissée (`components/ui/Weave.tsx`) est le fil conducteur visuel.
- **Thème** : bouton soleil/lune (`components/ui/ThemeToggle.tsx`). Par défaut le site suit le réglage du
  téléphone ; le choix est mémorisé.
- **Animations** : `components/motion/SmoothScroll.tsx` (Lenis) et `components/motion/ScrollFx.tsx` (GSAP
  ScrollTrigger + SplitText), pilotées par des attributs `data-reveal`, `data-split`, `data-parallax`,
  `data-words`, `data-clip`, `data-hscroll`… documentés en tête de `ScrollFx.tsx`.
- **Accessibilité** : si le système demande de réduire les animations, ni Lenis ni GSAP ne démarrent et tout le
  contenu est visible d'emblée. Contrastes vérifiés dans les deux thèmes, navigation complète au clavier,
  lien d'évitement, focus visible, cibles tactiles de 44 px, textes alternatifs sur les photos.

## À compléter depuis `/admin/reglages`

- **TikTok / Instagram / WhatsApp** : liens à coller (vides = masqués).
- **Noms et présentations des pasteurs** (les photos sont déjà en place).
- **Adresse précise et coordonnées GPS** de l'église (la carte utilise pour l'instant un point dans Lomé).
- **Téléphone et e-mail** de contact.
- Horaires des cultes si besoin.

## Pour les développeurs

```bash
npm run lint
npm test          # tests unitaires (analyse YouTube, rendu Markdown sécurisé)
npm run build
```

- `lib/store.ts` : stockage clé → JSON (Upstash REST ou fichiers).
- `lib/youtube.ts` : directs et rediffusions (API ou flux RSS + page `/live`).
- `data/bible/lsg.json` : Louis Segond 1910 (domaine public), généré par `scripts/build-bible.mjs`.
- `proxy.ts` : protège `/admin` (session signée HMAC) ; chaque action serveur revérifie la session.
- Couleurs de la charte (tirées du logo) dans `app/globals.css` (`@theme`).
