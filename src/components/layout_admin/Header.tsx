/**
 * Header Component - ENSPY Admin Portal
 * Barre d'en-tête du dashboard
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

interface HeaderProps {
    title?: string;
    onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fermer le dropdown au clic extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

    return (
        <header className={styles.header}>
            {/* Menu burger pour mobile */}
            <button
                className={styles.menuButton}
                onClick={onMenuClick}
                aria-label="Ouvrir le menu"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Titre de la page */}
            {title && <h1 className={styles.title}>{title}</h1>}

            {/* Spacer */}
            <div className={styles.spacer} />

            {/* Actions */}
            <div className={styles.actions}>
                {/* Profil utilisateur */}
                <div className={styles.profileContainer} ref={dropdownRef}>
                    <button
                        className={styles.profileButton}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        aria-expanded={isProfileOpen}
                        aria-haspopup="true"
                    >
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=FF6B00&color=fff`}
                            alt={user?.name || 'Avatar'}
                            className={styles.avatar}
                        />
                        <span className={styles.userName}>{user?.name}</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className={`${styles.chevron} ${isProfileOpen ? styles.chevronUp : ''}`}
                        >
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {isProfileOpen && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>
                                <img
                                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=FF6B00&color=fff`}
                                    alt={user?.name || 'Avatar'}
                                    className={styles.dropdownAvatar}
                                />
                                <div className={styles.dropdownInfo}>
                                    <span className={styles.dropdownName}>{user?.name}</span>
                                    <span className={styles.dropdownEmail}>{user?.email}</span>
                                    <span className={styles.dropdownRole}>
                                        {user?.role === 'admin' ? 'Administrateur' :
                                            user?.role === 'editor' ? 'Éditeur' : 'Contributeur'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.dropdownDivider} />

                            <Link href="/dashboard/profile" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M2 14C2 11.2386 4.23858 9 7 9H9C11.7614 9 14 11.2386 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Mon profil
                            </Link>

                            <Link href="/dashboard/settings" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.93 2.93L4.34 4.34M11.66 11.66L13.07 13.07M2.93 13.07L4.34 11.66M11.66 4.34L13.07 2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Paramètres
                            </Link>

                            <div className={styles.dropdownDivider} />

                            <button
                                className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                                onClick={handleLogout}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M10 11L13 8L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
