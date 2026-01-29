/**
 * Courses Page - ENSPY Admin Portal
 * Page de gestion des cours avec liste, filtres et actions
 */

'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { coursesStorage, categoriesStorage } from '@/lib/storage';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/Modal';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseList } from '@/components/courses/CourseList';
import type { Course, Category, CourseFilters as CourseFiltersType, ViewMode } from '@/lib/types';
import styles from './page.module.css';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

function CoursesPageContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();

    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filters, setFilters] = useState<CourseFiltersType>({
        status: (searchParams.get('status') || 'all') as CourseFiltersType['status'],
        category: 'all',
        level: 'all',
        type: 'all',
        format: 'all',
        search: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Modal de confirmation
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; courseId: string; courseTitle: string }>({
        isOpen: false,
        courseId: '',
        courseTitle: '',
    });

    // Charger les données
    useEffect(() => {
        setCourses(coursesStorage.getAll());
        setCategories(categoriesStorage.getAll());
    }, []);

    // Options de catégories pour les filtres
    const categoryOptions = useMemo(() => {
        return categories
            .filter(c => c.parentId === null)
            .map(c => ({
                value: c.id,
                label: c.name,
            }));
    }, [categories]);

    // Filtrer les cours
    const filteredCourses = useMemo(() => {
        return courses
            // Exclure les cours archivés de cette page (ils sont sur /dashboard/courses/archived)
            .filter(course => course.status !== 'archived')
            .filter(course => {
                // Filtre par recherche
                if (filters.search) {
                    const searchLower = filters.search.toLowerCase();
                    const matchesTitle = course.title.toLowerCase().includes(searchLower);
                    const matchesInstructor = course.instructor.name.toLowerCase().includes(searchLower);
                    if (!matchesTitle && !matchesInstructor) return false;
                }

                // Filtre par statut
                if (filters.status && filters.status !== 'all' && course.status !== filters.status) {
                    return false;
                }

                // Filtre par catégorie (inclut les sous-catégories)
                if (filters.category && filters.category !== 'all') {
                    const courseCategory = categories.find(c => c.id === course.category);
                    const isMatch = course.category === filters.category ||
                        courseCategory?.parentId === filters.category;
                    if (!isMatch) return false;
                }

                // Filtre par niveau
                if (filters.level && filters.level !== 'all' && course.level !== filters.level) {
                    return false;
                }

                // Filtre par type
                if (filters.type && filters.type !== 'all') {
                    if ((filters.type as string) === 'non-certified') {
                        // "Non certifiant" matches everything NOT certified (e.g. free, paid)
                        if (course.type === 'certified') return false;
                    } else if ((course.type as string) !== filters.type) {
                        return false;
                    }
                }

                // Ensure only allowed types are shown generally (Certifiant / Non certifiant)
                // Assuming data might have old types, we might want to strict filter or just rely on the UI filter options
                // But user said "supprime tous les autres types qui existent", implies data cleanup or strict filter.
                // I'll strictly filter for only 'certified' (Certifiant) and 'free'/'paid' (Non certifiant??). 
                // Wait, user said "Certifiant" and "Non certifiant". 
                // My types are 'free' | 'paid' | 'certified'. 
                // I should probably map 'free'/'paid' to "Non certifiant" UI-wise, or strictly allow only 'certified' and some 'non-certified' type.
                // Let's assume 'free' and 'paid' are "Non certifiant" for now, or I should update the types?
                // "supprime tous les autres types" -> implies I should maybe consolidate 'free'/'paid' into 'standard' or similar?
                // Or just filter.
                // User said: "Concernant egalement le type de cours, les types que je souhaite sont "Certifiant" et "Non certifiant", supprime tous les autres types qui existent."
                // This is a data/type change. 
                // For now, I will treat 'certified' as Certifiant. 
                // 'free' and 'paid' -> I will treat as "Non certifiant".
                // Actually, I should check `CourseFilters` options.
                // Only 'certified' and 'non-certified' (new type?)
                // I'll stick to 'certified' and 'free' (as non-certifiant) for now, or better, add 'non-certified' to types if possible, but types.ts is shared.
                // Let's check `CourseFilters.tsx` in a moment. For `page.tsx`, I'll leave the logic generic but I need to make sure the data corresponds.

                // Actually, the user wants me to REMOVE other types.
                // This might mean I should update the `CourseFilters` options to ONLY show these two.
                // And in `page.tsx`, I don't need to change much unless I restrict the data.
                // I'll just keep the existing filter logic here.

                // Filtre par format
                if (filters.format && filters.format !== 'all' && course.format !== filters.format) {
                    return false;
                }

                return true;
            }).sort((a, b) => a.order - b.order);
    }, [courses, categories, filters]);

    // Pagination
    const paginatedCourses = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCourses.slice(start, start + itemsPerPage);
    }, [filteredCourses, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Handlers
    const handleFilterChange = (newFilters: CourseFiltersType) => {
        setFilters(newFilters);
    };

    const handleResetFilters = () => {
        setFilters({
            status: 'all',
            category: 'all',
            level: 'all',
            type: 'all',
            format: 'all',
            search: '',
        });
    };

    const handleArchive = (id: string) => {
        const course = courses.find(c => c.id === id);
        if (!course) return;

        coursesStorage.update(id, { status: 'archived' });
        setCourses(coursesStorage.getAll());
    };

    const handleDeleteClick = (id: string) => {
        const course = courses.find(c => c.id === id);
        if (course) {
            setDeleteModal({
                isOpen: true,
                courseId: id,
                courseTitle: course.title,
            });
        }
    };

    const handleDeleteConfirm = () => {
        const { courseId } = deleteModal;

        coursesStorage.delete(courseId);
        setCourses(coursesStorage.getAll());

        setDeleteModal({ isOpen: false, courseId: '', courseTitle: '' });
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Gestion des cours</h1>
                    <p className={styles.subtitle}>
                        {filteredCourses.length} cours
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

            {/* Filtres */}
            <CourseFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                categories={categoryOptions}
            />

            {/* Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                        onClick={() => setViewMode('grid')}
                        aria-label="Vue grille"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.viewBtn} ${viewMode === 'table' ? styles.active : ''}`}
                        onClick={() => setViewMode('table')}
                        aria-label="Vue tableau"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.paginationInfo}>
                    <span>Afficher</span>
                    <select
                        className={styles.perPageSelect}
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        {ITEMS_PER_PAGE_OPTIONS.map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <span>par page</span>
                </div>
            </div>

            {/* Liste des cours */}
            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {paginatedCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            categories={categories}
                            onArchive={handleArchive}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            ) : (
                <CourseList
                    courses={paginatedCourses}
                    categories={categories}
                    onArchive={handleArchive}
                    onDelete={handleDeleteClick}
                />
            )}

            {/* État vide */}
            {filteredCourses.length === 0 && (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>📚</div>
                    <h3>Aucun cours trouvé</h3>
                    <p>Essayez de modifier vos filtres ou créez un nouveau cours.</p>
                    <Link href="/dashboard/courses/new">
                        <Button variant="primary">Créer un cours</Button>
                    </Link>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        className={styles.pageBtn}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        ← Précédent
                    </button>

                    <div className={styles.pageNumbers}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`${styles.pageNum} ${currentPage === page ? styles.active : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className={styles.pageBtn}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}

            {/* Modal de confirmation de suppression */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, courseId: '', courseTitle: '' })}
                onConfirm={handleDeleteConfirm}
                title="Supprimer le cours ?"
                message={`Êtes-vous sûr de vouloir supprimer "${deleteModal.courseTitle}" ? Cette action est irréversible.`}
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                variant="danger"
            />
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <p>Chargement...</p>
            </div>
        }>
            <CoursesPageContent />
        </Suspense>
    );
}
