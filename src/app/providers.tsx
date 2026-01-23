'use client';

import React from 'react';
import { LocaleProvider } from '@/contexts/LocaleContext';

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <LocaleProvider initialLocale="fr">
            {children}
        </LocaleProvider>
    );
};

export default Providers;
