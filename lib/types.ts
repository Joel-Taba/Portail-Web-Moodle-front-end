/**
 * ENSPY Admin Portal - Types TypeScript
 * Définitions des types pour le portail administrateur
 */

// ============================================
// Types Utilisateur et Authentification
// ============================================

export type UserRole = 'admin' | 'editor' | 'contributor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ============================================
// Types Cours
// ============================================

export type CourseLevel = 'beginner' | 'intermediate' | 'expert';
export type CourseFormat = 'video' | 'text' | 'exercises' | 'mixed';
export type CourseLanguage = 'fr' | 'en' | 'other';
export type CourseType = 'certified' | 'non-certified';
export type CourseStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface Instructor {
  name: string;
  photo: string;
  bio: string;
  expertise: string;
}

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory?: string;
  tags: string[];
  level: CourseLevel;
  duration: number; // en heures
  format: CourseFormat;
  language: CourseLanguage;
  type: CourseType;
  status: CourseStatus;
  instructor: Instructor;
  prerequisites?: string;
  targetAudience?: string;
  thumbnailUrl: string;
  teaserVideoUrl?: string;
  redirectUrl: string;
  order: number;
  isFeatured: boolean;
  isTrending: boolean;
  views: number;
  enrollments: number;
  rating: number;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type CourseFormData = Omit<Course, 'id' | 'order' | 'views' | 'enrollments' | 'rating' | 'createdAt' | 'updatedAt' | 'createdBy'>;

// ============================================
// Types Élèves (demandes d'inscription)
// ============================================

export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  courseId: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ============================================
// Types Catégories
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId: string | null;
  order: number;
  icon?: string;
  color?: string;
  courseCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
}

// ============================================
// Types Dashboard et Statistiques
// ============================================

export interface DashboardStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalViews: number;
  totalEnrollments: number;
  averageRating: number;
  coursesThisMonth: number;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  courseCount: number;
  percentage: number;
}

export interface TrendingCourse {
  id: string;
  title: string;
  views: number;
  enrollments: number;
  thumbnailUrl: string;
}

// ============================================
// Types Journal d'activité
// ============================================

export type ActivityAction = 'create' | 'update' | 'delete' | 'archive' | 'publish' | 'unpublish';
export type EntityType = 'course' | 'category' | 'user';

export interface ActivityLog {
  id: string;
  action: ActivityAction;
  entityType: EntityType;
  entityId: string;
  entityTitle: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  timestamp: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  description?: string;
}

// ============================================
// Types Filtres et Pagination
// ============================================

export interface CourseFilters {
  search?: string;
  status?: CourseStatus | 'all';
  category?: string | 'all';
  level?: CourseLevel | 'all';
  type?: CourseType | 'all';
  format?: CourseFormat | 'all';
  language?: CourseLanguage | 'all';
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SortState {
  field: keyof Course;
  direction: 'asc' | 'desc';
}

// ============================================
// Types UI
// ============================================

export type ViewMode = 'table' | 'grid';

export interface SelectOption {
  value: string;
  label: string;
}

export interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// ============================================
// Types Navigation
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavItem[];
}

// ============================================
// Types Export
// ============================================

export interface ExportOptions {
  format: 'csv' | 'json';
  includeArchived: boolean;
  fields?: (keyof Course)[];
}
