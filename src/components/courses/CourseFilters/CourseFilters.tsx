/* ============================================
   ENSPY COURSES PORTAL - CourseFilters Component
   ============================================ */

'use client';

import React, { useState } from 'react';
import styles from './CourseFilters.module.css';
import { Button } from '@/components/ui';
import { CourseFilters as CourseFiltersType, FilterOption } from '@/types';
import { cn } from '@/lib/utils';
import {
    LEVEL_OPTIONS,
    DURATION_OPTIONS,
    FORMAT_OPTIONS,
    LANGUAGE_OPTIONS,
    TYPE_OPTIONS,
    AVAILABILITY_OPTIONS,
    DATE_ADDED_OPTIONS,
} from '@/lib/constants';

// Icons
const FilterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const CheckIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

interface FilterGroupProps {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onToggle: (value: string) => void;
    defaultOpen?: boolean;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
    title,
    options,
    selectedValues,
    onToggle,
    defaultOpen = true,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={styles['filter-group']}>
            <div className={styles['filter-group-header']} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles['filter-group-title']}>{title}</span>
                <span
                    className={cn(
                        styles['filter-group-toggle'],
                        isOpen && styles['filter-group-toggle--open']
                    )}
                >
                    <ChevronDownIcon />
                </span>
            </div>
            <div
                className={cn(
                    styles['filter-group-content'],
                    !isOpen && styles['filter-group-content--collapsed']
                )}
            >
                <div className={styles['filter-options']}>
                    {options.map((option) => {
                        const isActive = selectedValues.includes(option.value);
                        return (
                            <div
                                key={option.value}
                                className={cn(
                                    styles['filter-option'],
                                    isActive && styles['filter-option--active']
                                )}
                                onClick={() => onToggle(option.value)}
                            >
                                <span className={styles['filter-checkbox']}>
                                    {isActive && <CheckIcon />}
                                </span>
                                <span className={styles['filter-option-label']}>{option.label}</span>
                                {option.count !== undefined && (
                                    <span className={styles['filter-option-count']}>{option.count}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export interface CourseFiltersProps {
    filters: CourseFiltersType;
    onFiltersChange: (filters: CourseFiltersType) => void;
    thematics?: FilterOption[];
    institutions?: FilterOption[];
    instructors?: FilterOption[];
    className?: string;
}

export const CourseFiltersComponent: React.FC<CourseFiltersProps> = ({
    filters,
    onFiltersChange,
    thematics = [],
    institutions = [],
    instructors = [],
    className,
}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleToggleFilter = (key: keyof CourseFiltersType, value: string) => {
        const currentValues = (filters[key] as string[]) || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];

        onFiltersChange({
            ...filters,
            [key]: newValues.length > 0 ? newValues : undefined,
        });
    };

    const handleClearFilters = () => {
        onFiltersChange({});
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.level?.length) count += filters.level.length;
        if (filters.duration?.length) count += filters.duration.length;
        if (filters.format?.length) count += filters.format.length;
        if (filters.type?.length) count += filters.type.length;
        if (filters.language?.length) count += filters.language.length;
        if (filters.availability?.length) count += filters.availability.length;
        if (filters.thematic?.length) count += filters.thematic.length;
        if (filters.institution?.length) count += filters.institution.length;
        if (filters.instructor?.length) count += filters.instructor.length;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    const renderFiltersContent = () => (
        <div className={styles['filters-groups']}>
            <FilterGroup
                title="Niveau"
                options={LEVEL_OPTIONS}
                selectedValues={filters.level || []}
                onToggle={(value) => handleToggleFilter('level', value)}
            />

            <FilterGroup
                title="Durée"
                options={DURATION_OPTIONS}
                selectedValues={filters.duration || []}
                onToggle={(value) => handleToggleFilter('duration', value)}
            />

            <FilterGroup
                title="Format"
                options={FORMAT_OPTIONS}
                selectedValues={filters.format || []}
                onToggle={(value) => handleToggleFilter('format', value)}
            />

            <FilterGroup
                title="Type"
                options={TYPE_OPTIONS}
                selectedValues={filters.type || []}
                onToggle={(value) => handleToggleFilter('type', value)}
            />

            <FilterGroup
                title="Langue"
                options={LANGUAGE_OPTIONS}
                selectedValues={filters.language || []}
                onToggle={(value) => handleToggleFilter('language', value)}
            />

            <FilterGroup
                title="Disponibilité"
                options={AVAILABILITY_OPTIONS}
                selectedValues={filters.availability || []}
                onToggle={(value) => handleToggleFilter('availability', value)}
            />

            {thematics.length > 0 && (
                <FilterGroup
                    title="Thématique"
                    options={thematics}
                    selectedValues={filters.thematic || []}
                    onToggle={(value) => handleToggleFilter('thematic', value)}
                    defaultOpen={false}
                />
            )}

            {institutions.length > 0 && (
                <FilterGroup
                    title="Établissement"
                    options={institutions}
                    selectedValues={filters.institution || []}
                    onToggle={(value) => handleToggleFilter('institution', value)}
                    defaultOpen={false}
                />
            )}

            {instructors.length > 0 && (
                <FilterGroup
                    title="Instructeur"
                    options={instructors}
                    selectedValues={filters.instructor || []}
                    onToggle={(value) => handleToggleFilter('instructor', value)}
                    defaultOpen={false}
                />
            )}

            <FilterGroup
                title="Date d'ajout"
                options={DATE_ADDED_OPTIONS}
                selectedValues={filters.dateAdded ? [filters.dateAdded] : []}
                onToggle={(value) => onFiltersChange({ ...filters, dateAdded: value as CourseFiltersType['dateAdded'] })}
                defaultOpen={false}
            />
        </div>
    );

    return (
        <>
            {/* Desktop Filters */}
            <aside className={cn(styles.filters, className)}>
                <div className={styles['filters-header']}>
                    <h2 className={styles['filters-title']}>
                        <span className={styles['filters-title-icon']}><FilterIcon /></span>
                        Filtres
                    </h2>
                    {activeFiltersCount > 0 && (
                        <button className={styles['filters-clear']} onClick={handleClearFilters}>
                            Effacer ({activeFiltersCount})
                        </button>
                    )}
                </div>
                {renderFiltersContent()}
            </aside>

            {/* Mobile Filters Trigger */}
            <button
                className={styles['filters-mobile-trigger']}
                onClick={() => setIsMobileOpen(true)}
            >
                <FilterIcon />
                <span>Filtres</span>
                {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
            </button>

            {/* Mobile Filters Panel */}
            <div
                className={cn(
                    styles['filters-mobile-overlay'],
                    isMobileOpen && styles['filters-mobile-overlay--open']
                )}
                onClick={() => setIsMobileOpen(false)}
            />
            <div
                className={cn(
                    styles['filters-mobile-panel'],
                    isMobileOpen && styles['filters-mobile-panel--open']
                )}
            >
                <div className={styles['filters-mobile-header']}>
                    <h2 className={styles['filters-title']}>
                        <span className={styles['filters-title-icon']}><FilterIcon /></span>
                        Filtres
                    </h2>
                    <button
                        className={styles['filters-mobile-close']}
                        onClick={() => setIsMobileOpen(false)}
                        aria-label="Fermer les filtres"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className={styles['filters-mobile-content']}>
                    {renderFiltersContent()}
                </div>
                <div className={styles['filters-mobile-footer']}>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => setIsMobileOpen(false)}
                    >
                        Voir les résultats
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CourseFiltersComponent;
