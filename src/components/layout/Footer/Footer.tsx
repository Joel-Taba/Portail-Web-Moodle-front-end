/* ============================================
   ENSPY COURSES PORTAL - Footer Component
   ============================================ */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';
import { useLocale } from '@/contexts/LocaleContext';

// Icons
const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const XTwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const MinesupIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
    </svg>
);

const WebmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

export const Footer: React.FC = () => {
    const { t } = useLocale();
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubscribing(true);
        setTimeout(() => {
            setSubscribeMessage(t('footer.newsletter.description'));
            setEmail('');
            setIsSubscribing(false);
        }, 1000);
    };

    const currentYear = new Date().getFullYear();

    // Navigation links with translations
    const exploreLinks = [
        { href: '/cours', label: t('nav.courses') },
        { href: '/thematiques', label: t('nav.thematics') },
        { href: '/etablissements', label: t('nav.institutions') },
    ];

    const aboutLinks = [
        { href: '/a-propos', label: t('nav.about') },
        { href: '/contact', label: t('footer.contact') },
        { href: '/faq', label: t('footer.help') },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles['footer-main']}>
                <div className={styles['footer-grid']}>
                    {/* Brand Section */}
                    <div className={styles['footer-brand']}>
                        <Link href="/" className={styles['footer-logo']}>
                            <img
                                src="/images/logo-enspy.png"
                                alt="Logo ENSPY"
                                className={styles['footer-logo-img']}
                            />
                            <span className={styles['footer-logo-text']}>
                                {SITE_CONFIG.institution.shortName}
                            </span>
                        </Link>
                        <p className={styles['footer-description']}>
                            {t('footer.description')}
                        </p>
                        <div className={styles['footer-contact']}>
                            <div className={styles['footer-contact-item']}>
                                <span className={styles['footer-contact-icon']}><PhoneIcon /></span>
                                <span>{SITE_CONFIG.institution.phone}</span>
                            </div>
                            <div className={styles['footer-contact-item']}>
                                <span className={styles['footer-contact-icon']}><MailIcon /></span>
                                <span>{SITE_CONFIG.institution.email}</span>
                            </div>
                            <div className={styles['footer-contact-item']}>
                                <span className={styles['footer-contact-icon']}><MapPinIcon /></span>
                                <span>{SITE_CONFIG.institution.address}</span>
                            </div>
                        </div>
                        <div className={styles['footer-social']}>
                            <a href={SITE_CONFIG.social.facebook} className={styles['footer-social-link']} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookIcon />
                            </a>
                            <a href={SITE_CONFIG.social.twitter} className={styles['footer-social-link']} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                                <XTwitterIcon />
                            </a>
                            <a href={SITE_CONFIG.social.minesup} className={styles['footer-social-link']} target="_blank" rel="noopener noreferrer" aria-label="MINESUP">
                                <MinesupIcon />
                            </a>
                            <a href={SITE_CONFIG.social.webmail} className={styles['footer-social-link']} target="_blank" rel="noopener noreferrer" aria-label="Webmail">
                                <WebmailIcon />
                            </a>
                        </div>
                    </div>

                    {/* Explorer Section */}
                    <div className={styles['footer-section']}>
                        <h3 className={styles['footer-section-title']}>{t('footer.navigation')}</h3>
                        <ul className={styles['footer-links']}>
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles['footer-link']}>
                                        <span className={styles['footer-link-arrow']}><ArrowRightIcon /></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* À propos Section */}
                    <div className={styles['footer-section']}>
                        <h3 className={styles['footer-section-title']}>{t('footer.resources')}</h3>
                        <ul className={styles['footer-links']}>
                            {aboutLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles['footer-link']}>
                                        <span className={styles['footer-link-arrow']}><ArrowRightIcon /></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className={styles['footer-newsletter']}>
                    <div className={styles['footer-newsletter-content']}>
                        <div className={styles['footer-newsletter-text']}>
                            <h3>{t('footer.newsletter.title')}</h3>
                            <p>{t('footer.newsletter.description')}</p>
                        </div>
                        <form className={styles['footer-newsletter-form']} onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                className={styles['footer-newsletter-input']}
                                placeholder={t('footer.newsletter.placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                                required
                            />
                            <Button type="submit" variant="primary" loading={isSubscribing}>
                                {t('footer.newsletter.submit')}
                            </Button>
                        </form>
                    </div>
                    {subscribeMessage && (
                        <p style={{ color: 'var(--color-success)', marginTop: 'var(--spacing-4)' }}>
                            {subscribeMessage}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom */}
            <div className={styles['footer-bottom']}>
                <div className={styles['footer-bottom-content']}>
                    <p className={styles['footer-copyright']}>
                        © {currentYear} <a href={SITE_CONFIG.institution.website}>{SITE_CONFIG.institution.shortName}</a>.
                        {' '}{t('footer.copyright').replace(`© {year} ENSPY. `, '')}
                    </p>
                    <div className={styles['footer-legal-links']}>
                        <Link href="/conditions-utilisation" className={styles['footer-legal-link']}>
                            {t('footer.links.terms')}
                        </Link>
                        <Link href="/politique-confidentialite" className={styles['footer-legal-link']}>
                            {t('footer.links.privacy')}
                        </Link>
                        <Link href="/mentions-legales" className={styles['footer-legal-link']}>
                            {t('footer.links.legal')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
