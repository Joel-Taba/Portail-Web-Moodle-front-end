/* ============================================
   ENSPY COURSES PORTAL - Root Layout
   ============================================ */

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header, Footer } from '@/components/layout';
import { SITE_CONFIG, SEO_CONFIG } from '@/lib/constants';
import { Providers } from './providers';

// Using CSS variables for fonts instead of next/font/google due to Turbopack compatibility
const fontClass = 'font-sans';

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: [
    'cours en ligne',
    'ENSPY',
    'formation',
    'ingénierie',
    'Cameroun',
    'Polytechnique',
    'Yaoundé',
    'e-learning',
    'MOOC',
  ],
  authors: [{ name: SITE_CONFIG.institution.shortName }],
  creator: SITE_CONFIG.institution.name,
  publisher: SITE_CONFIG.institution.name,
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E65100" />
      </head>
      <body>
        <Providers>
          <div id="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
