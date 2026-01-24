/**
 * AuthContext - ENSPY Admin Portal
 * Contexte d'authentification pour la gestion des utilisateurs
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authStorage } from '@/lib/storage';
import { mockUsers } from '@/lib/mockData';
import type { User, AuthState, LoginCredentials } from '@/lib/types';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    checkAuth: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    // Vérifier l'authentification au chargement
    const checkAuth = useCallback(() => {
        const user = authStorage.getUser();
        setState({
            user,
            isAuthenticated: !!user,
            isLoading: false,
        });
    }, []);

    useEffect(() => {
        // Simuler un délai de vérification
        const timer = setTimeout(() => {
            checkAuth();
        }, 500);
        return () => clearTimeout(timer);
    }, [checkAuth]);

    // Fonction de connexion
    const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
        setState((prev) => ({ ...prev, isLoading: true }));

        // Simuler un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Rechercher l'utilisateur dans les données mock
        const foundUser = mockUsers.find(
            (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!foundUser) {
            setState((prev) => ({ ...prev, isLoading: false }));
            return { success: false, error: 'Email ou mot de passe incorrect' };
        }

        // Créer l'objet utilisateur sans le mot de passe
        const user: User = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
            avatar: foundUser.avatar,
            createdAt: foundUser.createdAt,
        };

        // Sauvegarder dans le storage
        authStorage.setUser(user);

        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        return { success: true };
    };

    // Fonction de déconnexion
    const logout = () => {
        authStorage.clearUser();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    // Fonction de mise à jour du profil
    const updateUser = (updatedUser: User) => {
        authStorage.setUser(updatedUser);
        setState((prev) => ({
            ...prev,
            user: updatedUser,
        }));
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                checkAuth,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
}

export default AuthContext;
