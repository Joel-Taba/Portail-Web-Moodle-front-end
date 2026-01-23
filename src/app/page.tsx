/* ============================================
   ENSPY COURSES PORTAL - Home Page
   ============================================ */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { Button } from '@/components/ui';
import { DEFAULT_THEMATICS, SITE_CONFIG } from '@/lib/constants';
import { useLocale } from '@/contexts/LocaleContext';
import api, { BackendCours } from '@/lib/api';
import { CourseCard } from '@/components/courses';
import { Course } from '@/types';

// Icons
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const BookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AwardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const thematicIcons: Record<string, React.ReactNode> = {
  'computer': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  'building': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg>,
  'bolt': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  'settings': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  'factory': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg>,
  'calculate': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="16" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="8" y2="14" /><line x1="12" y1="14" x2="12" y2="14" /><line x1="16" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /></svg>,
  'science': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31" /><path d="M14 9.3V2" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>,
  'biotech': <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5M9 22c1.35-1.5 2.092-3 2.5-4.5" /><path d="M2 15c1.5 1.35 3 2.092 4.5 2.5M22 9c-1.5-1.35-3-2.092-4.5-2.5" /><path d="M2 9c1.5-1.35 3-2.092 4.5-2.5M22 15c-1.5 1.35-3 2.092-4.5 2.5" /><path d="M9 2c-1.35 1.5-2.092 3-2.5 4.5M15 22c1.35-1.5 2.092-3 2.5-4.5" /><circle cx="12" cy="12" r="3" /></svg>,
};

// Transform function
function transformCourse(backendCourse: BackendCours): Course {
  const mapLevel = (niveau?: string): 'beginner' | 'intermediate' | 'expert' => {
    if (!niveau) return 'beginner';
    const n = niveau.toUpperCase();
    if (n === 'DEBUTANT' || n === 'DÉBUTANT' || n === 'BEGINNER') return 'beginner';
    if (n === 'INTERMEDIAIRE' || n === 'INTERMÉDIAIRE' || n === 'INTERMEDIATE') return 'intermediate';
    if (n === 'EXPERT' || n === 'AVANCE' || n === 'AVANCÉ' || n === 'ADVANCED') return 'expert';
    return 'beginner';
  };

  return {
    id: String(backendCourse.id),
    title: backendCourse.titre,
    slug: backendCourse.slug,
    description: backendCourse.synopsisCourt || '',
    synopsis: backendCourse.synopsisCourt || '',
    imageUrl: '/images/course-placeholder.jpg',
    duration: backendCourse.dureeTotaleMinutes <= 120 ? '0-2h' :
      backendCourse.dureeTotaleMinutes <= 300 ? '2-5h' :
        backendCourse.dureeTotaleMinutes <= 600 ? '5-10h' : '10h+',
    level: mapLevel(backendCourse.niveau),
    format: 'mixed',
    language: backendCourse.langue === 'EN' ? 'en' : 'fr',
    type: backendCourse.estCertifiant ? 'certified' : 'free',
    availability: backendCourse.statut === 'PUBLIE' ? 'available' : 'upcoming',
    objectives: [],
    prerequisites: [],
    targetAudience: '',
    syllabus: [],
    instructor: {
      id: String(backendCourse.instructeur?.id || '0'),
      firstName: backendCourse.instructeur?.nomComplet || '',
      lastName: '',
      email: '',
      photoUrl: '/images/instructor-placeholder.jpg',
      bio: backendCourse.instructeur?.biographieCourte || '',
      expertise: [],
      title: backendCourse.instructeur?.titreProfessionnel || '',
      institution: {
        id: '1',
        name: 'ENSPY',
        shortName: 'ENSPY',
        logoUrl: '/images/logo-enspy.png',
        description: '',
        website: '',
        location: '',
        coursesCount: 0,
      },
      courses: [],
      createdAt: '',
    },
    institution: {
      id: '1',
      name: 'ENSPY',
      shortName: 'ENSPY',
      logoUrl: '/images/logo-enspy.png',
      description: '',
      website: '',
      location: '',
      coursesCount: 0,
    },
    thematic: {
      id: String(backendCourse.categorie?.id || '0'),
      name: backendCourse.categorie?.nom || '',
      slug: backendCourse.categorie?.nom || '',
      description: '',
      iconName: 'book',
      color: '#E65100',
      coursesCount: 0,
    },
    enrollmentCount: 0,
    rating: 4.5,
    reviewsCount: 0,
    createdAt: backendCourse.createdAt,
    updatedAt: backendCourse.updatedAt,
    isFeatured: false,
    isTrending: backendCourse.nombreVues > 1000,
    tags: [],
  };
}

export default function HomePage() {
  const { t } = useLocale();
  const [stats, setStats] = useState({ courses: 0, instructors: 0, students: 0 });
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, instructorsRes, studentsRes] = await Promise.all([
          api.cours.getAll(),
          api.instructeurs.getAll(),
          api.etudiants.getAll()
        ]);

        if (coursesRes.success) {
          setStats({
            courses: coursesRes.data.length,
            instructors: instructorsRes.success ? instructorsRes.data.length : 0,
            students: studentsRes.success ? studentsRes.data.length : 0
          });

          // Pick trending courses (most viewed)
          const trending = [...coursesRes.data]
            .sort((a, b) => b.nombreVues - a.nombreVues)
            .slice(0, 6)
            .map(transformCourse);

          setTrendingCourses(trending);
        }
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <div className={styles['hero-text']}>
            <h1 className={styles['hero-title']}>
              {t('home.title')}{' '}
              <span className={styles['hero-title-highlight']}>{t('home.titleHighlight')}</span>{' '}
              {t('home.titleEnd')}
            </h1>
            <p className={styles['hero-description']}>
              {t('home.description')}
            </p>
            <div className={styles['hero-actions']}>
              <Button href="/cours" variant="primary" size="lg">
                {t('home.exploreCourses')}
              </Button>
              <Button href="/a-propos" variant="outline-dark" size="lg" icon={<PlayIcon />}>
                {t('home.learnMore')}
              </Button>
            </div>
            <div className={styles['hero-stats']}>
              <div className={styles['hero-stat']}>
                <div className={styles['hero-stat-value']}>{stats.courses || '90+'}</div>
                <div className={styles['hero-stat-label']}>{t('home.stats.courses')}</div>
              </div>
              <div className={styles['hero-stat']}>
                <div className={styles['hero-stat-value']}>{stats.instructors || '8'}</div>
                <div className={styles['hero-stat-label']}>{t('home.stats.instructors')}</div>
              </div>
              <div className={styles['hero-stat']}>
                <div className={styles['hero-stat-value']}>{stats.students || '15+'}</div>
                <div className={styles['hero-stat-label']}>{t('home.stats.students')}</div>
              </div>
            </div>
          </div>
          <div className={styles['hero-image']}>
            <div className={styles['hero-image-container']}>
              <img
                src="/images/hero-books.png"
                alt="Livres d'ingénierie et tablette"
                className={styles['hero-image-photo']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Thematics Section */}
      <section className={styles.thematics}>
        <div className={styles['thematics-content']}>
          <div className={styles['section-header']}>
            <span className={styles['section-subtitle']}>{t('nav.thematics')}</span>
            <h2 className={styles['section-title']}>{t('home.thematics.title')}</h2>
            <p className={styles['section-description']}>
              {t('home.thematics.subtitle')}
            </p>
          </div>
          <div className={styles['thematics-grid']}>
            {DEFAULT_THEMATICS.map((thematic) => (
              <Link
                key={thematic.id}
                href={`/thematiques/${thematic.slug}`}
                className={styles['thematic-card']}
              >
                <div
                  className={styles['thematic-icon']}
                  style={{ backgroundColor: thematic.color }}
                >
                  {thematicIcons[thematic.iconName] || <BookIcon />}
                </div>
                <h3 className={styles['thematic-name']}>{thematic.name}</h3>
                <p className={styles['thematic-count']}>10+ {t('home.stats.courses').toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className={styles.trending}>
        <div className={styles['trending-content']}>
          <div className={styles['trending-header']}>
            <div>
              <span className={styles['section-subtitle']}>{t('home.trending.title')}</span>
              <h2 className={styles['section-title']}>{t('home.trending.subtitle')}</h2>
            </div>
            <Button href="/cours?sort=popular" variant="outline">
              {t('home.trending.viewAll')}
            </Button>
          </div>
          <div className={styles['trending-courses']}>
            {loading ? (
              <div style={{ padding: 'var(--spacing-8)', color: 'var(--color-gray-500)' }}>
                {t('common.loading')}
              </div>
            ) : trendingCourses.length > 0 ? (
              trendingCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div style={{ padding: 'var(--spacing-8)', color: 'var(--color-gray-500)' }}>
                Aucun cours disponible
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles['features-content']}>
          <div className={styles['section-header']}>
            <span className={styles['section-subtitle']} style={{ color: 'var(--color-primary-300)' }}>
              {t('home.features.title')}
            </span>
            <h2 className={styles['section-title']} style={{ color: 'var(--color-white)' }}>
              {t('home.features.title')}
            </h2>
          </div>
          <div className={styles['features-grid']}>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <BookIcon />
              </div>
              <h3 className={styles['feature-title']}>{t('home.features.quality.title')}</h3>
              <p className={styles['feature-description']}>
                {t('home.features.quality.description')}
              </p>
            </div>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <UsersIcon />
              </div>
              <h3 className={styles['feature-title']}>{t('home.features.flexible.title')}</h3>
              <p className={styles['feature-description']}>
                {t('home.features.flexible.description')}
              </p>
            </div>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <AwardIcon />
              </div>
              <h3 className={styles['feature-title']}>{t('home.features.certified.title')}</h3>
              <p className={styles['feature-description']}>
                {t('home.features.certified.description')}
              </p>
            </div>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <GlobeIcon />
              </div>
              <h3 className={styles['feature-title']}>{t('home.features.flexible.title')}</h3>
              <p className={styles['feature-description']}>
                {t('home.features.flexible.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles['cta-content']}>
          <h2 className={styles['cta-title']}>
            {t('home.cta.title')}
          </h2>
          <p className={styles['cta-description']}>
            {t('home.cta.description')}
          </p>
          <div className={styles['cta-actions']}>
            <Button href="/cours" variant="secondary" size="lg">
              {t('home.cta.button')}
            </Button>
            <Button
              href={SITE_CONFIG.institution.website}
              variant="outline"
              size="lg"
              external
            >
              {t('home.learnMore')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
