# 🚀 Guide de Déploiement - ENSPY Courses Portal

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation locale](#installation-locale)
3. [Configuration](#configuration)
4. [Développement](#développement)
5. [Build de production](#build-de-production)
6. [Options de déploiement](#options-de-déploiement)
7. [Intégration backend](#intégration-backend)
8. [Dépannage](#dépannage)

---

## Prérequis

### Logiciels requis

| Logiciel | Version minimale | Vérification |
|----------|------------------|--------------|
| Node.js | 18.x ou supérieur | `node --version` |
| npm | 9.x ou supérieur | `npm --version` |
| Git | 2.x | `git --version` |

### Installation de Node.js

**Windows :**
```bash
# Télécharger depuis https://nodejs.org/
# Ou utiliser Chocolatey
choco install nodejs-lts
```

**macOS :**
```bash
brew install node
```

**Linux (Ubuntu/Debian) :**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## Installation locale

### 1. Cloner ou accéder au projet

```bash
cd d:\MAGIE\BatchProj\enspy-courses-portal
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# URL de l'API backend
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# URL du site (pour les métadonnées)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

---

## Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL de base de l'API | `https://api.enspy-courses.cm` |
| `NEXT_PUBLIC_SITE_URL` | URL du site frontend | `https://courses.enspy-uy1.org` |

### Configuration Next.js

Le fichier `next.config.ts` contient les configurations principales :

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Domaines autorisés pour les images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.enspy-courses.cm',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // Redirections
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

## Développement

### Commandes disponibles

```bash
# Serveur de développement
npm run dev

# Vérification TypeScript
npx tsc --noEmit

# Linting
npm run lint

# Corriger les problèmes de lint
npm run lint -- --fix
```

### Structure de développement

1. **Modifier les styles** : `src/styles/globals.css`
2. **Ajouter un composant** : `src/components/[category]/[ComponentName]/`
3. **Créer une page** : `src/app/[route]/page.tsx`
4. **Ajouter un type** : `src/types/index.ts`

### Hot Reload

Le serveur de développement supporte le hot reload :
- Les modifications CSS sont appliquées instantanément
- Les modifications de composants rafraîchissent la page

---

## Build de production

### 1. Créer le build

```bash
npm run build
```

Cette commande :
- Compile TypeScript
- Optimise les assets
- Génère les pages statiques
- Crée le dossier `.next/`

### 2. Tester le build localement

```bash
npm start
```

### 3. Exporter en site statique (optionnel)

Si vous n'avez pas besoin de SSR :

```bash
# Ajouter dans next.config.ts
output: 'export'

# Puis builder
npm run build
```

Les fichiers seront dans le dossier `out/`

---

## Options de déploiement

### Option 1 : Vercel (Recommandé)

Vercel est la plateforme officielle de Next.js.

**Étapes :**

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre repository Git
3. Configurer les variables d'environnement
4. Déployer

```bash
# Ou via CLI
npm i -g vercel
vercel login
vercel
```

**Avantages :**
- Déploiement automatique à chaque push
- CDN global
- SSL automatique
- Preview deployments

### Option 2 : Serveur Node.js

Pour un serveur VPS ou dédié.

**Prérequis serveur :**
- Node.js 18+
- nginx ou Apache (reverse proxy)
- PM2 (process manager)

**Étapes :**

1. Transférer les fichiers sur le serveur :
```bash
rsync -avz --exclude node_modules --exclude .next ./ user@server:/var/www/enspy-portal/
```

2. Installer les dépendances et builder :
```bash
ssh user@server
cd /var/www/enspy-portal
npm install --production
npm run build
```

3. Configurer PM2 :
```bash
npm install -g pm2
pm2 start npm --name "enspy-portal" -- start
pm2 save
pm2 startup
```

4. Configurer nginx :
```nginx
server {
    listen 80;
    server_name courses.enspy-uy1.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. Activer SSL avec Certbot :
```bash
sudo certbot --nginx -d courses.enspy-uy1.org
```

### Option 3 : Docker

**Dockerfile :**

```dockerfile
FROM node:18-alpine AS base

# Installer les dépendances seulement si nécessaire
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Image de production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml :**

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=${API_URL}
      - NEXT_PUBLIC_SITE_URL=${SITE_URL}
    restart: unless-stopped
```

**Commandes :**
```bash
docker-compose build
docker-compose up -d
```

---

## Intégration backend

### Configuration de l'API

Le frontend s'attend à communiquer avec une API REST. Modifier `NEXT_PUBLIC_API_URL` dans `.env.local`.

### Endpoints requis

Le backend doit implémenter ces endpoints :

```
GET  /api/courses                    # Liste des cours
GET  /api/courses/:slug              # Détail d'un cours
GET  /api/courses/featured           # Cours mis en avant
GET  /api/courses/trending           # Cours populaires
GET  /api/courses/:id/related        # Cours similaires

GET  /api/thematics                  # Liste des thématiques
GET  /api/thematics/:slug            # Détail thématique
GET  /api/thematics/:slug/courses    # Cours d'une thématique

GET  /api/institutions               # Liste des établissements
GET  /api/instructors                # Liste des instructeurs

POST /api/newsletter/subscribe       # Inscription newsletter
```

### Format de réponse attendu

**Cours (liste paginée) :**
```json
{
  "data": [
    {
      "id": "1",
      "title": "Introduction à la programmation",
      "slug": "introduction-programmation",
      "description": "...",
      "imageUrl": "https://...",
      "duration": "2-5h",
      "level": "beginner",
      "format": "video",
      "type": "free",
      "instructor": {
        "id": "1",
        "firstName": "Jean",
        "lastName": "Dupont",
        "photoUrl": "https://..."
      },
      "institution": {
        "id": "1",
        "name": "ENSPY",
        "shortName": "ENSPY"
      },
      "enrollmentCount": 1500,
      "rating": 4.5
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 21,
  "totalPages": 5
}
```

### CORS

Le backend doit autoriser les requêtes depuis le frontend :

```javascript
// Express.js exemple
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
```

---

## Dépannage

### Problèmes courants

#### 1. Erreur "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

#### 2. Erreur de build TypeScript

```bash
npx tsc --noEmit
# Corriger les erreurs affichées
```

#### 3. Port 3000 déjà utilisé

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

#### 4. Erreur CORS avec l'API

Vérifier que :
- `NEXT_PUBLIC_API_URL` est correct
- Le backend autorise l'origine du frontend
- Les headers CORS sont bien configurés

#### 5. Images ne s'affichent pas

Vérifier `next.config.ts` pour les domaines autorisés :
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'votre-api.com',
    },
  ],
}
```

### Logs et debugging

**Développement :**
```bash
# Logs détaillés
DEBUG=* npm run dev
```

**Production :**
```bash
# Avec PM2
pm2 logs enspy-portal

# Docker
docker-compose logs -f web
```

### Support

Pour toute question ou problème :
- Email : infos@enspy-uy1.org
- Documentation Next.js : https://nextjs.org/docs

---

## Checklist de déploiement

### Avant le déploiement

- [ ] Toutes les variables d'environnement sont configurées
- [ ] Le build de production passe sans erreur
- [ ] Les tests manuels ont été effectués
- [ ] Les images et assets sont optimisés
- [ ] Le backend est accessible et fonctionnel

### Après le déploiement

- [ ] Le site est accessible via HTTPS
- [ ] Les redirections HTTP → HTTPS fonctionnent
- [ ] Les API répondent correctement
- [ ] Les formulaires fonctionnent (newsletter, recherche)
- [ ] Le responsive est vérifié sur mobile
- [ ] Les Core Web Vitals sont satisfaisants

---

*Dernière mise à jour : 22 janvier 2026*
