/* Legacy compatibility helpers. New pages should use mcrSupabase. */
async function logout() {
  try {
    if (window.mcrSupabase) await window.mcrSupabase.auth.signOut();
  } catch (_) {}
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("user");
  localStorage.removeItem("midwifeConnectLoggedIn");
  localStorage.removeItem("midwifeConnectUser");
  window.location.replace("../index.html");
}
function showPassword() {
  const pass = document.getElementById("loginPassword") || document.getElementById("password");
  if (pass) pass.type = pass.type === "password" ? "text" : "password";
}
