/**
 * API Configuration - ENSPY Admin Portal
 * Configuration centralisée pour les appels API vers le backend Spring Boot
 */

// URL de base de l'API - configurable via variable d'environnement
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9080/api';

/**
 * Options par défaut pour les requêtes fetch
 */
const defaultOptions: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include', // Pour envoyer les cookies si nécessaire
};

/**
 * Classe d'erreur personnalisée pour les erreurs API
 */
export class ApiError extends Error {
    status: number;
    statusText: string;

    constructor(status: number, statusText: string, message?: string) {
        super(message || `API Error: ${status} ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.name = 'ApiError';
    }
}

/**
 * Fonction utilitaire pour effectuer des requêtes API
 */
export async function apiRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText);
        }

        // Si la réponse est vide (204 No Content), retourner null
        if (response.status === 204) {
            return null as T;
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Erreur réseau ou autre
        console.error('API Request failed:', error);
        throw new Error(`Network error: Unable to connect to API at ${url}`);
    }
}

/**
 * Fonction pour effectuer des requêtes avec FormData (upload de fichiers)
 */
export async function apiFormDataRequest<T>(
    endpoint: string,
    formData: FormData,
    method: 'POST' | 'PUT' = 'POST'
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method,
            body: formData,
            credentials: 'include',
            // Ne pas définir Content-Type, le navigateur le fera automatiquement avec la boundary
        });

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText);
        }

        if (response.status === 204) {
            return null as T;
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error('API FormData Request failed:', error);
        throw new Error(`Network error: Unable to connect to API at ${url}`);
    }
}

/**
 * Raccourcis pour les méthodes HTTP courantes
 */
export const api = {
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),

    post: <T>(endpoint: string, data: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    put: <T>(endpoint: string, data: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    patch: <T>(endpoint: string, data?: unknown) =>
        apiRequest<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        }),

    delete: <T>(endpoint: string) =>
        apiRequest<T>(endpoint, { method: 'DELETE' }),

    upload: <T>(endpoint: string, formData: FormData, method: 'POST' | 'PUT' = 'POST') =>
        apiFormDataRequest<T>(endpoint, formData, method),
};
