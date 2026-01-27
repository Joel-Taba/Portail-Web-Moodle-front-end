/**
 * Settings/Export Page - ENSPY Admin Portal
 * Paramètres et export des données
 */

'use client';

import React, { useState, useEffect } from 'react';
import { activityStorage, studentsStorage } from '@/lib/storage';
import { coursesApi } from '@/lib/api/coursesApi';
import { categoriesApi } from '@/lib/api/categoriesApi';
import { exportToPDF } from '@/lib/exportUtils';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import {
    CoursesIcon, CategoriesIcon, HistoryIcon, ArchiveIcon,
    AlertCircleIcon, ChartBarIcon, DownloadIcon, JSONIcon, CSVIcon, PDFIcon, CheckCircleIcon, StudentsIcon
} from '@/components/icons';
import type { Course, Category, ActivityLog, Student } from '@/lib/types';
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

    const handleExportPDF = async (type: 'courses' | 'categories' | 'activity') => {
        try {
            if (type === 'courses') {
                const data = await coursesApi.getAll();
                const allCategories = await categoriesApi.getAll();
                // Enrichir les données avec les noms de catégorie au lieu des IDs
                const enrichedData = data.map(course => ({
                    ...course,
                    category: allCategories.find(c => c.id === course.category)?.name || 'Non catégorisé',
                    instructor: course.instructor?.name || 'Non assigné'
                }));
                const columns = ['title', 'category', 'status', 'enrollments', 'instructor'];
                exportToPDF(enrichedData as any, columns, 'Liste des Cours', 'enspy_courses');
            } else if (type === 'categories') {
                const data = await categoriesApi.getAll();
                const columns = ['name', 'slug', 'courseCount'];
                exportToPDF(data as any, columns, 'Liste des Catégories', 'enspy_categories');
            } else if (type === 'activity') {
                const data = activityStorage.getAll();
                const columns = ['action', 'entityType', 'entityTitle', 'userName', 'timestamp'];
                exportToPDF(data as any, columns, 'Journal d\'activité', 'enspy_activity');
            }
            setExportStatus(`Export PDF réussi !`);
        } catch (error) {
            console.error(error);
            setExportStatus(`Erreur lors de l'export PDF`);
        }
        setTimeout(() => setExportStatus(null), 3000);
    };

    // Handlers
    const handleExportCourses = async (format: 'json' | 'csv') => {
        try {
            const courses = await coursesApi.getAll();
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
        } catch (e) {
            console.error(e);
            setExportStatus("Erreur lors de l'export");
        }
    };

    const handleExportCategories = async (format: 'json' | 'csv') => {
        try {
            const categories = await categoriesApi.getAll();
            if (format === 'json') {
                exportToJSON(categories, 'enspy_categories');
            } else {
                exportToCSV(categories as unknown as Record<string, unknown>[], 'enspy_categories');
            }
        } catch (e) {
            console.error(e);
            setExportStatus("Erreur lors de l'export");
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

    const handleExportAll = async () => {
        try {
            const courses = await coursesApi.getAll();
            const categories = await categoriesApi.getAll();
            const data = {
                exportedAt: new Date().toISOString(),
                courses,
                categories,
                activityLogs: activityStorage.getAll(),
            };
            exportToJSON(data, 'enspy_backup');
        } catch (e) {
            console.error(e);
            setExportStatus("Erreur lors de la sauvegarde complète");
        }
    };

    const handleClearData = () => {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser les logs d\'activité locaux ?')) {
            activityStorage.clear();
            window.location.reload();
        }
    };

    // State for student export
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [studentCount, setStudentCount] = useState<number>(0);
    const [courseCount, setCourseCount] = useState<number>(0);
    const [categoryCount, setCategoryCount] = useState<number>(0);

    // Load courses for dropdown and storage info
    useEffect(() => {
        const loadData = async () => {
            try {
                const allCourses = await coursesApi.getAll();
                setCourses(allCourses.filter(c => c.status === 'published'));
                setCourseCount(allCourses.length);

                const allCategories = await categoriesApi.getAll();
                setCategoryCount(allCategories.length);

                // Note: L'initialisation des données mock a été supprimée
                // Les élèves en attente seront fournis par le backend
            } catch (e) {
                console.error("Failed to load data for settings", e);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (selectedCourseId) {
            const students = studentsStorage.getPendingByCourseId(selectedCourseId);
            setStudentCount(students.length);
        } else {
            setStudentCount(0);
        }
    }, [selectedCourseId]);

    const courseOptions = courses.map(c => ({
        value: c.id,
        label: c.title,
    }));

    const handleExportStudents = (format: 'json' | 'csv') => {
        if (!selectedCourseId) {
            setExportStatus('Veuillez sélectionner un cours');
            setTimeout(() => setExportStatus(null), 3000);
            return;
        }

        const students = studentsStorage.getPendingByCourseId(selectedCourseId);
        const course = courses.find(c => c.id === selectedCourseId);
        const courseName = course?.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || 'cours';

        if (format === 'json') {
            exportToJSON(students, `eleves_${courseName}`);
        } else {
            exportToCSV(students as unknown as Record<string, unknown>[], `eleves_${courseName}`);
        }
    };

    const handleExportStudentsPDF = () => {
        if (!selectedCourseId) {
            setExportStatus('Veuillez sélectionner un cours');
            setTimeout(() => setExportStatus(null), 3000);
            return;
        }

        try {
            const students = studentsStorage.getPendingByCourseId(selectedCourseId);
            const course = courses.find(c => c.id === selectedCourseId);
            const courseName = course?.title || 'Cours';
            const columns = ['name', 'email', 'phone', 'registrationDate', 'status'];
            exportToPDF(students as any, columns, `Liste des élèves - ${courseName}`, `eleves_${courseName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`);
            setExportStatus('Export PDF réussi !');
        } catch (error) {
            console.error(error);
            setExportStatus('Erreur lors de l\'export PDF');
        }
        setTimeout(() => setExportStatus(null), 3000);
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
                    <CheckCircleIcon size={16} /> {exportStatus}
                </div>
            )}

            {/* Export sections */}
            <div className={styles.grid}>
                {/* Courses export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CoursesIcon className="inline-icon mr-2" size={24} /> Export des cours
                        </CardTitle>
                        <CardDescription>
                            Téléchargez la liste complète des cours
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportCourses('json')}>
                                <JSONIcon size={16} /> JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportCourses('csv')}>
                                <CSVIcon size={16} /> CSV
                            </Button>
                            <Button variant="outline" onClick={() => handleExportPDF('courses')}>
                                <PDFIcon size={16} /> PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Categories export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CategoriesIcon className="inline-icon mr-2" size={24} /> Export des catégories
                        </CardTitle>
                        <CardDescription>
                            Téléchargez la structure des catégories
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportCategories('json')}>
                                <JSONIcon size={16} /> JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportCategories('csv')}>
                                <CSVIcon size={16} /> CSV
                            </Button>
                            <Button variant="outline" onClick={() => handleExportPDF('categories')}>
                                <PDFIcon size={16} /> PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HistoryIcon className="inline-icon mr-2" size={24} /> Export de l'activité
                        </CardTitle>
                        <CardDescription>
                            Téléchargez l'historique des modifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.exportButtons}>
                            <Button variant="outline" onClick={() => handleExportActivity('json')}>
                                <JSONIcon size={16} /> JSON
                            </Button>
                            <Button variant="outline" onClick={() => handleExportActivity('csv')}>
                                <CSVIcon size={16} /> CSV
                            </Button>
                            <Button variant="outline" onClick={() => handleExportPDF('activity')}>
                                <PDFIcon size={16} /> PDF
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Students export */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <StudentsIcon className="inline-icon mr-2" size={24} /> Export des élèves
                        </CardTitle>
                        <CardDescription>
                            Exportez la liste des élèves souhaitant s'inscrire à un cours
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.studentExport}>
                            <Select
                                options={[{ value: '', label: 'Sélectionnez un cours...' }, ...courseOptions]}
                                value={selectedCourseId}
                                onChange={(value) => setSelectedCourseId(value)}
                                fullWidth
                            />
                            {selectedCourseId && (
                                <p className={styles.studentCount}>
                                    <strong>{studentCount}</strong> élève(s) en attente d'inscription
                                </p>
                            )}
                            <div className={styles.exportButtons}>
                                <Button
                                    variant="outline"
                                    onClick={() => handleExportStudents('json')}
                                    disabled={!selectedCourseId || studentCount === 0}
                                >
                                    <JSONIcon size={16} /> JSON
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleExportStudents('csv')}
                                    disabled={!selectedCourseId || studentCount === 0}
                                >
                                    <CSVIcon size={16} /> CSV
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleExportStudentsPDF}
                                    disabled={!selectedCourseId || studentCount === 0}
                                >
                                    <PDFIcon size={16} /> PDF
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Full backup */}
                <Card variant="elevated" hoverable>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArchiveIcon className="inline-icon mr-2" size={24} /> Sauvegarde complète
                        </CardTitle>
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
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircleIcon className="inline-icon mr-2" size={24} /> Gestion des données
                    </CardTitle>
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
                    <CardTitle className="flex items-center gap-2">
                        <ChartBarIcon className="inline-icon mr-2" size={24} /> Informations de stockage
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={styles.storageInfo}>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Cours</span>
                            <span className={styles.storageValue}>{courseCount}</span>
                        </div>
                        <div className={styles.storageItem}>
                            <span className={styles.storageLabel}>Catégories</span>
                            <span className={styles.storageValue}>{categoryCount}</span>
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
