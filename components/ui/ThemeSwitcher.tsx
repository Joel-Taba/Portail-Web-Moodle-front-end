/**
 * ThemeSwitcher Component - ENSPY Admin Portal
 * Toggle between light and dark themes
 */

'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from '@/components/icons';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={styles.switcher}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        >
            {theme === 'light' ? (
                <MoonIcon size={20} />
            ) : (
                <SunIcon size={20} />
            )}
        </button>
    );
}

export default ThemeSwitcher;
