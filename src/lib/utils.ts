/* ============================================
   ENSPY COURSES PORTAL - Utility Functions
   ============================================ */

import { CourseLevel, CourseDuration, CourseFormat, CourseType, CourseAvailability } from '@/types';

// ============ String Utilities ============

/**
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Truncate a string to a specified length
 */
export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length).trim() + '...';
}

/**
 * Format a number with French locale
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('fr-FR').format(num);
}

// ============ Date Utilities ============

/**
 * Format a date string to French locale
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

/**
 * Format a date string to short French format
 */
export function formatDateShort(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

/**
 * Get relative time (e.g., "il y a 2 jours")
 */
export function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'an', seconds: 31536000 },
        { label: 'mois', seconds: 2592000 },
        { label: 'jour', seconds: 86400 },
        { label: 'heure', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            const plural = count > 1 && interval.label !== 'mois' ? 's' : '';
            return `il y a ${count} ${interval.label}${plural}`;
        }
    }

    return 'à l\'instant';
}

// ============ Label Utilities ============

/**
 * Get French label for course level
 */
export function getLevelLabel(level: CourseLevel): string {
    const labels: Record<CourseLevel, string> = {
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        expert: 'Expert',
    };
    return labels[level];
}

/**
 * Get French label for course duration
 */
export function getDurationLabel(duration: CourseDuration): string {
    const labels: Record<CourseDuration, string> = {
        '0-2h': '0-2 heures',
        '2-5h': '2-5 heures',
        '5-10h': '5-10 heures',
        '10h+': 'Plus de 10 heures',
    };
    return labels[duration];
}

/**
 * Get French label for course format
 */
export function getFormatLabel(format: CourseFormat): string {
    const labels: Record<CourseFormat, string> = {
        video: 'Vidéo',
        text: 'Texte',
        exercises: 'Exercices',
        mixed: 'Mixte',
    };
    return labels[format];
}

/**
 * Get French label for course type
 */
export function getTypeLabel(type: CourseType): string {
    const labels: Record<CourseType, string> = {
        free: 'Gratuit',
        paid: 'Payant',
        certified: 'Certifiant',
    };
    return labels[type];
}

/**
 * Get French label for course availability
 */
export function getAvailabilityLabel(availability: CourseAvailability): string {
    const labels: Record<CourseAvailability, string> = {
        available: 'Disponible',
        upcoming: 'À venir',
        archived: 'Archivé',
    };
    return labels[availability];
}

// ============ Color Utilities ============

/**
 * Get CSS class for course level badge
 */
export function getLevelColorClass(level: CourseLevel): string {
    const classes: Record<CourseLevel, string> = {
        beginner: 'badge-success',
        intermediate: 'badge-warning',
        expert: 'badge-error',
    };
    return classes[level];
}

/**
 * Get CSS class for course type badge
 */
export function getTypeColorClass(type: CourseType): string {
    const classes: Record<CourseType, string> = {
        free: 'badge-success',
        paid: 'badge-primary',
        certified: 'badge-info',
    };
    return classes[type];
}

/**
 * Get CSS class for availability badge
 */
export function getAvailabilityColorClass(availability: CourseAvailability): string {
    const classes: Record<CourseAvailability, string> = {
        available: 'badge-success',
        upcoming: 'badge-warning',
        archived: 'badge-gray',
    };
    return classes[availability];
}

// ============ URL Utilities ============

/**
 * Build course URL
 */
export function getCourseUrl(slug: string): string {
    return `/cours/${slug}`;
}

/**
 * Build thematic URL
 */
export function getThematicUrl(slug: string): string {
    return `/thematiques/${slug}`;
}

/**
 * Build instructor URL
 */
export function getInstructorUrl(id: string): string {
    return `/instructeurs/${id}`;
}

/**
 * Build institution URL
 */
export function getInstitutionUrl(id: string): string {
    return `/etablissements/${id}`;
}

// ============ Validation Utilities ============

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if string is empty or whitespace only
 */
export function isEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
}

// ============ Array Utilities ============

/**
 * Get unique values from an array
 */
export function unique<T>(array: T[]): T[] {
    return [...new Set(array)];
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {} as Record<string, T[]>);
}

// ============ Class Name Utilities ============

/**
 * Combine class names conditionally
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

// ============ Storage Utilities ============

/**
 * Get item from localStorage with fallback
 */
export function getStorageItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

/**
 * Set item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error('Failed to save to localStorage');
    }
}

// ============ Debounce Utility ============

/**
 * Debounce a function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), wait);
    };
}
