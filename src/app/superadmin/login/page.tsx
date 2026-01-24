/**
 * Super Admin Login Page
 * Page de connexion pour le Super Administrateur
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function SuperAdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulation de vérification (en production, appeler l'API)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Credentials Super Admin (à remplacer par authentification réelle)
        if (email === 'superadmin@enspy.cm' && password === 'superadmin123') {
            // Stocker le token (simulation)
            localStorage.setItem('superadmin_token', 'simulated_token');
            localStorage.setItem('superadmin_user', JSON.stringify({
                email: 'superadmin@enspy.cm',
                name: 'Super Admin',
                role: 'superadmin'
            }));
            router.push('/superadmin');
        } else {
            setError('Email ou mot de passe incorrect');
        }

        setIsLoading(false);
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-card']}>
                {/* Logo */}
                <div className={styles['login-logo']}>
                    <div className={styles['login-logo-icon']}>SA</div>
                    <h1 className={styles['login-title']}>
                        ENSPY <span>Super Admin</span>
                    </h1>
                    <p className={styles['login-subtitle']}>
                        Accès réservé aux super administrateurs
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles['login-form']}>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Email</label>
                        <input
                            type="email"
                            className={styles['form-input']}
                            placeholder="superadmin@enspy.cm"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Mot de passe</label>
                        <input
                            type="password"
                            className={styles['form-input']}
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className={styles['error-message']}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles['btn-login']}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles['spinner']}></span>
                                Connexion...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                </form>

                {/* Demo credentials */}
                <div className={styles['demo-info']}>
                    <p>🔐 <strong>Identifiants de test :</strong></p>
                    <code>superadmin@enspy.cm</code>
                    <code>superadmin123</code>
                </div>
            </div>

            {/* Background decoration */}
            <div className={styles['bg-decoration']}>
                <div className={styles['bg-circle-1']}></div>
                <div className={styles['bg-circle-2']}></div>
                <div className={styles['bg-circle-3']}></div>
            </div>
        </div>
    );
}
