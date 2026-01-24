/**
 * ENSPY Admin Portal - Utilitaires de stockage
 * Gestion du localStorage pour la persistance des données
 */

const STORAGE_KEYS = {
    AUTH: 'enspy_auth',
    COURSES: 'enspy_courses',
    CATEGORIES: 'enspy_categories',
    ACTIVITY_LOG: 'enspy_activity_log',
    SETTINGS: 'enspy_settings',
} as const;

/**
 * Vérifie si le localStorage est disponible
 */
function isStorageAvailable(): boolean {
    try {
        const test = '__storage_test__';
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
}

/**
 * Récupère une valeur du localStorage
 */
export function getStorageItem<T>(key: string): T | null {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available');
        return null;
    }

    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error reading from localStorage: ${key}`, error);
        return null;
    }
}

/**
 * Stocke une valeur dans le localStorage
 */
export function setStorageItem<T>(key: string, value: T): boolean {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage: ${key}`, error);
        return false;
    }
}

/**
 * Supprime une valeur du localStorage
 */
export function removeStorageItem(key: string): boolean {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }

    try {
        window.localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage: ${key}`, error);
        return false;
    }
}

/**
 * Efface toutes les données ENSPY du localStorage
 */
export function clearAllStorage(): boolean {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available');
        return false;
    }

    try {
        Object.values(STORAGE_KEYS).forEach((key) => {
            window.localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing localStorage', error);
        return false;
    }
}

// ============================================
// Fonctions spécifiques par domaine
// ============================================

import type { User, Course, Category, ActivityLog } from './types';

/**
 * Authentification
 */
export const authStorage = {
    getUser: (): User | null => getStorageItem<User>(STORAGE_KEYS.AUTH),
    setUser: (user: User): boolean => setStorageItem(STORAGE_KEYS.AUTH, user),
    clearUser: (): boolean => removeStorageItem(STORAGE_KEYS.AUTH),
};

/**
 * Cours
 */
export const coursesStorage = {
    getAll: (): Course[] => getStorageItem<Course[]>(STORAGE_KEYS.COURSES) || [],
    setAll: (courses: Course[]): boolean => setStorageItem(STORAGE_KEYS.COURSES, courses),

    getById: (id: string): Course | null => {
        const courses = coursesStorage.getAll();
        return courses.find((c) => c.id === id) || null;
    },

    add: (course: Course): boolean => {
        const courses = coursesStorage.getAll();
        courses.push(course);
        return coursesStorage.setAll(courses);
    },

    update: (id: string, updates: Partial<Course>): boolean => {
        const courses = coursesStorage.getAll();
        const index = courses.findIndex((c) => c.id === id);
        if (index === -1) return false;
        courses[index] = { ...courses[index], ...updates, updatedAt: new Date().toISOString() };
        return coursesStorage.setAll(courses);
    },

    delete: (id: string): boolean => {
        const courses = coursesStorage.getAll();
        const filtered = courses.filter((c) => c.id !== id);
        return coursesStorage.setAll(filtered);
    },

    reorder: (orderedIds: string[]): boolean => {
        const courses = coursesStorage.getAll();
        const reordered = orderedIds.map((id, index) => {
            const course = courses.find((c) => c.id === id);
            if (course) {
                return { ...course, order: index };
            }
            return null;
        }).filter(Boolean) as Course[];
        return coursesStorage.setAll(reordered);
    },
};

/**
 * Catégories
 */
export const categoriesStorage = {
    getAll: (): Category[] => getStorageItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [],
    setAll: (categories: Category[]): boolean => setStorageItem(STORAGE_KEYS.CATEGORIES, categories),

    getById: (id: string): Category | null => {
        const categories = categoriesStorage.getAll();
        return categories.find((c) => c.id === id) || null;
    },

    add: (category: Category): boolean => {
        const categories = categoriesStorage.getAll();
        categories.push(category);
        return categoriesStorage.setAll(categories);
    },

    update: (id: string, updates: Partial<Category>): boolean => {
        const categories = categoriesStorage.getAll();
        const index = categories.findIndex((c) => c.id === id);
        if (index === -1) return false;
        categories[index] = { ...categories[index], ...updates, updatedAt: new Date().toISOString() };
        return categoriesStorage.setAll(categories);
    },

    delete: (id: string): boolean => {
        const categories = categoriesStorage.getAll();
        // Supprimer également les sous-catégories
        const filtered = categories.filter((c) => c.id !== id && c.parentId !== id);
        return categoriesStorage.setAll(filtered);
    },
};

/**
 * Journal d'activité
 */
export const activityStorage = {
    getAll: (): ActivityLog[] => getStorageItem<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOG) || [],
    setAll: (logs: ActivityLog[]): boolean => setStorageItem(STORAGE_KEYS.ACTIVITY_LOG, logs),

    add: (log: Omit<ActivityLog, 'id' | 'timestamp'>): boolean => {
        const logs = activityStorage.getAll();
        const newLog: ActivityLog = {
            ...log,
            id: `log_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            timestamp: new Date().toISOString(),
        };
        logs.unshift(newLog); // Ajouter au début
        // Garder seulement les 100 derniers logs
        const trimmed = logs.slice(0, 100);
        return activityStorage.setAll(trimmed);
    },

    clear: (): boolean => activityStorage.setAll([]),
};

/**
 * Génère un ID unique
 */
export function generateId(prefix: string = ''): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}_${timestamp}${randomPart}` : `${timestamp}${randomPart}`;
}
