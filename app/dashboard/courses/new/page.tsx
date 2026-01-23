/**
 * Nouveau Cours - Page de création
 * ENSPY Admin Portal
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { coursesStorage, categoriesStorage, activityStorage, generateId } from '@/lib/storage';
import { CourseForm } from '@/components/courses/CourseForm';
import type { Category, Course } from '@/lib/types';
import styles from './page.module.css';

export default function NewCoursePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCategories(categoriesStorage.getAll());
    }, []);

    const handleSubmit = async (data: Partial<Course>) => {
        setIsLoading(true);

        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));

        const courses = coursesStorage.getAll();
        const newCourse: Course = {
            ...data as Course,
            id: generateId('course'),
            order: courses.length,
            views: 0,
            enrollments: 0,
            rating: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: user?.id || '',
        };

        coursesStorage.add(newCourse);

        // Log activity
        activityStorage.add({
            action: 'create',
            entityType: 'course',
            entityId: newCourse.id,
            entityTitle: newCourse.title,
            userId: user?.id || '',
            userName: user?.name || '',
        });

        setIsLoading(false);
        router.push('/dashboard/courses');
    };

    const handleCancel = () => {
        router.push('/dashboard/courses');
    };

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
