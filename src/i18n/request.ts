import { getRequestConfig } from 'next-intl/server';

export type Locale = 'fr' | 'en';

export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as Locale)) {
        locale = defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
