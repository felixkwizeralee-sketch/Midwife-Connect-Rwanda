import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  FileText,
  Sparkles,
  Download,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Course, Lesson } from '../../types';

export const CoursesView: React.FC = () => {
  const { courses, quizzes, routeParams, navigate, setSelectedCertificate, openAuthModal } = usePlatform();
  const { user, enrollCourse, markLessonComplete, toggleSaveCourse } = useAuth();
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(
    routeParams?.courseId || null
  );
  const [activeLessonId, setActiveLessonId] = useState<string | null>(
    routeParams?.lessonId || null
  );

  const categories = [
    'All',
    'Emergency Obstetric Care',
    'Newborn Care',
    'Antenatal Care',
    'Family Planning',
    'Pharmacology',
  ];

  const filteredCourses = courses.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const currentCourse: Course | undefined = courses.find((c) => c.id === selectedCourseId);
  const currentLesson: Lesson | undefined = currentCourse?.lessons.find(
    (l) => l.id === (activeLessonId || currentCourse.lessons[0]?.id)
  ) || currentCourse?.lessons[0];

  const isEnrolled = user && currentCourse && user.enrolledCourseIds.includes(currentCourse.id);
  const completedLessons = (user && currentCourse && user.lessonProgress[currentCourse.id]) || [];
  const courseQuiz = quizzes.find((q) => q.courseId === currentCourse?.id);
  const existingCert = user?.certificates.find((c) => c.courseId === currentCourse?.id);

  // If a course is selected, show the Course Details & Lesson Reader
  if (currentCourse) {
    const currentLessonIndex = currentCourse.lessons.findIndex((l) => l.id === currentLesson?.id);
    const hasNextLesson = currentLessonIndex < currentCourse.lessons.length - 1;
    const hasPrevLesson = currentLessonIndex > 0;
    const isCurrentLessonCompleted = currentLesson && completedLessons.includes(currentLesson.id);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back navigation & Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              setSelectedCourseId(null);
              setActiveLessonId(null);
            }}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>

          <div className="flex items-center gap-2">
            {existingCert && (
              <button
                onClick={() => setSelectedCertificate(existingCert)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-600" />
                <span>View Earned Certificate</span>
              </button>
            )}

            {courseQuiz && (
              <button
                onClick={() => navigate('quizzes', { quizId: courseQuiz.id, courseId: currentCourse.id })}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Take Certification Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Header Hero */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white">
              {currentCourse.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              {currentCourse.level}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentCourse.durationHours} Hours • {currentCourse.lessonsCount} Clinical Lessons</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-white">
            {currentCourse.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {currentCourse.description}
          </p>

          {/* Progress Bar for Enrolled User */}
          {user && (
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Your Lesson Progress</span>
                <span className="text-emerald-400 font-bold">
                  {completedLessons.length} / {currentCourse.lessons.length} Completed
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.round((completedLessons.length / currentCourse.lessons.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Layout: Lessons Sidebar + Active Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Lessons Index */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Course Modules & Lessons
                </h3>
                <span className="text-[11px] font-bold text-blue-700">
                  {currentCourse.lessons.length} Lessons
                </span>
              </div>

              <div className="space-y-2">
                {currentCourse.lessons.map((lesson, idx) => {
                  const isCurrent = lesson.id === currentLesson?.id;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 cursor-pointer border ${
                        isCurrent
                          ? 'bg-blue-50/80 border-blue-400 text-blue-900 shadow-2xs font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isCurrent ? 'border-blue-600 text-blue-600 bg-white' : 'border-slate-300 text-slate-400'
                          }`}>
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-2">{lesson.title}</p>
                        <span className="text-[10px] text-slate-400 mt-0.5 block font-normal">
                          {lesson.durationMinutes} minutes
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {courseQuiz && (
                <div className="pt-2">
                  <button
                    onClick={() => navigate('quizzes', { quizId: courseQuiz.id, courseId: currentCourse.id })}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:opacity-95"
                  >
                    <Award className="w-4 h-4" />
                    <span>Take Module Examination</span>
                  </button>
                </div>
              )}
            </div>

            {/* Learning Objectives Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Learning Objectives:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentCourse.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main: Active Lesson Reader */}
          <div className="lg:col-span-8 space-y-6">
            {currentLesson ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
                {/* Lesson Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      Lesson {currentLessonIndex + 1} of {currentCourse.lessons.length}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-2">
                      {currentLesson.title}
                    </h2>
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentLesson.durationMinutes} min read</span>
                  </span>
                </div>

                {/* Lesson Content Body */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {currentLesson.content}
                </div>

                {/* Clinical Pearls Callout */}
                {currentLesson.clinicalPearls && currentLesson.clinicalPearls.length > 0 && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                    <h4 className="font-bold text-amber-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Clinical Pearls for Practicing Midwives:</span>
                    </h4>
                    <ul className="space-y-1.5 text-amber-800 leading-relaxed">
                      {currentLesson.clinicalPearls.map((pearl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{pearl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Takeaways */}
                {currentLesson.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Takeaways:</span>
                    </h4>
                    <ul className="space-y-1 text-emerald-800 leading-relaxed">
                      {currentLesson.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span>✓</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Downloadable Resource */}
                {currentLesson.downloadableResource && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-blue-950">
                          {currentLesson.downloadableResource.title}
                        </h5>
                        <p className="text-[11px] text-blue-700">
                          {currentLesson.downloadableResource.description} ({currentLesson.downloadableResource.fileType})
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading ${currentLesson.downloadableResource?.title}...`)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                )}

                {/* Lesson Actions & Navigation */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {hasPrevLesson && (
                      <button
                        onClick={() => setActiveLessonId(currentCourse.lessons[currentLessonIndex - 1].id)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous Lesson</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        if (user) {
                          markLessonComplete(currentCourse.id, currentLesson.id);
                        } else {
                          openAuthModal('login');
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isCurrentLessonCompleted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCurrentLessonCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
                    </button>

                    {hasNextLesson ? (
                      <button
                        onClick={() => {
                          if (user && !isCurrentLessonCompleted) {
                            markLessonComplete(currentCourse.id, currentLesson.id);
                          }
                          setActiveLessonId(currentCourse.lessons[currentLessonIndex + 1].id);
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Next Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : courseQuiz ? (
                      <button
                        onClick={() => navigate('quizzes', { quizId: courseQuiz.id, courseId: currentCourse.id })}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>Take Final Quiz</span>
                        <Award className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the full Course Catalog view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Catalog Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Accredited Continuing Professional Development</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Clinical Midwifery & Maternal Health Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Free, self-paced, high-yield educational modules aligned with Rwanda MoH protocols, WHO standards, and the National Midwifery Curriculum.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredCourses.length} Courses
        </span>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = user?.savedCourseIds.includes(course.id);
          const isCompleted = user?.completedCourseIds.includes(course.id);
          const userProgress = user?.lessonProgress[course.id] || [];

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white">
                      {course.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800">
                      {course.level}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-300" />
                      <span>{course.durationHours}h • {course.lessonsCount} Lessons</span>
                    </span>
                    {course.certificateEligible && (
                      <span className="flex items-center gap-1 text-amber-300 font-semibold text-[10px]">
                        <Award className="w-3 h-3" />
                        <span>Certificate</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => setSelectedCourseId(course.id)}
                    className="text-base font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors line-clamp-2"
                  >
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {user && userProgress.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Progress</span>
                        <span className="font-bold text-blue-700">
                          {Math.round((userProgress.length / course.lessons.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${(userProgress.length / course.lessons.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => setSelectedCourseId(course.id)}
                  className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{isCompleted ? 'Review Course' : 'Start Course'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => (user ? toggleSaveCourse(course.id) : openAuthModal('login'))}
                  className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Remove from Saved' : 'Save for Later'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
