import React from 'react';
import {
  Heart,
  Baby,
  GraduationCap,
  Award,
  Sparkles,
  BookOpen,
  Pill,
  Users,
  ShieldAlert,
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  PhoneCall,
  Clock,
  Check,
  FileText,
  Activity,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';

export const HomeView: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    navigate,
    courses,
    articles,
    stats,
    setIsEmergencyOpen,
    setIsAiAssistantOpen,
    openAuthModal,
  } = usePlatform();
  const { user, toggleSaveCourse } = useAuth();

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 2);
  const featuredArticles = articles.slice(0, 3);

  const audienceGroups = [
    {
      id: 'student_midwives',
      title: t('serviceStudentTitle'),
      desc: t('serviceStudentDesc'),
      icon: GraduationCap,
      route: 'students',
      accentColor: 'from-blue-600 to-indigo-700',
      badge: 'CPD & Curricula',
    },
    {
      id: 'registered_midwives',
      title: t('serviceMidwifeTitle'),
      desc: t('serviceMidwifeDesc'),
      icon: Award,
      route: 'midwives',
      accentColor: 'from-emerald-600 to-teal-700',
      badge: 'EmONC Protocols',
    },
    {
      id: 'pregnant_women',
      title: t('servicePregnantTitle'),
      desc: t('servicePregnantDesc'),
      icon: Baby,
      route: 'pregnancy',
      accentColor: 'from-rose-500 to-pink-600',
      badge: 'EDD & ANC Tracker',
    },
    {
      id: 'reproductive_women',
      title: t('serviceFamilyPlanningTitle'),
      desc: t('serviceFamilyPlanningDesc'),
      icon: Heart,
      route: 'reproductive',
      accentColor: 'from-purple-600 to-indigo-600',
      badge: 'LARC & Counseling',
    },
    {
      id: 'youth_health',
      title: t('serviceYouthTitle'),
      desc: t('serviceYouthDesc'),
      icon: Sparkles,
      route: 'youth',
      accentColor: 'from-amber-500 to-orange-600',
      badge: 'SRHR & Wellness',
    },
    {
      id: 'families',
      title: t('serviceFamiliesTitle'),
      desc: t('serviceFamiliesDesc'),
      icon: Users,
      route: 'about',
      accentColor: 'from-cyan-600 to-blue-600',
      badge: 'Home Newborn Care',
    },
    {
      id: 'healthcare_learners',
      title: t('serviceLearnersTitle'),
      desc: t('serviceLearnersDesc'),
      icon: BookOpen,
      route: 'courses',
      accentColor: 'from-slate-700 to-slate-900',
      badge: 'Clinical Foundations',
    },
    {
      id: 'pharmacists',
      title: t('servicePharmacyTitle'),
      desc: t('servicePharmacyDesc'),
      icon: Pill,
      route: 'pharmacy',
      accentColor: 'from-emerald-700 to-emerald-900',
      badge: 'Safe Pharmacotherapy',
    },
  ];

  const interactiveTools = [
    {
      title: t('eddCalculatorTitle'),
      desc: 'Calculate estimated delivery date, trimester milestones, and gestational age.',
      icon: Calculator,
      route: 'pregnancy',
      params: { tab: 'calculator' },
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      title: t('ancScheduleTitle'),
      desc: 'WHO 8-contact positive pregnancy care schedule and lab visit roadmap.',
      icon: Calendar,
      route: 'pregnancy',
      params: { tab: 'anc' },
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: t('dangerSignsTitle'),
      desc: 'Emergency triage red-flags for preeclampsia, PPH, sepsis, and obstructed labor.',
      icon: ShieldAlert,
      route: 'pregnancy',
      params: { tab: 'danger_signs' },
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      title: 'Contraceptive Decision Matrix',
      desc: 'WHO MEC classification for postpartum IUD, subdermal implants, and injectables.',
      icon: Heart,
      route: 'reproductive',
      params: { tab: 'contraception' },
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#004D4D] text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Natural Tones Glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#007A7A]/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-100 text-xs font-bold backdrop-blur-md">
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              <span>Midwife Connect Rwanda • Ubuzima bw'Umubyeyi n'Umwana</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-teal-100/90 leading-relaxed font-normal">
              {t('heroSubtitle')}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('courses')}
                id="hero-explore-courses-btn"
                className="px-6 py-3.5 rounded-full bg-[#007A7A] hover:bg-[#005F5F] text-white text-sm font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t('heroBtnCourses')}</span>
              </button>

              <button
                onClick={() => navigate('pregnancy')}
                id="hero-pregnancy-tools-btn"
                className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-bold border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Baby className="w-4 h-4 text-teal-200" />
                <span>{t('heroBtnPregnancy')}</span>
              </button>

              <button
                onClick={() => setIsAiAssistantOpen(true)}
                id="hero-ai-assistant-btn"
                className="px-6 py-3.5 rounded-full bg-[#F27D26] hover:bg-[#D96B1E] text-white text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-100" />
                <span>{t('heroBtnAiAssistant')}</span>
              </button>
            </div>

            {/* Micro disclaimer on hero */}
            <div className="pt-2 flex items-center gap-2 text-xs text-teal-200/90">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Aligned with Rwanda Ministry of Health and WHO Maternal & Newborn Guidelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE RWANDA PLATFORM IMPACT METRICS */}
      <section className="-mt-12 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#E2E8F0]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#EDF2F7]">
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-[#004D4D]">{stats.coursesCount}+</p>
              <p className="text-xs font-bold text-[#718096]">{t('statsCourses')}</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-black text-[#007A7A]">{stats.learningResourcesCount}+</p>
              <p className="text-xs font-bold text-[#718096]">{t('statsResources')}</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-black text-[#2D3748]">{stats.educationalTopicsCount}+</p>
              <p className="text-xs font-bold text-[#718096]">{t('statsTopics')}</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-black text-[#F27D26]">4</p>
              <p className="text-xs font-bold text-[#718096]">{t('statsLanguages')}</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-black text-[#007A7A]">{stats.activeLearnersCount}+</p>
              <p className="text-xs font-bold text-[#718096]">Active Learners</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-2xl sm:text-3xl font-black text-[#C53030]">30 / 30</p>
              <p className="text-xs font-bold text-[#718096]">{t('statsDistricts')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TARGET AUDIENCE & COMMUNITY PORTALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A7A] bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-[#C6E6D0]">
            Tailored Knowledge Portals
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A202C]">
            {t('servicesHeading')}
          </h2>
          <p className="text-sm text-[#4A5568]">
            Dedicated evidence-based learning paths, tools, and clinical references built for every member of the maternal health ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audienceGroups.map((grp) => {
            const Icon = grp.icon;
            return (
              <div
                key={grp.id}
                onClick={() => navigate(grp.route)}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#007A7A] hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#007A7A] flex items-center justify-center text-white shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDF2F7] text-[#4A5568]">
                      {grp.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#1A202C] text-base group-hover:text-[#007A7A] transition-colors">
                      {grp.title}
                    </h3>
                    <p className="text-xs text-[#718096] mt-1 line-clamp-3 leading-relaxed">
                      {grp.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDF2F7] flex items-center justify-between text-xs font-bold text-[#007A7A]">
                  <span>Explore Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CORE CLINICAL & PREGNANCY TOOLS */}
      <section className="bg-[#E6F4EA]/40 border-y border-[#CBD5E0] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#007A7A] bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-[#C6E6D0]">
                Interactive Decision Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A202C] mt-2">
                Clinical Pregnancy & Midwifery Tools
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] mt-1 max-w-2xl">
                Immediate calculations and protocols tailored for Rwandan health centers, maternity wards, and home birth preparedness.
              </p>
            </div>

            <button
              onClick={() => navigate('pregnancy')}
              className="text-xs font-bold text-[#007A7A] hover:text-[#004D4D] flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <span>View All Interactive Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {interactiveTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(tool.route, tool.params)}
                  className="bg-white rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#007A7A] hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E6F4EA] text-[#007A7A]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A202C] text-sm group-hover:text-[#007A7A] transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-[#718096] mt-1 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDF2F7] flex items-center justify-between text-xs font-bold text-[#007A7A]">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED ACCREDITED COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#007A7A] bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-[#C6E6D0]">
              Accredited Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A202C] mt-2">
              Featured Midwifery & Newborn Courses
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] mt-1">
              Structured self-paced modules with interactive clinical quizzes and verifiable completion certificates.
            </p>
          </div>

          <button
            onClick={() => navigate('courses')}
            className="px-5 py-2.5 rounded-full bg-[#007A7A] hover:bg-[#005F5F] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>{t('coursesViewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredCourses.map((c) => {
            const isSaved = user?.savedCourseIds.includes(c.id);
            const isCompleted = user?.completedCourseIds.includes(c.id);

            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#007A7A] text-white shadow-xs">
                      {c.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#2D3748] backdrop-blur-xs">
                      {c.level}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-200" />
                      <span>{c.durationHours} Hours • {c.lessonsCount} Lessons</span>
                    </span>
                    {c.certificateEligible && (
                      <span className="flex items-center gap-1 text-amber-300 font-bold text-[11px]">
                        <Award className="w-3.5 h-3.5" />
                        <span>Verified Certificate</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => navigate('courses', { courseId: c.id })}
                      className="text-lg font-bold text-[#1A202C] hover:text-[#007A7A] cursor-pointer transition-colors"
                    >
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#718096] mt-2 line-clamp-3 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase text-[#718096]">Core Objectives:</p>
                    <ul className="space-y-1 text-xs text-[#4A5568]">
                      {c.learningObjectives.slice(0, 2).map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#007A7A] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#EDF2F7] flex items-center justify-between gap-3">
                    <button
                      onClick={() => navigate('courses', { courseId: c.id })}
                      className="px-5 py-2.5 rounded-full bg-[#007A7A] hover:bg-[#005F5F] text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <span>{isCompleted ? 'Review Course' : 'Start Learning'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => (user ? toggleSaveCourse(c.id) : openAuthModal('login'))}
                      className={`p-2.5 rounded-full border text-xs font-semibold transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#E6F4EA] border-[#007A7A] text-[#007A7A]'
                          : 'bg-[#EDF2F7] border-[#E2E8F0] text-[#718096] hover:bg-slate-200'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save for Later'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#007A7A]' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. EVIDENCE-BASED ARTICLES & CLINICAL INSIGHTS */}
      <section className="bg-[#004D4D] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
                Peer-Reviewed Clinical Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Articles & Health System Updates
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/80 mt-1">
                Articles authored by Rwandan midwifery educators, obstetricians, and youth health counselors.
              </p>
            </div>

            <button
              onClick={() => navigate('articles')}
              className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate('articles', { articleId: art.id })}
                className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-teal-200">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase">
                      {art.category}
                    </span>
                    <span>{art.readTimeMinutes} min read</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-teal-100/80 mt-2 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-teal-200">
                  <span className="truncate">{art.author.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EMERGENCY CALL-OUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#C53030] rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Universal Rwanda Emergency Services</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Experiencing Severe Labor Pain or Danger Signs?
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
              Do not delay seeking medical assessment. Emergency ambulance dispatch (SAMU 112/912) is available 24/7 across all districts of Rwanda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#C53030] hover:bg-red-50 text-xs font-black shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#C53030]" />
              <span>Call Emergency 112</span>
            </button>

            <button
              onClick={() => navigate('pregnancy', { tab: 'danger_signs' })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-red-900/60 hover:bg-red-900 text-white text-xs font-bold border border-white/30 transition-colors cursor-pointer"
            >
              <span>Check Danger Signs</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );

};
