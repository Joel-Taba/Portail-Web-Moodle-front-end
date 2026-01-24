# 📚 Guide du Projet ENSPY Courses Portal

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Technologies utilisées](#technologies-utilisées)
4. [Structure des dossiers](#structure-des-dossiers)
5. [Composants](#composants)
6. [Services API](#services-api)
7. [Types et interfaces](#types-et-interfaces)
8. [Styles et thème](#styles-et-thème)
9. [Pages](#pages)
10. [Configuration](#configuration)
11. [Bonnes pratiques](#bonnes-pratiques)

---

## Vue d'ensemble

Le **ENSPY Courses Portal** est une plateforme de présentation de cours en ligne pour l'École Nationale Supérieure Polytechnique de Yaoundé (ENSPY). Inspirée du design de FUN-MOOC, cette plateforme offre une expérience utilisateur moderne et intuitive.

### Objectifs principaux

- ✅ Convertir les visiteurs en apprenants intéressés
- ✅ Valoriser le contenu pédagogique existant
- ✅ Offrir une gestion simplifiée sans compétences techniques
- ✅ Optimiser la découverte des cours par les utilisateurs

### Fonctionnalités clés

- **En-tête héroïque** : Présentation percutante avec appel à l'action
- **Navigation thématique** : Filtrage par domaines d'apprentissage
- **Section "Cours tendances"** : Mise en avant des formations populaires
- **Système de filtrage avancé** : Recherche multicritères
- **Fiches de cours détaillées** : Vidéo, synopsis, objectifs, instructeur
- **Newsletter** : Inscription aux nouveautés par email
- **Design responsive** : Mobile, tablette et desktop

---

## Architecture du projet

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Pages     │  │  Components │  │       Styles        │ │
│  │  (App Dir)  │  │     (UI)    │  │   (CSS Modules)     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Types     │  │     Lib     │  │      Hooks          │ │
│  │(TypeScript) │  │  (API, Utils│  │    (React Custom)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                         API Layer                            │
│         (À connecter au backend - REST API)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technologies utilisées

| Technologie | Version | Description |
|-------------|---------|-------------|
| **Next.js** | 16.x | Framework React avec App Router |
| **React** | 19.x | Bibliothèque UI |
| **TypeScript** | 5.x | Typage statique |
| **CSS Modules** | - | Styles scopés par composant |
| **ESLint** | 9.x | Linting du code |

### Pourquoi ces choix ?

- **Next.js** : SSR/SSG pour le SEO, routing file-based, optimisations automatiques
- **TypeScript** : Meilleure maintenabilité, autocomplétion, détection d'erreurs
- **CSS Modules** : Pas de conflits de styles, performance optimale
- **Pas de Tailwind** : Plus de contrôle, design system personnalisé

---

## Structure des dossiers

```
enspy-courses-portal/
├── src/
│   ├── app/                      # Pages Next.js (App Router)
│   │   ├── layout.tsx            # Layout racine
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── page.module.css       # Styles de la page d'accueil
│   │   └── cours/                # Routes des cours
│   │       ├── page.tsx          # Liste des cours
│   │       └── [slug]/           # Détail d'un cours
│   │           └── page.tsx
│   │
│   ├── components/               # Composants React
│   │   ├── ui/                   # Composants UI génériques
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   ├── Skeleton/
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/               # Composants de mise en page
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── index.ts
│   │   │
│   │   └── courses/              # Composants spécifiques aux cours
│   │       ├── CourseCard/
│   │       ├── CourseFilters/
│   │       ├── CourseGrid/
│   │       └── index.ts
│   │
│   ├── lib/                      # Utilitaires et services
│   │   ├── api.ts                # Client API
│   │   ├── constants.ts          # Constantes globales
│   │   ├── hooks.ts              # Hooks personnalisés
│   │   └── utils.ts              # Fonctions utilitaires
│   │
│   ├── types/                    # Types TypeScript
│   │   └── index.ts
│   │
│   └── styles/                   # Styles globaux
│       └── globals.css           # Design system CSS
│
├── public/                       # Fichiers statiques
├── docs/                         # Documentation
│   ├── PROJECT_GUIDE.md          # Ce fichier
│   └── DEPLOYMENT_GUIDE.md       # Guide de déploiement
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Composants

### Composants UI (`/components/ui`)

#### Button
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg" href="/cours">
  Explorer les cours
</Button>
```

**Props disponibles :**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `icon`: ReactNode
- `href`: string (transforme en Link)

#### Card
```tsx
import { Card, CardImage, CardBody, CardFooter } from '@/components/ui';

<Card variant="elevated" clickable>
  <CardImage src="/image.jpg" alt="Course" />
  <CardBody>Contenu</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### Badge
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success" size="sm">Gratuit</Badge>
```

#### Skeleton
```tsx
import { CourseGridSkeleton } from '@/components/ui';

{loading && <CourseGridSkeleton count={6} />}
```

### Composants Layout (`/components/layout`)

#### Header
- Barre supérieure avec contacts et réseaux sociaux
- Logo et recherche
- Navigation principale (noir avec liens)
- Menu mobile responsive

#### Footer
- Information de contact
- Liens de navigation
- Newsletter
- Réseaux sociaux

### Composants Courses (`/components/courses`)

#### CourseCard
Carte de présentation d'un cours avec :
- Image avec overlay
- Badges (type, niveau, tendance)
- Titre et description
- Métadonnées (durée, inscrits)
- Instructeur

#### CourseFilters
Panneau de filtres latéral avec :
- Niveau (Débutant, Intermédiaire, Expert)
- Durée (0-2h, 2-5h, 5-10h, 10h+)
- Format (Vidéo, Texte, Exercices, Mixte)
- Type (Gratuit, Payant, Certifiant)
- Langue, Disponibilité, etc.

#### CourseGrid
Grille responsive de cartes de cours avec :
- Compteur de résultats
- Tri (Pertinence, Date, Popularité)
- Toggle vue grille/liste
- Pagination
- États vide et erreur

---

## Services API

### Structure du client API (`/lib/api.ts`)

```typescript
import { api } from '@/lib/api';

// Récupérer tous les cours avec filtres
const response = await api.courses.getAll(filters, page, limit);

// Récupérer un cours par slug
const course = await api.courses.getBySlug('introduction-programmation');

// Cours tendances
const trending = await api.courses.getTrending(6);

// Thématiques
const thematics = await api.thematics.getAll();

// Newsletter
await api.newsletter.subscribe('email@example.com');
```

### Endpoints API attendus

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/courses` | GET | Liste des cours avec filtres |
| `/api/courses/:slug` | GET | Détail d'un cours |
| `/api/courses/trending` | GET | Cours populaires |
| `/api/courses/featured` | GET | Cours mis en avant |
| `/api/thematics` | GET | Liste des thématiques |
| `/api/institutions` | GET | Liste des établissements |
| `/api/instructors` | GET | Liste des instructeurs |
| `/api/newsletter/subscribe` | POST | Inscription newsletter |

---

## Types et interfaces

### Course (Type principal)

```typescript
interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  synopsis: string;
  imageUrl: string;
  videoUrl?: string;
  duration: '0-2h' | '2-5h' | '5-10h' | '10h+';
  level: 'beginner' | 'intermediate' | 'expert';
  format: 'video' | 'text' | 'exercises' | 'mixed';
  language: 'fr' | 'en' | 'other';
  type: 'free' | 'paid' | 'certified';
  availability: 'available' | 'upcoming' | 'archived';
  objectives: string[];
  prerequisites: string[];
  syllabus: CourseSyllabus[];
  instructor: Instructor;
  institution: Institution;
  thematic: Thematic;
  enrollmentCount: number;
  rating: number;
  isTrending: boolean;
  tags: string[];
  createdAt: string;
}
```

### CourseFilters

```typescript
interface CourseFilters {
  search?: string;
  level?: CourseLevel[];
  duration?: CourseDuration[];
  format?: CourseFormat[];
  language?: CourseLanguage[];
  type?: CourseType[];
  availability?: CourseAvailability[];
  thematic?: string[];
  institution?: string[];
  instructor?: string[];
  sortBy?: SortOption;
}
```

---

## Styles et thème

### Design System (`/styles/globals.css`)

#### Couleurs principales

```css
--color-primary: #E65100;     /* Orange ENSPY */
--color-primary-light: #FF8A50;
--color-primary-dark: #AC1900;
--color-white: #FFFFFF;
--color-black: #000000;
--color-gray-900: #212121;    /* Texte principal */
```

#### Typographie

```css
--font-family-primary: 'Inter', sans-serif;
--font-family-heading: 'Outfit', sans-serif;
```

#### Espacements

```css
--spacing-4: 1rem;
--spacing-6: 1.5rem;
--spacing-8: 2rem;
```

#### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Pages

### Page d'accueil (`/`)

**Sections :**
1. **Hero** - Titre accrocheur, CTA, statistiques
2. **Thématiques** - Grille des domaines d'apprentissage
3. **Cours tendances** - Carousel/grille des cours populaires
4. **Fonctionnalités** - Avantages de la plateforme
5. **CTA Final** - Appel à l'action

### Page des cours (`/cours`)

**Éléments :**
- Header avec recherche
- Sidebar de filtres
- Grille de cours
- Pagination
- Tri et vue

### Page de détail (`/cours/[slug]`)

**Sections :**
- Hero avec infos principales
- Sidebar avec CTA et métadonnées
- Objectifs d'apprentissage
- Programme (syllabus)
- Profil de l'instructeur
- Cours recommandés

---

## Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### next.config.ts

```typescript
const nextConfig = {
  // Configuration images externes
  images: {
    domains: ['example.com'],
  },
};
```

---

## Bonnes pratiques

### Code

1. **Composants** : Un fichier par composant avec son CSS Module
2. **Types** : Toujours typer les props et les retours de fonction
3. **Imports** : Utiliser les alias (`@/components`, `@/lib`)
4. **État** : Préférer les hooks personnalisés

### Performance

1. **Images** : Utiliser le composant `next/image`
2. **Lazy loading** : Charger les composants lourds à la demande
3. **Pagination** : Limiter le nombre d'éléments par page (21)

### Accessibilité

1. **ARIA** : Ajouter les labels appropriés
2. **Focus** : Styles de focus visibles
3. **Couleurs** : Contraste suffisant (WCAG AA)
4. **Navigation** : Support clavier complet

---

## Prochaines étapes

### À faire pour la mise en production

1. [ ] Connecter l'API backend
2. [ ] Ajouter les images réelles des cours
3. [ ] Implémenter l'authentification (si nécessaire)
4. [ ] Ajouter les analytics
5. [ ] Optimiser les performances (Core Web Vitals)
6. [ ] Configurer le CDN pour les médias
7. [ ] Mettre en place le cache

### Améliorations futures

- [ ] Système de recommandation de cours
- [ ] Mode sombre
- [ ] Multilinguisme (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Notifications push

---

*Dernière mise à jour : 22 janvier 2026*
