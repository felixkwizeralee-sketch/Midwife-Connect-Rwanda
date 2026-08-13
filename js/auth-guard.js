/* Authentication helpers for protected pages */
(async function () {
  if (!window.mcrSupabase) return;

  const { data } = await window.mcrSupabase.auth.getSession();
  if (!data.session) {
    const here = encodeURIComponent(window.location.pathname.split("/").pop() || "dashboard.html");
    window.location.replace("login.html?redirect=" + here);
    return;
  }

  const user = data.session.user;
  const metadata = user.user_metadata || {};
  window.MCR_CURRENT_USER = user;

  const name = metadata.name || user.email?.split("@")[0] || "Student";
  document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = name);
  document.querySelectorAll("[data-user-email]").forEach(el => el.textContent = user.email || "");

  window.mcrSupabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT" || !session) {
      window.location.replace("login.html");
    }
  });
})();
