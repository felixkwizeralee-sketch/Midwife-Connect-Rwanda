export type Language = 'en' | 'fr' | 'rw' | 'sw';

export type UserRole =
  | 'student_midwife'
  | 'registered_midwife'
  | 'pregnant_woman'
  | 'youth'
  | 'healthcare_professional'
  | 'pharmacist'
  | 'admin'
  | 'other';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage: Language;
  createdAt: string;
  avatarUrl?: string;
  institution?: string;
  district?: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  lessonProgress: Record<string, string[]>; // courseId -> lessonIds[]
  quizScores: Record<string, { score: number; percentage: number; date: string; passed: boolean }>;
  savedArticleIds: string[];
  savedCourseIds: string[];
  savedResourceIds: string[];
  certificates: Certificate[];
  status?: 'active' | 'disabled';
}

export type CourseCategory =
  | 'Midwifery'
  | 'Maternal Health'
  | 'Newborn Care'
  | 'Reproductive Health'
  | 'Family Planning'
  | 'Antenatal Care'
  | 'Labour and Delivery'
  | 'Postnatal Care'
  | 'Emergency Obstetric Care'
  | 'Pharmacology'
  | 'Clinical Skills';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  keyTakeaways: string[];
  clinicalPearls?: string[];
  downloadableResource?: {
    title: string;
    description: string;
    fileType: string;
  };
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  imageUrl: string;
  lessonsCount: number;
  lessons: Lesson[];
  learningObjectives: string[];
  targetAudience: string[];
  quizId?: string;
  certificateEligible: boolean;
  published: boolean;
  featured?: boolean;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'multiple_answer';

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswerIndices: number[];
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId?: string;
  title: string;
  category: CourseCategory;
  description: string;
  timeLimitMinutes: number;
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  content: string;
  category:
    | 'Pregnancy'
    | 'Midwifery'
    | 'Newborn'
    | 'Reproductive Health'
    | 'Family Planning'
    | "Women's Health"
    | 'Youth Health'
    | 'Pharmacology';
  author: {
    name: string;
    title: string;
    avatarUrl?: string;
    institution?: string;
  };
  publishedDate: string;
  readTimeMinutes: number;
  imageUrl: string;
  published: boolean;
  tags: string[];
  featured?: boolean;
  evidenceRating?: string;
  rwandaMoHGuidelineRef?: string;
  keyPoints?: string[];
  references?: string[];
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  issuedDate?: string;
  scorePercentage: number;
  verificationHash: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'course' | 'article' | 'quiz' | 'announcement' | 'certificate';
  read: boolean;
  link?: string;
}

export interface PlatformStats {
  coursesCount: number;
  learningResourcesCount: number;
  educationalTopicsCount: number;
  languagesCount: number;
  activeLearnersCount: number;
  certifiedMidwivesCount: number;
  rwandanDistrictsCovered: number;
  midwivesTrained?: number;
  pregnantMothersReached?: number;
  quizzesPassed?: number;
  healthFacilitiesCovered?: number;
}

export interface EDDResult {
  edd: Date;
  gestationalWeeks: number;
  gestationalDays: number;
  remainingWeeks: number;
  remainingDays: number;
  trimester: 1 | 2 | 3;
  milestoneTitle: string;
  milestoneDescription: string;
  babySizeComparison: string;
  recommendedCare: string[];
}

export interface ContraceptiveMethod {
  id: string;
  name: string;
  category: 'Short-acting' | 'Long-acting reversible (LARC)' | 'Permanent' | 'Emergency' | 'Natural';
  type?: string;
  effectiveness: string;
  duration: string;
  howItWorks: string;
  mechanism?: string;
  advantages: string[];
  considerations: string[];
  rwandaAvailability: string;
  whoSuitability: string;
}

export interface MaternalDangerSign {
  id: string;
  sign: string;
  kinyarwandaSign: string;
  urgency: 'Emergency (Immediate Hospitalization)' | 'Urgent (Same-day Health Center Visit)';
  potentialCause: string;
  immediateAction: string;
}

export interface VaccineScheduleItem {
  age: string;
  vaccine: string;
  protectsAgainst: string;
  route: string;
  notes: string;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  hours: string;
  badge?: string;
}
