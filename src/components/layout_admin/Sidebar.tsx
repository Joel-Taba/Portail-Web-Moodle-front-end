/**
 * Sidebar Component - ENSPY Admin Portal
 * Barre latérale de navigation
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const navItems: NavItem[] = [
    {
        label: 'Tableau de bord',
        href: '/dashboard',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        label: 'Cours',
        href: '/dashboard/courses',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 6L14 10L8 14V6Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: 'Catégories',
        href: '/dashboard/categories',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5C3 3.89543 3.89543 3 5 3H8L10 5H15C16.1046 5 17 5.89543 17 7V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        label: 'Ordonnancement',
        href: '/dashboard/ordering',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="6" cy="5" r="1.5" fill="currentColor" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <circle cx="14" cy="15" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: 'Historique',
        href: '/dashboard/history',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: 'Paramètres',
        href: '/dashboard/settings',
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16.5 10C16.5 10.34 16.48 10.68 16.44 11L18.54 12.63C18.73 12.78 18.78 13.05 18.66 13.27L16.66 16.73C16.54 16.95 16.28 17.04 16.04 16.95L13.56 15.95C13.04 16.34 12.48 16.66 11.87 16.9L11.5 19.54C11.46 19.79 11.25 20 11 20H7C6.75 20 6.54 19.79 6.5 19.54L6.13 16.9C5.52 16.66 4.96 16.34 4.44 15.95L1.96 16.95C1.72 17.04 1.46 16.95 1.34 16.73L-0.66 13.27C-0.78 13.05 -0.73 12.78 -0.54 12.63L1.56 11C1.52 10.68 1.5 10.34 1.5 10C1.5 9.66 1.52 9.32 1.56 9L-0.54 7.37C-0.73 7.22 -0.78 6.95 -0.66 6.73L1.34 3.27C1.46 3.05 1.72 2.96 1.96 3.05L4.44 4.05C4.96 3.66 5.52 3.34 6.13 3.1L6.5 0.46C6.54 0.21 6.75 0 7 0H11C11.25 0 11.46 0.21 11.5 0.46L11.87 3.1C12.48 3.34 13.04 3.66 13.56 4.05L16.04 3.05C16.28 2.96 16.54 3.05 16.66 3.27L18.66 6.73C18.78 6.95 18.73 7.22 18.54 7.37L16.44 9C16.48 9.32 16.5 9.66 16.5 10Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
];

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <Link href="/dashboard" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="var(--primary-500)" />
                            <path d="M8 12L16 6L24 12V20L16 26L8 20V12Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                            <circle cx="16" cy="16" r="4" fill="white" />
                        </svg>
                    </div>
                    {!isCollapsed && (
                        <div className={styles.logoText}>
                            <span className={styles.logoTitle}>ENSPY</span>
                            <span className={styles.logoSubtitle}>Admin Portal</span>
                        </div>
                    )}
                </Link>
                <button
                    className={styles.collapseButton}
                    onClick={onToggle}
                    aria-label={isCollapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d={isCollapsed ? "M7 4L13 10L7 16" : "M13 4L7 10L13 16"}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    {!isCollapsed && (
                                        <>
                                            <span className={styles.navLabel}>{item.label}</span>
                                            {item.badge !== undefined && item.badge > 0 && (
                                                <span className={styles.navBadge}>{item.badge}</span>
                                            )}
                                        </>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className={styles.footer}>
                {!isCollapsed && (
                    <div className={styles.footerContent}>
                        <p className={styles.footerText}>
                            © 2024 ENSPY
                        </p>
                        <p className={styles.footerVersion}>
                            v1.0.0
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
