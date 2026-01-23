/* ============================================
   ENSPY COURSES PORTAL - Register Page
   ============================================ */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

// Évaluation de la force du mot de passe
const getPasswordStrength = (password: string, t: (key: string) => string): { strength: number; label: string } => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: t('register.passwordStrength.weak') };
    if (strength <= 3) return { strength: 2, label: t('register.passwordStrength.medium') };
    return { strength: 3, label: t('register.passwordStrength.strong') };
};

export default function RegisterPage() {
    const { t } = useLocale();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        level: '',
        department: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptNewsletter, setAcceptNewsletter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = t('register.errors.firstName');
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = t('register.errors.lastName');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('register.errors.email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('register.errors.emailInvalid');
        }

        if (!formData.password) {
            newErrors.password = t('register.errors.password');
        } else if (formData.password.length < 8) {
            newErrors.password = t('register.errors.passwordLength');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('register.errors.confirmPassword');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('register.errors.passwordMismatch');
        }

        if (!acceptTerms) {
            newErrors.terms = t('register.errors.terms');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.auth.register({
                nom: formData.lastName,
                prenom: formData.firstName,
                email: formData.email,
                password: formData.password,
                filiere: formData.department,
                niveau: formData.level,
            });

            if (response.success) {
                setSuccess(t('register.success'));
                // Optionnel: Rediriger après un court délai
                setTimeout(() => {
                    // window.location.href = '/connexion';
                }, 2000);
            } else {
                setError(response.error || 'Une erreur est survenue lors de l\'inscription');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = getPasswordStrength(formData.password, t);

    return (
        <div className={styles['register-page']}>
            <div className={styles['register-container']}>
                <div className={styles['register-card']}>
                    {/* Header */}
                    <div className={styles['register-header']}>
                        <div className={styles['register-logo']}>
                            <img src="/images/logo-enspy.png" alt="Logo ENSPY" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <h1 className={styles['register-title']}>{t('register.title')}</h1>
                        <p className={styles['register-subtitle']}>
                            {t('register.subtitle')}
                        </p>
                    </div>

                    {/* Body */}
                    <div className={styles['register-body']}>
                        <form className={styles['register-form']} onSubmit={handleSubmit}>
                            {/* Nom et Prénom */}
                            <div className={styles['register-row']}>
                                <div className={styles['register-field']}>
                                    <label htmlFor="lastName" className={styles['register-label']}>
                                        {t('register.lastName')} <span className={styles['register-label-required']}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className={`${styles['register-input']} ${errors.lastName ? styles['register-input--error'] : ''}`}
                                        placeholder={t('register.lastNamePlaceholder')}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        autoComplete="family-name"
                                    />
                                    {errors.lastName && <span className={styles['register-error']}>{errors.lastName}</span>}
                                </div>

                                <div className={styles['register-field']}>
                                    <label htmlFor="firstName" className={styles['register-label']}>
                                        {t('register.firstName')} <span className={styles['register-label-required']}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className={`${styles['register-input']} ${errors.firstName ? styles['register-input--error'] : ''}`}
                                        placeholder={t('register.firstNamePlaceholder')}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        autoComplete="given-name"
                                    />
                                    {errors.firstName && <span className={styles['register-error']}>{errors.firstName}</span>}
                                </div>
                            </div>

                            {/* Email */}
                            <div className={styles['register-field']}>
                                <label htmlFor="email" className={styles['register-label']}>
                                    {t('register.email')} <span className={styles['register-label-required']}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`${styles['register-input']} ${errors.email ? styles['register-input--error'] : ''}`}
                                    placeholder={t('register.emailPlaceholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                                {errors.email && <span className={styles['register-error']}>{errors.email}</span>}
                            </div>

                            {/* Niveau et Département */}
                            <div className={styles['register-row']}>
                                <div className={styles['register-field']}>
                                    <label htmlFor="level" className={styles['register-label']}>
                                        {t('register.level')}
                                    </label>
                                    <select
                                        id="level"
                                        name="level"
                                        className={styles['register-select']}
                                        value={formData.level}
                                        onChange={handleChange}
                                    >
                                        <option value="">{t('register.levelPlaceholder')}</option>
                                        <option value="licence1">{t('register.levels.licence1')}</option>
                                        <option value="licence2">{t('register.levels.licence2')}</option>
                                        <option value="licence3">{t('register.levels.licence3')}</option>
                                        <option value="master1">{t('register.levels.master1')}</option>
                                        <option value="master2">{t('register.levels.master2')}</option>
                                        <option value="doctorat">{t('register.levels.doctorat')}</option>
                                        <option value="professionnel">{t('register.levels.professionnel')}</option>
                                        <option value="autre">{t('register.levels.autre')}</option>
                                    </select>
                                </div>

                                <div className={styles['register-field']}>
                                    <label htmlFor="department" className={styles['register-label']}>
                                        {t('register.department')}
                                    </label>
                                    <select
                                        id="department"
                                        name="department"
                                        className={styles['register-select']}
                                        value={formData.department}
                                        onChange={handleChange}
                                    >
                                        <option value="">{t('register.departmentPlaceholder')}</option>
                                        <option value="genie-info">{t('register.departments.genie-info')}</option>
                                        <option value="genie-civil">{t('register.departments.genie-civil')}</option>
                                        <option value="genie-elec">{t('register.departments.genie-elec')}</option>
                                        <option value="genie-meca">{t('register.departments.genie-meca')}</option>
                                        <option value="genie-indus">{t('register.departments.genie-indus')}</option>
                                        <option value="telecom">{t('register.departments.telecom')}</option>
                                        <option value="math-info">{t('register.departments.math-info')}</option>
                                        <option value="autre">{t('register.departments.autre')}</option>
                                    </select>
                                </div>
                            </div>

                            {/* Mot de passe */}
                            <div className={styles['register-field']}>
                                <label htmlFor="password" className={styles['register-label']}>
                                    {t('register.password')} <span className={styles['register-label-required']}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className={`${styles['register-input']} ${errors.password ? styles['register-input--error'] : ''}`}
                                        style={{ paddingRight: '48px' }}
                                        placeholder={t('register.passwordPlaceholder')}
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: 'var(--color-gray-400)',
                                            padding: '4px',
                                        }}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <>
                                        <div className={styles['password-strength']}>
                                            {[1, 2, 3].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`${styles['password-strength-bar']} ${passwordStrength.strength >= level
                                                        ? level === 1
                                                            ? styles['password-strength-bar--weak']
                                                            : level === 2
                                                                ? styles['password-strength-bar--medium']
                                                                : styles['password-strength-bar--strong']
                                                        : ''
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className={styles['password-strength-text']}>
                                            {t('register.passwordStrength.label')} : {passwordStrength.label}
                                        </span>
                                    </>
                                )}
                                {errors.password && <span className={styles['register-error']}>{errors.password}</span>}
                            </div>

                            {/* Confirmation mot de passe */}
                            <div className={styles['register-field']}>
                                <label htmlFor="confirmPassword" className={styles['register-label']}>
                                    {t('register.confirmPassword')} <span className={styles['register-label-required']}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className={`${styles['register-input']} ${errors.confirmPassword ? styles['register-input--error'] : ''}`}
                                        style={{ paddingRight: '48px' }}
                                        placeholder={t('register.confirmPasswordPlaceholder')}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: 'var(--color-gray-400)',
                                            padding: '4px',
                                        }}
                                    >
                                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className={styles['register-error']}>{errors.confirmPassword}</span>}
                            </div>

                            {/* Conditions d'utilisation */}
                            <div className={styles['register-terms']}>
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptTerms}
                                    onChange={(e) => {
                                        setAcceptTerms(e.target.checked);
                                        if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                                    }}
                                />
                                <label htmlFor="terms" className={styles['register-terms-text']}>
                                    {t('register.terms.text')}{' '}
                                    <Link href="/conditions-utilisation" className={styles['register-terms-link']}>
                                        {t('register.terms.conditions')}
                                    </Link>{' '}
                                    {t('register.terms.and')}{' '}
                                    <Link href="/politique-confidentialite" className={styles['register-terms-link']}>
                                        {t('register.terms.privacy')}
                                    </Link>{' '}
                                    {t('register.terms.suffix')}
                                </label>
                            </div>
                            {errors.terms && <span className={styles['register-error']}>{errors.terms}</span>}

                            {/* Newsletter */}
                            <div className={styles['register-terms']}>
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    checked={acceptNewsletter}
                                    onChange={(e) => setAcceptNewsletter(e.target.checked)}
                                />
                                <label htmlFor="newsletter" className={styles['register-terms-text']}>
                                    {t('register.newsletter')}
                                </label>
                            </div>

                            {/* Messages d'erreur / succès */}
                            {error && (
                                <div className={`${styles['register-alert']} ${styles['register-alert--error']}`}>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className={`${styles['register-alert']} ${styles['register-alert--success']}`}>
                                    {success}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className={styles['register-submit']}
                                disabled={isLoading}
                            >
                                {isLoading ? t('register.submitting') : t('register.submit')}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className={styles['register-footer']}>
                        <p className={styles['register-footer-text']}>
                            {t('register.hasAccount')}{' '}
                            <Link href="/connexion" className={styles['register-footer-link']}>
                                {t('register.loginLink')}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <Link href="/" className={styles['register-back']}>
                    <ArrowLeftIcon />
                    {t('common.backToHome')}
                </Link>
            </div>
        </div>
    );
}
