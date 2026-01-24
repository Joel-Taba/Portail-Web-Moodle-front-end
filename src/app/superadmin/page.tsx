/**
 * Super Admin Dashboard
 * Interface de gestion des administrateurs
 */

'use client';

import React, { useState, useEffect } from 'react';
import styles from './superadmin.module.css';
import { Admin, AdminContent, SuperAdminStats, AdminFormData } from '@/types/superadmin';
import { adminStorage } from '@/lib/superadminData';

// ============================================
// Icons Components
// ============================================

const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const FolderIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const PauseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
    </svg>
);

const PlayIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const AlertIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

// ============================================
// Main Component
// ============================================

export default function SuperAdminPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [stats, setStats] = useState<SuperAdminStats | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
    const [adminContent, setAdminContent] = useState<AdminContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load data
    useEffect(() => {
        const loadData = () => {
            const adminsList = adminStorage.getAll();
            const statsData = adminStorage.getStats();
            setAdmins(adminsList);
            setStats(statsData);
            setIsLoading(false);
        };
        loadData();
    }, []);

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // Handle add admin
    const handleAddAdmin = (data: AdminFormData) => {
        const newAdmin = adminStorage.add({
            email: data.email,
            nom: data.nom,
            prenom: data.prenom,
            telephone: data.telephone,
            status: 'pending',
        });
        setAdmins([...admins, newAdmin]);
        setStats(adminStorage.getStats());
        setIsAddModalOpen(false);
    };

    // Handle delete admin
    const handleDeleteAdmin = () => {
        if (selectedAdmin) {
            adminStorage.delete(selectedAdmin.id);
            setAdmins(admins.filter(a => a.id !== selectedAdmin.id));
            setStats(adminStorage.getStats());
            setIsDeleteModalOpen(false);
            setSelectedAdmin(null);
        }
    };

    // Handle toggle status
    const handleToggleStatus = (admin: Admin) => {
        const newStatus = admin.status === 'active' ? 'suspended' : 'active';
        const updated = adminStorage.updateStatus(admin.id, newStatus);
        if (updated) {
            setAdmins(admins.map(a => a.id === admin.id ? updated : a));
            setStats(adminStorage.getStats());
        }
    };

    // Handle view content
    const handleViewContent = (admin: Admin) => {
        const content = adminStorage.getContent(admin.id);
        setSelectedAdmin(admin);
        setAdminContent(content);
        setIsContentModalOpen(true);
    };

    // Open delete modal
    const openDeleteModal = (admin: Admin) => {
        setSelectedAdmin(admin);
        setIsDeleteModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className={styles['superadmin-container']}>
                <div className={styles['superadmin-main']}>
                    <div className={styles['empty-state']}>
                        <div className={styles['empty-state-icon']}>⏳</div>
                        <p>Chargement...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['superadmin-container']}>
            {/* Header */}
            <header className={styles['superadmin-header']}>
                <div className={styles['superadmin-logo']}>
                    <div className={styles['superadmin-logo-icon']}>SA</div>
                    <div className={styles['superadmin-logo-text']}>
                        ENSPY <span>Super Admin</span>
                    </div>
                </div>
                <div className={styles['superadmin-user']}>
                    <span>Super Administrateur</span>
                    <button className={styles['superadmin-logout']}>
                        <LogoutIcon /> Déconnexion
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles['superadmin-main']}>
                {/* Stats */}
                <div className={styles['stats-grid']}>
                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-icon']}>
                            <UsersIcon />
                        </div>
                        <div className={styles['stat-card-value']}>{stats?.totalAdmins || 0}</div>
                        <div className={styles['stat-card-label']}>Administrateurs</div>
                    </div>
                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-icon']} style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
                            <UsersIcon />
                        </div>
                        <div className={styles['stat-card-value']}>{stats?.activeAdmins || 0}</div>
                        <div className={styles['stat-card-label']}>Actifs</div>
                    </div>
                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-icon']} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }}>
                            <BookIcon />
                        </div>
                        <div className={styles['stat-card-value']}>{stats?.totalCourses || 0}</div>
                        <div className={styles['stat-card-label']}>Cours Total</div>
                    </div>
                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-icon']} style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}>
                            <FolderIcon />
                        </div>
                        <div className={styles['stat-card-value']}>{stats?.totalCategories || 0}</div>
                        <div className={styles['stat-card-label']}>Catégories</div>
                    </div>
                </div>

                {/* Admin List */}
                <section className={styles['admin-section']}>
                    <div className={styles['admin-section-header']}>
                        <h2 className={styles['admin-section-title']}>Gestion des Administrateurs</h2>
                        <button
                            className={styles['btn-add-admin']}
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <PlusIcon /> Ajouter un Admin
                        </button>
                    </div>

                    {admins.length === 0 ? (
                        <div className={styles['empty-state']}>
                            <div className={styles['empty-state-icon']}>👤</div>
                            <p>Aucun administrateur pour le moment</p>
                        </div>
                    ) : (
                        <table className={styles['admin-table']}>
                            <thead>
                                <tr>
                                    <th>Administrateur</th>
                                    <th>Téléphone</th>
                                    <th>Statut</th>
                                    <th>Cours</th>
                                    <th>Catégories</th>
                                    <th>Inscrit le</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map(admin => (
                                    <tr key={admin.id}>
                                        <td>
                                            <div className={styles['admin-info']}>
                                                <div className={styles['admin-avatar']}>
                                                    {admin.prenom[0]}{admin.nom[0]}
                                                </div>
                                                <div>
                                                    <div className={styles['admin-name']}>
                                                        {admin.prenom} {admin.nom}
                                                    </div>
                                                    <div className={styles['admin-email']}>{admin.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{admin.telephone || '-'}</td>
                                        <td>
                                            <span className={`${styles['status-badge']} ${styles[`status-${admin.status}`]}`}>
                                                {admin.status === 'active' && '● Actif'}
                                                {admin.status === 'suspended' && '● Suspendu'}
                                                {admin.status === 'pending' && '● En attente'}
                                            </span>
                                        </td>
                                        <td>{admin.coursCount}</td>
                                        <td>{admin.categoriesCount}</td>
                                        <td>{formatDate(admin.createdAt)}</td>
                                        <td>
                                            <div className={styles['action-buttons']}>
                                                <button
                                                    className={`${styles['btn-action']} ${styles['btn-view']}`}
                                                    onClick={() => handleViewContent(admin)}
                                                    title="Voir les contenus"
                                                >
                                                    <EyeIcon />
                                                </button>
                                                <button
                                                    className={`${styles['btn-action']} ${admin.status === 'active' ? styles['btn-suspend'] : styles['btn-activate']}`}
                                                    onClick={() => handleToggleStatus(admin)}
                                                    title={admin.status === 'active' ? 'Suspendre' : 'Activer'}
                                                >
                                                    {admin.status === 'active' ? <PauseIcon /> : <PlayIcon />}
                                                </button>
                                                <button
                                                    className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                                    onClick={() => openDeleteModal(admin)}
                                                    title="Supprimer"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>

            {/* Add Admin Modal */}
            {isAddModalOpen && (
                <AddAdminModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddAdmin}
                />
            )}

            {/* Delete Confirm Modal */}
            {isDeleteModalOpen && selectedAdmin && (
                <ConfirmDeleteModal
                    admin={selectedAdmin}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedAdmin(null);
                    }}
                    onConfirm={handleDeleteAdmin}
                />
            )}

            {/* View Content Modal */}
            {isContentModalOpen && selectedAdmin && (
                <ViewContentModal
                    admin={selectedAdmin}
                    content={adminContent}
                    onClose={() => {
                        setIsContentModalOpen(false);
                        setSelectedAdmin(null);
                        setAdminContent(null);
                    }}
                />
            )}
        </div>
    );
}

// ============================================
// Add Admin Modal Component
// ============================================

interface AddAdminModalProps {
    onClose: () => void;
    onSubmit: (data: AdminFormData) => void;
}

function AddAdminModal({ onClose, onSubmit }: AddAdminModalProps) {
    const [formData, setFormData] = useState<AdminFormData>({
        email: '',
        nom: '',
        prenom: '',
        telephone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.nom || !formData.prenom || !formData.password) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <h3 className={styles['modal-title']}>Ajouter un Administrateur</h3>
                    <button className={styles['modal-close']} onClick={onClose}>
                        <XIcon />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Prénom *</label>
                        <input
                            type="text"
                            className={styles['form-input']}
                            placeholder="Entrez le prénom"
                            value={formData.prenom}
                            onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Nom *</label>
                        <input
                            type="text"
                            className={styles['form-input']}
                            placeholder="Entrez le nom"
                            value={formData.nom}
                            onChange={e => setFormData({ ...formData, nom: e.target.value })}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Email *</label>
                        <input
                            type="email"
                            className={styles['form-input']}
                            placeholder="admin@enspy.cm"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Téléphone</label>
                        <input
                            type="tel"
                            className={styles['form-input']}
                            placeholder="+237 6XX XX XX XX"
                            value={formData.telephone}
                            onChange={e => setFormData({ ...formData, telephone: e.target.value })}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Mot de passe *</label>
                        <input
                            type="password"
                            className={styles['form-input']}
                            placeholder="Minimum 8 caractères"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Confirmer le mot de passe *</label>
                        <input
                            type="password"
                            className={styles['form-input']}
                            placeholder="Confirmez le mot de passe"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    {error && (
                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
                            {error}
                        </p>
                    )}

                    <div className={styles['form-actions']}>
                        <button type="button" className={styles['btn-cancel']} onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className={styles['btn-submit']}>
                            Ajouter l&apos;Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ============================================
// Confirm Delete Modal Component
// ============================================

interface ConfirmDeleteModalProps {
    admin: Admin;
    onClose: () => void;
    onConfirm: () => void;
}

function ConfirmDeleteModal({ admin, onClose, onConfirm }: ConfirmDeleteModalProps) {
    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                <div className={styles['confirm-dialog']}>
                    <div className={styles['confirm-icon']}>
                        <AlertIcon />
                    </div>
                    <h3 className={styles['modal-title']}>Supprimer cet administrateur ?</h3>
                    <p className={styles['confirm-message']}>
                        Vous êtes sur le point de supprimer <strong>{admin.prenom} {admin.nom}</strong>.
                        <br /><br />
                        Cette action supprimera également tous ses cours ({admin.coursCount}) et catégories ({admin.categoriesCount}).
                        <br /><br />
                        <strong>Cette action est irréversible.</strong>
                    </p>
                    <div className={styles['form-actions']}>
                        <button className={styles['btn-cancel']} onClick={onClose}>
                            Annuler
                        </button>
                        <button
                            className={styles['btn-submit']}
                            onClick={onConfirm}
                            style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)' }}
                        >
                            Supprimer définitivement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// View Content Modal Component
// ============================================

interface ViewContentModalProps {
    admin: Admin;
    content: AdminContent | null;
    onClose: () => void;
}

function ViewContentModal({ admin, content, onClose }: ViewContentModalProps) {
    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div
                className={styles['modal-content']}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '700px' }}
            >
                <div className={styles['modal-header']}>
                    <h3 className={styles['modal-title']}>
                        Contenus de {admin.prenom} {admin.nom}
                    </h3>
                    <button className={styles['modal-close']} onClick={onClose}>
                        <XIcon />
                    </button>
                </div>

                {!content ? (
                    <div className={styles['empty-state']}>
                        <div className={styles['empty-state-icon']}>📭</div>
                        <p>Aucun contenu créé par cet administrateur</p>
                    </div>
                ) : (
                    <div className={styles['content-grid']}>
                        {/* Courses */}
                        <div className={styles['content-card']}>
                            <div className={styles['content-card-header']}>
                                <h4 className={styles['content-card-title']}>
                                    📚 Cours ({content.courses.length})
                                </h4>
                            </div>
                            {content.courses.length === 0 ? (
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                                    Aucun cours
                                </p>
                            ) : (
                                content.courses.map(course => (
                                    <div key={course.id} className={styles['content-item']}>
                                        <div className={styles['content-item-info']}>
                                            <div className={styles['content-item-title']}>{course.titre}</div>
                                            <div className={styles['content-item-meta']}>
                                                {course.nombreVues} vues • {course.status}
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                            title="Supprimer ce cours"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Categories */}
                        <div className={styles['content-card']}>
                            <div className={styles['content-card-header']}>
                                <h4 className={styles['content-card-title']}>
                                    📁 Catégories ({content.categories.length})
                                </h4>
                            </div>
                            {content.categories.length === 0 ? (
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
                                    Aucune catégorie
                                </p>
                            ) : (
                                content.categories.map(category => (
                                    <div key={category.id} className={styles['content-item']}>
                                        <div className={styles['content-item-info']}>
                                            <div className={styles['content-item-title']}>{category.nom}</div>
                                            <div className={styles['content-item-meta']}>
                                                {category.coursCount} cours
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                            title="Supprimer cette catégorie"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                <div className={styles['form-actions']} style={{ marginTop: '1.5rem' }}>
                    <button className={styles['btn-cancel']} onClick={onClose} style={{ flex: 'none', width: '100%' }}>
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}
