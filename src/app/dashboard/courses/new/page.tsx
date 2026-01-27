/**
 * Nouveau Cours - Page de création
 * ENSPY Admin Portal
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { activityStorage } from '@/lib/storage';
import { coursesApi } from '@/lib/api/coursesApi';
import { categoriesApi } from '@/lib/api/categoriesApi';
import { CourseForm } from '@/components/courses/CourseForm';
import type { Category, Course } from '@/lib/types';
import styles from './page.module.css';

export default function NewCoursePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoriesApi.getAll();
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories:', err);
            } finally {
                setPageLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleSubmit = async (data: Partial<Course>) => {
        setIsLoading(true);

        try {
            // Création du cours via API
            // Note: Pour l'instructeur, le backend attend un ID existant ou crée un nouveau si on envoie l'objet
            // Le mapping dans coursesApi gère les champs de base.
            // TODO: Gérer l'upload d'image (thumbnail) - CourseForm doit renvoyer le File object

            const newCourse = await coursesApi.create(data);

            // Log activity
            activityStorage.add({
                action: 'create',
                entityType: 'course',
                entityId: newCourse.id,
                entityTitle: newCourse.title,
                userId: user?.id || '',
                userName: user?.name || '',
            });

            router.push('/dashboard/courses');
        } catch (err) {
            console.error('Failed to create course:', err);
            alert('Erreur lors de la création du cours. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard/courses');
    };

    if (pageLoading) {
        return <div className={styles.container}>Chargement...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleCancel}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Retour
                </button>
                <h1 className={styles.title}>Créer un nouveau cours</h1>
                <p className={styles.subtitle}>
                    Remplissez les informations ci-dessous pour créer un nouveau cours.
                </p>
            </div>

            <CourseForm
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
            />
        </div>
    );
}
