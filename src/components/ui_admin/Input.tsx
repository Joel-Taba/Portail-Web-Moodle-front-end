/**
 * Input Component - ENSPY Admin Portal
 * Champ de saisie réutilisable
 */

import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            fullWidth = false,
            className = '',
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

        const containerClasses = [
            styles.container,
            fullWidth ? styles.fullWidth : '',
            className,
        ].filter(Boolean).join(' ');

        const inputWrapperClasses = [
            styles.inputWrapper,
            error ? styles.error : '',
            leftIcon ? styles.hasLeftIcon : '',
            rightIcon ? styles.hasRightIcon : '',
        ].filter(Boolean).join(' ');

        return (
            <div className={containerClasses}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                        {props.required && <span className={styles.required}>*</span>}
                    </label>
                )}
                <div className={inputWrapperClasses}>
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                    <input
                        ref={ref}
                        id={inputId}
                        className={styles.input}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                        {...props}
                    />
                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </div>
                {error && (
                    <p id={`${inputId}-error`} className={styles.errorMessage} role="alert">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className={styles.hint}>
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
