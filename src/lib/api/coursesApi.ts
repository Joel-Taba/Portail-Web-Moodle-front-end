/**
 * Courses API Service - ENSPY Admin Portal
 * Service pour la gestion des cours via l'API backend
 */

import { api, apiFormDataRequest } from './config';
import type { Course, CourseStatus, CourseLanguage, CourseFormat, CourseLevel, CourseType, Instructor } from '../types';
import instructeursApi from './instructeursApi'; // Pour récupérer les détails des instructeurs

/**
 * Types du backend (DTOs)
 */
interface MediaDto {
    id: number;
    coursId: number;
    nomFichier: string;
    urlPublique: string;
    type: string;
    estPrincipal: boolean;
}

export interface CoursDto {
    id: number;
    titre: string;
    slug: string;
    synopsisCourt: string;
    descriptionComplete: string;
    objectifsPedagogiques: string | null;
    publicCible: string | null;
    prerequis: string | null;
    dureeTotaleMinutes: number;
    niveau: string;
    langue: string;
    format: string;
    estCertifiant: boolean;
    statut: string;
    datePublication: string | null;
    nombreVues: number;
    nombreInscrits: number;
    instructeurId: number;
    instructeurNom: string;
    categorieId: number | null;
    categorieNom: string | null;
    media: MediaDto[];
    createdAt: string;
    updatedAt: string;
}

interface CoursCreateRequest {
    administrateurId: number; // Toujours requis par le backend
    instructeurId: number;
    categorieId: number | null;
    titre: string;
    synopsisCourt: string;
    descriptionComplete: string;
    objectifsPedagogiques: string | null;
    publicCible: string | null;
    prerequis: string | null;
    dureeTotaleMinutes: number;
    niveau: string;
    langue: string;
    format: string;
    estCertifiant: boolean;
    metaTitle?: string;
    metaDescription?: string;
}

/**
 * Fonctions utilitaires de mapping
 */
function mapStatusToBackend(status: string): string {
    const map: Record<string, string> = {
        'draft': 'BROUILLON',
        'scheduled': 'PROGRAMME',
        'published': 'PUBLIE',
        'archived': 'ARCHIVE',
    };
    return map[status] || 'BROUILLON';
}

function mapStatusToFrontend(status: string): CourseStatus {
    const map: Record<string, CourseStatus> = {
        'BROUILLON': 'draft',
        'PROGRAMME': 'scheduled',
        'PUBLIE': 'published',
        'ARCHIVE': 'archived',
    };
    // Case-insensitive lookup to handle backend variations
    return map[status.toUpperCase()] || 'draft';
}

function mapFormatToBackend(format: string): string {
    const map: Record<string, string> = {
        'video': 'VIDEO',
        'text': 'TEXTE',
        'exercises': 'INTERACTIF',
        'mixed': 'HYBRIDE',
    };
    return map[format] || 'VIDEO';
}

function mapFormatToFrontend(format: string): CourseFormat {
    const map: Record<string, CourseFormat> = {
        'VIDEO': 'video',
        'TEXTE': 'text',
        'INTERACTIF': 'exercises',
        'HYBRIDE': 'mixed',
    };
    return map[format] || 'video';
}

function mapLangToBackend(lang: string): string {
    const map: Record<string, string> = {
        'fr': 'FR',
        'en': 'EN',
        'other': 'ES', // Fallback
    };
    return map[lang] || 'FR';
}

function mapLangToFrontend(lang: string): CourseLanguage {
    const map: Record<string, CourseLanguage> = {
        'FR': 'fr',
        'EN': 'en',
        'ES': 'other',
    };
    return map[lang] || 'fr';
}

/**
 * Map level from backend French names to frontend English codes
 */
function mapLevelToFrontend(niveau: string): CourseLevel {
    const map: Record<string, CourseLevel> = {
        'débutant': 'beginner',
        'debutant': 'beginner',
        'beginner': 'beginner',
        'intermédiaire': 'intermediate',
        'intermediaire': 'intermediate',
        'intermediate': 'intermediate',
        'expert': 'expert',
        'avancé': 'expert',
        'avance': 'expert',
        'advanced': 'expert',
    };
    return map[niveau.toLowerCase()] || 'beginner';
}

/**
 * Map level from frontend English codes to backend French names
 */
function mapLevelToBackend(level: string): string {
    const map: Record<string, string> = {
        'beginner': 'DEBUTANT',
        'intermediate': 'INTERMEDIAIRE',
        'expert': 'AVANCE',
    };
    return map[level] || 'DEBUTANT';
}

/**
 * Mapper: Backend DTO -> Frontend Type
 */
function mapDtoToCourse(dto: CoursDto): Course {
    // Récupérer l'image principale
    const mainImage = dto.media.find(m => m.estPrincipal && (m.type === 'IMG_JPG' || m.type === 'IMG_PNG'));
    const thumbnailUrl = mainImage ? mainImage.urlPublique : undefined;

    // Construire l'objet instructeur à partir des données du DTO
    // Note: On ne fait plus d'appel API séparé pour éviter les N+1 queries
    const instructor: Instructor = {
        name: dto.instructeurNom || 'Instructeur',
        photo: '', // Le DTO ne contient pas la photo de l'instructeur, laisser vide
        bio: '',
        expertise: '',
    };

    return {
        id: String(dto.id),
        title: dto.titre,
        shortDescription: dto.synopsisCourt,
        longDescription: dto.descriptionComplete,
        category: dto.categorieId ? String(dto.categorieId) : '',
        subcategory: undefined,
        tags: [],
        level: mapLevelToFrontend(dto.niveau),
        duration: dto.dureeTotaleMinutes ? dto.dureeTotaleMinutes / 60 : 0,
        format: mapFormatToFrontend(dto.format),
        language: mapLangToFrontend(dto.langue),
        type: dto.estCertifiant ? 'certified' : 'non-certified',
        status: mapStatusToFrontend(dto.statut),
        instructor: instructor,
        prerequisites: dto.prerequis || undefined,
        targetAudience: dto.publicCible || undefined,
        thumbnailUrl: thumbnailUrl || '/images/defaults/course-placeholder.jpg',
        teaserVideoUrl: undefined,
        redirectUrl: `/courses/${dto.slug}`,
        order: 0,
        isFeatured: false,
        isTrending: dto.nombreVues > 100,
        views: dto.nombreVues,
        enrollments: dto.nombreInscrits || 0,
        rating: 0,
        scheduledDate: dto.datePublication || undefined,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        createdBy: 'admin',
    };
}

/**
 * Mapper: Frontend Type -> Backend Request
 */
function mapCourseToRequest(course: Partial<Course>): CoursCreateRequest {
    return {
        administrateurId: 1, // ID admin par défaut pour l'instant
        instructeurId: 1, // ID instructeur par défaut, devra être sélectable
        categorieId: course.category && !isNaN(parseInt(course.category, 10)) ? parseInt(course.category, 10) : null,
        titre: course.title || '',
        synopsisCourt: course.shortDescription || '',
        descriptionComplete: course.longDescription || '',
        objectifsPedagogiques: null, // Pas de champ frontend correspondant direct (sauf si dans longDescription)
        publicCible: course.targetAudience || null,
        prerequis: course.prerequisites || null,
        dureeTotaleMinutes: course.duration ? Math.round(course.duration * 60) : 0,
        niveau: mapLevelToBackend(course.level || 'beginner'),
        langue: mapLangToBackend(course.language || 'fr'),
        format: mapFormatToBackend(course.format || 'video'),
        estCertifiant: course.type === 'certified',
        metaTitle: course.title,
        metaDescription: course.shortDescription,
    };
}

/**
 * Service API pour les cours
 */
export const coursesApi = {
    /**
     * Récupérer tous les cours
     */
    getAll: async (): Promise<Course[]> => {
        const dtos = await api.get<CoursDto[]>('/cours');
        return dtos.map(mapDtoToCourse);
    },

    /**
     * Récupérer un cours par ID
     */
    getById: async (id: string): Promise<Course> => {
        const dto = await api.get<CoursDto>(`/cours/${id}`);
        return mapDtoToCourse(dto);
    },

    /**
     * Créer un nouveau cours
     */
    create: async (course: Partial<Course>): Promise<Course> => {
        const request = mapCourseToRequest(course);
        const dto = await api.post<CoursDto>('/cours', request);
        return mapDtoToCourse(dto);
    },

    /**
     * Mettre à jour un cours
     */
    update: async (id: string, course: Partial<Course>): Promise<Course> => {
        const request = mapCourseToRequest(course);
        const dto = await api.put<CoursDto>(`/cours/${id}`, request);
        return mapDtoToCourse(dto);
    },

    /**
     * Changer le statut d'un cours
     */
    changeStatus: async (id: string, status: CourseStatus): Promise<Course> => {
        const backendStatus = mapStatusToBackend(status);
        const dto = await api.patch<CoursDto>(`/cours/${id}/status?status=${backendStatus}`);
        return mapDtoToCourse(dto);
    },

    /**
     * Supprimer un cours
     */
    delete: async (id: string): Promise<void> => {
        await api.delete(`/cours/${id}`);
    },

    /**
     * Upload d'image de couverture
     */
    uploadThumbnail: async (courseId: string, file: File): Promise<void> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('estPrincipal', 'true');
        formData.append('altText', 'Image de couverture');

        await api.upload(`/cours/${courseId}/media`, formData);
    }
};

export default coursesApi;
