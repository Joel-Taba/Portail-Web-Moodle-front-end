/**
 * Categories Page - ENSPY Admin Portal
 * Page de gestion des catégories
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { activityStorage, generateId } from '@/lib/storage';
import { categoriesApi } from '@/lib/api/categoriesApi';
import { coursesApi } from '@/lib/api/coursesApi';
import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/Modal';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { CategoryForm } from '@/components/categories/CategoryForm';
import type { Category } from '@/lib/types';
import styles from './page.module.css';

export default function CategoriesPage() {
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<{ category: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form modal state
    const [formModal, setFormModal] = useState<{
        isOpen: boolean;
        category?: Category;
        defaultParentId?: string;
    }>({
        isOpen: false,
    });

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        category?: Category;
    }>({
        isOpen: false,
    });

    // Load data
    const loadData = async () => {
        try {
            setIsLoading(true);
            const [loadedCategories, loadedCourses] = await Promise.all([
                categoriesApi.getAll(),
                coursesApi.getAll()
            ]);
            setCategories(loadedCategories);
            setCourses(loadedCourses.map(c => ({ category: c.category })));
            setError(null);
        } catch (err) {
            console.error('Failed to load categories data:', err);
            setError('Impossible de charger les données. Vérifiez votre connexion.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Get parent categories (those without parentId)
    const parentCategories = useMemo(() => {
        return categories.filter(c => c.parentId === null).sort((a, b) => a.order - b.order);
    }, [categories]);

    // Get subcategories for a parent
    const getSubcategories = (parentId: string) => {
        return categories.filter(c => c.parentId === parentId).sort((a, b) => a.order - b.order);
    };

    // Count courses in a category (including subcategories)
    const getCourseCount = (categoryId: string) => {
        const subcategoryIds = categories
            .filter(c => c.parentId === categoryId)
            .map(c => c.id);

        return courses.filter(c =>
            c.category === categoryId || subcategoryIds.includes(c.category)
        ).length;
    };

    // Handlers
    const handleAddCategory = () => {
        setFormModal({ isOpen: true });
    };

    const handleAddSubcategory = (parentId: string) => {
        setFormModal({ isOpen: true, defaultParentId: parentId });
    };

    const handleEdit = (category: Category) => {
        setFormModal({ isOpen: true, category });
    };

    const handleDelete = (category: Category) => {
        setDeleteModal({ isOpen: true, category });
    };

    const handleFormSubmit = async (data: Partial<Category>) => {
        try {
            if (formModal.category) {
                // Update existing
                await categoriesApi.update(formModal.category.id, data);

                activityStorage.add({
                    action: 'update',
                    entityType: 'category',
                    entityId: formModal.category.id,
                    entityTitle: data.name || formModal.category.name,
                    userId: user?.id || '',
                    userName: user?.name || '',
                });
            } else {
                // Create new
                // Le backend gère le slug et la date
                // Pour l'instant l'ordre est géré manuellement ou par défaut 0
                const newCategory = await categoriesApi.create(data);

                activityStorage.add({
                    action: 'create',
                    entityType: 'category',
                    entityId: newCategory.id,
                    entityTitle: newCategory.name,
                    userId: user?.id || '',
                    userName: user?.name || '',
                });
            }

            await loadData();
            setFormModal({ isOpen: false });
        } catch (err) {
            console.error('Failed to save category:', err);
            alert('Erreur lors de l\'enregistrement de la catégorie.');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.category) return;

        const categoryToDelete = deleteModal.category;

        try {
            // Check if it has subcategories
            const hasSubcategories = categories.some(c => c.parentId === categoryToDelete.id);
            if (hasSubcategories) {
                // Delete subcategories first
                // TODO: Idéalement transactionnel ou gérer côté backend
                const subcategories = categories.filter(c => c.parentId === categoryToDelete.id);
                for (const sub of subcategories) {
                    await categoriesApi.delete(sub.id);
                }
            }

            await categoriesApi.delete(categoryToDelete.id);

            activityStorage.add({
                action: 'delete',
                entityType: 'category',
                entityId: categoryToDelete.id,
                entityTitle: categoryToDelete.name,
                userId: user?.id || '',
                userName: user?.name || '',
            });

            await loadData();
            setDeleteModal({ isOpen: false });
        } catch (err) {
            console.error('Failed to delete category:', err);
            alert('Erreur lors de la suppression de la catégorie.');
        }
    };

    // Get parent categories only for the form
    const formParentCategories = useMemo(() => {
        // If editing a parent category, don't show it in the list
        if (formModal.category && formModal.category.parentId === null) {
            return parentCategories.filter(c => c.id !== formModal.category?.id);
        }
        return parentCategories;
    }, [parentCategories, formModal.category]);

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Chargement des catégories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <p>{error}</p>
                    <Button variant="primary" onClick={() => loadData()}>Réessayer</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Gestion des catégories</h1>
                    <p className={styles.subtitle}>
                        {parentCategories.length} catégorie{parentCategories.length > 1 ? 's' : ''} principale{parentCategories.length > 1 ? 's' : ''}
                    </p>
                </div>
                <Button variant="primary" onClick={handleAddCategory} leftIcon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                }>
                    Nouvelle catégorie
                </Button>
            </div>

            {/* Categories grid */}
            {parentCategories.length > 0 ? (
                <div className={styles.grid}>
                    {parentCategories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            subcategories={getSubcategories(category.id)}
                            courseCount={getCourseCount(category.id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAddSubcategory={handleAddSubcategory}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>📁</div>
                    <h3>Aucune catégorie</h3>
                    <p>Créez votre première catégorie pour organiser vos cours.</p>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Créer une catégorie
                    </Button>
                </div>
            )}

            {/* Category Form Modal */}
            <CategoryForm
                isOpen={formModal.isOpen}
                onClose={() => setFormModal({ isOpen: false })}
                onSubmit={handleFormSubmit}
                category={formModal.category}
                parentCategories={formParentCategories}
                defaultParentId={formModal.defaultParentId}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false })}
                onConfirm={handleDeleteConfirm}
                title="Supprimer la catégorie ?"
                message={
                    deleteModal.category?.parentId === null
                        ? `Êtes-vous sûr de vouloir supprimer "${deleteModal.category?.name}" et toutes ses sous-catégories ? Les cours associés ne seront pas supprimés.`
                        : `Êtes-vous sûr de vouloir supprimer "${deleteModal.category?.name}" ? Les cours associés ne seront pas supprimés.`
                }
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                variant="danger"
            />
        </div>
    );
}
