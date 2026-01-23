/**
 * Dashboard Page - ENSPY Admin Portal
 * Page principale du tableau de bord
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { coursesStorage, categoriesStorage, activityStorage } from '@/lib/storage';
import { generateDashboardStats } from '@/lib/mockData';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/Button';
import {
    PlusIcon,
    FolderIcon,
    OrderingIcon,
    EditIcon,
    StarFilledIcon,
    CheckCircleIcon,
    AlertCircleIcon,
    ArchiveIcon,
    DeleteIcon,
    ChartBarIcon,
} from '@/components/icons';
import type { Course, Category, ActivityLog, DashboardStats } from '@/lib/types';
import styles from './page.module.css';

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
    const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);

    useEffect(() => {
        // Charger les données
        const loadedCourses = coursesStorage.getAll();
        const loadedCategories = categoriesStorage.getAll();
        const loadedActivity = activityStorage.getAll();

        setCourses(loadedCourses);
        setCategories(loadedCategories);
        setRecentActivity(loadedActivity.slice(0, 5));
        setStats(generateDashboardStats(loadedCourses));

        // Cours tendances (triés par vues)
        const trending = [...loadedCourses]
            .filter(c => c.status === 'published')
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
        setTrendingCourses(trending);
    }, []);

    // Calculer la répartition par catégorie
    const categoryDistribution = React.useMemo(() => {
        const mainCategories = categories.filter(c => c.parentId === null);
        return mainCategories.map(cat => {
            const count = courses.filter(c => {
                const courseCategory = categories.find(cc => cc.id === c.category);
                return courseCategory?.id === cat.id || courseCategory?.parentId === cat.id;
            }).length;
            return { name: cat.name, count, color: cat.color || '#6366F1' };
        }).filter(c => c.count > 0);
    }, [courses, categories]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getActionLabel = (action: string) => {
        const labels: Record<string, string> = {
            create: 'Création',
            update: 'Modification',
            delete: 'Suppression',
            archive: 'Archivage',
            publish: 'Publication',
            unpublish: 'Dépublication',
        };
        return labels[action] || action;
    };

    if (!stats) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* En-tête */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Tableau de bord</h1>
                    <p className={styles.subtitle}>
                        Bienvenue, {user?.name} ! Voici un aperçu de vos cours.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/dashboard/courses/new">
                        <Button variant="primary" leftIcon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        }>
                            Nouveau cours
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Statistiques */}
            <section className={styles.statsGrid}>
                <StatsCard
                    title="Total des cours"
                    value={stats.totalCourses}
                    variant="primary"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M9 8L15 12L9 16V8Z" fill="currentColor" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Cours publiés"
                    value={stats.publishedCourses}
                    variant="success"
                    trend={{ value: 12, isPositive: true, label: 'ce mois' }}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
                <StatsCard
                    title="En brouillon"
                    value={stats.draftCourses}
                    variant="warning"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4V20H20V13M18 2L22 6L12 16H8V12L18 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Vues totales"
                    value={stats.totalViews.toLocaleString('fr-FR')}
                    variant="secondary"
                    trend={{ value: 8, isPositive: true, label: 'cette semaine' }}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    }
                />
            </section>

            {/* Contenu principal */}
            <div className={styles.mainContent}>
                {/* Colonne gauche */}
                <div className={styles.leftColumn}>
                    {/* Répartition par catégorie */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Répartition par catégorie</h2>
                        </div>
                        <div className={styles.chartContainer}>
                            <div className={styles.barChart}>
                                {categoryDistribution.map((cat, index) => (
                                    <div key={index} className={styles.barItem}>
                                        <div className={styles.barLabel}>
                                            <span>{cat.name}</span>
                                            <span className={styles.barValue}>{cat.count}</span>
                                        </div>
                                        <div className={styles.barTrack}>
                                            <div
                                                className={styles.barFill}
                                                style={{
                                                    width: `${(cat.count / Math.max(...categoryDistribution.map(c => c.count))) * 100}%`,
                                                    backgroundColor: cat.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Cours tendances */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Cours populaires</h2>
                            <Link href="/dashboard/courses" className={styles.sectionLink}>
                                Voir tout
                            </Link>
                        </div>
                        <div className={styles.coursesList}>
                            {trendingCourses.map((course, index) => (
                                <Link
                                    key={course.id}
                                    href={`/dashboard/courses/${course.id}`}
                                    className={styles.courseItem}
                                >
                                    <span className={styles.courseRank}>{index + 1}</span>
                                    <img
                                        src={course.thumbnailUrl}
                                        alt={course.title}
                                        className={styles.courseThumbnail}
                                    />
                                    <div className={styles.courseInfo}>
                                        <span className={styles.courseTitle}>{course.title}</span>
                                        <span className={styles.courseStats}>
                                            {course.views.toLocaleString('fr-FR')} vues • {course.enrollments} inscrits
                                        </span>
                                    </div>
                                    <div className={styles.courseRating}>
                                        <StarFilledIcon size={16} color="var(--accent-gold)" /> {course.rating}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Colonne droite */}
                <div className={styles.rightColumn}>
                    {/* Actions rapides */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Actions rapides</h2>
                        <div className={styles.quickActions}>
                            <Link href="/dashboard/courses/new" className={styles.quickAction}>
                                <span className={styles.quickActionIcon}><PlusIcon size={20} /></span>
                                <span>Créer un cours</span>
                            </Link>
                            <Link href="/dashboard/categories" className={styles.quickAction}>
                                <span className={styles.quickActionIcon}><FolderIcon size={20} /></span>
                                <span>Gérer les catégories</span>
                            </Link>
                            <Link href="/dashboard/ordering" className={styles.quickAction}>
                                <span className={styles.quickActionIcon}><OrderingIcon size={20} /></span>
                                <span>Ordonnancer</span>
                            </Link>
                            <Link href="/dashboard/courses?status=draft" className={styles.quickAction}>
                                <span className={styles.quickActionIcon}><EditIcon size={20} /></span>
                                <span>Brouillons ({stats.draftCourses})</span>
                            </Link>
                        </div>
                    </section>

                    {/* Activité récente */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Activité récente</h2>
                        <div className={styles.activityList}>
                            {recentActivity.length > 0 ? (
                                recentActivity.map((log) => (
                                    <div key={log.id} className={styles.activityItem}>
                                        <div className={styles.activityIcon}>
                                            {log.action === 'create' && <PlusIcon size={16} />}
                                            {log.action === 'update' && <EditIcon size={16} />}
                                            {log.action === 'delete' && <DeleteIcon size={16} />}
                                            {log.action === 'archive' && <ArchiveIcon size={16} />}
                                            {log.action === 'publish' && <CheckCircleIcon size={16} />}
                                        </div>
                                        <div className={styles.activityContent}>
                                            <span className={styles.activityAction}>
                                                {getActionLabel(log.action)}
                                            </span>
                                            <span className={styles.activityEntity}>
                                                {log.entityTitle}
                                            </span>
                                            <span className={styles.activityMeta}>
                                                Par {log.userName} • {formatDate(log.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.emptyState}>Aucune activité récente</p>
                            )}
                        </div>
                    </section>

                    {/* Résumé */}
                    <section className={styles.summaryCard}>
                        <div className={styles.summaryIcon}><ChartBarIcon size={32} /></div>
                        <h3 className={styles.summaryTitle}>Résumé du mois</h3>
                        <div className={styles.summaryStats}>
                            <div className={styles.summaryStat}>
                                <span className={styles.summaryValue}>{stats.totalEnrollments.toLocaleString('fr-FR')}</span>
                                <span className={styles.summaryLabel}>Inscriptions totales</span>
                            </div>
                            <div className={styles.summaryStat}>
                                <span className={styles.summaryValue}>{stats.averageRating}</span>
                                <span className={styles.summaryLabel}>Note moyenne</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
