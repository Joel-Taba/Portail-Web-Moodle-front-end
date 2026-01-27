/**
 * ENSPY Portal - Types Super Admin
 * Définitions des types pour l'interface Super Administrateur
 */

// ============================================
// Types Administrateur
// ============================================

export type AdminStatus = 'active' | 'suspended' | 'pending';

export interface Admin {
    id: string;
    email: string;
    nom: string;
    prenom: string;
    telephone?: string;
    avatarUrl?: string;
    status: AdminStatus;
    coursCount: number;
    categoriesCount: number;
    createdAt: string;
    lastLogin?: string;
}

export interface AdminFormData {
    email: string;
    nom: string;
    prenom: string;
    telephone?: string;
    password: string;
    confirmPassword: string;
}

// ============================================
// Types Contenu Admin
// ============================================

export interface AdminContent {
    adminId: string;
    adminName: string;
    courses: AdminCourse[];
    categories: AdminCategory[];
}

export interface AdminCourse {
    id: string;
    titre: string;
    status: string;
    createdAt: string;
    nombreVues: number;
}

export interface AdminCategory {
    id: string;
    nom: string;
    coursCount: number;
    createdAt: string;
}

// ============================================
// Types Stats Super Admin
// ============================================

export interface SuperAdminStats {
    totalAdmins: number;
    activeAdmins: number;
    suspendedAdmins: number;
    totalCourses: number;
    totalCategories: number;
}
