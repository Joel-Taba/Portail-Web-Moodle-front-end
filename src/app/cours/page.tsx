/* ============================================
   ENSPY COURSES PORTAL - Courses List Page
   ============================================ */

import { Suspense } from 'react';
import CoursesContent from './CoursesContent';
import { CourseGridSkeleton } from '@/components/ui';
import styles from './page.module.css';

// Loading fallback
function CoursesLoading() {
    return (
        <div className={styles['courses-page']}>
            <header className={styles['page-header']}>
                <div className={styles['page-header-content']}>
                    <h1 className={styles['page-title']}>
                        Trouver un cours en ligne
                    </h1>
                    <p className={styles['page-description']}>
                        Chargement des cours...
                    </p>
                </div>
            </header>
            <div className={styles['courses-content']}>
                <CourseGridSkeleton count={6} />
            </div>
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={<CoursesLoading />}>
            <CoursesContent />
        </Suspense>
    );
}
