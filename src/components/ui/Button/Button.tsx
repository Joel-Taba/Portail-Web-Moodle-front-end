/* ============================================
   ENSPY COURSES PORTAL - Button Component
   ============================================ */

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    href?: string;
    external?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            loading = false,
            icon,
            iconPosition = 'left',
            href,
            external = false,
            className,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const classNames = cn(
            styles.button,
            styles[`button--${variant}`],
            styles[`button--${size}`],
            fullWidth && styles['button--full'],
            loading && styles['button--loading'],
            className
        );

        const content = (
            <>
                {icon && iconPosition === 'left' && <span className={styles['button__icon']}>{icon}</span>}
                <span>{children}</span>
                {icon && iconPosition === 'right' && <span className={styles['button__icon']}>{icon}</span>}
            </>
        );

        // If href is provided, render as Link
        if (href) {
            if (external) {
                return (
                    <a
                        href={href}
                        className={classNames}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {content}
                    </a>
                );
            }

            return (
                <Link href={href} className={classNames}>
                    {content}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                className={classNames}
                disabled={disabled || loading}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
