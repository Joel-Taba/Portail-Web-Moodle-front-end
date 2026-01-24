/**
 * Super Admin Mock Data
 * Données simulées pour le développement
 */

import { Admin, AdminContent, SuperAdminStats } from '@/types/superadmin';

// Administrateurs mockés
export const mockAdmins: Admin[] = [
    {
        id: '1',
        email: 'admin1@enspy.cm',
        nom: 'Kamga',
        prenom: 'Jean-Pierre',
        telephone: '+237 6 90 12 34 56',
        status: 'active',
        coursCount: 12,
        categoriesCount: 3,
        createdAt: '2024-01-15T10:00:00Z',
        lastLogin: '2026-01-23T14:30:00Z',
    },
    {
        id: '2',
        email: 'admin2@enspy.cm',
        nom: 'Fouda',
        prenom: 'Marie',
        telephone: '+237 6 77 88 99 00',
        status: 'active',
        coursCount: 8,
        categoriesCount: 2,
        createdAt: '2024-03-20T09:00:00Z',
        lastLogin: '2026-01-22T11:15:00Z',
    },
    {
        id: '3',
        email: 'admin3@enspy.cm',
        nom: 'Tamba',
        prenom: 'Paul',
        status: 'suspended',
        coursCount: 5,
        categoriesCount: 1,
        createdAt: '2024-06-10T14:00:00Z',
        lastLogin: '2025-12-01T08:00:00Z',
    },
    {
        id: '4',
        email: 'admin4@enspy.cm',
        nom: 'Nguemo',
        prenom: 'Sophie',
        telephone: '+237 6 55 66 77 88',
        status: 'pending',
        coursCount: 0,
        categoriesCount: 0,
        createdAt: '2026-01-20T16:00:00Z',
    },
];

// Contenu des administrateurs
export const mockAdminContent: Record<string, AdminContent> = {
    '1': {
        adminId: '1',
        adminName: 'Jean-Pierre Kamga',
        courses: [
            { id: 'c1', titre: 'Introduction à Python', status: 'published', createdAt: '2024-02-01T10:00:00Z', nombreVues: 1250 },
            { id: 'c2', titre: 'Algorithmes Avancés', status: 'published', createdAt: '2024-03-15T10:00:00Z', nombreVues: 890 },
            { id: 'c3', titre: 'Machine Learning Basics', status: 'draft', createdAt: '2024-05-20T10:00:00Z', nombreVues: 0 },
        ],
        categories: [
            { id: 'cat1', nom: 'Informatique', coursCount: 8, createdAt: '2024-01-20T10:00:00Z' },
            { id: 'cat2', nom: 'Intelligence Artificielle', coursCount: 4, createdAt: '2024-02-10T10:00:00Z' },
        ],
    },
    '2': {
        adminId: '2',
        adminName: 'Marie Fouda',
        courses: [
            { id: 'c4', titre: 'Résistance des Matériaux', status: 'published', createdAt: '2024-04-01T10:00:00Z', nombreVues: 650 },
            { id: 'c5', titre: 'Mécanique des Fluides', status: 'published', createdAt: '2024-06-10T10:00:00Z', nombreVues: 420 },
        ],
        categories: [
            { id: 'cat3', nom: 'Génie Civil', coursCount: 5, createdAt: '2024-03-25T10:00:00Z' },
        ],
    },
};

// Statistiques
export const mockSuperAdminStats: SuperAdminStats = {
    totalAdmins: 4,
    activeAdmins: 2,
    suspendedAdmins: 1,
    totalCourses: 25,
    totalCategories: 8,
};

// Fonctions de simulation CRUD
export const adminStorage = {
    getAll: (): Admin[] => {
        if (typeof window === 'undefined') return mockAdmins;
        const stored = localStorage.getItem('superadmin_admins');
        if (!stored) {
            localStorage.setItem('superadmin_admins', JSON.stringify(mockAdmins));
            return mockAdmins;
        }
        return JSON.parse(stored);
    },

    add: (admin: Omit<Admin, 'id' | 'createdAt' | 'coursCount' | 'categoriesCount'>): Admin => {
        const admins = adminStorage.getAll();
        const newAdmin: Admin = {
            ...admin,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            coursCount: 0,
            categoriesCount: 0,
        };
        admins.push(newAdmin);
        localStorage.setItem('superadmin_admins', JSON.stringify(admins));
        return newAdmin;
    },

    delete: (id: string): boolean => {
        const admins = adminStorage.getAll();
        const filtered = admins.filter(a => a.id !== id);
        if (filtered.length === admins.length) return false;
        localStorage.setItem('superadmin_admins', JSON.stringify(filtered));
        return true;
    },

    updateStatus: (id: string, status: Admin['status']): Admin | null => {
        const admins = adminStorage.getAll();
        const index = admins.findIndex(a => a.id === id);
        if (index === -1) return null;
        admins[index].status = status;
        localStorage.setItem('superadmin_admins', JSON.stringify(admins));
        return admins[index];
    },

    getContent: (id: string): AdminContent | null => {
        return mockAdminContent[id] || null;
    },

    getStats: (): SuperAdminStats => {
        const admins = adminStorage.getAll();
        return {
            totalAdmins: admins.length,
            activeAdmins: admins.filter(a => a.status === 'active').length,
            suspendedAdmins: admins.filter(a => a.status === 'suspended').length,
            totalCourses: admins.reduce((sum, a) => sum + a.coursCount, 0),
            totalCategories: admins.reduce((sum, a) => sum + a.categoriesCount, 0),
        };
    },
};
