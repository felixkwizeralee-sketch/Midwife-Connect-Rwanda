import React from 'react';
import {
  Heart,
  Baby,
  ShieldAlert,
  PhoneCall,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Award,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { rwandaEmergencyContacts } from '../../data/clinicalToolsData';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, languages } = useLanguage();
  const { navigate, setIsEmergencyOpen } = usePlatform();

  return (
    <footer className="bg-[#004D4D] text-teal-100 pt-12 pb-8 border-t border-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Medical Disclaimer Banner */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-5 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-[#E6F4EA] text-[#007A7A] shrink-0 mt-0.5 md:mt-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Official Health Education Disclaimer</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#007A7A]">
                  Notice
                </span>
              </h4>
              <p className="text-xs text-teal-100/90 mt-1 max-w-3xl leading-relaxed">
                {t('medicalDisclaimerFull')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#C53030] hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>{t('emergencyModalTitle')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-teal-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#007A7A] flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white/20 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  Midwife Connect Rwanda
                </span>
                <p className="text-xs text-emerald-300 font-medium">
                  {t('brandTagline')}
                </p>
              </div>
            </div>

            <p className="text-xs text-teal-100/80 leading-relaxed pr-4">
              A comprehensive, evidence-based digital health education platform built for Rwanda, empowering student midwives, practicing clinical midwives, pregnant women, youth, and families through knowledge and accessible tools.
            </p>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 text-xs space-y-1 text-teal-100">
              <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{t('brandSlogan')}</span>
              </p>
              <div className="flex items-center gap-2 text-teal-200/80 text-[11px]">
                <MapPin className="w-3 h-3 text-teal-300" />
                <span>Kigali, Rwanda • Serving all 30 Health Districts</span>
              </div>
            </div>
          </div>

          {/* Column: Learning & Tools */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Learning & Tools
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('courses')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('navCourses')} & Modules
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pregnancy')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('eddCalculatorTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pregnancy', { tab: 'anc' })}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('ancScheduleTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pregnancy', { tab: 'danger_signs' })}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('dangerSignsTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('newborn')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('navNewborn')} & KMC
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('quizzes')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('navQuizzes')} & Certification
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Communities */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Specialized Portals
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('students')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('serviceStudentTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('midwives')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('serviceMidwifeTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('youth')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('serviceYouthTitle')} (SRHR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pharmacy')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('servicePharmacyTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('reproductive')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('serviceFamilyPlanningTitle')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('articles')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  {t('navArticles')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Emergency & Languages */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Emergency & Languages
            </h5>
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-xs">
                <span className="text-rose-300 font-bold block">SAMU Ambulance: 112 / 912</span>
                <span className="text-[11px] text-teal-100 block">Rwanda Health Hotline: 114</span>
                <span className="text-[11px] text-teal-100 block">Isange Center (GBV): 3029</span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-teal-200 block mb-1.5 font-medium">
                  Switch Platform Language:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => setLanguage(item.code)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        language === item.code
                          ? 'bg-[#007A7A] text-white shadow-xs'
                          : 'bg-white/10 hover:bg-white/20 text-teal-100'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-200/80">
          <p>© {new Date().getFullYear()} Midwife Connect Rwanda. All rights reserved.</p>
          <div className="flex items-center gap-4 text-teal-200">
            <button
              onClick={() => navigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('navAbout')}
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('navContact')}
            </button>
          </div>
        </div>
      </div>
    </footer>

  );
};
