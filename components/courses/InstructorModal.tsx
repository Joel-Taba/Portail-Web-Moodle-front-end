/**
 * InstructorModal Component - ENSPY Admin Portal
 * Modal pour créer un nouvel instructeur
 */

'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import styles from './InstructorModal.module.css';

interface InstructorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; photo: string; expertise: string; bio: string }) => void;
}

export function InstructorModal({ isOpen, onClose, onSubmit }: InstructorModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        photo: '',
        expertise: '',
        bio: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange('photo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom est obligatoire';
        }
        if (!formData.expertise.trim()) {
            newErrors.expertise = 'L\'expertise est obligatoire';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
            setFormData({ name: '', photo: '', expertise: '', bio: '' });
            onClose();
        }
    };

    const handleClose = () => {
        setFormData({ name: '', photo: '', expertise: '', bio: '' });
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Créer un nouvel instructeur"
            size="md"
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Nom de l'instructeur"
                    placeholder="Dr. Jean Dupont"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={errors.name}
                    required
                    fullWidth
                />

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Photo de l'instructeur</label>
                    <Input
                        placeholder="https://... (URL de la photo)"
                        value={formData.photo.startsWith('data:') ? '' : formData.photo}
                        onChange={(e) => handleChange('photo', e.target.value)}
                        fullWidth
                    />
                    <div className={styles.fileUploadRow}>
                        <span className={styles.orSeparator}>ou</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className={styles.fileInput}
                            id="modal-instructor-photo-upload"
                        />
                        <label htmlFor="modal-instructor-photo-upload" className={styles.fileLabel}>
                            Choisir un fichier
                        </label>
                    </div>
                    {formData.photo && (
                        <div className={styles.photoPreview}>
                            <img
                                src={formData.photo}
                                alt="Aperçu photo instructeur"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                    )}
                </div>

                <Input
                    label="Expertise"
                    placeholder="Ex: Machine Learning, Python, Data Science"
                    value={formData.expertise}
                    onChange={(e) => handleChange('expertise', e.target.value)}
                    error={errors.expertise}
                    required
                    fullWidth
                />

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>
                        Bio courte
                        <span className={styles.optional}>(optionnel)</span>
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="Présentez brièvement l'instructeur..."
                        value={formData.bio}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        rows={3}
                    />
                </div>

                <div className={styles.actions}>
                    <Button type="button" variant="ghost" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                        Créer l'instructeur
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default InstructorModal;
