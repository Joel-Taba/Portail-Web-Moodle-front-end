/* ============================================
   ENSPY COURSES PORTAL - Types & Interfaces
   ============================================ */

// ============ Course Types ============

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  synopsis: string;
  imageUrl: string;
  videoUrl?: string;
  duration: CourseDuration;
  level: CourseLevel;
  format: CourseFormat;
  language: CourseLanguage;
  type: CourseType;
  availability: CourseAvailability;
  objectives: string[];
  prerequisites: string[];
  targetAudience: string;
  syllabus: CourseSyllabus[];
  instructor: Instructor;
  institution: Institution;
  thematic: Thematic;
  collection?: Collection;
  enrollmentCount: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  isFeatured: boolean;
  isTrending: boolean;
  tags: string[];
}

export interface CourseSyllabus {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
}

export type CourseDuration = '0-2h' | '2-5h' | '5-10h' | '10h+';

export type CourseLevel = 'beginner' | 'intermediate' | 'expert';

export type CourseFormat = 'video' | 'text' | 'exercises' | 'mixed';

export type CourseLanguage = 'fr' | 'en' | 'other';

export type CourseType = 'free' | 'paid' | 'certified';

export type CourseAvailability = 'available' | 'upcoming' | 'archived';

// ============ Instructor Types ============

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  bio: string;
  expertise: string[];
  title: string;
  institution: Institution;
  courses: string[]; // Course IDs
  createdAt: string;
}

// ============ Institution Types ============

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  logoUrl: string;
  description: string;
  website: string;
  location: string;
  coursesCount: number;
}

// ============ Thematic Types ============

export interface Thematic {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  coursesCount: number;
}

// ============ Collection Types ============

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  courses: string[]; // Course IDs
  createdAt: string;
}

// ============ Filter Types ============

export interface CourseFilters {
  search?: string;
  level?: CourseLevel[];
  duration?: CourseDuration[];
  format?: CourseFormat[];
  language?: CourseLanguage[];
  type?: CourseType[];
  availability?: CourseAvailability[];
  thematic?: string[];
  institution?: string[];
  instructor?: string[];
  collection?: string[];
  dateAdded?: DateAddedFilter;
  sortBy?: SortOption;
}

export type DateAddedFilter = '7days' | '30days' | '90days';

export type SortOption = 
  | 'relevance' 
  | 'newest' 
  | 'oldest' 
  | 'popular' 
  | 'rating' 
  | 'title-asc' 
  | 'title-desc';

// ============ Pagination Types ============

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============ API Response Types ============

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code: string;
  details?: Record<string, string[]>;
}

// ============ Newsletter Types ============

export interface NewsletterSubscription {
  email: string;
  thematics?: string[];
  createdAt: string;
}

// ============ Recommendation Types ============

export interface CourseRecommendation {
  course: Course;
  reason: string;
  score: number;
}

// ============ UI Types ============

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
  children?: MenuItem[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

// ============ Form Types ============

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SearchFormData {
  query: string;
  filters?: CourseFilters;
}
