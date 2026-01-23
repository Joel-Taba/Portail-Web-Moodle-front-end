/**
 * CourseList Component - ENSPY Admin Portal
 * Liste des cours avec vue tableau
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { StatusBadge, LevelBadge, TypeBadge } from '@/components/ui/Badge';
import type { Course, Category } from '@/lib/types';
import styles from './CourseList.module.css';

interface CourseListProps {
    courses: Course[];
    categories: Category[];
    onArchive?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function CourseList({ courses, categories, onArchive, onDelete }: CourseListProps) {
    const getCategoryName = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return '-';
        const parent = category.parentId ? categories.find(c => c.id === category.parentId) : null;
        return parent ? `${parent.name} › ${category.name}` : category.name;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (courses.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>📚</div>
                <h3>Aucun cours trouvé</h3>
                <p>Essayez de modifier vos filtres ou créez un nouveau cours.</p>
                <Link href="/dashboard/courses/new" className={styles.emptyButton}>
                    Créer un cours
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thImage}>Image</th>
                        <th className={styles.thTitle}>Titre</th>
                        <th>Catégorie</th>
                        <th>Niveau</th>
                        <th>Type</th>
                        <th>Statut</th>
                        <th className={styles.thStats}>Vues</th>
                        <th className={styles.thStats}>Inscrits</th>
                        <th>Mis à jour</th>
                        <th className={styles.thActions}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td className={styles.tdImage}>
                                <img
                                    src={course.thumbnailUrl}
                                    alt={course.title}
                                    className={styles.thumbnail}
                                />
                            </td>
                            <td className={styles.tdTitle}>
                                <div className={styles.titleCell}>
                                    <Link href={`/dashboard/courses/${course.id}`} className={styles.titleLink}>
                                        {course.title}
                                    </Link>
                                    {course.isFeatured && <span className={styles.featuredIcon}>⭐</span>}
                                    {course.isTrending && <span className={styles.trendingIcon}>🔥</span>}
                                </div>
                                <span className={styles.instructor}>{course.instructor.name}</span>
                            </td>
                            <td className={styles.tdCategory}>
                                {getCategoryName(course.category)}
                            </td>
                            <td>
                                <LevelBadge level={course.level} />
                            </td>
                            <td>
                                <TypeBadge type={course.type} />
                            </td>
                            <td>
                                <StatusBadge status={course.status} />
                            </td>
                            <td className={styles.tdStats}>
                                {course.views.toLocaleString('fr-FR')}
                            </td>
                            <td className={styles.tdStats}>
                                {course.enrollments}
                            </td>
                            <td className={styles.tdDate}>
                                {formatDate(course.updatedAt)}
                            </td>
                            <td className={styles.tdActions}>
                                <div className={styles.actionButtons}>
                                    <Link
                                        href={`/dashboard/courses/${course.id}`}
                                        className={styles.actionBtn}
                                        title="Modifier"
                                    >
                                        ✏️
                                    </Link>
                                    <Link
                                        href={`/dashboard/courses/${course.id}/preview`}
                                        className={styles.actionBtn}
                                        title="Prévisualiser"
                                    >
                                        👁️
                                    </Link>
                                    {course.status !== 'archived' && onArchive && (
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => onArchive(course.id)}
                                            title="Archiver"
                                        >
                                            📦
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            className={`${styles.actionBtn} ${styles.danger}`}
                                            onClick={() => onDelete(course.id)}
                                            title="Supprimer"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;
