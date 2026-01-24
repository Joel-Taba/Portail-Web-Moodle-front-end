/**
 * Dashboard Layout - ENSPY Admin Portal
 * Layout avec sidebar et header pour les pages admin
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/layout_admin/Sidebar';
import { Header } from '@/components/layout_admin/Header';
import { initializeMockData } from '@/lib/mockData';
import styles from './dashboard.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initialiser les données mock au premier chargement
    useEffect(() => {
        initializeMockData();
    }, []);

    // Rediriger si non authentifié
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    // Fermer le menu mobile lors du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Afficher un chargement si en cours de vérification
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner} />
                <p>Chargement...</p>
            </div>
        );
    }

    // Ne rien afficher si non authentifié (redirection en cours)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.layout}>
            {/* Overlay pour mobile */}
            {isMobileMenuOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`${styles.sidebarWrapper} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            {/* Contenu principal */}
            <div
                className={styles.mainWrapper}
                style={{
                    marginLeft: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'
                }}
            >
                <Header
                    onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />

                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}
