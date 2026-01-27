/**
 * Professional SVG Icons - ENSPY Admin Portal
 * Icônes SVG professionnelles pour remplacer les emojis
 */

import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
    color?: string;
}

// Dashboard & Stats Icons
export const DashboardIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.5" />
    </svg>
);

export const CoursesIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" stroke={color} strokeWidth="1.5" />
        <path d="M9 7L15 12L9 17V7Z" fill={color} />
    </svg>
);

export const CategoriesIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke={color} strokeWidth="1.5" />
        <path d="M7 15L10 12L13 15L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const OrderingIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 6H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 18H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="6" r="2" fill={color} />
        <circle cx="16" cy="12" r="2" fill={color} />
        <circle cx="12" cy="18" r="2" fill={color} />
    </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M12 7V12L15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M12 1V4M12 20V23M23 12H20M4 12H1M20.485 3.515L18.364 5.636M5.636 18.364L3.515 20.485M20.485 20.485L18.364 18.364M5.636 5.636L3.515 3.515" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// Stats Icons
export const UsersIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" />
        <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="7" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M21 21V19C21 17.3431 19.6569 16 18 16H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const ViewsIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
);

export const TrendingIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 17L9 11L13 15L21 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 7H21V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const StarFilledIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
    </svg>
);

export const FireIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9 16 6 14 4C14 8 11 10 9 10C7 10 6 8 6 6C4 8 4 10 4 14C4 18.4183 7.58172 22 12 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22C10.3431 22 9 20.2091 9 18C9 15 12 14 12 12C12 14 15 15 15 18C15 20.2091 13.6569 22 12 22Z" fill={color} />
    </svg>
);

// Action Icons
export const PlusIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.414 2.414C18.7798 2.04816 19.2705 1.84253 19.782 1.84253C20.2935 1.84253 20.7842 2.04816 21.15 2.414C21.5158 2.77984 21.7215 3.27052 21.7215 3.782C21.7215 4.29347 21.5158 4.78416 21.15 5.15L12.5 13.8L9 14.8L10 11.3L18.414 2.414Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 6H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 11V17M14 11V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
);

export const ArchiveIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 8V21H3V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 3H1V8H23V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

// Theme Icons
export const SunIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
        <path d="M12 1V3M12 21V23M23 12H21M3 12H1M20.07 3.93L18.66 5.34M5.34 18.66L3.93 20.07M20.07 20.07L18.66 18.66M5.34 5.34L3.93 3.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Language Icons
export const GlobeIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M2 12H22" stroke={color} strokeWidth="1.5" />
        <path d="M12 2C14.5 4.5 15.5 8 15.5 12C15.5 16 14.5 19.5 12 22C9.5 19.5 8.5 16 8.5 12C8.5 8 9.5 4.5 12 2" stroke={color} strokeWidth="1.5" />
    </svg>
);

// Category Icons (to replace emojis)
export const CodeIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M16 18L22 12L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6L2 12L8 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 21H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 21V7L12 3L19 7V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 21V15H15V21" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 11H10M14 11H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const ChipIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="5" y="5" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
        <path d="M9 2V5M15 2V5M9 19V22M15 19V22M2 9H5M2 15H5M19 9H22M19 15H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const GearIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M19.4 15C19.7 14.4 19.9 13.7 20 13H22V11H20C19.9 10.3 19.7 9.6 19.4 9L21 7.4L19.6 6L18 7.6C17.4 7.3 16.7 7.1 16 7V5H14V7C13.3 7.1 12.6 7.3 12 7.6L10.4 6L9 7.4L10.6 9C10.3 9.6 10.1 10.3 10 11H8V13H10C10.1 13.7 10.3 14.4 10.6 15L9 16.6L10.4 18L12 16.4C12.6 16.7 13.3 16.9 14 17V19H16V17C16.7 16.9 17.4 16.7 18 16.4L19.6 18L21 16.6L19.4 15Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 7C12 5.93913 11.5786 4.92172 10.8284 4.17157C10.0783 3.42143 9.06087 3 8 3H2V18H9C9.79565 18 10.5587 18.3161 11.1213 18.8787C11.6839 19.4413 12 20.2044 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H22V18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 10L12 15L17 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M8 12L11 15L16 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const AlertCircleIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M12 8V12M12 16H12.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M1 4V10H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 20V14H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.49 9C19.7471 6.95333 18.3123 5.22714 16.4386 4.13095C14.5649 3.03476 12.3693 2.63754 10.2345 3.00826C8.09966 3.37897 6.16178 4.49367 4.75871 6.15854C3.35564 7.82342 2.57592 9.93406 2.55 12.12L1 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.51 15C4.25286 17.0467 5.68774 18.7729 7.56144 19.869C9.43514 20.9652 11.6307 21.3625 13.7655 20.9917C15.9003 20.621 17.8382 19.5063 19.2413 17.8415C20.6444 16.1766 21.4241 14.0659 21.45 11.88L23 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const FolderIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// New icons for CourseForm and Settings
export const DocumentIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13H16M8 17H16M8 9H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const TagIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="1.5" fill={color} />
    </svg>
);

export const BookStackIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 19.5C4 18.6716 4.67157 18 5.5 18H20V3H5.5C4.67157 3 4 3.67157 4 4.5V19.5Z" stroke={color} strokeWidth="1.5" />
        <path d="M4 19.5C4 20.3284 4.67157 21 5.5 21H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 7H16M8 11H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const InstructorIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
        <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 5L18 2M18 2L21 5M18 2V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
        <path d="M21 15L16 10L5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.479 3.53087C19.552 2.60383 18.2979 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11C13.5705 10.4259 13.0226 9.95087 12.3934 9.60705C11.7643 9.26323 11.0685 9.05888 10.3533 9.00768C9.63816 8.95647 8.92037 9.05969 8.24861 9.31025C7.57685 9.56082 6.96684 9.953 6.46 10.46L3.46 13.46C2.54921 14.403 2.04524 15.666 2.05663 16.977C2.06802 18.288 2.59387 19.542 3.52091 20.4691C4.44795 21.3961 5.70201 21.922 7.013 21.9334C8.32398 21.9448 9.58699 21.4408 10.53 20.53L12.24 18.82" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M10 8L16 12L10 16V8Z" fill={color} />
    </svg>
);

export const PDFIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13H9C9.26522 13 9.51957 13.1054 9.70711 13.2929C9.89464 13.4804 10 13.7348 10 14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15H7V13Z" stroke={color} strokeWidth="1.2" />
        <path d="M7 13V17" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15C15 15.5304 14.7893 16.0391 14.4142 16.4142C14.0391 16.7893 13.5304 17 13 17H12V13Z" stroke={color} strokeWidth="1.2" />
        <path d="M17 13V17M17 13H19M17 15H18.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CSVIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 15C8 14.4477 8.44772 14 9 14C9.55228 14 10 14.4477 10 15C10 15.5523 9.55228 16 9 16C8.44772 16 8 15.5523 8 15Z" fill={color} />
        <path d="M11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15Z" fill={color} />
        <path d="M14 15C14 14.4477 14.4477 14 15 14C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16C14.4477 16 14 15.5523 14 15Z" fill={color} />
    </svg>
);

export const JSONIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13C8.44772 13 8 13.4477 8 14V15C8 15.5523 7.55228 16 7 16C7.55228 16 8 16.4477 8 17V18C8 18.5523 8.44772 19 9 19" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M15 13C15.5523 13 16 13.4477 16 14V15C16 15.5523 16.4477 16 17 16C16.4477 16 16 16.4477 16 17V18C16 18.5523 15.5523 19 15 19" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

// Icons for Course Preview Page (replacing emojis)
export const DurationIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const LanguageIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
        <path d="M2 12H22" stroke={color} strokeWidth="1.5" />
        <path d="M12 2C14.5 4.5 15.5 8 15.5 12C15.5 16 14.5 19.5 12 22C9.5 19.5 8.5 16 8.5 12C8.5 8 9.5 4.5 12 2" stroke={color} strokeWidth="1.5" />
    </svg>
);

export const FormatIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M8 8L12 12L8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 16H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const LevelIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M18 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="2" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M22 8L18 11V13L22 16V8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const TypeLabelIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="1.5" fill={color} />
    </svg>
);

export const PreviewIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
);

export const StudentsIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const UnarchiveIcon: React.FC<IconProps> = ({ size = 24, className, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 8V21H3V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 3H1V8H23V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17V11M12 11L9 14M12 11L15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CATEGORY_ICONS = [
    { name: 'folder', component: FolderIcon },
    { name: 'code', component: CodeIcon },
    { name: 'building', component: BuildingIcon },
    { name: 'chip', component: ChipIcon },
    { name: 'gear', component: GearIcon },
    { name: 'book', component: BookOpenIcon },
    { name: 'download', component: DownloadIcon },
    { name: 'chart', component: ChartBarIcon },
    { name: 'check', component: CheckCircleIcon },
    { name: 'alert', component: AlertCircleIcon },
    { name: 'globe', component: GlobeIcon },
];

export function getCategoryIcon(name: string, size: number = 24) {
    const icon = CATEGORY_ICONS.find(i => i.name === name);
    const IconComponent = icon ? icon.component : FolderIcon;
    return <IconComponent size={size} />;
}

