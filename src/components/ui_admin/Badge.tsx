/**
 * Badge Component - ENSPY Admin Portal
 * Badges pour afficher des statuts, catégories, etc.
 */

import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    removable?: boolean;
    onRemove?: () => void;
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    removable = false,
    onRemove,
    className = '',
}: BadgeProps) {
    const classNames = [
        styles.badge,
        styles[variant],
        styles[size],
        className,
    ].filter(Boolean).join(' ');

    return (
        <span className={classNames}>
            <span className={styles.content}>{children}</span>
            {removable && (
                <button
                    type="button"
                    className={styles.removeButton}
                    onClick={onRemove}
                    aria-label="Supprimer"
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            )}
        </span>
    );
}

// Badge pour les statuts de cours
export function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
        draft: { variant: 'default', label: 'Brouillon' },
        scheduled: { variant: 'info', label: 'Programmé' },
        published: { variant: 'success', label: 'Publié' },
        archived: { variant: 'warning', label: 'Archivé' },
    };

    const config = statusConfig[status] || { variant: 'default', label: status };

    return <Badge variant={config.variant}>{config.label}</Badge>;
}

// Badge pour les niveaux de cours
export function LevelBadge({ level }: { level: string }) {
    const levelConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
        beginner: { variant: 'success', label: 'Débutant' },
        intermediate: { variant: 'warning', label: 'Intermédiaire' },
        expert: { variant: 'error', label: 'Expert' },
    };

    const config = levelConfig[level] || { variant: 'default', label: level };

    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
}

// Badge pour les types de cours
export function TypeBadge({ type }: { type: string }) {
    const typeConfig: Record<string, { variant: BadgeProps['variant']; label: string }> = {
        free: { variant: 'success', label: 'Gratuit' },
        paid: { variant: 'primary', label: 'Payant' },
        certified: { variant: 'secondary', label: 'Certifiant' },
        'non-certified': { variant: 'default', label: 'Non certifiant' },
    };

    const config = typeConfig[type] || { variant: 'default', label: type };

    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
}

export default Badge;
