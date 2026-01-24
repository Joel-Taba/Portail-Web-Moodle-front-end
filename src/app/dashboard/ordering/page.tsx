/**
 * Ordering Page - ENSPY Admin Portal
 * Page d'ordonnancement et mise en vedette des cours
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { coursesStorage, categoriesStorage, activityStorage } from '@/lib/storage';
import { Button } from '@/components/ui_admin/Button';
import { Select } from '@/components/ui_admin/Select';
import { Badge } from '@/components/ui_admin/Badge';
import type { Course, Category } from '@/lib/types';
import styles from './page.module.css';

export default function OrderingPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [hasChanges, setHasChanges] = useState(false);

    // Load data
    useEffect(() => {
        setCourses(coursesStorage.getAll());
        setCategories(categoriesStorage.getAll());
    }, []);

    // Filter courses
    const filteredCourses = React.useMemo(() => {
        let filtered = courses.filter(c => c.status === 'published');

        if (selectedCategory !== 'all') {
            const subcategoryIds = categories
                .filter(c => c.parentId === selectedCategory)
                .map(c => c.id);

            filtered = filtered.filter(c =>
                c.category === selectedCategory || subcategoryIds.includes(c.category)
            );
        }

        return filtered.sort((a, b) => a.order - b.order);
    }, [courses, categories, selectedCategory]);

    // Category options
    const categoryOptions = React.useMemo(() => {
        const parents = categories.filter(c => c.parentId === null);
        return [
            { value: 'all', label: 'Tous les cours' },
            ...parents.map(c => ({
                value: c.id,
                label: `${c.icon || ''} ${c.name}`.trim(),
            })),
        ];
    }, [categories]);

    // Featured courses
    const featuredCourses = courses.filter(c => c.isFeatured);
    const trendingCourses = courses.filter(c => c.isTrending);

    // Handlers
    const moveUp = (courseId: string) => {
        const index = filteredCourses.findIndex(c => c.id === courseId);
        if (index <= 0) return;

        const course = filteredCourses[index];
        const aboveCourse = filteredCourses[index - 1];

        // Swap orders
        coursesStorage.update(course.id, { order: aboveCourse.order });
        coursesStorage.update(aboveCourse.id, { order: course.order });

        setCourses(coursesStorage.getAll());
        setHasChanges(true);
    };

    const moveDown = (courseId: string) => {
        const index = filteredCourses.findIndex(c => c.id === courseId);
        if (index < 0 || index >= filteredCourses.length - 1) return;

        const course = filteredCourses[index];
        const belowCourse = filteredCourses[index + 1];

        // Swap orders
        coursesStorage.update(course.id, { order: belowCourse.order });
        coursesStorage.update(belowCourse.id, { order: course.order });

        setCourses(coursesStorage.getAll());
        setHasChanges(true);
    };

    const toggleFeatured = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        coursesStorage.update(courseId, { isFeatured: !course.isFeatured });
        setCourses(coursesStorage.getAll());
        setHasChanges(true);

        activityStorage.add({
            action: 'update',
            entityType: 'course',
            entityId: courseId,
            entityTitle: `${course.title} - ${!course.isFeatured ? 'mis' : 'retiré de'} à la une`,
            userId: user?.id || '',
            userName: user?.name || '',
        });
    };

    const toggleTrending = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        coursesStorage.update(courseId, { isTrending: !course.isTrending });
        setCourses(coursesStorage.getAll());
        setHasChanges(true);

        activityStorage.add({
            action: 'update',
            entityType: 'course',
            entityId: courseId,
            entityTitle: `${course.title} - ${!course.isTrending ? 'marqué' : 'retiré de'} tendance`,
            userId: user?.id || '',
            userName: user?.name || '',
        });
    };

    const getCategoryName = (categoryId: string) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat?.name || '-';
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Ordonnancement des cours</h1>
                    <p className={styles.subtitle}>
                        Gérez l'ordre d'affichage et les mises en vedette
                    </p>
                </div>
                {hasChanges && (
                    <Badge variant="warning">Modifications non synchronisées</Badge>
                )}
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>⭐</span>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{featuredCourses.length}</span>
                        <span className={styles.statLabel}>À la une</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>🔥</span>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{trendingCourses.length}</span>
                        <span className={styles.statLabel}>Tendances</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>📚</span>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>{filteredCourses.length}</span>
                        <span className={styles.statLabel}>Cours publiés</span>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className={styles.filterBar}>
                <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    fullWidth
                />
            </div>

            {/* Course list */}
            <div className={styles.courseList}>
                <div className={styles.listHeader}>
                    <span className={styles.colOrder}>#</span>
                    <span className={styles.colTitle}>Cours</span>
                    <span className={styles.colCategory}>Catégorie</span>
                    <span className={styles.colBadges}>Badges</span>
                    <span className={styles.colActions}>Actions</span>
                </div>

                {filteredCourses.map((course, index) => (
                    <div key={course.id} className={styles.courseRow}>
                        <span className={styles.colOrder}>
                            <span className={styles.orderNumber}>{index + 1}</span>
                        </span>

                        <div className={styles.colTitle}>
                            <img
                                src={course.thumbnailUrl}
                                alt=""
                                className={styles.thumbnail}
                            />
                            <div className={styles.courseInfo}>
                                <span className={styles.courseName}>{course.title}</span>
                                <span className={styles.instructor}>{course.instructor.name}</span>
                            </div>
                        </div>

                        <span className={styles.colCategory}>
                            {getCategoryName(course.category)}
                        </span>

                        <div className={styles.colBadges}>
                            <button
                                className={`${styles.badgeBtn} ${course.isFeatured ? styles.active : ''}`}
                                onClick={() => toggleFeatured(course.id)}
                                title={course.isFeatured ? 'Retirer de À la une' : 'Mettre À la une'}
                            >
                                ⭐
                            </button>
                            <button
                                className={`${styles.badgeBtn} ${course.isTrending ? styles.active : ''}`}
                                onClick={() => toggleTrending(course.id)}
                                title={course.isTrending ? 'Retirer de Tendance' : 'Marquer Tendance'}
                            >
                                🔥
                            </button>
                        </div>

                        <div className={styles.colActions}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveUp(course.id)}
                                disabled={index === 0}
                            >
                                ↑
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveDown(course.id)}
                                disabled={index === filteredCourses.length - 1}
                            >
                                ↓
                            </Button>
                        </div>
                    </div>
                ))}

                {filteredCourses.length === 0 && (
                    <div className={styles.empty}>
                        <p>Aucun cours publié dans cette catégorie.</p>
                    </div>
                )}
            </div>

            {/* Help text */}
            <div className={styles.help}>
                <h4>💡 Conseils</h4>
                <ul>
                    <li><strong>⭐ À la une</strong> : Les cours marqués apparaîtront en priorité sur la page d'accueil</li>
                    <li><strong>🔥 Tendance</strong> : Badge visuel pour les cours populaires du moment</li>
                    <li>Utilisez les flèches ↑↓ pour réorganiser l'ordre d'affichage</li>
                </ul>
            </div>
        </div>
    );
}
