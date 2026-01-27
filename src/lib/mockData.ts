/**
 * ENSPY Admin Portal - Données de démonstration
 * Données réalistes pour tester et illustrer les fonctionnalités
 */

import type { User, Course, Category, ActivityLog, DashboardStats } from './types';

// ============================================
// Utilisateurs de test
// ============================================

export interface MockUser extends User {
    password: string;
}

export const mockUsers: MockUser[] = [
    {
        id: 'user_1',
        email: 'admin@enspy.cm',
        password: 'admin123',
        name: 'Dr. Kamga Emmanuel',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Kamga+Emmanuel&background=FF6B00&color=fff&size=128',
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'user_2',
        email: 'prof@enspy.cm',
        password: 'prof123',
        name: 'Pr. Ndongo Marie',
        role: 'editor',
        avatar: 'https://ui-avatars.com/api/?name=Ndongo+Marie&background=1A365D&color=fff&size=128',
        createdAt: '2024-02-20T14:30:00Z',
    },
    {
        id: 'user_3',
        email: 'contrib@enspy.cm',
        password: 'contrib123',
        name: 'Ing. Fouda Alain',
        role: 'contributor',
        avatar: 'https://ui-avatars.com/api/?name=Fouda+Alain&background=22C55E&color=fff&size=128',
        createdAt: '2024-03-10T09:15:00Z',
    },
];

// ============================================
// Catégories
// ============================================

export const mockCategories: Category[] = [
    // Catégories principales
    {
        id: 'cat_info',
        name: 'Informatique',
        slug: 'informatique',
        description: 'Sciences informatiques, programmation et technologies numériques',
        parentId: null,
        order: 0,
        icon: '💻',
        color: '#3B82F6',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_civil',
        name: 'Génie Civil',
        slug: 'genie-civil',
        description: 'Construction, infrastructures et géotechnique',
        parentId: null,
        order: 1,
        icon: '🏗️',
        color: '#F59E0B',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_elec',
        name: 'Génie Électrique',
        slug: 'genie-electrique',
        description: 'Électronique, électrotechnique et automatique',
        parentId: null,
        order: 2,
        icon: '⚡',
        color: '#EAB308',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_meca',
        name: 'Génie Mécanique',
        slug: 'genie-mecanique',
        description: 'Conception mécanique, thermique et matériaux',
        parentId: null,
        order: 3,
        icon: '⚙️',
        color: '#6366F1',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_math',
        name: 'Mathématiques',
        slug: 'mathematiques',
        description: 'Analyse, algèbre, probabilités et statistiques',
        parentId: null,
        order: 4,
        icon: '📐',
        color: '#EC4899',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // Sous-catégories Informatique
    {
        id: 'cat_prog',
        name: 'Programmation',
        slug: 'programmation',
        description: 'Langages de programmation et développement logiciel',
        parentId: 'cat_info',
        order: 0,
        icon: '👨‍💻',
        color: '#3B82F6',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_reseau',
        name: 'Réseaux',
        slug: 'reseaux',
        description: 'Administration réseau et télécommunications',
        parentId: 'cat_info',
        order: 1,
        icon: '🌐',
        color: '#3B82F6',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_ia',
        name: 'Intelligence Artificielle',
        slug: 'intelligence-artificielle',
        description: 'Machine Learning, Deep Learning et IA',
        parentId: 'cat_info',
        order: 2,
        icon: '🤖',
        color: '#3B82F6',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_cyber',
        name: 'Cybersécurité',
        slug: 'cybersecurite',
        description: 'Sécurité informatique et protection des données',
        parentId: 'cat_info',
        order: 3,
        icon: '🔐',
        color: '#3B82F6',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // Sous-catégories Génie Civil
    {
        id: 'cat_struct',
        name: 'Structures',
        slug: 'structures',
        description: 'Calcul des structures et résistance des matériaux',
        parentId: 'cat_civil',
        order: 0,
        icon: '🏛️',
        color: '#F59E0B',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_hydro',
        name: 'Hydraulique',
        slug: 'hydraulique',
        description: 'Mécanique des fluides et ouvrages hydrauliques',
        parentId: 'cat_civil',
        order: 1,
        icon: '💧',
        color: '#F59E0B',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // Sous-catégories Génie Électrique
    {
        id: 'cat_electron',
        name: 'Électronique',
        slug: 'electronique',
        description: 'Circuits, composants et systèmes électroniques',
        parentId: 'cat_elec',
        order: 0,
        icon: '🔌',
        color: '#EAB308',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'cat_auto',
        name: 'Automatique',
        slug: 'automatique',
        description: 'Systèmes de contrôle et régulation',
        parentId: 'cat_elec',
        order: 1,
        icon: '🎛️',
        color: '#EAB308',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

// ============================================
// Cours de démonstration
// ============================================

export const mockCourses: Course[] = [
    {
        id: 'course_1',
        title: 'Introduction à Python pour Ingénieurs',
        shortDescription: 'Maîtrisez les bases de Python et ses applications en ingénierie avec des projets pratiques.',
        longDescription: `Ce cours complet vous initie à la programmation Python avec une approche orientée ingénierie.

**Objectifs pédagogiques :**
- Comprendre les fondamentaux de Python (variables, structures de données, fonctions)
- Maîtriser les bibliothèques scientifiques (NumPy, Matplotlib)
- Appliquer Python à des problèmes d'ingénierie
- Développer des scripts d'automatisation

Le cours combine théorie et pratique avec de nombreux exercices et projets.`,
        category: 'cat_prog',
        subcategory: 'cat_info',
        tags: ['python', 'programmation', 'ingénierie', 'débutant', 'numpy'],
        level: 'beginner',
        duration: 20,
        format: 'mixed',
        language: 'fr',
        type: 'free',
        status: 'published',
        instructor: {
            name: 'Dr. Kamga Emmanuel',
            photo: 'https://ui-avatars.com/api/?name=Kamga+Emmanuel&background=FF6B00&color=fff&size=128',
            bio: 'Professeur en informatique à l\'ENSPY, spécialiste en développement logiciel et intelligence artificielle.',
            expertise: 'Python, Machine Learning, Développement Web',
        },
        prerequisites: 'Aucun prérequis technique. Curiosité et motivation suffisent !',
        targetAudience: 'Étudiants en ingénierie, professionnels souhaitant apprendre la programmation',
        thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
        teaserVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        redirectUrl: 'https://moodle.enspy.cm/course/python-intro',
        order: 0,
        isFeatured: true,
        isTrending: true,
        views: 1250,
        enrollments: 342,
        rating: 4.8,
        createdAt: '2024-06-15T10:00:00Z',
        updatedAt: '2024-12-01T14:30:00Z',
        createdBy: 'user_1',
    },
    {
        id: 'course_2',
        title: 'Résistance des Matériaux Avancée',
        shortDescription: 'Approfondissez vos connaissances en RDM avec des cas d\'études réels de structures.',
        longDescription: `Formation avancée en résistance des matériaux destinée aux ingénieurs en génie civil.

**Contenu du cours :**
- Théorie de la flexion composée
- Flambement et instabilités
- Analyse plastique des structures
- Fatigue et rupture des matériaux
- Applications aux structures métalliques et béton armé

Inclut des études de cas réels et des projets de dimensionnement.`,
        category: 'cat_struct',
        subcategory: 'cat_civil',
        tags: ['rdm', 'structures', 'génie civil', 'béton', 'métal'],
        level: 'expert',
        duration: 40,
        format: 'mixed',
        language: 'fr',
        type: 'certified',
        status: 'published',
        instructor: {
            name: 'Pr. Eboumbou Jacques',
            photo: 'https://ui-avatars.com/api/?name=Eboumbou+Jacques&background=1A365D&color=fff&size=128',
            bio: 'Professeur titulaire en génie civil, expert en calcul des structures béton armé.',
            expertise: 'RDM, Structures, Béton Armé',
        },
        prerequisites: 'Cours de base en résistance des matériaux, Mathématiques niveau Bac+2',
        targetAudience: 'Ingénieurs en génie civil, étudiants de Master',
        thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/rdm-avancee',
        order: 1,
        isFeatured: true,
        isTrending: false,
        views: 890,
        enrollments: 156,
        rating: 4.6,
        createdAt: '2024-05-20T08:00:00Z',
        updatedAt: '2024-11-15T11:00:00Z',
        createdBy: 'user_2',
    },
    {
        id: 'course_3',
        title: 'Machine Learning avec TensorFlow',
        shortDescription: 'Construisez des modèles d\'IA performants avec TensorFlow et Keras.',
        longDescription: `Cours pratique sur le Machine Learning utilisant TensorFlow.

**Programme :**
- Fondamentaux du Machine Learning
- Réseaux de neurones avec Keras
- CNN pour la vision par ordinateur
- RNN et LSTM pour les séries temporelles
- Déploiement de modèles

Projets pratiques avec datasets réels.`,
        category: 'cat_ia',
        subcategory: 'cat_info',
        tags: ['machine learning', 'tensorflow', 'keras', 'IA', 'deep learning'],
        level: 'intermediate',
        duration: 35,
        format: 'video',
        language: 'fr',
        type: 'paid',
        status: 'published',
        instructor: {
            name: 'Dr. Ngo Biyong Sylvie',
            photo: 'https://ui-avatars.com/api/?name=Ngo+Biyong+Sylvie&background=22C55E&color=fff&size=128',
            bio: 'Chercheuse en IA et enseignante à l\'ENSPY, spécialisée en vision par ordinateur.',
            expertise: 'Deep Learning, Computer Vision, NLP',
        },
        prerequisites: 'Python intermédiaire, notions de statistiques',
        targetAudience: 'Développeurs, data scientists, chercheurs',
        thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        teaserVideoUrl: 'https://www.youtube.com/watch?v=example2',
        redirectUrl: 'https://moodle.enspy.cm/course/ml-tensorflow',
        order: 2,
        isFeatured: false,
        isTrending: true,
        views: 2100,
        enrollments: 478,
        rating: 4.9,
        createdAt: '2024-07-01T09:00:00Z',
        updatedAt: '2024-12-10T16:00:00Z',
        createdBy: 'user_1',
    },
    {
        id: 'course_4',
        title: 'Électronique de Puissance',
        shortDescription: 'Maîtrisez les convertisseurs statiques et leurs applications industrielles.',
        longDescription: `Formation complète en électronique de puissance.

**Modules :**
- Composants de puissance (diodes, thyristors, IGBT)
- Convertisseurs DC-DC
- Onduleurs et redresseurs
- Contrôle vectoriel des machines électriques
- Applications aux énergies renouvelables`,
        category: 'cat_electron',
        subcategory: 'cat_elec',
        tags: ['électronique', 'puissance', 'convertisseurs', 'onduleurs'],
        level: 'intermediate',
        duration: 28,
        format: 'mixed',
        language: 'fr',
        type: 'free',
        status: 'published',
        instructor: {
            name: 'Dr. Mballa Pierre',
            photo: 'https://ui-avatars.com/api/?name=Mballa+Pierre&background=EAB308&color=fff&size=128',
            bio: 'Expert en électronique de puissance et systèmes de conversion d\'énergie.',
            expertise: 'Électronique de puissance, Automatique',
        },
        prerequisites: 'Électricité de base, circuits électriques',
        targetAudience: 'Étudiants en génie électrique, techniciens',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/elec-puissance',
        order: 3,
        isFeatured: false,
        isTrending: false,
        views: 567,
        enrollments: 123,
        rating: 4.5,
        createdAt: '2024-04-10T11:00:00Z',
        updatedAt: '2024-10-20T09:00:00Z',
        createdBy: 'user_2',
    },
    {
        id: 'course_5',
        title: 'Cybersécurité : Fondamentaux et Pratiques',
        shortDescription: 'Protégez les systèmes informatiques contre les menaces modernes.',
        longDescription: `Introduction complète à la cybersécurité.

**Contenu :**
- Paysage des menaces actuelles
- Cryptographie et protocoles sécurisés
- Sécurité des réseaux
- Tests de pénétration
- Réponse aux incidents

Laboratoires pratiques inclus.`,
        category: 'cat_cyber',
        subcategory: 'cat_info',
        tags: ['cybersécurité', 'sécurité', 'hacking éthique', 'réseau'],
        level: 'beginner',
        duration: 25,
        format: 'mixed',
        language: 'fr',
        type: 'certified',
        status: 'published',
        instructor: {
            name: 'Ing. Atangana Paul',
            photo: 'https://ui-avatars.com/api/?name=Atangana+Paul&background=EF4444&color=fff&size=128',
            bio: 'Consultant en cybersécurité et formateur certifié CISSP.',
            expertise: 'Pentesting, Security Architecture, Incident Response',
        },
        prerequisites: 'Connaissances de base en réseaux',
        targetAudience: 'Administrateurs systèmes, développeurs, responsables IT',
        thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/cybersecurite',
        order: 4,
        isFeatured: true,
        isTrending: true,
        views: 1890,
        enrollments: 412,
        rating: 4.7,
        createdAt: '2024-08-05T08:30:00Z',
        updatedAt: '2024-12-05T10:00:00Z',
        createdBy: 'user_1',
    },
    {
        id: 'course_6',
        title: 'Hydraulique Urbaine',
        shortDescription: 'Conception et dimensionnement des réseaux d\'eau potable et d\'assainissement.',
        longDescription: `Formation spécialisée en hydraulique urbaine.

**Programme détaillé :**
- Alimentation en eau potable
- Réseaux d'assainissement
- Ouvrages de traitement
- Modélisation hydraulique
- Gestion durable des eaux pluviales`,
        category: 'cat_hydro',
        subcategory: 'cat_civil',
        tags: ['hydraulique', 'eau', 'assainissement', 'génie civil'],
        level: 'intermediate',
        duration: 32,
        format: 'mixed',
        language: 'fr',
        type: 'paid',
        status: 'draft',
        instructor: {
            name: 'Dr. Essomba Jean',
            photo: 'https://ui-avatars.com/api/?name=Essomba+Jean&background=06B6D4&color=fff&size=128',
            bio: 'Spécialiste en hydraulique et gestion des ressources en eau.',
            expertise: 'Hydraulique, Hydrologie, Gestion de l\'eau',
        },
        prerequisites: 'Mécanique des fluides de base',
        targetAudience: 'Ingénieurs en génie civil et environnement',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/hydraulique-urbaine',
        order: 5,
        isFeatured: false,
        isTrending: false,
        views: 234,
        enrollments: 45,
        rating: 4.3,
        createdAt: '2024-09-12T14:00:00Z',
        updatedAt: '2024-11-28T16:30:00Z',
        createdBy: 'user_2',
    },
    {
        id: 'course_7',
        title: 'Développement Web Full-Stack avec React et Node.js',
        shortDescription: 'Créez des applications web modernes de A à Z avec les technologies les plus demandées.',
        longDescription: `Formation complète au développement web moderne.

**Stack technique :**
- Frontend : React, TypeScript, CSS moderne
- Backend : Node.js, Express, MongoDB
- DevOps : Git, Docker, déploiement cloud

Projet fil rouge : création d'une application complète.`,
        category: 'cat_prog',
        subcategory: 'cat_info',
        tags: ['react', 'nodejs', 'web', 'javascript', 'fullstack'],
        level: 'intermediate',
        duration: 50,
        format: 'video',
        language: 'fr',
        type: 'paid',
        status: 'published',
        instructor: {
            name: 'Ing. Fouda Alain',
            photo: 'https://ui-avatars.com/api/?name=Fouda+Alain&background=8B5CF6&color=fff&size=128',
            bio: 'Développeur senior et formateur passionné par les technologies web modernes.',
            expertise: 'React, Node.js, TypeScript, Cloud',
        },
        prerequisites: 'HTML, CSS, JavaScript de base',
        targetAudience: 'Développeurs juniors, reconversion professionnelle',
        thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
        teaserVideoUrl: 'https://www.youtube.com/watch?v=example3',
        redirectUrl: 'https://moodle.enspy.cm/course/fullstack-react-node',
        order: 6,
        isFeatured: true,
        isTrending: true,
        views: 3200,
        enrollments: 678,
        rating: 4.9,
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: '2024-12-12T08:00:00Z',
        createdBy: 'user_3',
    },
    {
        id: 'course_8',
        title: 'Automatique Linéaire',
        shortDescription: 'Analyse et conception de systèmes asservis linéaires.',
        longDescription: `Cours fondamental d'automatique linéaire.

**Contenu :**
- Modélisation des systèmes
- Transformée de Laplace
- Analyse fréquentielle (Bode, Nyquist)
- Stabilité des systèmes
- Correcteurs PID
- Simulation avec MATLAB/Simulink`,
        category: 'cat_auto',
        subcategory: 'cat_elec',
        tags: ['automatique', 'contrôle', 'PID', 'matlab'],
        level: 'intermediate',
        duration: 30,
        format: 'mixed',
        language: 'fr',
        type: 'free',
        status: 'published',
        instructor: {
            name: 'Pr. Ndongo Marie',
            photo: 'https://ui-avatars.com/api/?name=Ndongo+Marie&background=1A365D&color=fff&size=128',
            bio: 'Professeure agrégée en automatique et systèmes embarqués.',
            expertise: 'Automatique, Robotique, Systèmes embarqués',
        },
        prerequisites: 'Mathématiques niveau prépa, notions d\'électricité',
        targetAudience: 'Étudiants en génie électrique et informatique',
        thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/automatique-lineaire',
        order: 7,
        isFeatured: false,
        isTrending: false,
        views: 756,
        enrollments: 198,
        rating: 4.6,
        createdAt: '2024-02-15T09:00:00Z',
        updatedAt: '2024-10-05T14:00:00Z',
        createdBy: 'user_2',
    },
    {
        id: 'course_9',
        title: 'Analyse Mathématique pour Ingénieurs',
        shortDescription: 'Renforcez vos bases en analyse avec des applications en ingénierie.',
        longDescription: `Cours de mathématiques fondamentales.

**Programme :**
- Suites et séries numériques
- Calcul différentiel et intégral
- Équations différentielles
- Analyse vectorielle
- Applications en physique et ingénierie`,
        category: 'cat_math',
        tags: ['mathématiques', 'analyse', 'calcul', 'fondamentaux'],
        level: 'beginner',
        duration: 45,
        format: 'text',
        language: 'fr',
        type: 'free',
        status: 'archived',
        instructor: {
            name: 'Dr. Tchuente Louis',
            photo: 'https://ui-avatars.com/api/?name=Tchuente+Louis&background=EC4899&color=fff&size=128',
            bio: 'Mathématicien et pédagogue, auteur de plusieurs ouvrages de référence.',
            expertise: 'Analyse, Algèbre, Optimisation',
        },
        prerequisites: 'Niveau Baccalauréat scientifique',
        targetAudience: 'Étudiants de première année, remise à niveau',
        thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/analyse-math',
        order: 8,
        isFeatured: false,
        isTrending: false,
        views: 2345,
        enrollments: 890,
        rating: 4.4,
        createdAt: '2023-09-01T08:00:00Z',
        updatedAt: '2024-06-30T12:00:00Z',
        createdBy: 'user_1',
    },
    {
        id: 'course_10',
        title: 'Administration Réseaux Linux',
        shortDescription: 'Déployez et administrez des infrastructures réseau sous Linux.',
        longDescription: `Formation pratique à l'administration réseau Linux.

**Modules :**
- Installation et configuration Linux
- Services réseau (DNS, DHCP, Web)
- Scripting Bash
- Sécurisation des serveurs
- Conteneurisation avec Docker`,
        category: 'cat_reseau',
        subcategory: 'cat_info',
        tags: ['linux', 'réseau', 'administration', 'serveur', 'docker'],
        level: 'intermediate',
        duration: 38,
        format: 'mixed',
        language: 'fr',
        type: 'certified',
        status: 'scheduled',
        scheduledDate: '2025-02-01T00:00:00Z',
        instructor: {
            name: 'Ing. Messi André',
            photo: 'https://ui-avatars.com/api/?name=Messi+Andre&background=10B981&color=fff&size=128',
            bio: 'Administrateur systèmes certifié Red Hat et formateur Linux.',
            expertise: 'Linux, DevOps, Cloud Infrastructure',
        },
        prerequisites: 'Bases en informatique et ligne de commande',
        targetAudience: 'Administrateurs systèmes, DevOps engineers',
        thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop',
        redirectUrl: 'https://moodle.enspy.cm/course/admin-linux',
        order: 9,
        isFeatured: false,
        isTrending: false,
        views: 412,
        enrollments: 0,
        rating: 0,
        createdAt: '2024-11-20T10:00:00Z',
        updatedAt: '2024-12-15T09:00:00Z',
        createdBy: 'user_3',
    },
];

// ============================================
// Journal d'activité (exemples)
// ============================================

export const mockActivityLogs: ActivityLog[] = [
    {
        id: 'log_1',
        action: 'create',
        entityType: 'course',
        entityId: 'course_10',
        entityTitle: 'Administration Réseaux Linux',
        userId: 'user_3',
        userName: 'Ing. Fouda Alain',
        timestamp: '2024-12-15T09:00:00Z',
        description: 'Création du cours programmé pour février 2025',
    },
    {
        id: 'log_2',
        action: 'update',
        entityType: 'course',
        entityId: 'course_7',
        entityTitle: 'Développement Web Full-Stack avec React et Node.js',
        userId: 'user_3',
        userName: 'Ing. Fouda Alain',
        timestamp: '2024-12-12T08:00:00Z',
        changes: {
            duration: { old: 45, new: 50 },
            views: { old: 3100, new: 3200 },
        },
    },
    {
        id: 'log_3',
        action: 'publish',
        entityType: 'course',
        entityId: 'course_5',
        entityTitle: 'Cybersécurité : Fondamentaux et Pratiques',
        userId: 'user_1',
        userName: 'Dr. Kamga Emmanuel',
        timestamp: '2024-12-05T10:00:00Z',
    },
    {
        id: 'log_4',
        action: 'archive',
        entityType: 'course',
        entityId: 'course_9',
        entityTitle: 'Analyse Mathématique pour Ingénieurs',
        userId: 'user_1',
        userName: 'Dr. Kamga Emmanuel',
        timestamp: '2024-06-30T12:00:00Z',
        description: 'Cours archivé suite à la nouvelle version',
    },
    {
        id: 'log_5',
        action: 'create',
        entityType: 'category',
        entityId: 'cat_cyber',
        entityTitle: 'Cybersécurité',
        userId: 'user_1',
        userName: 'Dr. Kamga Emmanuel',
        timestamp: '2024-01-05T11:00:00Z',
    },
];

// ============================================
// Statistiques du dashboard
// ============================================

export function generateDashboardStats(courses: Course[]): DashboardStats {
    return {
        totalCourses: courses.length,
        publishedCourses: courses.filter((c) => c.status === 'published').length,
        draftCourses: courses.filter((c) => c.status === 'draft').length,
        archivedCourses: courses.filter((c) => c.status === 'archived').length,
        totalViews: courses.reduce((sum, c) => sum + c.views, 0),
        totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0),
        averageRating: Number(
            (courses.filter((c) => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) /
                courses.filter((c) => c.rating > 0).length || 0).toFixed(1)
        ),
        coursesThisMonth: courses.filter((c) => {
            const createdDate = new Date(c.createdAt);
            const now = new Date();
            return (
                createdDate.getMonth() === now.getMonth() &&
                createdDate.getFullYear() === now.getFullYear()
            );
        }).length,
    };
}

// ============================================
// Fonction d'initialisation
// ============================================

import { coursesStorage, categoriesStorage, activityStorage } from './storage';

export function initializeMockData(): void {
    // Vérifier si les données existent déjà
    const existingCourses = coursesStorage.getAll();
    const existingCategories = categoriesStorage.getAll();

    if (existingCourses.length === 0) {
        coursesStorage.setAll(mockCourses);
    }

    if (existingCategories.length === 0) {
        categoriesStorage.setAll(mockCategories);
    }

    // Toujours mettre à jour les logs avec les exemples si vide
    const existingLogs = activityStorage.getAll();
    if (existingLogs.length === 0) {
        activityStorage.setAll(mockActivityLogs);
    }
}
