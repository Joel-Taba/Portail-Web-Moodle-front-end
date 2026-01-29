/**
 * ENSPY Admin Portal - Utilitaires de stockage
 * Gestion du localStorage pour la persistance des données
 */

const STORAGE_KEYS = {
    AUTH: 'enspy_auth',
    COURSES: 'enspy_courses',
    CATEGORIES: 'enspy_categories',
    INSTRUCTORS: 'enspy_instructors',
    ACTIVITY_LOG: 'enspy_activity_log',
    SETTINGS: 'enspy_settings',
    STUDENTS: 'enspy_students',
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

import type { User, Course, Category, ActivityLog, Student, SavedInstructor } from './types';

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
 * Instructeurs
 */
export const instructorsStorage = {
    getAll: (): SavedInstructor[] => getStorageItem<SavedInstructor[]>(STORAGE_KEYS.INSTRUCTORS) || [],
    setAll: (instructors: SavedInstructor[]): boolean => setStorageItem(STORAGE_KEYS.INSTRUCTORS, instructors),

    getById: (id: string): SavedInstructor | null => {
        const instructors = instructorsStorage.getAll();
        return instructors.find((i) => i.id === id) || null;
    },

    add: (instructor: Omit<SavedInstructor, 'id' | 'createdAt'>): SavedInstructor => {
        const instructors = instructorsStorage.getAll();
        const newInstructor: SavedInstructor = {
            ...instructor,
            id: `instructor_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            createdAt: new Date().toISOString(),
        };
        instructors.push(newInstructor);
        instructorsStorage.setAll(instructors);
        return newInstructor;
    },

    update: (id: string, updates: Partial<SavedInstructor>): boolean => {
        const instructors = instructorsStorage.getAll();
        const index = instructors.findIndex((i) => i.id === id);
        if (index === -1) return false;
        instructors[index] = { ...instructors[index], ...updates };
        return instructorsStorage.setAll(instructors);
    },

    delete: (id: string): boolean => {
        const instructors = instructorsStorage.getAll();
        const filtered = instructors.filter((i) => i.id !== id);
        return instructorsStorage.setAll(filtered);
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
 * Élèves (demandes d'inscription)
 */
export const studentsStorage = {
    getAll: (): Student[] => getStorageItem<Student[]>(STORAGE_KEYS.STUDENTS) || [],
    setAll: (students: Student[]): boolean => setStorageItem(STORAGE_KEYS.STUDENTS, students),

    getByCourseId: (courseId: string): Student[] => {
        const students = studentsStorage.getAll();
        return students.filter((s) => s.courseId === courseId);
    },

    getPendingByCourseId: (courseId: string): Student[] => {
        const students = studentsStorage.getAll();
        return students.filter((s) => s.courseId === courseId && s.status === 'pending');
    },

    add: (student: Omit<Student, 'id' | 'registrationDate' | 'status'>): boolean => {
        const students = studentsStorage.getAll();
        const newStudent: Student = {
            ...student,
            id: `student_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            registrationDate: new Date().toISOString(),
            status: 'pending',
        };
        students.push(newStudent);
        return studentsStorage.setAll(students);
    },

    updateStatus: (id: string, status: 'pending' | 'approved' | 'rejected'): boolean => {
        const students = studentsStorage.getAll();
        const index = students.findIndex((s) => s.id === id);
        if (index === -1) return false;
        students[index] = { ...students[index], status };
        return studentsStorage.setAll(students);
    },

    delete: (id: string): boolean => {
        const students = studentsStorage.getAll();
        const filtered = students.filter((s) => s.id !== id);
        return studentsStorage.setAll(filtered);
    },

    // Générer des données de démo si vide
    initializeWithMockData: (courseIds: string[]): boolean => {
        const existing = studentsStorage.getAll();
        if (existing.length > 0) return true;

        const mockNames = [
            'Alice Nguema', 'Bernard Fotso', 'Carine Mbarga', 'David Ewolo', 'Emilie Kom',
            'François Ndjock', 'Georgette Atangana', 'Henri Mpondo', 'Irène Soh', 'Jacques Fouda',
            'Karine Biya', 'Luc Njifenjou', 'Marie Tchinda', 'Nicolas Fonfack', 'Odile Messi'
        ];

        const mockStudents: Student[] = [];
        courseIds.forEach((courseId, cidx) => {
            const count = Math.floor(Math.random() * 5) + 2; // 2-6 étudiants par cours
            for (let i = 0; i < count; i++) {
                const nameIndex = (cidx * 3 + i) % mockNames.length;
                mockStudents.push({
                    id: `student_${Date.now()}_${cidx}_${i}`,
                    name: mockNames[nameIndex],
                    email: `${mockNames[nameIndex].toLowerCase().replace(' ', '.')}@enspy.cm`,
                    phone: `+237 6${Math.floor(Math.random() * 9) + 1}${Math.random().toString().slice(2, 10)}`,
                    courseId,
                    registrationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'pending',
                });
            }
        });

        return studentsStorage.setAll(mockStudents);
    },
};

/**
 * Génère un ID unique
 */
export function generateId(prefix: string = ''): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}_${timestamp}${randomPart}` : `${timestamp}${randomPart}`;
}
