/**
 * Instructeurs API Service - ENSPY Admin Portal
 * Service pour la gestion des instructeurs via l'API backend
 */

import { api } from './config';
import type { Instructor } from '../types';

/**
 * Types du backend (DTOs)
 */
interface InstructeurDto {
    id: number;
    nomComplet: string;
    titreProfessionnel: string;
    organisation: string | null;
    biographieCourte: string | null;
    biographieComplete: string | null;
    photoUrl: string | null;
    siteWeb: string | null;
    linkedinUrl: string | null;
    createdAt: string;
}

interface InstructeurCreateRequest {
    nomComplet: string;
    titreProfessionnel: string;
    organisation: string | null;
    biographieCourte: string | null;
    biographieComplete: string | null;
    siteWeb: string | null;
    linkedinUrl: string | null;
}

/**
 * Type étendu pour l'instructeur côté frontend (avec ID)
 */
export interface InstructorWithId extends Instructor {
    id: string;
    title?: string;
    organization?: string;
    fullBio?: string;
    website?: string;
    linkedin?: string;
    createdAt?: string;
}

/**
 * Mapper: Backend DTO -> Frontend Type
 */
function mapDtoToInstructor(dto: InstructeurDto): InstructorWithId {
    return {
        id: String(dto.id),
        name: dto.nomComplet,
        photo: dto.photoUrl || '',
        bio: dto.biographieCourte || '',
        expertise: dto.titreProfessionnel,
        title: dto.titreProfessionnel,
        organization: dto.organisation || undefined,
        fullBio: dto.biographieComplete || undefined,
        website: dto.siteWeb || undefined,
        linkedin: dto.linkedinUrl || undefined,
        createdAt: dto.createdAt,
    };
}

/**
 * Mapper: Frontend Type -> Backend Request
 */
function mapInstructorToRequest(instructor: Partial<InstructorWithId>): InstructeurCreateRequest {
    return {
        nomComplet: instructor.name || '',
        titreProfessionnel: instructor.expertise || instructor.title || '',
        organisation: instructor.organization || null,
        biographieCourte: instructor.bio || null,
        biographieComplete: instructor.fullBio || null,
        siteWeb: instructor.website || null,
        linkedinUrl: instructor.linkedin || null,
    };
}

/**
 * Service API pour les instructeurs
 */
export const instructeursApi = {
    /**
     * Récupérer tous les instructeurs
     */
    getAll: async (): Promise<InstructorWithId[]> => {
        const dtos = await api.get<InstructeurDto[]>('/instructeurs');
        return dtos.map(mapDtoToInstructor);
    },

    /**
     * Récupérer un instructeur par ID
     */
    getById: async (id: string): Promise<InstructorWithId> => {
        const dto = await api.get<InstructeurDto>(`/instructeurs/${id}`);
        return mapDtoToInstructor(dto);
    },

    /**
     * Créer un nouvel instructeur (sans photo)
     */
    create: async (instructor: Partial<InstructorWithId>): Promise<InstructorWithId> => {
        const formData = new FormData();
        const request = mapInstructorToRequest(instructor);
        formData.append('instructeur', new Blob([JSON.stringify(request)], { type: 'application/json' }));

        const dto = await api.upload<InstructeurDto>('/instructeurs', formData);
        return mapDtoToInstructor(dto);
    },

    /**
     * Créer un instructeur avec photo
     */
    createWithPhoto: async (instructor: Partial<InstructorWithId>, photo: File): Promise<InstructorWithId> => {
        const formData = new FormData();
        const request = mapInstructorToRequest(instructor);
        formData.append('instructeur', new Blob([JSON.stringify(request)], { type: 'application/json' }));
        formData.append('photo', photo);

        const dto = await api.upload<InstructeurDto>('/instructeurs', formData);
        return mapDtoToInstructor(dto);
    },

    /**
     * Mettre à jour un instructeur
     */
    update: async (id: string, instructor: Partial<InstructorWithId>, photo?: File): Promise<InstructorWithId> => {
        const formData = new FormData();
        const request = mapInstructorToRequest(instructor);
        formData.append('instructeur', new Blob([JSON.stringify(request)], { type: 'application/json' }));
        if (photo) {
            formData.append('photo', photo);
        }

        const dto = await api.upload<InstructeurDto>(`/instructeurs/${id}`, formData, 'PUT');
        return mapDtoToInstructor(dto);
    },

    /**
     * Supprimer un instructeur
     */
    delete: async (id: string): Promise<void> => {
        await api.delete(`/instructeurs/${id}`);
    },
};

export default instructeursApi;
