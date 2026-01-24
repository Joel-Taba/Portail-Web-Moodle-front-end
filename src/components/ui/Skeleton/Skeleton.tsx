/* ============================================
   ENSPY COURSES PORTAL - Skeleton Component
   ============================================ */

import React from 'react';
import styles from './Skeleton.module.css';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'title' | 'avatar' | 'image' | 'button' | 'card';
    width?: string | number;
    height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'text',
    width,
    height,
    className,
    style,
    ...props
}) => {
    return (
        <div
            className={cn(styles.skeleton, styles[`skeleton--${variant}`], className)}
            style={{
                width: width,
                height: height,
                ...style,
            }}
            aria-hidden="true"
            {...props}
        />
    );
};

Skeleton.displayName = 'Skeleton';

// Course Card Skeleton
export const CourseCardSkeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => {
    return (
        <div className={cn(styles['skeleton-card'], className)} {...props}>
            <div className={styles['skeleton-card-image']} />
            <div className={styles['skeleton-card-body']}>
                <div className={cn(styles.skeleton, styles['skeleton-card-title'])} />
                <div className={cn(styles.skeleton, styles['skeleton-card-text'])} />
                <div className={cn(styles.skeleton, styles['skeleton-card-text'], styles['skeleton-card-text--short'])} />
                <div className={styles['skeleton-card-footer']}>
                    <div className={cn(styles.skeleton, styles['skeleton-card-badge'])} />
                    <div className={cn(styles.skeleton, styles['skeleton-card-avatar'])} />
                </div>
            </div>
        </div>
    );
};

CourseCardSkeleton.displayName = 'CourseCardSkeleton';

// Grid of Course Card Skeletons
export interface CourseGridSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    count?: number;
}

export const CourseGridSkeleton: React.FC<CourseGridSkeletonProps> = ({
    count = 6,
    className,
    ...props
}) => {
    return (
        <div
            className={className}
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--spacing-6)',
            }}
            {...props}
        >
            {Array.from({ length: count }).map((_, index) => (
                <CourseCardSkeleton key={index} />
            ))}
        </div>
    );
};

CourseGridSkeleton.displayName = 'CourseGridSkeleton';

export default Skeleton;
