import React from 'react';
import {
  GraduationCap,
  BookOpen,
  FileCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  Activity,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const StudentsView: React.FC = () => {
  const { navigate, courses } = usePlatform();
  const { t } = useLanguage();

  const studentModules = [
    {
      title: 'Partograph Mastery & Labor Progress Tracking',
      desc: 'Learn how to plot cervical dilation, fetal head descent, uterine contractions, and identify alert/action line crossings accurately.',
      icon: Activity,
      courseId: 'course-emonc-101',
    },
    {
      title: 'OSCE Clinical Skills: Helping Babies Breathe',
      desc: 'Step-by-step preparation for objective structured clinical examinations in neonatal resuscitation within the Golden Minute.',
      icon: FileCheck,
      courseId: 'course-newborn-101',
    },
    {
      title: 'Antenatal Risk Stratification & BPCR',
      desc: 'Comprehensive history taking, abdominal palpation (Leopold maneuvers), and lab interpretation for student midwives.',
      icon: BookOpen,
      courseId: 'course-anc-101',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Midwives Academic Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Curriculum Companion & Clinical Exam Prep
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Designed for Rwandan midwifery students at the University of Rwanda, Kibungo, Byumba, Nyagatare, and affiliate nursing & midwifery training colleges.
          </p>
        </div>
      </div>

      {/* Recommended Core Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-700" />
          <span>High-Yield Clinical Practice Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
                </div>

                <button
                  onClick={() => navigate('courses', { courseId: mod.courseId })}
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Study Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partograph Guide Checklist */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>The WHO Simplified Partograph: Quick Decision Guide</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Fetal Heart Rate (FHR)</span>
            <p className="text-[11px] text-slate-500">Normal range: 110–160 bpm. Listen and record every 30 minutes immediately following a contraction.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Cervical Dilation</span>
            <p className="text-[11px] text-slate-500">Plot every 4 hours. In normal active labor (from 5 cm), cervix dilates at least 1 cm per hour.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Alert Line Crossing</span>
            <p className="text-[11px] text-slate-500">If plotting crosses to the right of the Alert Line, labor is abnormally slow. Transfer to district hospital.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Action Line (4 hours)</span>
            <p className="text-[11px] text-slate-500">Reaching the Action Line mandates urgent surgical intervention (cesarean delivery) for cephalopelvic disproportion.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
