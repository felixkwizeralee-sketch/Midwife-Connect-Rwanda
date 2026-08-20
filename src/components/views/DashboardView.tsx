import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowRight,
  Settings,
  Building,
  Phone,
  Mail,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const DashboardView: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { courses, articles, navigate, setSelectedCertificate, openAuthModal } = usePlatform();
  const { t } = useLanguage();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    institution: user?.institution || '',
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign In to Access Your Dashboard</h2>
        <p className="text-xs text-slate-500">
          Track your course completion, review your official CPD certificates, and access your saved protocols.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-xs"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const savedArticlesList = articles.filter((a) => user.savedArticleIds.includes(a.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-xl font-black text-white shadow-md">
            {user.fullName.charAt(0)}
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.fullName}</h1>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white">
                {user.role.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {user.email} • {user.institution || 'Rwanda Health Worker'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          <span>{isEditingProfile ? 'Close Settings' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Profile Form */}
      {isEditingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 max-w-2xl"
        >
          <h3 className="text-base font-bold text-slate-900">Update Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Health Facility / School</label>
              <input
                type="text"
                value={profileForm.institution}
                onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Enrolled Courses</span>
          <p className="text-2xl font-black text-slate-900">{enrolledCourses.length}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Completed Courses</span>
          <p className="text-2xl font-black text-emerald-700">{user.completedCourseIds.length}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">CPD Certificates</span>
          <p className="text-2xl font-black text-amber-600">{user.certificates.length}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Saved Items</span>
          <p className="text-2xl font-black text-purple-700">{user.savedArticleIds.length + user.savedCourseIds.length}</p>
        </div>
      </div>

      {/* Official Certificates Showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span>My Verified CPD Certificates</span>
        </h2>

        {user.certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs flex items-center justify-between gap-4 bg-gradient-to-r from-amber-50/40 to-white"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Score: {cert.scorePercentage}%
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{cert.courseTitle}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">ID: {cert.certificateNumber} • Issued {cert.issuedDate}</p>
                </div>

                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
            <p>You haven't earned any certificates yet.</p>
            <button
              onClick={() => navigate('courses')}
              className="text-blue-700 font-bold hover:underline"
            >
              Browse courses and take examinations to earn your certificates →
            </button>
          </div>
        )}
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-700" />
          <span>My Active Courses</span>
        </h2>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map((c) => {
              const progress = user.lessonProgress[c.id] || [];
              const pct = Math.round((progress.length / c.lessons.length) * 100);

              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{pct}% Done</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => navigate('courses', { courseId: c.id })}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Continue Learning</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
            No active courses enrolled. <button onClick={() => navigate('courses')} className="text-blue-700 font-bold hover:underline">Explore Courses</button>
          </div>
        )}
      </div>
    </div>
  );
};
