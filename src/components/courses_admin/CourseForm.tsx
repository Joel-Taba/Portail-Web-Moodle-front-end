/**
 * CourseForm Component - ENSPY Admin Portal
 * Formulaire de création/modification de cours
 */

'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui_admin/Input';
import { Select } from '@/components/ui_admin/Select';
import { Button } from '@/components/ui_admin/Button';
import { Badge } from '@/components/ui_admin/Badge';
import type { Course, Category, CourseLevel, CourseFormat, CourseLanguage, CourseType, CourseStatus } from '@/lib/types';
import styles from './CourseForm.module.css';

interface CourseFormProps {
    course?: Course;
    categories: Category[];
    onSubmit: (data: Partial<Course>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const defaultInstructor = {
    name: '',
    photo: '',
    bio: '',
    expertise: '',
};

export function CourseForm({
    course,
    categories,
    onSubmit,
    onCancel,
    isLoading = false,
}: CourseFormProps) {
    const [formData, setFormData] = useState({
        title: course?.title || '',
        shortDescription: course?.shortDescription || '',
        longDescription: course?.longDescription || '',
        category: course?.category || '',
        tags: course?.tags || [],
        level: course?.level || 'beginner' as CourseLevel,
        duration: course?.duration || 1,
        format: course?.format || 'mixed' as CourseFormat,
        language: course?.language || 'fr' as CourseLanguage,
        type: course?.type || 'free' as CourseType,
        status: course?.status || 'draft' as CourseStatus,
        instructor: course?.instructor || { ...defaultInstructor },
        prerequisites: course?.prerequisites || '',
        targetAudience: course?.targetAudience || '',
        thumbnailUrl: course?.thumbnailUrl || '',
        teaserVideoUrl: course?.teaserVideoUrl || '',
        redirectUrl: course?.redirectUrl || '',
        isFeatured: course?.isFeatured || false,
        isTrending: course?.isTrending || false,
    });

    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Options pour les selects
    const categoryOptions = categories
        .filter(c => c.parentId !== null) // Seulement les sous-catégories
        .map(c => {
            const parent = categories.find(p => p.id === c.parentId);
            return {
                value: c.id,
                label: parent ? `${parent.name} › ${c.name}` : c.name,
            };
        });

    const levelOptions = [
        { value: 'beginner', label: 'Débutant' },
        { value: 'intermediate', label: 'Intermédiaire' },
        { value: 'expert', label: 'Expert' },
    ];

    const formatOptions = [
        { value: 'video', label: 'Vidéo' },
        { value: 'text', label: 'Texte' },
        { value: 'exercises', label: 'Exercices' },
        { value: 'mixed', label: 'Mixte' },
    ];

    const languageOptions = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'Anglais' },
        { value: 'other', label: 'Autre' },
    ];

    const typeOptions = [
        { value: 'free', label: 'Gratuit' },
        { value: 'paid', label: 'Payant' },
        { value: 'certified', label: 'Certifiant' },
    ];

    const statusOptions = [
        { value: 'draft', label: 'Brouillon' },
        { value: 'scheduled', label: 'Programmé' },
        { value: 'published', label: 'Publié' },
        { value: 'archived', label: 'Archivé' },
    ];

    // Handlers
    const handleChange = (field: string, value: unknown) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleInstructorChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            instructor: { ...prev.instructor, [field]: value },
        }));
    };

    const handleAddTag = () => {
        const tag = tagInput.trim().toLowerCase();
        if (tag && !formData.tags.includes(tag)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove),
        }));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est obligatoire';
        }
        if (!formData.shortDescription.trim()) {
            newErrors.shortDescription = 'La description courte est obligatoire';
        }
        if (formData.shortDescription.length > 200) {
            newErrors.shortDescription = 'Maximum 200 caractères';
        }
        if (!formData.category) {
            newErrors.category = 'La catégorie est obligatoire';
        }
        if (!formData.instructor.name.trim()) {
            newErrors.instructorName = 'Le nom de l\'instructeur est obligatoire';
        }
        if (!formData.redirectUrl.trim()) {
            newErrors.redirectUrl = 'L\'URL de redirection est obligatoire';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* Section : Informations de base */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📝</span>
                    Informations de base
                </h2>

                <div className={styles.fieldGroup}>
                    <Input
                        label="Titre du cours"
                        placeholder="Ex: Introduction à Python pour Ingénieurs"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        error={errors.title}
                        required
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <Input
                        label="Description courte"
                        placeholder="Synopsis accrocheur en quelques mots (max 200 caractères)"
                        value={formData.shortDescription}
                        onChange={(e) => handleChange('shortDescription', e.target.value)}
                        error={errors.shortDescription}
                        hint={`${formData.shortDescription.length}/200 caractères`}
                        required
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Description longue
                        <span className={styles.optional}>(optionnel)</span>
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Détaillez les objectifs pédagogiques, le contenu du cours..."
                        value={formData.longDescription}
                        onChange={(e) => handleChange('longDescription', e.target.value)}
                        rows={6}
                    />
                </div>
            </section>

            {/* Section : Classification */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🏷️</span>
                    Classification
                </h2>

                <div className={styles.row}>
                    <Select
                        label="Catégorie"
                        options={categoryOptions}
                        value={formData.category}
                        onChange={(value) => handleChange('category', value)}
                        placeholder="Sélectionner une catégorie"
                        error={errors.category}
                        required
                        fullWidth
                    />
                    <Select
                        label="Niveau"
                        options={levelOptions}
                        value={formData.level}
                        onChange={(value) => handleChange('level', value)}
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Tags / Mots-clés</label>
                    <div className={styles.tagsInput}>
                        <Input
                            placeholder="Ajouter un tag et appuyer sur Entrée"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            fullWidth
                        />
                        <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>
                            Ajouter
                        </Button>
                    </div>
                    {formData.tags.length > 0 && (
                        <div className={styles.tagsList}>
                            {formData.tags.map(tag => (
                                <Badge key={tag} variant="primary" removable onRemove={() => handleRemoveTag(tag)}>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Section : Détails pédagogiques */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📚</span>
                    Détails pédagogiques
                </h2>

                <div className={styles.row}>
                    <Input
                        type="number"
                        label="Durée estimée (heures)"
                        value={formData.duration.toString()}
                        onChange={(e) => handleChange('duration', parseInt(e.target.value) || 1)}
                        min={1}
                        fullWidth
                    />
                    <Select
                        label="Format"
                        options={formatOptions}
                        value={formData.format}
                        onChange={(value) => handleChange('format', value)}
                        fullWidth
                    />
                    <Select
                        label="Langue"
                        options={languageOptions}
                        value={formData.language}
                        onChange={(value) => handleChange('language', value)}
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Prérequis
                        <span className={styles.optional}>(optionnel)</span>
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Listez les compétences ou connaissances préalables requises..."
                        value={formData.prerequisites}
                        onChange={(e) => handleChange('prerequisites', e.target.value)}
                        rows={3}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Public cible
                        <span className={styles.optional}>(optionnel)</span>
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Décrivez à qui s'adresse ce cours..."
                        value={formData.targetAudience}
                        onChange={(e) => handleChange('targetAudience', e.target.value)}
                        rows={3}
                    />
                </div>
            </section>

            {/* Section : Type et statut */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>⚙️</span>
                    Type et statut
                </h2>

                <div className={styles.row}>
                    <Select
                        label="Type de cours"
                        options={typeOptions}
                        value={formData.type}
                        onChange={(value) => handleChange('type', value)}
                        fullWidth
                    />
                    <Select
                        label="Statut de publication"
                        options={statusOptions}
                        value={formData.status}
                        onChange={(value) => handleChange('status', value)}
                        fullWidth
                    />
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) => handleChange('isFeatured', e.target.checked)}
                        />
                        <span>⭐ Mettre en vedette (À la une)</span>
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={formData.isTrending}
                            onChange={(e) => handleChange('isTrending', e.target.checked)}
                        />
                        <span>🔥 Marquer comme Tendance</span>
                    </label>
                </div>
            </section>

            {/* Section : Instructeur */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>👨‍🏫</span>
                    Instructeur
                </h2>

                <div className={styles.row}>
                    <Input
                        label="Nom de l'instructeur"
                        placeholder="Dr. Jean Dupont"
                        value={formData.instructor.name}
                        onChange={(e) => handleInstructorChange('name', e.target.value)}
                        error={errors.instructorName}
                        required
                        fullWidth
                    />
                    <Input
                        label="Photo (URL)"
                        placeholder="https://..."
                        value={formData.instructor.photo}
                        onChange={(e) => handleInstructorChange('photo', e.target.value)}
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <Input
                        label="Expertise"
                        placeholder="Ex: Machine Learning, Python, Data Science"
                        value={formData.instructor.expertise}
                        onChange={(e) => handleInstructorChange('expertise', e.target.value)}
                        fullWidth
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Bio courte</label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Présentez brièvement l'instructeur..."
                        value={formData.instructor.bio}
                        onChange={(e) => handleInstructorChange('bio', e.target.value)}
                        rows={3}
                    />
                </div>
            </section>

            {/* Section : Médias */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🖼️</span>
                    Médias
                </h2>

                <div className={styles.row}>
                    <Input
                        label="Image miniature (URL)"
                        placeholder="https://..."
                        value={formData.thumbnailUrl}
                        onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
                        hint="Image 16:9 recommandée (ex: 800x450px)"
                        fullWidth
                    />
                    <Input
                        label="Vidéo teaser (URL YouTube/Vimeo)"
                        placeholder="https://youtube.com/watch?v=..."
                        value={formData.teaserVideoUrl}
                        onChange={(e) => handleChange('teaserVideoUrl', e.target.value)}
                        fullWidth
                    />
                </div>

                {formData.thumbnailUrl && (
                    <div className={styles.preview}>
                        <img
                            src={formData.thumbnailUrl}
                            alt="Aperçu miniature"
                            className={styles.previewImage}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </section>

            {/* Section : Redirection */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🔗</span>
                    Redirection
                </h2>

                <Input
                    label="URL de la plateforme de cours"
                    placeholder="https://moodle.enspy.cm/course/..."
                    value={formData.redirectUrl}
                    onChange={(e) => handleChange('redirectUrl', e.target.value)}
                    error={errors.redirectUrl}
                    hint="Lien vers la page du cours sur la plateforme principale"
                    required
                    fullWidth
                />
            </section>

            {/* Actions */}
            <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Annuler
                </Button>
                <Button type="submit" variant="primary" isLoading={isLoading}>
                    {course ? 'Enregistrer les modifications' : 'Créer le cours'}
                </Button>
            </div>
        </form>
    );
}

export default CourseForm;
