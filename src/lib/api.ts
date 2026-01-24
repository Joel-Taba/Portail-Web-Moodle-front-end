/* ============================================
   ENSPY COURSES PORTAL - API Service
   Connected to Spring Boot Backend (port 9080)
   ============================================ */

import { API_CONFIG } from './constants';

// ============ Types for Backend ============

export interface BackendCours {
    id: number;
    titre: string;
    slug: string;
    synopsisCourt: string;
    descriptionComplete: string;
    objectifsPedagogiques: string;
    publicCible: string;
    prerequis: string;
    dureeTotaleMinutes: number;
    niveau: string;
    langue: string;
    format: string;
    estCertifiant: boolean;
    statut: string;
    datePublication: string;
    nombreVues: number;
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
    updatedAt: string;
    instructeur?: BackendInstructeur;
    categorie?: BackendCategorie;
    medias?: BackendMedia[];
    administrateurId?: number;
}

export interface BackendCategorie {
    id: number;
    nom: string;
    slug: string;
    description: string;
    ordreAffichage: number;
    parent?: BackendCategorie;
    createdAt: string;
}

export interface BackendInstructeur {
    id: number;
    nomComplet: string;
    titreProfessionnel: string;
    organisation: string;
    biographieCourte: string;
    biographieComplete: string;
    createdAt: string;
}

export interface BackendEtudiant {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    niveauEtudes: string;
    departement: string;
    createdAt: string;
}

export interface BackendMedia {
    id: number;
    coursId: number;
    nomFichier: string;
    urlPublique: string;
    type: string;
    tailleOctets: number;
    dureeSecondes?: number;
    dimensions?: string;
    altText?: string;
    estPrincipal: boolean;
    createdAt: string;
}

export interface BackendAdmin {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    actif: boolean;
    createdAt: string;
}

// ============ API Response Types ============

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
}

// ============ Base Fetch Function ============

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;

    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const text = await response.text();

        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }

        if (!response.ok) {
            throw new Error(typeof data === 'object' ? data.message || 'Une erreur est survenue' : 'Une erreur est survenue');
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        return {
            success: false,
            data: null as unknown as T,
            error: error instanceof Error ? error.message : 'Une erreur est survenue',
        };
    }
}

// ============ Courses API ============

export const coursApi = {
    /**
     * Get all courses
     */
    async getAll(): Promise<ApiResponse<BackendCours[]>> {
        return fetchApi<BackendCours[]>('/cours');
    },

    /**
     * Get a single course by ID
     */
    async getById(id: number): Promise<ApiResponse<BackendCours>> {
        return fetchApi<BackendCours>(`/cours/${id}`);
    },

    /**
     * Create a new course
     */
    async create(data: Partial<BackendCours>): Promise<ApiResponse<BackendCours>> {
        return fetchApi<BackendCours>('/cours', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update a course
     */
    async update(id: number, data: Partial<BackendCours>): Promise<ApiResponse<BackendCours>> {
        return fetchApi<BackendCours>(`/cours/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete a course
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/cours/${id}`, {
            method: 'DELETE',
        });
    },

    /**
     * Change course status
     */
    async changeStatus(id: number, statut: string): Promise<ApiResponse<BackendCours>> {
        return fetchApi<BackendCours>(`/cours/${id}/status?statut=${statut}`, {
            method: 'PATCH',
        });
    },

    /**
     * Increment views
     */
    async incrementViews(id: number): Promise<ApiResponse<BackendCours>> {
        return fetchApi<BackendCours>(`/cours/${id}/views`, {
            method: 'PATCH',
        });
    },

    /**
     * Get students enrolled in a course
     */
    async getStudents(id: number): Promise<ApiResponse<BackendEtudiant[]>> {
        return fetchApi<BackendEtudiant[]>(`/cours/${id}/etudiants`);
    },
};

// ============ Categories API ============

export const categoriesApi = {
    /**
     * Get all categories
     */
    async getAll(): Promise<ApiResponse<BackendCategorie[]>> {
        return fetchApi<BackendCategorie[]>('/categories');
    },

    /**
     * Get a single category by ID
     */
    async getById(id: number): Promise<ApiResponse<BackendCategorie>> {
        return fetchApi<BackendCategorie>(`/categories/${id}`);
    },

    /**
     * Create a new category
     */
    async create(data: Partial<BackendCategorie>): Promise<ApiResponse<BackendCategorie>> {
        return fetchApi<BackendCategorie>('/categories', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update a category
     */
    async update(id: number, data: Partial<BackendCategorie>): Promise<ApiResponse<BackendCategorie>> {
        return fetchApi<BackendCategorie>(`/categories/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete a category
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/categories/${id}`, {
            method: 'DELETE',
        });
    },
};

// ============ Instructors API ============

export const instructeursApi = {
    /**
     * Get all instructors
     */
    async getAll(): Promise<ApiResponse<BackendInstructeur[]>> {
        return fetchApi<BackendInstructeur[]>('/instructeurs');
    },

    /**
     * Get a single instructor by ID
     */
    async getById(id: number): Promise<ApiResponse<BackendInstructeur>> {
        return fetchApi<BackendInstructeur>(`/instructeurs/${id}`);
    },

    /**
     * Create a new instructor
     */
    async create(data: Partial<BackendInstructeur>): Promise<ApiResponse<BackendInstructeur>> {
        return fetchApi<BackendInstructeur>('/instructeurs', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update an instructor
     */
    async update(id: number, data: Partial<BackendInstructeur>): Promise<ApiResponse<BackendInstructeur>> {
        return fetchApi<BackendInstructeur>(`/instructeurs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete an instructor
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/instructeurs/${id}`, {
            method: 'DELETE',
        });
    },
};

// ============ Students API ============

export const etudiantsApi = {
    /**
     * Get all students
     */
    async getAll(): Promise<ApiResponse<BackendEtudiant[]>> {
        return fetchApi<BackendEtudiant[]>('/etudiants');
    },

    /**
     * Get a single student by ID
     */
    async getById(id: number): Promise<ApiResponse<BackendEtudiant>> {
        return fetchApi<BackendEtudiant>(`/etudiants/${id}`);
    },

    /**
     * Create a new student (registration)
     */
    async create(data: Partial<BackendEtudiant>): Promise<ApiResponse<BackendEtudiant>> {
        return fetchApi<BackendEtudiant>('/etudiants', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update a student
     */
    async update(id: number, data: Partial<BackendEtudiant>): Promise<ApiResponse<BackendEtudiant>> {
        return fetchApi<BackendEtudiant>(`/etudiants/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete a student
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/etudiants/${id}`, {
            method: 'DELETE',
        });
    },

    /**
     * Get courses for a student
     */
    async getCourses(id: number): Promise<ApiResponse<BackendCours[]>> {
        return fetchApi<BackendCours[]>(`/etudiants/${id}/cours`);
    },

    /**
     * Enroll student in a course
     */
    async enrollInCourse(etudiantId: number, coursId: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/etudiants/${etudiantId}/cours/${coursId}`, {
            method: 'POST',
        });
    },
};

// ============ Admins API ============

export const adminsApi = {
    /**
     * Get all admins
     */
    async getAll(): Promise<ApiResponse<BackendAdmin[]>> {
        return fetchApi<BackendAdmin[]>('/admins');
    },

    /**
     * Get a single admin by ID
     */
    async getById(id: number): Promise<ApiResponse<BackendAdmin>> {
        return fetchApi<BackendAdmin>(`/admins/${id}`);
    },

    /**
     * Create a new admin
     */
    async create(data: Partial<BackendAdmin>): Promise<ApiResponse<BackendAdmin>> {
        return fetchApi<BackendAdmin>('/admins', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update an admin
     */
    async update(id: number, data: Partial<BackendAdmin>): Promise<ApiResponse<BackendAdmin>> {
        return fetchApi<BackendAdmin>(`/admins/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete an admin
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/admins/${id}`, {
            method: 'DELETE',
        });
    },

    /**
     * Suspend an admin
     */
    async suspend(id: number): Promise<ApiResponse<BackendAdmin>> {
        return fetchApi<BackendAdmin>(`/admins/${id}/suspend`, {
            method: 'PATCH',
        });
    },
};

// ============ Media API ============

export const mediaApi = {
    /**
     * Get media for a course
     */
    async getForCourse(coursId: number): Promise<ApiResponse<BackendMedia[]>> {
        return fetchApi<BackendMedia[]>(`/cours/${coursId}/media`);
    },

    /**
     * Add media to a course
     */
    async addToCourse(coursId: number, data: Partial<BackendMedia>): Promise<ApiResponse<BackendMedia>> {
        return fetchApi<BackendMedia>(`/cours/${coursId}/media`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete media
     */
    async delete(id: number): Promise<ApiResponse<void>> {
        return fetchApi<void>(`/media/${id}`, {
            method: 'DELETE',
        });
    },
};

// ============ Auth API ============

export const authApi = {
    /**
     * Login student
     */
    async login(data: any): Promise<ApiResponse<any>> {
        return fetchApi<any>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Register student
     */
    async register(data: any): Promise<ApiResponse<any>> {
        return fetchApi<any>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};

// ============ Export All APIs ============

export const api = {
    cours: coursApi,
    categories: categoriesApi,
    instructeurs: instructeursApi,
    etudiants: etudiantsApi,
    admins: adminsApi,
    media: mediaApi,
    auth: authApi,
};

export default api;
