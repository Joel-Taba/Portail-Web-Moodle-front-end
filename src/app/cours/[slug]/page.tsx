/* ============================================
   ENSPY COURSES PORTAL - Course Detail Page
   ============================================ */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';

// Icons
const ChevronRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const BookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const TargetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const ListIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const SearchIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // TODO: Fetch course data from API
    // const course = await coursesApi.getBySlug(slug);

    return {
        title: `Cours: ${slug}`,
        description: `Découvrez ce cours sur le portail ENSPY`,
    };
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // TODO: Fetch course data from API
    // const response = await coursesApi.getBySlug(slug);
    // if (!response.success) notFound();
    // const course = response.data;

    // For now, show empty state message
    const course = null;

    if (!course) {
        return (
            <div className={styles['course-page']}>
                <div className={styles['empty-state']}>
                    <div className={styles['empty-state-icon']}>
                        <SearchIcon />
                    </div>
                    <h1 className={styles['empty-state-title']}>
                        Cours non disponible
                    </h1>
                    <p className={styles['empty-state-text']}>
                        Les données de ce cours seront disponibles une fois le backend connecté.
                        <br />
                        Identifiant du cours : <strong>{slug}</strong>
                    </p>
                    <Button href="/cours" variant="primary">
                        Retour aux cours
                    </Button>
                </div>
            </div>
        );
    }

    // The following code will be used when connected to the backend
    /*
    return (
      <div className={styles['course-page']}>
        <header className={styles['course-hero']}>
          <div className={styles['course-hero-content']}>
            <nav className={styles['course-breadcrumb']}>
              <Link href="/" className={styles['course-breadcrumb-link']}>Accueil</Link>
              <ChevronRightIcon />
              <Link href="/cours" className={styles['course-breadcrumb-link']}>Cours</Link>
              <ChevronRightIcon />
              <span>{course.title}</span>
            </nav>
            
            <div className={styles['course-hero-grid']}>
              <div className={styles['course-hero-text']}>
                <div className={styles['course-badges']}>
                  <span className={`${styles['course-badge']} ${styles['course-badge--level']}`}>
                    {getLevelLabel(course.level)}
                  </span>
                  <span className={`${styles['course-badge']} ${styles['course-badge--type']}`}>
                    {getTypeLabel(course.type)}
                  </span>
                  <span className={`${styles['course-badge']} ${styles['course-badge--format']}`}>
                    {getFormatLabel(course.format)}
                  </span>
                </div>
                
                <h1 className={styles['course-title']}>{course.title}</h1>
                <p className={styles['course-synopsis']}>{course.synopsis}</p>
                
                <div className={styles['course-meta']}>
                  <span className={styles['course-meta-item']}>
                    <ClockIcon className={styles['course-meta-icon']} />
                    {getDurationLabel(course.duration)}
                  </span>
                  <span className={styles['course-meta-item']}>
                    <UsersIcon className={styles['course-meta-icon']} />
                    {formatNumber(course.enrollmentCount)} inscrits
                  </span>
                  <span className={styles['course-meta-item']}>
                    <GlobeIcon className={styles['course-meta-icon']} />
                    {course.language === 'fr' ? 'Français' : 'Anglais'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className={styles['course-content']}>
          <div className={styles['course-sections']}>
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>
                <TargetIcon className={styles['section-title-icon']} />
                Objectifs d'apprentissage
              </h2>
              <ul className={styles['objectives-list']}>
                {course.objectives.map((objective, index) => (
                  <li key={index} className={styles['objective-item']}>
                    <CheckIcon className={styles['objective-icon']} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>
                <ListIcon className={styles['section-title-icon']} />
                Programme du cours
              </h2>
              <div className={styles['syllabus-list']}>
                {course.syllabus.map((item, index) => (
                  <div key={item.id} className={styles['syllabus-item']}>
                    <span className={styles['syllabus-number']}>{index + 1}</span>
                    <div className={styles['syllabus-content']}>
                      <div className={styles['syllabus-title']}>{item.title}</div>
                      <p className={styles['syllabus-description']}>{item.description}</p>
                      <span className={styles['syllabus-duration']}>{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section className={styles['section-card']}>
              <h2 className={styles['section-title']}>
                <UserIcon className={styles['section-title-icon']} />
                Instructeur
              </h2>
              <div className={styles['instructor-card']}>
                <div className={styles['instructor-avatar']}>
                  {course.instructor.photoUrl ? (
                    <img src={course.instructor.photoUrl} alt={course.instructor.firstName} />
                  ) : (
                    course.instructor.firstName.charAt(0) + course.instructor.lastName.charAt(0)
                  )}
                </div>
                <div className={styles['instructor-info']}>
                  <div className={styles['instructor-name']}>
                    {course.instructor.firstName} {course.instructor.lastName}
                  </div>
                  <div className={styles['instructor-title']}>{course.instructor.title}</div>
                  <p className={styles['instructor-bio']}>{course.instructor.bio}</p>
                  <div className={styles['instructor-expertise']}>
                    {course.instructor.expertise.map((exp, index) => (
                      <span key={index} className={styles['expertise-tag']}>{exp}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
    */
}
