/**
 * StatsCard Component - ENSPY Admin Portal
 * Carte de statistiques pour le dashboard
 */

import React from 'react';
import styles from './StatsCard.module.css';

export interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon,
    trend,
    variant = 'default',
    className = '',
}: StatsCardProps) {
    const cardClasses = [
        styles.card,
        styles[variant],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                <span className={styles.value}>{value}</span>
                {trend && (
                    <div className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
                        {trend.isPositive ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 4V12M8 4L12 8M8 4L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 12V4M8 12L12 8M8 12L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        <span>{trend.value}%</span>
                        <span className={styles.trendLabel}>{trend.label}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatsCard;
