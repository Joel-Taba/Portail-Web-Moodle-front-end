/**
 * Categories API Service - ENSPY Admin Portal
 * Service pour la gestion des catégories via l'API backend
 */

import { api } from './config';
import type { Category } from '../types';

/**
 * Types du backend (DTOs)
 */
interface CategorieDto {
    id: number;
    parentId: number | null;
    parentName: string | null;
    nom: string;
    slug: string;
    description: string | null;
    iconeClass: string | null;
    couleurHex: string | null;
    ordreAffichage: number;
    estActif: boolean;
    createdAt: string;
}

interface CategorieCreateRequest {
    parentId: number | null;
    nom: string;
    description: string | null;
    iconeClass: string | null;
    couleurHex: string | null;
    ordreAffichage: number | null;
}

/**
 * Mapper: Backend DTO -> Frontend Type
 */
function mapDtoToCategory(dto: CategorieDto): Category {
    return {
        id: String(dto.id),
        name: dto.nom,
        slug: dto.slug,
        description: dto.description || undefined,
        parentId: dto.parentId ? String(dto.parentId) : null,
        order: dto.ordreAffichage,
        icon: dto.iconeClass || undefined,
        color: dto.couleurHex || undefined,
        createdAt: dto.createdAt,
        updatedAt: dto.createdAt, // Backend n'a pas updatedAt séparé pour categories
    };
}

/**
 * Mapper: Frontend Type -> Backend Request
 */
function mapCategoryToRequest(category: Partial<Category>): CategorieCreateRequest {
    return {
        parentId: category.parentId ? parseInt(category.parentId, 10) : null,
        nom: category.name || '',
        description: category.description || null,
        iconeClass: category.icon || null,
        couleurHex: category.color || null,
        ordreAffichage: category.order ?? 0,
    };
}

/**
 * Service API pour les catégories
 */
export const categoriesApi = {
    /**
     * Récupérer toutes les catégories
     */
    getAll: async (): Promise<Category[]> => {
        const dtos = await api.get<CategorieDto[]>('/categories');
        return dtos.map(mapDtoToCategory);
    },

    /**
     * Récupérer une catégorie par ID
     */
    getById: async (id: string): Promise<Category> => {
        const dto = await api.get<CategorieDto>(`/categories/${id}`);
        return mapDtoToCategory(dto);
    },

    /**
     * Créer une nouvelle catégorie
     */
    create: async (category: Partial<Category>): Promise<Category> => {
        const request = mapCategoryToRequest(category);
        const dto = await api.post<CategorieDto>('/categories', request);
        return mapDtoToCategory(dto);
    },

    /**
     * Mettre à jour une catégorie
     */
    update: async (id: string, category: Partial<Category>): Promise<Category> => {
        const request = mapCategoryToRequest(category);
        const dto = await api.put<CategorieDto>(`/categories/${id}`, request);
        return mapDtoToCategory(dto);
    },

    /**
     * Supprimer une catégorie
     */
    delete: async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },
};

export default categoriesApi;
