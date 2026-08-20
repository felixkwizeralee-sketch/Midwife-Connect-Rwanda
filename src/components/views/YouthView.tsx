import React from 'react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';

export const YouthView: React.FC = () => {
  const { navigate, setIsAiAssistantOpen } = usePlatform();

  const youthTopics = [
    {
      title: 'Menstrual Health & Cycle Literacy',
      desc: 'Understanding puberty, ovulation, normal menstrual variations, and hygienic management without fear or shame.',
      icon: Heart,
    },
    {
      title: 'Dual Protection: STI & Pregnancy Prevention',
      desc: 'Why consistent and correct condom use alongside modern contraception protects both your future health and education.',
      icon: ShieldCheck,
    },
    {
      title: 'Confidential Youth-Friendly Health Services in Rwanda',
      desc: 'How to access confidential counseling, HIV testing, and reproductive guidance at your local health center Youth Corner.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Youth & Adolescent Health Hub (SRHR)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Accurate, Confidential & Stigma-Free Health Knowledge
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Empowering Rwandan youth with facts about bodily changes, emotional well-being, menstrual hygiene, and healthy relationships.
          </p>
        </div>
      </div>

      {/* Core Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {youthTopics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{topic.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{topic.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Confidential Q&A Assistant CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white">Have Private Questions About Your Body or Health?</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Ask our Midwife Connect AI Assistant safely and confidentially. Get evidence-based, compassionate answers in English, French, Kinyarwanda, or Kiswahili.
          </p>
        </div>

        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shrink-0 flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Ask AI Assistant Privately</span>
        </button>
      </div>
    </div>
  );
};
