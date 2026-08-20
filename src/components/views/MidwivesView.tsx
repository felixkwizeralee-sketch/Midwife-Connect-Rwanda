import React from 'react';
import {
  Award,
  ShieldAlert,
  HeartPulse,
  Activity,
  FileCheck,
  PhoneCall,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';

export const MidwivesView: React.FC = () => {
  const { navigate, setIsEmergencyOpen } = usePlatform();

  const emoncBundles = [
    {
      title: 'Postpartum Hemorrhage (PPH) E-MOTIVE Bundle',
      desc: 'Early detection with calibrated drape, uterine massage, Oxytocin infusion, Tranexamic Acid (TXA 1g within 3 hours), and condom balloon tamponade.',
      badge: 'MoH Protocol',
      courseId: 'course-emonc-101',
    },
    {
      title: 'Pritchard Magnesium Sulfate Protocol for Eclampsia',
      desc: 'Loading dose (4g IV + 10g IM) followed by 5g IM every 4 hours for 24h with patellar reflex and urine output monitoring.',
      badge: 'Emergency EmONC',
      courseId: 'course-emonc-101',
    },
    {
      title: 'Neonatal Resuscitation & Bag-and-Mask Skills',
      desc: 'Helping Babies Breathe (HBB) algorithm within the Golden Minute, MR. SOPA troubleshooting, and thermal stabilization.',
      badge: 'Neonatal Survival',
      courseId: 'course-newborn-101',
    },
    {
      title: 'Immediate Postplacental PPIUD & Implants',
      desc: 'Clinical insertion of Copper T380A within 10 minutes of placental expulsion and immediate postpartum LARC counseling.',
      badge: 'Family Planning',
      courseId: 'course-fp-101',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Practicing Registered Midwives</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            EmONC Clinical Practice & CPD Standards
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evidence-based emergency algorithms, referral standards, and accredited Continuing Professional Development (CPD) modules for practicing clinical midwives in Rwanda.
          </p>
        </div>
      </div>

      {/* EmONC Protocols Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-700" />
            <span>Standardized Obstetric Emergency Bundles</span>
          </h2>
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Referral SAMU (112)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emoncBundles.map((bundle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {bundle.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{bundle.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{bundle.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate('courses', { courseId: bundle.courseId })}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review Clinical Protocol & Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
