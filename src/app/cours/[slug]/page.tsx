/* ============================================
   ENSPY COURSES PORTAL - Course Detail Page
   ============================================ */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';
import { Course } from '@/types';
import { coursApi } from '@/lib/api';
import { getDurationLabel } from '@/lib/utils';

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

const CheckIconFUN = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch course data from API
  const response = await coursApi.getAll();
  const backendCourse = response.success ? response.data.find(c => c.slug === slug) : null;

  if (!backendCourse) notFound();

  // Find principal image
  const principalImage = backendCourse.medias?.find(m => m.estPrincipal && m.type.startsWith('IMG'))
    || backendCourse.medias?.find(m => m.type.startsWith('IMG'));

  const course = {
    id: String(backendCourse.id),
    title: backendCourse.titre,
    synopsis: backendCourse.synopsisCourt || '',
    description: backendCourse.descriptionComplete || '',
    imageUrl: principalImage ? principalImage.urlPublique : '/images/course-placeholder.jpg',
    duration: backendCourse.dureeTotaleMinutes,
    objectives: backendCourse.objectifsPedagogiques?.split('\n').filter(Boolean) || [],
    prerequisites: backendCourse.prerequis || 'Aucun prérequis',
    format: backendCourse.format || 'Chaque semaine une nouvelle thématique vous sera proposée.',
    level: backendCourse.niveau,
    language: backendCourse.langue === 'EN' ? 'Anglais' : 'Français',
    category: backendCourse.categorie?.nom || 'Général',
    institution: backendCourse.instructeur?.organisation || 'ENSPY',
    instructor: {
      name: backendCourse.instructeur?.nomComplet || '',
      title: backendCourse.instructeur?.titreProfessionnel || '',
      bio: backendCourse.instructeur?.biographieComplete || backendCourse.instructeur?.biographieCourte || ''
    }
  };

  return (
    <div className={styles['course-page']}>
      {/* Blue FUN Hero */}
      <header className={styles['course-hero']}>
        <div className={styles['course-hero-content']}>
          <nav className={styles['course-breadcrumb']}>
            <Link href="/" className={styles['course-breadcrumb-link']}>Accueil</Link>
            <span className={styles['breadcrumb-separator']}> › </span>
            <Link href="/cours" className={styles['course-breadcrumb-link']}>Cours</Link>
            <span className={styles['breadcrumb-separator']}> › </span>
            <span>{course.title}</span>
          </nav>

          <div className={styles['course-hero-grid']}>
            <div className={styles['course-hero-main']}>
              <div className={styles['course-badges']}>
                <span className={styles['course-badge']}>{course.category}</span>
              </div>

              <h1 className={styles['course-title']}>{course.title}</h1>
              <span className={styles['course-ref']}>Réf. {course.id.padStart(6, '0')}</span>

              <p className={styles['course-synopsis']}>{course.synopsis}</p>

              <div className={styles['course-meta']}>
                <div className={styles['course-meta-item']}>
                  <span className={styles['course-meta-icon']}>⏳</span>
                  <span>Durée : {course.duration > 60 ? `${Math.ceil(course.duration / 60)} heures` : `${course.duration} minutes`}</span>
                </div>
                <div className={styles['course-meta-item']}>
                  <span className={styles['course-meta-icon']}>🌐</span>
                  <span>Langue : {course.language}</span>
                </div>
                <div className={styles['course-meta-item']}>
                  <span className={styles['course-meta-icon']}>📊</span>
                  <span>Niveau : {course.level || 'Non spécifié'}</span>
                </div>
              </div>
            </div>

            <div className={styles['course-hero-image-desktop']}>
              <div className={styles['sidebar-image-box']} style={{ padding: '20px', background: 'white' }}>
                <img
                  src="/images/logo-enspy.png"
                  alt="Logo Institution"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className={styles['wave-divider']}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
          </svg>
        </div>
      </header>

      {/* Main Body */}
      <div className={styles['course-content']}>
        <div className={styles['course-sections']}>

          <section>
            <h2 className={styles['section-title']}>Ce que vous allez apprendre</h2>
            <p className={styles['section-subtitle']}>À la fin de ce cours, vous saurez :</p>
            <ul className={styles['objectives-list']}>
              {course.objectives.map((obj, i) => (
                <li key={i} className={styles['objective-item']}>
                  <span className={styles['objective-icon']}><CheckIconFUN /></span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles['section-title']}>Description</h2>
            <div className={styles['description-text']}>
              {course.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className={styles['section-title']}>Format</h2>
            <p className={styles['description-text']}>{course.format}</p>
          </section>

          <section>
            <h2 className={styles['section-title']}>Prérequis</h2>
            <p className={styles['description-text']}>{course.prerequisites}</p>
          </section>

          {/* Instructor section integrated in flow */}
          <section className={styles['instructor-section']}>
            <h2 className={styles['section-title']}>L'instructeur</h2>
            <div className={styles['instructor-card']}>
              <div className={styles['instructor-avatar']}>
                <div style={{ width: '100%', height: '100%', background: '#004a99', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
                  {course.instructor.name.charAt(0)}
                </div>
              </div>
              <div className={styles['instructor-info']}>
                <h3 className={styles['instructor-name']}>{course.instructor.name}</h3>
                <p className={styles['instructor-title']}>{course.instructor.title}</p>
                <p className={styles['instructor-bio']}>{course.instructor.bio}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <aside className={styles['course-sidebar']}>
          <div className={styles['sidebar-image-box']}>
            <img src={course.imageUrl} alt={course.title} />
            <div className={styles['play-button-overlay']}>
              <div className={styles['play-icon-bg']}>
                <PlayIcon />
              </div>
            </div>
          </div>

          <div className={styles['sidebar-info-group']}>
            <div>
              <span className={styles['info-item-label']}>Inscription</span>
              <span className={styles['info-item-value']}>Ouvert dès maintenant</span>
            </div>

            <div>
              <span className={styles['info-item-label']}>Cours</span>
              <span className={styles['info-item-value']}>Accès permanent</span>
            </div>

            <div className={styles['registration-card']}>
              <span className={styles['info-item-label']}>Prix de l'inscription</span>
              <span className={styles['info-item-value']}>Accès gratuit</span>

              <Button href={SITE_CONFIG.institution.website} external className={styles['enroll-button']}>
                Je me connecte pour m'inscrire
              </Button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

