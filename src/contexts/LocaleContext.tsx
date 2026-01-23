'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// Import messages directly for SSR compatibility
import frMessages from '../../messages/fr.json';
import enMessages from '../../messages/en.json';

export type Locale = 'fr' | 'en';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
    messages: Record<string, unknown>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Pre-loaded messages for SSR
const allMessages: Record<Locale, Record<string, unknown>> = {
    fr: frMessages as Record<string, unknown>,
    en: enMessages as Record<string, unknown>,
};

// Helper function to get nested value from object
const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return path; // Return the key if not found
        }
    }

    return typeof current === 'string' ? current : path;
};

interface LocaleProviderProps {
    children: React.ReactNode;
    initialLocale?: Locale;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
    children,
    initialLocale = 'fr'
}) => {
    // Use the initial locale directly without checking localStorage first (for SSR)
    const [locale, setLocaleState] = useState<Locale>(initialLocale);
    const [mounted, setMounted] = useState(false);

    // Get messages based on current locale
    const messages = useMemo(() => allMessages[locale], [locale]);

    // Hydration-safe: Only access localStorage after mount
    useEffect(() => {
        setMounted(true);
        const savedLocale = localStorage.getItem('locale') as Locale | null;
        if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
            setLocaleState(savedLocale);
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
            document.documentElement.lang = newLocale;
        }
    }, []);

    const t = useCallback((key: string): string => {
        return getNestedValue(messages, key);
    }, [messages]);

    // During SSR or before hydration, still render with default locale
    const contextValue = useMemo(() => ({
        locale,
        setLocale,
        t,
        messages
    }), [locale, setLocale, t, messages]);

    return (
        <LocaleContext.Provider value={contextValue}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = (): LocaleContextType => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};

export default LocaleProvider;
