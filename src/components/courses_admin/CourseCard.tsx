/**
 * CourseCard Component - ENSPY Admin Portal
 * Carte de cours pour la vue grille
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { StatusBadge, LevelBadge, TypeBadge } from '@/components/ui/Badge';
import { ClockIcon, UsersIcon, EditIcon, EyeIcon, ArchiveIcon, DeleteIcon, LinkIcon, PlayIcon } from '@/components/icons';
import type { Course, Category } from '@/lib/types';
import styles from './CourseCard.module.css';

interface CourseCardProps {
    course: Course;
    categories: Category[];
    onArchive?: (id: string) => void;
    onDelete?: (id: string) => void;
}

// Helper to extract YouTube thumbnail from URL
const getYoutubeThumbnail = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
    }
    return null;
};

export function CourseCard({ course, categories, onArchive, onDelete }: CourseCardProps) {
    const category = categories.find(c => c.id === course.category);
    const parentCategory = category?.parentId
        ? categories.find(c => c.id === category.parentId)
        : category;

    const formatDuration = (hours: number) => {
        if (hours < 1) return `${hours * 60} min`;
        return `${hours}h`;
    };

    const teaserThumbnail = course.teaserVideoUrl ? getYoutubeThumbnail(course.teaserVideoUrl) : null;

    // Default placeholder image - using a data URI for a gradient placeholder
    const defaultCourseImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" stop-color="%23f5711a"/%3E%3Cstop offset="100%25" stop-color="%23ff9f40"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g)" width="400" height="225"/%3E%3Ctext x="200" y="120" text-anchor="middle" fill="white" font-family="Arial" font-size="18"%3E📚 Cours%3C/text%3E%3C/svg%3E';

    const thumbnailSrc = course.thumbnailUrl && course.thumbnailUrl !== ''
        ? course.thumbnailUrl
        : defaultCourseImage;

    return (
        <div className={styles.card}>
            {/* Image */}
            <div className={styles.imageContainer}>
                <img
                    src={thumbnailSrc}
                    alt={course.title}
                    className={styles.image}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultCourseImage;
                    }}
                />
                <div className={styles.badges}>
                    <StatusBadge status={course.status} />
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Category */}
                <span className={styles.category}>
                    {parentCategory?.icon} {parentCategory?.name}
                    {category?.parentId && ` › ${category.name}`}
                </span>

                {/* Title */}
                <h3 className={styles.title}>
                    <Link href={`/dashboard/courses/${course.id}`}>
                        {course.title}
                    </Link>
                </h3>

                {/* Description */}
                <p className={styles.description}>
                    {course.shortDescription}
                </p>

                {/* Meta badges */}
                <div className={styles.metaBadges}>
                    <LevelBadge level={course.level} />
                    <TypeBadge type={course.type} />
                    <span className={styles.duration}><ClockIcon size={14} className="inline-icon" /> {formatDuration(course.duration)}</span>
                </div>

                {/* URLs - Redirect and Teaser */}
                <div className={styles.urls}>
                    <a
                        href={course.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.urlLink}
                        title={course.redirectUrl}
                    >
                        <LinkIcon size={12} /> Accéder au cours
                    </a>
                    {course.teaserVideoUrl && (
                        <a
                            href={course.teaserVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.urlLink}
                            title="Voir le teaser"
                        >
                            <PlayIcon size={12} /> Teaser
                        </a>
                    )}
                </div>

                {/* Teaser Preview */}
                {teaserThumbnail && (
                    <a
                        href={course.teaserVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.teaserPreview}
                    >
                        <img src={teaserThumbnail} alt="Aperçu du teaser" />
                        <div className={styles.teaserOverlay}>
                            <span className={styles.playButton}>
                                <PlayIcon size={24} />
                            </span>
                        </div>
                    </a>
                )}

                {/* Instructor */}
                <div className={styles.instructor}>
                    {course.instructor.photo && course.instructor.photo !== '' ? (
                        <img
                            src={course.instructor.photo}
                            alt={course.instructor.name}
                            className={styles.instructorPhoto}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className={styles.instructorPhoto} style={{
                            background: 'linear-gradient(135deg, #f5711a, #ff9f40)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 600,
                        }}>
                            {course.instructor.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className={styles.instructorName}>{course.instructor.name}</span>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    <span className={styles.stat}>
                        <UsersIcon size={14} /> {course.enrollments} inscrits
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <Link
                    href={`/dashboard/courses/${course.id}`}
                    className={styles.actionBtn}
                    title="Modifier"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M13.5 2.25L15.75 4.5L5.25 15H3V12.75L13.5 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <Link
                    href={`/dashboard/courses/${course.id}/preview`}
                    className={styles.actionBtn}
                    title="Prévisualiser"
                >
                    <EyeIcon size={18} />
                </Link>
                {course.status !== 'archived' && onArchive && (
                    <button
                        className={styles.actionBtn}
                        onClick={() => onArchive(course.id)}
                        title="Archiver"
                    >
                        <ArchiveIcon size={18} />
                    </button>
                )}
                {onDelete && (
                    <button
                        className={`${styles.actionBtn} ${styles.danger}`}
                        onClick={() => onDelete(course.id)}
                        title="Supprimer"
                    >
                        <DeleteIcon size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default CourseCard;

