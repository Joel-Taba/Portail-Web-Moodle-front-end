/**
 * Édition de Cours - Page de modification
 * ENSPY Admin Portal
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { coursesStorage, categoriesStorage, activityStorage } from '@/lib/storage';
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
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadedCourse = coursesStorage.getById(courseId);
        if (loadedCourse) {
            setCourse(loadedCourse);
        } else {
            setNotFound(true);
        }
        setCategories(categoriesStorage.getAll());
    }, [courseId]);

    const handleSubmit = async (data: Partial<Course>) => {
        if (!course) return;

        setIsLoading(true);

        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));

        coursesStorage.update(courseId, data);

        // Log activity
        activityStorage.add({
            action: 'update',
            entityType: 'course',
            entityId: courseId,
            entityTitle: data.title || course.title,
            userId: user?.id || '',
            userName: user?.name || '',
        });

        setIsLoading(false);
        router.push('/dashboard/courses');
    };

    const handleCancel = () => {
        router.push('/dashboard/courses');
    };

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
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Chargement...</div>
            </div>
        );
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
