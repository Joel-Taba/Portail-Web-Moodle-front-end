/**
 * Modal Component - ENSPY Admin Portal
 * Fenêtre modale réutilisable
 */

'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    footer?: React.ReactNode;
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    footer,
    className = '',
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Gestion du focus trap et de l'échap
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement as HTMLElement;
            modalRef.current?.focus();
            document.body.style.overflow = 'hidden';

            const handleEscape = (e: KeyboardEvent) => {
                if (closeOnEscape && e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = '';
                previousActiveElement.current?.focus();
            };
        }
    }, [isOpen, closeOnEscape, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalClasses = [
        styles.modal,
        styles[size],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
            <div
                ref={modalRef}
                className={modalClasses}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
                tabIndex={-1}
            >
                {/* Header */}
                <div className={styles.header}>
                    {title && (
                        <h2 id="modal-title" className={styles.title}>
                            {title}
                        </h2>
                    )}
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Fermer la fenêtre"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className={styles.footer}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

// Composant de confirmation
export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    variant = 'danger',
    isLoading = false,
}: ConfirmModalProps) {
    const variantStyles: Record<string, string> = {
        danger: styles.confirmDanger,
        warning: styles.confirmWarning,
        info: styles.confirmInfo,
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
            <p className={styles.confirmMessage}>{message}</p>
            <div className={styles.confirmActions}>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelLabel}
                </button>
                <button
                    type="button"
                    className={`${styles.confirmButton} ${variantStyles[variant]}`}
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? 'Chargement...' : confirmLabel}
                </button>
            </div>
        </Modal>
    );
}

export default Modal;
