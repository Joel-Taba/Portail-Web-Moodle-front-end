/* ============================================
   ENSPY COURSES PORTAL - CourseGrid Component
   ============================================ */

'use client';

import React, { useState } from 'react';
import styles from './CourseGrid.module.css';
import { CourseCard } from '../CourseCard';
import { CourseGridSkeleton, Button } from '@/components/ui';
import { Course, SortOption } from '@/types';
import { cn, formatNumber } from '@/lib/utils';
import { SORT_OPTIONS } from '@/lib/constants';

// Icons
const GridIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const ListIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const SearchIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

const AlertIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

export interface CourseGridProps {
    courses: Course[];
    loading?: boolean;
    error?: string | null;
    total?: number;
    page?: number;
    totalPages?: number;
    sortBy?: SortOption;
    onSortChange?: (sort: SortOption) => void;
    onPageChange?: (page: number) => void;
    onRetry?: () => void;
    className?: string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
    courses,
    loading = false,
    error = null,
    total = 0,
    page = 1,
    totalPages = 1,
    sortBy = 'relevance',
    onSortChange,
    onPageChange,
    onRetry,
    className,
}) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange?.(e.target.value as SortOption);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages: (number | 'ellipsis')[] = [];
        const showPages = 5;
        const halfShow = Math.floor(showPages / 2);

        let startPage = Math.max(1, page - halfShow);
        let endPage = Math.min(totalPages, page + halfShow);

        if (page <= halfShow) {
            endPage = Math.min(totalPages, showPages);
        }
        if (page > totalPages - halfShow) {
            startPage = Math.max(1, totalPages - showPages + 1);
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('ellipsis');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('ellipsis');
            pages.push(totalPages);
        }

        return (
            <nav className={styles['course-grid-pagination']} aria-label="Pagination">
                <button
                    className={styles['course-grid-pagination-btn']}
                    onClick={() => onPageChange?.(page - 1)}
                    disabled={page <= 1}
                    aria-label="Page précédente"
                >
                    <ChevronLeftIcon />
                </button>

                {pages.map((p, index) =>
                    p === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className={styles['course-grid-pagination-ellipsis']}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            className={cn(
                                styles['course-grid-pagination-btn'],
                                p === page && styles['course-grid-pagination-btn--active']
                            )}
                            onClick={() => onPageChange?.(p)}
                            aria-current={p === page ? 'page' : undefined}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    className={styles['course-grid-pagination-btn']}
                    onClick={() => onPageChange?.(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Page suivante"
                >
                    <ChevronRightIcon />
                </button>
            </nav>
        );
    };

    // Loading State
    if (loading) {
        return (
            <div className={cn(styles['course-grid-container'], className)}>
                <div className={styles['course-grid-header']}>
                    <div className={styles['course-grid-count']}>
                        Chargement des cours...
                    </div>
                </div>
                <CourseGridSkeleton count={6} />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className={cn(styles['course-grid-container'], className)}>
                <div className={styles['course-grid-error']}>
                    <div className={styles['course-grid-error-icon']}>
                        <AlertIcon />
                    </div>
                    <h3 className={styles['course-grid-error-title']}>
                        Oups ! Une erreur s&apos;est produite
                    </h3>
                    <p className={styles['course-grid-error-text']}>{error}</p>
                    {onRetry && (
                        <Button variant="primary" onClick={onRetry}>
                            Réessayer
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // Empty State
    if (courses.length === 0) {
        return (
            <div className={cn(styles['course-grid-container'], className)}>
                <div className={styles['course-grid-empty']}>
                    <div className={styles['course-grid-empty-icon']}>
                        <SearchIcon />
                    </div>
                    <h3 className={styles['course-grid-empty-title']}>
                        Aucun cours trouvé
                    </h3>
                    <p className={styles['course-grid-empty-text']}>
                        Essayez de modifier vos filtres ou d&apos;effectuer une nouvelle recherche.
                    </p>
                    {onRetry && (
                        <Button variant="outline" onClick={onRetry}>
                            Effacer les filtres
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn(styles['course-grid-container'], className)}>
            {/* Header */}
            <div className={styles['course-grid-header']}>
                <p className={styles['course-grid-count']}>
                    <strong>{formatNumber(total)}</strong> cours trouvés
                </p>
                <div className={styles['course-grid-controls']}>
                    <div className={styles['course-grid-sort']}>
                        <label htmlFor="sort-select" className={styles['course-grid-sort-label']}>
                            Trier par :
                        </label>
                        <select
                            id="sort-select"
                            className={styles['course-grid-sort-select']}
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['course-grid-view-toggle']}>
                        <button
                            className={cn(
                                styles['course-grid-view-btn'],
                                viewMode === 'grid' && styles['course-grid-view-btn--active']
                            )}
                            onClick={() => setViewMode('grid')}
                            aria-label="Vue grille"
                        >
                            <GridIcon />
                        </button>
                        <button
                            className={cn(
                                styles['course-grid-view-btn'],
                                viewMode === 'list' && styles['course-grid-view-btn--active']
                            )}
                            onClick={() => setViewMode('list')}
                            aria-label="Vue liste"
                        >
                            <ListIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div
                className={cn(
                    styles['course-grid'],
                    viewMode === 'list' && styles['course-grid--list']
                )}
            >
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        variant={viewMode === 'list' ? 'horizontal' : 'default'}
                    />
                ))}
            </div>

            {/* Pagination */}
            {renderPagination()}
        </div>
    );
};

export default CourseGrid;
