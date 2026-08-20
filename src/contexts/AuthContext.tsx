import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Language, Certificate } from '../types';

interface AuthContextType {
  user: User | null;
  usersList: User[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (data: {
    fullName: string;
    email: string;
    phone: string;
    role: UserRole;
    preferredLanguage: Language;
    institution?: string;
    district?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  quickDemoLogin: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  toggleSaveArticle: (articleId: string) => void;
  toggleSaveCourse: (courseId: string) => void;
  enrollCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  recordQuizScore: (
    quizId: string,
    score: number,
    percentage: number,
    passed: boolean,
    courseId?: string,
    courseTitle?: string
  ) => Certificate | null;
  adminUpdateUserRole: (userId: string, newRole: UserRole) => void;
  adminToggleUserStatus: (userId: string) => void;
}

const demoUsers: User[] = [
  {
    id: 'user-admin-1',
    fullName: 'Felix Kwizera (Director)',
    email: 'admin@midwifeconnect.rw',
    phone: '+250 788 111 222',
    role: 'admin',
    preferredLanguage: 'en',
    createdAt: '2026-01-10',
    institution: 'Rwanda Midwifery Educational Council & MoH',
    district: 'Kigali (Nyarugenge)',
    enrolledCourseIds: ['course-emonc-101', 'course-newborn-101', 'course-anc-101'],
    completedCourseIds: ['course-emonc-101'],
    lessonProgress: {
      'course-emonc-101': ['lesson-emonc-1', 'lesson-emonc-2', 'lesson-emonc-3', 'lesson-emonc-4', 'lesson-emonc-5'],
      'course-newborn-101': ['lesson-newborn-1'],
    },
    quizScores: {
      'quiz-emonc-1': { score: 5, percentage: 100, date: '2026-07-15', passed: true },
    },
    savedArticleIds: ['art-1', 'art-5'],
    savedCourseIds: ['course-emonc-101', 'course-newborn-101'],
    savedResourceIds: [],
    certificates: [
      {
        id: 'cert-mcr-001',
        certificateNumber: 'MCR-2026-EMONC-0982',
        userId: 'user-admin-1',
        studentName: 'Felix Kwizera (Director)',
        courseId: 'course-emonc-101',
        courseTitle: 'Emergency Obstetric & Neonatal Care (EmONC): PPH & Eclampsia Protocols',
        issueDate: '2026-07-15',
        scorePercentage: 100,
        verificationHash: 'e7a1f09c8d3b2a',
      },
    ],
    status: 'active',
  },
  {
    id: 'user-student-1',
    fullName: 'Diane Mukamwiza',
    email: 'student@midwifeconnect.rw',
    phone: '+250 789 333 444',
    role: 'student_midwife',
    preferredLanguage: 'rw',
    createdAt: '2026-03-01',
    institution: 'University of Rwanda - School of Nursing & Midwifery (Remera Campus)',
    district: 'Gasabo',
    enrolledCourseIds: ['course-emonc-101', 'course-newborn-101'],
    completedCourseIds: ['course-newborn-101'],
    lessonProgress: {
      'course-newborn-101': ['lesson-newborn-1', 'lesson-newborn-2', 'lesson-newborn-3', 'lesson-newborn-4'],
      'course-emonc-101': ['lesson-emonc-1', 'lesson-emonc-2'],
    },
    quizScores: {
      'quiz-newborn-1': { score: 4, percentage: 100, date: '2026-08-01', passed: true },
    },
    savedArticleIds: ['art-1', 'art-3'],
    savedCourseIds: ['course-newborn-101'],
    savedResourceIds: [],
    certificates: [
      {
        id: 'cert-mcr-002',
        certificateNumber: 'MCR-2026-NB-1044',
        userId: 'user-student-1',
        studentName: 'Diane Mukamwiza',
        courseId: 'course-newborn-101',
        courseTitle: 'Essential Newborn Care, Neonatal Resuscitation & Kangaroo Mother Care (KMC)',
        issueDate: '2026-08-01',
        scorePercentage: 100,
        verificationHash: 'b4c91e2f89a03d',
      },
    ],
    status: 'active',
  },
  {
    id: 'user-midwife-1',
    fullName: 'Sister Grace Uwera, RM',
    email: 'midwife@midwifeconnect.rw',
    phone: '+250 788 555 666',
    role: 'registered_midwife',
    preferredLanguage: 'en',
    createdAt: '2026-02-15',
    institution: 'Kacyiru District Hospital Maternity Ward',
    district: 'Gasabo',
    enrolledCourseIds: ['course-emonc-101', 'course-fp-101', 'course-pharma-101'],
    completedCourseIds: ['course-emonc-101', 'course-fp-101'],
    lessonProgress: {
      'course-emonc-101': ['lesson-emonc-1', 'lesson-emonc-2', 'lesson-emonc-3', 'lesson-emonc-4', 'lesson-emonc-5'],
      'course-fp-101': ['lesson-fp-1', 'lesson-fp-2', 'lesson-fp-3'],
    },
    quizScores: {
      'quiz-emonc-1': { score: 5, percentage: 100, date: '2026-06-20', passed: true },
      'quiz-fp-1': { score: 2, percentage: 100, date: '2026-07-10', passed: true },
    },
    savedArticleIds: ['art-1', 'art-2', 'art-5'],
    savedCourseIds: ['course-emonc-101'],
    savedResourceIds: [],
    certificates: [
      {
        id: 'cert-mcr-003',
        certificateNumber: 'MCR-2026-EMONC-0731',
        userId: 'user-midwife-1',
        studentName: 'Sister Grace Uwera, RM',
        courseId: 'course-emonc-101',
        courseTitle: 'Emergency Obstetric & Neonatal Care (EmONC): PPH & Eclampsia Protocols',
        issueDate: '2026-06-20',
        scorePercentage: 100,
        verificationHash: '9a3d4f1c7e820b',
      },
    ],
    status: 'active',
  },
  {
    id: 'user-pregnant-1',
    fullName: 'Aline Ingabire',
    email: 'aline@midwifeconnect.rw',
    phone: '+250 782 777 888',
    role: 'pregnant_woman',
    preferredLanguage: 'rw',
    createdAt: '2026-04-10',
    district: 'Kicukiro (Gikondo)',
    enrolledCourseIds: ['course-anc-101'],
    completedCourseIds: [],
    lessonProgress: {
      'course-anc-101': ['lesson-anc-1', 'lesson-anc-2'],
    },
    quizScores: {},
    savedArticleIds: ['art-2', 'art-3'],
    savedCourseIds: ['course-anc-101'],
    savedResourceIds: [],
    certificates: [],
    status: 'active',
  },
  {
    id: 'user-youth-1',
    fullName: 'Kevin Mugisha',
    email: 'youth@midwifeconnect.rw',
    phone: '+250 781 999 000',
    role: 'youth',
    preferredLanguage: 'en',
    createdAt: '2026-05-12',
    district: 'Huye',
    enrolledCourseIds: ['course-fp-101'],
    completedCourseIds: [],
    lessonProgress: {
      'course-fp-101': ['lesson-fp-1'],
    },
    quizScores: {},
    savedArticleIds: ['art-4'],
    savedCourseIds: ['course-fp-101'],
    savedResourceIds: [],
    certificates: [],
    status: 'active',
  },
  {
    id: 'user-pharma-1',
    fullName: 'Dr. Patrick Habimana, PharmD',
    email: 'pharma@midwifeconnect.rw',
    phone: '+250 785 444 333',
    role: 'pharmacist',
    preferredLanguage: 'fr',
    createdAt: '2026-02-01',
    institution: 'Kigali Central Hospital Pharmacy',
    district: 'Nyarugenge',
    enrolledCourseIds: ['course-pharma-101', 'course-emonc-101'],
    completedCourseIds: [],
    lessonProgress: {
      'course-pharma-101': ['lesson-pharma-1'],
    },
    quizScores: {},
    savedArticleIds: ['art-5'],
    savedCourseIds: ['course-pharma-101'],
    savedResourceIds: [],
    certificates: [],
    status: 'active',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem('mcr_users_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return demoUsers;
      }
    }
    return demoUsers;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mcr_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return demoUsers[0];
      }
    }
    return demoUsers[0]; // Default logged-in as Admin for smooth full exploration
  });

  useEffect(() => {
    localStorage.setItem('mcr_users_list', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mcr_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mcr_current_user');
    }
  }, [user]);

  const login = (email: string, password?: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const found = usersList.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { success: false, error: 'User with this email not found. Try one of our instant demo accounts or register below.' };
    }
    if (found.status === 'disabled') {
      return { success: false, error: 'This account has been temporarily disabled by the administrator.' };
    }
    setUser(found);
    return { success: true };
  };

  const register = (data: {
    fullName: string;
    email: string;
    phone: string;
    role: UserRole;
    preferredLanguage: Language;
    institution?: string;
    district?: string;
  }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    if (usersList.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists. Please log in.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      preferredLanguage: data.preferredLanguage,
      createdAt: new Date().toISOString().split('T')[0],
      institution: data.institution,
      district: data.district,
      enrolledCourseIds: [],
      completedCourseIds: [],
      lessonProgress: {},
      quizScores: {},
      savedArticleIds: [],
      savedCourseIds: [],
      savedResourceIds: [],
      certificates: [],
      status: 'active',
    };

    setUsersList((prev) => [newUser, ...prev]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const quickDemoLogin = (role: UserRole) => {
    const match = usersList.find((u) => u.role === role) || demoUsers.find((u) => u.role === role);
    if (match) {
      setUser(match);
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setUsersList((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  const toggleSaveArticle = (articleId: string) => {
    if (!user) return;
    const isSaved = user.savedArticleIds.includes(articleId);
    const updatedArticles = isSaved
      ? user.savedArticleIds.filter((id) => id !== articleId)
      : [...user.savedArticleIds, articleId];
    updateUserProfile({ savedArticleIds: updatedArticles });
  };

  const toggleSaveCourse = (courseId: string) => {
    if (!user) return;
    const isSaved = user.savedCourseIds.includes(courseId);
    const updatedCourses = isSaved
      ? user.savedCourseIds.filter((id) => id !== courseId)
      : [...user.savedCourseIds, courseId];
    updateUserProfile({ savedCourseIds: updatedCourses });
  };

  const enrollCourse = (courseId: string) => {
    if (!user) return;
    if (!user.enrolledCourseIds.includes(courseId)) {
      updateUserProfile({ enrolledCourseIds: [...user.enrolledCourseIds, courseId] });
    }
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!user) return;
    const currentCourseLessons = user.lessonProgress[courseId] || [];
    if (!currentCourseLessons.includes(lessonId)) {
      const updatedProgress = {
        ...user.lessonProgress,
        [courseId]: [...currentCourseLessons, lessonId],
      };
      const enrolled = user.enrolledCourseIds.includes(courseId)
        ? user.enrolledCourseIds
        : [...user.enrolledCourseIds, courseId];
      updateUserProfile({
        lessonProgress: updatedProgress,
        enrolledCourseIds: enrolled,
      });
    }
  };

  const recordQuizScore = (
    quizId: string,
    score: number,
    percentage: number,
    passed: boolean,
    courseId?: string,
    courseTitle?: string
  ): Certificate | null => {
    if (!user) return null;
    const dateStr = new Date().toISOString().split('T')[0];
    const updatedScores = {
      ...user.quizScores,
      [quizId]: { score, percentage, date: dateStr, passed },
    };

    let newCertificate: Certificate | null = null;
    let updatedCompletedCourses = user.completedCourseIds;
    let updatedCerts = user.certificates;

    if (passed && courseId && courseTitle) {
      if (!updatedCompletedCourses.includes(courseId)) {
        updatedCompletedCourses = [...updatedCompletedCourses, courseId];
      }
      const existingCert = user.certificates.find((c) => c.courseId === courseId);
      if (!existingCert) {
        newCertificate = {
          id: `cert-${Date.now()}`,
          certificateNumber: `MCR-${new Date().getFullYear()}-${courseId.toUpperCase().slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: user.id,
          studentName: user.fullName,
          courseId: courseId,
          courseTitle: courseTitle,
          issueDate: dateStr,
          scorePercentage: percentage,
          verificationHash: Math.random().toString(36).substring(2, 12),
        };
        updatedCerts = [newCertificate, ...user.certificates];
      } else {
        newCertificate = existingCert;
      }
    }

    updateUserProfile({
      quizScores: updatedScores,
      completedCourseIds: updatedCompletedCourses,
      certificates: updatedCerts,
    });

    return newCertificate;
  };

  const adminUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (user && user.id === userId) {
      setUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  const adminToggleUserStatus = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'disabled' ? 'active' : 'disabled' } : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        usersList,
        login,
        register,
        logout,
        quickDemoLogin,
        updateUserProfile,
        toggleSaveArticle,
        toggleSaveCourse,
        enrollCourse,
        markLessonComplete,
        recordQuizScore,
        adminUpdateUserRole,
        adminToggleUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
