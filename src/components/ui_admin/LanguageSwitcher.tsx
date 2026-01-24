/**
 * LanguageSwitcher Component - ENSPY Admin Portal
 * Toggle between French and English
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { GlobeIcon } from '@/components/icons';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
        { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = languages.find(l => l.code === locale) || languages[0];

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Changer de langue"
                aria-expanded={isOpen}
            >
                <GlobeIcon size={20} />
                <span className={styles.code}>{locale.toUpperCase()}</span>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`${styles.option} ${locale === lang.code ? styles.active : ''}`}
                            onClick={() => {
                                setLocale(lang.code);
                                setIsOpen(false);
                            }}
                        >
                            <span className={styles.flag}>{lang.flag}</span>
                            <span className={styles.label}>{lang.label}</span>
                            {locale === lang.code && (
                                <svg className={styles.check} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;
