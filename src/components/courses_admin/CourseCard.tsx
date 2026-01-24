/**
 * CourseCard Component - ENSPY Admin Portal
 * Carte de cours pour la vue grille
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { StatusBadge, LevelBadge, TypeBadge } from '@/components/ui_admin/Badge';
import type { Course, Category } from '@/lib/types';
import styles from './CourseCard.module.css';

interface CourseCardProps {
    course: Course;
    categories: Category[];
    onArchive?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function CourseCard({ course, categories, onArchive, onDelete }: CourseCardProps) {
    const category = categories.find(c => c.id === course.category);
    const parentCategory = category?.parentId
        ? categories.find(c => c.id === category.parentId)
        : category;

    const formatDuration = (hours: number) => {
        if (hours < 1) return `${hours * 60} min`;
        return `${hours}h`;
    };

    return (
        <div className={styles.card}>
            {/* Image */}
            <div className={styles.imageContainer}>
                <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className={styles.image}
                    loading="lazy"
                />
                <div className={styles.badges}>
                    <StatusBadge status={course.status} />
                    {course.isFeatured && (
                        <span className={styles.featuredBadge}>⭐ À la une</span>
                    )}
                </div>
                {course.isTrending && (
                    <span className={styles.trendingBadge}>🔥 Tendance</span>
                )}
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
                    <span className={styles.duration}>⏱️ {formatDuration(course.duration)}</span>
                </div>

                {/* Instructor */}
                <div className={styles.instructor}>
                    <img
                        src={course.instructor.photo}
                        alt={course.instructor.name}
                        className={styles.instructorPhoto}
                    />
                    <span className={styles.instructorName}>{course.instructor.name}</span>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    <span className={styles.stat}>
                        👁️ {course.views.toLocaleString('fr-FR')} vues
                    </span>
                    <span className={styles.stat}>
                        👥 {course.enrollments} inscrits
                    </span>
                    {course.rating > 0 && (
                        <span className={styles.stat}>
                            ⭐ {course.rating}
                        </span>
                    )}
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M1.5 9C1.5 9 4.5 3 9 3C13.5 3 16.5 9 16.5 9C16.5 9 13.5 15 9 15C4.5 15 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </Link>
                {course.status !== 'archived' && onArchive && (
                    <button
                        className={styles.actionBtn}
                        onClick={() => onArchive(course.id)}
                        title="Archiver"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M15.75 6V15C15.75 15.825 15.075 16.5 14.25 16.5H3.75C2.925 16.5 2.25 15.825 2.25 15V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M1.5 3H16.5V6H1.5V3Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7.5 9H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
                {onDelete && (
                    <button
                        className={`${styles.actionBtn} ${styles.danger}`}
                        onClick={() => onDelete(course.id)}
                        title="Supprimer"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 5H15M6 5V3.5C6 3.22386 6.22386 3 6.5 3H11.5C11.7761 3 12 3.22386 12 3.5V5M7.5 8V13.5M10.5 8V13.5M4.5 5L5.25 14.5C5.29167 15.0833 5.79167 15.5 6.375 15.5H11.625C12.2083 15.5 12.7083 15.0833 12.75 14.5L13.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default CourseCard;
