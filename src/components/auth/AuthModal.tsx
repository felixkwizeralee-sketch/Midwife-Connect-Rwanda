import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  Building,
  MapPin,
  GraduationCap,
  Sparkles,
  Award,
  Baby,
  Pill,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole, Language } from '../../types';

export const AuthModal: React.FC = () => {
  const { user, login, register, quickDemoLogin } = useAuth();
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab } = usePlatform();
  const { language, t } = useLanguage();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('student_midwife');
  const [regLanguage, setRegLanguage] = useState<Language>(language);
  const [regInstitution, setRegInstitution] = useState('');
  const [regDistrict, setRegDistrict] = useState('Kigali (Nyarugenge)');

  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMsg('Successfully signed in!');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setSuccessMsg(null);
      }, 700);
    } else {
      setErrorMsg(res.error || 'Failed to sign in');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!regFullName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const res = register({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      preferredLanguage: regLanguage,
      institution: regInstitution,
      district: regDistrict,
    });

    if (res.success) {
      setSuccessMsg('Account created successfully! Welcome to Midwife Connect Rwanda.');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setSuccessMsg(null);
      }, 900);
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  const demoAccounts: { role: UserRole; name: string; email: string; label: string; icon: any }[] = [
    { role: 'admin', name: 'Felix Kwizera', email: 'admin@midwifeconnect.rw', label: 'Admin / Director', icon: ShieldCheck },
    { role: 'student_midwife', name: 'Diane Mukamwiza', email: 'student@midwifeconnect.rw', label: 'Student Midwife', icon: GraduationCap },
    { role: 'registered_midwife', name: 'Sr. Grace Uwera', email: 'midwife@midwifeconnect.rw', label: 'Registered Midwife', icon: Award },
    { role: 'pregnant_woman', name: 'Aline Ingabire', email: 'aline@midwifeconnect.rw', label: 'Pregnant Mother', icon: Baby },
    { role: 'youth', name: 'Kevin Mugisha', email: 'youth@midwifeconnect.rw', label: 'Youth / SRHR', icon: Sparkles },
    { role: 'pharmacist', name: 'Dr. Patrick Habimana', email: 'pharma@midwifeconnect.rw', label: 'Pharmacist', icon: Pill },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">
              {authModalTab === 'login' ? t('loginTitle') : t('registerTitle')}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Midwife Connect Rwanda • Access educational resources & clinical records
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              authModalTab === 'login'
                ? 'bg-white text-blue-700 border-b-2 border-blue-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('navLogin')}
          </button>
          <button
            onClick={() => {
              setAuthModalTab('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              authModalTab === 'register'
                ? 'bg-white text-blue-700 border-b-2 border-blue-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('navRegister')}
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="m-4 mb-0 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="m-4 mb-0 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick 1-Click Demo Profiles */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Instant 1-Click Demo Profiles</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase">Quick Access</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Select any role to test dashboard views, certificates, and student quizzes immediately:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => {
                      quickDemoLogin(acc.role);
                      setSuccessMsg(`Switched to ${acc.label} (${acc.name})!`);
                      setTimeout(() => {
                        setIsAuthModalOpen(false);
                        setSuccessMsg(null);
                      }, 600);
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-blue-600 group-hover:text-white shrink-0" />
                      <span className="text-xs font-bold truncate text-slate-900 group-hover:text-white">
                        {acc.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-blue-100 block truncate mt-0.5">
                      {acc.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Views */}
          {authModalTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. midwife@midwifeconnect.rw"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password (optional for demo accounts)"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                {t('loginBtn')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Diane Mukamwiza"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+250 78..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Role / Community Profile <span className="text-rose-500">*</span>
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden capitalize"
                >
                  <option value="student_midwife">Student Midwife</option>
                  <option value="registered_midwife">Registered Midwife</option>
                  <option value="pregnant_woman">Pregnant Mother</option>
                  <option value="reproductive_age_woman">Woman of Reproductive Age</option>
                  <option value="youth">Youth (Adolescent Health)</option>
                  <option value="family_member">Family Member</option>
                  <option value="healthcare_learner">Healthcare Learner / General</option>
                  <option value="pharmacist">Pharmacist</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District in Rwanda
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={regDistrict}
                      onChange={(e) => setRegDistrict(e.target.value)}
                      placeholder="e.g. Gasabo, Musanze, Huye"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / Health Facility
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={regInstitution}
                      onChange={(e) => setRegInstitution(e.target.value)}
                      placeholder="e.g. UR Remera, Kacyiru Hospital"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Language
                </label>
                <select
                  value={regLanguage}
                  onChange={(e) => setRegLanguage(e.target.value as Language)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                >
                  <option value="en">English</option>
                  <option value="fr">Français (French)</option>
                  <option value="rw">Ikinyarwanda (Kinyarwanda)</option>
                  <option value="sw">Kiswahili</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer mt-2"
              >
                {t('registerBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
