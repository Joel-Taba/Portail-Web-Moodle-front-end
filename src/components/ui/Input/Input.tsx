/* ============================================
   ENSPY COURSES PORTAL - Input Component
   ============================================ */

import React from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helper?: string;
    size?: 'sm' | 'md' | 'lg';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onIconRightClick?: () => void;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helper,
            size = 'md',
            iconLeft,
            iconRight,
            onIconRightClick,
            fullWidth = true,
            required,
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={cn(styles['input-wrapper'], !fullWidth && styles['input-wrapper--inline'])}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            styles['input-label'],
                            required && styles['input-label--required']
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className={styles['input-container']}>
                    {iconLeft && (
                        <span className={cn(styles['input-icon'], styles['input-icon--left'])}>
                            {iconLeft}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            styles.input,
                            styles[`input--${size}`],
                            iconLeft ? styles['input--with-icon-left'] : undefined,
                            iconRight ? styles['input--with-icon-right'] : undefined,
                            error ? styles['input--error'] : undefined,
                            className
                        )}
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
                        required={required}
                        {...props}
                    />

                    {iconRight && (
                        <span
                            className={cn(
                                styles['input-icon'],
                                styles['input-icon--right'],
                                onIconRightClick ? styles['input-icon--clickable'] : undefined
                            )}
                            onClick={onIconRightClick}
                            role={onIconRightClick ? 'button' : undefined}
                            tabIndex={onIconRightClick ? 0 : undefined}
                        >
                            {iconRight}
                        </span>
                    )}
                </div>

                {error && (
                    <span id={`${inputId}-error`} className={styles['input-error']} role="alert">
                        {error}
                    </span>
                )}

                {helper && !error && (
                    <span id={`${inputId}-helper`} className={styles['input-helper']}>
                        {helper}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
