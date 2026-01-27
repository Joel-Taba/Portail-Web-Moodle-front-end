/**
 * Page d'accueil - Redirection vers login ou dashboard
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  // Afficher un écran de chargement pendant la vérification
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        {/* Logo spinner */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2s infinite',
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 15L20 8L30 15V25L20 32L10 25V15Z" stroke="var(--primary-500)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="5" fill="var(--primary-500)" />
          </svg>
        </div>
        <p style={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 500,
        }}>
          Chargement...
        </p>
      </div>
    </div>
  );
}
