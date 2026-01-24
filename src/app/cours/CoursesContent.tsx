/* ============================================
   ENSPY COURSES PORTAL - Courses Content Component
   Connected to Backend API
   ============================================ */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { Button } from '@/components/ui';
import { CourseFilters, CourseGrid } from '@/components/courses';
import { CourseFilters as CourseFiltersType, Course, SortOption } from '@/types';
import { coursApi, BackendCours } from '@/lib/api';

// Icons
const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

// Transform backend course to frontend format
function transformCourseFromBackend(backendCourse: BackendCours): Course {
    // Map backend niveau to frontend level
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
        slug: backendCourse.slug || backendCourse.titre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: backendCourse.synopsisCourt || '',
        synopsis: backendCourse.synopsisCourt || '',
        imageUrl: `https://picsum.photos/seed/${backendCourse.id}/400/250`,
        videoUrl: backendCourse.medias?.find(m => m.type === 'VIDEO')?.url,
        duration: backendCourse.dureeTotaleMinutes <= 120 ? '0-2h' :
            backendCourse.dureeTotaleMinutes <= 300 ? '2-5h' :
                backendCourse.dureeTotaleMinutes <= 600 ? '5-10h' : '10h+',
        level: mapLevel(backendCourse.niveau),
        format: 'mixed',
        language: backendCourse.langue === 'EN' ? 'en' : 'fr',
        type: backendCourse.estCertifiant ? 'certified' : 'free',
        availability: backendCourse.statut === 'PUBLIE' ? 'available' :
            backendCourse.statut === 'ARCHIVE' ? 'archived' : 'upcoming',
        objectives: backendCourse.objectifsPedagogiques?.split('\n').filter(Boolean) || [],
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
            expertise: [backendCourse.instructeur?.titreProfessionnel || ''],
            title: backendCourse.instructeur?.titreProfessionnel || '',
            institution: {
                id: '1',
                name: backendCourse.instructeur?.organisation || 'ENSPY',
                shortName: 'ENSPY',
                logoUrl: '/images/logo-enspy.png',
                description: '',
                website: 'https://www.enspy-uy1.org',
                location: 'Yaoundé, Cameroun',
                coursesCount: 1,
            },
            courses: [],
            createdAt: backendCourse.instructeur?.createdAt || '',
        },
        institution: {
            id: '1',
            name: 'École Nationale Supérieure Polytechnique de Yaoundé',
            shortName: 'ENSPY',
            logoUrl: '/images/logo-enspy.png',
            description: '',
            website: 'https://www.enspy-uy1.org',
            location: 'Yaoundé, Cameroun',
            coursesCount: 1,
        },
        thematic: {
            id: String(backendCourse.categorie?.id || '1'),
            name: backendCourse.categorie?.nom || 'Informatique',
            slug: backendCourse.categorie?.nom?.toLowerCase().replace(/\s+/g, '-') || 'informatique',
            description: backendCourse.categorie?.description || '',
            iconName: 'computer',
            color: '#E65100',
            coursesCount: 1,
        },
        enrollmentCount: 0,
        rating: 4.5,
        reviewsCount: 0,
        createdAt: backendCourse.createdAt,
        updatedAt: backendCourse.updatedAt || backendCourse.createdAt,
        isFeatured: false,
        isTrending: backendCourse.nombreVues > 100,
        tags: [backendCourse.categorie?.nom || 'Développement'],
    };
}

export default function CoursesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [filters, setFilters] = useState<CourseFiltersType>({});
    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get('sort') as SortOption) || 'relevance'
    );

    const limit = 21;
    const totalPages = Math.ceil(total / limit);

    // Fetch courses from backend API
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await coursApi.getAll();

            if (response.success && response.data) {
                // Transform backend courses to frontend format
                const transformedCourses = response.data.map(transformCourseFromBackend);

                // Apply all filters
                let filteredCourses = transformedCourses;

                // Search filter
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filteredCourses = filteredCourses.filter(course =>
                        course.title.toLowerCase().includes(query) ||
                        course.description.toLowerCase().includes(query) ||
                        course.thematic.name.toLowerCase().includes(query)
                    );
                }

                // Level filter
                if (filters.level && filters.level.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.level!.includes(course.level)
                    );
                }

                // Duration filter
                if (filters.duration && filters.duration.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.duration!.includes(course.duration)
                    );
                }

                // Format filter
                if (filters.format && filters.format.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.format!.includes(course.format)
                    );
                }

                // Type filter
                if (filters.type && filters.type.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.type!.includes(course.type)
                    );
                }

                // Language filter
                if (filters.language && filters.language.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.language!.includes(course.language)
                    );
                }

                // Availability filter
                if (filters.availability && filters.availability.length > 0) {
                    filteredCourses = filteredCourses.filter(course =>
                        filters.availability!.includes(course.availability)
                    );
                }

                // Apply sorting
                switch (sortBy) {
                    case 'newest':
                        filteredCourses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                        break;
                    case 'oldest':
                        filteredCourses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                        break;
                    case 'title-asc':
                        filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                    case 'title-desc':
                        filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
                        break;
                    case 'rating':
                        filteredCourses.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'popular':
                        filteredCourses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
                        break;
                    default:
                        // 'relevance' - keep original order
                        break;
                }

                setCourses(filteredCourses);
                setTotal(filteredCourses.length);
            } else {
                setError(response.error || 'Impossible de charger les cours');
                setCourses([]);
                setTotal(0);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Erreur de connexion au serveur');
            setCourses([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, [filters, searchQuery, sortBy]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        // Update URL with search query
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        router.push(`/cours?${params.toString()}`);
    };

    // Handle filters change
    const handleFiltersChange = (newFilters: CourseFiltersType) => {
        setFilters(newFilters);
        setPage(1);
    };

    // Handle sort change
    const handleSortChange = (newSort: SortOption) => {
        setSortBy(newSort);
        setPage(1);
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        router.push(`/cours?${params.toString()}`);
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle retry
    const handleRetry = () => {
        setFilters({});
        setSearchQuery('');
        setPage(1);
        router.push('/cours');
        fetchCourses();
    };

    return (
        <div className={styles['courses-page']}>
            {/* Page Header */}
            <header className={styles['page-header']}>
                <div className={styles['page-header-content']}>
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
                        <Link href="/" className={styles['breadcrumb-link']}>
                            Accueil
                        </Link>
                        <span className={styles['breadcrumb-separator']}>
                            <ChevronRightIcon />
                        </span>
                        <span className={styles['breadcrumb-current']}>
                            Cours
                        </span>
                    </nav>

                    <h1 className={styles['page-title']}>
                        Trouver un cours en ligne
                    </h1>
                    <p className={styles['page-description']}>
                        Explorez notre catalogue de formations et trouvez le cours qui
                        correspond à vos objectifs d&apos;apprentissage.
                    </p>

                    {/* Search Bar */}
                    <form className={styles['search-bar']} onSubmit={handleSearch}>
                        <div className={styles['search-input-wrapper']}>
                            <span className={styles['search-icon']}>
                                <SearchIcon />
                            </span>
                            <input
                                type="search"
                                className={styles['search-input']}
                                placeholder="Rechercher un cours, une thématique..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Rechercher un cours"
                            />
                        </div>
                        <Button type="submit" variant="primary" size="lg">
                            Rechercher
                        </Button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <div className={styles['courses-content']}>
                <div className={styles['courses-layout']}>
                    {/* Filters Sidebar */}
                    <CourseFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                    />

                    {/* Courses Grid */}
                    <CourseGrid
                        courses={courses}
                        loading={loading}
                        error={error}
                        total={total}
                        page={page}
                        totalPages={totalPages}
                        sortBy={sortBy}
                        onSortChange={handleSortChange}
                        onPageChange={handlePageChange}
                        onRetry={handleRetry}
                    />
                </div>
            </div>
        </div>
    );
}
