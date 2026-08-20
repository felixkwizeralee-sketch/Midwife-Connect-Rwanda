import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Quiz, QuizQuestion, Certificate } from '../../types';
import confetti from 'canvas-confetti';

export const QuizzesView: React.FC = () => {
  const { quizzes, courses, routeParams, navigate, setSelectedCertificate } = usePlatform();
  const { user, recordQuizScore } = useAuth();
  const { t } = useLanguage();

  const [activeQuizId, setActiveQuizId] = useState<string | null>(
    routeParams?.quizId || null
  );

  // Active quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [newlyEarnedCert, setNewlyEarnedCert] = useState<Certificate | null>(null);

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);
  const linkedCourse = courses.find((c) => c.id === activeQuiz?.courseId);

  useEffect(() => {
    if (routeParams?.quizId) {
      setActiveQuizId(routeParams.quizId);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setNewlyEarnedCert(null);
    }
  }, [routeParams?.quizId]);

  const handleOptionToggle = (questionId: string, optionIndex: number, type: QuizQuestion['type']) => {
    if (isSubmitted) return;

    setSelectedAnswers((prev) => {
      const current = prev[questionId] || [];
      if (type === 'multiple_answer') {
        if (current.includes(optionIndex)) {
          return { ...prev, [questionId]: current.filter((idx) => idx !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...current, optionIndex] };
        }
      } else {
        // Single choice or True/False
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const calculateScore = () => {
    if (!activeQuiz) return { score: 0, total: 0, percentage: 0, passed: false };
    let correctCount = 0;

    activeQuiz.questions.forEach((q) => {
      const userSelected = selectedAnswers[q.id] || [];
      const correct = q.correctAnswerIndices;

      if (
        userSelected.length === correct.length &&
        userSelected.every((val) => correct.includes(val))
      ) {
        correctCount += 1;
      }
    });

    const total = activeQuiz.questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= activeQuiz.passingScorePercentage;

    return { score: correctCount, total, percentage, passed };
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;
    setIsSubmitted(true);
    const result = calculateScore();

    if (result.passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    if (user) {
      const cert = recordQuizScore(
        activeQuiz.id,
        result.score,
        result.percentage,
        result.passed,
        activeQuiz.courseId,
        linkedCourse?.title || activeQuiz.title
      );
      if (cert) {
        setNewlyEarnedCert(cert);
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setNewlyEarnedCert(null);
  };

  // If a quiz is active:
  if (activeQuiz) {
    const currentQ: QuizQuestion | undefined = activeQuiz.questions[currentQuestionIndex];
    const userSelected = currentQ ? selectedAnswers[currentQ.id] || [] : [];
    const result = isSubmitted ? calculateScore() : null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setActiveQuizId(null);
              setIsSubmitted(false);
            }}
            className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Examination</span>
          </button>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Passing Grade: {activeQuiz.passingScorePercentage}%
          </span>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {activeQuiz.category} Examination
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white">{activeQuiz.title}</h1>
          <p className="text-xs text-slate-300">{activeQuiz.description}</p>
        </div>

        {/* Results Screen */}
        {isSubmitted && result ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            <div className="text-center space-y-3">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                  result.passed
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {result.passed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
              </div>

              <h2 className="text-2xl font-black text-slate-900">
                {result.passed ? 'Congratulations! You Passed!' : 'Exam Not Passed'}
              </h2>

              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {result.passed
                  ? `You achieved ${result.percentage}% (${result.score}/${result.total} questions correct). Your verified certificate has been awarded.`
                  : `You scored ${result.percentage}%. You need at least ${activeQuiz.passingScorePercentage}% to earn your verified certificate. Review the clinical rationales below and try again.`}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                {result.passed && newlyEarnedCert && (
                  <button
                    onClick={() => setSelectedCertificate(newlyEarnedCert)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate</span>
                  </button>
                )}

                <button
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Examination</span>
                </button>
              </div>
            </div>

            {/* Questions Review with Clinical Explanations */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Clinical Question Rationale Review
              </h3>

              {activeQuiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id] || [];
                const isCorrect =
                  userAns.length === q.correctAnswerIndices.length &&
                  userAns.every((val) => q.correctAnswerIndices.includes(val));

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400">
                          Question {idx + 1}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{q.question}</h4>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isOptionCorrect = q.correctAnswerIndices.includes(optIdx);
                        const isUserChoice = userAns.includes(optIdx);

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg text-xs flex items-center justify-between ${
                              isOptionCorrect
                                ? 'bg-emerald-100/70 text-emerald-900 font-semibold'
                                : isUserChoice
                                ? 'bg-rose-100 text-rose-900 line-through'
                                : 'text-slate-600'
                            }`}
                          >
                            <span>{opt}</span>
                            {isOptionCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-blue-900 flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Clinical Rationale:</span>
                      </span>
                      <p className="text-[11px] leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Active Question Card */
          currentQ && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                <span className="font-bold text-blue-700">
                  Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                </span>
                <span className="text-slate-400 capitalize">
                  Type: {currentQ.type.replace('_', ' ')}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userSelected.includes(optIdx);

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleOptionToggle(currentQ.id, optIdx, currentQ.type)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishQuiz}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Examination</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  // Quiz Catalog view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Clinical Mastery Assessments</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Quizzes & Certification Exams
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Test your clinical decision-making across Emergency Obstetric Care, Newborn Resuscitation, Antenatal Care, and Pharmacology. Score ≥80% to earn verifiable continuing education certificates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          const userScore = user?.quizScores[quiz.id];
          const hasPassed = userScore?.passed;

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {quiz.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{quiz.timeLimitMinutes} min • {quiz.questions.length} Questions</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{quiz.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{quiz.description}</p>
              </div>

              {userScore && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Your Last Score:</span>
                  <span className={`font-bold ${hasPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {userScore.percentage}% {hasPassed ? '(Passed ✓)' : '(Try Again)'}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Pass mark: {quiz.passingScorePercentage}%</span>
                <button
                  onClick={() => {
                    setActiveQuizId(quiz.id);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setIsSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>{hasPassed ? 'Retake Exam' : 'Start Exam'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
