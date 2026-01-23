/**
 * Settings/Export Page - ENSPY Admin Portal
 * Paramètres et export des données
 */

'use client';

import React, { useState } from 'react';
import { coursesStorage, categoriesStorage, activityStorage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import type { Course, Category, ActivityLog } from '@/lib/types';
import styles from './page.module.css';

export default function SettingsPage() {
    const [exportStatus, setExportStatus] = useState<string | null>(null);

    const downloadFile = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const exportToJSON = (data: unknown, filename: string) => {
        const json = JSON.stringify(data, null, 2);
        downloadFile(json, `${filename}.json`, 'application/json');
        setExportStatus(`Export ${filename}.json réussi !`);
        setTimeout(() => setExportStatus(null), 3000);
    };

    const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
        if (data.length === 0) {
            setExportStatus('Aucune donnée à exporter');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header];
                    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
                    // Escape quotes and wrap in quotes if contains comma
                    return stringValue.includes(',') || stringValue.includes('"')
                        ? `"${stringValue.replace(/"/g, '""')}"`
                        : stringValue;
                }).join(',')
            )
        ];

        downloadFile(csvRows.join('\n'), `${filename}.csv`, 'text/csv');
        setExportStatus(`Export ${filename}.csv réussi !`);
        setTimeout(() => setExportStatus(null), 3000);
    };

    // Handlers
    const handleExportCourses = (format: 'json' | 'csv') => {
        const courses = coursesStorage.getAll();
        if (format === 'json') {
            exportToJSON(courses, 'enspy_courses');
        } else {
            // Flatten courses for CSV
            const flatCourses = courses.map(course => ({
                ...course,
                instructor: course.instructor.name,
                tags: course.tags.join(';'),
            }));
            exportToCSV(flatCourses as Record<string, unknown>[], 'enspy_courses');
        }
    };

    const handleExportCategories = (format: 'json' | 'csv') => {
        const categories = categoriesStorage.getAll();
        if (format === 'json') {
            exportToJSON(categories, 'enspy_categories');
        } else {
            exportToCSV(categories as unknown as Record<string, unknown>[], 'enspy_categories');
        }
    };

    const handleExportActivity = (format: 'json' | 'csv') => {
        const activities = activityStorage.getAll();
        if (format === 'json') {
            exportToJSON(activities, 'enspy_activity');
        } else {
            exportToCSV(activities as unknown as Record<string, unknown>[], 'enspy_activity');
        }
    };

    const handleExportAll = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            courses: coursesStorage.getAll(),
            categories: categoriesStorage.getAll(),
            activityLogs: activityStorage.getAll(),
        };
        exportToJSON(data, 'enspy_backup');
    };

    const handleClearData = () => {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Paramètres et Export</h1>
                <p className={styles.subtitle}>
                    Gérez vos préférences et exportez vos données
                </p>
            </div>

            {/* Status message */}
            {exportStatus && (
                <div className={styles.statusMessage}>
                    ✅ {exportStatus}
                </div>
            )}

            {/* Export sections */}
            <div className={styles.grid}>
                {/* Courses export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle>📚 Export des cours</CardTitle>
                        <CardDescription>
                            Téléchargez la liste complète des cours
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportCourses('json')}>
                                📄 JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportCourses('csv')}>
                                📊 CSV
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Categories export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle>📁 Export des catégories</CardTitle>
                        <CardDescription>
                            Téléchargez la structure des catégories
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportCategories('json')}>
                                📄 JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportCategories('csv')}>
                                📊 CSV
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle>📋 Export de l'activité</CardTitle>
                        <CardDescription>
                            Téléchargez l'historique des modifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportActivity('json')}>
                                📄 JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportActivity('csv')}>
                                📊 CSV
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Full backup */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle>💾 Sauvegarde complète</CardTitle>
                        <CardDescription>
                            Exportez toutes les données en un seul fichier
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="primary" onClick={handleExportAll} fullWidth>
                            Télécharger la sauvegarde
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Data management */}
            <Card variant="default">
                <CardHeader>
                    <CardTitle>⚠️ Gestion des données</CardTitle>
                    <CardDescription>
                        Actions de maintenance et réinitialisation
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={styles.dangerZone}>
                        <div className={styles.dangerInfo}>
                            <h4>Réinitialiser les données</h4>
                            <p>
                                Supprime toutes les données locales et recharge les données de démonstration.
                                Cette action est irréversible.
                            </p>
                        </div>
                        <Button variant="danger" onClick={handleClearData}>
                            Réinitialiser
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Storage info */}
            <Card variant="default">
                <CardHeader>
                    <CardTitle>📊 Informations de stockage</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={styles.storageInfo}>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Cours</span>
                            <span className={styles.storageValue}>{coursesStorage.getAll().length}</span>
                        </div>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Catégories</span>
                            <span className={styles.storageValue}>{categoriesStorage.getAll().length}</span>
                        </div>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Logs d'activité</span>
                            <span className={styles.storageValue}>{activityStorage.getAll().length}</span>
                        </div>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Type de stockage</span>
                            <span className={styles.storageValue}>LocalStorage (simulé)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
