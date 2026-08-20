import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  Article,
  Quiz,
  AppNotification,
  PlatformStats,
  Certificate,
  QuizQuestion,
} from '../types';
import { initialCourses } from '../data/coursesData';
import { initialArticles } from '../data/articlesData';
import { initialQuizzes } from '../data/quizzesData';

interface PlatformContextType {
  // Navigation
  currentRoute: string;
  routeParams: Record<string, any>;
  navigate: (route: string, params?: Record<string, any>) => void;

  // Collections
  courses: Course[];
  articles: Article[];
  quizzes: Quiz[];
  stats: PlatformStats;
  notifications: AppNotification[];

  // Modals & Active Items
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isEmergencyOpen: boolean;
  setIsEmergencyOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  openAuthModal: (tab?: 'login' | 'register') => void;

  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;

  // Admin Actions
  updateStats: (newStats: Partial<PlatformStats>) => void;
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (articleId: string, updates: Partial<Article>) => void;
  deleteArticle: (articleId: string) => void;
  addQuizQuestion: (quizId: string, question: QuizQuestion) => void;
  deleteQuizQuestion: (quizId: string, questionId: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
}

const defaultStats: PlatformStats = {
  coursesCount: 12,
  learningResourcesCount: 85,
  educationalTopicsCount: 48,
  languagesCount: 4,
  activeLearnersCount: 1420,
  certifiedMidwivesCount: 380,
  rwandanDistrictsCovered: 30,
};

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Clinical EmONC Algorithm Published',
    message: 'WHO and Rwanda MoH updated Postpartum Hemorrhage bundle guidelines have been added to the Emergency Obstetric Care course.',
    timestamp: 'Just now',
    type: 'course',
    read: false,
    link: 'courses',
  },
  {
    id: 'notif-2',
    title: 'New Article: Community Midwifery in Rwanda',
    message: 'Read the latest clinical insight on strengthening maternal referral chains in rural districts.',
    timestamp: '2 hours ago',
    type: 'article',
    read: false,
    link: 'articles',
  },
  {
    id: 'notif-3',
    title: 'Newborn Care Certification Available',
    message: 'Complete the Helping Babies Breathe and Kangaroo Mother Care course to claim your verified certificate.',
    timestamp: 'Yesterday',
    type: 'certificate',
    read: true,
    link: 'courses',
  },
];

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('mcr_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('mcr_articles');
    return saved ? JSON.parse(saved) : initialArticles;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('mcr_quizzes');
    return saved ? JSON.parse(saved) : initialQuizzes;
  });

  const [stats, setStats] = useState<PlatformStats>(() => {
    const saved = localStorage.getItem('mcr_stats');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('mcr_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    localStorage.setItem('mcr_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('mcr_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('mcr_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('mcr_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('mcr_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const navigate = (route: string, params: Record<string, any> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const updateStats = (newStats: Partial<PlatformStats>) => {
    setStats((prev) => ({ ...prev, ...newStats }));
  };

  const addCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    setStats((prev) => ({ ...prev, coursesCount: prev.coursesCount + 1 }));
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updates } : c))
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setStats((prev) => ({ ...prev, coursesCount: Math.max(0, prev.coursesCount - 1) }));
  };

  const addArticle = (newArticle: Article) => {
    setArticles((prev) => [newArticle, ...prev]);
    setStats((prev) => ({ ...prev, learningResourcesCount: prev.learningResourcesCount + 1 }));
  };

  const updateArticle = (articleId: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, ...updates } : a))
    );
  };

  const deleteArticle = (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
  };

  const addQuizQuestion = (quizId: string, question: QuizQuestion) => {
    setQuizzes((prev) =>
      prev.map((q) => (q.id === quizId ? { ...q, questions: [...q.questions, question] } : q))
    );
  };

  const deleteQuizQuestion = (quizId: string, questionId: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId
          ? { ...q, questions: q.questions.filter((item) => item.id !== questionId) }
          : q
      )
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <PlatformContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        courses,
        articles,
        quizzes,
        stats,
        notifications,
        isSearchOpen,
        setIsSearchOpen,
        isEmergencyOpen,
        setIsEmergencyOpen,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        selectedCertificate,
        setSelectedCertificate,
        updateStats,
        addCourse,
        updateCourse,
        deleteCourse,
        addArticle,
        updateArticle,
        deleteArticle,
        addQuizQuestion,
        deleteQuizQuestion,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
