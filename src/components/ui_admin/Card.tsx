/**
 * Card Component - ENSPY Admin Portal
 * Composant carte réutilisable
 */

import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export function Card({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    onClick,
    hoverable = false,
}: CardProps) {
    const classNames = [
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        hoverable || onClick ? styles.hoverable : '',
        className,
    ].filter(Boolean).join(' ');

    const Component = onClick ? 'button' : 'div';

    return (
        <Component className={classNames} onClick={onClick}>
            {children}
        </Component>
    );
}

export interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function CardHeader({ children, className = '', action }: CardHeaderProps) {
    return (
        <div className={`${styles.header} ${className}`}>
            <div className={styles.headerContent}>{children}</div>
            {action && <div className={styles.headerAction}>{action}</div>}
        </div>
    );
}

export interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ children, className = '', as: Tag = 'h3' }: CardTitleProps) {
    return <Tag className={`${styles.title} ${className}`}>{children}</Tag>;
}

export interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return <p className={`${styles.description} ${className}`}>{children}</p>;
}

export interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={`${styles.content} ${className}`}>{children}</div>;
}

export interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return <div className={`${styles.footer} ${className}`}>{children}</div>;
}

export default Card;
