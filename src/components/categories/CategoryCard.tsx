/**
 * CategoryCard Component - ENSPY Admin Portal
 * Carte de catégorie avec sous-catégories
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui_admin/Button';
import { Badge } from '@/components/ui_admin/Badge';
import type { Category } from '@/lib/types';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
    category: Category;
    subcategories: Category[];
    courseCount: number;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onAddSubcategory: (parentId: string) => void;
}

export function CategoryCard({
    category,
    subcategories,
    courseCount,
    onEdit,
    onDelete,
    onAddSubcategory,
}: CategoryCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.icon}>{category.icon || '📁'}</span>
                    <div className={styles.info}>
                        <h3 className={styles.name}>{category.name}</h3>
                        {category.description && (
                            <p className={styles.description}>{category.description}</p>
                        )}
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <Badge variant="secondary" size="sm">
                        {courseCount} cours
                    </Badge>
                    <Badge variant="default" size="sm">
                        {subcategories.length} sous-catégories
                    </Badge>
                </div>
            </div>

            {/* Subcategories */}
            {subcategories.length > 0 && (
                <div className={styles.subcategories}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <svg
                            className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6 4L10 8L6 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Sous-catégories</span>
                    </button>

                    {isExpanded && (
                        <div className={styles.subcategoryList}>
                            {subcategories.map((sub) => (
                                <div key={sub.id} className={styles.subcategoryItem}>
                                    <div className={styles.subcategoryInfo}>
                                        <span className={styles.subcategoryIcon}>{sub.icon || '📂'}</span>
                                        <span className={styles.subcategoryName}>{sub.name}</span>
                                    </div>
                                    <div className={styles.subcategoryActions}>
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => onEdit(sub)}
                                            title="Modifier"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className={`${styles.actionBtn} ${styles.danger}`}
                                            onClick={() => onDelete(sub)}
                                            title="Supprimer"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className={styles.actions}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddSubcategory(category.id)}
                >
                    + Ajouter sous-catégorie
                </Button>
                <div className={styles.actionButtons}>
                    <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
                        Modifier
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(category)}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
