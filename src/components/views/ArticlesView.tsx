import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Heart,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
  User,
  Search,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Article } from '../../types';

export const ArticlesView: React.FC = () => {
  const { articles, routeParams, navigate, openAuthModal } = usePlatform();
  const { user, toggleSaveArticle } = useAuth();
  const { t } = useLanguage();

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    routeParams?.articleId || null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Article Comments state
  const [commentText, setCommentText] = useState<string>('');
  const [articleComments, setArticleComments] = useState<Record<string, Array<{ id: string; author: string; role: string; content: string; date: string }>>>({
    'art-pph-101': [
      {
        id: 'c-1',
        author: 'Marie Rose Mukamana',
        role: 'Senior Midwife at Masaka Hospital',
        content: 'Calibrated drapes have completely revolutionized our early detection of postpartum blood loss in our labor room. Highly recommended protocol!',
        date: '2025-02-12',
      },
    ],
  });

  const categories = [
    'All',
    'Emergency Care',
    'Newborn Health',
    'Family Planning',
    'Antenatal Care',
    'Maternal Health',
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((tg) => tg.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const currentArticle: Article | undefined = articles.find((a) => a.id === selectedArticleId);

  const handlePostComment = (articleId: string) => {
    if (!commentText.trim()) return;
    if (!user) {
      openAuthModal('login');
      return;
    }

    const newComment = {
      id: `c-${Date.now()}`,
      author: user.fullName,
      role: user.role.replace('_', ' '),
      content: commentText.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    setArticleComments((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newComment],
    }));
    setCommentText('');
  };

  // Detailed Article View
  if (currentArticle) {
    const isSaved = user?.savedArticleIds.includes(currentArticle.id);
    const comments = articleComments[currentArticle.id] || [];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedArticleId(null)}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (user ? toggleSaveArticle(currentArticle.id) : openAuthModal('login'))}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                isSaved
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white">
                {currentArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentArticle.readTimeMinutes} min read</span>
              </span>
              <span className="text-xs text-slate-400">• {currentArticle.publishedDate}</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
              {currentArticle.title}
            </h1>

            {/* Author and Evidence Rating Box */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {currentArticle.author.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{currentArticle.author.name}</p>
                  <p className="text-[11px] text-slate-500">{currentArticle.author.title} • {currentArticle.author.institution}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                  {currentArticle.evidenceRating}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{currentArticle.rwandaMoHGuidelineRef}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100">
            <img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Summary */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-950 italic font-medium leading-relaxed">
            "{currentArticle.summary}"
          </div>

          {/* Article Main Text Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-4">
            {currentArticle.content}
          </div>

          {/* Key Takeaways */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
            <h4 className="font-bold text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Evidence-Based Takeaways for Clinical Midwives:</span>
            </h4>
            <ul className="space-y-1.5 text-emerald-800 leading-relaxed">
              {currentArticle.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          {currentArticle.references && (
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <h5 className="font-bold text-slate-700">Clinical References & Citations:</h5>
              <ul className="space-y-0.5 text-[11px] list-disc list-inside">
                {currentArticle.references.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {currentArticle.tags.map((tg, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium">
                #{tg}
              </span>
            ))}
          </div>

          {/* Clinical Comments & Dialogue Section */}
          <div className="pt-8 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-700" />
                <span>Clinical Peer Discussion ({comments.length})</span>
              </h3>
            </div>

            {/* Post Comment Input */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0 text-xs">
                {user ? user.fullName[0] : <User className="w-4 h-4" />}
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={user ? "Share your clinical insights or ask questions regarding this guideline..." : "Sign in to join the clinical discussion..."}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-hidden resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handlePostComment(currentArticle.id)}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post Comment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((cm) => (
                <div key={cm.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{cm.author}</span>
                      <span className="text-[10px] text-blue-700 font-medium ml-2 uppercase">({cm.role})</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{cm.date}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">{cm.content}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Articles Catalog
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Clinical Knowledge & Scientific Literature</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Evidence-Based Midwifery & Maternal Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Curated clinical insights, updated MoH guidelines, research breakthroughs, and practical field protocols written by experienced Rwandan midwifery leaders.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & protocols..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => {
          const isSaved = user?.savedArticleIds.includes(art.id);

          return (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white shadow-xs">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{art.publishedDate}</span>
                    <span>•</span>
                    <span>{art.readTimeMinutes} min read</span>
                  </div>

                  <h3
                    onClick={() => setSelectedArticleId(art.id)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors cursor-pointer line-clamp-2"
                  >
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <button
                  onClick={() => setSelectedArticleId(art.id)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => (user ? toggleSaveArticle(art.id) : openAuthModal('login'))}
                  className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                    isSaved
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                  title={isSaved ? 'Remove from Saved' : 'Save Article'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
