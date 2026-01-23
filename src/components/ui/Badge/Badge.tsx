/* ============================================
   ENSPY COURSES PORTAL - Badge Component
   ============================================ */

import React from 'react';
import styles from './Badge.module.css';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray';
    appearance?: 'default' | 'solid' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'primary',
    appearance = 'default',
    size = 'md',
    icon,
    className,
    children,
    ...props
}) => {
    return (
        <span
            className={cn(
                styles.badge,
                styles[`badge--${variant}`],
                appearance !== 'default' && styles[`badge--${appearance}`],
                size !== 'md' && styles[`badge--${size}`],
                className
            )}
            {...props}
        >
            {icon && <span className={styles['badge-icon']}>{icon}</span>}
            {children}
        </span>
    );
};

Badge.displayName = 'Badge';

// Dot Badge Component
export interface DotBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'error';
    pulse?: boolean;
}

export const DotBadge: React.FC<DotBadgeProps> = ({
    variant = 'primary',
    pulse = false,
    className,
    ...props
}) => {
    return (
        <span
            className={cn(
                styles['badge-dot'],
                styles[`badge-dot--${variant}`],
                pulse && styles['badge-dot--pulse'],
                className
            )}
            {...props}
        />
    );
};

DotBadge.displayName = 'DotBadge';

export default Badge;
