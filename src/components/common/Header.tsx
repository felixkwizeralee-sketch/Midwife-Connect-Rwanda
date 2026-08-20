import React, { useState } from 'react';
import {
  Heart,
  Baby,
  Search,
  PhoneCall,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Globe,
  BookOpen,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Bookmark,
  Award,
  Stethoscope,
  Pill,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t, languages } = useLanguage();
  const { user, logout } = useAuth();
  const {
    currentRoute,
    navigate,
    setIsSearchOpen,
    setIsEmergencyOpen,
    setIsAiAssistantOpen,
    openAuthModal,
    notifications,
  } = usePlatform();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNav = (route: string, params?: any) => {
    navigate(route, params);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const navLinks = [
    { key: 'navHome', route: 'home', icon: Heart },
    { key: 'navCourses', route: 'courses', icon: GraduationCap },
    { key: 'navPregnancy', route: 'pregnancy', icon: Baby },
    { key: 'navReproductive', route: 'reproductive', icon: Users },
    { key: 'navNewborn', route: 'newborn', icon: Stethoscope },
    { key: 'navStudents', route: 'students', icon: BookOpen },
    { key: 'navMidwives', route: 'midwives', icon: Award },
    { key: 'navYouth', route: 'youth', icon: Sparkles },
    { key: 'navPharmacy', route: 'pharmacy', icon: Pill },
    { key: 'navArticles', route: 'articles', icon: BookOpen },
    { key: 'navAbout', route: 'about', icon: null },
    { key: 'navContact', route: 'contact', icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-xs">
      {/* Top Banner for Emergency Warning & Disclaimer */}
      <div className="bg-[#004D4D] text-teal-100 text-xs px-4 py-1.5 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#007A7A] font-bold tracking-wider text-[10px] uppercase">
            Official Platform
          </span>
          <span className="truncate hidden sm:inline text-teal-100 text-xs">
            {t('medicalDisclaimerShort')}
          </span>
          <span className="truncate sm:hidden text-teal-100 text-xs">
            Rwanda Midwifery & Maternal Health Education
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsEmergencyOpen(true)}
            id="emergency-top-btn"
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C53030] text-white font-bold text-[11px] cursor-pointer hover:bg-red-700 transition-colors shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>Emergency 112</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#007A7A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl text-[#004D4D] tracking-tight leading-tight">
                  Midwife Connect Rwanda
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#718096] font-semibold uppercase tracking-wider truncate hidden sm:block">
                Connecting Midwives, Empowering Families
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'home'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navHome')}
            </button>

            <button
              onClick={() => handleNav('courses')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'courses'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navCourses')}
            </button>

            <button
              onClick={() => handleNav('pregnancy')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'pregnancy'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navPregnancy')}
            </button>

            <button
              onClick={() => handleNav('newborn')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'newborn'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navNewborn')}
            </button>

            <button
              onClick={() => handleNav('reproductive')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'reproductive'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navReproductive')}
            </button>

            <button
              onClick={() => handleNav('articles')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === 'articles'
                  ? 'text-[#007A7A] font-bold border-b-2 border-[#007A7A] rounded-none'
                  : 'text-[#4A5568] hover:text-[#007A7A]'
              }`}
            >
              {t('navArticles')}
            </button>
          </nav>

          {/* Action Tools & Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="global-search-trigger-btn"
              className="p-2 sm:px-3 sm:py-2 text-[#4A5568] hover:text-[#007A7A] bg-[#EDF2F7] hover:bg-[#E2E8F0] rounded-lg text-sm flex items-center gap-2 transition-colors cursor-pointer"
              title="Search platform (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-xs text-[#718096] font-normal">
                {t('navSearch')}
              </span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#CBD5E0] rounded text-[#718096] shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              id="ai-assistant-header-btn"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E6F4EA] text-[#007A7A] hover:bg-[#C6E6D0] border border-[#C6E6D0] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#007A7A]" />
              <span>AI Assistant</span>
            </button>

            {/* Multi-language Selector (EN | FR | RW | SW) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="language-selector-btn"
                className="flex items-center gap-1 px-3 py-1.5 bg-[#EDF2F7] hover:bg-[#E2E8F0] text-xs font-bold text-[#4A5568] rounded-md transition-colors cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#007A7A]" />
                <span className="uppercase text-[#007A7A]">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#718096]" />
              </button>

              {langDropdownOpen && (
                <div
                  id="lang-dropdown-menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#718096] border-b border-[#EDF2F7]">
                    Choose Language / Ururimi
                  </div>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#E6F4EA] transition-colors cursor-pointer ${
                        language === item.code ? 'font-bold text-[#007A7A] bg-[#E6F4EA]/60' : 'text-[#2D3748]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.nativeLabel}</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#EDF2F7] text-[#4A5568]">
                        {item.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Trigger */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                id="notifications-bell-btn"
                className="p-2 text-[#4A5568] hover:text-[#007A7A] bg-[#EDF2F7] hover:bg-[#E2E8F0] rounded-lg relative transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C53030] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E2E8F0] p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EDF2F7]">
                    <span className="text-xs font-bold text-[#1A202C]">Platform Updates</span>
                    <span className="text-[11px] text-[#007A7A] font-bold">{unreadCount} unread</span>
                  </div>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.link) handleNav(n.link);
                          setNotifDropdownOpen(false);
                        }}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                          n.read ? 'bg-[#F4F7F5] text-[#4A5568]' : 'bg-[#E6F4EA] border border-[#C6E6D0] text-[#004D4D]'
                        }`}
                      >
                        <p className="font-semibold text-[#1A202C]">{n.title}</p>
                        <p className="text-[11px] text-[#4A5568] mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-[#718096] mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth / Profile Area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  id="user-profile-menu-btn"
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#E6F4EA] hover:bg-[#C6E6D0] text-[#004D4D] border border-[#C6E6D0] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#007A7A] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[120px] truncate font-bold text-[#004D4D]">{user.fullName}</span>
                  <ChevronDown className="w-3 h-3 text-[#007A7A]" />
                </button>

                {userDropdownOpen && (
                  <div
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-1.5 z-50 animate-in fade-in zoom-in-95"
                  >
                    <div className="px-3 py-2 border-b border-[#EDF2F7]">
                      <p className="text-xs font-bold text-[#1A202C] truncate">{user.fullName}</p>
                      <p className="text-[11px] text-[#718096] truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-[#E6F4EA] text-[#007A7A] capitalize">
                        {user.role.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-3 py-2 text-xs text-[#2D3748] hover:bg-[#E6F4EA] hover:text-[#007A7A] flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#007A7A]" />
                      <span>{t('navDashboard')}</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => handleNav('admin')}
                        className="w-full text-left px-3 py-2 text-xs text-[#007A7A] font-bold hover:bg-[#E6F4EA] flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#007A7A]" />
                        <span>{t('navAdmin')}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleNav('dashboard', { tab: 'bookmarks' })}
                      className="w-full text-left px-3 py-2 text-xs text-[#2D3748] hover:bg-[#E6F4EA] hover:text-[#007A7A] flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-[#718096]" />
                      <span>{t('dashboardSaved')}</span>
                    </button>

                    <button
                      onClick={() => handleNav('dashboard', { tab: 'certificates' })}
                      className="w-full text-left px-3 py-2 text-xs text-[#2D3748] hover:bg-[#E6F4EA] hover:text-[#007A7A] flex items-center gap-2 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-[#F27D26]" />
                      <span>{t('dashboardCertificates')}</span>
                    </button>

                    <div className="border-t border-[#EDF2F7] mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#C53030] hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#C53030]" />
                        <span>{t('navLogout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  id="header-login-btn"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4A5568] hover:text-[#007A7A] hover:bg-[#EDF2F7] transition-colors cursor-pointer"
                >
                  {t('navLogin')}
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  id="header-register-btn"
                  className="bg-[#007A7A] text-white px-5 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-[#005F5F] transition-colors cursor-pointer"
                >
                  {t('navRegister')}
                </button>
              </div>
            )}


            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
        >
          <div className="py-2 border-b border-slate-100 mb-2">
            <button
              onClick={() => {
                setIsAiAssistantOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('heroBtnAiAssistant')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNav(link.route)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                    currentRoute === link.route
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-blue-600 shrink-0" />}
                  <span>{t(link.key)}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setIsEmergencyOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Emergency 112 / SAMU</span>
            </button>

            {user?.role === 'admin' && (
              <button
                onClick={() => handleNav('admin')}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 cursor-pointer"
              >
                {t('navAdmin')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
