/* ============================================
   ENSPY COURSES PORTAL - Language Selector Component
   ============================================ */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale, Locale } from '@/contexts/LocaleContext';
import styles from './LanguageSelector.module.css';

// Flag icons (simple SVG representations)
const FrenchFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <rect width="6.67" height="14" fill="#002395" />
        <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
        <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
    </svg>
);

const EnglishFlag = () => (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <rect width="20" height="14" fill="#012169" />
        <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="2" />
        <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1" />
        <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="3" />
        <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const languages: { code: Locale; label: string; flag: React.ReactNode }[] = [
    { code: 'fr', label: 'Français', flag: <FrenchFlag /> },
    { code: 'en', label: 'English', flag: <EnglishFlag /> },
];

export const LanguageSelector: React.FC = () => {
    const { locale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectLanguage = (code: Locale) => {
        setLocale(code);
        setIsOpen(false);
    };

    return (
        <div className={styles['language-selector']} ref={dropdownRef}>
            <button
                className={styles['language-button']}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Sélectionner la langue"
            >
                <span className={styles['language-flag']}>
                    {currentLanguage.flag}
                </span>
                <span className={styles['language-code']}>
                    {currentLanguage.code.toUpperCase()}
                </span>
                <span className={`${styles['language-chevron']} ${isOpen ? styles['language-chevron--open'] : ''}`}>
                    <ChevronDownIcon />
                </span>
            </button>

            {isOpen && (
                <ul className={styles['language-dropdown']} role="listbox">
                    {languages.map((lang) => (
                        <li key={lang.code} role="option" aria-selected={locale === lang.code}>
                            <button
                                className={`${styles['language-option']} ${locale === lang.code ? styles['language-option--active'] : ''}`}
                                onClick={() => handleSelectLanguage(lang.code)}
                            >
                                <span className={styles['language-flag']}>
                                    {lang.flag}
                                </span>
                                <span className={styles['language-label']}>
                                    {lang.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSelector;
