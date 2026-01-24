/* ============================================
   ENSPY COURSES PORTAL - Custom Hooks
   ============================================ */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Course, CourseFilters, PaginatedResponse, Thematic, Institution } from '@/types';
import { coursesApi, thematicsApi, institutionsApi } from './api';
import { PAGINATION } from './constants';
import { debounce } from './utils';

// ============ useCourses Hook ============

interface UseCoursesOptions {
    initialFilters?: CourseFilters;
    initialPage?: number;
    limit?: number;
}

interface UseCoursesReturn {
    courses: Course[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    filters: CourseFilters;
    setFilters: (filters: CourseFilters) => void;
    setPage: (page: number) => void;
    refresh: () => void;
}

export function useCourses(options: UseCoursesOptions = {}): UseCoursesReturn {
    const {
        initialFilters = {},
        initialPage = 1,
        limit = PAGINATION.defaultLimit,
    } = options;

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(initialPage);
    const [filters, setFilters] = useState<CourseFilters>(initialFilters);

    const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);

        const response = await coursesApi.getAll(filters, page, limit);

        if (response.success) {
            setCourses(response.data.data);
            setTotal(response.data.total);
        } else {
            setError(response.error || 'Une erreur est survenue');
            setCourses([]);
        }

        setLoading(false);
    }, [filters, page, limit]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const refresh = useCallback(() => {
        fetchCourses();
    }, [fetchCourses]);

    return {
        courses,
        loading,
        error,
        total,
        page,
        totalPages,
        hasNext,
        hasPrevious,
        filters,
        setFilters,
        setPage,
        refresh,
    };
}

// ============ useCourse Hook ============

interface UseCourseReturn {
    course: Course | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
}

export function useCourse(slug: string): UseCourseReturn {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourse = useCallback(async () => {
        if (!slug) return;

        setLoading(true);
        setError(null);

        const response = await coursesApi.getBySlug(slug);

        if (response.success) {
            setCourse(response.data);
        } else {
            setError(response.error || 'Cours non trouvé');
            setCourse(null);
        }

        setLoading(false);
    }, [slug]);

    useEffect(() => {
        fetchCourse();
    }, [fetchCourse]);

    return {
        course,
        loading,
        error,
        refresh: fetchCourse,
    };
}

// ============ useThematics Hook ============

interface UseThematicsReturn {
    thematics: Thematic[];
    loading: boolean;
    error: string | null;
}

export function useThematics(): UseThematicsReturn {
    const [thematics, setThematics] = useState<Thematic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchThematics() {
            setLoading(true);
            setError(null);

            const response = await thematicsApi.getAll();

            if (response.success) {
                setThematics(response.data);
            } else {
                setError(response.error || 'Une erreur est survenue');
            }

            setLoading(false);
        }

        fetchThematics();
    }, []);

    return { thematics, loading, error };
}

// ============ useInstitutions Hook ============

interface UseInstitutionsReturn {
    institutions: Institution[];
    loading: boolean;
    error: string | null;
}

export function useInstitutions(): UseInstitutionsReturn {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchInstitutions() {
            setLoading(true);
            setError(null);

            const response = await institutionsApi.getAll();

            if (response.success) {
                setInstitutions(response.data);
            } else {
                setError(response.error || 'Une erreur est survenue');
            }

            setLoading(false);
        }

        fetchInstitutions();
    }, []);

    return { institutions, loading, error };
}

// ============ useSearch Hook ============

interface UseSearchOptions {
    debounceMs?: number;
}

interface UseSearchReturn {
    query: string;
    setQuery: (query: string) => void;
    results: Course[];
    loading: boolean;
    error: string | null;
    total: number;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
    const { debounceMs = 300 } = options;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    const debouncedSearch = useMemo(
        () =>
            debounce(async (searchQuery: string) => {
                if (!searchQuery.trim()) {
                    setResults([]);
                    setTotal(0);
                    return;
                }

                setLoading(true);
                setError(null);

                const response = await coursesApi.search(searchQuery);

                if (response.success) {
                    setResults(response.data.data);
                    setTotal(response.data.total);
                } else {
                    setError(response.error || 'Une erreur est survenue');
                }

                setLoading(false);
            }, debounceMs),
        [debounceMs]
    );

    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    return {
        query,
        setQuery,
        results,
        loading,
        error,
        total,
    };
}

// ============ useLocalStorage Hook ============

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
}

// ============ useMediaQuery Hook ============

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

// ============ useIsMobile Hook ============

export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 768px)');
}

// ============ useScrollPosition Hook ============

export function useScrollPosition(): { x: number; y: number } {
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                x: window.scrollX,
                y: window.scrollY,
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
}

// ============ useOutsideClick Hook ============

export function useOutsideClick(
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void
): void {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, callback]);
}
