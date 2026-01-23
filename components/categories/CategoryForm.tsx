/**
 * CategoryForm Component - ENSPY Admin Portal
 * Formulaire de création/modification de catégorie
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Category } from '@/lib/types';
import styles from './CategoryForm.module.css';

interface CategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Category>) => void;
    category?: Category;
    parentCategories: Category[];
    defaultParentId?: string;
}

const EMOJI_OPTIONS = [
    '💻', '🔧', '⚡', '🏗️', '📐', '📊', '🔬', '🧪',
    '🎓', '📚', '✏️', '🔢', '🌐', '🛡️', '🤖', '📱',
];

export function CategoryForm({
    isOpen,
    onClose,
    onSubmit,
    category,
    parentCategories,
    defaultParentId,
}: CategoryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '📁',
        parentId: null as string | null,
        order: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset form when opening with category data
    useEffect(() => {
        if (isOpen) {
            if (category) {
                setFormData({
                    name: category.name,
                    description: category.description || '',
                    icon: category.icon || '📁',
                    parentId: category.parentId,
                    order: category.order,
                });
            } else {
                setFormData({
                    name: '',
                    description: '',
                    icon: '📁',
                    parentId: defaultParentId || null,
                    order: 0,
                });
            }
            setErrors({});
        }
    }, [isOpen, category, defaultParentId]);

    const parentOptions = [
        { value: '', label: 'Aucune (catégorie principale)' },
        ...parentCategories.map(c => ({
            value: c.id,
            label: `${c.icon || ''} ${c.name}`.trim(),
        })),
    ];

    const handleChange = (field: string, value: string | null) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est obligatoire';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                parentId: formData.parentId || null,
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            size="md"
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Emoji selector */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Icône</label>
                    <div className={styles.emojiGrid}>
                        {EMOJI_OPTIONS.map(emoji => (
                            <button
                                key={emoji}
                                type="button"
                                className={`${styles.emojiBtn} ${formData.icon === emoji ? styles.selected : ''}`}
                                onClick={() => handleChange('icon', emoji)}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name */}
                <Input
                    label="Nom de la catégorie"
                    placeholder="Ex: Informatique"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    required
                    fullWidth
                />

                {/* Description */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Description
                        <span className={styles.optional}>(optionnel)</span>
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Brève description de la catégorie..."
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                    />
                </div>

                {/* Parent category */}
                <Select
                    label="Catégorie parente"
                    options={parentOptions}
                    value={formData.parentId || ''}
                    onChange={(value) => handleChange('parentId', value || null)}
                    fullWidth
                />

                {/* Actions */}
                <div className={styles.actions}>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                        {category ? 'Enregistrer' : 'Créer'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default CategoryForm;
