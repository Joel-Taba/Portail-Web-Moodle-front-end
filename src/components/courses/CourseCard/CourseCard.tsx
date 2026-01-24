/* ============================================
   ENSPY COURSES PORTAL - CourseCard Component
   ============================================ */

import React from 'react';
import Link from 'next/link';
import styles from './CourseCard.module.css';
import { Course } from '@/types';
import { cn, getLevelLabel, getDurationLabel, getTypeLabel, getCourseUrl, truncate } from '@/lib/utils';

// Icons
const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UsersIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BookIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const TrendingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export interface CourseCardProps {
    course: Course;
    variant?: 'default' | 'horizontal';
    showInstructor?: boolean;
    showRating?: boolean;
    showEnrollment?: boolean;
    className?: string;
}

const BuildingIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <path d="M9 22v-4h6v4"></path>
        <path d="M8 6h.01"></path>
        <path d="M16 6h.01"></path>
        <path d="M8 10h.01"></path>
        <path d="M16 10h.01"></path>
        <path d="M8 14h.01"></path>
        <path d="M16 14h.01"></path>
    </svg>
);

const IDIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2z"></path>
        <path d="M7 11h8"></path>
        <path d="M7 15h5"></path>
        <path d="M7 7h1"></path>
    </svg>
);

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export const CourseCard: React.FC<CourseCardProps> = ({
    course,
    className,
}) => {
    return (
        <article className={cn(styles['course-card'], className)}>
            <Link href={getCourseUrl(course.slug)} className={styles['course-card-link']}>
                {/* Image Part */}
                <div className={styles['course-card-image-wrapper']}>
                    <div className={styles['course-card-image']}>
                        {course.imageUrl ? (
                            <img src={course.imageUrl} alt={course.title} loading="lazy" />
                        ) : (
                            <div className={styles['course-card-image-placeholder']}>
                                <BookIcon />
                            </div>
                        )}
                    </div>

                    {/* Institution Logo Overlay */}
                    <div className={styles['institution-logo-overlay']}>
                        {course.institution?.logoUrl ? (
                            <img src={course.institution.logoUrl} alt={course.institution.name} />
                        ) : (
                            <div className={styles['logo-placeholder']}>
                                {course.institution?.shortName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Part */}
                <div className={styles['course-card-content']}>
                    <h3 className={styles['course-card-title']}>
                        {course.title}
                    </h3>

                    <div className={styles['course-card-details']}>
                        <div className={styles['detail-item']}>
                            <BuildingIcon />
                            <span>{course.institution?.name || course.institution?.shortName}</span>
                        </div>
                        <div className={styles['detail-item']}>
                            <IDIcon />
                            <span>{course.id.padStart(5, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* Red Footer CTA */}
                <div className={styles['course-card-footer-cta']}>
                    <CalendarIcon />
                    <span>Ouvert à l'inscription</span>
                </div>
            </Link>
        </article>
    );
};

export default CourseCard;
