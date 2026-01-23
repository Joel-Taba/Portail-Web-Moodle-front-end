/**
 * Activity History Page - ENSPY Admin Portal
 * Historique des modifications
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { activityStorage, coursesStorage, categoriesStorage } from '@/lib/storage';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import type { ActivityLog, EntityType, ActivityAction } from '@/lib/types';
import styles from './page.module.css';

export default function HistoryPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [entityFilter, setEntityFilter] = useState<EntityType | 'all'>('all');
    const [actionFilter, setActionFilter] = useState<ActivityAction | 'all'>('all');

    useEffect(() => {
        setActivities(activityStorage.getAll());
    }, []);

    const filteredActivities = useMemo(() => {
        return activities
            .filter(activity => {
                if (entityFilter !== 'all' && activity.entityType !== entityFilter) return false;
                if (actionFilter !== 'all' && activity.action !== actionFilter) return false;
                return true;
            })
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [activities, entityFilter, actionFilter]);

    const entityOptions = [
        { value: 'all', label: 'Tous les types' },
        { value: 'course', label: '📚 Cours' },
        { value: 'category', label: '📁 Catégories' },
        { value: 'user', label: '👤 Utilisateurs' },
    ];

    const actionOptions = [
        { value: 'all', label: 'Toutes les actions' },
        { value: 'create', label: '➕ Création' },
        { value: 'update', label: '✏️ Modification' },
        { value: 'delete', label: '🗑️ Suppression' },
        { value: 'archive', label: '📦 Archivage' },
        { value: 'publish', label: '📢 Publication' },
    ];

    const getActionIcon = (action: ActivityAction) => {
        const icons: Record<ActivityAction, string> = {
            create: '➕',
            update: '✏️',
            delete: '🗑️',
            archive: '📦',
            publish: '📢',
            unpublish: '📴',
        };
        return icons[action] || '📝';
    };

    const getActionLabel = (action: ActivityAction) => {
        const labels: Record<ActivityAction, string> = {
            create: 'Création',
            update: 'Modification',
            delete: 'Suppression',
            archive: 'Archivage',
            publish: 'Publication',
            unpublish: 'Dépublication',
        };
        return labels[action] || action;
    };

    const getEntityIcon = (type: EntityType) => {
        const icons: Record<EntityType, string> = {
            course: '📚',
            category: '📁',
            user: '👤',
        };
        return icons[type] || '📄';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        // Less than 1 hour
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return minutes <= 0 ? 'À l\'instant' : `Il y a ${minutes} min`;
        }

        // Less than 24 hours
        if (diff < 86400000) {
            const hours = Math.floor(diff / 3600000);
            return `Il y a ${hours}h`;
        }

        // Less than 7 days
        if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        }

        // Full date
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
    };

    const getActionVariant = (action: ActivityAction) => {
        const variants: Record<ActivityAction, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
            create: 'success',
            update: 'info',
            delete: 'error',
            archive: 'warning',
            publish: 'success',
            unpublish: 'warning',
        };
        return variants[action] || 'default';
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Historique des modifications</h1>
                    <p className={styles.subtitle}>
                        {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''} enregistrée{filteredActivities.length > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <Select
                    options={entityOptions}
                    value={entityFilter}
                    onChange={(value) => setEntityFilter(value as EntityType | 'all')}
                />
                <Select
                    options={actionOptions}
                    value={actionFilter}
                    onChange={(value) => setActionFilter(value as ActivityAction | 'all')}
                />
            </div>

            {/* Timeline */}
            {filteredActivities.length > 0 ? (
                <div className={styles.timeline}>
                    {filteredActivities.map((activity) => (
                        <div key={activity.id} className={styles.timelineItem}>
                            <div className={styles.timelineIcon}>
                                {getActionIcon(activity.action)}
                            </div>
                            <div className={styles.timelineContent}>
                                <div className={styles.timelineHeader}>
                                    <span className={styles.entityIcon}>
                                        {getEntityIcon(activity.entityType)}
                                    </span>
                                    <span className={styles.entityTitle}>
                                        {activity.entityTitle}
                                    </span>
                                    <Badge variant={getActionVariant(activity.action)} size="sm">
                                        {getActionLabel(activity.action)}
                                    </Badge>
                                </div>
                                <div className={styles.timelineMeta}>
                                    <span className={styles.user}>
                                        👤 {activity.userName}
                                    </span>
                                    <span className={styles.time}>
                                        {formatDate(activity.timestamp)}
                                    </span>
                                </div>
                                {activity.description && (
                                    <p className={styles.description}>{activity.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>📋</div>
                    <h3>Aucune activité</h3>
                    <p>L'historique des modifications apparaîtra ici.</p>
                </div>
            )}
        </div>
    );
}
