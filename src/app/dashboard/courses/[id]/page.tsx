/**
 * Édition de Cours - Page de modification
 * ENSPY Admin Portal
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { activityStorage } from '@/lib/storage';
import { coursesApi } from '@/lib/api/coursesApi';
import { categoriesApi } from '@/lib/api/categoriesApi';
import { CourseForm } from '@/components/courses/CourseForm';
import type { Category, Course } from '@/lib/types';
import styles from '../new/page.module.css';

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
    const courseId = params.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setPageLoading(true);
                const [loadedCourse, loadedCategories] = await Promise.all([
                    coursesApi.getById(courseId),
                    categoriesApi.getAll()
                ]);
                setCourse(loadedCourse);
                setCategories(loadedCategories);
            } catch (err) {
                console.error('Failed to load course:', err);
                setNotFound(true);
            } finally {
                setPageLoading(false);
            }
        };

        if (courseId) {
            loadData();
        }
    }, [courseId]);

    const handleSubmit = async (data: Partial<Course>) => {
        if (!course) return;

        setIsLoading(true);

        try {
            await coursesApi.update(courseId, data);

            // Log activity
            activityStorage.add({
                action: 'update',
                entityType: 'course',
                entityId: courseId,
                entityTitle: data.title || course.title,
                userId: user?.id || '',
                userName: user?.name || '',
            });

            router.push('/dashboard/courses');
        } catch (err) {
            console.error('Failed to update course:', err);
            alert('Erreur lors de la mise à jour du cours.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard/courses');
    };

    if (pageLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Chargement...</div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>
                    <h1>Cours non trouvé</h1>
                    <p>Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
                    <button onClick={() => router.push('/dashboard/courses')}>
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    if (!course) {
        return null; // Should be handled by pageLoading
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
                <h1 className={styles.title}>Modifier le cours</h1>
                <p className={styles.subtitle}>
                    {course.title}
                </p>
            </div>

            <CourseForm
                course={course}
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
            />
        </div>
    );
}
