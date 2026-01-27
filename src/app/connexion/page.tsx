/* ============================================
   ENSPY COURSES PORTAL - Login Page
   Connexion unifiée avec détection automatique du rôle
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

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export default function LoginPage() {
    const { t } = useLocale();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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
            // 1. Essayer d'abord la connexion administrateur via l'API
            const adminResponse = await api.auth.adminLogin({ email, password });

            if (adminResponse.success && adminResponse.data) {
                // Connexion Admin réussie
                const adminData = adminResponse.data;
                localStorage.setItem('admin_token', 'token_' + Date.now());
                localStorage.setItem('admin_user', JSON.stringify(adminData.admin));
                localStorage.setItem('admin_type', adminData.admin.type);

                // Rediriger selon le type retourné par le backend
                router.push(adminData.redirect);
                return;
            }

            // 2. Si ce n'est pas un admin, tenter la connexion étudiant via API
            const response = await api.auth.login({ email, password });

            if (response.success) {
                localStorage.setItem('user', JSON.stringify(response.data.etudiant));
                localStorage.setItem('user_token', 'student_token_' + Date.now());
                window.location.href = '/';
            } else {
                setError(response.error || 'Identifiants incorrects');
            }
        } catch {
            setError('Identifiants incorrects ou serveur indisponible');
        } finally {
            setIsLoading(false);
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
                            {t('login.subtitle') || 'Accédez à votre espace ENSPY'}
                        </p>
                    </div>

                    {/* Body */}
                    <div className={styles['login-body']}>
                        <form className={styles['login-form']} onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className={styles['login-field']}>
                                <label htmlFor="email" className={styles['login-label']}>
                                    {t('login.email') || 'Adresse email'}
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
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Password Field */}
                            <div className={styles['login-field']}>
                                <label htmlFor="password" className={styles['login-label']}>
                                    {t('login.password') || 'Mot de passe'}
                                </label>
                                <div className={styles['login-input-wrapper']}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        className={styles['login-input']}
                                        placeholder={t('login.passwordPlaceholder') || '••••••••'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={styles['login-password-toggle']}
                                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                                        disabled={isLoading}
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
                                        disabled={isLoading}
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
                                    <LockIcon />
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
                                        Connexion en cours...
                                    </>
                                ) : (
                                    t('login.submit') || 'Se connecter'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className={styles['login-footer']}>
                        <p className={styles['login-footer-text']}>
                            {t('login.noAccount') || "Vous n'avez pas de compte ?"}{' '}
                            <Link href="/inscription" className={styles['login-footer-link']}>
                                {t('login.registerLink') || "S'inscrire"}
                            </Link>
                        </p>
                    </div>
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
