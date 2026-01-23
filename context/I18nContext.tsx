/**
 * Internationalization Context - ENSPY Admin Portal
 * Gestion des langues (FR/EN)
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'fr' | 'en';

// Translations type
type TranslationKey = keyof typeof translations.fr;

const translations = {
    fr: {
        // Navigation
        nav_dashboard: 'Tableau de bord',
        nav_courses: 'Cours',
        nav_categories: 'Catégories',
        nav_ordering: 'Ordonnancement',
        nav_history: 'Historique',
        nav_settings: 'Paramètres',

        // Auth
        login_title: 'Connexion',
        login_subtitle: 'Accédez au portail administrateur',
        login_email: 'Email',
        login_password: 'Mot de passe',
        login_button: 'Se connecter',
        login_remember: 'Se souvenir de moi',
        logout: 'Déconnexion',

        // Dashboard
        dashboard_title: 'Tableau de bord',
        dashboard_welcome: 'Bienvenue',
        stats_total_courses: 'Total des cours',
        stats_published: 'Publiés',
        stats_draft: 'Brouillons',
        stats_views: 'Vues totales',
        stats_enrollments: 'Inscriptions',
        stats_trending: 'Tendances',
        stats_featured: 'À la une',

        // Courses
        courses_title: 'Gestion des cours',
        courses_found: 'cours trouvés',
        courses_new: 'Nouveau cours',
        courses_edit: 'Modifier',
        courses_delete: 'Supprimer',
        courses_archive: 'Archiver',
        courses_preview: 'Prévisualiser',
        courses_view_grid: 'Vue grille',
        courses_view_list: 'Vue liste',

        // Filters
        filter_search: 'Rechercher...',
        filter_all_status: 'Tous les statuts',
        filter_all_categories: 'Toutes les catégories',
        filter_all_levels: 'Tous les niveaux',
        filter_all_types: 'Tous les types',
        filter_all_formats: 'Tous les formats',

        // Status
        status_draft: 'Brouillon',
        status_published: 'Publié',
        status_scheduled: 'Programmé',
        status_archived: 'Archivé',

        // Levels
        level_beginner: 'Débutant',
        level_intermediate: 'Intermédiaire',
        level_expert: 'Expert',

        // Types
        type_free: 'Gratuit',
        type_paid: 'Payant',
        type_certified: 'Certifiant',

        // Categories
        categories_title: 'Gestion des catégories',
        categories_new: 'Nouvelle catégorie',
        categories_subcategories: 'sous-catégories',
        categories_courses: 'cours',

        // Ordering
        ordering_title: 'Ordonnancement des cours',
        ordering_subtitle: 'Gérez l\'ordre d\'affichage et les mises en vedette',

        // History
        history_title: 'Historique des modifications',
        history_activities: 'activités enregistrées',
        action_create: 'Création',
        action_update: 'Modification',
        action_delete: 'Suppression',
        action_archive: 'Archivage',
        action_publish: 'Publication',

        // Settings
        settings_title: 'Paramètres et Export',
        settings_subtitle: 'Gérez vos préférences et exportez vos données',
        settings_export_courses: 'Export des cours',
        settings_export_categories: 'Export des catégories',
        settings_export_activity: 'Export de l\'activité',
        settings_backup: 'Sauvegarde complète',
        settings_backup_download: 'Télécharger la sauvegarde',
        settings_data_management: 'Gestion des données',
        settings_reset: 'Réinitialiser les données',
        settings_reset_confirm: 'Êtes-vous sûr de vouloir réinitialiser toutes les données ?',
        settings_storage_info: 'Informations de stockage',

        // Theme
        theme_light: 'Mode clair',
        theme_dark: 'Mode sombre',

        // Language
        language: 'Langue',
        language_fr: 'Français',
        language_en: 'English',

        // Common
        save: 'Enregistrer',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        back: 'Retour',
        loading: 'Chargement...',
        no_results: 'Aucun résultat',
        per_page: 'par page',
        showing: 'Affichage',
    },
    en: {
        // Navigation
        nav_dashboard: 'Dashboard',
        nav_courses: 'Courses',
        nav_categories: 'Categories',
        nav_ordering: 'Ordering',
        nav_history: 'History',
        nav_settings: 'Settings',

        // Auth
        login_title: 'Login',
        login_subtitle: 'Access the administrator portal',
        login_email: 'Email',
        login_password: 'Password',
        login_button: 'Sign in',
        login_remember: 'Remember me',
        logout: 'Logout',

        // Dashboard
        dashboard_title: 'Dashboard',
        dashboard_welcome: 'Welcome',
        stats_total_courses: 'Total courses',
        stats_published: 'Published',
        stats_draft: 'Drafts',
        stats_views: 'Total views',
        stats_enrollments: 'Enrollments',
        stats_trending: 'Trending',
        stats_featured: 'Featured',

        // Courses
        courses_title: 'Course Management',
        courses_found: 'courses found',
        courses_new: 'New course',
        courses_edit: 'Edit',
        courses_delete: 'Delete',
        courses_archive: 'Archive',
        courses_preview: 'Preview',
        courses_view_grid: 'Grid view',
        courses_view_list: 'List view',

        // Filters
        filter_search: 'Search...',
        filter_all_status: 'All statuses',
        filter_all_categories: 'All categories',
        filter_all_levels: 'All levels',
        filter_all_types: 'All types',
        filter_all_formats: 'All formats',

        // Status
        status_draft: 'Draft',
        status_published: 'Published',
        status_scheduled: 'Scheduled',
        status_archived: 'Archived',

        // Levels
        level_beginner: 'Beginner',
        level_intermediate: 'Intermediate',
        level_expert: 'Expert',

        // Types
        type_free: 'Free',
        type_paid: 'Paid',
        type_certified: 'Certified',

        // Categories
        categories_title: 'Category Management',
        categories_new: 'New category',
        categories_subcategories: 'subcategories',
        categories_courses: 'courses',

        // Ordering
        ordering_title: 'Course Ordering',
        ordering_subtitle: 'Manage display order and featured courses',

        // History
        history_title: 'Activity History',
        history_activities: 'activities recorded',
        action_create: 'Created',
        action_update: 'Updated',
        action_delete: 'Deleted',
        action_archive: 'Archived',
        action_publish: 'Published',

        // Settings
        settings_title: 'Settings & Export',
        settings_subtitle: 'Manage your preferences and export data',
        settings_export_courses: 'Export courses',
        settings_export_categories: 'Export categories',
        settings_export_activity: 'Export activity',
        settings_backup: 'Full backup',
        settings_backup_download: 'Download backup',
        settings_data_management: 'Data management',
        settings_reset: 'Reset data',
        settings_reset_confirm: 'Are you sure you want to reset all data?',
        settings_storage_info: 'Storage information',

        // Theme
        theme_light: 'Light mode',
        theme_dark: 'Dark mode',

        // Language
        language: 'Language',
        language_fr: 'Français',
        language_en: 'English',

        // Common
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        back: 'Back',
        loading: 'Loading...',
        no_results: 'No results',
        per_page: 'per page',
        showing: 'Showing',
    },
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('fr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLocale = localStorage.getItem('locale') as Locale | null;
        if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
            setLocaleState(savedLocale);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: TranslationKey): string => {
        return translations[locale][key] || key;
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export { translations };
