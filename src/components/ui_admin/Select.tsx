/**
 * Select Component - ENSPY Admin Portal
 * Liste déroulante réutilisable
 */

import React, { forwardRef } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
    fullWidth?: boolean;
    onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            hint,
            options,
            placeholder,
            fullWidth = false,
            className = '',
            id,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const selectId = id || `select-${Math.random().toString(36).substring(7)}`;

        const containerClasses = [
            styles.container,
            fullWidth ? styles.fullWidth : '',
            className,
        ].filter(Boolean).join(' ');

        const selectClasses = [
            styles.select,
            error ? styles.error : '',
        ].filter(Boolean).join(' ');

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <div className={containerClasses}>
                {label && (
                    <label htmlFor={selectId} className={styles.label}>
                        {label}
                        {props.required && <span className={styles.required}>*</span>}
                    </label>
                )}
                <div className={styles.selectWrapper}>
                    <select
                        ref={ref}
                        id={selectId}
                        className={selectClasses}
                        value={value}
                        onChange={handleChange}
                        aria-invalid={error ? 'true' : 'false'}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span className={styles.arrow}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                {error && (
                    <p id={`${selectId}-error`} className={styles.errorMessage} role="alert">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${selectId}-hint`} className={styles.hint}>
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
