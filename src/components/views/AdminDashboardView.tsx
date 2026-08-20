import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Award,
  Activity,
  Sparkles,
  TrendingUp,
  Building,
  CheckCircle2,
  Lock,
  Search,
  Check,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatform } from '../../contexts/PlatformContext';
import { demoUsers } from '../../data/usersData';

export const AdminDashboardView: React.FC = () => {
  const { user } = useAuth();
  const { courses, quizzes, stats, articles } = usePlatform();

  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'courses'>('analytics');
  const [userList, setUserList] = useState(demoUsers);
  const [userFilter, setUserFilter] = useState<string>('');

  const isAdminOrFounder = user?.role === 'admin' || user?.role === 'registered_midwife' || user?.role === 'student_midwife';

  const toggleUserVerification = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isVerified: !u.isVerified } : u))
    );
  };

  const filteredUsers = userList.filter(
    (u) =>
      u.fullName.toLowerCase().includes(userFilter.toLowerCase()) ||
      u.email.toLowerCase().includes(userFilter.toLowerCase()) ||
      u.role.toLowerCase().includes(userFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Founder & Ministry Coordination Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Platform Governance & Maternal Impact Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Real-time oversight of health worker training reach, digital clinical tool utilization, and CPD certificate authentication across all 30 districts in Rwanda.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto no-scrollbar gap-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'analytics' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>National Impact Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Health Cadres ({userList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'courses' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Curriculum Inventory ({courses.length})</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* High-level KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Trained Midwives & Students</span>
              <p className="text-2xl sm:text-3xl font-black text-blue-900">{stats.midwivesTrained.toLocaleString()}+</p>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+18% this quarter</span>
              </span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">Digital Tool Consultations</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-800">{stats.pregnantMothersReached.toLocaleString()}+</p>
              <span className="text-[10px] text-slate-400">Due date, ANC & KMC calculators</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">CPD Verified Certificates</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-600">{stats.quizzesPassed.toLocaleString()}+</p>
              <span className="text-[10px] text-amber-700 font-bold">Passing score ≥80%</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-medium">District Health Centers Connected</span>
              <p className="text-2xl sm:text-3xl font-black text-purple-900">{stats.healthFacilitiesCovered}</p>
              <span className="text-[10px] text-purple-700 font-bold">All 5 Provinces</span>
            </div>
          </div>

          {/* Regional Reach Distribution */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900">
              Health Cadre Participation by Rwanda Administrative Province
            </h3>

            <div className="space-y-4">
              {[
                { province: 'Kigali City (Nyarugenge, Gasabo, Kicukiro)', midwives: 1420, pct: 88 },
                { province: 'Southern Province (Huye, Muhanga, Nyanza, Ruhango...)', midwives: 1180, pct: 74 },
                { province: 'Northern Province (Musanze, Gicumbi, Rulindo...)', midwives: 960, pct: 62 },
                { province: 'Eastern Province (Rwamagana, Bugesera, Kayonza...)', midwives: 1050, pct: 68 },
                { province: 'Western Province (Rubavu, Rusizi, Karongi...)', midwives: 910, pct: 59 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.province}</span>
                    <span className="text-slate-500">{item.midwives} Midwives Active ({item.pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Registered Health Cadres & Learners</h3>
              <p className="text-xs text-slate-500">Manage credentials, verification status, and clinical affiliations.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                placeholder="Filter by name, role, email..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">User & Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Facility / Institution</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-medium">
                      <p className="text-slate-900 font-bold">{u.fullName}</p>
                      <p className="text-slate-400 text-[11px]">{u.email}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-800">
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{u.institution || u.district || '—'}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {u.status === 'active' ? 'Active MoH ✓' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleUserVerification(u.id)}
                        className="px-2.5 py-1 rounded-lg border text-[11px] font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COURSES INVENTORY */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Curriculum & Course Repository</h3>
              <p className="text-xs text-slate-500">Active educational modules aligned with Rwanda Ministry of Health.</p>
            </div>
          </div>

          <div className="space-y-3">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {c.category}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{c.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {c.lessons.length} Lessons • {c.durationHours} Hours • Level: {c.level}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Published & Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
