/**
 * Archived Courses Page - ENSPY Admin Portal
 * Gestion des cours archivés
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { activityStorage } from '@/lib/storage';
import { coursesApi } from '@/lib/api/coursesApi';
import { Button } from '@/components/ui';
import { Card, CardBody } from '@/components/ui';
import {
    ArchiveIcon,
    UnarchiveIcon,
    DeleteIcon,
    EyeIcon,
    ClockIcon,
    UsersIcon,
} from '@/components/icons';
import type { Course, ActivityLog } from '@/lib/types';
import styles from './page.module.css';

// Search icon inline for header
const SearchIconInline = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export default function ArchivedCoursesPage() {
    const { user } = useAuth();
    const [archivedCourses, setArchivedCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadArchivedCourses();
    }, []);

    const loadArchivedCourses = async () => {
        try {
            setIsLoading(true);
            const courses = await coursesApi.getAll();
            const archived = courses.filter(c => c.status === 'archived');
            setArchivedCourses(archived);
        } catch (error) {
            console.error('Failed to load archived courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnarchive = async (courseId: string) => {
        const course = archivedCourses.find(c => c.id === courseId);
        if (!course) return;

        try {
            await coursesApi.changeStatus(courseId, 'draft');

            // Log activity (local storage as requested)
            const log: ActivityLog = {
                id: `log_${Date.now()}`,
                action: 'update',
                entityType: 'course',
                entityId: courseId,
                entityTitle: course.title,
                userId: user?.id || 'unknown',
                userName: user?.name || 'Utilisateur',
                timestamp: new Date().toISOString(),
                description: 'Cours désarchivé et passé en brouillon',
            };
            activityStorage.add(log);

            loadArchivedCourses();
        } catch (error) {
            console.error('Failed to unarchive course:', error);
            alert('Erreur lors du désarchivage.');
        }
    };

    const handleDelete = async (courseId: string) => {
        const course = archivedCourses.find(c => c.id === courseId);
        if (!course) return;

        try {
            await coursesApi.delete(courseId);

            // Log activity
            const log: ActivityLog = {
                id: `log_${Date.now()}`,
                action: 'delete',
                entityType: 'course',
                entityId: courseId,
                entityTitle: course.title,
                userId: user?.id || 'unknown',
                userName: user?.name || 'Utilisateur',
                timestamp: new Date().toISOString(),
                description: 'Cours supprimé définitivement',
            };
            activityStorage.add(log);

            setShowConfirmDelete(null);
            loadArchivedCourses();
        } catch (error) {
            console.error('Failed to delete course:', error);
            alert('Erreur lors de la suppression.');
        }
    };

    const filteredCourses = archivedCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <ArchiveIcon size={28} /> Cours archivés
                    </h1>
                    <p className={styles.subtitle}>
                        Gérez vos cours archivés : désarchivez-les pour les rendre à nouveau visibles ou supprimez-les définitivement.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/dashboard/courses">
                        <Button variant="outline">
                            ← Retour aux cours
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsCard}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{archivedCourses.length}</span>
                    <span className={styles.statLabel}>Cours archivés</span>
                </div>
            </div>

            {/* Search */}
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <SearchIconInline />
                    <input
                        type="text"
                        placeholder="Rechercher dans les archives..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {/* Courses List */}
            {filteredCourses.length > 0 ? (
                <div className={styles.coursesList}>
                    {filteredCourses.map((course) => (
                        <Card key={course.id} variant="elevated" className={styles.courseCard}>
                            <div className={styles.courseCardContent}>
                                {/* Thumbnail */}
                                <div className={styles.thumbnail}>
                                    <img src={course.thumbnailUrl} alt={course.title} />
                                </div>

                                {/* Info */}
                                <div className={styles.courseInfo}>
                                    <h3 className={styles.courseTitle}>{course.title}</h3>
                                    <p className={styles.courseDescription}>{course.shortDescription}</p>
                                    <div className={styles.courseMeta}>
                                        <span className={styles.metaItem}>
                                            <ClockIcon size={14} /> {course.duration}h
                                        </span>
                                        <span className={styles.metaItem}>
                                            <UsersIcon size={14} /> {course.enrollments} inscrits
                                        </span>
                                        <span className={styles.metaItem}>
                                            Archivé le {formatDate(course.updatedAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className={styles.courseActions}>
                                    <Link href={`/dashboard/courses/${course.id}`}>
                                        <Button variant="ghost" size="sm" title="Voir les détails">
                                            <EyeIcon size={18} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleUnarchive(course.id)}
                                        title="Désarchiver"
                                    >
                                        <UnarchiveIcon size={18} />
                                    </Button>
                                    {showConfirmDelete === course.id ? (
                                        <div className={styles.confirmDelete}>
                                            <span>Confirmer ?</span>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleDelete(course.id)}
                                            >
                                                Oui
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowConfirmDelete(null)}
                                            >
                                                Non
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowConfirmDelete(course.id)}
                                            title="Supprimer définitivement"
                                            className={styles.dangerBtn}
                                        >
                                            <DeleteIcon size={18} />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card variant="elevated" className={styles.emptyState}>
                    <CardBody>
                        <div className={styles.emptyStateContent}>
                            <ArchiveIcon size={48} />
                            <h3>Aucun cours archivé</h3>
                            <p>
                                {searchTerm
                                    ? 'Aucun cours archivé ne correspond à votre recherche.'
                                    : 'Vous n\'avez pas encore archivé de cours. Les cours archivés apparaîtront ici.'}
                            </p>
                            <Link href="/dashboard/courses">
                                <Button variant="primary">
                                    Voir tous les cours
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
