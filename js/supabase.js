/* Midwife Connect Rwanda - shared Supabase client */
window.MCR_SUPABASE_URL = "https://bacglcfakibamdhvuwt.supabase.co";
window.MCR_SUPABASE_KEY = "sb_publishable_enFS4mLUJMGpF4cM6TMsfA_pcnq2mYG";

window.mcrSupabase = window.supabase.createClient(
  window.MCR_SUPABASE_URL,
  window.MCR_SUPABASE_KEY
);
