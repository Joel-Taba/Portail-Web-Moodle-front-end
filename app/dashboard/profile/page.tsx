/**
 * Profile Page - ENSPY Admin Portal
 * Page de profil utilisateur
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import {
    UsersIcon,
    EditIcon,
    SettingsIcon,
    MoonIcon,
    SunIcon,
    GlobeIcon,
    CheckCircleIcon,
} from '@/components/icons';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import styles from './page.module.css';

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const { theme, setTheme } = useTheme();
    const { locale, setLocale } = useI18n();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = () => {
        if (updateUser) {
            updateUser({ ...user!, name: formData.name });
        }
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const getRoleBadge = (role: string) => {
        const badges: Record<string, { label: string; color: string }> = {
            admin: { label: 'Administrateur', color: 'var(--primary-500)' },
            editor: { label: 'Éditeur', color: 'var(--info-500)' },
            contributor: { label: 'Contributeur', color: 'var(--success-500)' },
        };
        return badges[role] || { label: role, color: 'var(--neutral-500)' };
    };

    const roleBadge = getRoleBadge(user?.role || 'contributor');

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Retour au dashboard
                </Link>
                <h1 className={styles.title}>Mon Profil</h1>
                <p className={styles.subtitle}>Gérez vos informations personnelles et préférences</p>
            </div>

            {saveSuccess && (
                <div className={styles.successBanner}>
                    <CheckCircleIcon size={20} />
                    <span>Vos modifications ont été enregistrées</span>
                </div>
            )}

            <div className={styles.content}>
                {/* Profile Card */}
                <section className={styles.profileCard}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=FF6B00&color=fff&size=200`}
                                alt={user?.name}
                                className={styles.avatar}
                            />
                            <button className={styles.avatarEdit} aria-label="Modifier l'avatar">
                                <EditIcon size={16} />
                            </button>
                        </div>
                        <div className={styles.profileInfo}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={styles.nameInput}
                                    placeholder="Votre nom"
                                />
                            ) : (
                                <h2 className={styles.userName}>{user?.name}</h2>
                            )}
                            <p className={styles.userEmail}>{user?.email}</p>
                            <span
                                className={styles.roleBadge}
                                style={{ backgroundColor: `${roleBadge.color}20`, color: roleBadge.color }}
                            >
                                {roleBadge.label}
                            </span>
                        </div>
                    </div>
                    <div className={styles.profileActions}>
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Annuler
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Enregistrer
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                leftIcon={<EditIcon size={18} />}
                                onClick={() => setIsEditing(true)}
                            >
                                Modifier le profil
                            </Button>
                        )}
                    </div>
                </section>

                {/* Settings Grid */}
                <div className={styles.settingsGrid}>
                    {/* Theme Settings */}
                    <section className={styles.settingsCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.settingsIcon}>
                                {theme === 'dark' ? <MoonIcon size={24} /> : <SunIcon size={24} />}
                            </div>
                            <div>
                                <h3 className={styles.settingsTitle}>Apparence</h3>
                                <p className={styles.settingsDesc}>Personnalisez l&apos;interface</p>
                            </div>
                        </div>
                        <div className={styles.themeOptions}>
                            <button
                                className={`${styles.themeOption} ${theme === 'light' ? styles.active : ''}`}
                                onClick={() => setTheme('light')}
                            >
                                <SunIcon size={20} />
                                <span>Clair</span>
                            </button>
                            <button
                                className={`${styles.themeOption} ${theme === 'dark' ? styles.active : ''}`}
                                onClick={() => setTheme('dark')}
                            >
                                <MoonIcon size={20} />
                                <span>Sombre</span>
                            </button>
                        </div>
                    </section>

                    {/* Language Settings */}
                    <section className={styles.settingsCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.settingsIcon}>
                                <GlobeIcon size={24} />
                            </div>
                            <div>
                                <h3 className={styles.settingsTitle}>Langue</h3>
                                <p className={styles.settingsDesc}>Choisissez votre langue</p>
                            </div>
                        </div>
                        <div className={styles.languageOptions}>
                            <button
                                className={`${styles.languageOption} ${locale === 'fr' ? styles.active : ''}`}
                                onClick={() => setLocale('fr')}
                            >
                                <span className={styles.flag}>🇫🇷</span>
                                <span>Français</span>
                                {locale === 'fr' && <CheckCircleIcon size={18} color="var(--primary-500)" />}
                            </button>
                            <button
                                className={`${styles.languageOption} ${locale === 'en' ? styles.active : ''}`}
                                onClick={() => setLocale('en')}
                            >
                                <span className={styles.flag}>🇬🇧</span>
                                <span>English</span>
                                {locale === 'en' && <CheckCircleIcon size={18} color="var(--primary-500)" />}
                            </button>
                        </div>
                    </section>

                    {/* Account Info */}
                    <section className={styles.settingsCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.settingsIcon}>
                                <UsersIcon size={24} />
                            </div>
                            <div>
                                <h3 className={styles.settingsTitle}>Informations du compte</h3>
                                <p className={styles.settingsDesc}>Détails de votre compte</p>
                            </div>
                        </div>
                        <div className={styles.accountInfo}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Email</span>
                                <span className={styles.infoValue}>{user?.email}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Rôle</span>
                                <span className={styles.infoValue}>{roleBadge.label}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Statut</span>
                                <span className={styles.statusActive}>
                                    <span className={styles.statusDot}></span>
                                    Actif
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Quick Links */}
                    <section className={styles.settingsCard}>
                        <div className={styles.settingsHeader}>
                            <div className={styles.settingsIcon}>
                                <SettingsIcon size={24} />
                            </div>
                            <div>
                                <h3 className={styles.settingsTitle}>Liens rapides</h3>
                                <p className={styles.settingsDesc}>Accès aux paramètres</p>
                            </div>
                        </div>
                        <div className={styles.quickLinks}>
                            <Link href="/dashboard/settings" className={styles.quickLink}>
                                Export et sauvegarde des données
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </Link>
                            <Link href="/dashboard/history" className={styles.quickLink}>
                                Historique des activités
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
