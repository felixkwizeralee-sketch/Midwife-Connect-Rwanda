/* Cloud-synchronised learning progress for Midwife Connect Rwanda.
   Requires the authenticated Supabase client from js/supabase.js. */
(function () {
  const cacheKey = "mcr_course_progress";
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(cacheKey) || "{}"); } catch (_) {}

  function saveCache() { localStorage.setItem(cacheKey, JSON.stringify(cache)); }
  async function userId() {
    if (!window.mcrSupabase) return null;
    const { data } = await window.mcrSupabase.auth.getUser();
    return data?.user?.id || null;
  }
  async function syncFromCloud() {
    const uid = await userId();
    if (!uid) return;
    const { data, error } = await mcrSupabase
      .from("course_progress")
      .select("lesson_slug,completed")
      .eq("user_id", uid);
    if (!error && data) {
      data.forEach(row => { if (row.completed) cache[row.lesson_slug] = true; });
      saveCache();
      window.dispatchEvent(new CustomEvent("mcr:progress-loaded"));
    }
  }
  async function complete(slug) {
    cache[slug] = true; saveCache();
    window.dispatchEvent(new CustomEvent("mcr:progress", {detail:{slug,completed:true}}));
    const uid = await userId();
    if (!uid) return;
    await mcrSupabase.from("course_progress").upsert({
      user_id: uid, lesson_slug: slug, completed: true,
      updated_at: new Date().toISOString()
    }, {onConflict:"user_id,lesson_slug"});
  }
  window.MCRProgress = {
    isComplete(slug) { return !!cache[slug]; },
    complete,
    async refresh() { await syncFromCloud(); },
    percent(total) {
      return total ? Math.min(100, Math.round(Object.keys(cache).filter(k=>cache[k]).length / total * 100)) : 0;
    }
  };
  syncFromCloud().catch(()=>{});
})();
