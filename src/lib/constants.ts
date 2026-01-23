/* ============================================
   ENSPY COURSES PORTAL - Constants
   ============================================ */

import { FilterOption } from '@/types';

// ============ API Configuration ============

export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9080/api',
    timeout: 10000,
    defaultLimit: 21,
};

// ============ Site Configuration ============

export const SITE_CONFIG = {
    name: 'ENSPY Courses Portal',
    shortName: 'ENSPY Courses',
    description: 'Plateforme de présentation des cours de l\'École Nationale Supérieure Polytechnique de Yaoundé',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    institution: {
        name: 'École Nationale Supérieure Polytechnique de Yaoundé',
        shortName: 'ENSPY',
        englishName: 'National Advanced School of Engineering of Yaounde',
        address: 'B.P. 8390 Yaoundé, Cameroun',
        phone: '+237 222 22 45 47',
        email: 'infos@enspy-uy1.org',
        website: 'https://www.enspy-uy1.org',
    },
    social: {
        facebook: 'https://www.facebook.com/ENSPY',
        twitter: 'https://x.com/ENSPolytech_UY1',
        minesup: 'https://www.minesup.gov.cm/',
        webmail: 'https://mail.enspy-uy1.org/roundcube/',
    },
};

// ============ Navigation ============

export const MAIN_NAVIGATION = [
    { label: 'Accueil', href: '/' },
    { label: 'Cours', href: '/cours' },
    { label: 'Thématiques', href: '/thematiques' },
    { label: 'Établissements', href: '/etablissements' },
    { label: 'À propos', href: '/a-propos' },
];

export const FOOTER_NAVIGATION = {
    explore: [
        { label: 'Tous les cours', href: '/cours' },
        { label: 'Cours tendances', href: '/cours?sort=popular' },
        { label: 'Nouveaux cours', href: '/cours?sort=newest' },
        { label: 'Thématiques', href: '/thematiques' },
    ],
    about: [
        { label: 'À propos de ENSPY', href: '/a-propos' },
        { label: 'Nos instructeurs', href: '/instructeurs' },
        { label: 'Établissements partenaires', href: '/etablissements' },
        { label: 'FAQ', href: '/faq' },
    ],
    legal: [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'Politique de confidentialité', href: '/confidentialite' },
        { label: 'Conditions d\'utilisation', href: '/cgu' },
        { label: 'Accessibilité', href: '/accessibilite' },
    ],
    contact: [
        { label: 'Nous contacter', href: '/contact' },
        { label: 'Support', href: '/support' },
        { label: 'Plateforme e-learning', href: SITE_CONFIG.institution.website },
    ],
};

// ============ Filter Options ============

export const LEVEL_OPTIONS: FilterOption[] = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'expert', label: 'Expert' },
];

export const DURATION_OPTIONS: FilterOption[] = [
    { value: '0-2h', label: '0-2 heures' },
    { value: '2-5h', label: '2-5 heures' },
    { value: '5-10h', label: '5-10 heures' },
    { value: '10h+', label: 'Plus de 10 heures' },
];

export const FORMAT_OPTIONS: FilterOption[] = [
    { value: 'video', label: 'Vidéo' },
    { value: 'text', label: 'Texte' },
    { value: 'exercises', label: 'Exercices' },
    { value: 'mixed', label: 'Mixte' },
];

export const LANGUAGE_OPTIONS: FilterOption[] = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'other', label: 'Autre' },
];

export const TYPE_OPTIONS: FilterOption[] = [
    { value: 'free', label: 'Gratuit' },
    { value: 'paid', label: 'Payant' },
    { value: 'certified', label: 'Certifiant' },
];

export const AVAILABILITY_OPTIONS: FilterOption[] = [
    { value: 'available', label: 'Disponible maintenant' },
    { value: 'upcoming', label: 'À venir' },
    { value: 'archived', label: 'Archivé' },
];

export const DATE_ADDED_OPTIONS: FilterOption[] = [
    { value: '7days', label: '7 derniers jours' },
    { value: '30days', label: '30 derniers jours' },
    { value: '90days', label: '90 derniers jours' },
];

export const SORT_OPTIONS: FilterOption[] = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'oldest', label: 'Plus anciens' },
    { value: 'popular', label: 'Plus populaires' },
    { value: 'rating', label: 'Mieux notés' },
    { value: 'title-asc', label: 'Titre (A-Z)' },
    { value: 'title-desc', label: 'Titre (Z-A)' },
];

// ============ Default Thematics ============

export const DEFAULT_THEMATICS = [
    {
        id: 'informatique',
        name: 'Informatique & Numérique',
        slug: 'informatique',
        iconName: 'computer',
        color: '#2196F3',
    },
    {
        id: 'genie-civil',
        name: 'Génie Civil',
        slug: 'genie-civil',
        iconName: 'building',
        color: '#795548',
    },
    {
        id: 'genie-electrique',
        name: 'Génie Électrique',
        slug: 'genie-electrique',
        iconName: 'bolt',
        color: '#FFC107',
    },
    {
        id: 'genie-mecanique',
        name: 'Génie Mécanique',
        slug: 'genie-mecanique',
        iconName: 'settings',
        color: '#607D8B',
    },
    {
        id: 'genie-industriel',
        name: 'Génie Industriel',
        slug: 'genie-industriel',
        iconName: 'factory',
        color: '#9C27B0',
    },
    {
        id: 'mathematiques',
        name: 'Mathématiques',
        slug: 'mathematiques',
        iconName: 'calculate',
        color: '#4CAF50',
    },
    {
        id: 'physique',
        name: 'Physique',
        slug: 'physique',
        iconName: 'science',
        color: '#3F51B5',
    },
    {
        id: 'chimie',
        name: 'Chimie',
        slug: 'chimie',
        iconName: 'biotech',
        color: '#E91E63',
    },
];

// ============ Pagination ============

export const PAGINATION = {
    defaultLimit: 21,
    limitOptions: [12, 21, 42, 84],
};

// ============ SEO ============

export const SEO_CONFIG = {
    defaultTitle: SITE_CONFIG.name,
    titleTemplate: `%s | ${SITE_CONFIG.shortName}`,
    defaultDescription: SITE_CONFIG.description,
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        handle: '@enspy_uy1',
        site: '@enspy_uy1',
        cardType: 'summary_large_image',
    },
};

// ============ UI Constants ============

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export const ANIMATION_DURATION = {
    fast: 150,
    normal: 300,
    slow: 500,
};
