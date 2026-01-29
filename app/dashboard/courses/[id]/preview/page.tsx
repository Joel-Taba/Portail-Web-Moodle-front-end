/**
 * Prévisualisation de Cours - Vue publique simulée
 * ENSPY Admin Portal
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { coursesStorage, categoriesStorage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { StatusBadge, LevelBadge, TypeBadge } from '@/components/ui/Badge';
import {
    ClockIcon,
    LanguageIcon,
    FormatIcon,
    LevelIcon,
    TypeLabelIcon,
    PreviewIcon,
    UsersIcon,
    PlayIcon,
} from '@/components/icons';
import type { Course, Category } from '@/lib/types';
import styles from './page.module.css';

export default function CoursePreviewPage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const loadedCourse = coursesStorage.getById(courseId);
        if (loadedCourse) {
            setCourse(loadedCourse);
        }
        setCategories(categoriesStorage.getAll());
    }, [courseId]);

    if (!course) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner} />
                <p>Chargement de la prévisualisation...</p>
            </div>
        );
    }

    const category = categories.find(c => c.id === course.category);
    const parentCategory = category?.parentId
        ? categories.find(c => c.id === category.parentId)
        : category;

    const formatDuration = (hours: number) => {
        if (hours < 1) return `${Math.round(hours * 60)} minutes`;
        if (hours === 1) return '1 heure';
        return `${hours} heures`;
    };

    const formatLanguage = (lang: string) => {
        const langs: Record<string, string> = { fr: 'Français', en: 'Anglais', other: 'Autre' };
        return langs[lang] || lang;
    };

    const formatFormat = (format: string) => {
        const formats: Record<string, string> = {
            video: 'Vidéo',
            text: 'Texte',
            exercises: 'Exercices',
            mixed: 'Mixte'
        };
        return formats[format] || format;
    };

    return (
        <div className={styles.container}>
            {/* Barre d'outils */}
            <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                    <button className={styles.backButton} onClick={() => router.back()}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Retour à l'édition
                    </button>
                </div>
                <div className={styles.toolbarCenter}>
                    <span className={styles.previewLabel}>
                        <PreviewIcon size={16} /> Mode prévisualisation
                    </span>
                </div>
                <div className={styles.toolbarRight}>
                    <StatusBadge status={course.status} />
                </div>
            </div>

            {/* Contenu de prévisualisation */}
            <div className={styles.preview}>
                {/* Hero section */}
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        {/* Breadcrumb */}
                        <div className={styles.breadcrumb}>
                            <span>Cours</span>
                            <span className={styles.separator}>›</span>
                            <span>{parentCategory?.name}</span>
                            {category?.parentId && (
                                <>
                                    <span className={styles.separator}>›</span>
                                    <span>{category.name}</span>
                                </>
                            )}
                        </div>

                        <h1 className={styles.courseTitle}>{course.title}</h1>
                        <p className={styles.courseDescription}>{course.shortDescription}</p>

                        {/* Meta badges */}
                        <div className={styles.metaBadges}>
                            <LevelBadge level={course.level} />
                            <TypeBadge type={course.type} />
                            <span className={styles.metaItem}><ClockIcon size={14} /> {formatDuration(course.duration)}</span>
                            <span className={styles.metaItem}><LanguageIcon size={14} /> {formatLanguage(course.language)}</span>
                            <span className={styles.metaItem}><FormatIcon size={14} /> {formatFormat(course.format)}</span>
                        </div>

                        {/* Stats - Only enrollments */}
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <UsersIcon size={20} />
                                <span className={styles.statValue}>{course.enrollments}</span>
                                <span className={styles.statLabel}>inscrits</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className={styles.cta}>
                            <Button variant="primary" size="lg">
                                Accéder au cours sur la plateforme
                            </Button>
                            <p className={styles.ctaHint}>
                                Vous serez redirigé vers : {course.redirectUrl}
                            </p>
                        </div>
                    </div>

                    <div className={styles.heroMedia}>
                        <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className={styles.thumbnail}
                        />
                        {course.teaserVideoUrl && (
                            <div className={styles.teaserVideoPreview}>
                                {course.teaserVideoUrl.startsWith('data:video') ? (
                                    <video
                                        src={course.teaserVideoUrl}
                                        controls
                                        className={styles.teaserVideo}
                                    />
                                ) : course.teaserVideoUrl.includes('youtube.com') || course.teaserVideoUrl.includes('youtu.be') ? (
                                    <div className={styles.videoOverlay}>
                                        <a href={course.teaserVideoUrl} target="_blank" rel="noopener noreferrer">
                                            <span className={styles.playButton}><PlayIcon size={32} /></span>
                                            <span>Voir la vidéo teaser sur YouTube</span>
                                        </a>
                                    </div>
                                ) : (
                                    <video
                                        src={course.teaserVideoUrl}
                                        controls
                                        className={styles.teaserVideo}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contenu détaillé */}
                <div className={styles.content}>
                    <div className={styles.mainContent}>
                        {/* Description longue */}
                        <section className={styles.section}>
                            <h2>À propos de ce cours</h2>
                            <div className={styles.longDescription}>
                                {course.longDescription.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Prérequis */}
                        {course.prerequisites && (
                            <section className={styles.section}>
                                <h2>Prérequis</h2>
                                <p>{course.prerequisites}</p>
                            </section>
                        )}

                        {/* Public cible */}
                        {course.targetAudience && (
                            <section className={styles.section}>
                                <h2>Public cible</h2>
                                <p>{course.targetAudience}</p>
                            </section>
                        )}


                    </div>

                    <div className={styles.sidebar}>
                        {/* Instructeur */}
                        <div className={styles.instructorCard}>
                            <h3>Instructeur</h3>
                            <div className={styles.instructorProfile}>
                                <img
                                    src={course.instructor.photo}
                                    alt={course.instructor.name}
                                    className={styles.instructorPhoto}
                                />
                                <div className={styles.instructorInfo}>
                                    <span className={styles.instructorName}>{course.instructor.name}</span>
                                    <span className={styles.instructorExpertise}>{course.instructor.expertise}</span>
                                </div>
                            </div>
                            {course.instructor.bio && (
                                <p className={styles.instructorBio}>{course.instructor.bio}</p>
                            )}
                        </div>

                        {/* Résumé */}
                        <div className={styles.summaryCard}>
                            <h3>Résumé</h3>
                            <ul className={styles.summaryList}>
                                <li>
                                    <span className={styles.summaryIcon}><ClockIcon size={16} /></span>
                                    <span>Durée : {formatDuration(course.duration)}</span>
                                </li>
                                <li>
                                    <span className={styles.summaryIcon}><LevelIcon size={16} /></span>
                                    <span>Niveau : {course.level === 'beginner' ? 'Débutant' : course.level === 'intermediate' ? 'Intermédiaire' : 'Expert'}</span>
                                </li>
                                <li>
                                    <span className={styles.summaryIcon}><FormatIcon size={16} /></span>
                                    <span>Format : {formatFormat(course.format)}</span>
                                </li>
                                <li>
                                    <span className={styles.summaryIcon}><LanguageIcon size={16} /></span>
                                    <span>Langue : {formatLanguage(course.language)}</span>
                                </li>
                                <li>
                                    <span className={styles.summaryIcon}><TypeLabelIcon size={16} /></span>
                                    <span>Type : {course.type === 'free' ? 'Gratuit' : course.type === 'paid' ? 'Payant' : 'Certifiant'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
