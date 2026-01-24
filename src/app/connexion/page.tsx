/* ============================================
   ENSPY COURSES PORTAL - Login Page
   Connexion unifiée pour Étudiants, Admin et Super Admin
   ============================================ */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useLocale } from '@/contexts/LocaleContext';
import api from '@/lib/api';

// Icons
const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const CrownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M3 20h18" />
    </svg>
);

// Types d'utilisateurs
type UserType = 'etudiant' | 'admin' | 'superadmin';

// Identifiants de test
const TEST_CREDENTIALS = {
    superadmin: { email: 'superadmin@enspy.cm', password: 'superadmin123' },
    admin: { email: 'admin@enspy.cm', password: 'admin123' },
};

export default function LoginPage() {
    const { t } = useLocale();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userType, setUserType] = useState<UserType>('etudiant');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation simple
        if (!email || !password) {
            setError(t('login.error.required') || 'Veuillez remplir tous les champs');
            setIsLoading(false);
            return;
        }

        try {
            // Vérification Super Admin
            if (email === TEST_CREDENTIALS.superadmin.email &&
                password === TEST_CREDENTIALS.superadmin.password) {
                localStorage.setItem('superadmin_token', 'simulated_token');
                localStorage.setItem('superadmin_user', JSON.stringify({
                    email: email,
                    name: 'Super Administrateur',
                    role: 'superadmin'
                }));
                router.push('/superadmin');
                return;
            }

            // Vérification Admin
            if (email === TEST_CREDENTIALS.admin.email &&
                password === TEST_CREDENTIALS.admin.password) {
                localStorage.setItem('admin_token', 'simulated_token');
                localStorage.setItem('admin_user', JSON.stringify({
                    email: email,
                    name: 'Administrateur',
                    role: 'admin'
                }));
                router.push('/dashboard');
                return;
            }

            // Connexion Étudiant via API
            const response = await api.auth.login({ email, password });

            if (response.success) {
                localStorage.setItem('user', JSON.stringify(response.data.etudiant));
                window.location.href = '/';
            } else {
                setError(response.error || 'Identifiants incorrects');
            }
        } catch {
            // Si l'API échoue, on vérifie quand même les credentials de test
            setError('Identifiants incorrects ou serveur indisponible');
        } finally {
            setIsLoading(false);
        }
    };

    const getUserTypeLabel = () => {
        switch (userType) {
            case 'superadmin': return 'Super Administrateur';
            case 'admin': return 'Administrateur';
            default: return 'Étudiant';
        }
    };

    const getUserTypeIcon = () => {
        switch (userType) {
            case 'superadmin': return <CrownIcon />;
            case 'admin': return <ShieldIcon />;
            default: return <UserIcon />;
        }
    };

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-container']}>
                <div className={styles['login-card']}>
                    {/* Header */}
                    <div className={styles['login-header']}>
                        <div className={styles['login-logo']}>
                            <img src="/images/logo-enspy.png" alt="Logo ENSPY" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h1 className={styles['login-title']}>{t('login.title') || 'Connexion'}</h1>
                        <p className={styles['login-subtitle']}>
                            {t('login.subtitle') || 'Accédez à votre espace personnel'}
                        </p>
                    </div>

                    {/* User Type Selector */}
                    <div className={styles['login-type-selector']}>
                        <button
                            type="button"
                            className={`${styles['login-type-btn']} ${userType === 'etudiant' ? styles['login-type-active'] : ''}`}
                            onClick={() => setUserType('etudiant')}
                        >
                            <UserIcon />
                            <span>Étudiant</span>
                        </button>
                        <button
                            type="button"
                            className={`${styles['login-type-btn']} ${userType === 'admin' ? styles['login-type-active'] : ''}`}
                            onClick={() => setUserType('admin')}
                        >
                            <ShieldIcon />
                            <span>Admin</span>
                        </button>
                        <button
                            type="button"
                            className={`${styles['login-type-btn']} ${userType === 'superadmin' ? styles['login-type-active'] : ''}`}
                            onClick={() => setUserType('superadmin')}
                        >
                            <CrownIcon />
                            <span>Super Admin</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className={styles['login-body']}>
                        <div className={styles['login-user-badge']}>
                            {getUserTypeIcon()}
                            <span>Connexion {getUserTypeLabel()}</span>
                        </div>

                        <form className={styles['login-form']} onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className={styles['login-field']}>
                                <label htmlFor="email" className={styles['login-label']}>
                                    {t('login.email') || 'Email'}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={styles['login-input']}
                                    placeholder={t('login.emailPlaceholder') || 'votre.email@enspy.cm'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            {/* Password Field */}
                            <div className={styles['login-field']}>
                                <label htmlFor="password" className={styles['login-label']}>
                                    {t('login.password') || 'Mot de passe'}
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={styles['login-input']}
                                        style={{ paddingRight: '48px', width: '100%' }}
                                        placeholder={t('login.passwordPlaceholder') || '••••••••'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={styles['login-password-toggle']}
                                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className={styles['login-options']}>
                                <label className={styles['login-remember']}>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    {t('login.rememberMe') || 'Se souvenir de moi'}
                                </label>
                                <Link href="/mot-de-passe-oublie" className={styles['login-forgot']}>
                                    {t('login.forgotPassword') || 'Mot de passe oublié ?'}
                                </Link>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className={styles['login-error']}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className={styles['login-submit']}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles['login-spinner']}></span>
                                        Connexion...
                                    </>
                                ) : (
                                    t('login.submit') || 'Se connecter'
                                )}
                            </button>
                        </form>

                        {/* Test Credentials Info */}
                        {(userType === 'admin' || userType === 'superadmin') && (
                            <div className={styles['login-demo-info']}>
                                <p>🔐 <strong>Identifiants de test :</strong></p>
                                {userType === 'superadmin' && (
                                    <>
                                        <code>superadmin@enspy.cm</code>
                                        <code>superadmin123</code>
                                    </>
                                )}
                                {userType === 'admin' && (
                                    <>
                                        <code>admin@enspy.cm</code>
                                        <code>admin123</code>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer - Only for students */}
                    {userType === 'etudiant' && (
                        <div className={styles['login-footer']}>
                            <p className={styles['login-footer-text']}>
                                {t('login.noAccount') || "Vous n'avez pas de compte ?"}{' '}
                                <Link href="/inscription" className={styles['login-footer-link']}>
                                    {t('login.registerLink') || "S'inscrire"}
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                {/* Back Link */}
                <Link href="/" className={styles['login-back']}>
                    <ArrowLeftIcon />
                    {t('common.backToHome') || "Retour à l'accueil"}
                </Link>
            </div>
        </div>
    );
}
