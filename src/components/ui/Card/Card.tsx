/* ============================================
   ENSPY COURSES PORTAL - Card Component
   ============================================ */

import React from 'react';
import styles from './Card.module.css';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'outlined' | 'flat';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    clickable?: boolean;
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'elevated',
            padding = 'none',
            clickable = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    styles.card,
                    styles[`card--${variant}`],
                    styles[`card--padding-${padding}`],
                    clickable && styles['card--clickable'],
                    className
                )}
                tabIndex={clickable ? 0 : undefined}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Card subcomponents
export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    overlay?: boolean;
    badge?: React.ReactNode;
    actions?: React.ReactNode;
}

export const CardImage: React.FC<CardImageProps> = ({
    src,
    alt = '',
    overlay = false,
    badge,
    actions,
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn(styles['card-image'], className)} {...props}>
            {src ? (
                <img src={src} alt={alt} loading="lazy" />
            ) : (
                <div className={styles['card-image-placeholder']}>{children}</div>
            )}
            {overlay && <div className={styles['card-image-overlay']} />}
            {badge && <div className={styles['card-image-badge']}>{badge}</div>}
            {actions && <div className={styles['card-image-actions']}>{actions}</div>}
        </div>
    );
};

CardImage.displayName = 'CardImage';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn(styles['card-header'], className)} {...props}>
            {children}
        </div>
    );
};

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn(styles['card-body'], className)} {...props}>
            {children}
        </div>
    );
};

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    border?: boolean;
    children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
    border = false,
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                styles['card-footer'],
                border && styles['card-footer--border'],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

CardFooter.displayName = 'CardFooter';

export default Card;
