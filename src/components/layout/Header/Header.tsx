/* ============================================
   ENSPY COURSES PORTAL - Header Component
   ============================================ */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Button, LanguageSelector } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLocale } from '@/contexts/LocaleContext';

// Icons (inline SVG for simplicity)
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const Header: React.FC = () => {
    const pathname = usePathname();
    const { t } = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Navigation items with translations
    const navigationItems = [
        { href: '/', label: t('nav.home') },
        { href: '/cours', label: t('nav.courses') },
        { href: '/thematiques', label: t('nav.thematics') },
        { href: '/etablissements', label: t('nav.institutions') },
        { href: '/a-propos', label: t('nav.about') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/cours?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className={cn(styles.header, isScrolled && styles['header--scrolled'])}>
            {/* Main Header */}
            <div className={styles['header-main']}>
                <div className={styles['header-main-content']}>
                    <Link href="/" className={styles['header-logo']}>
                        <img
                            src="/images/logo-enspy.png"
                            alt="Logo ENSPY"
                            className={styles['header-logo-image']}
                        />
                        <div className={styles['header-logo-text']}>
                            <span className={styles['header-logo-title']}>
                                {SITE_CONFIG.institution.shortName}
                            </span>
                        </div>
                    </Link>

                    <form className={styles['header-search']} onSubmit={handleSearchSubmit}>
                        <span className={styles['header-search-icon']}>
                            <SearchIcon />
                        </span>
                        <input
                            type="search"
                            className={styles['header-search-input']}
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label={t('common.search')}
                        />
                    </form>

                    <div className={styles['header-actions']}>
                        {user ? (
                            <div className={styles['header-user']}>
                                <span className={styles['header-user-name']}>
                                    {user.prenom} {user.nom}
                                </span>
                                <Button onClick={handleLogout} variant="outline-dark" size="sm">
                                    Déconnexion
                                </Button>
                            </div>
                        ) : (
                            <Button href="/connexion" variant="outline-dark">
                                {t('common.login')}
                            </Button>
                        )}
                        <LanguageSelector />
                        <button
                            className={styles['header-menu-btn']}
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Ouvrir le menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={styles['header-nav']} aria-label="Navigation principale">
                <div className={styles['header-nav-content']}>
                    <ul className={styles['header-nav-list']}>
                        {navigationItems.map((item) => (
                            <li key={item.href} className={styles['header-nav-item']}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        styles['header-nav-link'],
                                        pathname === item.href && styles['header-nav-link--active']
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    styles['header-mobile-nav'],
                    isMobileMenuOpen && styles['header-mobile-nav--open']
                )}
                aria-hidden={!isMobileMenuOpen}
            >
                <div className={styles['header-mobile-nav-header']}>
                    <Link href="/" className={styles['header-logo']}>
                        <div className={styles['header-logo-text']}>
                            <span className={styles['header-logo-title']}>
                                {SITE_CONFIG.institution.shortName}
                            </span>
                        </div>
                    </Link>
                    <button
                        className={styles['header-mobile-nav-close']}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Fermer le menu"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <ul className={styles['header-mobile-nav-list']}>
                    {navigationItems.map((item) => (
                        <li key={item.href} className={styles['header-mobile-nav-item']}>
                            <Link href={item.href} className={styles['header-mobile-nav-link']}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: 'var(--spacing-6)' }}>
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
};

export default Header;
