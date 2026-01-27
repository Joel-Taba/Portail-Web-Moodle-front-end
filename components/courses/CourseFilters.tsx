/**
 * CourseFilters Component - ENSPY Admin Portal
 * Filtres pour la liste des cours
 */

'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { CourseFilters as CourseFiltersType } from '@/lib/types';
import styles from './CourseFilters.module.css';

interface CourseFiltersProps {
    filters: CourseFiltersType;
    onFilterChange: (filters: CourseFiltersType) => void;
    onReset: () => void;
    categories: { value: string; label: string }[];
}

export function CourseFilters({
    filters,
    onFilterChange,
    onReset,
    categories,
}: CourseFiltersProps) {
    const handleChange = (key: keyof CourseFiltersType, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const statusOptions = [
        { value: 'all', label: 'Tous les statuts' },
        { value: 'draft', label: 'Brouillon' },
        { value: 'scheduled', label: 'Programmé' },
        { value: 'published', label: 'Publié' },
        { value: 'archived', label: 'Archivé' },
    ];

    const levelOptions = [
        { value: 'all', label: 'Tous les niveaux' },
        { value: 'beginner', label: 'Débutant' },
        { value: 'intermediate', label: 'Intermédiaire' },
        { value: 'expert', label: 'Expert' },
    ];

    const typeOptions = [
        { value: 'all', label: 'Tous les types' },
        { value: 'certified', label: 'Certifiant' },
        { value: 'non-certified', label: 'Non certifiant' },
    ];

    const formatOptions = [
        { value: 'all', label: 'Tous les formats' },
        { value: 'video', label: 'Vidéo' },
        { value: 'text', label: 'Texte' },
        { value: 'exercises', label: 'Exercices' },
        { value: 'mixed', label: 'Mixte' },
    ];

    const categoryOptions = [
        { value: 'all', label: 'Toutes les catégories' },
        ...categories,
    ];

    const hasActiveFilters =
        filters.search ||
        (filters.status && filters.status !== 'all') ||
        (filters.category && filters.category !== 'all') ||
        (filters.level && filters.level !== 'all') ||
        (filters.type && filters.type !== 'all');

    return (
        <div className={styles.container}>
            {/* Recherche */}
            <div className={styles.searchRow}>
                <Input
                    placeholder="Rechercher par titre ou mot-clé..."
                    value={filters.search || ''}
                    onChange={(e) => handleChange('search', e.target.value)}
                    fullWidth
                    leftIcon={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    }
                />
            </div>

            {/* Filtres principaux */}
            <div className={styles.filtersRow}>
                <Select
                    options={statusOptions}
                    value={filters.status || 'all'}
                    onChange={(value) => handleChange('status', value)}
                    fullWidth
                />
                <Select
                    options={categoryOptions}
                    value={filters.category || 'all'}
                    onChange={(value) => handleChange('category', value)}
                    fullWidth
                />
                <Select
                    options={levelOptions}
                    value={filters.level || 'all'}
                    onChange={(value) => handleChange('level', value)}
                    fullWidth
                />
                <Select
                    options={typeOptions}
                    value={filters.type || 'all'}
                    onChange={(value) => handleChange('type', value)}
                    fullWidth
                />
                <Select
                    options={formatOptions}
                    value={filters.format || 'all'}
                    onChange={(value) => handleChange('format', value)}
                    fullWidth
                />
            </div>

            {/* Actions */}
            {hasActiveFilters && (
                <div className={styles.actions}>
                    <Button variant="ghost" size="sm" onClick={onReset}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Réinitialiser les filtres
                    </Button>
                </div>
            )}
        </div>
    );
}

export default CourseFilters;
