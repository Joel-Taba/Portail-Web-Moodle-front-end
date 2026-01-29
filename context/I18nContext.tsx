/**
 * I18nContext - ENSPY Admin Portal
 * Contexte d'internationalisation pour la gestion des langues
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Locale = 'fr' | 'en';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'enspy_locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('fr');

    // Load locale from localStorage on mount
    useEffect(() => {
        const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
            setLocaleState(savedLocale);
        }
    }, []);

    // Set locale and persist to localStorage
    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
    }, []);

    return (
        <I18nContext.Provider value={{ locale, setLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useI18n(): I18nContextType {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n doit être utilisé dans un I18nProvider');
    }
    return context;
}

export default I18nContext;
