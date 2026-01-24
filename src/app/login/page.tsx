/**
 * Page de Connexion - ENSPY Admin Portal
 * Interface d'authentification pour les enseignants
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui_admin/Button';
import { Input } from '@/components/ui_admin/Input';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Rediriger si déjà connecté
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setIsSubmitting(true);

        const result = await login({ email, password });

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Erreur de connexion');
            setIsSubmitting(false);
        }
    };

    // Afficher un chargement initial
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Partie gauche - Décoration */}
            <div className={styles.decorationSide}>
                <div className={styles.decorationContent}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <rect width="64" height="64" rx="16" fill="white" fillOpacity="0.1" />
                            <path d="M16 24L32 12L48 24V40L32 52L16 40V24Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                            <circle cx="32" cy="32" r="8" fill="white" />
                        </svg>
                    </div>

                    <h1 className={styles.decorationTitle}>
                        École Nationale Supérieure Polytechnique de Yaoundé
                    </h1>

                    <p className={styles.decorationText}>
                        Portail d'administration pour la gestion des cours en ligne
                    </p>

                    {/* Features list */}
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>📚</span>
                            <span>Gestion des cours</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>📊</span>
                            <span>Statistiques détaillées</span>
                        </div>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>🎯</span>
                            <span>Organisation par catégories</span>
                        </div>
                    </div>
                </div>

                {/* Pattern décoratif */}
                <div className={styles.pattern}>
                    <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

            {/* Partie droite - Formulaire */}
            <div className={styles.formSide}>
                <div className={styles.formContainer}>
                    {/* En-tête */}
                    <div className={styles.formHeader}>
                        <div className={styles.logoMobile}>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <rect width="48" height="48" rx="12" fill="var(--primary-500)" />
                                <path d="M12 18L24 10L36 18V30L24 38L12 30V18Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                                <circle cx="24" cy="24" r="6" fill="white" />
                            </svg>
                        </div>
                        <h2 className={styles.formTitle}>Bienvenue</h2>
                        <p className={styles.formSubtitle}>
                            Connectez-vous pour accéder au portail d'administration
                        </p>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Message d'erreur */}
                        {error && (
                            <div className={styles.errorAlert} role="alert">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Email */}
                        <Input
                            type="email"
                            label="Adresse email"
                            placeholder="votre.email@enspy.cm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            leftIcon={
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 5L10 11L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        />

                        {/* Mot de passe */}
                        <div className={styles.passwordField}>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Mot de passe"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                                leftIcon={
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M7 8V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V8" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                }
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 3L17 17M8.5 8.5C7.67 9.33 7.67 10.67 8.5 11.5C9.33 12.33 10.67 12.33 11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M4 10C4 10 6 5 10 5C11.5 5 12.8 5.5 13.8 6.2M16 10C16 10 15.3 11.8 13.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <ellipse cx="10" cy="10" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Bouton de connexion */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isSubmitting}
                        >
                            Se connecter
                        </Button>
                    </form>

                    {/* Info comptes de test */}
                    <div className={styles.testAccounts}>
                        <p className={styles.testAccountsTitle}>Comptes de démonstration :</p>
                        <div className={styles.accountsList}>
                            <div className={styles.accountItem}>
                                <strong>Admin :</strong> admin@enspy.cm / admin123
                            </div>
                            <div className={styles.accountItem}>
                                <strong>Éditeur :</strong> prof@enspy.cm / prof123
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className={styles.footer}>
                        © 2024 ENSPY - Tous droits réservés
                    </p>
                </div>
            </div>
        </div>
    );
}
