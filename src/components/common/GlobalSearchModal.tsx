import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  GraduationCap,
  Baby,
  Stethoscope,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, courses, articles, navigate } = usePlatform();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const matchedCourses = courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
      .map((c) => ({
        type: 'course' as const,
        id: c.id,
        title: c.title,
        subtitle: `${c.category} • ${c.durationHours}h • ${c.level}`,
        route: 'courses',
        params: { courseId: c.id },
      }));

    const matchedArticles = articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((tag) => tag.toLowerCase().includes(q))
      )
      .map((a) => ({
        type: 'article' as const,
        id: a.id,
        title: a.title,
        subtitle: `${a.category} • ${a.readTimeMinutes} min read`,
        route: 'articles',
        params: { articleId: a.id },
      }));

    // Predefined tools
    const tools = [
      {
        type: 'tool' as const,
        id: 'tool-edd',
        title: 'Expected Date of Delivery (EDD) Calculator',
        subtitle: 'Calculate LMP due date, gestational age in weeks & days',
        route: 'pregnancy',
        params: { tab: 'calculator' },
      },
      {
        type: 'tool' as const,
        id: 'tool-danger',
        title: 'Maternal & Neonatal Danger Signs Directory',
        subtitle: 'Triage red flags, preeclampsia, and hemorrhage emergency actions',
        route: 'pregnancy',
        params: { tab: 'danger_signs' },
      },
      {
        type: 'tool' as const,
        id: 'tool-anc',
        title: 'Rwanda 8-Contact ANC Schedule & Timeline',
        subtitle: 'WHO positive pregnancy experience model and lab check milestones',
        route: 'pregnancy',
        params: { tab: 'anc' },
      },
      {
        type: 'tool' as const,
        id: 'tool-fp',
        title: 'Contraceptive Methods & Family Planning Matrix',
        subtitle: 'LARC, implants, PPIUD, injections, emergency pills, and efficacy',
        route: 'reproductive',
        params: { tab: 'contraception' },
      },
      {
        type: 'tool' as const,
        id: 'tool-newborn',
        title: 'Kangaroo Mother Care (KMC) & Essential Newborn Care',
        subtitle: 'Immediate skin-to-skin, delayed cord clamping, and APGAR score',
        route: 'newborn',
        params: { tab: 'kmc' },
      },
    ].filter(
      (item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
    );

    return [...tools, ...matchedCourses, ...matchedArticles].slice(0, 8);
  }, [searchQuery, courses, articles]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:pt-20 animate-in fade-in duration-100">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, clinical tools, articles, danger signs..."
            className="w-full text-slate-800 placeholder:text-slate-400 text-sm sm:text-base outline-hidden bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          {searchQuery.trim() === '' ? (
            <div className="p-6 text-center text-slate-500 space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-blue-500/60" />
              <p className="text-xs">
                Type keywords like <span className="font-semibold text-blue-600">"EDD"</span>,{' '}
                <span className="font-semibold text-blue-600">"PPH"</span>,{' '}
                <span className="font-semibold text-blue-600">"KMC"</span>, or{' '}
                <span className="font-semibold text-blue-600">"ANC"</span> to explore.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm font-semibold">No results found for "{searchQuery}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for general terms like "Midwifery", "Vaccination", or "Contraception".
              </p>
            </div>
          ) : (
            searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(item.route, item.params);
                  setIsSearchOpen(false);
                }}
                className="p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.type === 'course' && <GraduationCap className="w-4 h-4" />}
                    {item.type === 'article' && <BookOpen className="w-4 h-4" />}
                    {item.type === 'tool' && <Baby className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Quick Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Midwife Connect Rwanda Search Engine</span>
          <span className="font-mono text-[10px]">Press Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
