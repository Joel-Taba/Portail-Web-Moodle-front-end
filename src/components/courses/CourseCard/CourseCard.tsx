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

export const CourseCard: React.FC<CourseCardProps> = ({
    course,
    variant = 'default',
    showInstructor = true,
    showRating = true,
    showEnrollment = true,
    className,
}) => {
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const formatEnrollment = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };

    return (
        <article
            className={cn(
                styles['course-card'],
                variant === 'horizontal' && styles['course-card--horizontal'],
                className
            )}
        >
            {/* Image */}
            <div className={styles['course-card-image']}>
                {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.title} loading="lazy" />
                ) : (
                    <div className={styles['course-card-image-placeholder']}>
                        <BookIcon />
                    </div>
                )}
                <div className={styles['course-card-overlay']} />

                {/* Badges */}
                <div className={styles['course-card-badges']}>
                    {course.type === 'certified' && (
                        <span className={cn(
                            styles['course-card-badge'],
                            styles['course-card-badge--type-certified']
                        )}>
                            Certifiant
                        </span>
                    )}
                    {course.availability === 'upcoming' && (
                        <span className={cn(
                            styles['course-card-badge'],
                            styles['course-card-badge--availability-upcoming']
                        )}>
                            À venir
                        </span>
                    )}
                </div>

                {/* Duration */}
                <div className={styles['course-card-duration']}>
                    <ClockIcon />
                    <span>{getDurationLabel(course.duration)}</span>
                </div>
            </div>

            {/* Content */}
            <div className={styles['course-card-content']}>
                {/* Institution */}
                {course.institution && (
                    <div className={styles['course-card-institution']}>
                        {course.institution.logoUrl ? (
                            <img
                                src={course.institution.logoUrl}
                                alt={course.institution.name}
                                className={styles['course-card-institution-logo']}
                            />
                        ) : (
                            <div
                                className={styles['course-card-institution-logo']}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    color: 'var(--color-primary)',
                                }}
                            >
                                {course.institution.shortName.charAt(0)}
                            </div>
                        )}
                        <span className={styles['course-card-institution-name']}>
                            {course.institution.shortName}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className={styles['course-card-title']}>
                    <Link href={getCourseUrl(course.slug)}>
                        {course.title}
                    </Link>
                </h3>

                {/* Description */}
                <p className={styles['course-card-description']}>
                    {truncate(course.description, 120)}
                </p>

                {/* Meta */}
                <div className={styles['course-card-meta']}>
                    {showEnrollment && course.enrollmentCount > 0 && (
                        <span className={styles['course-card-meta-item']}>
                            <span className={styles['course-card-meta-icon']}><UsersIcon /></span>
                            {formatEnrollment(course.enrollmentCount)} inscrits
                        </span>
                    )}
                    {showRating && course.rating > 0 && (
                        <span className={styles['course-card-rating']}>
                            <span className={styles['course-card-rating-star']}><StarIcon /></span>
                            <span className={styles['course-card-rating-value']}>{course.rating.toFixed(1)}</span>
                            <span className={styles['course-card-rating-count']}>({course.reviewsCount})</span>
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className={styles['course-card-footer']}>
                    {/* Instructor */}
                    {showInstructor && course.instructor && (
                        <div className={styles['course-card-instructor']}>
                            {course.instructor.photoUrl ? (
                                <img
                                    src={course.instructor.photoUrl}
                                    alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                                    className={styles['course-card-instructor-avatar']}
                                />
                            ) : (
                                <div className={styles['course-card-instructor-avatar-placeholder']}>
                                    {getInitials(course.instructor.firstName, course.instructor.lastName)}
                                </div>
                            )}
                            <span className={styles['course-card-instructor-name']}>
                                {course.instructor.firstName} {course.instructor.lastName}
                            </span>
                        </div>
                    )}

                    {/* Level */}
                    <span className={cn(
                        styles['course-card-level'],
                        styles[`course-card-level--${course.level}`]
                    )}>
                        {getLevelLabel(course.level)}
                    </span>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
