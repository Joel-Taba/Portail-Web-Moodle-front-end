/**
 * CourseForm Component - ENSPY Admin Portal
 * Formulaire de création/modification de cours
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { instructorsStorage } from '@/lib/storage';
import { InstructorModal } from './InstructorModal';
import {
    DocumentIcon,
    TagIcon,
    BookStackIcon,
    GearIcon,
    InstructorIcon,
    ImageIcon,
    LinkIcon,
} from '@/components/icons';
import type { Course, Category, CourseLevel, CourseFormat, CourseLanguage, CourseType, CourseStatus, SavedInstructor, Instructor } from '@/lib/types';
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
    const [instructors, setInstructors] = useState<SavedInstructor[]>([]);
    const [showInstructorModal, setShowInstructorModal] = useState(false);
    const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');

    const [formData, setFormData] = useState({
        title: course?.title || '',
        shortDescription: course?.shortDescription || '',
        longDescription: course?.longDescription || '',
        category: course?.category || '',
        tags: [] as string[],
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
        isFeatured: false,
        isTrending: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load instructors on mount
    useEffect(() => {
        setInstructors(instructorsStorage.getAll());
        // If editing and instructor exists, find matching instructor ID
        if (course?.instructor?.name) {
            const existingInstructors = instructorsStorage.getAll();
            const match = existingInstructors.find(i => i.name === course.instructor.name);
            if (match) {
                setSelectedInstructorId(match.id);
            }
        }
    }, [course]);

    // Update instructor when selection changes
    useEffect(() => {
        if (selectedInstructorId) {
            const instructor = instructors.find(i => i.id === selectedInstructorId);
            if (instructor) {
                setFormData(prev => ({
                    ...prev,
                    instructor: {
                        name: instructor.name,
                        photo: instructor.photo,
                        bio: instructor.bio,
                        expertise: instructor.expertise,
                    },
                }));
            }
        }
    }, [selectedInstructorId, instructors]);

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

    // File upload handlers - convert to base64 data URL
    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('thumbnailUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTeaserVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('teaserVideoUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateInstructor = (data: { name: string; photo: string; expertise: string; bio: string }) => {
        const newInstructor = instructorsStorage.add(data);
        setInstructors(instructorsStorage.getAll());
        setSelectedInstructorId(newInstructor.id);
    };

    // Instructor options for select
    const instructorOptions = instructors.map(i => ({
        value: i.id,
        label: i.name,
    }));

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
                    <span className={styles.sectionIcon}><DocumentIcon size={20} /></span>
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
                    <span className={styles.sectionIcon}><TagIcon size={20} /></span>
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
            </section>

            {/* Section : Détails pédagogiques */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}><BookStackIcon size={20} /></span>
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
                    <span className={styles.sectionIcon}><GearIcon size={20} /></span>
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
            </section>

            {/* Section : Instructeur */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}><InstructorIcon size={20} /></span>
                    Instructeur
                </h2>

                <div className={styles.row}>
                    <Select
                        label="Sélectionner un instructeur"
                        options={instructorOptions}
                        value={selectedInstructorId}
                        onChange={(value) => setSelectedInstructorId(value)}
                        placeholder="Choisir un instructeur existant"
                        error={errors.instructorName}
                        fullWidth
                    />
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>&nbsp;</label>
                        <Button type="button" variant="outline" onClick={() => setShowInstructorModal(true)}>
                            + Nouvel instructeur
                        </Button>
                    </div>
                </div>

                {selectedInstructorId && formData.instructor.name && (
                    <div className={styles.instructorPreview}>
                        {formData.instructor.photo && (
                            <img
                                src={formData.instructor.photo}
                                alt={formData.instructor.name}
                                className={styles.instructorPhoto}
                            />
                        )}
                        <div className={styles.instructorInfo}>
                            <strong>{formData.instructor.name}</strong>
                            <span>{formData.instructor.expertise}</span>
                        </div>
                    </div>
                )}
            </section>

            <InstructorModal
                isOpen={showInstructorModal}
                onClose={() => setShowInstructorModal(false)}
                onSubmit={handleCreateInstructor}
            />

            {/* Section : Médias */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}><ImageIcon size={20} /></span>
                    Médias
                </h2>

                <div className={styles.row}>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Image miniature</label>
                        <Input
                            placeholder="https://... (URL de l'image)"
                            value={formData.thumbnailUrl.startsWith('data:') ? '' : formData.thumbnailUrl}
                            onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
                            fullWidth
                        />
                        <div className={styles.fileUploadRow}>
                            <span className={styles.orSeparator}>ou</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className={styles.fileInput}
                                id="thumbnail-upload"
                            />
                            <label htmlFor="thumbnail-upload" className={styles.fileLabel}>
                                Choisir un fichier
                            </label>
                        </div>
                    </div>
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Vidéo teaser</label>
                        <Input
                            placeholder="https://youtube.com/watch?v=... (URL)"
                            value={formData.teaserVideoUrl.startsWith('data:') ? '' : formData.teaserVideoUrl}
                            onChange={(e) => handleChange('teaserVideoUrl', e.target.value)}
                            fullWidth
                        />
                        <div className={styles.fileUploadRow}>
                            <span className={styles.orSeparator}>ou</span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleTeaserVideoUpload}
                                className={styles.fileInput}
                                id="teaser-video-upload"
                            />
                            <label htmlFor="teaser-video-upload" className={styles.fileLabel}>
                                Choisir une vidéo
                            </label>
                        </div>
                    </div>
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
                    <span className={styles.sectionIcon}><LinkIcon size={20} /></span>
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
